const express = require("express");
const router = express.Router();

const {
  getAllQuests,
  validateQuestAnswer,
  getProgress,
} = require("../controllers/quests.controller");

router.get("/", getAllQuests);
router.post("/:id/validate", validateQuestAnswer);
router.get("/progress", getProgress);

module.exports = router;

console.log(getProgress);