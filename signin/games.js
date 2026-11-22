
/* =====================================
   CODEBLOOM - MINI GAMES
   COMPLETE JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".game-card");
    const container = document.querySelector(".games-container");

    // =====================================
    // ELEMENTS
    // =====================================

    const typingText = document.getElementById("typingText").textContent.trim();
    const typingInput = document.getElementById("typingInput");
    const typingTime = document.getElementById("typingTime");
    const wpm = document.getElementById("wpm");
    const typingResult = document.getElementById("typingResult");
    const typingStart = document.getElementById("typingStart");

    const memoryGrid = document.getElementById("memoryGrid");
    const memoryResult = document.getElementById("memoryResult");
    const memoryRestart = document.getElementById("memoryRestart");

    const quizQuestion = document.getElementById("quizQuestion");
    const quizOptions = document.getElementById("quizOptions");
    const quizResult = document.getElementById("quizResult");
    const quizNext = document.getElementById("quizNext");

    const guessInput = document.getElementById("guessInput");
    const guessBtn = document.getElementById("guessBtn");
    const guessResult = document.getElementById("guessResult");
    const guessRestart = document.getElementById("guessRestart");

    const rpsOptions = document.querySelector(".rps-options");
    const rpsResult = document.getElementById("rpsResult");
    const playerScoreText = document.getElementById("playerScore");
    const computerScoreText = document.getElementById("computerScore");

    const bugArea = document.getElementById("bugArea");
    const bug = document.getElementById("bug");
    const bugMessage = document.getElementById("bugMessage");
    const bugTime = document.getElementById("bugTime");
    const bugScore = document.getElementById("bugScore");
    const bugStart = document.getElementById("bugStart");

    // =====================================
    // CREATE START BUTTONS
    // =====================================

    function createStartButton(card, text, beforeElement) {
        const button = document.createElement("button");

        button.className = "game-btn extra-start-btn";
        button.textContent = text;

        card.insertBefore(button, beforeElement);

        return button;
    }

    const memoryStart = createStartButton(
        cards[1], "START GAME", memoryGrid
    );

    const quizStart = createStartButton(
        cards[2], "START QUIZ", quizQuestion
    );

    const guessStart = createStartButton(
        cards[3], "START GAME", guessInput
    );

    const rpsStart = createStartButton(
        cards[4], "START GAME", rpsOptions
    );

    // =====================================
    // GAME VARIABLES
    // =====================================

    let typingSeconds = 30;
    let typingInterval = null;
    let typingActive = false;

    let memoryMatches = 0;
    let firstMemoryCard = null;
    let secondMemoryCard = null;
    let memoryLocked = false;
    let memoryTimeout = null;

    let quizIndex = 0;
    let quizAnswered = false;

    let secretNumber = 0;
    let attempts = 7;
    let guessFinished = false;

    let playerScore = 0;
    let computerScore = 0;

    let bugSeconds = 15;
    let bugPoints = 0;
    let bugInterval = null;
    let bugPlaying = false;

    // =====================================
    // START BUTTON VISIBILITY
    // =====================================

    function markStarted(card, button) {
        button.hidden = true;

        const openButton = card.querySelector(".open-game-btn");

        if (openButton) {
            openButton.hidden = true;
        }
    }

    // =====================================
    // RESET EACH GAME
    // =====================================

    function resetTyping() {
        clearInterval(typingInterval);

        typingSeconds = 30;
        typingActive = false;

        typingTime.textContent = "30";
        wpm.textContent = "0";

        typingInput.value = "";
        typingInput.disabled = true;

        typingResult.textContent = "";

        typingStart.textContent = "START";
        typingStart.hidden = false;
    }

    function resetMemory() {
        clearTimeout(memoryTimeout);

        memoryGrid.innerHTML = "";
        memoryGrid.hidden = true;

        memoryMatches = 0;
        firstMemoryCard = null;
        secondMemoryCard = null;
        memoryLocked = false;

        memoryResult.textContent = "Matches: 0 / 6";
        memoryRestart.hidden = true;
        memoryStart.hidden = false;
    }

    function resetQuiz() {
        quizIndex = 0;
        quizAnswered = false;

        quizQuestion.hidden = true;
        quizOptions.hidden = true;
        quizNext.hidden = true;

        quizQuestion.textContent =
            "Which language is used to style websites?";

        quizOptions.innerHTML = "";

        quizResult.textContent = "Question 1 / 5";
        quizNext.textContent = "NEXT QUESTION";

        quizStart.hidden = false;
    }

    function resetGuess() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 7;
        guessFinished = false;

        guessInput.value = "";
        guessInput.disabled = false;
        guessInput.hidden = true;

        guessBtn.disabled = false;
        guessBtn.hidden = true;

        guessResult.textContent = "You have 7 attempts!";
        guessRestart.hidden = true;

        guessStart.hidden = false;
    }

    function resetRPS() {
        playerScore = 0;
        computerScore = 0;

        playerScoreText.textContent = "0";
        computerScoreText.textContent = "0";

        rpsResult.textContent = "Make your move!";

        rpsOptions.hidden = true;
        rpsStart.hidden = false;
    }

    function resetBug() {
        clearInterval(bugInterval);

        bugSeconds = 15;
        bugPoints = 0;
        bugPlaying = false;

        bugTime.textContent = "15";
        bugScore.textContent = "0";

        bug.style.display = "none";
        bugMessage.textContent = "Press START to play!";

        bugStart.textContent = "START GAME";
        bugStart.hidden = false;
    }

    function resetGame(card) {
        const index = Array.from(cards).indexOf(card);

        if (index === 0) resetTyping();
        if (index === 1) resetMemory();
        if (index === 2) resetQuiz();
        if (index === 3) resetGuess();
        if (index === 4) resetRPS();
        if (index === 5) resetBug();
    }

    // =====================================
    // OPEN GAME / BACK TO ALL GAMES
    // =====================================

    cards.forEach(function (card) {

        const openButton = document.createElement("button");

        openButton.className = "open-game-btn";
        openButton.textContent = "OPEN GAME";

        card.appendChild(openButton);

        openButton.addEventListener("click", function () {

            // Hide all other games
            cards.forEach(function (otherCard) {
                otherCard.classList.remove("focused", "game-open");
                otherCard.classList.add("hidden-game");
            });

            // Show selected game
            card.classList.remove("hidden-game");
            card.classList.add("focused", "game-open");

            container.classList.add("game-focus");
            document.body.classList.add("game-mode");

            // OPEN GAME disappears immediately
            openButton.hidden = true;

            // Create BACK button
            const backButton = document.createElement("button");

            backButton.className = "back-games-btn";
            backButton.textContent = "← BACK TO ALL GAMES";

            card.insertBefore(backButton, card.firstChild);

            backButton.addEventListener("click", function () {

                // Reset the game before returning
                resetGame(card);

                // Show OPEN GAME buttons again
                cards.forEach(function (game) {

                    game.classList.remove(
                        "focused",
                        "game-open",
                        "hidden-game"
                    );

                    const gameOpenButton =
                        game.querySelector(".open-game-btn");

                    if (gameOpenButton) {
                        gameOpenButton.hidden = false;
                    }
                });

                container.classList.remove("game-focus");
                document.body.classList.remove("game-mode");

                backButton.remove();
            });

            card.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });

    // =====================================
    // GAME 1 - TYPING SPEED
    // =====================================

    typingStart.addEventListener("click", function () {

        resetTyping();

        markStarted(cards[0], typingStart);

        typingActive = true;
        typingInput.disabled = false;
        typingInput.focus();

        typingInterval = setInterval(function () {

            typingSeconds--;
            typingTime.textContent = typingSeconds;

            if (typingSeconds <= 0) {

                clearInterval(typingInterval);

                typingActive = false;
                typingInput.disabled = true;

                typingResult.textContent =
                    "Time is up! Your speed: " + wpm.textContent + " WPM";

                typingStart.textContent = "TRY AGAIN";
                typingStart.hidden = false;
            }

        }, 1000);
    });

    typingInput.addEventListener("input", function () {

        if (!typingActive) return;

        const words = typingInput.value.trim()
            ? typingInput.value.trim().split(/\s+/).length
            : 0;

        const elapsed = 30 - typingSeconds;

        wpm.textContent = elapsed > 0
            ? Math.round(words / (elapsed / 60))
            : 0;

        if (typingInput.value === typingText) {

            clearInterval(typingInterval);

            typingActive = false;
            typingInput.disabled = true;

            typingResult.textContent =
                "Excellent! You completed the text!";

            typingStart.textContent = "TRY AGAIN";
            typingStart.hidden = false;
        }
    });

    // =====================================
    // GAME 2 - MEMORY MATCH
    // =====================================

    const memorySymbols = [
        "</>", "</>",
        "{ }", "{ }",
        "CSS", "CSS",
        "JS", "JS",
        "HTML", "HTML",
        "PHP", "PHP"
    ];

    function startMemory() {

        clearTimeout(memoryTimeout);

        memoryGrid.innerHTML = "";

        memoryMatches = 0;
        firstMemoryCard = null;
        secondMemoryCard = null;
        memoryLocked = false;

        memoryResult.textContent = "Matches: 0 / 6";

        const shuffled = [...memorySymbols].sort(
            () => Math.random() - 0.5
        );

        shuffled.forEach(function (symbol) {

            const button = document.createElement("button");

            button.className = "memory-card";
            button.textContent = "?";
            button.dataset.symbol = symbol;

            button.addEventListener("click", function () {

                if (
                    memoryLocked ||
                    button.classList.contains("matched") ||
                    button === firstMemoryCard
                ) {
                    return;
                }

                button.textContent = symbol;

                if (!firstMemoryCard) {
                    firstMemoryCard = button;
                    return;
                }

                secondMemoryCard = button;
                memoryLocked = true;

                if (
                    firstMemoryCard.dataset.symbol ===
                    secondMemoryCard.dataset.symbol
                ) {

                    firstMemoryCard.classList.add("matched");
                    secondMemoryCard.classList.add("matched");

                    memoryMatches++;

                    memoryResult.textContent =
                        "Matches: " + memoryMatches + " / 6";

                    firstMemoryCard = null;
                    secondMemoryCard = null;
                    memoryLocked = false;

                    if (memoryMatches === 6) {
                        memoryResult.textContent =
                            "Amazing! You found all pairs!";
                    }

                } else {

                    memoryTimeout = setTimeout(function () {

                        firstMemoryCard.textContent = "?";
                        secondMemoryCard.textContent = "?";

                        firstMemoryCard = null;
                        secondMemoryCard = null;
                        memoryLocked = false;

                    }, 800);
                }
            });

            memoryGrid.appendChild(button);
        });
    }

    memoryStart.addEventListener("click", function () {

        markStarted(cards[1], memoryStart);

        memoryGrid.hidden = false;
        memoryRestart.hidden = false;

        startMemory();
    });

    memoryRestart.addEventListener("click", startMemory);

    // =====================================
    // GAME 3 - CODE QUIZ
    // =====================================

    const questions = [
        {
            question: "Which language is used to style websites?",
            answers: ["HTML", "CSS", "Python", "Java"],
            correct: "CSS"
        },
        {
            question: "Which language adds interactivity to websites?",
            answers: ["JavaScript", "HTML", "SQL", "CSS"],
            correct: "JavaScript"
        },
        {
            question: "Which tag creates a paragraph in HTML?",
            answers: ["<h1>", "<p>", "<div>", "<img>"],
            correct: "<p>"
        },
        {
            question: "Which symbol starts a CSS class selector?",
            answers: ["#", ".", "*", "&"],
            correct: "."
        },
        {
            question: "Which keyword declares a variable in JavaScript?",
            answers: ["style", "color", "let", "body"],
            correct: "let"
        }
    ];

    function showQuestion() {

        const current = questions[quizIndex];

        quizQuestion.textContent = current.question;
        quizOptions.innerHTML = "";

        quizAnswered = false;

        current.answers.forEach(function (answer) {

            const button = document.createElement("button");

            button.className = "option-btn";
            button.textContent = answer;

            button.addEventListener("click", function () {

                if (quizAnswered) return;

                quizAnswered = true;

                const options =
                    quizOptions.querySelectorAll(".option-btn");

                options.forEach(function (option) {

                    option.disabled = true;

                    if (option.textContent === current.correct) {
                        option.classList.add("correct");
                    }
                });

                if (answer === current.correct) {

                    quizResult.textContent = "Correct! Well done!";

                } else {

                    button.classList.add("wrong");

                    quizResult.textContent =
                        "Incorrect! Correct answer: " + current.correct;
                }

                quizNext.hidden = false;

                if (quizIndex === questions.length - 1) {
                    quizNext.textContent = "FINISH QUIZ";
                }
            });

            quizOptions.appendChild(button);
        });

        quizResult.textContent =
            "Question " + (quizIndex + 1) + " / 5";

        quizNext.hidden = true;
        quizNext.textContent = "NEXT QUESTION";
    }

    quizStart.addEventListener("click", function () {

        markStarted(cards[2], quizStart);

        quizQuestion.hidden = false;
        quizOptions.hidden = false;

        quizIndex = 0;
        showQuestion();
    });

    quizNext.addEventListener("click", function () {

        if (quizIndex < questions.length - 1) {

            quizIndex++;
            showQuestion();

        } else {

            quizQuestion.textContent = "Quiz completed!";
            quizOptions.hidden = true;
            quizNext.hidden = true;

            quizResult.textContent = "Great job! You finished the quiz!";
        }
    });

    // =====================================
    // GAME 4 - GUESS THE NUMBER
    // =====================================

    function startGuess() {

        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 7;
        guessFinished = false;

        guessInput.value = "";
        guessInput.disabled = false;
        guessBtn.disabled = false;

        guessResult.textContent = "You have 7 attempts!";
        guessRestart.hidden = true;
    }

    guessStart.addEventListener("click", function () {

        markStarted(cards[3], guessStart);

        guessInput.hidden = false;
        guessBtn.hidden = false;

        startGuess();
    });

    function makeGuess() {

        if (guessFinished) return;

        const value = Number(guessInput.value);

        if (!value || value < 1 || value > 100) {

            guessResult.textContent =
                "Enter a number between 1 and 100!";

            return;
        }

        attempts--;

        if (value === secretNumber) {

            guessResult.textContent =
                "Correct! You guessed the number!";

            guessFinished = true;

        } else if (attempts === 0) {

            guessResult.textContent =
                "Game over! The number was " + secretNumber;

            guessFinished = true;

        } else if (value < secretNumber) {

            guessResult.textContent =
                "Too low! " + attempts + " attempts left.";

        } else {

            guessResult.textContent =
                "Too high! " + attempts + " attempts left.";
        }

        guessInput.value = "";

        if (guessFinished) {

            guessInput.disabled = true;
            guessBtn.disabled = true;
            guessRestart.hidden = false;
        }
    }

    guessBtn.addEventListener("click", makeGuess);

    guessInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") makeGuess();
    });

    guessRestart.addEventListener("click", startGuess);

    // =====================================
    // GAME 5 - ROCK PAPER SCISSORS
    // =====================================

    rpsStart.addEventListener("click", function () {

        markStarted(cards[4], rpsStart);

        rpsOptions.hidden = false;

        playerScore = 0;
        computerScore = 0;

        playerScoreText.textContent = "0";
        computerScoreText.textContent = "0";

        rpsResult.textContent = "Make your move!";
    });

    document.querySelectorAll(".rps-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const player = this.dataset.choice;

            const choices = ["rock", "paper", "scissors"];

            const computer = choices[
                Math.floor(Math.random() * choices.length)
            ];

            if (player === computer) {

                rpsResult.textContent =
                    "It's a draw! Computer chose " + computer;

            } else if (
                (player === "rock" && computer === "scissors") ||
                (player === "paper" && computer === "rock") ||
                (player === "scissors" && computer === "paper")
            ) {

                playerScore++;

                rpsResult.textContent =
                    "You win! Computer chose " + computer;

            } else {

                computerScore++;

                rpsResult.textContent =
                    "Computer wins! It chose " + computer;
            }

            playerScoreText.textContent = playerScore;
            computerScoreText.textContent = computerScore;
        });
    });

    // =====================================
    // GAME 6 - CATCH THE BUG
    // =====================================

    function moveBug() {

        const maxX = bugArea.clientWidth - bug.offsetWidth;
        const maxY = bugArea.clientHeight - bug.offsetHeight;

        bug.style.left = Math.max(0, Math.random() * maxX) + "px";
        bug.style.top = Math.max(0, Math.random() * maxY) + "px";
    }

    function endBugGame() {

        clearInterval(bugInterval);

        bugPlaying = false;
        bug.style.display = "none";

        bugMessage.textContent =
            "Game over! Your score: " + bugPoints;

        bugStart.textContent = "PLAY AGAIN";
        bugStart.hidden = false;
    }

    bugStart.addEventListener("click", function () {

        clearInterval(bugInterval);

        markStarted(cards[5], bugStart);

        bugSeconds = 15;
        bugPoints = 0;
        bugPlaying = true;

        bugTime.textContent = "15";
        bugScore.textContent = "0";

        bugMessage.textContent = "";
        bug.style.display = "block";

        moveBug();

        bugInterval = setInterval(function () {

            bugSeconds--;
            bugTime.textContent = bugSeconds;

            if (bugSeconds <= 0) {
                endBugGame();
            }

        }, 1000);
    });

    bug.addEventListener("click", function () {

        if (!bugPlaying) return;

        bugPoints++;

        bugScore.textContent = bugPoints;

        moveBug();
    });

    // =====================================
    // INITIAL SETUP
    // =====================================

    resetTyping();
    resetMemory();
    resetQuiz();
    resetGuess();
    resetRPS();
    resetBug();

});
