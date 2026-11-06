document.addEventListener('DOMContentLoaded', () => {
    // 1. Canvas Estelar Animado
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initStars();
    });

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2;
            this.alpha = Math.random();
            this.speed = Math.random() * 0.02 + 0.005;
        }

        update() {
            this.alpha += this.speed;
            if (this.alpha > 1 || this.alpha < 0) {
                this.speed = -this.speed;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha)})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            if (this.size > 1.5) {
                ctx.fillStyle = `rgba(230, 180, 50, ${Math.abs(this.alpha) * 0.5})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    let stars = [];
    function initStars() {
        stars = [];
        const count = Math.floor((width * height) / 3000);
        for (let i = 0; i < count; i++) {
            stars.push(new Star());
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }

    initStars();
    animateStars();

    // 2. Conteo Regresivo Dinámico (30 Días)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});
