import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./ContactModal.css";

const MAX_MESSAGE_LENGTH = 500;

const ContactModal = ({ isOpen, onClose, isBadeline }) => {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState("idle");
	const [questUnlocked, setQuestUnlocked] = useState(false);

	const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";
	const npcText = isBadeline
		? "« Tu veux vraiment me contacter ? Hmm... je suppose que tu peux laisser un message. »"
		: "« Un projet en tête ? N'hésite pas à m'écrire, je réponds vite ! »";
	const npcName = isBadeline ? "Part_of_Me.exe" : "Teddy_Serin.js";

	const validate = () => {
		const newErrors = {};
		if (!form.name.trim()) newErrors.name = "Ce champ est requis";
		if (!form.email.trim()) {
			newErrors.email = "Ce champ est requis";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = "Email invalide";
		}
		if (!form.message.trim()) newErrors.message = "Ce champ est requis";
		return newErrors;
	};

	const handleChange = useCallback((e) => {
		const { name, value } = e.target;
		if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	}, []);

	const handleSubmit = async () => {
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		setStatus("loading");
		try {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await res.json();
			if (res.ok && data.success) {
				setStatus("success");
				if (data.questResult?.success) {
					setQuestUnlocked(true);
					window.dispatchEvent(
						new CustomEvent("questUpdated", {
							detail: {
								quest: {
									title: data.questResult.quest.title,
									description: data.questResult.quest.description,
									xp:
										data.questResult.quest.xpReward ??
										data.questResult.quest.xp,
								},
							},
						}),
					);
				}
			} else {
				setStatus("error");
			}
		} catch (err) {
			console.error("Erreur envoi contact:", err);
			setStatus("error");
		}
	};

	const handleClose = () => {
		setForm({ name: "", email: "", message: "" });
		setErrors({});
		setStatus("idle");
		setQuestUnlocked(false);
		onClose();
	};

	if (!isOpen) return null;

	return createPortal(
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={handleClose}
				className={`contact-modal-overlay ${themeClass}`}
			>
				<motion.div
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					onClick={(e) => e.stopPropagation()}
					className="contact-modal-box"
				>
					<div className="contact-modal-header">
						<h2 className="contact-modal-title">📨 Contact</h2>
						<button
							type="button"
							onClick={handleClose}
							className="contact-close-btn"
							aria-label="Fermer"
						>
							<X size={32} />
						</button>
					</div>

					<div className="contact-modal-body">
						{status === "success" ? (
							<div className="contact-success-screen">
								<div className="contact-success-icon">📨</div>
								<h3 className="contact-success-title">Message envoyé !</h3>
								<p className="contact-success-text">
									Ton message a bien été transmis. Je te répondrai dès que
									possible !
								</p>
								{questUnlocked && (
									<div className="contact-success-quest">
										<span>📨</span>
										<span>Quête débloquée : Messager (+80 XP)</span>
									</div>
								)}
								<button
									type="button"
									onClick={handleClose}
									className="contact-success-btn"
								>
									✓ Fermer
								</button>
							</div>
						) : (
							<>
								<div className="contact-npc-intro">
									<img
										src="images/avatar.png"
										alt="Avatar"
										className="contact-npc-avatar"
										style={{
											filter: isBadeline
												? "hue-rotate(280deg) brightness(0.8)"
												: "none",
										}}
									/>
									<div>
										<div className="contact-npc-name">{npcName}</div>
										<div className="contact-npc-text">{npcText}</div>
									</div>
								</div>

								<div className="contact-form">
									<div className="contact-field">
										<label htmlFor="contact-name" className="contact-label">
											<span>▶</span> Nom / Pseudo
										</label>
										<input
											id="contact-name"
											type="text"
											name="name"
											value={form.name}
											onChange={handleChange}
											placeholder="Entrez votre nom..."
											className={`contact-input${errors.name ? " input-error" : ""}`}
											autoComplete="off"
										/>
										{errors.name && (
											<span className="contact-error-msg">⚠ {errors.name}</span>
										)}
									</div>

									<div className="contact-field">
										<label htmlFor="contact-email" className="contact-label">
											<span>▶</span> Email
										</label>
										<input
											id="contact-email"
											type="email"
											name="email"
											value={form.email}
											onChange={handleChange}
											placeholder="votre@email.com"
											className={`contact-input${errors.email ? " input-error" : ""}`}
											autoComplete="off"
										/>
										{errors.email && (
											<span className="contact-error-msg">
												⚠ {errors.email}
											</span>
										)}
									</div>

									<div className="contact-field">
										<label htmlFor="contact-message" className="contact-label">
											<span>▶</span> Message
										</label>
										<textarea
											id="contact-message"
											name="message"
											value={form.message}
											onChange={handleChange}
											placeholder="Votre message ici..."
											className={`contact-textarea${errors.message ? " input-error" : ""}`}
										/>
										<span className="contact-char-counter">
											{form.message.length} / {MAX_MESSAGE_LENGTH}
										</span>
										{errors.message && (
											<span className="contact-error-msg">
												⚠ {errors.message}
											</span>
										)}
									</div>

									{status === "error" && (
										<p
											className="contact-error-msg"
											style={{ textAlign: "center" }}
										>
											⚠ Erreur lors de l'envoi. Réessaie plus tard.
										</p>
									)}

									<motion.button
										type="button"
										onClick={handleSubmit}
										disabled={status === "loading"}
										className="contact-submit-btn"
										whileTap={{ scale: 0.97 }}
									>
										{status === "loading"
											? "⏳ Envoi en cours..."
											: "⚔ Envoyer le message"}
									</motion.button>
								</div>
							</>
						)}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		document.body,
	);
};

export default ContactModal;
