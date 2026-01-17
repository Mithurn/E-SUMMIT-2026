import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Instagram } from 'lucide-react';
import { teamMembers } from '../data/team';
import { eventHeads } from '../data/team';
import './EventLeadersModal.css';

interface EventLeadersModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    eventTagline: string;
}

export default function EventLeadersModal({ isOpen, onClose, eventName, eventTagline }: EventLeadersModalProps) {
    // Map event taglines to eventHeads keys
    const taglineToKey: Record<string, string> = {
        'Hackathon': 'Hackathon',
        'Ideathon': 'Ideathon',
        'Hardware Buildathon': 'Buildathon',
        'Creator Workshop': 'Workshop',
        'Treasure Hunt': 'Treasure Hunt'
    };

    const eventKey = taglineToKey[eventTagline] || eventTagline;
    const headNames = eventHeads[eventKey] || [];

    // Look up team members
    const leaders = headNames
        .map(name => teamMembers.find(m => m.name === name))
        .filter((m): m is typeof teamMembers[0] => m !== undefined);

    // Escape key to close + scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        // Lock scroll
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEscape);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Modal */}
                    <motion.div
                        className="event-leaders-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <h2 className="modal-title">
                            {eventName} <span className="modal-subtitle">Event Leaders</span>
                        </h2>

                        <div className="modal-leaders">
                            {leaders.length > 0 ? (
                                leaders.map(member => (
                                    <div key={member.id} className="leader-card">
                                        <div className="leader-image-wrapper">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="leader-image"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : null}
                                            <div className={`leader-placeholder ${member.image ? 'hidden' : ''}`}>
                                                {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </div>
                                        </div>
                                        <h3 className="leader-name">{member.name}</h3>
                                        <p className="leader-role">{member.role}</p>
                                        <div className="leader-socials">
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <Linkedin size={18} />
                                                </a>
                                            )}
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {member.instagram && (
                                                <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                                                    <Instagram size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-leaders">No leaders assigned yet.</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
