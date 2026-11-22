
document.addEventListener("DOMContentLoaded", function () {

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const navbarHTML = `
        <div class="background-effects">
            <div class="glow glow-one"></div>
            <div class="glow glow-two"></div>
            <div class="grid-overlay"></div>
        </div>

        <div class="floating-code code-one">&lt;/&gt;</div>
        <div class="floating-code code-two">{ }</div>
        <div class="floating-code code-three">&lt;div&gt;</div>
        <div class="floating-code code-four">0101</div>

        <header class="navbar">

            <a href="home.html" class="logo">
                <span class="logo-icon">♛</span>
                CODE<span>BLOOM</span>
            </a>

            <nav class="nav-links">

                <a href="home.html"
                   class="${currentPage === "home.html" ? "active" : ""}">
                   HOME
                </a>

                <a href="about.html"
                   class="${currentPage === "about.html" ? "active" : ""}">
                   &lt;/&gt; About
                </a>

                <a href="shop.html"
                   class="${currentPage === "shop.html" ? "active" : ""}">
                   ★ Our Shop
                </a>

                <a href="contact.html"
                   class="${currentPage === "contact.html" ? "active" : ""}">
                   ✉ Contact
                </a>

                <a href="games.html"
                   class="${currentPage === "games.html" ? "active" : ""}">
                   Mini Games
                </a>

                <a href="code-lab.html"
                   class="${currentPage === "code-lab.html" ? "active" : ""}">
                   Code Lab
                </a>

                <a href="coding-quiz.html"
                   class="${currentPage === "coding-quiz.html" ? "active" : ""}">
                   Coding Quiz
                </a>

                <a href="codingtips.html"
                   class="${currentPage === "codingtips.html" ? "active" : ""}">
                   Coding Tips
                </a>

            </nav>

            <div id="account-area">
                <a href="signin.html" class="developer-btn">
                    &lt;/&gt; Log In
                </a>
            </div>

        </header>
    `;

    // PREVENT DUPLICATE NAVBAR
    if (!document.querySelector(".navbar")) {
        document.body.insertAdjacentHTML("afterbegin", navbarHTML);
    }

    // CHECK LOGIN STATUS
    fetch("auth-status.php")
        .then(response => response.json())
        .then(data => {

            const accountArea = document.getElementById("account-area");

            if (!accountArea || !data.loggedIn) return;

            const user = data.user;

            const initial = (
                user.name.trim().charAt(0) || "U"
            ).toUpperCase();

            accountArea.innerHTML = `
                <div class="profile-wrapper">

                    <button class="profile-avatar" id="profileAvatar"
                        title="${user.username}">
                        ${initial}
                    </button>

                    <div class="profile-menu" id="profileMenu">

                        <p class="profile-name"></p>

                        <button class="logout-btn" id="logoutBtn">
                            Log Out
                        </button>

                    </div>

                </div>
            `;

            // DISPLAY USERNAME SAFELY
            accountArea.querySelector(".profile-name").textContent =
                user.username;

            const avatar = document.getElementById("profileAvatar");
            const menu = document.getElementById("profileMenu");

            // OPEN / CLOSE PROFILE MENU
            avatar.addEventListener("click", function() {
                menu.classList.toggle("show");
            });

            // CLOSE MENU WHEN CLICKING OUTSIDE
            document.addEventListener("click", function(event) {
                if (!accountArea.contains(event.target)) {
                    menu.classList.remove("show");
                }
            });

            // LOG OUT
            document.getElementById("logoutBtn")
                .addEventListener("click", async function() {

                    try {

                        await fetch("logout.php", {
                            method: "POST"
                        });

                        window.location.href = "signin.html";

                    } catch (error) {
                        alert("Could not log out. Please try again.");
                    }

                });

        })
        .catch(error => {
            console.error("Could not check login status:", error);
        });

});
