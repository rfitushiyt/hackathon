
// ========================================
// CODEBLOOM - CART JAVASCRIPT
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
            Number.isInteger(Number(product.quantity)) &&
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


// HTML ELEMENTS
const cartItemsContainer = document.getElementById("cart-items");
const emptyCart = document.getElementById("empty-cart");
const itemCount = document.getElementById("item-count");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout-btn");


// FORMAT PRICE
function formatPrice(price) {
    return "$" + price.toFixed(2);
}


// SAVE CART
function saveCart() {
    localStorage.setItem(
        "codebloomCart",
        JSON.stringify(cart)
    );
}


// DISPLAY CART
function displayCart() {

    cartItemsContainer.innerHTML = "";

    const totalItems = cart.reduce((sum, product) => {
        return sum + product.quantity;
    }, 0);

    const subtotal = cart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    // UPDATE ITEM COUNT
    itemCount.textContent = `${totalItems} ITEMS`;

    // UPDATE PRICES
    subtotalElement.textContent = formatPrice(subtotal);
    totalElement.textContent = formatPrice(subtotal);

    // SHOW EMPTY CART MESSAGE
    if (cart.length === 0) {
        emptyCart.style.display = "block";
        checkoutButton.disabled = true;
    } else {
        emptyCart.style.display = "none";
        checkoutButton.disabled = false;
    }

    // CREATE PRODUCT ELEMENTS
    cart.forEach((product, index) => {

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        // PRODUCT INFORMATION
        const productInfo = document.createElement("div");
        productInfo.className = "product-info";

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = formatPrice(product.price) + " each";

        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);


        // QUANTITY CONTROLS
        const quantityControls = document.createElement("div");
        quantityControls.className = "quantity-controls";

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.type = "button";
        decreaseButton.dataset.action = "decrease";
        decreaseButton.dataset.index = index;

        const quantity = document.createElement("span");
        quantity.textContent = product.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.type = "button";
        increaseButton.dataset.action = "increase";
        increaseButton.dataset.index = index;

        quantityControls.append(
            decreaseButton,
            quantity,
            increaseButton
        );


        // PRICE AND REMOVE BUTTON
        const itemRight = document.createElement("div");
        itemRight.className = "item-right";

        const itemPrice = document.createElement("p");
        itemPrice.className = "item-price";
        itemPrice.textContent = formatPrice(
            product.price * product.quantity
        );

        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";
        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.dataset.action = "remove";
        removeButton.dataset.index = index;

        itemRight.append(itemPrice, removeButton);

        // ADD EVERYTHING TO THE CART
        cartItem.append(
            productInfo,
            quantityControls,
            itemRight
        );

        cartItemsContainer.appendChild(cartItem);
    });
}


// HANDLE CART BUTTONS
cartItemsContainer.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const index = Number(button.dataset.index);
    const action = button.dataset.action;

    if (!Number.isInteger(index) || !cart[index]) return;

    if (action === "increase") {
        cart[index].quantity++;
    }

    if (action === "decrease") {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
    }

    if (action === "remove") {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
});


// CHECKOUT
checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) return;

    const confirmed = confirm(
        "This is a demo checkout. No real payment will be processed. Continue?"
    );

    if (confirmed) {

        cart = [];

        saveCart();
        displayCart();

        alert("Your demo order was completed successfully!");

        window.location.href = "shop.html";
        
    }
});


// INITIALIZE CART
displayCart();
