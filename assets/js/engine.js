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

    createButton(text) {

        const button = document.createElement("button");

        button.className = "btn";

        button.textContent = text;

        button.addEventListener("click", () => {

            startMusic();

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

        const button = this.createButton(scene.button);

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

                paper.appendChild(

                    this.createButton(scene.button)

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