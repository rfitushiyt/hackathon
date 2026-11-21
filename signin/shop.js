
// ========================================
// CODEBLOOM - SHOP JAVASCRIPT
// ========================================


// GET SAVED CART
let cart = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("codebloomCart")
    );

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter(product =>
            product &&
            typeof product.name === "string" &&
            Number.isFinite(Number(product.price)) &&
            Number.isFinite(Number(product.quantity)) &&
            Number(product.quantity) > 0
        );

        cart.forEach(product => {
            product.price = Number(product.price);
            product.quantity = Number(product.quantity);
        });
    }
} catch (error) {
    cart = [];
}


// SAVE CART
function saveCart() {
    localStorage.setItem(
        "codebloomCart",
        JSON.stringify(cart)
    );
}


// UPDATE CART COUNT
function updateCartCount() {

    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    const totalItems = cart.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    countElement.textContent = totalItems;
}


// ADD TO CART
function addToCart(button) {

    const productCard = button.closest(".product-card");

    if (!productCard) return;

    const nameElement = productCard.querySelector(
        ".product-info h3"
    );

    const priceElement = productCard.querySelector(
        ".product-bottom h4"
    );

    if (!nameElement || !priceElement) {
        console.error("Product information is missing.");
        return;
    }

    const productName = nameElement.textContent.trim();

    const productPrice = parseFloat(
        priceElement.textContent.replace(/[^0-9.]/g, "")
    );

    if (!productName || !Number.isFinite(productPrice)) {
        console.error("Invalid product name or price.");
        return;
    }


    // CHECK IF PRODUCT EXISTS
    const existingProduct = cart.find(product => {
        return product.name === productName;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });

    }


    // SAVE AND UPDATE
    saveCart();
    updateCartCount();


    // BUTTON FEEDBACK
    const originalText = button.textContent;

    button.textContent = "Added ✓";
    button.classList.add("added");

    button.disabled = true;

    setTimeout(() => {

        button.textContent = originalText;
        button.classList.remove("added");
        button.disabled = false;

    }, 1000);

}


// CONNECT ALL BUTTONS
document.querySelectorAll(".add-btn").forEach(button => {

    button.addEventListener("click", function() {
        addToCart(this);
    });

});


// INITIALIZE CART
updateCartCount();
