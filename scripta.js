const chatContainer = document.getElementById("chat-container");
       const toggleBtn = document.getElementById("chat-toggle-btn");
       const closeBtn = document.getElementById("close-btn");
       const minimizeBtn = document.getElementById("minimize-btn");
       const chatBody = document.getElementById("chat-body");
       const userInput = document.getElementById("user-input");
       const sendBtn = document.getElementById("send-btn");

       // Levenshtein Distance function to calculate similarity
       function getLevenshteinDistance(a, b) {
           const tmp = [];
           let i, j, alen = a.length, blen = b.length, res;
           for (i = 0; i <= alen; i++) {
               tmp[i] = [i];
           }
           for (j = 0; j <= blen; j++) {
               tmp[0][j] = j;
           }
           for (i = 1; i <= alen; i++) {
               for (j = 1; j <= blen; j++) {
                   res = a[i - 1] === b[j - 1] ? 0 : 1;
                   tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + res);
               }
           }
           return tmp[alen][blen];
       }

       // Fuzzy match function to find the closest match
       function fuzzyMatch(query, responses) {
           let minDistance = Infinity;
           let bestMatch = "default"; // default fallback in case no close match is found

           for (let key in responses) {
               if (responses.hasOwnProperty(key)) {
                   let distance = getLevenshteinDistance(query.toLowerCase(), key.toLowerCase());
                   if (distance < minDistance) {
                       minDistance = distance;
                       bestMatch = key;
                   }
               }
           }

           return bestMatch;
       }

       const responses = {
           "hi": "Hello there! How could I help you?",
           "hello": "Hi there! How could I assist you?",
           "what is your name?": "I am your friendly FAQ chatbot.",
           "how does this work?": "Simply type your question and I will do my best to answer.",
           "bye": "Goodbye! Have a great day!",

           "default": "I'm sorry, I don't understand that. Please try a different question."
       };

       // Toggle chat visibility
       toggleBtn.addEventListener("click", () => {
           chatContainer.classList.toggle("hidden");
       });

       // Close chat
       closeBtn.addEventListener("click", () => {
           chatContainer.classList.add("hidden");
       });

       // Minimize chat
       let isMinimized = false;
       minimizeBtn.addEventListener("click", () => {
           if (isMinimized) {
               chatContainer.style.height = "500px";
               chatBody.style.display = "block";
               isMinimized = false;
           } else {
               chatContainer.style.height = "50px";
               chatBody.style.display = "none";
               isMinimized = true;
           }
       });

       // Display message with typing effect
       function displayMessage(message, sender = "bot") {
           const messageContainer = document.createElement("div");
           messageContainer.classList.add("message", sender);

           const textElement = document.createElement("div");
           textElement.classList.add("text");

           messageContainer.appendChild(textElement);
           chatBody.appendChild(messageContainer);

           chatBody.scrollTop = chatBody.scrollHeight;

           if (sender === "bot") {
               typeMessage(textElement, message);
           } else {
               textElement.textContent = message;
           }
       }

       // Typing effect function
       function typeMessage(element, message) {
           let index = 0;
           const typingSpeed = 50; // milliseconds per character

           // Create and append the blinking emoji
           const emojiElement = document.createElement("span");
           emojiElement.textContent = "🤖";
           emojiElement.classList.add("typing-emoji");
           element.appendChild(emojiElement);

           function typeNextChar() {
               if (index < message.length) {
                   element.textContent += message.charAt(index);
                   index++;
                   setTimeout(typeNextChar, typingSpeed);
               } else {
                   // Remove the blinking emoji after typing is complete
                   emojiElement.remove();
               }
           }

           typeNextChar();
       }

       // Handle input
       function handleInput() {
           const userMessage = userInput.value.trim();
           if (!userMessage) return;

           displayMessage(userMessage, "user");

           const matchedQuestion = fuzzyMatch(userMessage, responses);
           const botResponse = responses[matchedQuestion];

           displayMessage(botResponse, "bot");

           userInput.value = "";
       }

       sendBtn.addEventListener("click", handleInput);

       userInput.addEventListener("keypress", (e) => {
           if (e.key === "Enter") handleInput();
       });