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

const bgMusic = document.getElementById("bgMusic");

const bgMusic2 = document.getElementById("bgMusic2");

const MUSIC_VOLUME = 0.18;


/* =====================================================
   FADE IN / FADE OUT (genérico)
===================================================== */

function fadeInAudio(audio, targetVolume = MUSIC_VOLUME, duration = 1800) {

    if (!audio) return;

    // Evita reiniciar si ya está sonando
    if (!audio.paused) return;

    audio.volume = 0;

    audio.play().catch(err => {

        console.log("No fue posible iniciar el audio:", err);

    });

    const steps = 40;

    const stepTime = duration / steps;

    const stepAmount = targetVolume / steps;

    let volume = 0;

    const fade = setInterval(() => {

        volume += stepAmount;

        if (volume >= targetVolume) {

            volume = targetVolume;

            clearInterval(fade);

        }

        audio.volume = volume;

    }, stepTime);

}


function fadeOutAudio(audio, duration = 1200, onComplete) {

    if (!audio) return;

    if (audio.paused) {

        if (onComplete) onComplete();

        return;

    }

    const steps = 30;

    const stepTime = duration / steps;

    const startVolume = audio.volume;

    let step = 0;

    const fade = setInterval(() => {

        step++;

        const newVolume = startVolume * (1 - step / steps);

        audio.volume = Math.max(newVolume, 0);

        if (step >= steps) {

            clearInterval(fade);

            audio.pause();

            audio.currentTime = 0;

            audio.volume = 0;

            if (onComplete) onComplete();

        }

    }, stepTime);

}


/* =====================================================
   PISTA 1 — background.mp3
   (Hero -> hasta que aparece "Otra flor")
===================================================== */

function startMusic() {

    fadeInAudio(bgMusic);

}

function stopMusic(onComplete) {

    fadeOutAudio(bgMusic, 1200, onComplete);

}


/* =====================================================
   PISTA 2 — background2.mp3
   (Al dar clic en "Otra flor" -> hasta "Volver a empezar")
===================================================== */

function startMusic2() {

    fadeInAudio(bgMusic2);

}

function stopMusic2(onComplete) {

    fadeOutAudio(bgMusic2, 1200, onComplete);

}


/* =====================================================
   CONTROL DE MÚSICA EN SEGUNDO PLANO
===================================================== */

let musicWasPlaying = false;

let music2WasPlaying = false;

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        // Guardamos cuál pista estaba sonando
        musicWasPlaying = bgMusic ? !bgMusic.paused : false;

        music2WasPlaying = bgMusic2 ? !bgMusic2.paused : false;

        if (musicWasPlaying) bgMusic.pause();

        if (music2WasPlaying) bgMusic2.pause();

        return;

    }

    // Al regresar, reanudar únicamente la que sonaba
    if (musicWasPlaying) {

        bgMusic.play().catch(err => {

            console.log("No fue posible reanudar la música:", err);

        });

        musicWasPlaying = false;

    }

    if (music2WasPlaying) {

        bgMusic2.play().catch(err => {

            console.log("No fue posible reanudar la música:", err);

        });

        music2WasPlaying = false;

    }

});



/* =====================================================
   UTILIDAD
===================================================== */

function random(min, max) {

    return Math.random() * (max - min) + min;

}


/* =====================================================
   PARTÍCULAS
===================================================== */

const particlesContainer =
    document.getElementById("particles");

const PARTICLES = 25;


for (let i = 0; i < PARTICLES; i++) {

    const particle =
        document.createElement("div");

    particle.className = "sparkle";

    const size = random(2, 6);

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    particle.style.left =
        random(0, 100) + "vw";

    particle.style.top =
        random(0, 100) + "vh";

    particle.style.opacity =
        random(0.15, 0.45);


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


    particlesContainer.appendChild(
        particle
    );

}


/* =====================================================
   PÉTALOS
===================================================== */

const petalsContainer =
    document.getElementById("petals");

const petals = [];

const PETAL_COUNT = 12;


function createPetal() {

    const el =
        document.createElement("div");

    el.className = "petal";

    petalsContainer.appendChild(el);


    const petal = {

        el,


        reset() {

            this.x =
                random(
                    0,
                    window.innerWidth
                );

            this.y =
                random(
                    -window.innerHeight,
                    -80
                );

            this.speed =
                random(0.8, 1.8);

            this.wind =
                random(0.2, 0.9);

            this.rotation =
                random(-1.5, 1.5);

            this.angle =
                random(0, 360);

            this.swing =
                random(
                    0,
                    Math.PI * 2
                );

            this.swingSpeed =
                random(
                    0.01,
                    0.025
                );

            this.size =
                random(14, 24);


            this.el.style.width =
                this.size + "px";

            this.el.style.height =
                (this.size * 1.45) + "px";

        }

    };


    petal.reset();

    petals.push(petal);

}


for (
    let i = 0;
    i < PETAL_COUNT;
    i++
) {

    createPetal();

}


/* =====================================================
   ANIMACIÓN
===================================================== */

function animate() {

    petals.forEach(p => {

        p.y += p.speed;

        p.swing += p.swingSpeed;

        p.x +=
            Math.sin(p.swing) *
            p.wind;

        p.angle +=
            p.rotation;


        p.el.style.transform =
            `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)`;


        if (
            p.y >
            window.innerHeight + 80
        ) {

            p.reset();

        }

    });


    requestAnimationFrame(
        animate
    );

}


animate();


/* =====================================================
   RESPONSIVE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        petals.forEach(p => {

            if (
                p.x >
                window.innerWidth
            ) {

                p.x =
                    window.innerWidth - 40;

            }

        });

    }
);