const { checkSecretHeader } = require("../services/easterEggs.service");

const revealHeaderSecret = (req, res) => {
  const result = checkSecretHeader(req.headers);

  if (!result.unlocked) {
    return res.status(403).json({ message: "Que dit hitman quand il est fatigué ? J'ai un code barre..." });
  }

  res.json(result);
};

module.exports = {
  revealHeaderSecret,
};
