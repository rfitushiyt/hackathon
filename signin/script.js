
const form = document.querySelector("#signupForm");

const nameInput = document.querySelector("#name");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");

const nameError = document.querySelector("#nameError");
const usernameError = document.querySelector("#usernameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmPasswordError = document.querySelector("#confirmPasswordError");

const strengthBars = document.querySelectorAll(".strength-bar");
const strengthText = document.querySelector("#strengthText");
const successMessage = document.querySelector("#successMessage");

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateName() {
    const name = nameInput.value.trim();

    if (name.length < 3) {
        nameError.textContent = "Name must contain at least 3 characters.";
        return false;
    }

    nameError.textContent = "";
    return true;
}

function validateUsername() {
    const username = usernameInput.value.trim();

    if (username.length < 3) {
        usernameError.textContent = "Username must contain at least 3 characters.";
        return false;
    }

    usernameError.textContent = "";
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

function checkPasswordStrength() {
    const password = passwordInput.value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    strengthBars.forEach((bar, index) => {
        bar.style.background = index < strength
            ? "#FF2E93"
            : "rgba(255,255,255,0.15)";
    });

    if (password.length === 0) {
        strengthText.textContent = "Password strength";
    } else if (strength <= 2) {
        strengthText.textContent = "Weak password";
    } else if (strength <= 4) {
        strengthText.textContent = "Medium password";
    } else {
        strengthText.textContent = "Strong password";
    }

    return strength;
}

function validatePassword() {
    const password = passwordInput.value;

    if (password.length < 8) {
        passwordError.textContent = "Password must contain at least 8 characters.";
        return false;
    }

    passwordError.textContent = "";
    return true;
}

function validateConfirmPassword() {
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match.";
        return false;
    }

    if (confirmPasswordInput.value === "") {
        confirmPasswordError.textContent = "Please confirm your password.";
        return false;
    }

    confirmPasswordError.textContent = "";
    return true;
}

function togglePasswordVisibility(buttonId, inputId) {
    const button = document.querySelector(`#${buttonId}`);
    const input = document.querySelector(`#${inputId}`);

    if (!button || !input) return;

    button.addEventListener("click", function () {
        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    });
}

togglePasswordVisibility("togglePassword", "password");
togglePasswordVisibility("toggleConfirm", "confirmPassword");

nameInput.addEventListener("input", validateName);
usernameInput.addEventListener("input", validateUsername);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", function () {
    checkPasswordStrength();
    validatePassword();

    if (confirmPasswordInput.value !== "") {
        validateConfirmPassword();
    }
});

confirmPasswordInput.addEventListener("input", validateConfirmPassword);

function createConfetti() {
    const colors = ["#A100FF", "#FF2E93", "#FF00C8", "#D9A3FF"];

    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement("div");

        confetti.style.position = "fixed";
        confetti.style.width = "8px";
        confetti.style.height = "8px";
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = "50%";
        confetti.style.zIndex = "9999";
        confetti.style.pointerEvents = "none";

        document.body.appendChild(confetti);

        const duration = Math.random() * 2000 + 1500;

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

        setTimeout(() => confetti.remove(), duration);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

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
        successMessage.textContent =
            "🎉 Congratulations! Your account has been created successfully!";

        successMessage.style.display = "block";

        createConfetti();

        form.reset();

        strengthBars.forEach(bar => {
            bar.style.background = "rgba(255,255,255,0.15)";
        });

        strengthText.textContent = "Password strength";
    } else {
        successMessage.textContent = "";
    }
});