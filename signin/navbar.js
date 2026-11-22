
document.addEventListener("DOMContentLoaded", function () {

    // GET CURRENT PAGE
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    // NAVBAR HTML
    const navbarHTML = `
        <!-- BACKGROUND EFFECTS -->
        <div class="background-effects">
            <div class="glow glow-one"></div>
            <div class="glow glow-two"></div>
            <div class="grid-overlay"></div>
        </div>

        <!-- FLOATING CODE SYMBOLS -->
        <div class="floating-code code-one">&lt;/&gt;</div>
        <div class="floating-code code-two">{ }</div>
        <div class="floating-code code-three">&lt;div&gt;</div>
        <div class="floating-code code-four">0101</div>

        <!-- NAVIGATION -->
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

                <a href="index.html"
                   class="${currentPage === "index.html" ? "active" : ""}">
                   Register
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

            <a href="signin.html" class="developer-btn">
                &lt;/&gt; Sign In
            </a>

        </header>
    `;

    // PREVENT DUPLICATE NAVBAR
    if (!document.querySelector(".navbar")) {
        document.body.insertAdjacentHTML(
            "afterbegin",
            navbarHTML
        );
    }

});
