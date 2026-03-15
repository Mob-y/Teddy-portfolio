const express = require("express");
const router = express.Router();
const {
    getAllQuests,
    validateQuestAnswer,
    getProgress,
    equipBadge,
    equipTitle,
    resetProgress,
} = require("../controllers/quests.controller");

router.get("/", getAllQuests);
router.post("/:id/validate", validateQuestAnswer);
router.get("/progress", getProgress);
router.post("/equip/badge", equipBadge);
router.post("/equip/title", equipTitle);
router.post("/reset", resetProgress);

module.exports = router;