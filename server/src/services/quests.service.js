const quests = [
  {
    id: 1,
    title: "La quête du développeur curieux",
    description: "Trouve le bon mot-clé.",
    secret: "console.log",
    reward: "🎉 Quête validée !",
    xp: 50,
    badge: "Curieux",
  },
  {
    id: 2,
    title: "Inspecteur du Web",
    description: "Trouve le mot secret caché dans le code.",
    secret: "frontendMaster",
    reward: "🕵️ Bravo Inspecteur !",
    xp: 100,
    badge: "Explorateur",
  },
];

const playerState = {
  xp: 0,
  badges: [],
  completedQuests: [],
};

const getQuests = () => {
  return quests.map(({ secret, ...quest }) => quest);
};

const validateQuest = (id, answer) => {
  const quest = quests.find((q) => q.id === Number(id));

  if (!quest) return { error: "Quest not found" };

  if (playerState.completedQuests.includes(quest.id)) {
    return { message: "Quête déjà complétée" };
  }

  if (answer === quest.secret) {
    playerState.xp += quest.xp;
    playerState.completedQuests.push(quest.id);

    if (quest.badge && !playerState.badges.includes(quest.badge)) {
      playerState.badges.push(quest.badge);
    }

    return {
      success: true,
      reward: quest.reward,
      xpGained: quest.xp,
      totalXP: playerState.xp,
      badges: playerState.badges,
    };
  }

  return { success: false, message: "Mauvaise réponse" };
};

const getPlayerProgress = () => {
  return playerState;
};

module.exports = {
  getQuests,
  validateQuest,
  getPlayerProgress,
};
