
// ========================================
// CODEBLOOM - CODE LAB
// ========================================

const htmlEditor = document.getElementById("htmlCode");
const cssEditor = document.getElementById("cssCode");
const jsEditor = document.getElementById("jsCode");

const preview = document.getElementById("preview");

const runButton = document.getElementById("runCode");
const resetButton = document.getElementById("resetCode");

const previewStatus = document.querySelector(".preview-status");


// ========================================
// RANDOM CHALLENGES
// ========================================

const challenges = [

    {
        title: "Build a Profile Card",
        level: "EASY",
        description: "Create a modern personal profile card using HTML and CSS.",
        tasks: [
            "Add a name and a short description.",
            "Add three social media buttons.",
            "Use a beautiful gradient background.",
            "Center the card on the page."
        ]
    },

    {
        title: "Create a Music Player",
        level: "MEDIUM",
        description: "Design a stylish music player interface.",
        tasks: [
            "Add a song title and artist name.",
            "Add an album cover.",
            "Create play and pause buttons.",
            "Use JavaScript to change the button text."
        ]
    },

    {
        title: "Design a Login Page",
        level: "EASY",
        description: "Build a beautiful login page for a modern website.",
        tasks: [
            "Add email and password inputs.",
            "Add a login button.",
            "Create a gradient background.",
            "Style the form with CSS."
        ]
    },

    {
        title: "Build a Digital Clock",
        level: "MEDIUM",
        description: "Create a digital clock that displays the current time.",
        tasks: [
            "Display hours, minutes and seconds.",
            "Style the clock using CSS.",
            "Use JavaScript to update the time.",
            "Make the clock update automatically."
        ]
    },

    {
        title: "Create a To-Do List",
        level: "MEDIUM",
        description: "Build a simple application for organizing daily tasks.",
        tasks: [
            "Add an input for new tasks.",
            "Create an ADD TASK button.",
            "Display tasks in a list.",
            "Use JavaScript to add new tasks."
        ]
    },

    {
        title: "Build a Weather Card",
        level: "HARD",
        description: "Design a modern weather dashboard interface.",
        tasks: [
            "Add a city name.",
            "Display a temperature.",
            "Add weather icons.",
            "Create a modern dashboard layout.",
            "Use JavaScript to change the displayed city."
        ]
    },

    {
        title: "Create a Color Changer",
        level: "EASY",
        description: "Build a page where users can change the background color.",
        tasks: [
            "Add a CHANGE COLOR button.",
            "Choose at least three colors.",
            "Use JavaScript to change the background.",
            "Add a smooth CSS transition."
        ]
    },

    {
        title: "Create a Digital Business Card",
        level: "EASY",
        description: "Design a professional digital business card.",
        tasks: [
            "Add a person's name.",
            "Add a job title.",
            "Add contact information.",
            "Use modern colors and shadows."
        ]
    },

    {
        title: "Build a Calculator",
        level: "HARD",
        description: "Create a working calculator using HTML, CSS and JavaScript.",
        tasks: [
            "Add a calculator display.",
            "Create number buttons from 0 to 9.",
            "Add mathematical operators.",
            "Make the calculator perform calculations."
        ]
    }

];

let currentChallenge = -1;


// ========================================
// SHOW RANDOM CHALLENGE
// ========================================

function showRandomChallenge() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * challenges.length);
    } while (
        randomIndex === currentChallenge &&
        challenges.length > 1
    );

    currentChallenge = randomIndex;

    const challenge = challenges[currentChallenge];

    document.getElementById("challengeTitle").textContent =
        challenge.title;

    document.getElementById("challengeDescription").textContent =
        challenge.description;

    const level = document.getElementById("challengeLevel");

    level.textContent = challenge.level;
    level.className = "challenge-level";

    if (challenge.level === "MEDIUM") {
        level.classList.add("medium");
    }

    if (challenge.level === "HARD") {
        level.classList.add("hard");
    }

    const taskList = document.getElementById("challengeTasks");

    taskList.innerHTML = "";

    challenge.tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });

}


// ========================================
// RUN CODE
// ========================================

function runCode() {

    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const safeJS = js.replace(
        /<\/script/gi,
        "<\\/script"
    );

    const output = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <style>
                ${css}
            </style>
        </head>

        <body>

            ${html}

            <script>
                ${safeJS}
            <\/script>

        </body>
        </html>
    `;

    preview.srcdoc = output;

    previewStatus.textContent = "RUNNING";
    previewStatus.style.color = "#00ff99";

}


// ========================================
// RESET CODE
// ========================================

function resetCode() {

    htmlEditor.value = "";
    cssEditor.value = "";
    jsEditor.value = "";

    preview.srcdoc = "";

    previewStatus.textContent = "READY";
    previewStatus.style.color = "#00ff99";

}


// ========================================
// BUTTON EVENTS
// ========================================

runButton.addEventListener("click", runCode);

resetButton.addEventListener("click", resetCode);

document.getElementById("newChallenge").addEventListener(
    "click",
    showRandomChallenge
);


// ========================================
// START PAGE
// ========================================

htmlEditor.value = "";
cssEditor.value = "";
jsEditor.value = "";

preview.srcdoc = "";

previewStatus.textContent = "READY";

showRandomChallenge();
