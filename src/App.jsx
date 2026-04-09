import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Code2,
	Database,
	Palette,
	LayoutDashboard,
	X,
	Mail,
} from "lucide-react";
import { createPortal } from "react-dom";
import PlayerHUD from "./components/PlayerHUD";
import QuestsModal from "./components/QuestsModal";
import QuestNotification from "./components/QuestNotification";
import Navbar from "./components/Navbar";
import LegalModal from "./components/LegalModal";
import "./App.css";
import QuestTracker from "./components/QuestsTracker";
import ContactModal from "./components/ContactModal";

const floatTransition = (duration = 3, delay = 0) => ({
	duration,
	repeat: Infinity,
	ease: "easeInOut",
	delay,
});

const floatAnimation = (yAmplitude = -6) => ({
	y: [0, yAmplitude, 0],
});

const PROJECTS = [
	{
		id: 1,
		title: "Wild Project 1",
		description:
			"Une immersion dans le monde de la musique réalisée en équipe.",
		image: "/images/neon808.png",
		tag: "Fullstack",
		techs: ["HTML", "CSS", "JS"],
		link: "https://neon808.vercel.app/",
		github: "https://github.com/GigiJuliette/wcs-project1#",
	},
	{
		id: 2,
		title: "Wild Project 2",
		description: "Plonger dans un site de voyage de luxe",
		image: "/images/aurumhorizon.png",
		tag: "Fullstack",
		techs: ["HTML", "CSS", "JS"],
		link: "https://aurum-horizon.netlify.app/",
		github:
			"https://github.com/ChickenCodeSchool/Js-Crew809-TeamRocket-P2-G2-aurumhorizons",
	},
	{
		id: 3,
		title: "The Room",
		description:
			"Travail d'ambiance et de perspective sur un décor intérieur pixelisé.",
		image: "/images/room.PNG",
		tag: "Environment",
		techs: ["Procreate"],
		link: "#",
	},
	{
		id: 4,
		title: "Scythe Design",
		description:
			"Un asset d'arme stylisée réalisé en Pixel Art pour un projet de jeu vidéo.",
		image: "/images/scythe.PNG",
		tag: "Weapon",
		techs: ["Procreate"],
		link: "#",
	},
	{
		id: 5,
		title: "Broken Blade",
		description:
			"Concept d'épée brisée avec un focus sur les textures et les reflets métalliques.",
		image: "/images/brokenblade.PNG",
		tag: "Weapon",
		techs: ["Procreate"],
		link: "#",
	},
	{
		id: 6,
		title: "Cloud in the bottle",
		description: "Design d'une bouteille en verre avec des reflets travaillés.",
		image: "/images/bottle.PNG",
		tag: "Item",
		techs: ["Procreate"],
		link: "#",
	},
	{
		id: 7,
		title: "Star Blade",
		description: "Une arme légendaire aux effets cosmiques.",
		image: "/images/starblade.PNG",
		tag: "Weapon",
		techs: ["Procreate"],
		link: "#",
	},
];

/* =============================================
   PARTICLES
   ============================================= */
const Particles = ({ isBadeline }) => {
	const particleColor = isBadeline ? "#9333ea" : "#2563eb";
	const boxShadow = isBadeline
		? "0 0 10px rgb(147, 51, 234)"
		: "0 0 10px #0ea5e9";
	return (
		<div
			key={isBadeline ? "bad-particles" : "mad-particles"}
			className="particles-container"
		>
			{[...Array(40)].map((_, i) => (
				<motion.div
					key={`p-${isBadeline ? "bad" : "mad"}-${i}`}
					initial={{ opacity: 0 }}
					animate={{
						y: [0, -250, 0],
						x: [0, Math.random() * 100 - 50, 0],
						rotate: [0, 180, 360],
						opacity: [0, 0.8, 0],
					}}
					transition={{
						duration: Math.random() * 4 + 3,
						repeat: Infinity,
						ease: "linear",
					}}
					className="particle"
					style={{
						backgroundColor: particleColor,
						boxShadow,
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
					}}
				/>
			))}
		</div>
	);
};

/* =============================================
   BADELINE SIDE
   ============================================= */
