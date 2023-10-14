document.addEventListener('DOMContentLoaded', () => {
    // Declare and initialize canvas and its context
    const canvas = document.getElementById('sparkles');
    const ctx = canvas.getContext('2d');

    class Sparkle {
        constructor() {
            this.reset();
        }
    
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * 3 + 2;
            this.speed = Math.random() * 3 + 2;
            this.opacity = Math.random() * 0.5 + 0.5;
        
            // console.log(`Resetting sparkle to: x=${this.x}, y=${this.y}, size=${this.size}, opacity=${this.opacity}`);
        }

        update() {
            this.y += this.speed;

            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    const sparkles = [];
    for (let i = 0; i < 100; i++) {
        sparkles.push(new Sparkle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const sparkle of sparkles) {
            sparkle.update();
            sparkle.draw();
        }

        requestAnimationFrame(animate);
    }

    // console.log(`Updating sparkle at (${this.x}, ${this.y}) with size ${this.size} and opacity ${this.opacity}`);

    
    animate();
});
