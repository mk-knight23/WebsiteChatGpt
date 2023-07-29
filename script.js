// // Signup form submission
// const signupForm = document.getElementById("signup-form");
// const signupMessage = document.getElementById("signup-message");

// signupForm.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const username = event.target.username.value;
//   const email = event.target.email.value;
//   const password = event.target.password.value;

//   // Add your signup validation logic here
//   if (username.trim() === "" || email.trim() === "" || password.trim() === "") {
//     signupMessage.textContent = "Please fill in all fields.";
//     return;
//   }

//   // Simulate successful signup (you'll need server-side code to handle actual sign-ups)
//   signupMessage.textContent = `Signup successful! Welcome, ${username}!`;
//   signupForm.reset();
// });

// // Login form submission
// const loginForm = document.getElementById("login-form");
// const loginMessage = document.getElementById("login-message");

// loginForm.addEventListener("submit", function (event) {
//   event.preventDefault();

//   const username = event.target.username.value;
//   const password = event.target.password.value;

//   // Add your login validation logic here
//   if (username.trim() === "" || password.trim() === "") {
//     loginMessage.textContent = "Please fill in all fields.";
//     return;
//   }

//   // Simulate successful login (you'll need server-side code to handle actual logins)
//   loginMessage.textContent = `Welcome back, ${username}!`;
//   loginForm.reset();
// });



// // Array of random jokes
// const jokes = [
//     "Why don't scientists trust atoms? Because they make up everything!",
//     "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
//     "Why don't some couples go to the gym? Because some relationships don't work out.",
//     "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
//     "I used to play piano by ear, but now I use my hands.",
//     "How do you organize a space party? You planet.",
    
//     "Parallel lines have so much in common. It's a shame they'll never meet.",
//     "What did one ocean say to the other ocean? Nothing, they just waved.",
//     "अध्यापक: तुम बड़े होकर क्या बनोगे? \n छात्र: जवानी, अब बोलो सच्ची बात? \n अध्यापक: मृत्यु।",
//   "संजय: गुरु जी, मुझे एक सवाल पूछना था। \n गुरु: हां, पूछो। \n संजय: पृथ्वी बहुत गर्म है क्या? \n गुरु: जी नहीं। \n संजय: फिर तो ठीक है, मेरे जूते फट गए हैं।",
//   "प्रोफेसर: बताओ न्यूटन का दूसरा नियम। \n छात्र: गुरुजी, पहला नियम तो आपने बता ही दिया है।",
//   "दोस्त: यार, तुम्हारे घर में क्या सबसे ज्यादा चीजें हैं? \n मैंने तो देखा है, तुम्हारे घर में तो कटोरी ही कटोरी हैं। \n मित्र: तू बड़ा बेवकूफ है, कटोरियों को रखने के लिए ही तो कटोरी चाहिए ना।"
//   ];
  
//   // Function to generate a random joke
//   function generateRandomJoke() {
//     const jokeIndex = Math.floor(Math.random() * jokes.length);
//     return jokes[jokeIndex];
//   }
  
//   // Event listener for the joke button
//   const jokeButton = document.getElementById("jokeButton");
//   jokeButton.addEventListener("click", function () {
//     const jokeDisplay = document.getElementById("jokeDisplay");
//     jokeDisplay.textContent = generateRandomJoke();
//   });
  

//   // Function to display current time and date
// function displayTimeAndDate() {
//     const currentDate = new Date();
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
//     const formattedDate = currentDate.toLocaleDateString('en-US', options);
//     const timeDisplay = document.getElementById("timeDisplay");
//     timeDisplay.textContent = formattedDate;
//   }
  
//   // Event listener for the time button
//   const timeButton = document.getElementById("timeButton");
//   timeButton.addEventListener("click", displayTimeAndDate);
  
// Function to display current time and date
function displayTimeAndDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const display = document.getElementById("display");
    display.textContent = formattedDate;
  }
  
  // Function to generate a random joke
  function generateRandomJoke() {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "I told my wife she was drawing her eyebrows too high. She seemed surprised.",
      "Why don't some couples go to the gym? Because some relationships don't work out.",
      "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.",
      "I used to play piano by ear, but now I use my hands.",
      "How do you organize a space party? You planet.",
      "Parallel lines have so much in common. It's a shame they'll never meet.",
      "What did one ocean say to the other ocean? Nothing, they just waved."
    ];
    const jokeIndex = Math.floor(Math.random() * jokes.length);
    return jokes[jokeIndex];
  }
  
  // Event listener for the time button
  const timeButton = document.getElementById("timeButton");
  timeButton.addEventListener("click", displayTimeAndDate);
  
  // Event listener for the joke button
  const jokeButton = document.getElementById("jokeButton");
  jokeButton.addEventListener("click", function () {
    const display = document.getElementById("display");
    display.textContent = generateRandomJoke();
  });
  