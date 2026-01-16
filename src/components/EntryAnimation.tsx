import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock, ShieldAlert, Cpu } from 'lucide-react';
import './EntryAnimation.css';

interface EntryAnimationProps {
    onEnter: () => void;
}

export default function EntryAnimation({ onEnter }: EntryAnimationProps) {
    const [phase, setPhase] = useState<'LOCKED' | 'HACKING' | 'GRANTED'>('LOCKED');
    const [hackProgress, setHackProgress] = useState(0);

    // Auto-start the sequence
    useEffect(() => {
        const startSequence = async () => {
            // Phase 1: Locked State (Brief pause)
            await new Promise(r => setTimeout(r, 1000));
            setPhase('HACKING');
        };
        startSequence();
    }, []);

    // Hacking Progress Simulation
    useEffect(() => {
        if (phase === 'HACKING') {
            const interval = setInterval(() => {
                setHackProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setPhase('GRANTED');
                        return 100;
                    }
                    return prev + Math.random() * 5; // Random increment
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [phase]);

    // Cleanup and exit
    useEffect(() => {
        if (phase === 'GRANTED') {
            setTimeout(() => {
                onEnter();
            }, 1500); // Wait for granted animation to finish before unmounting
        }
    }, [phase, onEnter]);

    return (
        <motion.div
            className="entry-container"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="noise-overlay"></div>

            <AnimatePresence mode='wait'>
                {phase === 'LOCKED' && (
                    <motion.div
                        key="locked"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        className="entry-phase"
                    >
                        <motion.div
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                        >
                            <ShieldAlert size={64} className="icon-locked" />
                        </motion.div>
                        <h1 className="glitch-text text-danger">SYSTEM LOCKED</h1>
                        <p className="mono text-muted">SECURE CONNECTION REQUIRED</p>
                    </motion.div>
                )}

                {phase === 'HACKING' && (
                    <motion.div
                        key="hacking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="entry-phase"
                    >
                        <div className="hack-loader">
                            <motion.div
                                className="hack-bar"
                                style={{ width: `${hackProgress}%` }}
                            />
                        </div>
                        <div className="hack-status">
                            <Cpu size={24} className="spin-icon" />
                            <span className="mono">BYPASSING FIREWALL... {Math.floor(hackProgress)}%</span>
                        </div>
                        <div className="code-rain">
                            {/* Decorative code lines */}
                            <p>{` INJECTING PAYLOAD...`}</p>
                            <p>{` DECRYPTING KEY: ${'x7F9a2B'}`}</p>
                            <p>{` ROOT ACCESS: PENDING`}</p>
                        </div>
                    </motion.div>
                )}

                {phase === 'GRANTED' && (
                    <motion.div
                        key="granted"
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="entry-phase"
                    >
                        <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Unlock size={80} className="icon-granted" />
                        </motion.div>
                        <motion.h1
                            className="text-primary glow-text"
                            animate={{ textShadow: ["0 0 10px #ff0033", "0 0 30px #ff0033", "0 0 10px #ff0033"] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            ACCESS GRANTED
                        </motion.h1>
                        <motion.p
                            className="mono text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            WELCOME TO THE LAIR
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
