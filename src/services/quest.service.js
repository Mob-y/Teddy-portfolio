const API_URL = import.meta.env.VITE_API_URL + "/api";

export const questsService = {
	async getProgress() {
		const response = await fetch(`${API_URL}/quests/progress`);
		return await response.json();
	},

	async validateQuest(questId, answer) {
		const response = await fetch(`${API_URL}/quests/${questId}/validate`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ answer }),
		});
		return await response.json();
	},
};
