
// =====================================
// CODEBLOOM - SIX MINI GAMES
// =====================================


// GAME 1: TYPING SPEED

const typingText = document.getElementById("typingText");
const typingInput = document.getElementById("typingInput");
const typingStart = document.getElementById("typingStart");

let typingSeconds = 30;
let typingInterval;
let typingActive = false;

typingStart.addEventListener("click", function() {

    clearInterval(typingInterval);

    typingSeconds = 30;
    typingActive = true;

    typingInput.value = "";
    typingInput.disabled = false;
    typingInput.focus();

    document.getElementById("typingTime").textContent = 30;
    document.getElementById("wpm").textContent = 0;
    document.getElementById("typingResult").textContent = "Start typing!";

    typingInterval = setInterval(function() {

        typingSeconds--;

        document.getElementById("typingTime").textContent = typingSeconds;

        if (typingSeconds <= 0) {
            endTypingGame();
        }

    }, 1000);

});

typingInput.addEventListener("input", function() {

    if (!typingActive) return;

    const typedWords = typingInput.value.trim().split(/\s+/).filter(Boolean).length;

    const elapsed = 30 - typingSeconds;
    const wpm = elapsed > 0 ? Math.round(typedWords / elapsed * 60) : 0;

    document.getElementById("wpm").textContent = wpm;

    if (typingInput.value === typingText.textContent) {
        endTypingGame();
    }

});

function endTypingGame() {

    clearInterval(typingInterval);
    typingActive = false;
    typingInput.disabled = true;

    const typedWords = typingInput.value.trim().split(/\s+/).filter(Boolean).length;

    const wpm = Math.round(typedWords / Math.max(1, 30 - typingSeconds) * 60);

    document.getElementById("typingResult").textContent =
        "Finished! Your speed: " + wpm + " WPM";
}


// GAME 2: MEMORY MATCH

const memorySymbols = ["</>", "{ }", "JS", "CSS", "</>", "{ }", "JS", "CSS", "HTML", "PHP", "HTML", "PHP"];

const memoryGrid = document.getElementById("memoryGrid");

let firstCard = null;
let secondCard = null;
let locked = false;
let matches = 0;

function createMemoryGame() {

    memoryGrid.innerHTML = "";

    firstCard = null;
    secondCard = null;
    locked = false;
    matches = 0;

    document.getElementById("memoryResult").textContent = "Matches: 0 / 6";

    const shuffled = [...memorySymbols].sort(() => Math.random() - 0.5);

    shuffled.forEach(function(symbol) {

        const card = document.createElement("button");

        card.className = "memory-card";
        card.textContent = "?";
        card.dataset.symbol = symbol;

        card.addEventListener("click", function() {
            flipMemoryCard(card);
        });

        memoryGrid.appendChild(card);

    });

}

function flipMemoryCard(card) {

    if (locked || card.classList.contains("matched") || card === firstCard) {
        return;
    }

    card.textContent = card.dataset.symbol;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;

        document.getElementById("memoryResult").textContent =
            "Matches: " + matches + " / 6";

        firstCard = null;
        secondCard = null;

        if (matches === 6) {
            document.getElementById("memoryResult").textContent =
                "Amazing! You matched all cards!";
        }

    } else {

        locked = true;

        setTimeout(function() {

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            firstCard = null;
            secondCard = null;

            locked = false;

        }, 800);

    }

}

document.getElementById("memoryRestart").addEventListener("click", createMemoryGame);

createMemoryGame();


// GAME 3: CODE QUIZ

