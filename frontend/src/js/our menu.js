const menuItems = {
    "chow-mein": [
        { image: "../img/153A4800.png", name: "Chicken Chow Mein", smallPrice: "R69.00", mediumPrice: "R95.00" },
        //... more chow mein items
    ],
    "chow-faan": [
        { image: "../img/s921345261197427717_p28_i1_w572.webp", name: "Chicken Chow Faan", smallPrice: "R71.00", mediumPrice: "R92.00" },
        //... more chow faan items
    ],
    "chop-suey": [
        { image: "../img/153A4840.png", name: "Chicken Chop Suey", smallPrice: "R85.00", mediumPrice: "R105.00" },
        //... more chop suey items
    ],
    //... other categories
};

const menuGrid = document.querySelector('.menu-grid');
const filterButtons = document.querySelectorAll('.filter-button');

function displayMenuItems(category) {
    menuGrid.innerHTML = '';

    let itemsToDisplay = category === 'all'
    ? Object.values(menuItems).flat()
    : menuItems[category] || [];
    itemsToDisplay.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Small - ${item.smallPrice}</p>
                <p>Medium - ${item.mediumPrice}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.dataset.category;
        displayMenuItems(category);
    });
});

menuGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const itemDetails = event.target.closest('.menu-item');
        const itemName = itemDetails.querySelector('h3').textContent;
        console.log(`Added ${itemName} to cart`); // Or your actual cart logic
    } // This closing brace was missing!
});

displayMenuItems('all');

// script.js
//... (menuItems, displayMenuItems, filter button logic remain the same)

// Modal functionality
const modal = document.getElementById("sizeModal");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.querySelector(".close-button");
const sizeButtons = document.querySelectorAll(".size-button");
let selectedItem; // Store the currently clicked item

menuGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        selectedItem = event.target.closest('.menu-item'); // Store the clicked item
        modal.style.display = "block"; // Show the modal
    }
});

closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const size = button.dataset.size;
        const itemName = selectedItem.querySelector('h3').textContent;
        console.log(`Added ${itemName} (${size}) to cart`); // Your cart logic here
        modal.style.display = "none"; // Hide the modal after selection
    });
});


displayMenuItems('all');

// script.js
//... (menuItems, displayMenuItems, filter logic, modal logic)

let cart = JSON.parse(localStorage.getItem('cart')) ||[];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

function updateCart() {
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const menuItem = Object.values(menuItems).flat().find(menuItem => menuItem.name === item.name); // Find the menu item

        cartItemDiv.innerHTML = `
            <img src="${menuItem? menuItem.image: 'placeholder.jpg'}" alt="${item.name}">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name} (${item.size})</div>
                <div class="cart-item-price">${item.price.join(" - ")}</div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);

        // Calculate total price (you'll need to parse prices correctly)
        const priceString = item.price[item.size === 'small'? 0: 1].replace('R', '');
        const price = parseFloat(priceString); // Convert to number
        totalPrice += price;
    });

    cartTotal.textContent = `Total: R${totalPrice.toFixed(2)}`; // Update total
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to local storage
}


sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        //... (existing modal close and item add logic)
        updateCart(); // Update cart display after adding
    });
});

// Initial cart update on page load
updateCart();

checkoutButton.addEventListener('click', () => {
    // Implement your checkout logic here (e.g., redirect to checkout page)
    console.log("Checkout clicked!");
});

displayMenuItems('all'); // Initial display