"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import "./QuestNotification.css";

const QuestNotification = ({ isBadeline }) => {
	const [questData, setQuestData] = useState(null);
	const [show, setShow] = useState(false);
	const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

	useEffect(() => {
		const handleQuestUpdate = (event) => {
			// Supporte les deux formats : { detail: { quest: {...} } } et { detail: {...} }
			const raw = event.detail?.quest ?? event.detail;
			if (raw?.title) {
				// Normalise xp : accepte xpReward OU xp
				const normalized = {
					...raw,
					xp: raw.xpReward ?? raw.xp ?? 0,
				};
				setQuestData(normalized);
				setShow(true);
				const timer = setTimeout(() => setShow(false), 5000);
				return () => clearTimeout(timer);
			}
		};
		window.addEventListener("questUpdated", handleQuestUpdate);
		return () => window.removeEventListener("questUpdated", handleQuestUpdate);
	}, []);

	if (typeof document === "undefined") return null;

	return createPortal(
		<AnimatePresence>
			{show && questData && (
				<div className={`quest-notification-wrapper ${themeClass}`}>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className="quest-notification-container"
					>
						<div className="quest-notification-box">
							<div className="quest-content">
								<div className="quest-icon">🏆</div>
								<div className="quest-text-block">
									<h4 className="quest-status-title">Quête Accomplie</h4>
									<p className="quest-title-name">{questData.title}</p>
									<p className="quest-xp-bonus">+{questData.xp} XP</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body,
	);
};

export default QuestNotification;
