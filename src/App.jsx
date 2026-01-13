import { motion } from "framer-motion";
import { Linkedin, Mail, Github, ExternalLink } from "lucide-react";
// 1. Tes données (Modifie les noms d'images et les liens GitHub ici)
const PROJECTS = [
  {
    id: 1,
    title: "Scythe Design",
    description:
      "Un asset d'arme stylisée réalisé en Pixel Art pour un projet de jeu vidéo.",
    image: "/images/scythe.PNG", // Attention au .PNG en majuscule !
    tag: "Pixel Art",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 2,
    title: "Broken Blade",
    description:
      "Concept d'épée brisée avec un focus sur les textures et les reflets métalliques.",
    image: "/images/brokenblade.PNG",
    tag: "Design",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 3,
    title: "The Room",
    description:
      "Travail d'ambiance et de perspective sur un décor intérieur pixelisé.",
    image: "/images/room.PNG",
    tag: "Environnement",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 4,
    title: "Star Blade",
    description: "Une arme légendaire aux effets cosmiques.",
    image: "/images/starblade.PNG",
    tag: "Pixel Art",
    techs: ["Procreate"],
    link: "#",
  },
  {
    id: 5,
    title: "Projet Fullstack WCS",
    description:
      "Une application web complète développée à la Wild Code School. Gestion de base de données et interface dynamique.",
    image: "/images/capture-wcs.png",
    tag: "Fullstack",
    techs: ["React", "Node.js", "MySQL"],
    link: "https://github.com/ton-pseudo/ton-repo",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      {/* SECTION HERO (En-tête) */}
      <header className="py-20 px-8 max-w-6xl mx-auto text-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent italic">
      TEDDY SERIN
    </h1>
    <p className="mt-6 text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto">
      Développeur <span className="text-white font-medium">Fullstack</span> passionné par le <span className="text-white font-medium">Pixel Art</span> et les expériences immersives.
    </p>

    {/* BOUTONS DE CONTACT */}
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      <a 
        href="https://www.linkedin.com/in/teddy-serin-56215a266/" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2 bg-[#0077b5]/10 border border-[#0077b5]/50 px-5 py-2.5 rounded-full text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all font-bold"
      >
        <Linkedin size={20} /> LinkedIn
      </a>
      
      <a 
        href="mailto:ton-email@exemple.com" 
        className="flex items-center gap-2 bg-white/5 border border-white/20 px-5 py-2.5 rounded-full text-white hover:bg-white hover:text-black transition-all font-bold"
      >
        <Mail size={20} /> Me contacter
      </a>

      <a 
        href="https://github.com/Mob-y" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-5 py-2.5 rounded-full text-white hover:bg-slate-700 transition-all font-bold"
      >
        <Github size={20} /> GitHub
      </a>
    </div>
  </motion.div>
</header>

      {/* SECTION BIO / PARCOURS */}
<section className="max-w-4xl mx-auto px-8 mb-24">
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-slate-900/30 border border-slate-800 p-8 md:p-12 rounded-[2rem] backdrop-blur-sm"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400 font-mono">01. Mon Parcours</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          Issu d'une formation de <span className="text-white font-semibold">Web Designer chez Doranco</span>, 
          j'ai développé un œil aiguisé pour l'UI/UX et une passion pour le <span className="text-white font-semibold">Pixel Art</span>.
        </p>
        <p className="text-slate-300 leading-relaxed">
          Aujourd'hui, je fusionne cette créativité avec la technique en suivant la formation 
          <span className="text-white font-semibold"> Développeur Fullstack à la Wild Code School</span>. 
          Mon objectif : bâtir des applications robustes sans jamais sacrifier le design.
        </p>
      </div>
      
      {/* Petit encadré "Stats" ou "Stack" */}
      <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 text-center">Stack Actuelle</h3>
        <ul className="space-y-2 text-sm font-mono text-slate-400">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span> React / Vite
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Node.js / Express
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> MySQL / Git
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span> Tailwind / Framer
          </li>
        </ul>
      </div>
    </div>
  </motion.div>
</section>

      {/* SECTION PROJETS */}
      <main className="max-w-6xl mx-auto px-8 pb-20">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold">Projets sélectionnés</h2>
          <div className="h-[1px] flex-1 bg-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Image du projet */}
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 border border-white/10 uppercase tracking-widest">
                  {project.tag}
                </div>
              </div>

              {/* Contenu du projet */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Badges Technos */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-800/50 text-slate-300 px-3 py-1 rounded-lg text-xs font-mono border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Bouton GitHub */}
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-cyan-400 transition-all active:scale-95"
                  >
                    Voir le code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-slate-500 text-sm border-t border-slate-900/50">
        <p>© 2026 Teddy Serin - Développeur Fullstack & Designer</p>
      </footer>
    </div>
  );
}

export default App;
