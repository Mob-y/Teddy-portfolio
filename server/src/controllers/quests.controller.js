const {
  getQuests,
  validateQuest,
  getPlayerProgress,
} = require("../services/quests.service");

const getAllQuests = (_req, res) => {
  res.json(getQuests());
};

const validateQuestAnswer = (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ error: "Answer is required" });
  }

  const result = validateQuest(id, answer);
  res.json(result);
};

const getProgress = (_req, res) => {
  res.json(getPlayerProgress());
};

module.exports = {
  getAllQuests,
  validateQuestAnswer,
  getProgress,
};