const BadelineSide = ({ isBadeline, completeBadelineQuest }) => {
	const [pos, setPos] = useState({ x: -100, y: -100 });
	const [ghosts, setGhosts] = useState([]);
	const [clickCount, setClickCount] = useState(0);
	const [questValidated, setQuestValidated] = useState(false);

	useEffect(() => {
		if (isBadeline) {
			const updateInitialPos = () => {
				const el = document.getElementById("job-title");
				if (el) {
					const rect = el.getBoundingClientRect();
					setPos({
						x: rect.right + 15 + window.scrollX,
						y: rect.top + rect.height / 2 + window.scrollY - 20,
					});
				}
			};
			setTimeout(updateInitialPos, 200);
		} else {
			setClickCount(0);
			setQuestValidated(false);
		}
	}, [isBadeline]);

	useEffect(() => {
		if (clickCount >= 5 && !questValidated) {
			setQuestValidated(true);
			if (completeBadelineQuest) completeBadelineQuest();
		}
	}, [clickCount, questValidated, completeBadelineQuest]);

	const teleport = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const sound = new Audio("/sounds/disappear.wav");
		sound.volume = 0.1;
		sound.play().catch(() => {});
		setClickCount(clickCount + 1);
		setGhosts((prev) => [...prev, { id: Date.now(), x: pos.x, y: pos.y }]);
		setTimeout(() => setGhosts((prev) => prev.slice(1)), 500);
		const docWidth = document.documentElement.offsetWidth;
		const docHeight = document.documentElement.scrollHeight;
		const margin = 100;
		setPos({
			x: Math.random() * (docWidth - margin * 2) + margin,
			y: Math.random() * (docHeight - margin * 2) + margin,
		});
	};

	if (!isBadeline) return null;

	return (
		<>
			{ghosts.map((ghost) => (
				<motion.div
					key={ghost.id}
					initial={{ opacity: 0.6, scale: 1 }}
					animate={{ opacity: 0, scale: 1.4 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="badeline-ghost"
					style={{
						position: "absolute",
						left: ghost.x,
						top: ghost.y,
						zIndex: 9998,
						pointerEvents: "none",
						transform: "translate(-50%, -50%)",
					}}
				/>
			))}
			<motion.div
				key="badeline-main"
				onClick={teleport}
				animate={{ x: pos.x, y: pos.y }}
				transition={{ type: "spring", stiffness: 400, damping: 25 }}
				className="badeline-sprite-wrapper"
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					zIndex: 1000000,
					cursor: "pointer",
					pointerEvents: "auto",
				}}
			>
				<motion.div
					animate={{ y: [0, -12, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					className="badeline-sprite"
					style={{ pointerEvents: "none" }}
				/>
				<div className="badeline-glow" />
			</motion.div>
		</>
	);
};

/* =============================================
   TYPEWRITER
   ============================================= */
const TypewriterText = ({ text, keyId }) => {
	const wordItems = text
		.split(" ")
		.map((w, i) => ({ id: `word-${keyId}-${i}`, val: w }));
	const container = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.03, delayChildren: 0.1 },
		},
	};
	const child = {
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", damping: 12, stiffness: 200 },
		},
		hidden: { opacity: 0, y: 5 },
	};
	return (
		<motion.span
			key={keyId}
			variants={container}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true }}
		>
			{wordItems.map((item) => (
				<motion.span
					key={item.id}
					variants={child}
					style={{ display: "inline-block", marginRight: "0.25em" }}
				>
					{item.val}
				</motion.span>
			))}
		</motion.span>
	);
};

/* =============================================
   COMPOSANT PRINCIPAL : APP
   ============================================= */
