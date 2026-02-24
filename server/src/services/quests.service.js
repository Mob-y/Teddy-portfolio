const db = require("../database");

const QUESTS = [
	{
		id: "1",
		title: "Premier Pas",
		description: "Bonne visite de la page.",
		xpReward: 25,
		badge: "tape.gif",
		unlockTitle: null,
		type: "visit",
		target: "bio",
	},
	{
		id: "2",
		title: "Collectionneur",
		description: "La curiosité est un bon défaut.",
		xpReward: 50,
		badge: "bubble.gif",
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
		badge: "ghost.gif",
		unlockTitle: "Grimpeur Maudit",
		type: "special",
		target: "badeline_clicks",
		goal: 5,
	},
	{
		id: "4",
		title: "Merci Konami",
		description: "Entrez le code légendaire : (B A)",
		xpReward: 150,
		badge: "bumper.gif",
		unlockTitle: "Vétéran du Pixel",
		type: "easter_egg",
		target: "konami",
	},
	{
		id: "5",
		title: "42",
		description: "La réponse à la grande question. (Clavier)",
		xpReward: 42,
		badge: "ball.gif",
		unlockTitle: null,
		type: "easter_egg",
		target: "secret_42",
	},
	{
		id: "6",
		title: "Explorateur Persévérant",
		description: "AFK.",
		xpReward: 75,
		badge: "launch.gif",
		unlockTitle: null,
		type: "time",
		target: "stay_2min",
	},
	{
		id: "7",
		title: "Oiseau de Nuit",
		description: "Que pourrait-il se passer à minuit ?",
		xpReward: 200,
		badge: "plume.gif",
		unlockTitle: "Noctambule",
		type: "time",
		target: "visit_midnight",
	},
	{
		id: "8",
		title: "Speedrunner",
		description: "Scroller comme Sonic.",
		xpReward: 100,
		badge: "monster.gif",
		unlockTitle: "Dash Master",
		type: "interaction",
		target: "fast_scroll",
	},
	{
		id: "9",
		title: "Curieux",
		description: "Regarder mes informations sociales de plus près.",
		xpReward: 50,
		badge: "jelly.gif",
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
		badge: "attack.gif",
		unlockTitle: null,
		type: "interaction",
		target: "toggle_mode",
		goal: 5,
	},

	{
		id: "11",
		title: "Messager",
		description: "Envoyer un message via le formulaire de contact.",
		xpReward: 80,
		badge: "gold.gif",
		unlockTitle: "Recruteur Potentiel",
		type: "contact",
		target: "send_message",
	},

	{
		id: "12",
		title: "Le Sommet",
		description: "Platine.",
		xpReward: 500,
		badge: "heart.gif",
		unlockTitle: "Maître du Sommet",
		type: "achievement",
		target: "complete_all",
	},
];

const getPlayerProgress = () => {
	const row = db.prepare("SELECT * FROM player_progress WHERE id = 1").get();
	return {
		xp: row.xp,
		level: row.level,
		completedQuests: JSON.parse(row.completed_quests),
		badges: JSON.parse(row.badges),
		titles: JSON.parse(row.titles),
		activeBadge: row.active_badge,
		title: row.active_title,
	};
};

const savePlayerProgress = (progress) => {
	db.prepare(`
		UPDATE player_progress SET
			xp = ?,
			level = ?,
			completed_quests = ?,
			badges = ?,
			titles = ?,
			active_badge = ?,
			active_title = ?
		WHERE id = 1
	`).run(
		progress.xp,
		progress.level,
		JSON.stringify(progress.completedQuests),
		JSON.stringify(progress.badges),
		JSON.stringify(progress.titles),
		progress.activeBadge,
		progress.title,
	);
};

module.exports = {
	getQuests: () => QUESTS,
	getPlayerProgress,

	setActiveBadge: (badge) => {
		const progress = getPlayerProgress();
		if (progress.badges.includes(badge)) {
			progress.activeBadge = badge;
			savePlayerProgress(progress);
			return { success: true };
		}
		return { success: false, message: "Badge non débloqué" };
	},

	setActiveTitle: (titleName) => {
		const progress = getPlayerProgress();
		if (progress.titles.includes(titleName)) {
			progress.title = titleName;
			savePlayerProgress(progress);
			return { success: true };
		}
		return { success: false, message: "Titre non débloqué" };
	},

	validateQuest: (questId, answer) => {
		const quest = QUESTS.find((q) => q.id === questId);
		if (!quest) return { success: false, message: "Quête introuvable" };

		const progress = getPlayerProgress();

		if (progress.completedQuests.includes(questId)) {
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
			case "contact":
				isValid = true;
				break;
			case "achievement": {
				const otherQuests = QUESTS.filter(
					(q) => q.id !== "11" && q.id !== "12",
				);
				const allCompleted = otherQuests.every((q) =>
					progress.completedQuests.includes(q.id),
				);
				isValid = allCompleted;
				break;
			}
		}

		if (isValid) {
			progress.xp += quest.xpReward;
			progress.completedQuests.push(questId);

			if (quest.badge && !progress.badges.includes(quest.badge)) {
				progress.badges.push(quest.badge);
				if (!progress.activeBadge) {
					progress.activeBadge = quest.badge;
				}
			}

			if (quest.unlockTitle && !progress.titles.includes(quest.unlockTitle)) {
				progress.titles.push(quest.unlockTitle);
				if (!progress.title) {
					progress.title = quest.unlockTitle;
				}
			}

			progress.level = Math.floor(progress.xp / 100) + 1;

			savePlayerProgress(progress);

			return {
				success: true,
				quest: {
					title: quest.title,
					description: quest.description,
					xpReward: quest.xpReward,
					badge: quest.badge,
					unlockTitle: quest.unlockTitle,
				},
				newProgress: progress,
			};
		}

		return { success: false, message: "Condition non remplie" };
	},
};
