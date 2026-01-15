import { motion } from 'framer-motion';
import { Terminal, Lightbulb, Film, Cpu, HelpCircle, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { events } from '../data/events';
import './Events.css';

const IconMap: Record<string, React.ElementType> = {
    Terminal,
    Lightbulb,
    Film,
    Cpu,
    HelpCircle
};

export default function Events() {
    return (
        <div className="events-page">
            {/* Header */}
            <section className="events-page__header">
                <div className="container">
                    <motion.span
                        className="mono text-primary"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        THE_ARSENAL
                    </motion.span>
                    <motion.h1
                        className="events-page__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Villain's <span className="text-gradient-red">Arsenal</span>
                    </motion.h1>
                    <motion.p
                        className="events-page__subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Five flagship events. Two intense days. One mission: Dominate the innovation game.
                    </motion.p>
                </div>
            </section>

            {/* Events List */}
            <section className="events-list section">
                <div className="container">
                    {events.map((event, index) => {
                        const Icon = IconMap[event.icon];
                        return (
                            <motion.div
                                key={event.id}
                                id={event.id}
                                className={`event-card event-card--${event.color}`}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Villain Image */}
                                <div className="event-card__villain">
                                    <motion.img
                                        src={event.villainImage}
                                        alt={event.villainName}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    <div className="event-card__villain-overlay"></div>
                                </div>

                                {/* Content */}
                                <div className="event-card__content">
                                    <div className="event-card__header">
                                        <div className="event-card__icon-wrapper">
                                            {Icon && <Icon className="event-card__icon" strokeWidth={1.5} size={32} />}
                                        </div>
                                        <div className="event-card__titles">
                                            <span className="event-card__tagline">{event.tagline}</span>
                                            <h2 className="event-card__name">{event.name}</h2>
                                        </div>
                                    </div>

                                    <p className="event-card__description">{event.description}</p>

                                    <div className="event-card__details">
                                        <div className="event-card__detail">
                                            <Calendar size={16} className="event-card__detail-icon" />
                                            <div>
                                                <span className="event-card__detail-label">Date</span>
                                                <span className="event-card__detail-value">{event.date}</span>
                                            </div>
                                        </div>
                                        <div className="event-card__detail">
                                            <Clock size={16} className="event-card__detail-icon" />
                                            <div>
                                                <span className="event-card__detail-label">Time</span>
                                                <span className="event-card__detail-value">{event.time}</span>
                                            </div>
                                        </div>
                                        <div className="event-card__detail">
                                            <MapPin size={16} className="event-card__detail-icon" />
                                            <div>
                                                <span className="event-card__detail-label">Venue</span>
                                                <span className="event-card__detail-value">{event.venue}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {event.judges && event.judges.length > 0 && (
                                        <div className="event-card__judges">
                                            <div className="event-card__judges-header">
                                                <Users size={16} />
                                                <span>Judges / Guests</span>
                                            </div>
                                            <div className="event-card__judges-list">
                                                {event.judges.map((judge, jIndex) => (
                                                    <div key={jIndex} className="event-card__judge">
                                                        <span className="event-card__judge-name">{judge.name}</span>
                                                        <span className="event-card__judge-title">{judge.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="event-card__cta">
                                        <a href="#" className="btn btn-primary">
                                            Register Now
                                        </a>
                                    </div>
                                </div>

                                {/* Glow Effect */}
                                <div className="event-card__glow"></div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
