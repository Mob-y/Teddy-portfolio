"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Home, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ isBadeline, onQuestsClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Effet pour bloquer/débloquer le défilement du body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

    const menuItems = [
        { name: "Accueil", icon: <Home size={20} />, href: "#", action: null },
        { name: "Quêtes", icon: <Code size={20} />, href: null, action: "quests" },
        { name: "Contact", icon: <Mail size={20} />, href: "#contact", action: null },
    ];

    const handleMenuClick = (item) => {
        if (item.action === "quests") {
            // Ouvre le modal des quêtes
            onQuestsClick();
            setIsOpen(false);
        } else if (item.href) {
            // Navigation normale pour les autres liens
            setIsOpen(false);
        }
    };

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
                                    href={item.href || "#"}
                                    onClick={(e) => {
                                        if (item.action === "quests") {
                                            e.preventDefault();
                                        }
                                        handleMenuClick(item);
                                    }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="nav-link group"
                                >
                                    <span className="link-icon">{item.icon}</span>
                                    <span className="link-text">{item.name}</span>
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