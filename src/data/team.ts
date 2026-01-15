// Team member data for E-SUMMIT 2026

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    category: 'patrons' | 'advisory' | 'conveners' | 'co-conveners' | 'organizers';
    image?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
}

export const teamMembers: TeamMember[] = [
    // Patrons
    {
        id: '1',
        name: 'Dr. C. Muthamizhchelvan',
        role: 'Vice Chancellor, SRMIST',
        category: 'patrons'
    },
    {
        id: '2',
        name: 'Dr. S. Ponnusamy',
        role: 'Registrar, SRMIST',
        category: 'patrons'
    },

    // Chief Patrons
    {
        id: '3',
        name: 'Dr. T. R. Paarivendhar',
        role: 'Founder Chancellor',
        category: 'patrons'
    },
    {
        id: '4',
        name: 'Dr. Ravi Pachamuthu',
        role: 'Pro-Chancellor (Administration)',
        category: 'patrons'
    },
    {
        id: '5',
        name: 'Dr. P. Sathyanarayanan',
        role: 'Pro-Chancellor (Academics)',
        category: 'patrons'
    },

    // Advisory Committee
    {
        id: '6',
        name: 'Dr. M. Leenus Jesu Martin',
        role: 'Dean-CET, SRMIST, KTR',
        category: 'advisory'
    },
    {
        id: '7',
        name: 'Dr. Revathi Venkataraman',
        role: 'Chairperson, School of Computing, SRMIST, KTR',
        category: 'advisory'
    },
    {
        id: '8',
        name: 'Dr. M. Pushpalatha',
        role: 'Associate Chairperson, School of Computing, SRMIST, KTR',
        category: 'advisory'
    },
    {
        id: '9',
        name: 'Dr. G. Niranjana',
        role: 'Professor & Head, Dept. of Computing Technologies, SRMIST, KTR',
        category: 'advisory'
    },
    {
        id: '10',
        name: 'Dr. V M Shenbagaraman',
        role: 'Dean - Faculty Of Management',
        category: 'advisory'
    },

    // Conveners
    {
        id: '11',
        name: 'Dr. J. D. Dorathi Jayaseeli',
        role: 'Associate Professor, Department of Computing Technologies',
        category: 'conveners'
    },
    {
        id: '12',
        name: 'Dr. Ponmagal R S',
        role: 'Associate Professor, Department of Computing Technologies',
        category: 'conveners'
    },
    {
        id: '13',
        name: 'Dr. Priya K',
        role: 'Assistant Professor, Sr.G., Faculty of Management',
        category: 'conveners'
    },

    // Co-Conveners
    {
        id: '14',
        name: 'Dr. Robert P',
        role: 'Assistant Professor',
        category: 'co-conveners'
    },
    {
        id: '15',
        name: 'Dr. Rajasekarant P',
        role: 'Assistant Professor',
        category: 'co-conveners'
    },
    {
        id: '16',
        name: 'Dr. Anbarasi A',
        role: 'Assistant Professor',
        category: 'co-conveners'
    },
    {
        id: '17',
        name: 'Dr. Vinoth N A S',
        role: 'Assistant Professor',
        category: 'co-conveners'
    },
    {
        id: '18',
        name: 'Dr. Nithyakani P',
        role: 'Assistant Professor',
        category: 'co-conveners'
    },
    {
        id: '19',
        name: 'Dr. Rajalakshmi M',
        role: 'Assistant Professor',
        category: 'co-conveners'
    },

    // Placeholder Organizers (Student Team)
    {
        id: '20',
        name: 'Team Member 1',
        role: 'Event Head',
        category: 'organizers'
    },
    {
        id: '21',
        name: 'Team Member 2',
        role: 'Technical Lead',
        category: 'organizers'
    },
    {
        id: '22',
        name: 'Team Member 3',
        role: 'Design Lead',
        category: 'organizers'
    },
    {
        id: '23',
        name: 'Team Member 4',
        role: 'Marketing Lead',
        category: 'organizers'
    }
];

export const teamCategories = [
    { id: 'patrons', label: 'Patrons & Chief Patrons' },
    { id: 'advisory', label: 'Advisory Committee' },
    { id: 'conveners', label: 'Conveners' },
    { id: 'co-conveners', label: 'Co-Conveners' },
    { id: 'organizers', label: 'Student Organizers' }
];
