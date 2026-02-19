import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const QuestTracker = ({ isBadeline }) => {
	const [completedQuests, setCompletedQuests] = useState([]);
	const projectsOpened = useRef(new Set());
	const socialsHovered = useRef(new Set());
	const toggleCount = useRef(0);
	const scrollStartTime = useRef(null);
	const konamiSequence = useRef([]);

	// useMemo pour que KONAMI_CODE ne change jamais
	const KONAMI_CODE = useMemo(
		() => [
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a",
		],
		[],
	);

	const validateQuest = useCallback(async (questId, answer = null) => {
		setCompletedQuests((prev) => {
			if (prev.includes(questId)) return prev;

			fetch(`http://localhost:5000/api/quests/${questId}/validate`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ answer }),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.success) {
						window.dispatchEvent(
							new CustomEvent("questUpdated", {
								detail: { quest: data.quest },
							}),
						);
					}
				})
				.catch((err) => console.error("Erreur validation quête:", err));

			return [...prev, questId];
		});
	}, []);

	// Quête 1: Visite section Bio
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.id === "bio") {
						validateQuest("1");
					}
				});
			},
			{ threshold: 0.5 },
		);

		const bioSection = document.getElementById("bio");
		if (bioSection) observer.observe(bioSection);

		return () => observer.disconnect();
	}, [validateQuest]);

	// Quête 2: Ouvrir 3 projets
	useEffect(() => {
		const handleProjectOpen = () => {
			const projectCards = document.querySelectorAll(".project-card");
			projectCards.forEach((card, idx) => {
				card.addEventListener("click", () => {
					projectsOpened.current.add(idx);
					if (projectsOpened.current.size >= 3) {
						validateQuest("2");
					}
				});
			});
		};
		setTimeout(handleProjectOpen, 1000);
	}, [validateQuest]);

	// Quête 6: Rester 2 minutes
	useEffect(() => {
		const timer = setTimeout(() => {
			validateQuest("6");
		}, 120000);
		return () => clearTimeout(timer);
	}, [validateQuest]);

	// Quête 7: Visite nocturne (minuit-3h)
	useEffect(() => {
		const hour = new Date().getHours();
		if (hour >= 0 && hour < 3) {
			validateQuest("7");
		}
	}, [validateQuest]);

	// Quête 8: Scroll rapide
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				scrollStartTime.current = Date.now();
			}

			if (scrollStartTime.current) {
				const scrollTime = Date.now() - scrollStartTime.current;
				const scrollBottom =
					window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 100;

				if (scrollBottom && scrollTime < 5000) {
					validateQuest("8");
					scrollStartTime.current = null;
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [validateQuest]);

	// Quête 9: Hover tous les liens sociaux
	useEffect(() => {
		const socialLinks = document.querySelectorAll(".social-link");

		const handleHover = (e) => {
			const linkText =
				e.currentTarget.querySelector(".social-link-text")?.textContent;
			if (linkText) {
				socialsHovered.current.add(linkText);
				if (socialsHovered.current.size >= 3) {
					validateQuest("9");
				}
			}
		};

		socialLinks.forEach((link) => {
			link.addEventListener("mouseenter", handleHover);
		});

		return () => {
			socialLinks.forEach((link) => {
				link.removeEventListener("mouseenter", handleHover);
			});
		};
	}, [validateQuest]);

	// Quête 10: Toggle mode 5 fois
	// On utilise un ref pour éviter que isBadeline soit dans les deps
	const isBadelineRef = useRef(isBadeline);
	useEffect(() => {
		isBadelineRef.current = isBadeline;
	}, [isBadeline]);

	useEffect(() => {
		toggleCount.current += 1;
		if (toggleCount.current >= 5) {
			validateQuest("10");
		}
	}, [validateQuest]);

	// Quête 4: Konami Code
	useEffect(() => {
		const handleKeyPress = (e) => {
			konamiSequence.current.push(e.key);
			if (konamiSequence.current.length > KONAMI_CODE.length) {
				konamiSequence.current.shift();
			}

			const matches = konamiSequence.current.every(
				(key, idx) => key.toLowerCase() === KONAMI_CODE[idx].toLowerCase(),
			);

			if (matches && konamiSequence.current.length === KONAMI_CODE.length) {
				validateQuest("4", "konami");
				konamiSequence.current = [];
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [validateQuest, KONAMI_CODE]);

	// Quête 5: Taper "42"
	useEffect(() => {
		let inputBuffer = "";
		const handleKey = (e) => {
			inputBuffer += e.key;
			if (inputBuffer.includes("42")) {
				validateQuest("5", "42");
				inputBuffer = "";
			}
			if (inputBuffer.length > 10) inputBuffer = "";
		};
		window.addEventListener("keypress", handleKey);
		return () => window.removeEventListener("keypress", handleKey);
	}, [validateQuest]);

	// Quête 11: Achievement (vérifié côté serveur)
	useEffect(() => {
		if (completedQuests.length === 10) {
			validateQuest("11");
		}
	}, [completedQuests, validateQuest]);

	return null;
};

export default QuestTracker;