const questions = [
    {
        question: "Which language is used to style websites?",
        answers: ["HTML", "CSS", "Python", "Java"],
        correct: "CSS"
    },
    {
        question: "What does HTML stand for?",
        answers: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language", "Hyperlinks Text Mode"],
        correct: "HyperText Markup Language"
    },
    {
        question: "Which language adds interactivity to websites?",
        answers: ["CSS", "HTML", "JavaScript", "SQL"],
        correct: "JavaScript"
    },
    {
        question: "Which tag creates a paragraph in HTML?",
        answers: ["<h1>", "<p>", "<div>", "<img>"],
        correct: "<p>"
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        answers: [".", "#", "*", "&"],
        correct: "#"
    }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function showQuestion() {

    quizAnswered = false;

    const question = questions[quizIndex];

    document.getElementById("quizQuestion").textContent = question.question;

    document.getElementById("quizResult").textContent =
        "Question " + (quizIndex + 1) + " / " + questions.length +
        " | Score: " + quizScore;

    const options = document.getElementById("quizOptions");

    options.innerHTML = "";

    question.answers.forEach(function(answer) {

        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = answer;

        button.addEventListener("click", function() {

            if (quizAnswered) return;

            quizAnswered = true;

            if (answer === question.correct) {

                quizScore++;
                button.classList.add("correct");

            } else {

                button.classList.add("wrong");

                Array.from(options.children).forEach(function(option) {
                    if (option.textContent === question.correct) {
                        option.classList.add("correct");
                    }
                });

            }

            Array.from(options.children).forEach(function(option) {
                option.disabled = true;
            });

            document.getElementById("quizResult").textContent =
                answer === question.correct
                ? "Correct! Score: " + quizScore
                : "Incorrect! The answer is " + question.correct;

        });

        options.appendChild(button);

    });

}

document.getElementById("quizNext").addEventListener("click", function() {

    if (!quizAnswered) {
        document.getElementById("quizResult").textContent =
            "Choose an answer first!";
        return;
    }

    quizIndex++;

    if (quizIndex >= questions.length) {

        document.getElementById("quizQuestion").textContent = "Quiz completed!";

        document.getElementById("quizOptions").innerHTML = "";

        document.getElementById("quizResult").textContent =
            "Your final score: " + quizScore + " / " + questions.length;

        this.textContent = "PLAY AGAIN";

        this.onclick = function() {
            quizIndex = 0;
            quizScore = 0;
            this.textContent = "NEXT QUESTION";
            this.onclick = null;
            showQuestion();
        };

        return;
    }

    showQuestion();

});

showQuestion();


// GAME 4: GUESS THE NUMBER

let secretNumber;
let attempts;

function startGuessGame() {

    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 7;

    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessBtn").disabled = false;

    document.getElementById("guessResult").textContent =
        "You have 7 attempts!";

}

document.getElementById("guessBtn").addEventListener("click", function() {

    const guess = Number(document.getElementById("guessInput").value);
    const result = document.getElementById("guessResult");

    if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        result.textContent = "Enter a number between 1 and 100!";
        return;
    }

    attempts--;

    if (guess === secretNumber) {

        result.textContent = "Correct! You found the number!";
        document.getElementById("guessInput").disabled = true;
        this.disabled = true;

    } else if (attempts === 0) {

        result.textContent = "Game over! The number was " + secretNumber;
        document.getElementById("guessInput").disabled = true;
        this.disabled = true;

    } else if (guess < secretNumber) {

        result.textContent = "Too low! Attempts left: " + attempts;

    } else {

        result.textContent = "Too high! Attempts left: " + attempts;

    }

});

document.getElementById("guessRestart").addEventListener("click", startGuessGame);

startGuessGame();


// GAME 5: ROCK PAPER SCISSORS

let playerScore = 0;
let computerScore = 0;

document.querySelectorAll(".rps-btn").forEach(function(button) {

    button.addEventListener("click", function() {

        const player = this.dataset.choice;

        const choices = ["rock", "paper", "scissors"];

        const computer = choices[Math.floor(Math.random() * 3)];

        let result = "";

        if (player === computer) {

            result = "It's a draw!";

        } else if (
            (player === "rock" && computer === "scissors") ||
            (player === "paper" && computer === "rock") ||
            (player === "scissors" && computer === "paper")
        ) {

            result = "You win!";
            playerScore++;

        } else {

            result = "Computer wins!";
            computerScore++;

        }

        document.getElementById("rpsResult").textContent =
            "You chose " + player + " | Computer chose " + computer +
            " — " + result;

        document.getElementById("playerScore").textContent = playerScore;
        document.getElementById("computerScore").textContent = computerScore;

    });

});


// GAME 6: CATCH THE BUG

const bug = document.getElementById("bug");
const bugArea = document.getElementById("bugArea");

let bugScore = 0;
let bugSeconds = 15;
let bugInterval;
let bugActive = false;

function moveBug() {

    const maxX = bugArea.clientWidth - bug.offsetWidth;
    const maxY = bugArea.clientHeight - bug.offsetHeight;

    const x = Math.random() * Math.max(0, maxX);
    const y = Math.random() * Math.max(0, maxY);

    bug.style.left = x + "px";
    bug.style.top = y + "px";

}

document.getElementById("bugStart").addEventListener("click", function() {

    clearInterval(bugInterval);

    bugScore = 0;
    bugSeconds = 15;
    bugActive = true;

    document.getElementById("bugScore").textContent = 0;
    document.getElementById("bugTime").textContent = 15;
    document.getElementById("bugMessage").textContent = "";

    bug.style.display = "block";

    moveBug();

    bugInterval = setInterval(function() {

        bugSeconds--;

        document.getElementById("bugTime").textContent = bugSeconds;

        if (bugSeconds <= 0) {

            clearInterval(bugInterval);
            bugActive = false;

            bug.style.display = "none";

            document.getElementById("bugMessage").textContent =
                "Time's up! Final score: " + bugScore;

        }

    }, 1000);

});

bug.addEventListener("click", function() {

    if (!bugActive) return;

    bugScore++;

    document.getElementById("bugScore").textContent = bugScore;

    moveBug();

});
