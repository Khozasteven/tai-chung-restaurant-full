// landing.js - UPDATED DEBUG VERSION - Popup on load, HIDE on click

// Declare chatbot elements in the global scope
let chatbotInput;
let chatbotOutput;
let chatbotSendButton;

// Declare chatbotResponses object in the global scope
const chatbotResponses = {
    // --- Professional Greeting ---
    "hello": { response: "Greetings! Welcome to Tai Chung Takeaway. How may I assist you today? Type 'menu' or 'help' to see available options." },
    "hi": { response: "Welcome to Tai Chung Takeaway. To see available options, please type 'menu' or 'help'." },
    "good day": { response: "Good day and welcome to Tai Chung Takeaway. For assistance, type 'menu' or 'help'." },
    "start": {   // "start" keyword now also gives the greeting
        response: "Welcome to Tai Chung Takeaway.  Explore our menu by typing 'menu' or get help by typing 'help'."
    },


    // --- Professionally Formatted Main Menu ---
    "menu": {
        response: "Our Takeaway Menu Options:<br><br>" +
                  "<ol style='list-style-type: decimal;'>" + // Using ordered list for numbered menu
                      "<li><strong>Restaurant Location and Directions</strong></li>" +
                      "<li><strong>Opening Hours</strong></li>" +
                      "<li><strong>Contact Information (Phone/Email)</strong></li>" +
                      "<li><strong>View Menu</strong></li>" +
                      "<li><strong>Current Specials and Promotions</strong></li>" +
                      "<li><strong>Place a Takeaway Order (Call Us)</strong></li>" +
                  "</ol><br>" +
                  "Type the **number** of your choice to get more information.",
        isMenu: true // Flag as menu response
    },
    "help": {   // "help" also shows the professional menu
        response: "Need assistance? Choose an option from our menu below by typing the **number**:\n\n" +
                  "<ol style='list-style-type: decimal;'>" + // Using ordered list for numbered menu
                      "<li><strong>Restaurant Location and Directions</strong></li>" +
                      "<li><strong>Opening Hours</strong></li>" +
                      "<li><strong>Contact Information (Phone/Email)</strong></li>" +
                      "<li><strong>View Menu</strong></li>" +
                      "<li><strong>Current Specials and Promotions</strong></li>" +
                      "<li><strong>Place a Takeaway Order (Call Us)</strong></li>" +
                  "</ol><br>" +
                  "Enter the **number** of your choice.",
        isMenu: true // Flag as menu response
    },
    "default": { response: "Sorry, I didn't understand that. Please type 'menu' or 'help' to see the options." }, // Updated default message


    // --- Menu Option Responses with "Back to Menu" Button - CORRECTED ONCLICK TO SHOW MENU ---
    "1": { response: "We are located at 13 Belgravia Road, Athlone, Cape Town, 7764.  You can find us on Google Maps here: <a href='https://maps.google.com/?cid=16465516923669384562' target='_blank'>Tai Chung Restaurant on Google Maps</a>.  Would you like me to show you directions from your current location? <br><br> <button class='menu-button' onclick='appendMenuResponse()'>Back to Menu</button>" }, // Option 1: Location - Corrected button
    "2": { response: "Our opening hours are: Monday 2:00-9:00 PM, Tuesday to Thursday 12:00-9:00 PM, Friday and Saturday 12:00-10:00 PM. We are closed on Sundays. <br><br> <button class='menu-button' onclick='appendMenuResponse()'>Back to Menu</button>" }, // Option 2: Opening Hours - Corrected button
    "3": { response: "You can contact us by phone at +27 21 696 4870 or by email at tai213690@gmail.com. <br><br> <button class='menu-button' onclick='appendMenuResponse()'>Back to Menu</button>" }, // Option 3: Contact - Corrected button
    "4": { response: "You can view our menu on our website's Menu page [Link to Menu Page in Header of your Landing Page]. We have a wide variety of dishes! <br><br> <button class='menu-button' onclick='appendMenuResponse()'>Back to Menu</button>" }, // Option 4: Menu - Corrected button
    "5": { response: "We currently have a special offer: 10% off on all online orders this week! <span class='chinese-phrase'>本周所有在线订单均可享受 10% 的折扣！</span> <br><br> <button class='menu-button' onclick='appendMenuResponse()'>Back to Menu</button>" }, // Option 5: Specials - Corrected button
    "6": { response: "Please call us at +27 21 696 4870 to place your takeaway order.  Our full menu is available online [Link to Menu Page] for your convenience.  <br><br> <button class='menu-button' onclick='appendMenuResponse()'>Back to Menu</button>" }   // Option 6: Order - Corrected button
};
// --- End of Menu-Based chatbotResponses Object (Part 2 End) ---


