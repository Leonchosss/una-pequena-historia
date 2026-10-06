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

        if(this.balloonsLayer){

            this.balloonsLayer.remove();

            this.balloonsLayer = null;

        }

        switch(scene.type){

            case "notice":

                this.renderNotice(scene);

                break;

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

            case "giftbox":

                this.renderGiftbox(scene);

                break;

            case "cake":

                this.renderCake(scene);

                break;

            case "balloons":

                this.renderBalloons(scene);

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

    const photoScenes = CONFIG.scenes.filter(s => s.type === "photo");

    const photoNumber = photoScenes.indexOf(scene) + 1;

    counter.textContent = `Recuerdo ${photoNumber} de ${photoScenes.length}`;

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

                if(scene.onReveal){

                    scene.onReveal();

                }

                paper.appendChild(

                    this.createButton(scene.button, scene.onButtonClick)

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
       AVISO AUTOMÁTICO
    ========================================== */

    renderNotice(scene){

        const section = this.createScene();

        const card = this.createCard();

        if(scene.icon === "volume"){

            const icon = document.createElement("div");

            icon.className = "volume-icon";

            icon.innerHTML = `

                <svg viewBox="0 0 120 120" width="90" height="90">
                    <polygon
                        points="20,45 45,45 70,25 70,95 45,75 20,75"
                        fill="#7b2148"></polygon>
                    <path
                        class="wave wave1"
                        d="M80,50 Q92,60 80,70"
                        stroke="#d6336c"
                        stroke-width="7"
                        fill="none"
                        stroke-linecap="round"></path>
                    <path
                        class="wave wave2"
                        d="M90,38 Q110,60 90,82"
                        stroke="#d6336c"
                        stroke-width="7"
                        fill="none"
                        stroke-linecap="round"></path>
                    <path
                        class="wave wave3"
                        d="M100,26 Q128,60 100,94"
                        stroke="#d6336c"
                        stroke-width="7"
                        fill="none"
                        stroke-linecap="round"></path>
                </svg>

            `;

            card.appendChild(icon);

        }

        const text = document.createElement("h2");

        text.className = "notice-text";

        text.textContent = scene.text;

        card.appendChild(text);

        section.appendChild(card);

        this.container.appendChild(section);

        setTimeout(() => {

            this.next();

        }, scene.duration || 2600);

    }

    /* ==========================================
       CAJA DE REGALO
    ========================================== */

    renderGiftbox(scene){

        const section = this.createScene();

        const card = this.createCard();

        const title = document.createElement("h2");

        title.textContent = scene.title;

        const subtitle = document.createElement("p");

        subtitle.textContent = scene.subtitle;

        const box = document.createElement("div");

        box.className = "giftbox";

        box.innerHTML = `

            <div class="box-glow"></div>

            <div class="box-lid"><div class="bow"></div></div>

            <div class="box-body">
                <div class="ribbon-v"></div>
                <div class="ribbon-h"></div>
            </div>

        `;

        box.addEventListener("click", () => {

            if(box.classList.contains("open")) return;

            box.classList.add("open");

            stopMusic2();

            startMusic3();

            setTimeout(() => {

                this.next();

            }, 1500);

        });

        card.appendChild(title);

        card.appendChild(subtitle);

        card.appendChild(box);

        section.appendChild(card);

        this.container.appendChild(section);

    }

    /* ==========================================
       PASTEL
    ========================================== */

    renderCake(scene){

        const section = this.createScene();

        const card = this.createCard();

        const title = document.createElement("h2");

        title.textContent = scene.title;

        const subtitle = document.createElement("p");

        subtitle.textContent = scene.subtitle;

        const cake = document.createElement("div");

        cake.className = "cake";

        cake.innerHTML = `

            <div class="candles"></div>
            <div class="cake-top"></div>
            <div class="cake-layer cake-layer-2"></div>
            <div class="cake-layer cake-layer-1"></div>
            <div class="cake-plate"></div>

        `;

        const candlesWrap = cake.querySelector(".candles");

        const total = scene.candles;

        const candleEls = [];

        for(let i = 0; i < total; i++){

            const candle = document.createElement("div");

            candle.className = "candle";

            candle.innerHTML = `

                <div class="candle-flame"></div>
                <div class="candle-stick"></div>

            `;

            candleEls.push(candle);

            candlesWrap.appendChild(candle);

        }

        let blown = false;

        cake.classList.add("cake-tappable");

        cake.addEventListener("click", () => {

            if(blown) return;

            blown = true;

            cake.classList.add("blown");

            candleEls.forEach((candle, i) => {

                setTimeout(() => {

                    candle.classList.add("out");

                }, i * 35);

            });

            setTimeout(() => {

                this.next();

            }, (total * 35) + 700);

        });

        card.appendChild(title);

        card.appendChild(subtitle);

        card.appendChild(cake);

        section.appendChild(card);

        this.container.appendChild(section);

    }

    /* ==========================================
       GLOBOS
    ========================================== */

    renderBalloons(scene){

        const section = this.createScene();

        this.container.appendChild(section);

        const layer = document.createElement("div");

        layer.id = "balloons-layer";

        const rain = document.createElement("div");

        rain.className = "balloons-rain";

        const fill = document.createElement("div");

        fill.className = "balloons-fill";

        const reveal = document.createElement("div");

        reveal.className = "balloons-reveal";

        reveal.innerHTML = `<span class="balloons-number">0</span>`;

        layer.appendChild(fill);

        layer.appendChild(rain);

        layer.appendChild(reveal);

        document.body.appendChild(layer);

        this.balloonsLayer = layer;

        this.runBalloonRise(scene, rain, fill, reveal);

    }

    runBalloonRise(scene, rain, fill, reveal){

        const total = scene.total;

        const maxFill = 0.85;

        const containerHeight = window.innerHeight;

        const numberEl = reveal.querySelector(".balloons-number");

        const colors = ["#e0313f", "#ffffff", "#f4c84a", "#bf255d"];

        let spawned = 0;

        let landed = 0;

        const spawnBatch = () => {

            if(spawned >= total){

                clearInterval(spawnTimer);

                return;

            }

            const batchSize = Math.min(3, total - spawned);

            for(let i = 0; i < batchSize; i++){

                spawned++;

                const balloon = document.createElement("div");

                balloon.className = "balloon-drop";

                const size = this.random(34, 54);

                balloon.style.width = size + "px";

                balloon.style.height = (size * 1.2) + "px";

                balloon.style.left = this.random(4, 90) + "%";

                const color = colors[

                    Math.floor(Math.random() * colors.length)

                ];

                balloon.style.background = color;

                balloon.style.color = color;

                const duration = this.random(2.2, 3.4);

                const drift = this.random(-40, 40);

                /* Punto donde este globo se "acomoda"
                   bajo el techo, según cuántos ya subieron */

                const pileFraction = (spawned / total) * maxFill;

                const jitter = this.random(
                    -containerHeight * 0.02,
                    containerHeight * 0.02
                );

                const landY =
                    (containerHeight * pileFraction) + jitter;

                const rise = landY - containerHeight;

                balloon.style.setProperty("--duration", duration + "s");
                balloon.style.setProperty("--drift", drift + "px");
                balloon.style.setProperty("--rise", rise + "px");

                balloon.style.animationDelay = this.random(0, 0.3) + "s";

                balloon.addEventListener("animationend", () => {

                    landed++;

                    balloon.classList.add("landed");

                    numberEl.textContent = landed;

                    if(landed >= total){

                        this.finishBalloonRise(fill, reveal);

                    }

                });

                rain.appendChild(balloon);

            }

            const pct = Math.min(100, (spawned / total) * maxFill * 100);

            fill.style.height = pct + "%";

        };

        const spawnTimer = setInterval(spawnBatch, 110);

        spawnBatch();

    }

    finishBalloonRise(fill, reveal){

        fill.style.height = "100%";

        setTimeout(() => {

            reveal.appendChild(

                this.createButton(this.currentScene.button)

            );

        }, 700);

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

            stopMusic3();

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