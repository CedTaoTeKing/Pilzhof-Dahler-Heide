/* =====================================================================
   PILZHOF DAHLER HEIDE · Sektion „Wochenmarkt“
   Vanilla JS, keine Abhängigkeiten, ~6 KB minifiziert.

   Was dieses Script macht
   1. Live-Status   Countdown bis zum nächsten Markt, „Jetzt geöffnet“, Zeitleiste
                    (immer in Europe/Berlin – egal, wo der Besucher ist)
   2. Wochenleiste  Markttage + Anzahl Märkte aus CONFIG
   3. Karte         Pins aus Koordinaten (data-lat/data-lng) positionieren
   4. Auswahl       Desktop: Hover/Klick auf Markt  ·  Mobile: Wisch-Karussell
                    → Kamera fährt weich zum Pin, andere Märkte dimmen
   5. Parallax      Desktop: Maus  ·  Mobile: Gyroskop (Handy neigen)
                    + Scroll-Tiefe + sanfte Idle-Bewegung
   Alles Bewegte läuft in EINEM requestAnimationFrame-Loop mit
   zeitbasierter Dämpfung (framerate-unabhängig, jederzeit unterbrechbar).
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     KONFIGURATION – hier pflegen
     day: 0 = Montag … 5 = Samstag, 6 = Sonntag
     cam: Kameraziel, wenn der Markt ausgewählt ist
          x/y = Versatz in px, s = Zoom (Desktop und Mobile getrennt)
     --------------------------------------------------------------- */
  var CONFIG = {
    timeZone: 'Europe/Berlin',
    breakpoint: '(max-width: 720px)',
    markets: {
      pb: {
        name: 'Paderborn',
        schedule: [{ day: 5, start: '07:00', end: '13:00' }],
        cam:  { x: 24,  y: -64, s: 1.10 },
        camM: { x: 10,  y: -22, s: 1.14 }
      },
      dt: {
        name: 'Detmold',
        schedule: [{ day: 5, start: '07:00', end: '13:00' }],
        cam:  { x: -30, y: 96,  s: 1.08 },
        camM: { x: -14, y: 58,  s: 1.10 }
      }
    },
    overview:  { x: 0, y: 0, s: 1 },          // nichts ausgewählt
    overviewM: { x: 0, y: 6, s: 0.94 },       // Mobile: Karte „Das Myzel wächst“
    dimTo: 0.25,          // Deckkraft nicht ausgewählter Märkte
    damping: 0.32,        // Sekunden bis ~63 % des Weges (größer = träger)
    leaveDelay: 260,      // ms, bevor die Kamera nach dem Hover zur Übersicht zurückfährt
    /* Projektion Koordinate → Karte (SVG viewBox 741 × 912) */
    map: { lng0: 8.55, lat0: 52.0, kx: 1483, ky: 2400, w: 741, h: 912 }
  };

  var DAY = 86400, WEEK = 604800;
  var DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  var DAY_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  var root = document.querySelector('[data-wm]');
  if (!root) return;
  function $(s, el) { return (el || root).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || root).querySelectorAll(s)); }
  function pad(n) { return String(n).padStart(2, '0'); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function toSec(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 3600 + (+p[1]) * 60; }
  function nice(hhmm) { return hhmm.replace(/^0/, ''); }               // "07:00" → "7:00"

  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var mq = window.matchMedia(CONFIG.breakpoint);
  var keys = Object.keys(CONFIG.markets);

  /* =================================================================
     1 · LIVE-STATUS
     ================================================================= */
  var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: CONFIG.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  var dateFmt = new Intl.DateTimeFormat('de-DE', { timeZone: CONFIG.timeZone, weekday: 'long', day: 'numeric', month: 'long' });
  var DOWS = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

  /* Sekunden seit Montag 0:00 in Berlin */
  function weekSec(ms) {
    var p = {};
    fmt.formatToParts(new Date(ms)).forEach(function (x) { p[x.type] = x.value; });
    var dow = DOWS[p.weekday] || 0;
    return { dow: dow, t: dow * DAY + ((+p.hour) % 24) * 3600 + (+p.minute) * 60 + (+p.second) };
  }

  /* Status eines Markts: offen? wie lange noch? wann als Nächstes? */
  function marketState(m, t) {
    var best = null;
    m.schedule.forEach(function (s) {
      var a = s.day * DAY + toSec(s.start), b = s.day * DAY + toSec(s.end);
      if (t >= a && t < b) { best = { open: true, rem: b - t, slot: s, a: a, b: b }; return; }
      var until = ((a - t) % WEEK + WEEK) % WEEK;
      if (!best || (!best.open && until < best.rem)) best = { open: false, rem: until, slot: s, a: a, b: b };
    });
    return best;
  }

  function tick() {
    var now = Date.now(), w = weekSec(now), t = w.t;
    var states = {}, anyOpen = null, next = null;

    keys.forEach(function (k) {
      var st = states[k] = marketState(CONFIG.markets[k], t);
      if (st.open && (!anyOpen || st.rem < anyOpen.rem)) anyOpen = st;
      if (!st.open && (!next || st.rem < next.rem)) next = st;
    });
    var lead = anyOpen || next;

    /* Live-Panel */
    var long, date;
    if (anyOpen) {
      long = 'Jetzt geöffnet';
      date = 'Heute bis ' + nice(anyOpen.slot.end) + ' Uhr';
    } else {
      var d = next.slot.day, inDays = Math.floor((next.rem + (t % DAY)) / DAY);
      long = inDays === 0 ? 'Heute ist Markttag' : inDays === 1 ? 'Morgen ist Markttag' : 'Nächster Markttag';
      date = dateFmt.format(new Date(now + next.rem * 1000));
    }
    var pill = $('[data-live-pill]');
    pill.classList.toggle('is-open', !!anyOpen);
    $('[data-status-long]').textContent = long;
    $('[data-next-date]').textContent = date;
    $('[data-cd-d]').textContent = pad(Math.floor(lead.rem / DAY));
    $('[data-cd-h]').textContent = pad(Math.floor((lead.rem % DAY) / 3600));
    $('[data-cd-m]').textContent = pad(Math.floor((lead.rem % 3600) / 60));
    $('[data-cd-s]').textContent = pad(lead.rem % 60);
    $('[data-cd]').setAttribute('aria-label', (anyOpen ? 'Markt endet in ' : 'Nächster Markt in ') +
      Math.floor(lead.rem / DAY) + ' Tagen, ' + Math.floor((lead.rem % DAY) / 3600) + ' Stunden, ' + Math.floor((lead.rem % 3600) / 60) + ' Minuten');

    /* Fußzeile: welche Märkte gehören zum angezeigten Termin */
    var same = keys.filter(function (k) { var s = states[k]; return s.open === lead.open && s.rem === lead.rem; });
    var names = same.map(function (k) { return CONFIG.markets[k].name; });
    var foot = names.length > 1 ? names.slice(0, -1).join(', ') + ' & ' + names[names.length - 1] : names[0];
    $('[data-live-foot]').textContent = foot + ' · ' + nice(lead.slot.start) + ' – ' + nice(lead.slot.end) + ' Uhr';

    /* Marktkarten */
    $$('[data-market]').forEach(function (card) {
      var k = card.dataset.market, st = states[k];
      if (!st) return;
      var short;
      if (st.open) short = 'Geöffnet · noch ' + Math.floor(st.rem / 3600) + ':' + pad(Math.floor((st.rem % 3600) / 60)) + ' h';
      else {
        var days = Math.floor((st.rem + (t % DAY)) / DAY);
        short = (days === 0 ? 'Heute' : days === 1 ? 'Morgen' : DAY_SHORT[st.slot.day]) + ' ab ' + nice(st.slot.start);
      }
      card.classList.toggle('is-open', st.open);
      $('[data-status-pill]', card).classList.toggle('is-open', st.open);
      $('[data-status-short]', card).textContent = short;
      var fill = st.open ? ((t - st.a) / (st.b - st.a) * 100).toFixed(2) + '%' : '0%';
      $('[data-tl-fill]', card).style.width = fill;
      $('[data-tl-now]', card).style.left = fill;
    });

    $$('[data-wd]').forEach(function (el) { el.classList.toggle('today', +el.dataset.wd === w.dow); });
  }

  /* Statische Teile aus der Konfiguration: Wochenleiste, Tag/Zeit, Zeitleisten-Ticks */
  function renderStatic() {
    var count = [0, 0, 0, 0, 0, 0, 0];
    keys.forEach(function (k) { CONFIG.markets[k].schedule.forEach(function (s) { count[s.day]++; }); });
    $$('[data-wd]').forEach(function (el) {
      var n = count[+el.dataset.wd];
      el.classList.toggle('market', n > 0);
      $('.badge', el).textContent = n > 1 ? String(n) : '';
      $('.badge', el).setAttribute('aria-label', n ? n + (n > 1 ? ' Märkte' : ' Markt') : '');
      $('.t', el).textContent = n ? 'Markt' : '';
    });
    $$('[data-market]').forEach(function (card) {
      var m = CONFIG.markets[card.dataset.market];
      if (!m) return;
      var s = m.schedule[0];
      $('[data-day-label]', card).textContent = DAY_NAMES[s.day];
      $('[data-time-label]', card).textContent = nice(s.start) + ' – ' + nice(s.end);
      var a = toSec(s.start) / 3600, b = toSec(s.end) / 3600, ticks = [];
      for (var i = 0; i < 4; i++) ticks.push(Math.round(a + (b - a) * i / 3));
      $('[data-tl-ticks]', card).innerHTML = ticks.map(function (h, i) { return '<span>' + h + (i === 3 ? ' Uhr' : '') + '</span>'; }).join('');
    });
  }

  /* =================================================================
     3 · PINS AUS KOORDINATEN
     ================================================================= */
  function placePins() {
    var P = CONFIG.map;
    $$('.pin[data-lat]').forEach(function (pin) {
      var x = (parseFloat(pin.dataset.lng) - P.lng0) * P.kx, y = (P.lat0 - parseFloat(pin.dataset.lat)) * P.ky;
      pin.style.left = (x / P.w * 100).toFixed(2) + '%';
      pin.style.top = (y / P.h * 100).toFixed(2) + '%';
    });
  }

  /* =================================================================
     4 · AUSWAHL  (Desktop: Hover/Klick · Mobile: Karussell)
     ================================================================= */
  var hover = null, pinned = null, slide = 0, leaveT = 0;
  var cardsEl = $('[data-cards]');
  var slides = cardsEl ? Array.prototype.slice.call(cardsEl.children) : [];

  function selected() {
    if (mq.matches) { var el = slides[slide]; return el && el.dataset.market ? el.dataset.market : 'overview'; }
    return hover || pinned || null;
  }
  function paintSelection() {
    var sel = selected();
    $$('[data-market]').forEach(function (c) { c.classList.toggle('on', c.dataset.market === sel); });
    $$('[data-pick]').forEach(function (b) { b.setAttribute('aria-pressed', String(!mq.matches && b.dataset.pick === pinned)); });
    $$('[data-dot]').forEach(function (d) { d.classList.toggle('on', +d.dataset.dot === slide); });
  }

  /* Desktop */
  $$('[data-market]').forEach(function (c) {
    c.addEventListener('mouseenter', function () { if (mq.matches) return; clearTimeout(leaveT); hover = c.dataset.market; paintSelection(); });
    /* Verzögerung: beim Wechsel zwischen zwei Karten fährt die Kamera direkt weiter statt erst zur Mitte */
    c.addEventListener('mouseleave', function () { if (mq.matches) return; clearTimeout(leaveT); leaveT = setTimeout(function () { hover = null; paintSelection(); }, CONFIG.leaveDelay); });
  });
  $$('[data-pick]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.pick;
      if (mq.matches) {
        var i = slides.findIndex(function (s) { return s.dataset.market === k; });
        if (b.classList.contains('plabel')) goToSlide(i);                         // Pin angetippt → Karte ins Bild
        else $('[data-map]').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); // „Karte“
        return;
      }
      pinned = pinned === k ? null : k;
      paintSelection();
    });
  });

  /* Mobile-Karussell */
  function goToSlide(i) {
    if (i < 0 || !slides[i]) return;
    slide = i;
    var el = slides[i];
    cardsEl.scrollTo({ left: el.offsetLeft - (cardsEl.clientWidth - el.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    paintSelection();
  }
  if (cardsEl) {
    var scrollRaf = 0;
    cardsEl.addEventListener('scroll', function () {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(function () {
        scrollRaf = 0;
        if (!mq.matches || !slides[0]) return;
        var step = slides[0].offsetWidth + parseFloat(getComputedStyle(cardsEl).columnGap || 12);
        var i = clamp(Math.round(cardsEl.scrollLeft / step), 0, slides.length - 1);
        if (i !== slide) { slide = i; paintSelection(); }
      });
    }, { passive: true });
  }
  $$('[data-dot]').forEach(function (d) { d.addEventListener('click', function () { goToSlide(+d.dataset.dot); }); });
  mq.addEventListener ? mq.addEventListener('change', paintSelection) : mq.addListener(paintSelection);

  /* =================================================================
     5 · PARALLAX & KAMERA – ein Loop für alles
     ================================================================= */
  var cam = { x: 0, y: 0, s: 1, grow: 0 };
  var dim = {}; keys.forEach(function (k) { dim[k] = { o: 1, h: 0 }; });
  var tx = 0, ty = 0, cx = 0, cy = 0, pointer = false, gyro = false, visible = true, raf = 0, lastT = 0;
  var dimEls = $$('[data-dim]'), hlEls = $$('[data-hl]'), growEl = $('[data-grow]');

  /* Maus (Desktop) */
  root.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    var r = root.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    pointer = true;
  });
  root.addEventListener('pointerleave', function () { pointer = false; });

  /* Gyroskop (Mobile). iOS 13+: Freigabe nur nach Nutzer-Tipp → Button „Handy neigen“ */
  function onOrient(e) {
    if (e.gamma == null) return;
    gyro = true;
    tx = clamp(e.gamma / 25, -1, 1);
    ty = clamp(((e.beta || 45) - 45) / 25, -1, 1);
  }
  var tiltBtn = $('[data-tilt]');
  var DOE = window.DeviceOrientationEvent;
  if (DOE && !reduce && ('ontouchstart' in window)) {
    window.addEventListener('deviceorientation', onOrient);
    /* Website-Anpassung: Auch Chrome/Android kennt inzwischen requestPermission, liefert die
       Neigung aber ohne Freigabe. Der Button erscheint deshalb nur, wenn nach 1 s noch keine
       Sensordaten kamen – praktisch nur auf dem iPhone. */
    if (typeof DOE.requestPermission === 'function') {
      setTimeout(function () {
        if (gyro) return;
        tiltBtn.hidden = false;
        tiltBtn.addEventListener('click', function () {
          DOE.requestPermission().then(function (r) {
            if (r !== 'granted') return;
            tiltBtn.classList.add('on');
            $('[data-tilt-label]').textContent = '3D-Neigen aktiv';
          }).catch(function () {});
        });
      }, 1000);
    }
  }

  function loop(t) {
    var dt = lastT ? Math.min(0.1, (t - lastT) / 1000) : 0.016;
    lastT = t;
    var m = mq.matches, sel = selected();
    var k = reduce ? 1 : 1 - Math.exp(-dt / CONFIG.damping);

    /* Kamera-Ziel */
    var goal = sel && CONFIG.markets[sel] ? (m ? CONFIG.markets[sel].camM : CONFIG.markets[sel].cam)
                                          : (m && sel === 'overview' ? CONFIG.overviewM : CONFIG.overview);
    cam.x += (goal.x - cam.x) * k;
    cam.y += (goal.y - cam.y) * k;
    cam.s += (goal.s - cam.s) * k;
    cam.grow += ((sel === 'overview' ? 1 : 0) - cam.grow) * k;
    root.style.setProperty('--camx', cam.x.toFixed(2));
    root.style.setProperty('--camy', cam.y.toFixed(2));
    root.style.setProperty('--cams', cam.s.toFixed(4));

    /* Dimmen & Highlight je Markt (direkt als Inline-Opacity, nur bei Änderung schreiben) */
    keys.forEach(function (key) {
      var d = dim[key];
      var oGoal = !sel ? 1 : sel === key ? 1 : sel === 'overview' ? 0.7 : CONFIG.dimTo;
      d.o += (oGoal - d.o) * k;
      d.h += ((sel === key ? 1 : 0) - d.h) * k;
    });
    dimEls.forEach(function (el) {
      var o = dim[el.dataset.dim] ? dim[el.dataset.dim].o : 1;
      var min = parseFloat(el.dataset.dimMin || 0);
      if (m && el.hasAttribute('data-market')) o = 1;                 // Mobile: Karussell-Karten nie dimmen
      var v = (min + (1 - min) * o).toFixed(3);
      if (el._o !== v) { el.style.opacity = v; el._o = v; }
    });
    hlEls.forEach(function (el) {
      var v = (dim[el.dataset.hl] ? dim[el.dataset.hl].h : 0).toFixed(3);
      if (el._o !== v) { el.style.opacity = v; el._o = v; }
    });
    if (growEl) { var g = (0.55 + 0.45 * cam.grow).toFixed(3); if (growEl._o !== g) { growEl.style.opacity = g; growEl._o = g; } }

    /* Parallax */
    if (!reduce) {
      if (!pointer && !gyro) { tx = Math.sin(t / 2800) * (m ? 0.45 : 0.4); ty = Math.cos(t / 3400) * (m ? 0.28 : 0.25); }
      var kp = 1 - Math.exp(-dt / (gyro ? 0.25 : 0.3));
      cx += (tx - cx) * kp;
      cy += (ty - cy) * kp;
      var r = root.getBoundingClientRect(), vh = window.innerHeight || 1;
      var sy = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);
      root.style.setProperty('--px', cx.toFixed(4));
      root.style.setProperty('--py', cy.toFixed(4));
      root.style.setProperty('--sy', sy.toFixed(4));
    }
    raf = visible ? requestAnimationFrame(loop) : 0;
  }

  /* Website-Ergänzung – Einflug „Die Karte landet“: Kopf und Karte erscheinen, sobald sie ins untere
     Bildschirmfünftel kommen. Das Myzel zeichnet sich genau dann, wenn die Karte landet. */
  var entrance = !reduce && 'IntersectionObserver' in window;
  if (entrance) {
    root.classList.add('wm-pre');
    var eio = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        eio.unobserve(e.target);
        e.target.classList.add('in');
        if (e.target.classList.contains('wm-main')) root.classList.add('is-in');
      });
    }, { rootMargin: '0px 0px -20% 0px' });
    eio.observe($('.wm-head')); eio.observe($('.wm-main'));
  }

  /* Nur animieren, solange die Sektion sichtbar ist; Myzel beim ersten Einblenden zeichnen */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      visible = en[0].isIntersecting;
      if (visible && !entrance) root.classList.add('is-in');
      if (visible && !raf) { lastT = 0; raf = requestAnimationFrame(loop); }
    }, { threshold: 0.05 }).observe(root);
  } else { root.classList.add('is-in'); }

  /* Start */
  renderStatic();
  placePins();
  tick();
  setInterval(tick, 1000);
  paintSelection();
  raf = requestAnimationFrame(loop);
})();