document.addEventListener('DOMContentLoaded', function() {
    console.log('landing.js file is loaded and running!'); // 1. Log when JS file loads

    // --- Chatbot Logic (Part 1: Variable Declarations) ---
    chatbotInput = document.getElementById('chatbot-input'); // Assign elements to global variables
    chatbotOutput = document.getElementById('chatbot-output');
    chatbotSendButton = document.getElementById('chatbot-send-button');

    // --- Chatbot Icon Toggle and Popup Message Functionality (UPDATED VERSION - Popup on load, HIDE on click) ---
    const chatbotElement = document.getElementById('chatbot');
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotPopupMessage = document.getElementById('chatbot-popup-message');


    // Initially hide the chatbot
    chatbotElement.style.display = 'none';

    // --- Show popup message initially after a short delay (on page load) ---
    setTimeout(function() {
        console.log('Initial popup display - setTimeout function is executing'); // Log initial popup display
        chatbotPopupMessage.style.display = 'block';
        setTimeout(function() {
            chatbotPopupMessage.style.display = 'none'; // Hide popup after 3 seconds
            console.log('Initial popup hide - setTimeout function is executing'); // Log initial popup hide
        }, 3000);
    }, 2000); // Show initial popup after 2 seconds (adjust delay as needed)


    // Event listener for chatbot icon click - HIDE Popup on click
    chatbotIcon.addEventListener('click', function() {
        console.log('Chatbot icon was clicked!'); // Log icon click

        // HIDE popup message on icon click
        console.log('Hiding popup on icon click'); // Log before hiding popup on click
        chatbotPopupMessage.style.display = 'none';  // *** Changed to 'none' to hide popup on click ***


        // --- Existing code to toggle chatbot visibility (keep this part) ---
        console.log('Toggling chatbot visibility...'); // Log before toggling chatbot
        if (chatbotElement.style.display === 'none') {
            chatbotElement.style.display = 'flex';
            chatbotIcon.classList.add('chatbot-open');
            console.log('Chatbot was hidden, now showing and adding chatbot-open class to icon'); // Log if chatbot was hidden
        } else {
            chatbotElement.style.display = 'none';
            chatbotIcon.classList.remove('chatbot-open');
            console.log('Chatbot was visible, now hiding and removing chatbot-open class from icon'); // Log if chatbot was visible
        }
        console.log('Chatbot visibility toggling code finished.'); // Log after toggling chatbot
    });


    // --- Initial Greeting Message (Part 8 - Greeting on page load) ---
    setTimeout(function() {
        const greetingResponse = getBotResponse('hello'); // Get the greeting response
        appendMessage(greetingResponse, false); // Append greeting to chatbot output
    }, 1000); // Delay greeting by 1 second (adjust as needed)


});

// --- appendMessage Function (Part 5) ---
function appendMessage(message, isUser) {
    let messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "chat-message user-message" : "chat-message bot-message";
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotOutput.appendChild(messageDiv);
    chatbotOutput.scrollTop = chatbotOutput.scrollHeight;
}
// --- End of appendMessage Function (Part 5 End) ---

// --- New appendMenuResponse Function ---
function appendMenuResponse() {
    const menuResponse = getBotResponse('menu'); // Get the menu response
    appendMessage(menuResponse, false); // Append the menu response as bot message
}
// --- End of appendMenuResponse Function ---

// --- Updated getBotResponse Function (Part 3) ---
function getBotResponse(userInput) {
    const normalizedInput = userInput.toLowerCase().trim();

    // --- Check for Menu Triggers: "menu", "help", "start", "options", "services" ---
    if (normalizedInput === "menu" || normalizedInput === "help" || normalizedInput === "start" || normalizedInput === "options" || normalizedInput === "services") {
        return chatbotResponses["menu"].response; // Return the main menu
    }

    // --- Check for Number Selections (Menu Options) ---
    const number = parseInt(normalizedInput);
    if (!isNaN(number) && number >= 1 && number <= 6) {
        return handleMenuSelection(number); // Handle menu option selection
    }

    // --- Greeting Keywords ---
    if (normalizedInput === "hello" || normalizedInput === "hi" || normalizedInput === "good day" || normalizedInput === "start") {
        return chatbotResponses[normalizedInput].response; // Return greeting
    }


    // --- Default Response for anything else ---
    return chatbotResponses["default"].response; // Default response if no match
}
// --- End of Updated getBotResponse Function (Part 3 End) ---


// --- New handleMenuSelection Function (Part 4) ---
function handleMenuSelection(selectionNumber) {
    switch (selectionNumber) {
        case 1:
            return chatbotResponses["1"].response; // Option 1: Location/Directions
        case 2:
            return chatbotResponses["2"].response; // Option 2: Opening Hours
        case 3:
            return chatbotResponses["3"].response; // Option 3: Contact Info
        case 4:
            return chatbotResponses["4"].response; // Option 4: View Menu
        case 5:
            return chatbotResponses["5"].response; // Option 5: Specials
        case 6:
            return chatbotResponses["6"].response; // Option 6: Order Takeaway
        default:
            return chatbotResponses["default"].response; // Default if number is out of range
    }
}
// --- End of handleMenuSelection Function (Part 4 End) ---