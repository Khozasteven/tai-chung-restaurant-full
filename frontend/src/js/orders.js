// order-now.js
const menuItems = {
  "chow-mein": [
    { image: "/frontend/img/153A4800.png", name: "Chicken Chow Mein", prices: ["R69.00", "R95.00"] },
    //... more chow mein items
  ],
  "chow-faan": [
    { image: "/frontend/img/s921345261197427717_p28_i1_w572.webp", name: "Chicken Chow Faan", prices: ["R71.00", "R92.00"] },
    //... more chow faan items
  ],
  "chop-suey": [
    { image: "img/153A4840.png", name: "Chicken Chop Suey", prices: ["R85.00", "R105.00"] },
    //... more chop suey items
  ],
  "sweet-and-sour": [
    { image: "/frontend/img/werenga.png", name: "Chicken Sweet & Sour", prices: ["R65.00", "R105.00"] },
    //... more sweet and sour items
  ],
  "spring-rolls": [
    { image: "/frontend/img/hhhh.png", name: "Chicken Spring Rolls", prices: ["R20.00"] },
    //... more spring rolls items
  ],
  "stir-fry": [
    { image: "/frontend/img/pexels-pixabay-357756.png", name: "Chicken Stir Fry", prices: ["R56.00", "R94.00"] },
    //... more stir fry items
  ],
  //... other categories...
};

const menuItemsContainer = document.querySelector('.menu-items');
const categoryTabs = document.querySelectorAll('.category-tab');
const modal = document.getElementById("sizeModal");
const closeButton = document.querySelector(".close-button");
const sizeButtons = document.querySelectorAll(".size-button");

let cart = JSON.parse(localStorage.getItem('cart')) ||[];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
let selectedItem = null; // To store the selected item

// Function to display menu items
function displayMenuItems(category) {
  menuItemsContainer.innerHTML = '';
  const itemsToDisplay = category === 'all'
  ? Object.values(menuItems).flat()
  : menuItems[category] ||[];

  itemsToDisplay.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    const hasMultiplePrices = item.prices.length > 1;
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      ${hasMultiplePrices? `
        <p>Small - ${item.prices}</p>
        <p>Medium - ${item.prices}</p>
      `: `
        <p>${item.prices}</p>
      `}
      <button class="add-to-cart" data-name="${item.name}" data-prices="${item.prices.join(',')}">Add to Cart</button>
    `;
    menuItemsContainer.appendChild(itemDiv);
  });
}

// Function to add item to cart
function addToCart(itemName, size, itemPrice) {
  const cartItem = {
    name: itemName,
    size: size, // 'small', 'medium', or 'single'
    price: itemPrice,
    quantity: 1
  };
  cart.push(cartItem);
  updateCart();
}

// Function to update cart display
function updateCart() {
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');
    cartItemDiv.innerHTML = `
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name} (${item.size === 'single'? '': item.size})</div>
        <div class="cart-item-price">${item.price}</div>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemDiv);
    const priceString = item.price.split(' - ').replace('R', '');
    totalPrice += parseFloat(priceString);
  });

  cartTotal.textContent = `Total: R${totalPrice.toFixed(2)}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Event listeners for tab-based category selection
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const category = tab.dataset.category;
    displayMenuItems(category);
  });
});

// Event listeners for modal
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
    const itemPrice = size === 'small'
    ? selectedItem.querySelector('p:nth-child(1)').textContent
    : selectedItem.querySelector('p:nth-child(2)').textContent;
    addToCart(itemName, size, itemPrice);
    modal.style.display = "none";
  });
});

// Event listener for "Add to Cart" buttons
menuItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    selectedItem = event.target.closest('.item');
    const itemName = selectedItem.querySelector('h3').textContent;
    const itemPrices = selectedItem.querySelectorAll('p');
    if (itemPrices.length > 1) {
      modal.style.display = "block";
    } else {
      const itemPrice = itemPrices.textContent;
      addToCart(itemName, 'single', itemPrice);
    }
  }
});

// Event listener for checkout button
checkoutButton.addEventListener('click', () => {
  console.log("Checkout clicked!", cart);
});

// Initializations
displayMenuItems('all');
updateCart();