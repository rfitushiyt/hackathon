
const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const successMessage = document.getElementById("successMessage");

const strengthBars = document.querySelectorAll(".strength-bar");
const strengthText = document.getElementById("strengthText");


// NAME VALIDATION
function validateName() {
    const name = nameInput.value.trim();

    if (name === "") {
        nameError.textContent = "Name is required.";
        return false;
    }

    if (name.length < 2) {
        nameError.textContent = "Name must contain at least 2 characters.";
        return false;
    }

    nameError.textContent = "";
    return true;
}


// USERNAME VALIDATION
function validateUsername() {
    const username = usernameInput.value.trim();

    if (username === "") {
        usernameError.textContent = "Username is required.";
        return false;
    }

    if (username.length < 3) {
        usernameError.textContent = "Username must contain at least 3 characters.";
        return false;
    }

    if (/\s/.test(username)) {
        usernameError.textContent = "Username cannot contain spaces.";
        return false;
    }

    usernameError.textContent = "";
    return true;
}


// EMAIL VALIDATION
function validateEmail() {
    const email = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "Email is required.";
        return false;
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}


// PASSWORD STRENGTH
function checkPasswordStrength() {
    const password = passwordInput.value;

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    strengthBars.forEach(bar => {
        bar.style.background = "rgba(255,255,255,0.15)";
    });

    if (password.length === 0) {
        strengthText.textContent = "Password strength";
        return;
    }

    if (strength <= 2) {
        strengthText.textContent = "Weak password";
        strengthBars[0].style.background = "#ff4d6d";
    } else if (strength <= 4) {
        strengthText.textContent = "Medium password";
        strengthBars[0].style.background = "#ffb347";
        strengthBars[1].style.background = "#ffb347";
    } else {
        strengthText.textContent = "Strong password";
        strengthBars.forEach(bar => {
            bar.style.background = "#00ff99";
        });
    }
}


// PASSWORD VALIDATION
function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        passwordError.textContent = "Password is required.";
        return false;
    }

    if (password.length < 8) {
        passwordError.textContent = "Password must contain at least 8 characters.";
        return false;
    }

    passwordError.textContent = "";
    return true;
}


// CONFIRM PASSWORD VALIDATION
function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {
        confirmPasswordError.textContent = "Please confirm your password.";
        return false;
    }

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        return false;
    }

    confirmPasswordError.textContent = "";
    return true;
}


// CONFETTI EFFECT
function createConfetti() {
    const colors = ["#A100FF", "#FF2E93", "#D9A3FF", "#00ff99"];

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.borderRadius = "2px";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration = Math.random() * 2000 + 2000;

        confetti.animate(
            [
                { transform: "translateY(0) rotate(0deg)", opacity: 1 },
                {
                    transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            confetti.remove();
        }, duration);
    }
}


// LIVE VALIDATION
nameInput.addEventListener("input", validateName);
usernameInput.addEventListener("input", validateUsername);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", function() {
    checkPasswordStrength();
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});

confirmPasswordInput.addEventListener("input", validateConfirmPassword);


// FORM SUBMISSION
form.addEventListener("submit", function(event) {
    event.preventDefault();

    successMessage.style.display = "none";
    successMessage.textContent = "";

    const isNameValid = validateName();
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmValid = validateConfirmPassword();

    if (
        isNameValid &&
        isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmValid
    ) {
        successMessage.textContent = "✓ You are now registered!";
        successMessage.style.display = "block";
        successMessage.style.color = "#00ff99";

        createConfetti();

        form.reset();

        strengthBars.forEach(bar => {
            bar.style.background = "rgba(255,255,255,0.15)";
        });

        strengthText.textContent = "Password strength";

    } else {
        successMessage.textContent = "";
        successMessage.style.display = "none";
    }
});
