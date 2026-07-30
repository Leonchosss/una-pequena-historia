/* ==========================================================
   UNA PEQUEÑA HISTORIA
   CONFIGURACIÓN
   v3.1.0
========================================================== */

const CONFIG = {

    app: {

        title: "Para alguien muy especial",

        subtitle: "Hay algo que quiero compartir contigo...",

        author: "",

        showProgress: false

    },

    animation: {

        typeSpeed: 35,

        fadeDuration: 600,

        sceneDelay: 250

    },

    scenes: [

        /* ==========================================
           HERO
        ========================================== */

        {

            id: "hero",

            type: "hero",

            title: "Para alguien muy especial",

            subtitle:
                "Hay algo que quiero compartir contigo...",

            button: "Abrir esta historia"

        },

        /* ==========================================
           INTRO
        ========================================== */

        {

            id: "intro",

            type: "text",

            title: "Una pequeña historia",

            paragraphs: [

                "Hay personas que llegan a nuestra vida sin hacer demasiado ruido.",

                "Y, sin darte cuenta, terminan dejando algunos de los recuerdos más bonitos.",

                "Esta pequeña historia no busca cambiar el pasado.",

                "Simplemente quería regalarte unos minutos para recordar todo lo bueno que vivimos."

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

            button: "Continuar"

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

            button: "Continuar"

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

            button: "Continuar"

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

            title: "Para ti",

            content: `

No escribo esto esperando cambiar lo que ya pasó.

Tampoco espero respuestas.

Solo quería agradecerte.

Gracias por cada risa.

Gracias por cada momento.

Gracias por cada recuerdo que hoy sigue haciéndome sonreír.

Tal vez la vida tomó caminos distintos.

Y está bien.

Solo quería que supieras que siempre guardaré esta etapa con mucho cariño.

Te deseo de corazón que seas muy feliz.

Siempre.

            `,

            button: "Una última flor"

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