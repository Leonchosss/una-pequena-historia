/* ==========================================================
   UNA PEQUEÑA HISTORIA
   ENGINE
   v3.1.0
========================================================== */

class StoryEngine {

    constructor(containerId) {

        this.container = document.getElementById(containerId);

        this.currentIndex = 0;

        this.currentScene = null;

    }

    /* ==========================================
       INICIO
    ========================================== */

    start() {

        this.show(0);

    }

    /* ==========================================
       NAVEGACIÓN
    ========================================== */

async show(index){

    if(index < 0) return;

    if(index >= CONFIG.scenes.length) return;

    const oldScene = this.container.querySelector(".scene");

    if(oldScene){

        oldScene.classList.remove("active");

        oldScene.classList.add("leaving");

        await this.wait(450);

    }

    this.currentIndex = index;

    this.currentScene = CONFIG.scenes[index];

    this.render(this.currentScene);

}

    next() {

        this.show(this.currentIndex + 1);

    }

    previous() {

        this.show(this.currentIndex - 1);

    }

    /* ==========================================
       RENDER
    ========================================== */

    render(scene) {

        this.clear();

        if(this.rosesLayer){

            this.rosesLayer.remove();

            this.rosesLayer = null;

        }

        switch(scene.type){

            case "hero":

                this.renderHero(scene);

                break;

            case "text":

                this.renderText(scene);

                break;

            case "photo":

                this.renderPhoto(scene);

                break;

            case "envelope":

                this.renderEnvelope(scene);

                break;

            case "letter":

                this.renderLetter(scene);

                break;

            case "roses":

                this.renderRoses(scene);

                break;

            case "ending":

                this.renderEnding(scene);

                break;

        }

    }

    /* ==========================================
       UTILIDADES
    ========================================== */

    clear() {

        this.container.innerHTML = "";

    }

    createScene() {

        const scene = document.createElement("section");

        scene.className = "scene active";

        return scene;

    }

    createCard() {

        const card = document.createElement("div");

        card.className = "card";

        return card;

    }

    createButton(text, onClick) {

        const button = document.createElement("button");

        button.className = "btn";

        button.textContent = text;

        button.addEventListener("click", () => {

            if(onClick){

                onClick();

            }

            this.next();

        });

        return button;

    }

    createRose() {

        const rose = document.createElement("div");

        rose.className = "rose";

        rose.innerHTML = `

            <img
                src="assets/img/rose.svg"
                alt="Rosa">

        `;

        return rose;

    }

    /* ==========================================
       HERO
    ========================================== */

    renderHero(scene){

        const section = this.createScene();

        const card = this.createCard();

        const rose = this.createRose();

        const title = document.createElement("h1");

        title.textContent = scene.title;

        const subtitle = document.createElement("p");

        subtitle.textContent = scene.subtitle;

        const button = this.createButton(scene.button, startMusic);

        card.appendChild(rose);

        card.appendChild(title);

        card.appendChild(subtitle);

        card.appendChild(button);

        section.appendChild(card);

        this.container.appendChild(section);

    }

    /* ==========================================
       TEXTO
    ========================================== */

    renderText(scene){

        const section = this.createScene();

        const card = this.createCard();

        const title = document.createElement("h2");

        title.textContent = scene.title;

        card.appendChild(title);

        const text = document.createElement("div");

        text.className = "story-text";

        card.appendChild(text);

        section.appendChild(card);

        this.container.appendChild(section);

        this.typeWriter(

            scene.paragraphs,

            text,

            () => {

                card.appendChild(

                    this.createButton(scene.button)

                );

            }

        );

    }

    /* ==========================================
       TYPEWRITER
    ========================================== */

    async typeWriter(paragraphs, container, callback){

        for(const paragraph of paragraphs){

            const p = document.createElement("p");

            container.appendChild(p);

            await this.write(paragraph, p);

            await this.wait(600);

        }

        if(callback){

            callback();

        }

    }

