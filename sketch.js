	// Initialize particles array and constants
	const particles = [];
	const numParticles = 100;
	const mouseRadius = 100;
	let animationContainer;
	// Define the Particle class
	class Particle {
	 constructor(x, y) {
	   this.x = x;
	   this.y = y;
	   this.radius = random(1, 4);
	   this.speedX = random(-1, 1);
	   this.speedY = random(-1, 1);
	   this.color = this.getRandomColor();
	 }
	 // Generate a random color with some transparency
	 getRandomColor() {
	   const r = floor(random(256));
	   const g = floor(random(256));
	   const b = floor(random(256));
	   return color(r, g, b, 50);
	 }
	 // Move the particle and reverse direction if it hits the wall or mouse
	 move() {
	   if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
	   if (this.y < 0 || this.y > height) this.speedY = -this.speedY;
	   this.x += this.speedX;
	   this.y += this.speedY;
	   const dx = this.x - mouseX;
	   const dy = this.y - mouseY;
	   const distance = sqrt(dx * dx + dy * dy);
	   if (distance < mouseRadius) {
	     this.speedX = -this.speedX;
	     this.speedY = -this.speedY;
	   }
	 }
	 // Draw the particle
	 draw() {
	   fill(this.color);
	   noStroke();
	   circle(this.x, this.y, this.radius * 5.7);
	 }
	}
	// Setup function to initialize the canvas and particles
	function setup() {
	 animationContainer = select('#animation-container');
	 const canvas = createCanvas(animationContainer.width, animationContainer.height);
	 canvas.parent(animationContainer);
	 for (let i = 0; i < numParticles; i++) {
	   const x = random(width);
	   const y = random(height);
	   particles.push(new Particle(x, y));
	 }
	}
	// Draw function to update and render particles
	function draw() {
	 clear(); // Use clear() to keep the background transparent
	 particles.forEach(particle => {
	   particle.move();
	   particle.draw();
	 });
	 connectParticles();
	}
	// Function to connect nearby particles with lines
	function connectParticles() {
	 for (let i = 0; i < particles.length; i++) {
	   for (let j = i + 1; j < particles.length; j++) {
	     const dx = particles[i].x - particles[j].x;
	     const dy = particles[i].y - particles[j].y;
	     const distance = sqrt(dx * dx + dy * dy);
	     if (distance < 100) {
	       stroke('rgba(255, 255, 255, 0.25)');
	       line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
	     }
	   }
	 }
	}
	// Handle window resize
	function windowResized() {
	 resizeCanvas(animationContainer.width, animationContainer.height);
	}