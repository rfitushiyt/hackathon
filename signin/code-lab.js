// CODEBLOOM - CODE LAB

const htmlEditor = document.getElementById("htmlCode");
const cssEditor = document.getElementById("cssCode");
const jsEditor = document.getElementById("jsCode");

const preview = document.getElementById("preview");
const runButton = document.getElementById("runCode");
const resetButton = document.getElementById("resetCode");
const previewStatus = document.querySelector(".preview-status");


// RUN CODE
function runCode() {

    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    // Prevent a typed closing script tag from ending our preview script early
    const safeJS = js.replace(/<\/script/gi, "<\\/script");

    const output = `
        <!DOCTYPE html>
        <html>
        <head>
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


// RESET CODE
function resetCode() {

    htmlEditor.value = htmlEditor.defaultValue;
    cssEditor.value = cssEditor.defaultValue;
    jsEditor.value = jsEditor.defaultValue;

    runCode();

}


// BUTTON EVENTS
runButton.addEventListener("click", runCode);

resetButton.addEventListener("click", resetCode);


// SHOW STARTER CODE WHEN PAGE OPENS
runCode();