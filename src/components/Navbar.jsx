"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Home, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = ({ isBadeline, onQuestsClick, onContactClick }) => {
	const [isOpen, setIsOpen] = useState(false);

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
		{ name: "Accueil", icon: <Home size={20} />, href: "#accueil", action: null },
		{ name: "Quêtes", icon: <Code size={20} />, href: null, action: "quests" },
		{ name: "Contact", icon: <Mail size={20} />, href: null, action: "contact" },
	];

	const handleMenuClick = (item) => {
		if (item.action === "quests") {
			onQuestsClick();
			setIsOpen(false);
		} else if (item.action === "contact") {
			onContactClick();
			setIsOpen(false);
		} else if (item.href) {
			setIsOpen(false);
		}
	};

	return (
		<nav className={`navbar-container ${themeClass}`}>
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
										if (item.action) e.preventDefault();
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