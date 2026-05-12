// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Slight delay for the outline for a smooth effect
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effect for links and buttons to expand cursor
const interactables = document.querySelectorAll('a, .btn, .skill-card, .project-item');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
    });
});


// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero animations
const tl = gsap.timeline();
tl.from('.navbar', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' })
  .from('.hero-image', { x: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
  .from('.fade-up', { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.5')
  .from('.glitch-text', { scale: 0.9, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.3)' }, '-=1');

// Section Headings Animation
gsap.utils.toArray('.section-heading').forEach(heading => {
    const line = heading.querySelector('.heading-line');
    const title = heading.querySelector('.title-anim');
    
    const hTl = gsap.timeline({
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
        }
    });

    hTl.from(title, { y: 20, opacity: 0, duration: 0.6 })
       .to(line, { width: '100px', duration: 0.6, ease: 'power2.out' }, '-=0.3');
});

// Scroll Fade Animations inside sections
gsap.utils.toArray('.scroll-fade').forEach(elem => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});


// Particles Canvas Background Animation
const canvas = document.getElementById('canvas-particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = '#ffffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animateParticles();

// Initialize VanillaTilt for cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".skill-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
    
    VanillaTilt.init(document.querySelectorAll(".project-item"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}
