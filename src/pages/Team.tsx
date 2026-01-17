import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { teamMembers } from '../data/team';
import './Team.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12,
            mass: 0.5
        }
    }
};

export default function Team() {
    const [activeTab, setActiveTab] = useState<'core' | 'organizers'>('core');

    const faculty = teamMembers.find(m => m.category === 'faculty');

    return (
        <div className="team-page">
            <div className="team-content" style={{ width: '100%', maxWidth: '1400px', padding: '0 1rem' }}>
                {/* Page Header */}
                <div className="team-header">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        MEET THE <span style={{ color: 'var(--marvel-red)' }}>TEAM</span>
                    </motion.h1>
                    <motion.p
                        className="team-description mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        The masterminds behind the chaos and innovation.
                    </motion.p>
                </div>

                {/* Faculty Incharge - Always Pinned on Top */}
                {faculty && (
                    <section style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <motion.h2
                            className="category-title mono"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Faculty Incharge
                        </motion.h2>
                        <TeamCard member={faculty} />
                    </section>
                )}

                {/* Tab Navigation */}
                <div className="team-tabs-container">
                    <div className="team-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'core' ? 'active' : ''}`}
                            onClick={() => setActiveTab('core')}
                        >
                            Core Committee
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'organizers' ? 'active' : ''}`}
                            onClick={() => setActiveTab('organizers')}
                        >
                            Student Organizers
                        </button>
                    </div>
                </div>

                {/* Content Area */}

                {/* 1. Core Committee Tab */}
                {activeTab === 'core' && (
                    <section className="team-category core-committee-section">
                        <div className="core-committee-container">
                            {(() => {
                                const coreMembers = teamMembers.filter(m => m.category === 'core-committee');
                                const president = coreMembers.find(m => m.committeeRole === 'president');
                                const convenor = coreMembers.find(m => m.committeeRole === 'convenor');
                                const coConvenors = coreMembers.filter(m => m.committeeRole === 'co-convenor');
                                const secretaries = coreMembers.filter(m => ['secretary', 'joint-secretary'].includes(m.committeeRole || ''));

                                const teams = {
                                    'Finance Team': coreMembers.filter(m => m.committeeRole === 'finance'),
                                    'Marketing Team': coreMembers.filter(m => m.committeeRole === 'marketing'),
                                    'Sponsorship Team': coreMembers.filter(m => m.committeeRole === 'sponsorship'),
                                    'Technical Team': coreMembers.filter(m => m.committeeRole === 'technical'),
                                    'Hospitality Team': coreMembers.filter(m => m.committeeRole === 'hospitality'),
                                };

                                return (
                                    <>
                                        {/* President */}
                                        {president && (
                                            <div className="committee-tier tier-president"><TeamCard member={president} /></div>
                                        )}
                                        {/* Convenor */}
                                        {convenor && (
                                            <div className="committee-tier tier-convenor"><TeamCard member={convenor} /></div>
                                        )}
                                        {/* Co-Convenors */}
                                        {coConvenors.length > 0 && (
                                            <div className="committee-tier tier-coconvenors">
                                                {coConvenors.map(m => <TeamCard key={m.id} member={m} />)}
                                            </div>
                                        )}
                                        {/* Secretaries */}
                                        {secretaries.length > 0 && (
                                            <div className="committee-tier tier-secretaries">
                                                {secretaries.map(m => <TeamCard key={m.id} member={m} />)}
                                            </div>
                                        )}
                                        {/* Teams Grid */}
                                        <div className="committee-teams-grid">
                                            {Object.entries(teams).map(([teamName, tMembers]) => (
                                                tMembers.length > 0 && (
                                                    <div key={teamName} className="committee-team-group">
                                                        <h3 className="team-group-title">{teamName}</h3>
                                                        <div className="team-group-members">
                                                            {tMembers.map(m => <TeamCard key={m.id} member={m} />)}
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </section>
                )}

                {/* 2. Student Organizers Tab */}
                {activeTab === 'organizers' && (
                    <section className="team-category">
                        <motion.div
                            className="team-grid organizers"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {teamMembers.filter(m => m.category === 'organizers').map((member) => (
                                <TeamCard key={member.id} member={member} />
                            ))}
                        </motion.div>
                    </section>
                )}
            </div>
        </div>
    );
}
// Removed external EventHeadsSection component usage


// Reusable Team Card Component
function TeamCard({ member }: { member: typeof teamMembers[0] }) {
    return (
        <motion.div
            className="team-card"
            variants={cardVariants}
        >
            <div className="card-image-wrapper">
                {member.image ? (
                    <img src={member.image} alt={member.name} className="card-image" loading="lazy" />
                ) : (
                    <div className="image-placeholder">
                        {member.name.charAt(0)}
                    </div>
                )}
            </div>

            <div className="member-info">
                <h3>{member.name}</h3>
                <p className="mono">{member.role}</p>
            </div>

            {(member.github || member.linkedin || member.instagram) && (
                <div className="social-links">
                    {member.github && (
                        <a href={member.github} target="_blank" rel="noopener noreferrer" className="social-link">
                            <Github size={20} />
                        </a>
                    )}
                    {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                            <Linkedin size={20} />
                        </a>
                    )}
                    {member.instagram && (
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                            <Instagram size={20} />
                        </a>
                    )}
                </div>
            )}
        </motion.div>
    );
}
