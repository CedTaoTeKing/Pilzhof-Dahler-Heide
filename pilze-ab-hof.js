/* =========================================================
   Sektion „Pilze ab Hof“ · Anker #kontakt (Vanilla JS, keine Abhängigkeiten)

   - Chat im Handy tippt sich von selbst, sobald das Handy gut zur Hälfte
     sichtbar ist; läuft erneut, wenn man wieder hinscrollt.
     Ablauf: tippen → senden → „Ein paar Stunden später“ → Hof tippt
     → Antwort → zweite Nachricht tippen → senden.
   - Alle WhatsApp-/Telefon-/Maps-Links werden aus CONFIG gebaut.
   - Hover/Fokus auf Knöpfe → Reaktion im Handy (Klasse hl-* am <section>).
   - Nummer kopieren (Clipboard-API), Live-Hinweis nächster Markttag.
   - Maus-/Scroll-Parallax über CSS-Variablen --px/--py/--sy.
   - prefers-reduced-motion: fertiger Chat, keine Bewegung.
   ========================================================= */
(function () {
  'use strict';

  var CONFIG = {
    phone: '0152 03200446',                       // wie im Impressum; wird zu +49 umgerechnet
    message: 'Moin! Ich würde gern 1 kg Black Pearl bei euch am Hof abholen. Wann passt es euch?',   // ändert sich phone oder message: img/whatsapp-qr.png neu erzeugen
    reply: 'Moin! Gerne – wir legen dir 1 kg frische Black Pearl zurück. Passt dir morgen Nachmittag?',
    followUp: 'Perfekt, bis morgen!',
    address: 'Dahler Heide 19, 33100 Paderborn',   // Google-Maps-Ziel (Hof-Adresse wie im Impressum)
    market: { day: 5, startHour: 7, endHour: 13, places: 'Paderborn & Detmold' } // Live-Hinweis; day: 0 = Mo … 5 = Sa, 6 = So
  };

  var root = document.querySelector('[data-hf]');
  if (!root) return;
  var $ = function (s) { return root.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (reduce) root.classList.add('calm');

  /* ---------- Links aus CONFIG ---------- */
  var digits = String(CONFIG.phone).replace(/\D/g, '');
  if (digits.indexOf('00') === 0) digits = digits.slice(2);
  else if (digits.indexOf('0') === 0) digits = '49' + digits.slice(1);
  var waHref = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(CONFIG.message);
  var telHref = 'tel:+' + digits;
  var mapsHref = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(CONFIG.address);
  $$('[data-hf-wa]').forEach(function (a) { a.href = waHref; });
  $$('[data-hf-tel]').forEach(function (a) { a.href = telHref; });
  $$('[data-hf-maps]').forEach(function (a) { a.href = mapsHref; });
  $$('[data-hf-number]').forEach(function (el) { el.textContent = CONFIG.phone; });

  /* ---------- Chat-Elemente ---------- */
  var el = {
    out1: $('[data-hf-show="out1"]'), later: $('[data-hf-show="later"]'), typing: $('[data-hf-show="typing"]'),
    reply: $('[data-hf-show="reply"]'), out2: $('[data-hf-show="out2"]'),
    msg: $('[data-hf-msg]'), msg2: $('[data-hf-msg2]'), replyTx: $('[data-hf-reply]'),
    tick1: $('[data-hf-tick1]'), field: $('[data-hf-field]'), input: $('[data-hf-input]'), caret: $('[data-hf-caret]'),
    send: $('[data-hf-send]'), stage: $('[data-hf-stage]')
  };
  el.msg.textContent = CONFIG.message;
  el.replyTx.textContent = CONFIG.reply;
  el.msg2.textContent = CONFIG.followUp;

  var clk = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' });
  function updateClocks() {
    var now = Date.now();
    $$('[data-hf-clock]').forEach(function (n) { n.textContent = clk.format(new Date(now)); });
    $$('[data-hf-clock-later]').forEach(function (n) { n.textContent = clk.format(new Date(now + 2.25 * 3600000)); });
  }

  // seq: 0 tippen · 1 gesendet · 2 „später“ · 3 Hof tippt · 4 Antwort · 5 tippen · 6 gesendet
  function show(seq, typed) {
    el.out1.hidden = seq < 1;
    el.later.hidden = seq < 2;
    el.typing.hidden = seq !== 3;
    el.reply.hidden = seq < 4;
    el.out2.hidden = seq < 6;
    el.tick1.classList.toggle('read', seq >= 2);
    var text = seq === 0 ? CONFIG.message : seq === 5 ? CONFIG.followUp : '';
    var typing = (seq === 0 || seq === 5) && typed > 0;
    el.input.textContent = typing ? text.slice(0, typed) : 'Nachricht';
    el.field.classList.toggle('ph', !typing);
    el.caret.hidden = !typing;
    if (seq === 1 || seq === 6) { el.send.classList.remove('go1'); void el.send.offsetWidth; el.send.classList.add('go1'); }
  }

  var timers = [], tick = 0;
  function clearT() { timers.forEach(clearTimeout); timers = []; if (tick) clearInterval(tick); tick = 0; }
  function later(ms, fn) { timers.push(setTimeout(fn, ms)); }
  function typeText(seq, text, done) {
    var n = 0;
    tick = setInterval(function () {
      n += 2;
      if (n >= text.length) { clearInterval(tick); tick = 0; show(seq, text.length); done(); }
      else show(seq, n);
    }, 34);
  }
  function run() {
    clearT();
    updateClocks();
    if (reduce) { show(6, 0); return; }
    show(0, 0);
    later(400, function () {
      typeText(0, CONFIG.message, function () {
        later(350, function () { show(1, 0); });
        later(1300, function () { show(2, 0); });
        later(2000, function () { show(3, 0); });
        later(3300, function () { show(4, 0); });
        later(4700, function () {
          show(5, 0);
          later(60, function () { typeText(5, CONFIG.followUp, function () { later(300, function () { show(6, 0); }); }); });
        });
      });
    });
  }
  updateClocks();
  setInterval(updateClocks, 30000);
  if (reduce) show(6, 0); else show(0, 0);

  /* ---------- Knöpfe ↔ Handy ---------- */
  var headSub = $('[data-hf-headsub]'), headPin = $('[data-hf-headpin]');
  function setHl(v) {
    root.classList.remove('hl-wa', 'hl-tel', 'hl-route');
    if (v) root.classList.add('hl-' + v);
    headSub.textContent = v === 'route' ? 'Dahl bei Paderborn' : 'Pilze ab Hof';
    headPin.hidden = v !== 'route';
  }
  $$('[data-hf-hl]').forEach(function (a) {
    var v = a.getAttribute('data-hf-hl');
    a.addEventListener('mouseenter', function () { setHl(v); });
    a.addEventListener('mouseleave', function () { setHl(''); });
    a.addEventListener('focus', function () { setHl(v); });
    a.addEventListener('blur', function () { setHl(''); });
  });

  /* ---------- Nummer kopieren ---------- */
  var copyBtn = $('[data-hf-copy]'), copyT = 0;
  if (copyBtn) copyBtn.addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.writeText) return;
    navigator.clipboard.writeText(CONFIG.phone).then(function () {
      copyBtn.classList.add('ok');
      clearTimeout(copyT);
      copyT = setTimeout(function () { copyBtn.classList.remove('ok'); }, 1600);
    }).catch(function () {});
  });

  /* ---------- Live-Hinweis: nächster Markttag ---------- */
  var mkLink = $('[data-hf-market]'), mkText = $('[data-hf-market-text]');
  var partFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', hour12: false });
  var DOW = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  var DAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
  function updateMarket() {
    var parts = {};
    partFmt.formatToParts(new Date()).forEach(function (x) { parts[x.type] = x.value; });
    var dow = DOW[parts.weekday] || 0, h = (+parts.hour) % 24, m = CONFIG.market, open = false, text;
    if (dow === m.day && h >= m.startHour && h < m.endHour) { open = true; text = 'Heute Markttag – bis ' + m.endHour + ' Uhr in ' + m.places; }
    else if (dow === m.day && h < m.startHour) text = 'Heute Markttag: ab ' + m.startHour + ' Uhr in ' + m.places;
    else {
      var d = (m.day - dow + 7) % 7; if (d === 0) d = 7;
      text = 'Nächster Markttag: ' + DAYS[m.day] + ' ' + m.startHour + '–' + m.endHour + ' Uhr · ' + (d === 1 ? 'morgen' : 'in ' + d + ' Tagen');
    }
    mkText.textContent = text;
    mkLink.classList.toggle('open', open);
  }
  updateMarket();
  setInterval(updateMarket, 60000);

  /* ---------- Parallax + Start-Check (ein rAF-Loop) ---------- */
  var p = { tx: 0, ty: 0, cx: 0, cy: 0, hover: false }, lastT = 0, started = false, left = false, raf = 0, active = true;
  root.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = root.getBoundingClientRect();
    p.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    p.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    p.hover = true;
  });
  root.addEventListener('pointerleave', function () { p.hover = false; });

  function loop(t) {
    var dt = lastT ? Math.min(0.1, (t - lastT) / 1000) : 0.016;
    lastT = t;
    var r = root.getBoundingClientRect(), vh = window.innerHeight || 1;
    var near = r.bottom > -200 && r.top < vh + 200;
    if (!reduce && near) {
      if (!p.hover) { p.tx = Math.sin(t / 2800) * 0.35; p.ty = Math.cos(t / 3400) * 0.22; }
      var k = 1 - Math.exp(-dt / 0.3);
      p.cx += (p.tx - p.cx) * k; p.cy += (p.ty - p.cy) * k;
      var sy = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      root.style.setProperty('--px', p.cx.toFixed(4));
      root.style.setProperty('--py', p.cy.toFixed(4));
      root.style.setProperty('--sy', sy.toFixed(4));
    }
    // Chat startet, sobald das Handy gut zur Hälfte im Bild ist; beim Wiederkommen erneut
    var s = el.stage.getBoundingClientRect();
    var visH = Math.min(s.bottom, vh) - Math.max(s.top, 0);
    var inView = visH > 0 && visH >= Math.min(s.height * 0.5, vh * 0.5);
    if (inView && !started) { started = true; run(); }
    else if (inView && left) { left = false; run(); }
    if (visH <= 0 && started) left = true;
    raf = active ? requestAnimationFrame(loop) : 0;
  }
  raf = requestAnimationFrame(loop);

  /* Website-Ergänzung: Loop ruht, solange die Sektion weit außerhalb des Bildes ist (README Abschnitt 8).
     Wer die Sektion so verlässt, sieht den Chat beim Zurückkommen neu – wie im Original. */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      active = en[0].isIntersecting;
      if (!active && started) left = true;
      if (active && !raf) { lastT = 0; raf = requestAnimationFrame(loop); }
    }, { rootMargin: '200px 0px' }).observe(root);
  }
})();
