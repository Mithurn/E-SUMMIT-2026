// Event data for E-SUMMIT 2026

export interface Event {
  id: string;
  name: string;
  tagline: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  icon: string;
  color: 'doom' | 'loki' | 'ock' | 'mysterio' | 'infinity';
  villainImage: string;
  villainName: string;
  judges?: { name: string; title: string }[];
}

export const events: Event[] = [
  {
    id: 'doctor-dev',
    name: 'Doctor Dev',
    tagline: 'Hackathon',
    description: 'A high-intensity software hackathon where participants work in teams to develop innovative software-based solutions within a fixed time frame. This event pushes boundaries to focus on problem-solving, technical implementation, and real-world applicability.',
    date: '4 & 5 Feb',
    time: '24 hrs (10 am - 6 am)',
    venue: 'Mini Hall 2',
    icon: 'Terminal',
    color: 'doom',
    villainImage: '/images/doom.PNG',
    villainName: 'Dr. Doom',
    judges: [
      { name: 'Manav Gupta (Tensor Boy)', title: 'AI Educator & Content Creator' },
      { name: 'Pritam Pawar', title: 'Full-Stack Architect | Co-Founder – TournaHub' },
      { name: 'Mayank Rai', title: 'Founder – E-Cell SRMIST' }
    ]
  },
  {
    id: 'infinity',
    name: 'Infinity',
    tagline: 'Ideathon',
    description: 'A high-energy ideathon where teams brainstorm, design, and shape innovative tech-driven ideas within a limited time. Focused on logic, feasibility, and real-world impact, this is where ideas evolve into actionable solutions.',
    date: '4 Feb',
    time: '11:00 - 19:00',
    venue: 'Mini Hall 1',
    icon: 'Lightbulb',
    color: 'infinity',
    villainImage: '/images/allvillains.PNG',
    villainName: 'The Syndicate'
  },
  {
    id: 'tva',
    name: 'TVA: The Visual Academy',
    tagline: 'Creator Workshop',
    description: 'A hands-on workshop conducted to provide participants with practical knowledge and skill development through guided sessions and live demonstrations. The workshop is interactive and learning-oriented, focusing on the new gen creator economy.',
    date: '5 Feb',
    time: '09:00 - 15:00',
    venue: 'TP2 - 711',
    icon: 'Film',
    color: 'loki',
    villainImage: '/images/loki2.PNG',
    villainName: 'Loki',
    judges: [
      { name: 'Nivas Salla', title: 'Founder & CEO – LearnApart' },
      { name: 'Ayush Kulkarni', title: 'Founder & COO – LearnApart | Founder of BrightPitch' }
    ]
  },
  {
    id: 'octobuild',
    name: 'Octobuild',
    tagline: 'Hardware Buildathon',
    description: "Just like Dr. Octopus' engineered arms, every idea here must be calculated, precise, and powerful. Teams will design and build high-impact hardware prototypes that combine engineering excellence with strategic market thinking to create solutions built for real-world impact.",
    date: '4 Feb',
    time: '10:00 - 18:00',
    venue: 'DEI Lab',
    icon: 'Cpu',
    color: 'ock',
    villainImage: '/images/octopusdr.PNG',
    villainName: 'Doc Ock'
  },
  {
    id: 'mystery-games',
    name: 'Mystery Games',
    tagline: 'Treasure Hunt',
    description: "Inspired by Mysterio's world of illusions, this coding treasure hunt challenges participants to see beyond deception. Decode clues, solve logical puzzles, and use sharp coding skills to uncover the truth hidden beneath layers of misdirection.",
    date: '5 Feb',
    time: '09:00 - 15:00',
    venue: 'TP Ganesh Auditorium',
    icon: 'HelpCircle',
    color: 'mysterio',
    villainImage: '/images/mysterio1.PNG',
    villainName: 'Mysterio'
  }
];
