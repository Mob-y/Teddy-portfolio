const { sendContactEmail } = require("../services/contact.service");
const { validateQuest } = require("../services/quests.service");

const sendContact = async (req, res) => {
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		return res
			.status(400)
			.json({ success: false, message: "Champs manquants" });
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return res.status(400).json({ success: false, message: "Email invalide" });
	}

	try {
		await sendContactEmail({ name, email, message });

		// ✅ FIX : quête "11" = Messager (envoyer un message)
		// quête "12" = Le Sommet (platine, toutes les quêtes complétées)
		const questResult = validateQuest("11", null);

		return res.json({
			success: true,
			message: "Message envoyé avec succès !",
			questResult,
		});
	} catch (err) {
		console.error("Erreur envoi mail:", err);
		return res
			.status(500)
			.json({ success: false, message: "Erreur lors de l'envoi" });
	}
};

module.exports = { sendContact };
