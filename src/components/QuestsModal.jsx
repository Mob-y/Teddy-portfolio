import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, CheckCircle, Circle } from "lucide-react";
import "./QuestsModal.css";

const QuestsModal = ({ isOpen, onClose, isBadeline }) => {
	const [quests, setQuests] = useState([]);
	const [progress, setProgress] = useState({
		completedQuests: [],
		xp: 0,
		level: 1,
	});

	const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

	const fetchQuestsData = useCallback(async () => {
		try {
			const [questsRes, progressRes] = await Promise.all([
				fetch("http://localhost:5000/api/quests"),
				fetch("http://localhost:5000/api/quests/progress"),
			]);
			const questsData = await questsRes.json();
			const progressData = await progressRes.json();
			setQuests(questsData);
			setProgress(progressData);
		} catch (err) {
			console.error("Erreur chargement quêtes:", err);
		}
	}, []);

	useEffect(() => {
		if (isOpen) {
			fetchQuestsData();
		}
	}, [isOpen, fetchQuestsData]);

	const getQuestStatus = (questId) => {
		return progress.completedQuests.includes(questId) ? "completed" : "active";
	};

	if (!isOpen) return null;

	return createPortal(
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				className={`quests-modal-overlay ${themeClass}`}
			>
				<motion.div
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					onClick={(e) => e.stopPropagation()}
					className="quests-modal-box"
				>
					{/* Header */}
					<div className="quests-modal-header">
						<div className="quests-header-content">
							<h2 className="quests-modal-title">📜 Journal de Quêtes</h2>
							<div className="quests-progress-summary">
								<span className="quest-count">
									{progress.completedQuests.length} / {quests.length} complétées
								</span>
							</div>
						</div>
						<button
							type="button"
							onClick={onClose}
							className="quests-close-btn"
							aria-label="Fermer"
						>
							<X size={32} />
						</button>
					</div>

					{/* Liste des quêtes */}
					<div className="quests-list">
						{quests.length === 0 ? (
							<div className="quests-empty">
								<p>Aucune quête disponible pour le moment...</p>
							</div>
						) : (
							quests.map((quest) => {
								const status = getQuestStatus(quest.id);
								const isCompleted = status === "completed";

								return (
									<motion.div
										key={quest.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										className={`quest-item quest-${status}`}
									>
										<div className="quest-icon-wrapper">
											{isCompleted ? (
												<CheckCircle size={28} className="quest-icon-check" />
											) : (
												<Circle size={28} className="quest-icon-pending" />
											)}
										</div>

										<div className="quest-content">
											<div className="quest-header-row">
												<h3 className="quest-title">{quest.title}</h3>
												<span className="quest-xp">+{quest.xpReward} XP</span>
											</div>

											<p className="quest-description">{quest.description}</p>

											{isCompleted && (
												<div className="quest-completed-badge">✓ Complétée</div>
											)}

											{!isCompleted && (
												<div className="quest-hint">
													💡 Indice : Explorez le site pour découvrir comment
													compléter cette quête...
												</div>
											)}
										</div>
									</motion.div>
								);
							})
						)}
					</div>

					{/* Footer stats */}
					<div className="quests-modal-footer">
						<div className="footer-stat">
							<span className="stat-label">Niveau:</span>
							<span className="stat-value">{progress.level}</span>
						</div>
						<div className="footer-stat">
							<span className="stat-label">XP Total:</span>
							<span className="stat-value">{progress.xp}</span>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		document.body,
	);
};

export default QuestsModal;