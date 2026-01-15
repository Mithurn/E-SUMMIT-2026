import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/team', label: 'Team' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/venue', label: 'Venue' },
    { path: '/contact', label: 'Contact' }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <>
            <motion.nav
                className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="navbar__container glass-panel">
                    <Link to="/" className="navbar__logo">
                        <img src="/images/logo.JPG" alt="E-SUMMIT 2026" className="navbar__logo-img" />
                    </Link>

                    {/* Desktop Links */}
                    <div className="navbar__links">
                        {navLinks.map(link => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                                    onMouseEnter={() => setHoveredPath(link.path)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                >
                                    {hoveredPath === link.path && (
                                        <motion.div
                                            layoutId="navbar-hover"
                                            className="navbar__hover-bg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="navbar__active-indicator"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            )
                        })}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar__hamburger"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="navbar__mobile-menu glass-panel"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                    >
                        <div className="navbar__mobile-links">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`navbar__mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
