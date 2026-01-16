import { useState, useEffect } from "react";
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


const floatTransition = (duration = 3, delay = 0) => ({
  duration: duration,
  repeat: Infinity,
  ease: "easeInOut",
  delay: delay,
});

const floatAnimation = (yAmplitude = -6) => ({
  y: [0, yAmplitude, 0],
});

const PROJECTS = [
  {
    id: 1,
    title: "Scythe Design",
    description:
      "Un asset d'arme stylisée réalisé en Pixel Art pour un projet de jeu vidéo.",
    image: "/images/scythe.PNG",
    tag: "Weapon",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 2,
    title: "Broken Blade",
    description:
      "Concept d'épée brisée avec un focus sur les textures et les reflets métalliques.",
    image: "/images/brokenblade.PNG",
    tag: "Weapon",
    techs: ["Procreate"],
    link: "#",
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
    title: "Health Potion",
    description: "Design d'une bouteille en verre avec des reflets travaillés.",
    image: "/images/bottle.PNG",
    tag: "Item",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 5,
    title: "Star Blade",
    description: "Une arme légendaire aux effets cosmiques.",
    image: "/images/starblade.PNG",
    tag: "Weapon",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 6,
    title: "Wild Project 1",
    description:
      "Une immersion dans le monde de la musique réalisée en équipe.",
    image: "/images/neon808.png",
    tag: "Fullstack",
    techs: ["HTML", "CSS", "JS"],
    link: "https://neon808.vercel.app/",
    github: "https://github.com/GigiJuliette/wcs-project1#",
  },
];



const Particles = ({ isBadeline }) => {
  const particleColor = isBadeline ? "#9333ea" : "#fb7185";
  return (
    <div
      key={isBadeline ? "bad" : "mad"}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -250, 0],
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
          style={{
            backgroundColor: particleColor,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: "4px",
            height: "4px",
            boxShadow: isBadeline ? "0 0 10px #9333ea" : "0 0 10px #f97316",
          }}
        />
      ))}
    </div>
  );
};

