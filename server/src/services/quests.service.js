const quests = [
  {
    id: 1,
    title: "Apprendre la téléportation",
    description: "Fait moi disparaitre !.",
    secret: "console.log",
    reward: "🎉 Quête validée !",
  },
];

const getQuests = () => {
  return quests.map(({ secret, ...quest }) => quest);
};

const validateQuest = (id, answer) => {
  const quest = quests.find((q) => q.id === Number(id));

  if (!quest) return { error: "Quest not found" };

  if (answer === quest.secret) {
    return { success: true, reward: quest.reward };
  }

  return { success: false, message: "Mauvaise réponse" };
};

module.exports = {
  getQuests,
  validateQuest,
};
