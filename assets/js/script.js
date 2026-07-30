/* =====================================================
   UNA PEQUEÑA HISTORIA
   SCRIPT PRINCIPAL
===================================================== */

const engine = new StoryEngine("scene-container");

/* =====================================================
   INICIAR APLICACIÓN
===================================================== */

engine.start();

/* =====================================================
   MÚSICA
===================================================== */

document.getElementById("bgMusic").play()
function startMusic() {

    console.log("startMusic ejecutado");

    if (!bgMusic) return;

    // Evita iniciar la música varias veces
    if (!bgMusic.paused) return;

    bgMusic.volume = 0;

    bgMusic.play().catch(err => {
        console.log("No fue posible iniciar la música:", err);
    });

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.01;

        if (volume >= 0.18) {

            volume = 0.18;
            clearInterval(fade);

        }

        bgMusic.volume = volume;

    }, 120);

}

/* =====================================================
   UTILIDAD
===================================================== */

function random(min, max) {
    return Math.random() * (max - min) + min;
}

/* =====================================================
   PARTÍCULAS
===================================================== */

const particlesContainer = document.getElementById("particles");

const PARTICLES = 25;

for (let i = 0; i < PARTICLES; i++) {

    const particle = document.createElement("div");

    particle.className = "sparkle";

    const size = random(2, 6);

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = random(0, 100) + "vw";
    particle.style.top = random(0, 100) + "vh";

    particle.style.opacity = random(0.15, 0.45);

    particle.animate(
        [
            {
                transform: "scale(.7)",
                opacity: particle.style.opacity
            },
            {
                transform: "scale(1.4)",
                opacity: 1
            },
            {
                transform: "scale(.7)",
                opacity: particle.style.opacity
            }
        ],
        {
            duration: random(2000, 5000),
            iterations: Infinity,
            delay: random(0, 3000)
        }
    );

    particlesContainer.appendChild(particle);

}

/* =====================================================
   PÉTALOS
===================================================== */

const petalsContainer = document.getElementById("petals");

const petals = [];

const PETAL_COUNT = 12;

function createPetal() {

    const el = document.createElement("div");

    el.className = "petal";

    petalsContainer.appendChild(el);

    const petal = {

        el,

        reset() {

            this.x = random(0, window.innerWidth);

            this.y = random(-window.innerHeight, -80);

            this.speed = random(0.8, 1.8);

            this.wind = random(0.2, 0.9);

            this.rotation = random(-1.5, 1.5);

            this.angle = random(0, 360);

            this.swing = random(0, Math.PI * 2);

            this.swingSpeed = random(0.01, 0.025);

            this.size = random(14, 24);

            this.el.style.width = this.size + "px";
            this.el.style.height = (this.size * 1.45) + "px";

        }

    };

    petal.reset();

    petals.push(petal);

}

for (let i = 0; i < PETAL_COUNT; i++) {

    createPetal();

}

/* =====================================================
   ANIMACIÓN
===================================================== */

function animate() {

    petals.forEach(p => {

        p.y += p.speed;

        p.swing += p.swingSpeed;

        p.x += Math.sin(p.swing) * p.wind;

        p.angle += p.rotation;

        p.el.style.transform =
            `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)`;

        if (p.y > window.innerHeight + 80) {

            p.reset();

        }

    });

    requestAnimationFrame(animate);

}

animate();

/* =====================================================
   RESPONSIVE
===================================================== */

window.addEventListener("resize", () => {

    petals.forEach(p => {

        if (p.x > window.innerWidth) {

            p.x = window.innerWidth - 40;

        }

    });

});

