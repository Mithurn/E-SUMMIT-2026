// Schedule data for E-SUMMIT 2026

export interface ScheduleEvent {
    id: string;
    name: string;
    type: string;
    day: 1 | 2;
    date: string;
}

export const schedule: ScheduleEvent[] = [
    {
        id: '1',
        name: 'Doctor Dev',
        type: 'Hackathon',
        day: 1,
        date: '4 & 5 Feb'
    },
    {
        id: '2',
        name: 'Infinity',
        type: 'Ideathon',
        day: 1,
        date: '4 Feb'
    },
    {
        id: '3',
        name: 'TVA: THE VISUAL ACADEMY',
        type: 'Creator Workshop',
        day: 2,
        date: '5 Feb'
    },
    {
        id: '4',
        name: 'Octobuild',
        type: 'Hardware Buildathon',
        day: 1,
        date: '4 Feb'
    },
    {
        id: '5',
        name: 'Mystery Games',
        type: 'Treasure Hunt',
        day: 2,
        date: '5 Feb'
    }
];

export const scheduleDays = [
    { day: 1, date: '4th February 2026', label: 'Day 1' },
    { day: 2, date: '5th February 2026', label: 'Day 2' }
];
