/* =====================================================================
   BARCELONA – LIMA JAZZ CONNECTION · CONFIGURACIÓN
   Lo que puede cambiar (precios, WhatsApp, enlaces) vive aquí.
   Las fechas van en hora de Lima (-05:00).
   ===================================================================== */

window.EVENTO = {

  /* ---------- Evento ---------- */
  titulo: "Barcelona – Lima Jazz Connection",
  lugar: "Cocodrilo Verde",
  direccion: "Calle Francisco de Paula Camino 226, Miraflores, Lima",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cocodrilo+Verde+Francisco+de+Paula+Camino+226+Miraflores",
  inicio: "2026-12-05T20:00:00-05:00",
  fin:    "2026-12-05T22:00:00-05:00",

  /* ---------- Precios (se muestran tal cual) ---------- */
  precios: [
    { nombre: "General",        monto: 50, nota: "Por persona" },
    { nombre: "Estudiante",     monto: 40, nota: "Presentando carné vigente" }
  ],

  /* Ponlo en true si se llenan las reservas: cambia los botones por "Agotado" */
  agotado: false,

  /* ---------- WhatsApp (único canal de reserva) ---------- */
  whatsapp: {
    numero: "51983545543",   // con código de país, sin + ni espacios
    mensaje: "Hola, quiero reservar para Mark Aanderud & Andrés Prado en Cocodrilo Verde (sábado 5 de diciembre, 8 p. m.). Somos ___ personas (general / estudiante).",
    agregarReferencia: true  // agrega "(de parte de …)" si el enlace trae ?v=
  },

  /* ---------- Enlaces por vendedor ----------
     https://ruedacultural.github.io/aanderud-lima/?v=andres
     El mensaje de WhatsApp sale con "(de parte de Andrés Prado)". */
  vendedores: {
    andres:  "Andrés Prado",
    mark:    "Mark Aanderud",
    gabriel: "Gabriel Ramos",
    ana:     "Ana Paula Gálvez",
    akemi:   "Akemi Toma"
    // [AGREGA MÁS AQUÍ]
  },

  /* ---------- Videos (ID de YouTube) ---------- */
  videos: {
    mark:   { id: "TfxnF_N2C_M", titulo: "Mark Aanderud Trio · El Circo", lugar: "En vivo en el Milano Jazz Club, Barcelona" },
    andres: { id: "aepCwrEo3hU", titulo: "Andrés Prado", lugar: "Guitarra en vivo" }
  },

  /* ---------- Spotify ---------- */
  spotify: {
    mark:   { tipo: "artist", id: "3f4dSC5nm7yCMiO4lPUHud", titulo: "Mark Aanderud", sub: "Discografía en Spotify" },
    andres: { tipo: "album",  id: "1ErpN9y0LjlQlZvoKDaAGR", titulo: "Barranquino", sub: "Andrés Prado · Álbum" }
  },

  /* Prueba la página en otra fecha con ?fecha=2026-12-06 (ponlo en false al publicar) */
  permitirSimularFecha: false
};
