// CODEBLOOM - CODING QUIZ

const questions = [

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        answer: 0
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: [
            "<h6>",
            "<heading>",
            "<h1>",
            "<head>"
        ],
        answer: 2
    },

    {
        question: "Which HTML tag creates a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: 1
    },

    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets",
            "Cascading Style Sheets"
        ],
        answer: 3
    },

    {
        question: "Which CSS property changes the text color?",
        options: [
            "color",
            "font-style",
            "background",
            "text-size"
        ],
        answer: 0
    },

    {
        question: "Which CSS property makes a container use Flexbox?",
        options: [
            "position: flex",
            "display: flex",
            "flex: display",
            "align: flex"
        ],
        answer: 1
    },

    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "*",
            "#",
            "&"
        ],
        answer: 2
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "All of these"
        ],
        answer: 3
    },

    {
        question: "Which method displays a message in the browser console?",
        options: [
            "console.log()",
            "alert.log()",
            "print.console()",
            "message()"
        ],
        answer: 0
    },

    {
        question: "Which JavaScript event happens when a user clicks an element?",
        options: [
            "onchange",
            "onmouseover",
            "onclick",
            "onload"
        ],
        answer: 2
    }

];


// ELEMENTS
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");

const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("questionNumber");

const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");

const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("nextButton");
const quizResult = document.getElementById("quizResult");

const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

const restartButton = document.getElementById("restartButton");
const questionBox = document.querySelector(".question-box");


// QUIZ VARIABLES
let currentQuestion = 0;
let score = 0;
let answered = false;


// DISPLAY QUESTION
function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionElement.textContent = question.question;

    optionsContainer.innerHTML = "";

    feedback.textContent = "";
    nextButton.style.display = "none";

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    const progress =
        (currentQuestion / questions.length) * 100;

    progressFill.style.width = progress + "%";
    progressPercent.textContent = Math.round(progress) + "%";


    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option";
        button.textContent = option;

        button.addEventListener("click", function() {
            checkAnswer(index, button);
        });

        optionsContainer.appendChild(button);

    });

}


// CHECK ANSWER
function checkAnswer(selectedAnswer, selectedButton) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach((button, index) => {

        button.disabled = true;

        if (index === correctAnswer) {
            button.classList.add("correct");
        }

    });


    if (selectedAnswer === correctAnswer) {

        score++;

        feedback.textContent = "Excellent! Your answer is correct!";
        feedback.style.color = "#00ff99";

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "Not quite! The correct answer is: " +
            questions[currentQuestion].options[correctAnswer];

        feedback.style.color = "#ff4d6d";

    }

    scoreElement.textContent = score;

    nextButton.style.display = "inline-block";

    if (currentQuestion === questions.length - 1) {
        nextButton.innerHTML =
            'SEE RESULTS <i class="fa-solid fa-trophy"></i>';
    } else {
        nextButton.innerHTML =
            'NEXT QUESTION <i class="fa-solid fa-arrow-right"></i>';
    }

}


// NEXT QUESTION
function nextQuestion() {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }

}


// SHOW FINAL RESULTS
function showResults() {

    questionBox.style.display = "none";
    quizResult.style.display = "block";

    progressFill.style.width = "100%";
    progressPercent.textContent = "100%";

    questionNumber.textContent =
        `QUESTION ${questions.length} / ${questions.length}`;

    finalScore.textContent =
        score + " / " + questions.length;


    if (score === 10) {

        resultMessage.textContent =
            "Perfect score! You are a CODEBLOOM champion!";

    } else if (score >= 7) {

        resultMessage.textContent =
            "Amazing work! You have great coding knowledge!";

    } else if (score >= 5) {

        resultMessage.textContent =
            "Good job! Keep practicing and improving!";

    } else {

        resultMessage.textContent =
            "Keep learning! Every great developer starts somewhere!";

    }

}


// RESTART QUIZ
function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    scoreElement.textContent = "0";

    quizResult.style.display = "none";
    questionBox.style.display = "block";

    nextButton.innerHTML =
        'NEXT QUESTION <i class="fa-solid fa-arrow-right"></i>';

    showQuestion();

}


// BUTTON EVENTS
nextButton.addEventListener("click", nextQuestion);

restartButton.addEventListener("click", restartQuiz);


// START QUIZ
showQuestion();