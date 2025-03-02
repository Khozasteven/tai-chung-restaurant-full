const sliderContainer = document.querySelector('.welcome-slider');
const slides = document.querySelectorAll('.welcome-slide');
let currentSlide = 0;

// Function to show the next slide
function nextSlide() {
    // Hide the current slide
    slides[currentSlide].classList.remove('active');

    // Calculate the next slide index
    currentSlide = (currentSlide + 1) % slides.length;

    // Show the next slide
    slides[currentSlide].classList.add('active');
}

// Automatically change slides every 3 seconds (adjust as needed)
setInterval(nextSlide, 3000);

// Select the CTA buttons
const orderNowButton = document.querySelector('.cta-button.order-button');
const callToOrderButton = document.querySelector('.cta-button.call-button');

// Function to handle "Order Now" button click
function handleOrderNowClick() {
    // Redirect to the "Order Now" page
    window.location.href = 'order now.html';
}

// Add event listener to the "Order Now" button
orderNowButton.addEventListener('click', handleOrderNowClick);

// Select the "Add to Cart" buttons for each dish
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Initialize an empty cart (consider using local storage to persist cart data)
let cart =[];

// Function to add a dish to the cart
function addToCart(dishName, dishPrice, dishImage) {
    // Check if the dish is already in the cart
    const existingDishIndex = cart.findIndex(item => item.name === dishName);

    if (existingDishIndex > -1) {
        // If the dish exists, increase its quantity
        cart[existingDishIndex].quantity++;
    } else {
        // Otherwise, add the dish to the cart with its image
        cart.push({ name: dishName, price: dishPrice, quantity: 1, image: dishImage });
    }

    // Update the cart display
    updateCartDisplay();
}

// Function to update the cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalCount;
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items'); // Assuming you have a container for cart items
    cartItemsContainer.innerHTML = ''; // Clear existing cart items

    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your cart is empty.";
        cartItemsContainer.appendChild(emptyMessage);
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Add the dish image
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        cartItem.appendChild(image);

        // Add the dish details (name, price, quantity)
        const details = document.createElement('div');
        details.innerHTML = `
            <h3>${item.name}</h3>
            <p>R${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartItem.appendChild(details);

        // Add the "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.addEventListener('click', () => {
            // Remove the item from the cart array
            cart = cart.filter(cartItem => cartItem.name!== item.name);

            // Update the cart display and count
            updateCartDisplay();
            updateCartCount();
        });
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    // Update the cart total
    const cartTotalDisplay = document.getElementById('cart-total'); // Assuming you have a container for the cart total
    cartTotalDisplay.textContent = `Total: R${total.toFixed(2)}`;
}

// Function to handle "Add to Cart" button click
function handleAddToCartClick(event) {
    const button = event.target;
    const dishName = button.getAttribute('data-name');
    const dishPrice = parseFloat(button.getAttribute('data-price'));
    const dishImage = button.closest('.dish-category').querySelector('img').src;

    addToCart(dishName, dishPrice, dishImage);
    updateCartCount();

    // Redirect to cart.html after a short delay
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 1000); // Adjust delay as needed (in milliseconds)
}

// Add event listeners to the "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCartClick);
});

// --- Review Section ---

// Function to show the next review
function nextReview() {
    // Implement logic to cycle through customer reviews (similar to the slider)
    // For example, you can use a similar approach as the `nextSlide` function
}

// Automatically change reviews every 5 seconds (adjust as needed)
setInterval(nextReview, 5000);

// --- Blog Section ---

// Function to fetch and display blog posts (example using fetch API)
async function fetchBlogPosts() {
    try {
        const response = await fetch('blog-posts.json'); // <-- Fetch from local file
        const data = await response.json();

        // Process the data and display blog posts on the page
        // ... (rest of your code to display blog posts) ...
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}
        // Replace with your actual API endpoint
        const data = await response.json();

        // Process the data and display blog posts on the page
        // For example, you can create HTML elements for each blog post and append them to a container
        const blogPostsContainer = document.getElementById('blog-posts-container');
        data.forEach(post => {
            const blogPostElement = document.createElement('div');
            blogPostElement.classList.add('blog-post');
            blogPostElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `;
            blogPostsContainer.appendChild(blogPostElement);
        });{
            const blogPostElement = document.createElement('div');
            blogPostElement.classList.add('blog-post');
            blogPostElement.innerHTML = `
                ${post.title}
                ${post.content}
            `;
            blogPostsContainer.appendChild(blogPostElement);
        }
        console.error('Error fetching blog posts:', error);
    


// Call the function to fetch and display blog posts
fetchBlogPosts();

// Select the menu toggle and navigation list
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

// Add an event listener to the menu toggle
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});