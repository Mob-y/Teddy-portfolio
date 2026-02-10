const pagesData = {
  home: {
    title: "Bienvenue sur mon portfolio",
    subtitle: "Développeur Front-end passionné par le détail",
  },
  about: {
    title: "À propos de moi",
    content:
      "Développeur front-end formé à la Wild Code School, avec une vraie sensibilité UI/UX.",
  },
  projects: {
    title: "Mes projets",
    projects: [
      {
        id: 1,
        name: "Portfolio",
        tech: ["React", "Tailwind", "Node"],
      },
      {
        id: 2,
        name: "Projet WCS",
        tech: ["React", "API", "Team work"],
      },
    ],
  },
};

const getPageData = (pageName) => {
  return pagesData[pageName] || null;
};

module.exports = {
  getPageData,
};
