const playerProgress = {
	xp: 0,
	level: 1,
	badges: [],
	completedQuests: [],
	title: null, // Titre débloqué actuel
};

const QUESTS = [
	// === QUÊTES SIMPLES ===
	{
		id: "1",
		title: "Premier Pas",
		description: "Bonne visite de la page.",
		xpReward: 25,
		badge: "👣",
		unlockTitle: null,
		type: "visit",
		target: "bio",
	},
	{
		id: "2",
		title: "Collectionneur",
		description: "La curiosité est un bon défauts.",
		xpReward: 50,
		badge: "🎒",
		unlockTitle: null,
		type: "interaction",
		target: "projects",
		goal: 3,
	},
	{
		id: "3",
		title: "Le secret de la téléportation",
		description: "Déranger Badeline.",
		xpReward: 100,
		badge: "👻",
		unlockTitle: "Grimpeur Maudit",
		type: "special",
		target: "badeline_clicks",
		goal: 5,
	},

	// === EASTER EGGS ===
	{
		id: "4",
		title: "Merci Konami",
		description: "Entrez le code légendaire : (B A)",
		xpReward: 150,
		badge: "🎮",
		unlockTitle: "Vétéran du Pixel",
		type: "easter_egg",
		target: "konami",
	},
	{
		id: "5",
		title: "42",
		description: "La réponse à la grande question. (Clavier)",
		xpReward: 42,
		badge: "🌌",
		unlockTitle: null,
		type: "easter_egg",
		target: "secret_42",
	},

	// === TEMPS RÉEL ===
	{
		id: "6",
		title: "Explorateur Persévérant",
		description: "AFK.",
		xpReward: 75,
		badge: "⏱️",
		unlockTitle: null,
		type: "time",
		target: "stay_2min",
	},
	{
		id: "7",
		title: "Oiseau de Nuit",
		description: "Que pourrai t'il ce passer à minuit ?",
		xpReward: 200,
		badge: "🦉",
		unlockTitle: "Noctambule",
		type: "time",
		target: "visit_midnight",
	},

	// === INTERACTIONS ===
	{
		id: "8",
		title: "Speedrunner",
		description: "Scroller comme Sonic.",
		xpReward: 100,
		badge: "⚡",
		unlockTitle: "Dash Master",
		type: "interaction",
		target: "fast_scroll",
	},
	{
		id: "9",
		title: "Curieux",
		description: "Regarder mes informations sociales de plus près.",
		xpReward: 50,
		badge: "🔍",
		unlockTitle: null,
		type: "interaction",
		target: "hover_socials",
		goal: 3,
	},
	{
		id: "10",
		title: "Métamorphose",
		description: "Upside down.",
		xpReward: 75,
		badge: "🌓",
		unlockTitle: null,
		type: "interaction",
		target: "toggle_mode",
		goal: 5,
	},

	// === ACHIEVEMENT ===
	{
		id: "11",
		title: "Le Sommet",
		description: "Platine.",
		xpReward: 500,
		badge: "🏔️",
		unlockTitle: "Maître du Sommet",
		type: "achievement",
		target: "complete_all",
	},
];

module.exports = {
	getQuests: () => QUESTS,
	getPlayerProgress: () => playerProgress,

	validateQuest: (questId, answer) => {
		const quest = QUESTS.find((q) => q.id === questId);
		if (!quest) return { success: false, message: "Quête introuvable" };

		if (playerProgress.completedQuests.includes(questId)) {
			return { success: false, message: "Quête déjà validée" };
		}

		let isValid = false;

		switch (quest.type) {
			case "special":
				if (questId === "3" && Number(answer) === 5) isValid = true;
				break;

			case "easter_egg":
				if (questId === "4" && answer === "konami") isValid = true;
				if (questId === "5" && answer === "42") isValid = true;
				break;

			case "visit":
			case "interaction":
			case "time":
				isValid = true;
				break;

			case "achievement": {
				const otherQuests = QUESTS.filter((q) => q.id !== "11");
				const allCompleted = otherQuests.every((q) =>
					playerProgress.completedQuests.includes(q.id),
				);
				isValid = allCompleted;
				break;
			}
		}

		if (isValid) {
			playerProgress.xp += quest.xpReward;
			playerProgress.completedQuests.push(questId);

			if (quest.badge) {
				playerProgress.badges.push(quest.badge);
			}

			if (quest.unlockTitle) {
				playerProgress.title = quest.unlockTitle;
			}

			playerProgress.level = Math.floor(playerProgress.xp / 100) + 1;

			return {
				success: true,
				quest: {
					title: quest.title,
					description: quest.description,
					xp: quest.xpReward,
					badge: quest.badge,
					unlockTitle: quest.unlockTitle,
				},
				newProgress: playerProgress,
			};
		}

		return { success: false, message: "Condition non remplie" };
	},
};
