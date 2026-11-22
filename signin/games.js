
/* =====================================
   GAME FOCUS MODE - FIXED
===================================== */

const allGameCards = document.querySelectorAll(".game-card");
const gamesContainer = document.querySelector(".games-container");

allGameCards.forEach(function(card) {

    // Create only one OPEN GAME button
    if (card.querySelector(".open-game-btn")) return;

    const openButton = document.createElement("button");

    openButton.textContent = "OPEN GAME";
    openButton.className = "open-game-btn";

    card.appendChild(openButton);

    openButton.addEventListener("click", function() {

        // Remove any old BACK buttons
        document.querySelectorAll(".back-games-btn").forEach(function(button) {
            button.remove();
        });

        // Hide all other cards
        allGameCards.forEach(function(otherCard) {
            otherCard.classList.remove("focused", "game-open");
            otherCard.classList.add("hidden-game");
        });

        // Show selected card
        card.classList.remove("hidden-game");
        card.classList.add("focused", "game-open");

        gamesContainer.classList.add("game-focus");
        document.body.classList.add("game-mode");

        // Show START GAME again when opening Catch the Bug
        if (card.contains(bugStart)) {
            bugStart.classList.remove("started");
        }

        // Create one BACK button
        const backButton = document.createElement("button");

        backButton.textContent = "← BACK TO ALL GAMES";
        backButton.className = "back-games-btn";

        card.insertBefore(backButton, card.firstChild);

        backButton.addEventListener("click", function() {

            allGameCards.forEach(function(game) {
                game.classList.remove("focused", "game-open", "hidden-game");
            });

            gamesContainer.classList.remove("game-focus");
            document.body.classList.remove("game-mode");

            backButton.remove();

        });

        card.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


/* HIDE START AND OPEN GAME BUTTONS AFTER GAME STARTS */

document.querySelectorAll("#typingStart, #bugStart").forEach(function(button) {

    button.addEventListener("click", function() {

        const currentCard = this.closest(".game-card");

        // Hide START button
        this.classList.add("started");

        // Hide OPEN GAME button
        const openButton = currentCard.querySelector(".open-game-btn");

        if (openButton) {
            openButton.classList.add("started");
        }

    });

});
