document.addEventListener("scroll", () => {
  document.body.style.overflowY = "auto"; // Ensure the scrollbar is visible when scrolling
});

// Contact Form Submission
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
});

// Skill Levels for Progress Bars (in percentage)
const skillLevels = {
    html: 98,
    css: 97,
    js: 95,
    react:85,
    bootstrap:80,
    angular:85,
    vue:82,
    wordpress:98,
    woocommerce:93,
    python:96,
    php:91,
    db:92,
    others:50,
    // You can add more skills here with percentages
};

// Function to animate progress bars when they are in view
function animateProgressBars(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skill = entry.target;
            const bar = skill.querySelector('.bar');
            const skillName = skill.id.toLowerCase();  // Use the id of the skill as the name

            // Set the width of the progress bar based on skill level
            bar.style.width = skillLevels[skillName] + '%';

            // Stop observing once the animation is complete
            observer.unobserve(entry.target);
        }
    });
}

// Create IntersectionObserver instance
const observer = new IntersectionObserver(animateProgressBars, {
    threshold: 0.5 // Trigger when 50% of the element is in view
});

// Select all skill elements to observe
const skills = document.querySelectorAll('.skill');
skills.forEach(skill => observer.observe(skill));
// Dynamic Form Submission with Fetch API
document.getElementById('dynamicContactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Thank you for your message!');
        form.reset();
      } else {
        response.json().then(data => {
          alert(data.error || 'Oops! There was a problem submitting your form.');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Oops! Something went wrong. Please try again later.');
    });
  });
  // Newsletter Subscribe Form Submission
  const subscribeForm = document.querySelector(".footer-newsletter form");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = subscribeForm.querySelector("input[type='email']");
      if (emailInput && emailInput.value.trim() !== "") {
        animateThankYouMessage("Thank you for subscribing!");
        subscribeForm.reset();
      } else {
        alert("Please enter a valid email address.");
      }
    });
  }
  // Contact Form Submission
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      if (name && email && message) {
        animateThankYouMessage("Thank you for submitting the form!");
        contactForm.reset();
      } else {
        alert("Please fill out all required fields.");
      }
    });
  }
  //--bg color randomly selected--//
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b},${a})`;
  }
  
  function updateGradient() {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    const color4 = getRandomColor();
    const angle = Math.floor(Math.random() * 360); // Random angle for the gradient
  
    document.body.style.backgroundImage = `linear-gradient(${angle}deg, ${color1}, ${color2},${color3},${color4})`;
  }
  
  // Update gradient every 5 seconds
  setInterval(updateGradient, 5000);

  document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'x' || event.key === 'v')) {
      event.preventDefault();
    }
   });
   
   // Disable right-click context menu to prevent copying
   document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
   });
   
   // Disable text selection
   document.addEventListener('selectstart', function(event) {
    event.preventDefault();
   });
   
   // Disable drag and drop to prevent image saving
   document.addEventListener('dragstart', function(event) {
    event.preventDefault();
   });
   
   // Disable copying via clipboard API
   document.addEventListener('copy', function(event) {
    event.preventDefault();
   });
   document.addEventListener('cut', function(event) {
    event.preventDefault();
   });
   document.addEventListener('paste', function(event) {
    event.preventDefault();
   });
   
   // Disable saving images by dragging them to the desktop
   document.addEventListener('mousedown', function(event) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
    }
   });
   
   // Disable saving images by right-clicking and selecting "Save image as"
   document.addEventListener('contextmenu', function(event) {
    if (event.target.tagName === 'IMG') {
      event.preventDefault();
    }
   });
   
   // Disable viewing source code (not foolproof)
   window.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'u') {
      event.preventDefault();
    }
   });
   // Disable viewing source code (not foolproof)
   window.addEventListener('keydown', function(event) {
     if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
       event.preventDefault();
     }
    });
   
   //--fromspee from submission //
   
