const express = require("express");
const router = express.Router();

const {
  revealHeaderSecret,
} = require("../controllers/easterEggs.controller");

router.get("/header-secret", revealHeaderSecret);
router.get("/42", (_req, res) => {
  res.json({
    message:
      "🌌 42 est la réponse à la grande question sur la vie, l'univers et le reste.",
  });
});

module.exports = router;
