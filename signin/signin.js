
const signinForm = document.getElementById("signinForm");
const signinMessage = document.getElementById("signinMessage");

signinForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const button = signinForm.querySelector(".signin-btn");

    if (!email || !password) {
        signinMessage.textContent = "Please fill in all fields.";
        signinMessage.style.color = "#ff4d6d";
        return;
    }

    button.disabled = true;
    button.textContent = "PLEASE WAIT...";

    try {

        const response = await fetch("signin.php", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                email: email,
                password: password
            })
        });

        const result = await response.json();

        if (result.success) {

            signinMessage.textContent = "✓ You are now signed in!";
            signinMessage.style.color = "#00ff99";

            button.textContent = "SIGNED IN ✓";

            setTimeout(function() {
                window.location.href = "home.html";
            }, 1000);

        } else {

            signinMessage.textContent = result.message;
            signinMessage.style.color = "#ff4d6d";

            button.disabled = false;
            button.innerHTML = 'SIGN IN <span>✦</span>';
        }

    } catch (error) {

        signinMessage.textContent = "Connection error. Please try again.";
        signinMessage.style.color = "#ff4d6d";

        button.disabled = false;
        button.innerHTML = 'SIGN IN <span>✦</span>';
    }

});