    async write(text, element){

        return new Promise(resolve=>{

            let i = 0;

            const speed = CONFIG.animation.typeSpeed;

            const timer = setInterval(()=>{

                element.textContent += text.charAt(i);

                i++;

                if(i >= text.length){

                    clearInterval(timer);

                    resolve();

                }

            }, speed);

        });

    }

    wait(ms){

        return new Promise(resolve=>{

            setTimeout(resolve, ms);

        });

    }
        /* ==========================================
       FOTO
    ========================================== */

renderPhoto(scene){

    const section = this.createScene();

    const card = document.createElement("div");

    card.className = "memory-card";

    const counter = document.createElement("div");

    counter.className = "memory-counter";

    counter.textContent = `Recuerdo ${this.currentIndex - 1} de 4`;

    const frame = document.createElement("div");

    frame.className = "polaroid";

    const image = document.createElement("img");

    image.className = "photo";

    image.src = scene.image;

    image.alt = "Fotografía";

    image.draggable = false;

    const caption = document.createElement("p");

    caption.className = "photo-caption";

    caption.textContent = scene.caption;

    frame.appendChild(image);

    frame.appendChild(caption);

    const dots = document.createElement("div");

    dots.className = "memory-dots";

    for(let i=0;i<4;i++){

        const dot=document.createElement("span");

        if(i===this.currentIndex-2){

            dot.classList.add("active");

        }

        dots.appendChild(dot);

    }

    const button=this.createButton(scene.button);

    card.appendChild(counter);

    card.appendChild(frame);

    card.appendChild(dots);

    card.appendChild(button);

    section.appendChild(card);

    this.container.appendChild(section);

}


renderEnvelope(scene){

    const section = this.createScene();

    const card = this.createCard();

    const title = document.createElement("h2");

    title.textContent = scene.title;

    const subtitle = document.createElement("p");

    subtitle.textContent = scene.subtitle;

    const envelope = document.createElement("div");

    envelope.className = "envelope";

envelope.innerHTML = `
    <div class="envelope-back"></div>

    <div class="envelope-pocket">

        <div class="envelope-front"></div>

    </div>

    <div class="envelope-flap">
        <div class="wax-seal"></div>
    </div>

    <div class="envelope-letter"></div>
`;

    envelope.addEventListener("click",()=>{

    envelope.classList.add("open");

    const letter = envelope.querySelector(".envelope-letter");

    setTimeout(()=>{

        letter.classList.add("expand");

    },1700);

    setTimeout(()=>{

        this.next();

    },2700);

});

    card.appendChild(title);

    card.appendChild(subtitle);

    card.appendChild(envelope);

    section.appendChild(card);

    this.container.appendChild(section);

}

    /* ==========================================
       CARTA
    ========================================== */

    renderLetter(scene){

        const section = this.createScene();

        const paper = document.createElement("div");

        paper.className = "letter";

        const title = document.createElement("h2");

        title.textContent = scene.title;

        paper.appendChild(title);

        const content = document.createElement("div");

        content.className = "letter-content";

        paper.appendChild(content);

        section.appendChild(paper);

        this.container.appendChild(section);

        this.typeLetter(

            scene.content.trim(),

            content,

            () => {

                stopMusic();

                paper.appendChild(

                    this.createButton(scene.button, startMusic2)

                );

            }

        );

    }

    /* ==========================================
       TYPE LETTER
    ========================================== */

    async typeLetter(text, container, callback){

        return new Promise(resolve=>{

            let i = 0;

            const speed = CONFIG.animation.typeSpeed;

            const timer = setInterval(()=>{

                const char = text.charAt(i);

                if(char === "\n"){

                    container.innerHTML += "<br>";

                }else{

                    container.innerHTML += char;

                }

                i++;

                if(i >= text.length){

                    clearInterval(timer);

                    if(callback){

                        callback();

                    }

                    resolve();

                }

            }, speed);

        });

    }

    /* ==========================================
       520 ROSAS
    ========================================== */

