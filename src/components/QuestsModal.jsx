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
		badges: [],
		titles: [],
		activeBadge: null,
		title: null,
	});
	const [activeTab, setActiveTab] = useState("quests"); // "quests" | "customize"

	const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

	const fetchQuestsData = useCallback(async () => {
		try {
			const [questsRes, progressRes] = await Promise.all([
				fetch(`${import.meta.env.VITE_API_URL}/api/quests`),
				fetch(`${import.meta.env.VITE_API_URL}/api/quests/progress`),
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

	const handleEquipBadge = async (badge) => {
		try {
			await fetch(`${import.meta.env.VITE_API_URL}/api/quests/equip/badge`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ badge }),
			});
			setProgress((prev) => ({ ...prev, activeBadge: badge }));
			window.dispatchEvent(new CustomEvent("questUpdated"));
		} catch (err) {
			console.error("Erreur équipement badge:", err);
		}
	};

	const handleEquipTitle = async (title) => {
		try {
			await fetch(`${import.meta.env.VITE_API_URL}/api/quests/equip/title`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title }),
			});
			setProgress((prev) => ({ ...prev, title }));
			window.dispatchEvent(new CustomEvent("questUpdated"));
		} catch (err) {
			console.error("Erreur équipement titre:", err);
		}
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

					{/* Tabs */}
					<div className="quests-tabs">
						<button
							type="button"
							className={`quests-tab ${activeTab === "quests" ? "quests-tab-active" : ""}`}
							onClick={() => setActiveTab("quests")}
						>
							⚔ Quêtes
						</button>
						<button
							type="button"
							className={`quests-tab ${activeTab === "customize" ? "quests-tab-active" : ""}`}
							onClick={() => setActiveTab("customize")}
						>
							🎨 Personnalisation
						</button>
					</div>

					{/* Contenu */}
					{activeTab === "quests" ? (
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
													<div className="quest-completed-info">
														<span className="quest-completed-badge">✓ Complétée</span>
														{quest.badge && (
															<img
																src={`/images/${quest.badge}`}
																alt={quest.badge}
																className="quest-badge-preview"
															/>
														)}
													</div>
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
					) : (
						/* Onglet Personnalisation */
						<div className="quests-list">
							{/* Section Badges */}
							<div className="customize-section">
								<h3 className="customize-section-title">🏅 Badge équipé</h3>
								{progress.badges.length === 0 ? (
									<p className="customize-empty">
										Complète des quêtes pour débloquer des badges !
									</p>
								) : (
									<div className="customize-grid">
										{progress.badges.map((badge) => {
											const isActive = progress.activeBadge === badge;
											return (
												<motion.button
													key={badge}
													type="button"
													onClick={() => handleEquipBadge(badge)}
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.95 }}
													className={`customize-item ${isActive ? "customize-item-active" : ""}`}
												>
													<img
														src={`/images/${badge}`}
														alt={badge}
														className="customize-badge-img"
													/>
													{isActive && (
														<span className="customize-equipped-label">Équipé</span>
													)}
												</motion.button>
											);
										})}
									</div>
								)}
							</div>

							{/* Section Titres */}
							<div className="customize-section">
								<h3 className="customize-section-title">✨ Titre équipé</h3>
								{progress.titles?.length === 0 || !progress.titles ? (
									<p className="customize-empty">
										Complète des quêtes spéciales pour débloquer des titres !
									</p>
								) : (
									<div className="customize-titles-list">
										{progress.titles.map((titleName) => {
											const isActive = progress.title === titleName;
											return (
												<motion.button
													key={titleName}
													type="button"
													onClick={() => handleEquipTitle(titleName)}
													whileHover={{ x: 4 }}
													whileTap={{ scale: 0.98 }}
													className={`customize-title-item ${isActive ? "customize-title-active" : ""}`}
												>
													<span className="customize-title-name">
														{isActive ? "★" : "☆"} {titleName}
													</span>
													{isActive && (
														<span className="customize-equipped-label">Équipé</span>
													)}
												</motion.button>
											);
										})}
									</div>
								)}
							</div>

							{/* Prévisualisation HUD */}
							<div className="customize-section">
								<h3 className="customize-section-title">👁 Aperçu HUD</h3>
								<div className="customize-preview">
									{progress.title && (
										<div className="customize-preview-title">✨ {progress.title}</div>
									)}
									<div className="customize-preview-badge-row">
										{progress.activeBadge ? (
											<img
												src={`/images/${progress.activeBadge}`}
												alt="badge actif"
												className="customize-preview-badge"
											/>
										) : (
											<span className="customize-empty">Aucun badge équipé</span>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Footer */}
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