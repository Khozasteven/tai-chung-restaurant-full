document.addEventListener('DOMContentLoaded', function() {
        // --- Welcome Slider ---
        const slides = document.querySelectorAll('.welcome-slide');
        let currentSlide = 0;
     
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[n].classList.add('active');
          }
     
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
          }
     
        showSlide(currentSlide);
        setInterval(nextSlide, 5000);
     
        // --- Map ---
        const taiChungLatLng = { lat: -33.96431581323045, lng: 18.514623667539087 };
        const map = L.map('map').setView(taiChungLatLng, 13);
     
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
     
        const restaurantIcon = L.icon({
            iconUrl: '/frontend/img/loc.png',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          });
     
        const marker = L.marker(taiChungLatLng, { icon: restaurantIcon }).addTo(map);
        marker.bindPopup(createPopupContent("Loading...")).openPopup();
        marker.on('click', function () {
            this.getPopup().open();
          });
     
        getUserLocation()
            .then(userLatLng => {
                L.Routing.control({
                    waypoints: [
                        L.latLng(userLatLng.lat, userLatLng.lng),
                        taiChungLatLng
                      ],
                      router: L.Routing.osrmv1({ serviceUrl: 'YOUR_OSRM_SERVICE_URL' }), // REMEMBER TO REPLACE WITH YOUR OSRM SERVICE URL
                      createMarker: function (i, wp, nWps) {
                          if (i === nWps - 1) {
                              return L.marker(wp.latLng, { icon: restaurantIcon });
                          }
                      }
                  })
                      .on('routesfound', function (e) {
                          const routes = e.routes;
                          const summary = routes[0].summary;
                          const duration = timeConverter(summary.totalTime);
                          marker.getPopup().setContent(createPopupContent(duration)).update();
                      })
                      .addTo(map);
              })
              .catch(error => {
                  console.error("Error getting user location:", error);
                  marker.getPopup().setContent(createPopupContent("Could not get location")).update();
              });
     
          function timeConverter(seconds) {
              const minutes = Math.floor(seconds / 60);
              const remainingSeconds = seconds % 60;
              return `${minutes}m ${remainingSeconds}s`;
          }
     
          function createPopupContent(duration) {
              // Using the Google Maps URL obtained from Google Maps Tool earlier
              const directionsUrl = 'https://maps.google.com/?cid=16465516923669384562'; // <--- GOOGLE MAPS URL HERE
              return `
                  <div class="custom-popup">
                      <img src='/frontend/img/1.png' width='120px' alt='Restaurant Logo'>
                      <h3>Tai Chung Restaurant</h3>
                      <p>Delicious food awaits!</p>
                      <p>Estimated travel time (Leaflet Routing Machine): ${duration || "N/A"}</p>
                      <a href="${directionsUrl}" target="_blank">Get Directions (Google Maps)</a>
                  `;
          };
     
          function getUserLocation() {
              return new Promise((resolve, reject) => {
                  if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                          position => {
                              const userLatLng = {
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude
                              };
                              resolve(userLatLng);
                          },
                          error => reject(error)
                      );
                  } else {
                      reject(new Error("Geolocation is not supported by this browser."));
                  }
              });
          }
   })
  


        // --- Chatbot Logic (Part 1: Variable Declarations) ---
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotOutput = document.getElementById('chatbot-output');
        const chatbotSendButton = document.getElementById('chatbot-send-button');
 
        // --- chatbotResponses Declaration and Initialization ---
        const chatbotResponses = {
          // --- Greetings ---
          "hello": { response: "Welcome to Tai Chung Takeaway! <span class='chinese-phrase'>品尝正宗中华美食</span> We're ready to prepare your delicious takeaway order. How can I help you today?  You can ask me about our menu, location, hours, or directions." },
          "hi": { response: "Hello! Welcome to Tai Chung Takeaway. How can I assist you?" },
          "good day": { response: "Good day to you! Welcome to Tai Chung Takeaway, how may I help you?" },
  
          // --- Location/Directions ---
          "where are you?": {
              response: "We are located at 13 Belgravia Road, Athlone, Cape Town, 7764.  You can find us on Google Maps here: <a href='https://maps.google.com/?cid=16465516923669384562' target='_blank'>Tai Chung Restaurant on Google Maps</a>.  Would you like me to show you directions from your current location?", // Added Google Maps URL and target=_blank
              buttons: [ // Example of adding buttons - you'll need to handle button clicks in your UI
                  { text: "Yes, show directions", action: "showDirections" }, // 'action' can be used to trigger specific functions
                  { text: "No, just address", action: "showAddress" },
                  { text: "Show on map", action: "showMapLink" }
              ]
          },
          "directions": {  // Same response as "where are you?" for directions intent
              response: "We are located at 13 Belgravia Road, Athlone, Cape Town, 7764.  You can find us on Google Maps here: <a href='https://maps.google.com/?cid=16465516923669384562' target='_blank'>Tai Chung Restaurant on Google Maps</a>.  Would you like me to show you directions from your current location?",
              buttons: [
                  { text: "Yes, show directions", action: "showDirections" },
                  { text: "No, just address", action: "showAddress" },
                  { text: "Show on map", action: "showMapLink" }
              ]
          },
          "location": {  // Same response as "where are you?" for location intent
              response: "We are located at 13 Belgravia Road, Athlone, Cape Town, 7764.  You can find us on Google Maps here: <a href='https://maps.google.com/?cid=16465516923669384562' target='_blank'>Tai Chung Restaurant on Google Maps</a>.  Would you like me to show you directions from your current location?",
              buttons: [
                  { text: "Yes, show directions", action: "showDirections" },
                  { text: "No, just address", action: "showAddress" },
                  { text: "Show on map", action: "showMapLink" }
              ]
          },
  
  
          // --- Restaurant Information ---
          "tell me about tai chung": {
              response: "Tai Chung is a takeaway restaurant located in Athlone, Cape Town, serving authentic Chinese cuisine <span class='chinese-phrase'>品尝正宗中华美食</span>. We are known for our delicious and affordable dishes. We are open [mention opening hours - e.g., see website for details]. You can call us at +27 21 696 4870 for orders or inquiries. What specifically would you like to know?",
              buttons: [
                  { text: "Opening Hours", action: "openingHours" },
                  { text: "Menu", action: "menu" },
                  { text: "Contact", action: "contact" },
                  { text: "Specials", action: "specials" }
              ]
          },
          "restaurant details": { // Same response as "tell me about tai chung"
              response: "Tai Chung is a takeaway restaurant located in Athlone, Cape Town, serving authentic Chinese cuisine <span class='chinese-phrase'>品尝正宗中华美食</span>. We are known for our delicious and affordable dishes. We are open [mention opening hours - e.g., see website for details]. You can call us at +27 21 696 4870 for orders or inquiries. What specifically would you like to know?",
              buttons: [
                  { text: "Opening Hours", action: "openingHours" },
                  { text: "Menu", action: "menu" },
                  { text: "Contact", action: "contact" },
                  { text: "Specials", action: "specials" }
              ]
          },
  
          // --- Opening Hours ---
          "opening hours": { response: "Our opening hours are: Monday 2:00-9:00 PM, Tuesday to Thursday 12:00-9:00 PM, Friday and Saturday 12:00-10:00 PM. We are closed on Sundays." },
          "when are you open?": { response: "Our opening hours are: Monday 2:00-9:00 PM, Tuesday to Thursday 12:00-9:00 PM, Friday and Saturday 12:00-10:00 PM. We are closed on Sundays." },
          "what time do you close?": { response: "We close at 9:00 PM from Monday to Thursday, 10:00 PM on Friday and Saturday, and we are closed on Sundays." },
  
          // --- Contact Information ---
          "contact details": { response: "You can contact us by phone at +27 21 696 4870 or by email at tai213690@gmail.com." },
          "how to contact you?": { response: "You can reach us by phone at +27 21 696 4870 or email us at tai213690@gmail.com." },
          "phone number": { response: "Our phone number is +27 21 696 4870." },
          "email": { response: "Our email address is tai213690@gmail.com." },
  
          // --- Menu Inquiry ---
          "menu": { response: "You can view our menu on our website's Menu page [Link to Menu Page in Header of your Landing Page]. We have a wide variety of dishes, including Chow Mein, Spring Rolls, Sweet & Sour Chicken, and many more! Are you interested in any particular type of Chinese food?",
                  buttons: [
                      { text: "Appetizers", action: "appetizersMenu" }, // Example categories - adjust to your menu
                      { text: "Main Courses", action: "mainCoursesMenu" },
                      { text: "Vegetarian", action: "vegetarianMenu" },
                      { text: "See Full Menu", action: "fullMenuLink" } // If you have a separate menu page link
                  ]
                  },
          "what do you serve?": { response: "We serve a delicious range of authentic Chinese takeaway dishes! You can view our menu on our website [Link to Menu Page]. We have everything from flavorful noodles and rice dishes to tasty appetizers and meat and vegetarian options." },
          "food": { response: "We offer a wide variety of Chinese takeaway food, including noodles, rice, spring rolls, soups, and various meat, seafood, and vegetable dishes. Check out our full menu online! [Link to Menu Page]" },
          "dishes": { response: "Our menu includes a range of popular Chinese dishes like Chow Mein, Sweet and Sour dishes, Fried Rice, Spring Rolls, and more. You can see the complete menu here: [Link to Menu Page]." },
  
  
          // --- Specials/Promotions ---
          "specials": {
              response: "We currently have a special offer: 10% off on all online orders this week! <span class='chinese-phrase'>本周所有在线订单均可享受 10% 的折扣！</span> Would you like to place an order now and get this discount?",
              buttons: [
                  { text: "Order Now", action: "orderNow" },
                  { text: "Tell me more", action: "tellMeMoreSpecials" },
                  { text: "No thanks", action: "noThanksSpecials" }
              ]
          },
          "offers": { // Same response as "specials"
              response: "We currently have a special offer: 10% off on all online orders this week! <span class='chinese-phrase'>本周所有在线订单均可享受 10% 的折扣！</span> Would you like to place an order now and get this discount?",
              buttons: [
                  { text: "Order Now", action: "orderNow" },
                  { text: "Tell me more", action: "tellMeMoreSpecials" },
                  { text: "No thanks", action: "noThanksSpecials" }
              ]
          },
          "promotions": { // Same response as "specials"
              response: "We currently have a special offer: 10% off on all online orders this week! <span class='chinese-phrase'>本周所有在线订单均可享受 10% 的折扣！</span> Would you like to place an order now and get this discount?",
              buttons: [
                  { text: "Order Now", action: "orderNow" },
                  { text: "Tell me more", action: "tellMeMoreSpecials" },
                  { text: "No thanks", action: "noThanksSpecials" }
              ]
          },
          "deals": { // Same response as "specials"
              response: "We currently have a special offer: 10% off on all online orders this week! <span class='chinese-phrase'>本周所有在线订单均可享受 10% 的折扣！</span> Would you like to place an order now and get this discount?",
              buttons: [
                  { text: "Order Now", action: "orderNow" },
                  { text: "Tell me more", action: "tellMeMoreSpecials" },
                  { text: "No thanks", action: "noThanksSpecials" }
              ]
          },
          "tell me more specials": { // Response for "Tell me more" button about specials
              response: "This week, get a 10% discount on all takeaway orders placed online through our website. This offer is valid until [Date - e.g., February 27, 2025]. Ready to order?",
              buttons: [
                  { text: "Order Now", action: "orderNow" },
                  { text: "No thanks", action: "noThanksSpecials" }
              ]
          },
  
  
          // --- Order Placement (Basic - Direct to Phone) ---
          "place an order": { response: "Great! We're ready to take your takeaway order. Please call us at +27 21 696 4870 to place your order. You can view our menu online here [Link to Menu Page] to see what you'd like." },
          "i want to order": { response: "Fantastic! For takeaway orders, please call us directly at +27 21 696 4870.  Our menu is available here [Link to Menu Page]." },
          "order takeaway": { response: "Perfect! To place a takeaway order, please give us a call at +27 21 696 4870.  You can check out our menu online beforehand: [Link to Menu Page]." },
          "order now": { response: "Wonderful! Please call us at +27 21 696 4870 to place your takeaway order.  Our full menu is available online [Link to Menu Page] for your convenience." }, // Response for "Order Now" buttons
  
  
          // --- Halal Inquiry ---
          "halal?": { response: "To confirm the Halal status of our food, please call us directly at +27 21 696 4870. They will be able to give you the most accurate and up-to-date information." },
          "do you serve halal food?": { response: "For questions about Halal food, please contact us directly at +27 21 696 4870 for the most accurate information." },
          "is your food halal?": { response: "Please call Tai Chung Restaurant at +27 21 696 4870 to inquire about the Halal status of our dishes." },
  
  
          // --- Menu of Services (NEW SECTION added to chatbotResponses) ---
          "menu": {
              response: "Here are some things I can help you with. Just type the number to select an option:\n\n" +
                    "1.  Restaurant Location and Directions\n" +
                    "2.  Opening Hours\n" +
                    "3.  Contact Information (Phone/Email)\n" +
                    "4.  View Menu\n" +
                    "5.  Current Specials and Promotions\n" +
                    "6.  Place a Takeaway Order (Call Us)\n\n" +
                    "What number would you like to choose?",
              isMenu: true // Add a flag to identify this as a menu response
          },
          "help": {  // Add "help" as another trigger for the menu
              response: "Need some help? Here are the options:\n\n" +
                    "1.  Restaurant Location and Directions\n" +
                    "2.  Opening Hours\n" +
                    "3.  Contact Information (Phone/Email)\n" +
                    "4.  View Menu\n" +
                    "5.  Current Specials and Promotions\n" +
                    "6.  Place a Takeaway Order (Call Us)\n\n" +
                    "Type the number of your choice.",
              isMenu: true // Flag as menu response
          },
          "services": { // Add "services" as a trigger
              response: "Our services include:\n\n" +
                    "1.  Location and Directions\n" +
                    "2.  Opening Hours\n" +
                    "3.  Contact Information\n" +
                    "4.  Menu Information\n" +
                    "5.  Specials\n" +
                    "6.  Takeaway Orders\n\n" +
                    "Let me know the number corresponding to your interest.",
              isMenu: true // Flag as menu response
          },
          "options": { // Add "options" as a trigger
              response: "Here are the options:\n\n" +
                    "1.  Location and Directions\n" +
                    "2.  Opening Hours\n" +
                    "3.  Contact Details\n" +
                    "4.  Menu\n" +
                    "5.  Specials & Deals\n" +
                    "6.  Order Takeaway\n\n" +
                    "Please enter the number for your selection.",
              isMenu: true // Flag as menu response
          },
  
  
          // --- Default Response ---
          "default": { response: "I'm sorry, I didn't understand that. Could you please rephrase your question? Are you interested in our menu, location, hours, directions, or specials?",
                       buttons: [
                          { text: "Menu", action: "menu" },
                          { text: "Location", action: "location" },
                          { text: "Hours", action: "openingHours" },
                          { text: "Directions", action: "directions" },
                          { text: "Specials", action: "specials" },
                          { text: "Contact", action: "contact" }
                          ]}
          };
  
        // --- Chatbot Logic (Part 2: Event Listener for Send Button) ---
        chatbotSendButton.addEventListener('click', function() {
            const userInput = chatbotInput.value;
            if (userInput) {
                // --- User Message Display ---
                let userMessageDiv = document.createElement("div");
                userMessageDiv.className = "chat-message user-message";
                userMessageDiv.innerHTML = `<p>${userInput}</p>`;
                chatbotOutput.appendChild(userMessageDiv);
                chatbotInput.value = ''; // Clear input field after sending
  
                // --- Get and Display Bot Response ---
                const botResponse = getBotResponse(userInput);
                let botMessageDiv = document.createElement("div");
                botMessageDiv.className = "chat-message bot-message";
                botMessageDiv.innerHTML = `<p>${botResponse}</p>`;
                chatbotOutput.appendChild(botMessageDiv);
  
                // --- Scroll to Bottom of Chat Output ---
                chatbotOutput.scrollTop = chatbotOutput.scrollHeight;
            }
        });
  });
  
  function getBotResponse(userInput) {
    const normalizedInput = userInput.toLowerCase().trim();
  
    // --- Check for Menu Requests (NEW - Menu Logic) ---
    if (normalizedInput === "menu" || normalizedInput === "help" || normalizedInput === "services" || normalizedInput === "options") {
        return chatbotResponses["menu"].response; // Or "help", "services", "options" - they all have the same menu response now
    }
  
    // --- Check for Number Selections (Menu Options) (NEW - Menu Logic) ---
    const number = parseInt(normalizedInput); // Try to parse the input as a number
    if (!isNaN(number) && number >= 1 && number <= 6) { // Check if it's a number between 1 and 6 (adjust range if your menu changes)
        return handleMenuSelection(number); // Call a new function to handle menu selections
    }
  
  
    // --- Existing Keyword Matching Logic (for direct questions) ---
    if (chatbotResponses.hasOwnProperty(normalizedInput)) {
        return chatbotResponses[normalizedInput].response;
    } else {
        return chatbotResponses["default"].response;
    }
  }
  
  function handleMenuSelection(selectionNumber) {
    switch (selectionNumber) {
        case 1:
            return chatbotResponses["location"].response; // Option 1: Location/Directions
        case 2:
            return chatbotResponses["opening hours"].response; // Option 2: Opening Hours
        case 3:
            return chatbotResponses["contact details"].response; // Option 3: Contact Info
        case 4:
            return chatbotResponses["menu"].response; // Option 4: View Menu (You might want to refine this to be more specific menu info)
        case 5:
            return chatbotResponses["specials"].response; // Option 5: Specials
        case 6:
            return chatbotResponses["order now"].response; // Option 6: Order Takeaway
        default:
            return chatbotResponses["default"].response; // Default if number is out of range (though the `if` in `getBotResponse` should prevent this)
    }
  }