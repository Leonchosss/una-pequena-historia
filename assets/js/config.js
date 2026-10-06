/* ==========================================================
   UNA PEQUEÑA HISTORIA
   CONFIGURACIÓN
   v3.1.0
========================================================== */

const CONFIG = {

    app: {

        title: "Para una persona muy especial",

        subtitle: "Hay algo que quiero compartir contigo...",

        author: "",

        showProgress: false

    },

    animation: {

        typeSpeed: 40,

        fadeDuration: 600,

        sceneDelay: 250

    },

    scenes: [

        /* ==========================================
           AVISO DE VOLUMEN
        ========================================== */

        {

            id: "volumeHint",

            type: "notice",

            icon: "volume",

            text: "Te recomiendo subir un poco el volumen",

            duration: 3200

        },

        /* ==========================================
           HERO
        ========================================== */

        {

            id: "hero",

            type: "hero",

            title: "Para una persona muy especial",

            subtitle:
                "Hay algo que quiero compartir contigo...",

            button: "Comenzar"

        },

        /* ==========================================
           INTRO
        ========================================== */

        {

            id: "intro",

            type: "text",

            title: "Una bonita historia",

            paragraphs: [

                "Hay personas que llegan a nuestra vida sin hacer demasiado ruido.",

                "Y, sin darte cuenta, terminan dejando los recuerdos más bonitos.",

                "Esta pequeña historia no busca cambiar el pasado.",

                "Simplemente quería regalarte un recuerdo de todo lo bueno que vivimos."

            ],

            button: "Ver el primer recuerdo"

        },

        /* ==========================================
           FOTO 1
        ========================================== */

        {

            id: "photo1",

            type: "photo",

            image: "assets/photos/1.jpg",

            caption:
                "Siempre recordaré este momento.",

            button: "Continuar <3"

        },

        /* ==========================================
           FOTO 2
        ========================================== */

        {

            id: "photo2",

            type: "photo",

            image: "assets/photos/2.jpg",

            caption:
                "Las sonrisas más sinceras suelen aparecer cuando menos las planeas.",

            button: "Continuar :p"

        },

        /* ==========================================
           FOTO 3
        ========================================== */

        {

            id: "photo3",

            type: "photo",

            image: "assets/photos/3.jpg",

            caption:
                "Hay días que nunca dejan de sentirse especiales.",

            button: "Continuar <3"

        },

        /* ==========================================
           FOTO 4
        ========================================== */

        {

            id: "photo4",

            type: "photo",

            image: "assets/photos/4.jpg",

            caption:
                "Gracias por haber formado parte de mi historia.",

            button: "Abrir la carta"

        },


/* ==========================================
   SOBRE
========================================== */

{

    id: "envelope",

    type: "envelope",

    title: "Hay algo más que quiero decirte...",

    subtitle: "Haz clic sobre el sobre",

},


        /* ==========================================
           CARTA
        ========================================== */

        {

            id: "letter",

            type: "letter",

            title: "Angie...",

            content: `

No escribo esto esperando cambiar lo que ya pasó.

Tampoco espero respuestas.

Solo quería agradecerte.

Gracias por cada risa.

Gracias por cada momento.

Gracias por cada recuerdo que hoy sigue haciéndome sonreír.

Tal vez las cosas no son como planeamos.

Y está bien.

Solo quería que supieras que siempre te llevaré en mi corazón con mucho cariño.

Y deseo de corazón que seas muy feliz siempre.

Atte: Leo :).

            `,

            button: "Otra flor",

            onReveal: () => stopMusic(),

            onButtonClick: () => startMusic2()

        },

        /* ==========================================
           520 ROSAS
        ========================================== */

        {

            id: "roses520",

            type: "roses",

            total: 520,

            button: "Continuar"

        },

        /* ==========================================
           CAJA DE REGALO
        ========================================== */

        {

            id: "giftbox",

            type: "giftbox",

            title: "Espera, hay algo más...",

            subtitle: "Toca la caja"

        },

        /* ==========================================
           PASTEL
        ========================================== */

        {

            id: "cake",

            type: "cake",

            title: "¡Feliz Cumpleaños!",

            subtitle: "Toca el pastel para apagar las velas",

            candles: 23

        },

        /* ==========================================
           GLOBOS
        ========================================== */

        {

            id: "balloons",

            type: "balloons",

            total: 23,

            button: "Continuar"

        },

        /* ==========================================
           CARTA DE CUMPLEAÑOS
        ========================================== */

        {

            id: "birthdayLetter",

            type: "letter",

            title: "Un deseo más",

            content: `

Angie,

Antes de cerrar esta pequeña tarjeta que hice para tí, quería dejarte algo más.

Hoy es tu cumpleaños, y aunque a veces las palabras no alcanzan, quiero que sepas que te deseo de corazón que rías mucho, que te sorprendas seguido, que vivas miles de experiencias y alegrías y que nunca dejes de ser exactamente como eres, que es lo que nos hace quererte.

Feliz Cumpleaños. Te mereces todo lo bonito.

            `,

            button: "Continuar"

        },

        /* ==========================================
           AVISO DE REGALOS
        ========================================== */

        {

            id: "giftsWish",

            type: "notice",

            text: "Ojalá que te gusten tus regalos",

            duration: 2600

        },

        /* ==========================================
           FINAL
        ========================================== */

        {

            id: "ending",

            type: "ending",

            title: "Gracias por llegar hasta aquí",

            subtitle:
                "Hay historias que no necesitan durar para siempre para ser inolvidables.",

            button: "Volver a empezar"

        }

    ]

};