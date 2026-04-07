import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const CONTENT = {
	mentions: {
		title: "📜 Mentions Légales",
		sections: [
			{
				heading: "Éditeur du site",
				text: "Ce site est un portfolio personnel édité par Teddy Serin, développeur web fullstack.\nEmail : serinteddy@gmail.com",
			},
			{
				heading: "Hébergement",
				text: "Frontend hébergé sur Vercel (Vercel Inc., 340 Pine Street, Suite 900, San Francisco, CA 94104, USA).\nBackend hébergé sur Railway (Railway Corp., San Francisco, USA).",
			},
			{
				heading: "Propriété intellectuelle",
				text: "L'ensemble du contenu de ce site (textes, images, pixel art, code) est la propriété exclusive de Teddy Serin, sauf mention contraire. Toute reproduction est interdite sans autorisation préalable.",
			},
			{
				heading: "Responsabilité",
				text: "Les informations présentes sur ce site sont fournies à titre indicatif. Teddy Serin ne saurait être tenu responsable des erreurs ou omissions.",
			},
		],
	},
	cookies: {
		title: "🍪 Politique de Cookies",
		sections: [
			{
				heading: "Qu'est-ce qu'un cookie ?",
				text: "Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d'un site web. Il permet de mémoriser des informations sur votre navigation.",
			},
			{
				heading: "Cookies utilisés sur ce site",
				text: "Ce site n'utilise pas de cookies publicitaires ni de trackers tiers.\nLa progression du joueur (XP, niveau, quêtes) est stockée côté serveur via une base de données SQLite, sans cookie.",
			},
			{
				heading: "Cookies techniques",
				text: "Aucun cookie n'est déposé sur votre navigateur lors de la visite de ce portfolio. Le site fonctionne sans cookies obligatoires.",
			},
			{
				heading: "Gestion des cookies",
				text: "Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté lors de leur dépôt. Consultez les paramètres de votre navigateur pour plus d'informations.",
			},
		],
	},
	confidentialite: {
		title: "🔒 Politique de Confidentialité",
		sections: [
			{
				heading: "Données collectées",
				text: "Lors de l'utilisation du formulaire de contact, les données suivantes sont collectées : nom ou pseudo, adresse email, contenu du message. Ces données sont utilisées uniquement pour répondre à votre message.",
			},
			{
				heading: "Données de progression",
				text: "La progression du visiteur (XP, niveau, quêtes complétées, badges) est stockée anonymement sur notre serveur. Aucun identifiant personnel n'est associé à cette progression.",
			},
			{
				heading: "Conservation des données",
				text: "Les messages reçus via le formulaire de contact sont conservés dans la boîte mail personnelle de Teddy Serin et ne sont partagés avec aucun tiers.\nLa progression de jeu est réinitialisée périodiquement.",
			},
			{
				heading: "Vos droits",
				text: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez : serinteddy@gmail.com",
			},
			{
				heading: "Contact",
				text: "Pour toute question relative à la confidentialité de vos données : serinteddy@gmail.com",
			},
		],
	},
};

const LegalModal = ({ type, onClose, isBadeline }) => {
	const content = CONTENT[type];
	const themeClass = isBadeline ? "theme-badeline" : "theme-madeline";

	const style = {
		primary: isBadeline ? "rgb(147, 51, 234)" : "rgb(37, 99, 235)",
		bg: isBadeline ? "rgba(24, 5, 40, 0.98)" : "rgba(15, 23, 42, 0.98)",
		card: isBadeline ? "rgba(46, 16, 101, 0.95)" : "rgba(30, 41, 59, 0.95)",
		text: isBadeline ? "#f3e8ff" : "#e2e8f0",
		dim: isBadeline ? "#c084fc" : "#94a3b8",
		glow: isBadeline ? "rgba(147, 51, 234, 0.3)" : "rgba(37, 99, 235, 0.3)",
	};

	if (!type || !content) return null;

	return createPortal(
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 1000000,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "1rem",
					background: "rgba(0, 0, 0, 0.92)",
					backdropFilter: "blur(16px)",
					fontFamily: "'VT323', monospace",
				}}
			>
				<motion.div
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					onClick={(e) => e.stopPropagation()}
					style={{
						position: "relative",
						width: "100%",
						maxWidth: "42rem",
						maxHeight: "85vh",
						backgroundColor: style.bg,
						border: `4px solid ${style.primary}`,
						boxShadow: `0 0 30px rgba(0,0,0,0.8), 0 0 60px ${style.glow}`,
						display: "flex",
						flexDirection: "column",
						overflow: "hidden",
					}}
				>
					{/* Header */}
					<div style={{
						padding: "1.25rem 1.5rem",
						borderBottom: `3px solid ${style.primary}`,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexShrink: 0,
					}}>
						<h2 style={{
							fontSize: "clamp(1.5rem, 4vw, 2rem)",
							textTransform: "uppercase",
							fontWeight: "bold",
							color: style.text,
							margin: 0,
							letterSpacing: "-0.03em",
						}}>
							{content.title}
						</h2>
						<button
							type="button"
							onClick={onClose}
							aria-label="Fermer"
							style={{
								background: "transparent",
								border: "none",
								color: style.text,
								cursor: "pointer",
								padding: "0.25rem",
								transition: "all 0.2s",
								flexShrink: 0,
							}}
						>
							<X size={28} />
						</button>
					</div>

					{/* Body */}
					<div style={{
						flex: 1,
						overflowY: "auto",
						padding: "1.5rem",
						display: "flex",
						flexDirection: "column",
						gap: "1.25rem",
					}}>
						{content.sections.map((section, i) => (
							<div
								key={i}
								style={{
									backgroundColor: style.card,
									border: `2px solid ${style.primary}`,
									padding: "1rem",
								}}
							>
								<h3 style={{
									fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)",
									fontWeight: "bold",
									textTransform: "uppercase",
									color: style.primary === "rgb(147, 51, 234)" ? "#c084fc" : "#60a5fa",
									margin: "0 0 0.5rem 0",
									borderBottom: `1px solid ${style.primary}`,
									paddingBottom: "0.35rem",
								}}>
									{section.heading}
								</h3>
								<p style={{
									fontSize: "clamp(1rem, 2vw, 1.25rem)",
									color: style.text,
									margin: 0,
									lineHeight: 1.5,
									whiteSpace: "pre-line",
									opacity: 0.9,
								}}>
									{section.text}
								</p>
							</div>
						))}

						<p style={{
							fontSize: "0.9rem",
							color: style.dim,
							textAlign: "center",
							marginTop: "0.5rem",
							fontStyle: "italic",
						}}>
							Dernière mise à jour : Avril 2026
						</p>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>,
		document.body,
	);
};

export default LegalModal;