const BadelineSide = ({ isBadeline }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ghosts, setGhosts] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  // Dans le useEffect de BadelineSide
useEffect(() => {
  if (isBadeline && !hasStarted) {
    const professionText = document.getElementById("job-title");
    if (professionText) {
      const rect = professionText.getBoundingClientRect();
      
      // On augmente l'offset à 80 pour l'éloigner davantage vers la droite
      setPos({ 
        x: rect.right + 80 + window.scrollX, 
        y: rect.top + (rect.height / 2) + window.scrollY 
      });
      setHasStarted(true);
    }
  } else if (!isBadeline) {
    setHasStarted(false);
  }
}, [isBadeline, hasStarted]);

  if (!isBadeline) return null;

  const teleport = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const sound = new Audio("/sounds/disappear.wav");
    sound.volume = 0.1;
    sound.play().catch(() => {});

    const newGhost = { id: Date.now(), x: pos.x, y: pos.y };
    setGhosts((prev) => [...prev, newGhost]);
    setTimeout(() => {
      setGhosts((prev) => prev.filter((g) => g.id !== newGhost.id));
    }, 500);

    const fullHeight = document.documentElement.scrollHeight;
    const fullWidth = document.documentElement.scrollWidth;
    setPos({ 
      x: Math.floor(Math.random() * (fullWidth - 200)) + 100, 
      y: Math.floor(Math.random() * (fullHeight - 200)) + 100 
    });
  };

  return (
    <>
      <AnimatePresence>
        {ghosts.map((ghost) => (
          <motion.div
            key={ghost.id}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              left: ghost.x,
              top: ghost.y,
              width: "45px",
              height: "45px",
              backgroundImage: `url("/images/badeline.png")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.5) sepia(1) hue-rotate(250deg) saturate(5) blur(2px)",
              imageRendering: "pixelated",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 999998,
            }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        onClick={teleport}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ 
          width: "55px", 
          height: "55px", 
          imageRendering: "pixelated",
          position: "absolute", 
          zIndex: 999999,
          cursor: "pointer",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.2, filter: "brightness(1.3) drop-shadow(0 0 20px #9333ea)" }}
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url("/images/badeline.png")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-purple-600/30 blur-2xl -z-10 rounded-full animate-pulse" />
      </motion.div>
    </>
  );
};

const TypewriterText = ({ text, keyId }) => {
  const words = text.split(" ");
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
      style={{ display: "inline" }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            marginRight: "0.25em",
          }}
        >
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span
              variants={child}
              key={letterIndex}
              style={{ display: "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};


export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isBadeline, setIsBadeline] = useState(false);
  const [isDashing, setIsDashing] = useState(false);

  const theme = {
    primary: isBadeline ? "#9333ea" : "#f97316",
    secondary: isBadeline ? "#1e1b4b" : "#7c3aed",
    bg: isBadeline ? "#070311" : "#ffcea6",
    text: isBadeline ? "#e9d5ff" : "#431407",
    accent: isBadeline ? "#fb7185" : "#f59e0b",
    cardBg: isBadeline ? "rgba(15, 10, 30, 0.95)" : "rgba(255, 247, 237, 0.9)",
    cardBorder: isBadeline ? "#4c1d95" : "#fed7aa",
  };

  const SKILLS = [
    {
      name: "Frontend",
      tools: "React, Vite, Tailwind",
      color: isBadeline ? "text-purple-400" : "text-[#f97316]",
      icon: <LayoutDashboard size={20} />,
      delay: 0,
    },
    {
      name: "Backend",
      tools: "Node, Express",
      color: isBadeline ? "text-fuchsia-400" : "text-[#7c3aed]",
      icon: <Code2 size={20} />,
      delay: 0.2,
    },
    {
      name: "Database",
      tools: "MySQL, Workbench",
      color: isBadeline ? "text-violet-500" : "text-[#ea580c]",
      icon: <Database size={20} />,
      delay: 0.4,
    },
    {
      name: "Design",
      tools: "Procreate, UI/UX",
      color: isBadeline ? "text-rose-400" : "text-[#f59e0b]",
      icon: <Palette size={20} />,
      delay: 0.6,
    },
  ];

  const toggleMode = () => {
    const sound = new Audio("/sounds/dash.wav");
    sound.volume = 0.1;
    sound.play().catch(() => {});
    setIsDashing(true);
    setIsBadeline(!isBadeline);
    setTimeout(() => setIsDashing(false), 500);
  };

  return (
    <motion.div
      className="min-h-screen font-['VT323'] transition-colors duration-700 overflow-x-hidden relative"
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


      <button
        onClick={toggleMode}
        className="fixed top-8 right-8 z-[100] flex flex-col items-center gap-2 outline-none"
      >
        <div
          className="text-xl uppercase font-bold"
          style={{ color: theme.primary }}
        >
          {isBadeline ? "Part of Me" : "Madeline"}
        </div>
        <div
          className="relative w-20 h-10 border-4 transition-all overflow-hidden shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
          style={{
            borderColor: theme.primary,
            backgroundColor: `${theme.primary}20`,
          }}
        >
          <motion.div
            animate={{ x: isBadeline ? 40 : 0 }}
            className="w-8 h-full"
            style={{ backgroundColor: theme.primary }}
          />
        </div>
      </button>

      <header className="relative py-32 px-8 max-w-6xl mx-auto text-center z-10 flex flex-col items-center justify-center">
        <h1
          className="text-8xl md:text-[10rem] leading-none uppercase drop-shadow-md relative"
          style={{ color: theme.primary }}
        >
          Teddy Serin
        </h1>
    {/* Dans ton composant App, modifie la balise <p> du métier */}
<motion.p
  id="job-title" // <--- ON AJOUTE CET ID ICI
  animate={floatAnimation(-5)}
  transition={floatTransition(4)}
  className="mt-4 text-3xl md:text-4xl uppercase opacity-80"
>
  &gt; Développeur Fullstack _ Pixel Artist
</motion.p>
      </header>

      <section className="relative max-w-5xl mx-auto px-6 mb-40 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 flex flex-col space-y-8">
            <h2
              className="text-4xl md:text-5xl uppercase font-bold flex items-center gap-4"
              style={{ color: theme.accent }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-3xl md:text-4xl"
                style={{
                  filter: isBadeline
                    ? "grayscale(100%) brightness(0.7) sepia(100%) hue-rotate(250deg) saturate(600%) drop-shadow(0 0 8px #9333ea)"
                    : "none",
                }}
              >
                🍓
              </motion.div>
              01. Dossier Joueur
            </h2>

            <motion.div
              animate={floatAnimation(-8)}
              transition={floatTransition(3.5, 0.1)}
              className="border-4 p-8 shadow-md backdrop-blur-md"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              }}
            >
              <p className="text-2xl md:text-3xl mb-6">
                Expert en design issu de{" "}
                <span
                  className="font-bold underline"
                  style={{ textDecorationColor: theme.accent }}
                >
                  Doranco
                </span>
                .
              </p>
              <p className="text-2xl md:text-3xl">
                Actuellement à la{" "}
                <span
                  className="font-bold underline"
                  style={{ textDecorationColor: theme.primary }}
                >
                  Wild Code School
                </span>
                .
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.a
                animate={floatAnimation(-5)}
                transition={floatTransition(3, 0)}
                href="https://github.com/Mob-y"
                target="_blank"
                className="h-16 md:h-20 border-4 flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-sm"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                }}
              >
                <Code2 size={24} style={{ color: theme.primary }} />{" "}
                <span className="font-bold">GITHUB</span>
              </motion.a>
              <motion.a
                animate={floatAnimation(-5)}
                transition={floatTransition(3, 0.3)}
                href="https://www.linkedin.com/in/teddy-serin-56215a266/"
                target="_blank"
                className="h-16 md:h-20 border-4 flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-sm"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                }}
              >
                <LayoutDashboard size={24} style={{ color: theme.primary }} />{" "}
                <span className="font-bold">LINKEDIN</span>
              </motion.a>
              <motion.a
                animate={floatAnimation(-5)}
                transition={floatTransition(3, 0.6)}
                href="mailto:serinteddy@gmail.com"
                className="h-16 md:h-20 border-4 flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-sm group overflow-hidden"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.accent,
                }}
              >
                <Mail size={24} style={{ color: theme.accent }} />
                <span className="font-bold group-hover:hidden uppercase">
                  Gmail
                </span>
                <span className="font-bold hidden group-hover:block text-sm lowercase text-center">
                  serinteddy@gmail.com
                </span>
              </motion.a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {SKILLS.map((skill) => (
              <motion.div
                key={skill.name}
                animate={floatAnimation(-6)}
                transition={floatTransition(3.2, skill.delay)}
                className="flex items-center gap-4 border-l-8 border-4 p-4 shadow-sm"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.cardBorder,
                  borderLeftColor: theme.primary,
                }}
              >
                <div className={skill.color}>{skill.icon}</div>
                <div>
                  <div className="text-xl uppercase font-bold">
                    {skill.name}
                  </div>
                  <div className="text-lg opacity-70 uppercase">
                    {skill.tools}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <main className="relative max-w-6xl mx-auto px-8 pb-40 z-10">
        <h2 className="text-6xl font-bold uppercase mb-16">02. Inventaire</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={p.id}
              animate={floatAnimation(-10)}
              transition={floatTransition(4, idx * 0.2)}
              whileHover={{ scale: 1.02, y: -15 }}
              onClick={() => setSelectedProject(p)}
              className="cursor-pointer border-4 shadow-lg overflow-hidden transition-all"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.cardBorder,
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full aspect-video object-cover border-b-4"
                style={{
                  imageRendering: "pixelated",
                  borderColor: theme.cardBorder,
                }}
              />
              <div className="p-8">
                <h3 className="text-4xl uppercase font-bold">{p.title}</h3>
                <p className="text-2xl opacity-60 uppercase italic">
                  // {p.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <section className="relative max-w-4xl mx-auto px-8 mb-40 z-10">
        <motion.div
          animate={floatAnimation(-12)}
          transition={floatTransition(5)}
          className="border-8 p-6 bg-black text-white shadow-xl"
          style={{ borderColor: theme.primary }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div
              className="w-32 h-32 border-4 shrink-0 overflow-hidden"
              style={{ borderColor: theme.primary }}
            >
              <img
                src="images/avatar.png"
                alt="Avatar"
                className="w-full h-full object-cover object-[50%_20%]"
                style={{
                  imageRendering: "pixelated",
                  filter: isBadeline
                    ? "hue-rotate(280deg) brightness(0.8)"
                    : "none",
                }}
              />
            </div>
            <div className="flex-1 space-y-4">
              <h3
                className="text-3xl font-bold"
                style={{ color: theme.primary }}
              >
                {isBadeline ? "Part_of_Me.exe" : "Teddy_Serin.js"}
              </h3>
              <div className="text-2xl md:text-3xl min-h-[100px]">
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
        className="py-20 text-center border-t-8 transition-all z-10"
        style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}
      >
        <p className="text-3xl uppercase tracking-widest font-bold opacity-40">
          Teddy Serin — {isBadeline ? "Part of Me" : "The Summit"} — 2026
        </p>
      </footer>

{typeof document !== 'undefined' && createPortal(
  <AnimatePresence>
    {selectedProject && (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={() => setSelectedProject(null)} 
        className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} 
          animate={{ scale: 1, y: 0 }} 
          onClick={(e) => e.stopPropagation()} 
          className="relative max-w-4xl w-full border-8 p-6 md:p-8 flex flex-col items-center shadow-2xl overflow-y-auto max-h-[90vh]" 
          style={{ backgroundColor: theme.bg, borderColor: theme.primary, color: theme.text }}
        >
          <div className="w-full flex justify-between items-center mb-6 border-b-4 pb-4" style={{ borderColor: theme.cardBorder }}>
            <span className="text-2xl md:text-3xl uppercase font-bold" style={{ color: theme.primary }}>Inspection de l'item</span>
            <X size={40} className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setSelectedProject(null)} />
          </div>

          <img src={selectedProject.image} className="max-h-[35vh] w-auto border-4 mb-6 shadow-md object-contain" style={{ imageRendering: "pixelated", borderColor: theme.cardBorder }} />

          <h2 className="text-4xl md:text-6xl uppercase font-bold text-center mb-4">{selectedProject.title}</h2>
          <p className="text-xl md:text-2xl opacity-70 uppercase mb-8 text-center">{selectedProject.description}</p>

          <div className="flex flex-wrap justify-center gap-4">
            {selectedProject.link && selectedProject.link !== "#" && (
              <a href={selectedProject.link} target="_blank" rel="noreferrer" className="text-xl px-10 py-3 uppercase font-bold text-white transition-transform hover:scale-105 shadow-md" style={{ backgroundColor: theme.primary }}>🔗 Voir le site</a>
            )}
            {selectedProject.github && (
              <a href={selectedProject.github} target="_blank" rel="noreferrer" className="text-xl px-10 py-3 uppercase font-bold border-4 transition-transform hover:scale-105 shadow-md" style={{ borderColor: theme.primary, color: theme.primary }}>📁 Voir le code</a>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>,
  document.body
)}

      <BadelineSide isBadeline={isBadeline} />
    </motion.div>
  );
}