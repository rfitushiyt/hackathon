
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

    // SUCCESS MESSAGE
    signinMessage.textContent = "✓ You are now signed in!";
    signinMessage.style.color = "#00ff99";
    signinMessage.style.display = "block";

    // DISABLE BUTTON
    const button = signinForm.querySelector(".signin-btn");
    button.disabled = true;
    button.style.opacity = "0.7";
    button.textContent = "SIGNED IN ✓";

    // REDIRECT TO HOME
    setTimeout(function() {
        window.location.href = "home.html";
    }, 2000);
});
