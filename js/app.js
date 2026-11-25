/* =====================================================================
   BARCELONA – LIMA JAZZ CONNECTION · Lógica de la página
   Lee todo desde config.js (window.EVENTO). No hace falta editar este archivo.
   Sin formulario y sin píxel: la reserva es solo por WhatsApp.
   ===================================================================== */
(function () {
  'use strict';

  var C = window.EVENTO;
  if (!C) { console.error('Falta config.js'); return; }

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };
  var params = new URLSearchParams(location.search);

  /* ---------- Fecha actual (con simulación ?fecha= para probar) ---------- */
  function ahora() {
    var f = C.permitirSimularFecha && params.get('fecha');
    if (f) {
      var iso = /^\d{4}-\d{2}-\d{2}$/.test(f) ? f + 'T12:00:00-05:00' : f;
      var d = new Date(iso);
      if (!isNaN(d)) return d;
    }
    return new Date();
  }

  /* ---------- Vendedor (?v=), recordado 30 días en este navegador ---------- */
  var REF_KEY = 'aanderud_ref';
  function vendedor() {
    var codigo = (params.get('v') || '').trim().toLowerCase();
    if (codigo) {
      var nombre = C.vendedores[codigo] || codigo;
      try { localStorage.setItem(REF_KEY, JSON.stringify({ n: nombre, t: Date.now() })); } catch (e) {}
      return nombre;
    }
    try {
      var r = JSON.parse(localStorage.getItem(REF_KEY) || 'null');
      if (r && (Date.now() - r.t) < 30 * 864e5) return r.n;
    } catch (e) {}
    return '';
  }

  /* ---------- WhatsApp ---------- */
  function urlWhatsApp(ref) {
    var msg = C.whatsapp.mensaje;
    if (C.whatsapp.agregarReferencia && ref) msg += ' (de parte de ' + ref + ')';
    var num = String(C.whatsapp.numero).replace(/\D/g, '');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg);
  }

  /* ---------- Estado: abierto, agotado o terminado ---------- */
  function estado() {
    var now = ahora();
    if (now > new Date(C.fin)) return 'terminado';
    if (C.agotado) return 'agotado';
    return 'abierto';
  }

  function prepararReserva() {
    var est = estado();
    var url = urlWhatsApp(vendedor());
    $$('[data-wa]').forEach(function (a) { a.href = url; });

    if (est === 'abierto') return;
    var largo = est === 'agotado' ? 'Reservas agotadas' : 'Concierto realizado';
    var corto = est === 'agotado' ? 'Agotado' : 'Realizado';
    $$('[data-wa]').forEach(function (a) { a.classList.add('agotado'); a.removeAttribute('href'); });
    $$('[data-txt-reserva]').forEach(function (s) { s.textContent = largo; });
    $$('[data-txt-reserva-corto]').forEach(function (s) { s.textContent = corto; });
    $('#pasos').hidden = true;
    var aviso = $('#venta-cerrada');
    aviso.hidden = false;
    aviso.textContent = est === 'agotado'
      ? 'Las reservas para esta fecha están completas. Síguenos en @ruedacultural para enterarte de las próximas.'
      : 'Gracias por acompañarnos el 5 de diciembre. Síguenos en @ruedacultural para enterarte de los próximos conciertos.';
  }

  /* ---------- Precios ---------- */
  function pintarPrecios() {
    var caja = $('#precios-lista');
    if (!caja) return;
    caja.innerHTML = C.precios.map(function (p) {
      return '<div class="precio"><p class="precio__nombre">' + p.nombre + '</p>' +
        '<p class="precio__monto"><small>S/</small>' + p.monto + '</p>' +
        '<p class="precio__nota">' + p.nota + '</p></div>';
    }).join('');
  }

  /* ---------- YouTube: fachada que carga el reproductor al tocar ---------- */
  function prepararVideos() {
    $$('[data-yt]').forEach(function (btn) {
      var v = C.videos[btn.getAttribute('data-yt')];
      if (!v) return;
      var img = $('img', btn);
      img.onerror = function () { img.style.visibility = 'hidden'; };
      img.src = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
      var t = $('[data-yt-titulo="' + btn.getAttribute('data-yt') + '"]');
      var l = $('[data-yt-lugar="' + btn.getAttribute('data-yt') + '"]');
      if (t) t.textContent = v.titulo;
      if (l) l.textContent = v.lugar;
      btn.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0';
        f.title = v.titulo;
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        btn.innerHTML = '';
        btn.appendChild(f);
      }, { once: true });
    });
  }

  /* ---------- Spotify: fachada que carga el reproductor al tocar ---------- */
  function prepararSpotify() {
    $$('[data-sp]').forEach(function (caja) {
      var s = C.spotify[caja.getAttribute('data-sp')];
      if (!s) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'spotify__btn';
      b.innerHTML = '<span class="spotify__play" aria-hidden="true"></span>' +
        '<span><b>' + s.titulo + '</b><br><small>' + s.sub + ' · Escuchar en Spotify</small></span>';
      b.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://open.spotify.com/embed/' + s.tipo + '/' + s.id;
        f.title = s.titulo + ' en Spotify';
        f.height = 152;
        f.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
        caja.innerHTML = '';
        caja.appendChild(f);
      }, { once: true });
      caja.appendChild(b);
    });
  }

  /* ---------- Barra fija: se oculta en la portada y en la sección de reserva ---------- */
  function prepararBarra() {
    var barra = $('#barra');
    if (!barra || !('IntersectionObserver' in window)) return;
    var visibles = {};
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { visibles[e.target.id || 'hero'] = e.isIntersecting; });
      var ocultar = Object.keys(visibles).some(function (k) { return visibles[k]; });
      barra.classList.toggle('oculta', ocultar);
    }, { threshold: 0.15 });
    var hero = $('.hero__accion');
    if (hero) { hero.id = hero.id || 'hero-accion'; obs.observe(hero); }
    var res = $('#reservar');
    if (res) obs.observe(res);
  }

  var m = $('[data-maps]');
  if (m) m.href = C.mapsUrl;

  pintarPrecios();
  prepararReserva();
  prepararVideos();
  prepararSpotify();
  prepararBarra();
})();
