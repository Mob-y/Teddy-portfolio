const playerProgress = { xp: 0, level: 1, badges: [], completedQuests: [] };

const QUESTS = [
  { id: "1", title: "Le Secret du Header", description: "Vous avez découvert le code caché dans les cimes.", xpReward: 50 },
  { id: "2", title: "L'Univers", description: "La réponse ultime a été saisie.", xpReward: 40 },
  { id: "3", title: "L'Ombre de la Montagne", description: "Badeline fait désormais partie de vous.", xpReward: 100 },
];

module.exports = {
  getQuests: () => QUESTS,
  getPlayerProgress: () => playerProgress,
  validateQuest: (questId, answer) => {
    const quest = QUESTS.find((q) => q.id === questId);
    if (!quest) return { success: false, message: "Quête introuvable" };

    let isCorrect = false;
    if (questId === "3" && Number(answer) === 5) isCorrect = true;
    if (questId === "2" && answer === "42") isCorrect = true;

    if (isCorrect && !playerProgress.completedQuests.includes(questId)) {
      playerProgress.xp += quest.xpReward;
      playerProgress.completedQuests.push(questId);
      playerProgress.level = Math.floor(playerProgress.xp / 100) + 1;

      return {
        success: true,
        quest: { title: quest.title, description: quest.description, xp: quest.xpReward },
        newProgress: playerProgress,
      };
    }
    return { success: false, message: "Réponse incorrecte ou déjà validée" };
  },
};