import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Palette,
  LayoutDashboard,
  X,
} from "lucide-react";

const PROJECTS = [
  { id: 1, title: "Scythe Design", description: "Un asset d'arme stylisée réalisé en Pixel Art pour un projet de jeu vidéo.", image: "/images/scythe.PNG", tag: "Weapon", techs: ["Procreate"], link: "#" },
  { id: 2, title: "Broken Blade", description: "Concept d'épée brisée avec un focus sur les textures et les reflets métalliques.", image: "/images/brokenblade.PNG", tag: "Weapon", techs: ["Procreate"], link: "#" },
  { id: 3, title: "The Room", description: "Travail d'ambiance et de perspective sur un décor intérieur pixelisé.", image: "/images/room.PNG", tag: "Environment", techs: ["Procreate"], link: "#" },
  { id: 4, title: "Health Potion", description: "Design d'une bouteille en verre avec des reflets travaillés.", image: "/images/bottle.PNG", tag: "Item", techs: ["Procreate"], link: "#" },
  { id: 5, title: "Star Blade", description: "Une arme légendaire aux effets cosmiques.", image: "/images/starblade.PNG", tag: "Weapon", techs: ["Procreate"], link: "#" },
  { id: 6, title: "Gestionnaire Fullstack", description: "Architecture complète permettant la gestion dynamique de données via une API REST.", image: "/images/capture-wcs.png", tag: "Fullstack", techs: ["React", "Node.js", "MySQL"], link: "https://github.com/Mob-y" },
];

