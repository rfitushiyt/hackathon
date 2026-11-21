const signinForm = document.getElementById("signinForm");
const signinMessage = document.getElementById("signinMessage");

signinForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {

        signinMessage.textContent = "Please fill in all fields.";
        signinMessage.style.color = "#ff4d6d";

        return;
    }

    signinMessage.textContent = "Welcome to CODEBLOOM!";
    signinMessage.style.color = "#00ff99";

    setTimeout(function() {
        window.location.href = "home.html";
    }, 1500);

});