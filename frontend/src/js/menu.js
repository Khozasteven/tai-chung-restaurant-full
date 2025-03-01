document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/menu') // Replace with your actual API URL if different
      .then(response => response.json())
      .then(menuData => {
        const menuItemsContainer = document.getElementById('menu-items-container'); // Get the container element
  
        if (menuItemsContainer) { // Check if the container element exists
          menuData.forEach(dish => {
            const dishElement = document.createElement('div'); // Create a div for each dish
            dishElement.classList.add('menu-item'); // Add a CSS class for styling (optional)
  
            // Create elements for dish details
            const nameElement = document.createElement('h3');
            nameElement.textContent = dish.name;
  
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = dish.description;
  
            const priceElement = document.createElement('p');
            priceElement.textContent = `Price: $${dish.price.toFixed(2)}`; // Format price
  
            const categoryElement = document.createElement('p');
            categoryElement.textContent = `Category: ${dish.category}`;
  
            // Append dish details to the dish element
            dishElement.appendChild(nameElement);
            dishElement.appendChild(descriptionElement);
            dishElement.appendChild(priceElement);
            dishElement.appendChild(categoryElement);
  
            // Append the dish element to the container
            menuItemsContainer.appendChild(dishElement);
          });
        } else {
          console.error('Error: Menu items container not found in menu.html');
        }
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
        const menuItemsContainer = document.getElementById('menu-items-container');
        if (menuItemsContainer) {
          menuItemsContainer.textContent = 'Failed to load menu. Please try again later.'; // Display error message in container
        }
      });
  });