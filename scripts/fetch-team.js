import { createClient } from '@supabase/supabase-js';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sheet 1: Committee List (The Master List)
const COMMITTEE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1r8T4ZLbt6r1mUryxBOlCMnGqL4-INeajFBxuX4kAtC8/export?format=csv';

// Sheet 2: Club Details (Socials source)
const CLUB_SHEET_URL = 'https://docs.google.com/spreadsheets/d/13dMKHW67bOhK5hyHeM4OYNdFewkhMAYdxe3unsA2CLU/export?format=csv';

async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
}

const TEAM_HEADER = `export interface TeamMember {
    id: string;
    name: string;
    role: string;
    category: 'faculty' | 'organizers';
    image?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
}

export const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Dr. J. D. Dorathi Jayaseeli',
        role: 'Faculty Incharge',
        category: 'faculty',
        image: '/images/faculty.jpg'
    },
`;

async function main() {
    console.log('🚀 Starting Team Data Sync...');

    try {
        // 1. Fetch CSVs
        console.log('📥 Downloading Sheets...');
        const [committeeData, clubData] = await Promise.all([
            fetchCSV(COMMITTEE_SHEET_URL),
            fetchCSV(CLUB_SHEET_URL)
        ]);
        console.log(`✅ Fetched ${committeeData.length} committee members and ${clubData.length} club records.`);

        // 2. Index Club Data: Map by Email AND Name for better matching
        const clubMapByEmail = new Map();
        const clubMapByName = new Map();

        clubData.forEach(row => {
            if (row.Email) clubMapByEmail.set(row.Email.toLowerCase().trim(), row);
            if (row.Name) clubMapByName.set(row.Name.toLowerCase().trim(), row);
        });

        // 3. Process Members
        console.log('🔄 Processing Members...');
        const organizers = [];
        let idCounter = 30; // Start ID after faculty

        // Fetch all photos
        const { data: photos, error } = await supabase
            .from('member_photos')
            .select('email, photo_url');

        if (error) {
            console.error('⚠️ Error fetching photos from Supabase:', error.message);
        }

        const photoMap = new Map();
        if (photos) {
            photos.forEach(p => {
                if (p.email) photoMap.set(p.email.toLowerCase().trim(), p.photo_url);
            });
            console.log(`✅ Fetched ${photos.length} photos from Supabase.`);
        }

        for (const member of committeeData) {
            const resultName = member.Name ? member.Name.trim() : 'Unknown';
            const committeeEmail = member.Email ? member.Email.toLowerCase().trim() : '';

            // 1. Try to find Club Details (Socials + Alternate Email)
            // Priority: Match by Email -> Match by Name
            let clubInfo = null;
            if (committeeEmail) clubInfo = clubMapByEmail.get(committeeEmail);

            if (!clubInfo && member.Name) {
                // Fallback: match by Name
                clubInfo = clubMapByName.get(member.Name.toLowerCase().trim());
            }

            // 2. Try to find Photo
            // Priority: Check Supabase with Committee Sheet Email -> Check with Club Sheet Email (likely personal)
            let photoUrl = undefined;

            // Check original email
            if (committeeEmail) photoUrl = photoMap.get(committeeEmail);

            // If not found, and we found a match in Club Sheet, try that email
            if (!photoUrl && clubInfo && clubInfo.Email) {
                const altEmail = clubInfo.Email.toLowerCase().trim();
                photoUrl = photoMap.get(altEmail);
            }

            // Determine Role
            let role = member.Position || 'Member';
            if (member.Domain) role += `, ${member.Domain}`;

            organizers.push({
                id: (idCounter++).toString(),
                name: resultName,
                role: role,
                category: 'organizers',
                image: photoUrl || undefined,
                linkedin: clubInfo?.LinkedIn || undefined,
                github: clubInfo?.GitHub || undefined,
                instagram: clubInfo?.Instagram || undefined
            });
        }

        // Sort alphabetically
        organizers.sort((a, b) => a.name.localeCompare(b.name));

        console.log(`✨ Processed ${organizers.length} student organizers.`);

        // 4. Generate Output File
        const outputContent = `${TEAM_HEADER}
${organizers.map(o => `    ${JSON.stringify(o, null, 4).replace(/"([^"]+)":/g, '$1:')}`).join(',\n')}
];

export const teamCategories = [
    { id: 'faculty', label: 'Faculty Incharge' },
    { id: 'patrons', label: 'Patrons & Chief Patrons' },
    { id: 'advisory', label: 'Advisory Committee' },
    { id: 'conveners', label: 'Conveners' },
    { id: 'co-conveners', label: 'Co-Conveners' },
    { id: 'organizers', label: 'Student Organizers' }
];
`;

        fs.writeFileSync('src/data/team.ts', outputContent);
        console.log('✅ Successfully wrote to src/data/team.ts');

    } catch (err) {
        console.error('❌ Error during sync:', err);
    }
}

main();
