"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import "./PlayerHUD.css";

const PlayerHUD = ({ isBadeline }) => {
	const [progress, setProgress] = useState({ xp: 0, level: 1, badges: [] });
	const [showLevelUp, setShowLevelUp] = useState(false);
	const previousLevelRef = useRef(null);

	const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

	const fetchProgress = useCallback(async () => {
		try {
			const res = await fetch("http://localhost:5000/api/quests/progress");
			if (!res.ok) throw new Error("Erreur réseau");
			const data = await res.json();

			if (
				previousLevelRef.current !== null &&
				data.level > previousLevelRef.current
			) {
				setShowLevelUp(true);
				setTimeout(() => setShowLevelUp(false), 3000);
			}

			previousLevelRef.current = data.level;
			setProgress(data);
		} catch (err) {
			console.error("Erreur récupération progression", err);
		}
	}, []);

	useEffect(() => {
		fetchProgress();
		window.addEventListener("questUpdated", fetchProgress);
		const interval = setInterval(fetchProgress, 1000);
		return () => {
			window.removeEventListener("questUpdated", fetchProgress);
			clearInterval(interval);
		};
	}, [fetchProgress]);

	const xpForCurrentLevel = (progress.level - 1) * 100;
	const displayXP = Math.max(0, progress.xp - xpForCurrentLevel);

	return (
		<div className={`hud-root ${themeClass}`}>
			{/* HUD PRINCIPAL */}
			<div className="hud-container">
				<div className="hud-header">
					<motion.span
						key={progress.level}
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className="hud-level"
					>
						LVL {progress.level}
					</motion.span>
					<span className="hud-xp-text">{displayXP} / 100 XP</span>
				</div>

				<div className="hud-progress-bar-bg">
					<motion.div
						className="hud-progress-bar-fill"
						initial={{ width: 0 }}
						animate={{ width: `${displayXP}%` }}
						transition={{ duration: 0.8, ease: "circOut" }}
					/>
				</div>

				{progress.badges?.length > 0 && (
					<div className="hud-badges-wrapper">
						{progress.badges.map((badge) => (
							<motion.span
								key={badge}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className="hud-badge"
							>
								{badge}
							</motion.span>
						))}
					</div>
				)}
			</div>

			{/* ANIMATION LEVEL UP */}

			{typeof document !== "undefined" &&
				createPortal(
					<AnimatePresence>
						{showLevelUp && (
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
								className="levelup-portal-overlay"
							>
								<motion.div
									animate={{
										rotate: [-2, 2, -2],
										scale: [1, 1.1, 1],
									}}
									transition={{ repeat: Infinity, duration: 0.5 }}
									className="levelup-text"
								>
									<img
										src={
											isBadeline
												? "/images/moongreen.gif"
												: "/images/moonblue.gif"
										}
										alt="berry"
										className="levelup-berry"
										style={{
											filter: isBadeline
												? "grayscale(100%) brightness(0.5) sepia(100%) hue-rotate(220deg) saturate(500%) drop-shadow(0 0 8px #9333ea)"
												: "none",
										}}
									/>
									LEVEL UP
									<img
										src={
											isBadeline
												? "/images/moongreen.gif"
												: "/images/moonblue.gif"
										}
										alt="berry"
										className="levelup-berry"
										style={{
											filter: isBadeline
												? "grayscale(100%) brightness(0.5) sepia(100%) hue-rotate(220deg) saturate(500%) drop-shadow(0 0 8px #9333ea)"
												: "none",
										}}
									/>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</div>
	);
};

export default PlayerHUD;
