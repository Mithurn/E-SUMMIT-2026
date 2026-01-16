import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { teamMembers, teamCategories } from '../data/team';
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
            type: "spring",
            stiffness: 100,
            damping: 12,
            mass: 0.5
        }
    }
};

export default function Team() {
    return (
        <div className="team-page">
            <div className="team-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    THE ALLIANCE
                </motion.h1>
                <motion.p
                    className="team-description mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Meet the masterminds orchestrating the chaos.
                </motion.p>
            </div>

            {teamCategories.map((category) => {
                const members = teamMembers.filter(m => m.category === category.id);
                if (members.length === 0) return null;

                return (
                    <section key={category.id} className="team-category">
                        <motion.h2
                            className="category-title mono"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {category.label}
                        </motion.h2>

                        <motion.div
                            className={`team-grid ${category.id}`}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {members.map((member) => (
                                <motion.div
                                    key={member.id}
                                    className="team-card"
                                    variants={cardVariants}
                                >
                                    <div className="card-image-wrapper">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="card-image" />
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
                            ))}
                        </motion.div>
                    </section>
                );
            })}
        </div>
    );
}
