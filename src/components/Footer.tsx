import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    {/* Brand Section */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="footer__logo-text">E-SUMMIT</span>
                            <span className="footer__logo-year">2026</span>
                        </div>
                        <p className="footer__tagline">"Not all Ideas are heroic"</p>
                        <div className="footer__org-info">
                            <p>Organized by</p>
                            <p className="footer__org-name">SRMIST Entrepreneurship Cell</p>
                            <p className="footer__dept">Dept. of Computing Technologies</p>
                            <p className="footer__school">Faculty of Management</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__links-section">
                        <h4 className="footer__heading mono"> QUICK_LINKS</h4>
                        <div className="footer__links">
                            <Link to="/">Home</Link>
                            <Link to="/events">Events</Link>
                            <Link to="/schedule">Schedule</Link>
                            <Link to="/team">Team</Link>
                        </div>
                    </div>

                    {/* Events */}
                    <div className="footer__links-section">
                        <h4 className="footer__heading mono"> EVENTS</h4>
                        <div className="footer__links">
                            <Link to="/events#doctor-dev">Doctor Dev</Link>
                            <Link to="/events#infinity">Infinity</Link>
                            <Link to="/events#tva">TVA</Link>
                            <Link to="/events#octobuild">Octobuild</Link>
                            <Link to="/events#mystery-games">Mystery Games</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer__links-section">
                        <h4 className="footer__heading mono"> CONNECT</h4>
                        <div className="footer__contact">
                            <a href="mailto:ecell@srmist.edu.in">ecell@srmist.edu.in</a>
                            <p>SRM University, Kattankulathur</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} E-SUMMIT 2026. All rights reserved.
                    </p>
                    <div className="footer__socials">
                        <a href="#" aria-label="Instagram" className="footer__social"><Instagram size={18} /></a>
                        <a href="#" aria-label="LinkedIn" className="footer__social"><Linkedin size={18} /></a>
                        <a href="#" aria-label="Twitter" className="footer__social"><Twitter size={18} /></a>
                    </div>
                    <p className="footer__credit">
                        Made with <Heart size={14} fill="currentColor" style={{ display: 'inline', margin: '0 4px' }} /> by E-Cell Dev Team
                    </p>
                </div>
            </div>
        </footer>
    );
}
