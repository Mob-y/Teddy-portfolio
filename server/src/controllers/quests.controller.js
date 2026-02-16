const { getQuests, validateQuest, getPlayerProgress } = require("../services/quests.service");

const getAllQuests = (_req, res) => {
    res.json(getQuests());
};

const validateQuestAnswer = (req, res) => {
    const { id } = req.params;
    const { answer } = req.body; // Récupère le { answer: 5 } ou le texte

    const result = validateQuest(id, answer);

    if (result.success) {
        return res.json(result); 
    }

    res.status(400).json(result);
};

const getProgress = (_req, res) => {
    res.json(getPlayerProgress());
};

module.exports = {
    getAllQuests,
    validateQuestAnswer,
    getProgress,
};
