const {
	getQuests,
	validateQuest,
	getPlayerProgress,
	setActiveBadge,
	setActiveTitle,
} = require("../services/quests.service");

const getAllQuests = (_req, res) => {
	res.json(getQuests());
};

const validateQuestAnswer = (req, res) => {
	const { id } = req.params;
	const { answer } = req.body;
	const result = validateQuest(id, answer);
	if (result.success) {
		return res.json(result);
	}
	res.status(400).json(result);
};

const getProgress = (_req, res) => {
	res.json(getPlayerProgress());
};

const equipBadge = (req, res) => {
	const { badge } = req.body;
	if (!badge) return res.status(400).json({ success: false, message: "Badge manquant" });
	const result = setActiveBadge(badge);
	if (result.success) return res.json(result);
	res.status(400).json(result);
};

const equipTitle = (req, res) => {
	const { title } = req.body;
	if (!title) return res.status(400).json({ success: false, message: "Titre manquant" });
	const result = setActiveTitle(title);
	if (result.success) return res.json(result);
	res.status(400).json(result);
};

module.exports = {
	getAllQuests,
	validateQuestAnswer,
	getProgress,
	equipBadge,
	equipTitle,
};