export default function App() {
	const [selectedProject, setSelectedProject] = useState(null);
	const [isBadeline, setIsBadeline] = useState(false);
	const [isDashing, setIsDashing] = useState(false);
	const [questsModalOpen, setQuestsModalOpen] = useState(false);
	const [contactModalOpen, setContactModalOpen] = useState(false);
	const [legalModal, setLegalModal] = useState(null);

	const theme = {
		primary: isBadeline ? "#9333ea" : "#2563eb",
		bg: isBadeline ? "#070311" : "#cbd5e1",
		text: isBadeline ? "#e9d5ff" : "#0f172a",
		accent: isBadeline ? "#fb7185" : "#0ea5e9",
		cardBg: isBadeline ? "rgba(15, 10, 30, 0.95)" : "rgba(255, 255, 255, 0.9)",
		cardShadow: isBadeline ? "8px 8px 0px #4c1d95" : "8px 8px 0px #2563eb",
		cardBorder: isBadeline ? "#4c1d95" : "#2563eb",
	};

	const SKILLS = [
		{
			id: "sk-front",
			name: "Frontend",
			tools: "React, Vite, Tailwind",
			color: isBadeline ? "#c084fc" : "#3b82f6",
			icon: <LayoutDashboard size={28} />,
			delay: 0,
		},
		{
			id: "sk-back",
			name: "Backend",
			tools: "Node, Express",
			color: isBadeline ? "#e879f9" : "#0284c7",
			icon: <Code2 size={28} />,
			delay: 0.2,
		},
		{
			id: "sk-db",
			name: "Database",
			tools: "MySQL, Workbench",
			color: isBadeline ? "#a855f7" : "#6366f1",
			icon: <Database size={28} />,
			delay: 0.4,
		},
		{
			id: "sk-design",
			name: "Design",
			tools: "Procreate, UI/UX",
			color: isBadeline ? "#fb7185" : "#06b6d4",
			icon: <Palette size={28} />,
			delay: 0.6,
		},
	];

	const handleBadelineQuest = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/quests/3/validate`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ answer: 5 }),
				},
			);
			const data = await response.json();
			if (response.ok && data.success) {
				window.dispatchEvent(
					new CustomEvent("questUpdated", {
						detail: {
							quest: {
								title: data.quest.title,
								description: data.quest.description,
								xp: data.quest.xpReward,
							},
						},
					}),
				);
				const victorySound = new Audio("/sounds/victory.wav");
				victorySound.volume = 0.2;
				victorySound.play().catch(() => {});
			} else {
				console.warn("Quête déjà validée ou erreur :", data.message);
			}
		} catch (err) {
			console.error("Erreur réseau:", err);
		}
	};

	const toggleMode = () => {
		const sound = new Audio("/sounds/dash.wav");
		sound.volume = 0.1;
		sound.play().catch(() => {});
		setIsDashing(true);
		setIsBadeline((prev) => !prev);
		setTimeout(() => setIsDashing(false), 500);
	};

	return (
		<>
			<motion.div
				className="app-root"
				style={{ backgroundColor: theme.bg, color: theme.text }}
				animate={
					isDashing
						? {
								x: [-20, 20, -15, 15, 0],
								filter: [
									"brightness(2) contrast(1.5)",
									"brightness(1) contrast(1)",
								],
							}
						: {}
				}
			>
				<Particles isBadeline={isBadeline} />
				<PlayerHUD isBadeline={isBadeline} />
				<QuestNotification isBadeline={isBadeline} />
				<QuestTracker isBadeline={isBadeline} />

				<header id="accueil" className="site-header">
					<h1 className="site-title" style={{ color: theme.primary }}>
						Teddy Serin
					</h1>
					<motion.p
						id="job-title"
						animate={floatAnimation(-5)}
						transition={floatTransition(4)}
						className="site-subtitle"
					>
						&gt; Développeur Fullstack _ Pixel Artist
					</motion.p>
				</header>

				<section id="bio" className="section-player">
					<div className="player-grid">
						<div className="player-col-main">
							<h2 className="section-title" style={{ color: theme.accent }}>
								<motion.div
									animate={{ y: [0, -8, 0] }}
									transition={{ repeat: Infinity, duration: 2.5 }}
									className="section-title-icon"
								>
									<img
										src={
											isBadeline
												? "/images/moongreen.gif"
												: "/images/moonblue.gif"
										}
										alt="Berry"
										style={{
											filter: isBadeline
												? "grayscale(100%) brightness(0.5) sepia(100%) hue-rotate(220deg) saturate(500%) drop-shadow(0 0 8px #9333ea)"
												: "none",
										}}
									/>
								</motion.div>
								01. Dossier Joueur
							</h2>
							<div
								style={{
									flex: 1,
									display: "flex",
									flexDirection: "column",
									marginTop: "3rem",
								}}
							>
								<motion.div
									animate={floatAnimation(-8)}
									transition={floatTransition(3.5, 0.1)}
									className="player-card"
									style={{
										backgroundColor: theme.cardBg,
										borderColor: theme.cardBorder,
										boxShadow: theme.cardShadow,
									}}
								>
									<div>
										<p className="player-card-text">
											Explorateur du web et artisan du pixel. Je transforme des
											concepts complexes en interfaces fluides et en mondes
											pixelisés.
										</p>
										<p
											className="player-card-quote"
											style={{ borderLeftColor: theme.primary }}
										>
											"Le sommet n'est qu'une étape, l'important est la
											précision du dash."
										</p>
									</div>
									<div
										className="player-stats"
										style={{ borderTopColor: `${theme.cardBorder}40` }}
									>
										<div>
											<span style={{ color: theme.primary }}>LVL:</span> 28
										</div>
										<div>
											<span style={{ color: theme.primary }}>STAMINA:</span> MAX
										</div>
										<div>
											<span style={{ color: theme.primary }}>EXP:</span> DORANCO
											• WCS
										</div>
										<div>
											<span style={{ color: theme.primary }}>LOC:</span> FR
										</div>
									</div>
								</motion.div>
								<div className="social-grid">
									<motion.a
										animate={floatAnimation(-5)}
										transition={floatTransition(3, 0)}
										href="https://github.com/Mob-y"
										target="_blank"
										rel="noopener noreferrer"
										className="social-link"
										style={{
											backgroundColor: theme.cardBg,
											borderColor: theme.cardBorder,
											boxShadow: theme.cardShadow,
										}}
									>
										<Code2
											size={30}
											className="social-link-icon"
											style={{ color: theme.primary }}
										/>
										<span className="social-link-text">GITHUB</span>
										<span className="social-link-email-hidden">
											github.com/Mob-y
										</span>
									</motion.a>
									<motion.a
										animate={floatAnimation(-5)}
										transition={floatTransition(3, 0.3)}
										href="https://www.linkedin.com/in/teddy-serin-56215a266/"
										target="_blank"
										rel="noopener noreferrer"
										className="social-link"
										style={{
											backgroundColor: theme.cardBg,
											borderColor: theme.cardBorder,
											boxShadow: theme.cardShadow,
										}}
									>
										<LayoutDashboard
											size={30}
											className="social-link-icon"
											style={{ color: theme.primary }}
										/>
										<span className="social-link-text">LINKEDIN</span>
										<span className="social-link-email-hidden">
											linkedin.com/in/teddy-serin
										</span>
									</motion.a>
									<motion.a
										animate={floatAnimation(-5)}
										transition={floatTransition(3, 0.6)}
										href="mailto:serinteddy@gmail.com"
										className="social-link"
										style={{
											backgroundColor: theme.cardBg,
											borderColor: theme.accent,
											boxShadow: theme.cardShadow,
										}}
									>
										<Mail
											size={30}
											className="social-link-icon"
											style={{ color: theme.accent }}
										/>
										<span
											className="social-link-text"
											style={{ color: theme.accent }}
										>
											Gmail
										</span>
										<span className="social-link-email-hidden">
											serinteddy@gmail.com
										</span>
									</motion.a>
								</div>
							</div>
						</div>
						<div className="player-col-skills">
							<div className="skills-spacer" aria-hidden="true" />
							<div className="skills-list">
								{SKILLS.map((skill) => (
									<motion.div
										key={skill.id}
										animate={floatAnimation(-6)}
										transition={floatTransition(3.2, skill.delay)}
										className="skill-card"
										style={{
											backgroundColor: theme.cardBg,
											borderColor: theme.cardBorder,
											borderLeftColor: theme.primary,
											boxShadow: theme.cardShadow,
										}}
									>
										<div style={{ color: skill.color, flexShrink: 0 }}>
											{skill.icon}
										</div>
										<div>
											<div className="skill-name">{skill.name}</div>
											<div className="skill-tools">{skill.tools}</div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</section>

				<main id="projects" className="section-inventory">
					<h2 className="inventory-title">02. Inventaire</h2>
					<div className="projects-grid">
						{PROJECTS.map((p, idx) => (
							<motion.div
								key={`project-${p.id}`}
								animate={floatAnimation(-10)}
								transition={floatTransition(4, idx * 0.2)}
								whileHover={{ scale: 1.02, y: -15 }}
								onClick={() => setSelectedProject(p)}
								className="project-card"
								style={{
									backgroundColor: theme.cardBg,
									borderColor: theme.cardBorder,
									boxShadow: theme.cardShadow,
								}}
							>
								<img
									src={p.image}
									alt={p.title}
									className="project-card-img"
									style={{ borderBottomColor: theme.cardBorder }}
								/>
								<div className="project-card-body">
									<h3 className="project-card-title">{p.title}</h3>
									<p className="project-card-desc">{p.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</main>

				<section id="contact" className="section-contact">
					<motion.div
						animate={floatAnimation(-12)}
						transition={floatTransition(5)}
						className="contact-card"
						style={{ borderColor: theme.primary }}
					>
						<div className="contact-inner">
							<div
								className="contact-avatar"
								style={{ borderColor: theme.primary }}
							>
								<img
									src="images/avatar.png"
									alt="Avatar"
									style={{
										filter: isBadeline
											? "hue-rotate(280deg) brightness(0.8)"
											: "none",
									}}
								/>
							</div>
							<div className="contact-content">
								<h3 className="contact-name" style={{ color: theme.primary }}>
									{isBadeline ? "Part_of_Me.exe" : "Teddy_Serin.js"}
								</h3>
								<div className="contact-text">
									<TypewriterText
										keyId={isBadeline ? "bad" : "mad"}
										text={
											isBadeline
												? "« Tu penses vraiment pouvoir finir ce projet tout seul ? L'ascension est encore longue... »"
												: "« Un projet en tête ou juste envie de discuter Pixel Art et Fullstack ? Je suis à un dash de distance ! »"
										}
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</section>

				<footer
					className="site-footer"
					style={{
						backgroundColor: theme.cardBg,
						borderTopColor: theme.cardBorder,
						color: theme.text,
					}}
				>
					<p>Teddy Serin — {isBadeline ? "Part of Me" : "The Summit"} — 2026</p>
					<div className="footer-links">
						<button
							type="button"
							onClick={() => setLegalModal("mentions")}
							className="footer-btn"
							style={{ color: theme.primary }}
						>
							Mentions légales
						</button>
						<button
							type="button"
							onClick={() => setLegalModal("cookies")}
							className="footer-btn"
							style={{ color: theme.primary }}
						>
							Cookies
						</button>
						<button
							type="button"
							onClick={() => setLegalModal("confidentialite")}
							className="footer-btn"
							style={{ color: theme.primary }}
						>
							Confidentialité
						</button>
					</div>
				</footer>

				<BadelineSide
					isBadeline={isBadeline}
					completeBadelineQuest={handleBadelineQuest}
				/>
			</motion.div>

			{typeof document !== "undefined" &&
				createPortal(
					<>
						<Navbar
							isBadeline={isBadeline}
							onQuestsClick={() => setQuestsModalOpen(true)}
							onContactClick={() => setContactModalOpen(true)}
						/>

						<button type="button" onClick={toggleMode} className="toggle-btn">
							<div className="toggle-label" style={{ color: theme.primary }}>
								{isBadeline ? "Part of Me" : "Madeline"}
							</div>
							<div
								className="toggle-track"
								style={{
									borderColor: theme.primary,
									backgroundColor: `${theme.primary}20`,
								}}
							>
								<motion.div
									animate={{ x: isBadeline ? 40 : 0 }}
									className="toggle-thumb"
									style={{ backgroundColor: theme.primary }}
								/>
							</div>
						</button>

						<AnimatePresence>
							{selectedProject && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={() => setSelectedProject(null)}
									className="modal-overlay"
								>
									<motion.div
										initial={{ scale: 0.9, y: 20 }}
										animate={{ scale: 1, y: 0 }}
										onClick={(e) => e.stopPropagation()}
										className="modal-box"
										style={{
											backgroundColor: theme.bg,
											borderColor: theme.primary,
											color: theme.text,
										}}
									>
										<div
											className="modal-header"
											style={{ borderBottomColor: theme.cardBorder }}
										>
											<span
												className="modal-header-label"
												style={{ color: theme.primary }}
											>
												Inspection de l'item
											</span>
											<X
												size={40}
												className="modal-close"
												onClick={() => setSelectedProject(null)}
											/>
										</div>
										<img
											src={selectedProject.image}
											alt={selectedProject.title}
											className="modal-img"
											style={{ borderColor: theme.cardBorder }}
										/>
										<h2 className="modal-title">{selectedProject.title}</h2>
										<p className="modal-desc">{selectedProject.description}</p>
										<div className="modal-actions">
											{selectedProject.link && selectedProject.link !== "#" && (
												<a
													href={selectedProject.link}
													target="_blank"
													rel="noopener noreferrer"
													className="modal-btn-primary"
													style={{ backgroundColor: theme.primary }}
												>
													🔗 Voir le site
												</a>
											)}
											{selectedProject.github && (
												<a
													href={selectedProject.github}
													target="_blank"
													rel="noopener noreferrer"
													className="modal-btn-outline"
													style={{
														borderColor: theme.primary,
														color: theme.primary,
													}}
												>
													📁 Voir le code
												</a>
											)}
										</div>
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>

						<QuestsModal
							isOpen={questsModalOpen}
							onClose={() => setQuestsModalOpen(false)}
							isBadeline={isBadeline}
						/>
						<ContactModal
							isOpen={contactModalOpen}
							onClose={() => setContactModalOpen(false)}
							isBadeline={isBadeline}
						/>

						{/* ✅ FIX : AnimatePresence ici pour que exit() fonctionne */}
						<AnimatePresence>
							{legalModal && (
								<LegalModal
									key={legalModal}
									type={legalModal}
									onClose={() => setLegalModal(null)}
									isBadeline={isBadeline}
								/>
							)}
						</AnimatePresence>
					</>,
					document.body,
				)}
		</>
	);
}