// PARTICULES AVEC FIX DE DISPARITION (KEY UNIQUE)
const Particles = ({ isBadeline }) => {
  const particleColor = isBadeline ? "#9333ea" : "#ff00ff"; 
  
  return (
    <div key={isBadeline ? "bad" : "mad"} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -250, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute"
          style={{ 
            backgroundColor: particleColor, 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            width: "8px", 
            height: "8px",
            border: isBadeline ? "1px solid #ffffff44" : "2px solid #000000",
            boxShadow: isBadeline ? "0 0 10px #9333ea" : "0 0 10px #ff00ff",
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBadeline, setIsBadeline] = useState(false);
  const [isDashing, setIsDashing] = useState(false);

  // LOGIQUE AUDIO DU DASH
  const playDashSound = () => {
    const audio = new Audio("/sounds/dash.wav"); // Assure-toi que le fichier est ici
    audio.volume = 0.1;
    audio.play().catch(err => console.log("Audio bloqué par le navigateur", err));
  };

  const theme = {
    primary: isBadeline ? "#9333ea" : "#f97316",
    secondary: isBadeline ? "#1e1b4b" : "#7c3aed",
    bg: isBadeline ? "#020105" : "#fff7ed",
    text: isBadeline ? "#e9d5ff" : "#431407",
    accent: isBadeline ? "#fb7185" : "#f59e0b",
    cardBg: isBadeline ? "rgba(15, 10, 30, 0.95)" : "rgba(255, 247, 237, 0.9)",
    cardBorder: isBadeline ? "#4c1d95" : "#fed7aa",
  };

  const SKILLS = [
    { name: "Frontend", tools: "React, Vite, Tailwind", color: isBadeline ? "text-purple-400" : "text-[#f97316]", icon: <LayoutDashboard size={20} /> },
    { name: "Backend", tools: "Node, Express", color: isBadeline ? "text-fuchsia-400" : "text-[#7c3aed]", icon: <Code2 size={20} /> },
    { name: "Database", tools: "MySQL, Workbench", color: isBadeline ? "text-violet-500" : "text-[#ea580c]", icon: <Database size={20} /> },
    { name: "Design", tools: "Procreate, UI/UX", color: isBadeline ? "text-rose-400" : "text-[#f59e0b]", icon: <Palette size={20} /> },
  ];

  const toggleMode = () => {
    playDashSound(); // DECLENCHE LE SON
    setIsDashing(true);
    setIsBadeline(!isBadeline);
    setTimeout(() => setIsDashing(false), 500);
  };

  return (
    <motion.div 
      className="min-h-screen font-['VT323'] transition-colors duration-700 overflow-x-hidden relative" 
      style={{ backgroundColor: theme.bg, color: theme.text }}
      animate={isDashing ? { 
        x: [-20, 20, -10, 10, 0], 
        filter: ["brightness(2) contrast(1.2)", "brightness(1) contrast(1)"] 
      } : {}}
      transition={{ duration: 0.2 }}
    >
      
      <Particles isBadeline={isBadeline} />

      {/* EFFETS DE FOND */}
      <div className="fixed inset-0 pointer-events-none transition-all duration-1000 z-0" 
           style={{ 
             background: isBadeline 
               ? `radial-gradient(circle at 50% 0%, #2e1065, transparent 70%)` 
               : `linear-gradient(to bottom, #ffedd5 0%, #fed7aa 50%, #7c3aed22 100%)`, 
             opacity: isBadeline ? 0.5 : 1 
           }} />

      {/* BOUTON SWITCH */}
      <button onClick={toggleMode} className="fixed top-8 right-8 z-[100] flex flex-col items-center gap-2 outline-none group">
        <div className="text-xl uppercase tracking-widest mb-1 font-bold" style={{ color: theme.primary }}>
          {isBadeline ? "Part of Me" : "Madeline"}
        </div>
        <div className="relative w-20 h-10 border-4 transition-all duration-500 overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]" 
             style={{ borderColor: theme.primary, backgroundColor: `${theme.primary}20` }}>
          <motion.div animate={{ x: isBadeline ? 40 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-8 h-full" style={{ backgroundColor: theme.primary }} />
        </div>
      </button>

      {/* HERO SECTION */}
      <header className="relative py-32 px-8 max-w-6xl mx-auto text-center z-10">
        <motion.div key={isBadeline ? "badeline" : "madeline"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-8xl md:text-[10rem] leading-none font-normal tracking-tight bg-clip-text text-transparent uppercase drop-shadow-[0_6px_0_rgba(0,0,0,0.1)]"
              style={{ backgroundImage: `linear-gradient(to bottom, ${isBadeline ? '#fff' : '#ea580c'}, ${theme.primary}, ${theme.secondary})` }}>
            Teddy Serin
          </h1>
          <p className="mt-4 text-3xl md:text-4xl tracking-wide uppercase opacity-80">
            &gt; Développeur Fullstack _ Pixel Artist
          </p>
        </motion.div>
      </header>

      {/* BIO & SKILLS */}
      <section className="relative max-w-5xl mx-auto px-8 mb-40 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3 space-y-8">
            <h2 className="text-5xl uppercase tracking-tighter flex items-center gap-4 font-bold" style={{ color: theme.accent }}>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-4xl">🍓</motion.div>
              01. Dossier Joueur
            </h2>
            <div className="border-4 p-8 shadow-[10px_10px_0_0_rgba(0,0,0,0.1)] backdrop-blur-md"
                 style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <p className="text-3xl leading-snug mb-6">Expert en design issu de <span className="font-bold underline" style={{ textDecorationColor: theme.accent }}>Doranco</span>.</p>
              <p className="text-3xl leading-snug">Actuellement à la <span className="font-bold underline" style={{ textDecorationColor: theme.primary }}>Wild Code School</span>.</p>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="flex items-center gap-4 border-l-8 border-4 p-4 shadow-sm"
                   style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, borderLeftColor: theme.primary }}>
                <div className={skill.color}>{skill.icon}</div>
                <div>
                  <div className="text-2xl uppercase font-bold">{skill.name}</div>
                  <div className="text-xl opacity-70 uppercase">{skill.tools}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVENTAIRE */}
      <main className="relative max-w-6xl mx-auto px-8 pb-40 z-10">
        <div className="flex items-center gap-6 mb-16 text-6xl font-bold uppercase tracking-tighter">
          <h2>Inventaire</h2>
          <div className="h-2 flex-1 border-y-2 opacity-20" style={{ borderColor: theme.cardBorder }}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PROJECTS.map((project) => (
            <motion.div key={project.id} whileHover={{ scale: 1.02, y: -5 }} onClick={() => setSelectedProject(project)}
              className="group cursor-pointer border-4 shadow-[12px_12px_0_0_rgba(0,0,0,0.1)] overflow-hidden transition-all"
              style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
              <div className="aspect-video overflow-hidden relative border-b-4" style={{ borderColor: theme.cardBorder }}>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" style={{ imageRendering: "pixelated" }} />
              </div>
              <div className="p-8">
                <h3 className="text-4xl uppercase font-bold">{project.title}</h3>
                <p className="text-2xl opacity-60 uppercase mb-8 italic">// {project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.techs.map((tech) => (
                    <span key={tech} className="text-xl px-3 py-1 border font-bold" style={{ color: theme.primary, borderColor: `${theme.primary}40` }}>[{tech}]</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-20 text-center border-t-8 transition-all" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
        <p className="text-3xl uppercase tracking-widest font-bold opacity-40">
          Teddy Serin — {isBadeline ? "Face à l'ombre" : "Sommet atteint"} — 2026
        </p>
      </footer>

      {/* MODALE */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}
                      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}
                        className="max-w-4xl w-full border-8 p-8 flex flex-col items-center"
                        style={{ backgroundColor: theme.bg, borderColor: theme.primary }}>
              <div className="w-full flex justify-between items-center mb-6 border-b-4 pb-4" style={{ borderColor: theme.cardBorder }}>
                <span className="text-3xl uppercase font-bold" style={{ color: theme.primary }}>Inspection de l'item</span>
                <X size={40} className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setSelectedProject(null)} />
              </div>
              <img src={selectedProject.image} alt={selectedProject.title} className="max-h-[50vh] border-4" style={{ imageRendering: "pixelated", borderColor: theme.cardBorder }} />
              <h2 className="text-6xl uppercase mt-6 font-bold">{selectedProject.title}</h2>
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="mt-8 text-3xl px-10 py-2 uppercase font-bold text-white transition-transform hover:scale-105"
                 style={{ backgroundColor: theme.primary }}>Voir le code</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}