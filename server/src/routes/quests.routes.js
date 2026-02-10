const express = require("express");
const router = express.Router();

const {
  getAllQuests,
  validateQuestAnswer,
} = require("../controllers/quests.controller");

router.get("/", getAllQuests);
router.post("/:id/validate", validateQuestAnswer);

module.exports = router;
