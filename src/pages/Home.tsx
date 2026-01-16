import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { events } from '../data/events';
import { Terminal, Lightbulb, Film, Cpu, HelpCircle, ArrowRight, Zap } from 'lucide-react';
import './Home.css';

const IconMap: Record<string, React.ElementType> = {
    Terminal,
    Lightbulb,
    Film,
    Cpu,
    HelpCircle
};

// Glitch text animation
const glitchVariants = {
    animate: {
        textShadow: [
            "0 0 0 #FF0033, 0 0 0 #00FFFF",
            "-2px 0 0 #FF0033, 2px 0 0 #00FFFF",
            "0 0 0 #FF0033, 0 0 0 #00FFFF",
            "2px 0 0 #FF0033, -2px 0 0 #00FFFF",
            "0 0 0 #FF0033, 0 0 0 #00FFFF"
        ],
        transition: {
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 3
        }
    }
};

export default function Home() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const targetDate = new Date('2026-02-04T09:00:00+05:30').getTime();
        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home" ref={containerRef}>
            {/* Immersive Hero */}
            <section className="hero-section">
                {/* Animated Background */}
                <motion.div className="hero-bg" style={{ y, opacity }}>
                    <div className="hero-grid"></div>
                    <div className="hero-glow"></div>
                    <div className="hero-particles">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="particle"
                                initial={{
                                    x: Math.random() * 100 + "%",
                                    y: "100%",
                                    opacity: 0
                                }}
                                animate={{
                                    y: "-100%",
                                    opacity: [0, 1, 1, 0]
                                }}
                                transition={{
                                    duration: 8 + Math.random() * 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Dr. Doom */}
                <motion.div
                    className="villain-hero"
                    initial={{ opacity: 0, x: 200, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
                >
                    <motion.img
                        src="/images/doom.PNG"
                        alt="Dr. Doom"
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    />
                </motion.div>

                <div className="container hero-container">
                    {/* Flip Clock Timer */}
                    <motion.div
                        className="flip-timer"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {/* Days */}
                        <div className="flip-group">
                            <div className="flip-digit">
                                <span>{String(timeLeft.days).padStart(2, '0')[0]}</span>
                            </div>
                            <div className="flip-digit">
                                <span>{String(timeLeft.days).padStart(2, '0')[1]}</span>
                            </div>
                            <span className="flip-label">DAYS</span>
                        </div>

                        <span className="flip-colon">:</span>

                        {/* Hours */}
                        <div className="flip-group">
                            <div className="flip-digit">
                                <span>{String(timeLeft.hours).padStart(2, '0')[0]}</span>
                            </div>
                            <div className="flip-digit">
                                <span>{String(timeLeft.hours).padStart(2, '0')[1]}</span>
                            </div>
                            <span className="flip-label">HRS</span>
                        </div>

                        <span className="flip-colon">:</span>

                        {/* Minutes */}
                        <div className="flip-group">
                            <div className="flip-digit">
                                <span>{String(timeLeft.minutes).padStart(2, '0')[0]}</span>
                            </div>
                            <div className="flip-digit">
                                <span>{String(timeLeft.minutes).padStart(2, '0')[1]}</span>
                            </div>
                            <span className="flip-label">MIN</span>
                        </div>

                        <span className="flip-colon">:</span>

                        {/* Seconds */}
                        <div className="flip-group">
                            <div className="flip-digit flip-digit--active">
                                <span>{String(timeLeft.seconds).padStart(2, '0')[0]}</span>
                            </div>
                            <div className="flip-digit flip-digit--active">
                                <span>{String(timeLeft.seconds).padStart(2, '0')[1]}</span>
                            </div>
                            <span className="flip-label">SEC</span>
                        </div>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.span
                            className="hero-title-main"
                            variants={glitchVariants}
                            animate="animate"
                        >
                            E-SUMMIT
                        </motion.span>
                        <motion.span
                            className="hero-title-year"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            2026
                        </motion.span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        className="hero-tagline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        "Not all ideas are heroic."
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <Link to="/events" className="btn btn-primary">
                            <Zap size={18} /> EXPLORE EVENTS
                        </Link>
                        <Link to="/contact" className="btn btn-secondary">
                            MAKE CONTACT
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="section about-section">
                <div className="container">
                    <div className="section-header">
                        <span className="mono text-primary">MISSION_BRIEF</span>
                        <h2>The <span className="text-gradient-red">Scheme</span></h2>
                    </div>

                    <div className="about-grid">
                        <motion.div
                            className="about-content"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="about-text">
                                E-Summit 2026 is not just a fest—it's a declaration of intent.
                                Anchored around the core themes of <strong>Villains, Power, Vision, and Control</strong>,
                                this summit empowers student innovators to rewrite the systems of tomorrow.
                            </p>
                            <div className="stats-grid">
                                {[
                                    { label: 'EVENTS', val: '5' },
                                    { label: 'PRIZE_POOL', val: '₹3L+' },
                                    { label: 'PARTICIPANTS', val: '500+' }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        className="stat-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <span className="stat-value">{stat.val}</span>
                                        <span className="stat-label mono">{stat.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="villain-about"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.img
                                src="/images/mysterio2.PNG"
                                alt="Mysterio - The Master of Illusion"
                                animate={{ y: [-15, 15, -15], scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Events Preview */}
            <section className="section events-section">
                <div className="container">
                    <div className="section-header">
                        <span className="mono text-primary">FEATURED_EVENTS</span>
                        <h2>Rogues <span className="text-gradient-red">Gallery</span></h2>
                    </div>

                    <div className="events-preview-grid">
                        {events.slice(0, 4).map((event, i) => {
                            const Icon = IconMap[event.icon];
                            return (
                                <motion.div
                                    key={event.id}
                                    className={`event-preview-card event-preview-card--${event.color}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                >
                                    <div className="event-preview-icon">
                                        {Icon && <Icon size={28} />}
                                    </div>
                                    <div className="event-preview-content">
                                        <span className="event-preview-type mono">{event.tagline}</span>
                                        <h3 className="event-preview-name">{event.name}</h3>
                                        <p className="event-preview-date mono">{event.date}</p>
                                    </div>
                                    <ArrowRight size={20} className="event-preview-arrow" />
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="center-actions">
                        <Link to="/events" className="btn btn-primary">
                            VIEW ALL EVENTS <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Doc Ock Section */}
            <section className="section villain-showcase">
                <div className="container villain-showcase-container">
                    <motion.div
                        className="villain-showcase-image"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <motion.img
                            src="/images/octopusdr.PNG"
                            alt="Doc Ock"
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        />
                    </motion.div>

                    <motion.div
                        className="villain-showcase-content"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span className="mono text-primary">SUPERIOR_INTELLECT</span>
                        <h2>Mastermind <span className="text-gradient-red">Gathering</span></h2>
                        <p className="about-text">
                            The greatest minds don't follow the rules—they rewrite them.
                            Join the league of extraordinary disruptors who refuse to play by
                            society's limitations.
                        </p>
                        <Link to="/team" className="btn btn-secondary">
                            MEET THE TEAM <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
