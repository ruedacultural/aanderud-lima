# Barcelona – Lima Jazz Connection · Mark Aanderud en Lima

Página informativa del concierto de **Mark Aanderud con Andrés Prado Trío** · Cocodrilo Verde · sábado 5 de diciembre de 2026, 8:00 a 10:00 p. m. (primer turno).
Una producción de Rueda Cultural, con el apoyo de Music Market. Se publica en GitHub Pages: `https://ruedacultural.github.io/aanderud-lima/`

Basada en la página de Tornada, pero más simple: **sin formulario de Airtable y sin píxel de Meta**. La única forma de reservar es el botón de WhatsApp.

## Estructura

```
aanderud-lima/
├── index.html            Página única con scroll
├── config.js             ← PRECIOS, WHATSAPP, VIDEOS Y ENLACES (lo único que se edita)
├── css/estilos.css
├── js/app.js             WhatsApp con mensaje prellenado, reproductores al tocar, estados
├── img/
│   ├── hero-mark-720.webp / hero-mark-1200.webp   Retrato del afiche (portada)
│   ├── titulo.webp / nombres.webp                 Tipografía del afiche, recortada
│   ├── mark-en-vivo.webp      Foto en vivo · Roberto Cifarelli
│   ├── mark-manos.webp        Foto en blanco y negro · Natalia Davtyan
│   ├── logo-cocodrilo.webp / logo-musicmarket.webp / logo-rueda-blanco.svg
│   ├── flyer.webp             Afiche completo
│   ├── og.jpg                 Vista previa al compartir (1080×1350)
│   └── og-cuadrado.jpg        Alternativa cuadrada (1200×1200)
└── .nojekyll
```

## Cambios rápidos (config.js)

| Qué | Dónde |
|---|---|
| Precios | `precios` |
| Mensaje de WhatsApp | `whatsapp.mensaje` |
| Se llenaron las reservas | `agotado: true` → los botones dicen "Reservas agotadas" |
| Videos | `videos` (ID de YouTube) |

Después del 5 de diciembre a las 10 p. m. la página cambia sola a "Concierto realizado".

## Enlaces por vendedor

Agrega `?v=` al enlace y el mensaje de WhatsApp llega con "(de parte de …)", para saber quién trajo cada reserva:

| Para | Enlace |
|---|---|
| Andrés | `https://ruedacultural.github.io/aanderud-lima/?v=andres` |
| Mark | `…/aanderud-lima/?v=mark` |
| Gabriel | `…/aanderud-lima/?v=gabriel` |

Los códigos están en `vendedores` (config.js). Se recuerdan 30 días en el navegador de la persona.

## Probar en otras fechas

`?fecha=2026-12-06` muestra el estado "Concierto realizado". Antes de difundir, pon `permitirSimularFecha: false` en config.js.

## Publicar

1. Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)`.
2. Para refrescar la vista previa de WhatsApp/Facebook: https://developers.facebook.com/tools/debug/ (pega la URL y pulsa "Volver a extraer").

## Identidad visual

Sigue el Manual de identidad de Rueda Cultural (2026), "Universos de proyecto": el proyecto conserva el universo del afiche (blanco y negro, serif condensado en cursiva, líneas finas) y Rueda aporta la estructura y la firma: League Spartan + Manrope, el carmín #B51B35 y el pie en vino #661315 con el isologo en blanco. Instrument Serif reemplaza en la web al serif del afiche.
