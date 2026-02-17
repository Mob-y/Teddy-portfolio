"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code, Home, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import "./Navbar.css"; 

const Navbar = ({ isBadeline }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Effet pour bloquer/débloquer le défilement du body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Nettoyage si le composant est démonté (ex: changement de page)
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

    const menuItems = [
        { name: "Accueil", icon: <Home size={20} />, href: "#" },
        { name: "Quêtes", icon: <Code size={20} />, href: "#quêtes" },
        { name: "Contact", icon: <Mail size={20} />, href: "#contact" },
    ];

    return (
        <nav className={`navbar-container ${themeClass}`}>
            {/* BOUTON BURGER */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="nav-button"
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <X size={32} className="nav-icon" />
                ) : (
                    <Menu size={32} className="nav-icon" />
                )}
            </button>

            {/* MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="nav-overlay"
                    >
                        <div className="nav-list">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="nav-link group"
                                >
                                    <span className="link-icon">
                                        {item.icon}
                                    </span>
                                    <span className="link-text">
                                        {item.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;