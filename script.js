(() => {
    "use strict";

    const STORAGE_KEY = "r6OperatorTrainerStateV3";
    const LEGACY_STORAGE_KEY = "r6TrainerStats";
    const POINTS_BY_LEVEL = [100, 75, 50, 25];
    const CLUE_LABELS = ["Gadgets", "Secondary weapons", "Primary weapons", "Unique ability"];
    const MAX_RECENT_RESULTS = 24;

    const createDefaultState = () => ({
        version: 3,
        settings: {
            pool: "all",
            autoAdvance: true,
            advanceDelay: 1800,
            sound: false,
            reduceMotion: false
        },
        run: {
            score: 0,
            streak: 0,
            questions: 0,
            correct: 0,
            clueWins: [0, 0, 0, 0],
            startedAt: Date.now()
        },
        lifetime: {
            bestScore: 0,
            bestStreak: 0,
            questions: 0,
            correct: 0,
            clueWins: [0, 0, 0, 0],
            perOperator: {},
            recent: []
        }
    });

    let state = loadState();
    let currentOperator = null;
    let clueLevel = 0;
    let isLocked = false;
    let operatorQueue = [];
    let queuePool = "";
    let previousOperatorName = "";
    let currentRoundTotal = 0;
    let nextTimer = null;
    let countdownTimer = null;
    let suggestionMatches = [];
    let highlightedSuggestion = -1;
    let audioContext = null;
    let toastTimer = null;

    const elements = {
        brandOperatorCount: document.getElementById("brandOperatorCount"),
        navButtons: [...document.querySelectorAll(".nav-button")],
        viewPanels: [...document.querySelectorAll("[data-view-panel]")],
        viewLinks: [...document.querySelectorAll("[data-view-link]")],
        howToButton: document.getElementById("howToButton"),
        settingsButton: document.getElementById("settingsButton"),
        newRunButton: document.getElementById("newRunButton"),
        howToDialog: document.getElementById("howToDialog"),
        settingsDialog: document.getElementById("settingsDialog"),
        operatorDialog: document.getElementById("operatorDialog"),
        resetDialog: document.getElementById("resetDialog"),
        operatorDialogContent: document.getElementById("operatorDialogContent"),
        confirmResetButton: document.getElementById("confirmResetButton"),
        toast: document.getElementById("toast"),

        runScore: document.getElementById("runScore"),
        bestScore: document.getElementById("bestScore"),
        currentStreak: document.getElementById("currentStreak"),
        bestStreak: document.getElementById("bestStreak"),
        runAccuracy: document.getElementById("runAccuracy"),

        poolButtons: [...document.querySelectorAll("[data-pool]")],
        roundProgressText: document.getElementById("roundProgressText"),
        roundProgressBar: document.getElementById("roundProgressBar"),
        pointsAvailable: document.getElementById("pointsAvailable"),
        hiddenSideChip: document.getElementById("hiddenSideChip"),
        stageSteps: [...document.querySelectorAll(".stage-step")],
        clues: document.getElementById("clues"),

        guessInput: document.getElementById("guessInput"),
        clearGuessButton: document.getElementById("clearGuessButton"),
        suggestionList: document.getElementById("suggestionList"),
        submitButton: document.getElementById("submitButton"),
        revealButton: document.getElementById("revealButton"),
        answerFeedback: document.getElementById("answerFeedback"),
        nextButton: document.getElementById("nextButton"),
        autoAdvanceStatus: document.getElementById("autoAdvanceStatus"),

        operatorSearch: document.getElementById("operatorSearch"),
        operatorSideFilter: document.getElementById("operatorSideFilter"),
        operatorGrid: document.getElementById("operatorGrid"),
        directoryCount: document.getElementById("directoryCount"),

        lifetimeQuestions: document.getElementById("lifetimeQuestions"),
        lifetimeCorrect: document.getElementById("lifetimeCorrect"),
        lifetimeAccuracy: document.getElementById("lifetimeAccuracy"),
        statsBestScore: document.getElementById("statsBestScore"),
        statsBestStreak: document.getElementById("statsBestStreak"),
        clueEfficiencyBars: document.getElementById("clueEfficiencyBars"),
        recentHistory: document.getElementById("recentHistory"),
        difficultOperators: document.getElementById("difficultOperators"),
        exportStatsButton: document.getElementById("exportStatsButton"),
        resetAllButton: document.getElementById("resetAllButton"),

        autoAdvanceToggle: document.getElementById("autoAdvanceToggle"),
        advanceDelaySelect: document.getElementById("advanceDelaySelect"),
        soundToggle: document.getElementById("soundToggle"),
        reduceMotionToggle: document.getElementById("reduceMotionToggle")
    };

    function loadState() {
        const defaults = createDefaultState();

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                return mergeState(defaults, parsed);
            }

            const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
            if (legacy) {
                const parsedLegacy = JSON.parse(legacy);
                defaults.run.score = toSafeNumber(parsedLegacy.score);
                defaults.run.streak = toSafeNumber(parsedLegacy.streak);
                defaults.run.questions = toSafeNumber(parsedLegacy.questions);
                defaults.run.correct = toSafeNumber(parsedLegacy.correctAnswers);
                defaults.lifetime.bestScore = Math.max(
                    toSafeNumber(parsedLegacy.bestScore),
                    defaults.run.score
                );
                defaults.lifetime.bestStreak = defaults.run.streak;
                defaults.lifetime.questions = defaults.run.questions;
                defaults.lifetime.correct = defaults.run.correct;
                localStorage.removeItem(LEGACY_STORAGE_KEY);
            }
        } catch (error) {
            console.warn("Could not load saved trainer data:", error);
        }

        return defaults;
    }

    function mergeState(defaults, saved) {
        const merged = createDefaultState();
        merged.settings = { ...defaults.settings, ...(saved?.settings || {}) };
        merged.run = { ...defaults.run, ...(saved?.run || {}) };
        merged.lifetime = { ...defaults.lifetime, ...(saved?.lifetime || {}) };

        merged.run.clueWins = normaliseNumberArray(merged.run.clueWins, 4);
        merged.lifetime.clueWins = normaliseNumberArray(merged.lifetime.clueWins, 4);
        merged.lifetime.perOperator = merged.lifetime.perOperator && typeof merged.lifetime.perOperator === "object"
            ? merged.lifetime.perOperator
            : {};
        merged.lifetime.recent = Array.isArray(merged.lifetime.recent)
            ? merged.lifetime.recent.slice(0, MAX_RECENT_RESULTS)
            : [];

        for (const key of ["score", "streak", "questions", "correct"]) {
            merged.run[key] = toSafeNumber(merged.run[key]);
        }
        for (const key of ["bestScore", "bestStreak", "questions", "correct"]) {
            merged.lifetime[key] = toSafeNumber(merged.lifetime[key]);
        }

        merged.settings.pool = ["all", "Attack", "Defense"].includes(merged.settings.pool)
            ? merged.settings.pool
            : "all";
        merged.settings.advanceDelay = [1200, 1800, 2500, 3500].includes(Number(merged.settings.advanceDelay))
            ? Number(merged.settings.advanceDelay)
            : 1800;
        merged.settings.autoAdvance = Boolean(merged.settings.autoAdvance);
        merged.settings.sound = Boolean(merged.settings.sound);
        merged.settings.reduceMotion = Boolean(merged.settings.reduceMotion);

        return merged;
    }

    function saveState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.warn("Could not save trainer data:", error);
        }
    }

    function toSafeNumber(value) {
        const number = Number(value);
        return Number.isFinite(number) && number >= 0 ? number : 0;
    }

    function normaliseNumberArray(value, length) {
        const output = Array.from({ length }, () => 0);
        if (!Array.isArray(value)) return output;
        value.slice(0, length).forEach((item, index) => {
            output[index] = toSafeNumber(item);
        });
        return output;
    }

    function validateOperatorData(operatorList) {
        const issues = [];
        const seenNames = new Set();

        if (!Array.isArray(operatorList) || operatorList.length === 0) {
            return ["No operator data was loaded."];
        }

        operatorList.forEach((operator, index) => {
            const label = operator?.name || `Entry ${index + 1}`;
            if (!operator?.name) issues.push(`${label}: missing name`);
            if (!operator?.side || !["Attack", "Defense"].includes(operator.side)) issues.push(`${label}: invalid side`);
            if (!Array.isArray(operator?.gadgets)) issues.push(`${label}: gadgets must be an array`);
            if (!Array.isArray(operator?.secondaryWeapons)) issues.push(`${label}: secondaryWeapons must be an array`);
            if (!Array.isArray(operator?.primaryWeapons)) issues.push(`${label}: primaryWeapons must be an array`);
            if (!operator?.uniqueAbility) issues.push(`${label}: missing unique ability`);

            const normalisedName = normaliseText(operator?.name || "");
            if (seenNames.has(normalisedName)) issues.push(`${label}: duplicate name`);
            seenNames.add(normalisedName);
        });

        return issues;
    }

    function normaliseText(value) {
        return String(value ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, " ")
            .trim();
    }

    function assetSlug(value) {
        return normaliseText(value).replace(/\s+/g, "-");
    }

    function getInitials(name) {
        const words = String(name).trim().split(/\s+/).filter(Boolean);
        if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
        return words.slice(0, 2).map(word => word[0]).join("").toUpperCase();
    }

    function getSideColour(side) {
        return side === "Attack" ? "var(--attack)" : "var(--defence)";
    }

    function getAvailableOperators(pool = state.settings.pool) {
        return pool === "all" ? operators : operators.filter(operator => operator.side === pool);
    }

    function shuffle(list) {
        const shuffled = [...list];
        for (let index = shuffled.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }
        return shuffled;
    }

    function buildAssetCandidates(folder, itemName) {
        const slug = assetSlug(itemName);
        const folderAliases = {
            "primary-weapons": ["primary-weapons", "primary-weapon", "primary-wepon"],
            "secondary-weapons": ["secondary-weapons", "secondary-weapon", "secondary-wepon"],
            gadgets: ["gadgets"],
            abilities: ["abilities"],
            operators: ["operators"]
        };
        const extensions = ["png", "webp", "avif", "jpg", "jpeg"];
        const candidates = [];

        for (const candidateFolder of folderAliases[folder] || [folder]) {
            for (const extension of extensions) {
                candidates.push(`images/${candidateFolder}/${slug}.${extension}`);
            }
        }

        return candidates;
    }

    function attachImageWithFallback(container, folder, itemName, altText, className = "") {
        const image = document.createElement("img");
        const candidates = buildAssetCandidates(folder, itemName);
        let candidateIndex = 0;

        image.alt = altText;
        if (className) image.className = className;
        image.decoding = "async";
        image.loading = "lazy";

        image.addEventListener("load", () => {
            container.classList.add("has-image");
        });

        image.addEventListener("error", () => {
            candidateIndex += 1;
            if (candidateIndex < candidates.length) {
                image.src = candidates[candidateIndex];
            } else {
                image.remove();
            }
        });

        image.src = candidates[candidateIndex];
        container.prepend(image);
    }

    function categoryIcon(category) {
        const icons = {
            gadgets: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 10h14l3 5v9H6v-9l3-5Z"/><path d="M12 10V7h8v3M10 18h12M16 15v6"/></svg>`,
            secondary: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 13h18l3 4-7 3-3 6h-5l1-6H8l-2-7Z"/><path d="M20 13V9h4v4"/></svg>`,
            primary: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 13h18l5 4-8 2-3 7h-5l1-7H7l-3-6Z"/><path d="M12 13V9h7l3 4M22 17h6"/></svg>`,
            ability: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m16 4 3.3 7 7.7 1-5.6 5.4 1.4 7.6-6.8-3.7L9.2 25l1.4-7.6L5 12l7.7-1L16 4Z"/></svg>`,
            loadout: `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="7" width="9" height="18" rx="2"/><rect x="18" y="7" width="9" height="18" rx="2"/><path d="M10 16h12M16 10v12"/></svg>`
        };
        return icons[category] || icons.gadgets;
    }

    function createFallback(container, label, category = "operators") {
        const fallback = document.createElement("div");
        if (category === "operators") {
            fallback.className = "operator-initials";
            fallback.textContent = getInitials(label);
        } else {
            fallback.className = "clue-fallback";
            fallback.innerHTML = categoryIcon(category);
        }
        container.appendChild(fallback);
        return fallback;
    }

    function createClueCard(item, category, folder) {
        const card = document.createElement("article");
        card.className = "clue-card";

        const art = document.createElement("div");
        art.className = "clue-art";

        const usesFlexibleLoadout = folder === "abilities" && (
            item === "Can Equip Two Different Attack Gadgets" ||
            item === "Can Equip Two Different Defense Gadgets"
        );

        createFallback(art, item, usesFlexibleLoadout ? "loadout" : category);

        if (usesFlexibleLoadout) {
            card.classList.add("is-flexible-loadout");
            art.title = "No dedicated ability image — this operator can equip two different gadgets.";
        } else {
            attachImageWithFallback(art, folder, item, item);
        }

        const name = document.createElement("strong");
        name.textContent = item;

        card.append(art, name);
        return card;
    }

    function renderClueSection(title, items, category, folder) {
        const section = document.createElement("section");
        section.className = "clue-section";

        const heading = document.createElement("div");
        heading.className = "clue-heading";
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        const count = document.createElement("span");
        const itemCount = Array.isArray(items) ? items.length : 0;
        count.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
        heading.append(titleElement, count);
        section.appendChild(heading);

        if (!Array.isArray(items) || items.length === 0) {
            const empty = document.createElement("div");
            empty.className = "empty-clue";
            empty.textContent = "None";
            section.appendChild(empty);
            return section;
        }

        const list = document.createElement("div");
        list.className = "clue-list";
        items.forEach(item => list.appendChild(createClueCard(item, category, folder)));
        section.appendChild(list);
        return section;
    }

    function updateClueBoard() {
        if (!currentOperator) return;

        elements.clues.replaceChildren();
        elements.clues.appendChild(renderClueSection("Gadgets", currentOperator.gadgets, "gadgets", "gadgets"));

        if (clueLevel >= 1) {
            elements.clues.appendChild(renderClueSection("Secondary weapons", currentOperator.secondaryWeapons, "secondary", "secondary-weapons"));
        }
        if (clueLevel >= 2) {
            elements.clues.appendChild(renderClueSection("Primary weapons", currentOperator.primaryWeapons, "primary", "primary-weapons"));
        }
        if (clueLevel >= 3) {
            elements.clues.appendChild(renderClueSection("Unique ability", [currentOperator.uniqueAbility], "ability", "abilities"));
        }

        updateClueStage();
    }

    function updateClueStage() {
        elements.pointsAvailable.textContent = POINTS_BY_LEVEL[clueLevel] ?? 0;
        elements.stageSteps.forEach((step, index) => {
            step.classList.toggle("is-active", index === clueLevel);
            step.classList.toggle("is-complete", index < clueLevel);
        });
    }

    function resetQueue() {
        operatorQueue = [];
        queuePool = "";
        currentRoundTotal = 0;
    }

    function pullNextOperator() {
        const available = getAvailableOperators();

        if (available.length === 0) {
            throw new Error("No operators are available for the selected pool.");
        }

        if (queuePool !== state.settings.pool || operatorQueue.length === 0) {
            operatorQueue = shuffle(available);
            queuePool = state.settings.pool;
            currentRoundTotal = available.length;

            if (operatorQueue.length > 1 && operatorQueue[0].name === previousOperatorName) {
                [operatorQueue[0], operatorQueue[1]] = [operatorQueue[1], operatorQueue[0]];
            }
        }

        currentOperator = operatorQueue.shift();
        previousOperatorName = currentOperator.name;

        const position = currentRoundTotal - operatorQueue.length;
        elements.roundProgressText.textContent = `Operator ${position} of ${currentRoundTotal} in this shuffled round`;
        elements.roundProgressBar.style.width = `${(position / currentRoundTotal) * 100}%`;
    }

    function startQuestion() {
        clearNextTimers();
        pullNextOperator();
        clueLevel = 0;
        isLocked = false;

        elements.guessInput.disabled = false;
        elements.submitButton.disabled = false;
        elements.revealButton.disabled = false;
        elements.guessInput.value = "";
        elements.clearGuessButton.hidden = true;
        elements.nextButton.hidden = true;
        elements.autoAdvanceStatus.textContent = "";
        elements.hiddenSideChip.textContent = state.settings.pool === "all"
            ? "Identity classified"
            : state.settings.pool === "Attack"
                ? "Attacker pool"
                : "Defender pool";

        hideSuggestions();
        showWaitingFeedback();
        updateClueBoard();
        updateRunStats();
        elements.guessInput.focus({ preventScroll: true });
    }

    function showWaitingFeedback(message = "Awaiting your answer") {
        elements.answerFeedback.replaceChildren();
        const placeholder = document.createElement("div");
        placeholder.className = "feedback-placeholder";
        const dot = document.createElement("span");
        dot.className = "pulse-dot";
        placeholder.append(dot, document.createTextNode(message));
        elements.answerFeedback.appendChild(placeholder);
    }

    function showTemporaryFeedback(message) {
        elements.answerFeedback.replaceChildren();
        const placeholder = document.createElement("div");
        placeholder.className = "feedback-placeholder";
        const dot = document.createElement("span");
        dot.className = "pulse-dot";
        placeholder.append(dot, document.createTextNode(message));
        elements.answerFeedback.appendChild(placeholder);
    }

    function getAcceptedAnswers(operator) {
        return [operator.name, ...(operator.acceptedNames || [])].map(normaliseText);
    }

    function submitGuess() {
        if (isLocked || !currentOperator) return;

        const guess = normaliseText(elements.guessInput.value);
        if (!guess) {
            showToast("Enter an operator name first.");
            elements.guessInput.focus();
            return;
        }

        if (getAcceptedAnswers(currentOperator).includes(guess)) {
            completeQuestion(true, false);
            return;
        }

        clueLevel += 1;

        if (clueLevel > 3) {
            clueLevel = 3;
            completeQuestion(false, false);
            return;
        }

        playTone("wrong");
        playTone("wrong");
        showTemporaryFeedback(`Incorrect — ${CLUE_LABELS[clueLevel]} revealed.`);
        elements.guessInput.select();
        updateClueBoard();
    }

    function revealAnswer() {
        if (isLocked || !currentOperator) return;
        completeQuestion(false, true);
    }

    function completeQuestion(correct, wasRevealed) {
        isLocked = true;
        hideSuggestions();
        elements.guessInput.disabled = true;
        elements.submitButton.disabled = true;
        elements.revealButton.disabled = true;

        const awardedLevel = Math.min(clueLevel, 3);
        const points = correct ? POINTS_BY_LEVEL[awardedLevel] : 0;
        const operatorStats = getOperatorStats(currentOperator.name);

        state.run.questions += 1;
        state.lifetime.questions += 1;
        operatorStats.attempts += 1;

        if (correct) {
            state.run.score += points;
            state.run.streak += 1;
            state.run.correct += 1;
            state.run.clueWins[awardedLevel] += 1;
            state.lifetime.correct += 1;
            state.lifetime.clueWins[awardedLevel] += 1;
            operatorStats.correct += 1;
            operatorStats.totalPoints += points;
            operatorStats.clueWins[awardedLevel] += 1;
            playTone("correct");
        } else {
            state.run.streak = 0;
            operatorStats.misses += 1;
            playTone("wrong");
        }

        state.lifetime.bestScore = Math.max(state.lifetime.bestScore, state.run.score);
        state.lifetime.bestStreak = Math.max(state.lifetime.bestStreak, state.run.streak);

        state.lifetime.recent.unshift({
            name: currentOperator.name,
            side: currentOperator.side,
            correct,
            revealed: wasRevealed,
            points,
            clueLevel: awardedLevel,
            timestamp: Date.now()
        });
        state.lifetime.recent = state.lifetime.recent.slice(0, MAX_RECENT_RESULTS);

        saveState();
        renderResult(correct, wasRevealed, points, awardedLevel);
        updateRunStats();
        renderStatsView();

        elements.nextButton.hidden = false;
        elements.hiddenSideChip.textContent = currentOperator.side === "Attack" ? "Attacker identified" : "Defender identified";
        elements.hiddenSideChip.style.color = getSideColour(currentOperator.side);

        if (state.settings.autoAdvance) {
            scheduleNextQuestion(state.settings.advanceDelay);
        } else {
            elements.autoAdvanceStatus.textContent = "Auto-advance is off.";
        }
    }

    function getOperatorStats(operatorName) {
        const key = normaliseText(operatorName);
        const existing = state.lifetime.perOperator[key];

        if (!existing || typeof existing !== "object") {
            state.lifetime.perOperator[key] = {
                attempts: 0,
                correct: 0,
                misses: 0,
                totalPoints: 0,
                clueWins: [0, 0, 0, 0]
            };
        }

        const stats = state.lifetime.perOperator[key];
        stats.attempts = toSafeNumber(stats.attempts);
        stats.correct = toSafeNumber(stats.correct);
        stats.misses = toSafeNumber(stats.misses);
        stats.totalPoints = toSafeNumber(stats.totalPoints);
        stats.clueWins = normaliseNumberArray(stats.clueWins, 4);
        return stats;
    }

    function renderResult(correct, wasRevealed, points, awardedLevel) {
        elements.answerFeedback.replaceChildren();

        const card = document.createElement("article");
        card.className = `feedback-card ${correct ? "is-correct" : "is-wrong"}`;

        const portrait = document.createElement("div");
        portrait.className = "result-portrait";
        createFallback(portrait, currentOperator.name, "operators");
        attachImageWithFallback(portrait, "operators", currentOperator.name, currentOperator.name);

        const copy = document.createElement("div");
        copy.className = "feedback-copy";
        const status = document.createElement("span");
        status.textContent = correct ? "Identification confirmed" : wasRevealed ? "Answer revealed" : "Identification failed";
        const name = document.createElement("h3");
        name.textContent = currentOperator.name;
        const detail = document.createElement("p");

        if (correct) {
            detail.append(
                document.createTextNode(`${CLUE_LABELS[awardedLevel]} · `)
            );
            const pointText = document.createElement("span");
            pointText.className = "result-points";
            pointText.textContent = `+${points} points`;
            detail.appendChild(pointText);
        } else {
            detail.textContent = `${currentOperator.side} · ${currentOperator.uniqueAbility}`;
        }

        copy.append(status, name, detail);
        card.append(portrait, copy);
        elements.answerFeedback.appendChild(card);
    }

    function scheduleNextQuestion(delay) {
        clearNextTimers();
        const endAt = Date.now() + delay;

        const updateCountdown = () => {
            const remaining = Math.max(0, endAt - Date.now());
            elements.autoAdvanceStatus.textContent = remaining > 0
                ? `Next operator in ${(remaining / 1000).toFixed(1)}s`
                : "";
        };

        updateCountdown();
        countdownTimer = window.setInterval(updateCountdown, 100);
        nextTimer = window.setTimeout(() => {
            clearNextTimers();
            startQuestion();
        }, delay);
    }

    function clearNextTimers() {
        if (nextTimer !== null) window.clearTimeout(nextTimer);
        if (countdownTimer !== null) window.clearInterval(countdownTimer);
        nextTimer = null;
        countdownTimer = null;
        elements.autoAdvanceStatus.textContent = "";
    }

    function setPool(pool) {
        if (!["all", "Attack", "Defense"].includes(pool)) return;
        state.settings.pool = pool;
        elements.poolButtons.forEach(button => {
            const active = button.dataset.pool === pool;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        resetQueue();
        saveState();
        startQuestion();
    }

    function updateRunStats() {
        const runAccuracy = state.run.questions === 0
            ? 0
            : Math.round((state.run.correct / state.run.questions) * 100);

        elements.runScore.textContent = state.run.score.toLocaleString();
        elements.bestScore.textContent = state.lifetime.bestScore.toLocaleString();
        elements.currentStreak.textContent = state.run.streak.toLocaleString();
        elements.bestStreak.textContent = state.lifetime.bestStreak.toLocaleString();
        elements.runAccuracy.textContent = `${runAccuracy}%`;
    }

    function newRun() {
        clearNextTimers();
        state.run = createDefaultState().run;
        resetQueue();
        saveState();
        updateRunStats();
        renderStatsView();
        showToast("New run started. Lifetime records were kept.");
        showView("quiz");
        startQuestion();
    }

    function renderSuggestions() {
        const query = normaliseText(elements.guessInput.value);
        const available = getAvailableOperators();

        elements.clearGuessButton.hidden = elements.guessInput.value.length === 0;

        if (!query || isLocked) {
            hideSuggestions();
            return;
        }

        suggestionMatches = available
            .map(operator => ({
                operator,
                searchName: normaliseText(operator.name),
                aliases: (operator.acceptedNames || []).map(normaliseText)
            }))
            .filter(item => item.searchName.includes(query) || item.aliases.some(alias => alias.includes(query)))
            .sort((a, b) => {
                const aStarts = a.searchName.startsWith(query) ? 0 : 1;
                const bStarts = b.searchName.startsWith(query) ? 0 : 1;
                return aStarts - bStarts || a.operator.name.localeCompare(b.operator.name);
            })
            .slice(0, 8)
            .map(item => item.operator);

        highlightedSuggestion = -1;
        elements.suggestionList.replaceChildren();

        if (suggestionMatches.length === 0) {
            hideSuggestions();
            return;
        }

        suggestionMatches.forEach((operator, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "suggestion-item";
            button.setAttribute("role", "option");
            button.dataset.index = String(index);

            const name = document.createElement("span");
            name.textContent = operator.name;
            const side = document.createElement("span");
            side.className = "suggestion-side";
            side.textContent = operator.side;
            button.append(name, side);

            button.addEventListener("mousedown", event => event.preventDefault());
            button.addEventListener("click", () => selectSuggestion(index));
            elements.suggestionList.appendChild(button);
        });

        elements.suggestionList.hidden = false;
        elements.guessInput.setAttribute("aria-expanded", "true");
    }

    function selectSuggestion(index) {
        const operator = suggestionMatches[index];
        if (!operator) return;
        elements.guessInput.value = operator.name;
        elements.clearGuessButton.hidden = false;
        hideSuggestions();
        elements.guessInput.focus();
    }

    function moveSuggestionHighlight(direction) {
        if (elements.suggestionList.hidden || suggestionMatches.length === 0) return;
        highlightedSuggestion = (highlightedSuggestion + direction + suggestionMatches.length) % suggestionMatches.length;
        [...elements.suggestionList.children].forEach((item, index) => {
            item.classList.toggle("is-highlighted", index === highlightedSuggestion);
            item.setAttribute("aria-selected", String(index === highlightedSuggestion));
        });
        elements.suggestionList.children[highlightedSuggestion]?.scrollIntoView({ block: "nearest" });
    }

    function hideSuggestions() {
        suggestionMatches = [];
        highlightedSuggestion = -1;
        elements.suggestionList.hidden = true;
        elements.suggestionList.replaceChildren();
        elements.guessInput.setAttribute("aria-expanded", "false");
    }

    function showView(viewName) {
        const validView = ["quiz", "operators", "stats"].includes(viewName) ? viewName : "quiz";
        elements.viewPanels.forEach(panel => {
            const active = panel.dataset.viewPanel === validView;
            panel.hidden = !active;
            panel.classList.toggle("is-active", active);
        });
        elements.navButtons.forEach(button => {
            const active = button.dataset.view === validView;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        if (validView === "operators") renderOperatorDirectory();
        if (validView === "stats") renderStatsView();
        history.replaceState(null, "", `#${validView}`);
        window.scrollTo({ top: 0, behavior: state.settings.reduceMotion ? "auto" : "smooth" });
    }

    function operatorMatchesSearch(operator, query) {
        if (!query) return true;
        const searchable = [
            operator.name,
            ...(operator.acceptedNames || []),
            operator.uniqueAbility,
            ...(operator.gadgets || []),
            ...(operator.secondaryWeapons || []),
            ...(operator.primaryWeapons || [])
        ].map(normaliseText).join(" ");
        return searchable.includes(query);
    }

    function renderOperatorDirectory() {
        const query = normaliseText(elements.operatorSearch.value);
        const side = elements.operatorSideFilter.value;
        const filtered = operators.filter(operator => {
            const matchesSide = side === "all" || operator.side === side;
            return matchesSide && operatorMatchesSearch(operator, query);
        });

        elements.directoryCount.textContent = filtered.length.toLocaleString();
        elements.operatorGrid.replaceChildren();

        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "no-results";
            empty.textContent = "No operators match that search.";
            elements.operatorGrid.appendChild(empty);
            return;
        }

        filtered.forEach(operator => elements.operatorGrid.appendChild(createOperatorCard(operator)));
    }

    function createOperatorCard(operator) {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "operator-card";
        card.style.setProperty("--side-color", getSideColour(operator.side));

        const personal = getOperatorStats(operator.name);
        const accuracy = personal.attempts === 0 ? null : Math.round((personal.correct / personal.attempts) * 100);

        const top = document.createElement("div");
        top.className = "operator-card-top";
        const side = document.createElement("span");
        side.className = "operator-side-badge";
        side.textContent = operator.side === "Attack" ? "Attacker" : "Defender";
        const record = document.createElement("span");
        record.className = "operator-record";
        record.textContent = accuracy === null ? "Not attempted" : `${accuracy}% accuracy`;
        top.append(side, record);

        const body = document.createElement("div");
        body.className = "operator-card-body";
        const avatar = document.createElement("div");
        avatar.className = "operator-avatar";
        createFallback(avatar, operator.name, "operators");
        attachImageWithFallback(avatar, "operators", operator.name, operator.name);
        const copy = document.createElement("div");
        const name = document.createElement("h3");
        name.textContent = operator.name;
        const ability = document.createElement("p");
        ability.className = "ability-name";
        ability.textContent = operator.uniqueAbility;
        copy.append(name, ability);
        body.append(avatar, copy);

        const footer = document.createElement("div");
        footer.className = "operator-card-footer";
        const gadgets = document.createElement("span");
        gadgets.textContent = `${operator.gadgets.length} gadgets`;
        const weapons = document.createElement("span");
        weapons.textContent = `${operator.primaryWeapons.length + operator.secondaryWeapons.length} weapons`;
        footer.append(gadgets, weapons);

        card.append(top, body, footer);
        card.addEventListener("click", () => openOperatorDialog(operator));
        return card;
    }

    function openOperatorDialog(operator) {
        const personal = getOperatorStats(operator.name);
        const accuracy = personal.attempts === 0 ? 0 : Math.round((personal.correct / personal.attempts) * 100);
        elements.operatorDialogContent.replaceChildren();

        const hero = document.createElement("section");
        hero.className = "operator-modal-hero";
        hero.style.setProperty("--side-color", getSideColour(operator.side));
        const avatar = document.createElement("div");
        avatar.className = "operator-large-avatar";
        createFallback(avatar, operator.name, "operators");
        attachImageWithFallback(avatar, "operators", operator.name, operator.name);
        const copy = document.createElement("div");
        const badge = document.createElement("span");
        badge.className = "operator-side-badge";
        badge.style.setProperty("--side-color", getSideColour(operator.side));
        badge.textContent = operator.side === "Attack" ? "Attacker" : "Defender";
        const title = document.createElement("h2");
        title.textContent = operator.name;
        const ability = document.createElement("p");
        ability.textContent = operator.uniqueAbility;
        copy.append(badge, title, ability);
        hero.append(avatar, copy);

        const detailGrid = document.createElement("div");
        detailGrid.className = "operator-detail-grid";
        detailGrid.append(
            createDetailSection("Gadgets", operator.gadgets),
            createDetailSection("Secondary weapons", operator.secondaryWeapons),
            createDetailSection("Primary weapons", operator.primaryWeapons),
            createDetailSection("Unique ability", [operator.uniqueAbility])
        );

        const personalStats = document.createElement("div");
        personalStats.className = "operator-personal-stats";
        personalStats.append(
            createPersonalStat("Attempts", personal.attempts),
            createPersonalStat("Correct", personal.correct),
            createPersonalStat("Accuracy", `${accuracy}%`)
        );

        elements.operatorDialogContent.append(hero, detailGrid, personalStats);
        showDialog(elements.operatorDialog);
    }

    function createDetailSection(title, items) {
        const section = document.createElement("section");
        section.className = "operator-detail-section";
        const heading = document.createElement("h3");
        heading.textContent = title;
        const tags = document.createElement("div");
        tags.className = "detail-tags";
        const values = Array.isArray(items) && items.length > 0 ? items : ["None"];
        values.forEach(item => {
            const tag = document.createElement("span");
            tag.textContent = item;
            tags.appendChild(tag);
        });
        section.append(heading, tags);
        return section;
    }

    function createPersonalStat(label, value) {
        const article = document.createElement("article");
        const labelElement = document.createElement("span");
        labelElement.textContent = label;
        const valueElement = document.createElement("strong");
        valueElement.textContent = String(value);
        article.append(labelElement, valueElement);
        return article;
    }

    function renderStatsView() {
        const lifetimeAccuracy = state.lifetime.questions === 0
            ? 0
            : Math.round((state.lifetime.correct / state.lifetime.questions) * 100);

        elements.lifetimeQuestions.textContent = state.lifetime.questions.toLocaleString();
        elements.lifetimeCorrect.textContent = state.lifetime.correct.toLocaleString();
        elements.lifetimeAccuracy.textContent = `${lifetimeAccuracy}%`;
        elements.statsBestScore.textContent = state.lifetime.bestScore.toLocaleString();
        elements.statsBestStreak.textContent = state.lifetime.bestStreak.toLocaleString();

        renderClueEfficiency();
        renderRecentHistory();
        renderDifficultOperators();
    }

    function renderClueEfficiency() {
        elements.clueEfficiencyBars.replaceChildren();
        const total = state.lifetime.clueWins.reduce((sum, value) => sum + value, 0);
        const labels = ["Gadgets only", "After secondary weapons", "After primary weapons", "After unique ability"];

        labels.forEach((label, index) => {
            const value = state.lifetime.clueWins[index] || 0;
            const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
            const row = document.createElement("div");
            row.className = "bar-row";
            const meta = document.createElement("div");
            meta.className = "bar-meta";
            const left = document.createElement("span");
            left.textContent = label;
            const right = document.createElement("span");
            right.textContent = `${value} · ${percentage}%`;
            meta.append(left, right);
            const track = document.createElement("div");
            track.className = "bar-track";
            const fill = document.createElement("div");
            fill.className = "bar-fill";
            fill.style.width = `${percentage}%`;
            track.appendChild(fill);
            row.append(meta, track);
            elements.clueEfficiencyBars.appendChild(row);
        });
    }

    function renderRecentHistory() {
        elements.recentHistory.replaceChildren();
        const recent = state.lifetime.recent.slice(0, 10);
        if (recent.length === 0) {
            elements.recentHistory.appendChild(createEmptyState("Complete a question to start your history."));
            return;
        }

        recent.forEach(result => {
            const item = document.createElement("div");
            item.className = "history-item";
            const main = document.createElement("div");
            main.className = "history-main";
            const name = document.createElement("b");
            name.textContent = result.name;
            const detail = document.createElement("small");
            detail.textContent = result.correct
                ? `${CLUE_LABELS[result.clueLevel] || "Clue"} · +${result.points} points`
                : result.revealed ? "Answer revealed" : "Incorrect";
            main.append(name, detail);
            const badge = document.createElement("span");
            badge.className = `result-badge ${result.correct ? "correct" : "wrong"}`;
            badge.textContent = result.correct ? "Correct" : "Missed";
            item.append(main, badge);
            elements.recentHistory.appendChild(item);
        });
    }

    function renderDifficultOperators() {
        elements.difficultOperators.replaceChildren();
        const ranked = operators
            .map(operator => {
                const stats = getOperatorStats(operator.name);
                const accuracy = stats.attempts === 0 ? 100 : Math.round((stats.correct / stats.attempts) * 100);
                return { operator, stats, accuracy };
            })
            .filter(item => item.stats.attempts > 0 && item.stats.misses > 0)
            .sort((a, b) => b.stats.misses - a.stats.misses || a.accuracy - b.accuracy || b.stats.attempts - a.stats.attempts)
            .slice(0, 8);

        if (ranked.length === 0) {
            elements.difficultOperators.appendChild(createEmptyState("No missed operators yet — keep training."));
            return;
        }

        ranked.forEach(({ operator, stats, accuracy }) => {
            const item = document.createElement("div");
            item.className = "difficulty-item";
            const main = document.createElement("div");
            main.className = "difficulty-main";
            const name = document.createElement("b");
            name.textContent = operator.name;
            const detail = document.createElement("small");
            detail.textContent = `${stats.misses} missed from ${stats.attempts} attempts`;
            main.append(name, detail);
            const badge = document.createElement("span");
            badge.className = "result-badge wrong";
            badge.textContent = `${accuracy}%`;
            item.append(main, badge);
            elements.difficultOperators.appendChild(item);
        });
    }

    function createEmptyState(message) {
        const empty = document.createElement("div");
        empty.className = "empty-state-small";
        empty.textContent = message;
        return empty;
    }

    function exportStats() {
        const exportData = {
            exportedAt: new Date().toISOString(),
            app: "R6 Operator Trainer",
            operatorCount: operators.length,
            ...state
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `r6-trainer-stats-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        showToast("Stats exported as a JSON file.");
    }

    function resetAllData() {
        clearNextTimers();
        state = createDefaultState();
        localStorage.removeItem(STORAGE_KEY);
        applySettingsToInterface();
        resetQueue();
        saveState();
        updateRunStats();
        renderOperatorDirectory();
        renderStatsView();
        startQuestion();
        showToast("All training data has been reset.");
    }

    function applySettingsToInterface() {
        elements.autoAdvanceToggle.checked = state.settings.autoAdvance;
        elements.advanceDelaySelect.value = String(state.settings.advanceDelay);
        elements.soundToggle.checked = state.settings.sound;
        elements.reduceMotionToggle.checked = state.settings.reduceMotion;
        document.body.classList.toggle("reduce-motion", state.settings.reduceMotion);
        elements.poolButtons.forEach(button => {
            const active = button.dataset.pool === state.settings.pool;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });
    }

    function playTone(type) {
        if (!state.settings.sound) return;

        try {
            audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();
            const now = audioContext.currentTime;

            oscillator.type = type === "correct" ? "sine" : "triangle";
            oscillator.frequency.setValueAtTime(type === "correct" ? 520 : 190, now);
            oscillator.frequency.exponentialRampToValueAtTime(type === "correct" ? 780 : 120, now + 0.16);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
            oscillator.connect(gain).connect(audioContext.destination);
            oscillator.start(now);
            oscillator.stop(now + 0.24);
        } catch (error) {
            console.warn("Sound could not be played:", error);
        }
    }

    function showDialog(dialog) {
        if (!dialog?.open) dialog.showModal();
    }

    function showToast(message) {
        window.clearTimeout(toastTimer);
        elements.toast.textContent = message;
        elements.toast.classList.add("is-visible");
        toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2600);
    }

    function bindEvents() {
        elements.navButtons.forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
        elements.viewLinks.forEach(link => link.addEventListener("click", event => {
            event.preventDefault();
            showView("quiz");
        }));

        elements.howToButton.addEventListener("click", () => showDialog(elements.howToDialog));
        elements.settingsButton.addEventListener("click", () => showDialog(elements.settingsDialog));
        elements.newRunButton.addEventListener("click", newRun);

        elements.poolButtons.forEach(button => button.addEventListener("click", () => setPool(button.dataset.pool)));
        elements.submitButton.addEventListener("click", submitGuess);
        elements.revealButton.addEventListener("click", revealAnswer);
        elements.nextButton.addEventListener("click", startQuestion);

        elements.guessInput.addEventListener("input", renderSuggestions);
        elements.guessInput.addEventListener("focus", renderSuggestions);
        elements.guessInput.addEventListener("keydown", event => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                moveSuggestionHighlight(1);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                moveSuggestionHighlight(-1);
            } else if (event.key === "Escape") {
                hideSuggestions();
            } else if (event.key === "Enter") {
                event.preventDefault();
                if (highlightedSuggestion >= 0 && !elements.suggestionList.hidden) {
                    selectSuggestion(highlightedSuggestion);
                } else {
                    submitGuess();
                }
            }
        });
        elements.clearGuessButton.addEventListener("click", () => {
            elements.guessInput.value = "";
            elements.clearGuessButton.hidden = true;
            hideSuggestions();
            elements.guessInput.focus();
        });
        document.addEventListener("click", event => {
            if (!event.target.closest("#autocomplete")) hideSuggestions();
        });

        elements.operatorSearch.addEventListener("input", renderOperatorDirectory);
        elements.operatorSideFilter.addEventListener("change", renderOperatorDirectory);
        elements.exportStatsButton.addEventListener("click", exportStats);
        elements.resetAllButton.addEventListener("click", () => showDialog(elements.resetDialog));
        elements.confirmResetButton.addEventListener("click", resetAllData);

        elements.autoAdvanceToggle.addEventListener("change", () => {
            state.settings.autoAdvance = elements.autoAdvanceToggle.checked;
            if (!state.settings.autoAdvance) clearNextTimers();
            saveState();
        });
        elements.advanceDelaySelect.addEventListener("change", () => {
            state.settings.advanceDelay = Number(elements.advanceDelaySelect.value);
            saveState();
        });
        elements.soundToggle.addEventListener("change", () => {
            state.settings.sound = elements.soundToggle.checked;
            saveState();
            if (state.settings.sound) playTone("correct");
        });
        elements.reduceMotionToggle.addEventListener("change", () => {
            state.settings.reduceMotion = elements.reduceMotionToggle.checked;
            document.body.classList.toggle("reduce-motion", state.settings.reduceMotion);
            saveState();
        });

        [elements.howToDialog, elements.settingsDialog, elements.operatorDialog, elements.resetDialog].forEach(dialog => {
            dialog.addEventListener("click", event => {
                if (event.target === dialog) dialog.close();
            });
        });

        window.addEventListener("hashchange", () => showView(location.hash.slice(1) || "quiz"));
    }

    function initialise() {
        if (typeof operators === "undefined") {
            elements.clues.textContent = "Operator data could not be loaded.";
            throw new Error("The operators array is not available.");
        }

        const dataIssues = validateOperatorData(operators);
        elements.brandOperatorCount.textContent = operators.length.toLocaleString();
        applySettingsToInterface();
        bindEvents();
        updateRunStats();
        renderStatsView();
        showView(location.hash.slice(1) || "quiz");
        startQuestion();

        if (dataIssues.length > 0) {
            console.warn("Operator data validation issues:", dataIssues);
            showToast(`${dataIssues.length} operator data issue${dataIssues.length === 1 ? "" : "s"} found. Check the console.`);
        }
    }

    initialise();
})();