    renderRoses(scene){

        /* Escena "vacía" solo para que el motor
           mantenga su flujo de navegación normal */

        const section = this.createScene();

        this.container.appendChild(section);

        /* Capa a pantalla completa, fuera de la
           tarjeta, para que la lluvia cubra todo
           el viewport */

        const layer = document.createElement("div");

        layer.id = "roses-layer";

        const rain = document.createElement("div");

        rain.className = "roses-rain";

        const fill = document.createElement("div");

        fill.className = "roses-fill";

        const reveal = document.createElement("div");

        reveal.className = "roses-reveal";

        reveal.innerHTML = `

            <span class="roses-number">0</span>

        `;

        layer.appendChild(fill);

        layer.appendChild(rain);

        layer.appendChild(reveal);

        document.body.appendChild(layer);

        this.rosesLayer = layer;

        this.runRoseRain(scene, rain, fill, reveal);

    }

    runRoseRain(scene, rain, fill, reveal){

        const total = scene.total;

        const maxFill = 0.92;

        const containerHeight = window.innerHeight;

        const numberEl = reveal.querySelector(".roses-number");

        let spawned = 0;

        let landed = 0;

        const spawnBatch = () => {

            if(spawned >= total){

                clearInterval(spawnTimer);

                return;

            }

            const batchSize = Math.min(6, total - spawned);

            for(let i = 0; i < batchSize; i++){

                spawned++;

                const rose = document.createElement("div");

                rose.className = "rose-drop";

                rose.innerHTML = `<img src="assets/img/rose.svg" alt="">`;

                const size = this.random(14, 26);

                rose.style.width = size + "px";

                rose.style.left = this.random(1, 97) + "%";

                const duration = this.random(1.3, 2.4);

                const drift = this.random(-30, 30);

                const spin = this.random(-260, 260);

                /* Punto donde esta rosa se "asienta" en la
                   pila, según cuántas ya han caído antes */

                const pileFraction = (spawned / total) * maxFill;

                const jitter = this.random(
                    -containerHeight * 0.015,
                    containerHeight * 0.015
                );

                const landY =
                    containerHeight -
                    (containerHeight * pileFraction) +
                    jitter;

                rose.style.setProperty("--duration", duration + "s");
                rose.style.setProperty("--drift", drift + "px");
                rose.style.setProperty("--spin", spin + "deg");
                rose.style.setProperty("--land", landY + "px");

                rose.style.animationDelay = this.random(0, 0.25) + "s";

                rose.addEventListener("animationend", () => {

                    landed++;

                    rose.classList.add("landed");

                    numberEl.textContent = landed;

                    if(landed >= total){

                        this.finishRoseRain(fill, reveal);

                    }

                });

                rain.appendChild(rose);

            }

            const pct = Math.min(100, (spawned / total) * maxFill * 100);

            fill.style.height = pct + "%";

        };

        const spawnTimer = setInterval(spawnBatch, 40);

        spawnBatch();

    }

    finishRoseRain(fill, reveal){

        fill.style.height = "100%";

        setTimeout(() => {

            reveal.appendChild(

                this.createButton(this.currentScene.button)

            );

        }, 700);

    }

    random(min, max){

        return Math.random() * (max - min) + min;

    }

    /* ==========================================
       FINAL
    ========================================== */

    renderEnding(scene){

        const section = this.createScene();

        const card = this.createCard();

        const rose = this.createRose();

        const title = document.createElement("h1");

        title.textContent = scene.title;

        const subtitle = document.createElement("p");

        subtitle.textContent = scene.subtitle;

        const button = document.createElement("button");

        button.className = "btn";

        button.textContent = scene.button;

        button.addEventListener("click",()=>{

            stopMusic2();

            this.restart();

        });

        card.appendChild(rose);

        card.appendChild(title);

        card.appendChild(subtitle);

        card.appendChild(button);

        section.appendChild(card);

        this.container.appendChild(section);

    }

    /* ==========================================
       RESTART
    ========================================== */

    restart(){

        this.show(0);

    }
}