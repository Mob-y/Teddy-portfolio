import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const PlayerHUD = ({ isBadeline }) => {
	const [progress, setProgress] = useState({ xp: 0, level: 1, badges: [] });
	const [showLevelUp, setShowLevelUp] = useState(false);

	// On utilise une Ref pour le previousLevel pour éviter de casser le cache du useCallback
	const previousLevelRef = useRef(null);

	const accentColor = isBadeline ? "rgb(147, 51, 234)" : "rgb(37, 99, 235)";
	const borderColor = isBadeline ? "border-purple-500" : "border-blue-500";
	const bgColor = isBadeline ? "bg-purple-600" : "bg-blue-600";

	const fetchProgress = useCallback(async () => {
		try {
			const res = await fetch("http://localhost:5000/api/quests/progress");
			if (!res.ok) throw new Error("Erreur réseau");
			const data = await res.json();

			// Logique de Level Up
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
	}, []); // Plus besoin de dépendances ici grâce à la Ref !

	useEffect(() => {
		fetchProgress();
		window.addEventListener("questUpdated", fetchProgress);
		const interval = setInterval(fetchProgress, 1000);

		return () => {
			window.removeEventListener("questUpdated", fetchProgress);
			clearInterval(interval);
		};
	}, [fetchProgress]);

	// Calcul de l'XP relative
	const xpForCurrentLevel = (progress.level - 1) * 100;
	const displayXP = Math.max(0, progress.xp - xpForCurrentLevel);

	return (
		<>
			{/* HUD en haut à gauche */}
			<div
				className={`fixed top-5 left-5 w-64 bg-black/80 backdrop-blur-md p-4 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-colors duration-700 z-[9999] ${borderColor}`}
				style={{ fontFamily: "'VT323', monospace" }}
			>
				<div className="mb-2 flex justify-between text-xl uppercase tracking-tighter text-white">
					<motion.span
						key={progress.level}
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						LVL {progress.level}
					</motion.span>
					<span>{displayXP} / 100 XP</span>
				</div>

				<div className="w-full h-4 bg-gray-900 border border-white/20 overflow-hidden p-0.5">
					<motion.div
						className="h-full"
						initial={{ width: 0 }}
						animate={{ width: `${displayXP}%`, backgroundColor: accentColor }}
						transition={{ duration: 0.8, ease: "circOut" }}
					/>
				</div>

				{/* Utilisation de bgColor pour les badges */}
				{progress.badges && progress.badges.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-2">
						{progress.badges.map((badge) => (
							<motion.span
								key={badge}
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								className={`text-[10px] uppercase font-bold px-2 py-0.5 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] ${bgColor}`}
							>
								{badge}
							</motion.span>
						))}
					</div>
				)}
			</div>

{/* ANIMATION LEVEL UP via Portal */}
{createPortal(
    <AnimatePresence>
        {showLevelUp && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)" }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000000,
                    pointerEvents: 'none',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                }}
            >
                <motion.div
                    animate={{ 
                        rotate: [-2, 2, -2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    // Ajout de tracking-tighter et de la typo VT323
                    className="text-7xl md:text-9xl font-bold italic uppercase tracking-tighter"
                    style={{
                        color: accentColor,
                        fontFamily: "'VT323', monospace", // TA TYPO ICI
                        textShadow: "8px 8px 0px #000",
                        textAlign: 'center',
                        lineHeight: 0.8
                    }}
                >
                    🍓 LEVEL UP 🍓
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>,
    document.body
)}
		</>
	);
};

export default PlayerHUD;
