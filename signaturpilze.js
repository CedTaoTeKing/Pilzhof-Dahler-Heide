/* ═══════════════════════════════════════════════════════════════
   SIGNATURPILZE · 3D-Karussell, Parallax, Einflug (Vanilla JS)
   Basis: Claude-Design-Export „pilzhof-signaturpilze.zip“, für die Website erweitert:
   - Pilze, Namen und Lichtfarben kommen aus dem HTML (Reihenfolge der Karten, data-glow).
     Ein neuer Pilz braucht nur HTML: Karte + Tab + Detail (+ Sortiment-Karte), alle mit gleichem Schlüssel.
   - Gewechselt wird per Klick/Tipp auf eine hintere Karte (pulsierender Punkt zeigt, wo), Pfeile, Tabs,
     Tastatur oder Wischen. Das Mausrad scrollt immer die Seite. Nach dem ersten Wechsel ruht der Puls (.pz-used).
   - Einflug beim ersten Sichtkontakt: Bühne steigt auf, Karten fächern aus, Text schärft sich,
     Myzel zeichnet sich, Gold-Impuls zum Abschluss. Sortiment-Karten richten sich gestaffelt auf.
   - prefers-reduced-motion: kein Einflug, keine Parallax – alles sofort ruhig sichtbar.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var root = document.querySelector('[data-pz-signature]');
  if (!root) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stageWrap = root.querySelector('.stage-wrap');
  var glow = root.querySelector('[data-glow]');
  var num = root.querySelector('[data-num]');
  var total = root.querySelector('[data-total]');
  var live = root.querySelector('[data-live]');
  var prevBtn = root.querySelector('[data-prev]');
  var nextBtn = root.querySelector('[data-next]');
  var cards = [].slice.call(root.querySelectorAll('[data-card]'));
  var tabs = root.querySelectorAll('[data-tab]');
  var details = root.querySelectorAll('[data-detail]');
  var segs = root.querySelectorAll('[data-seg]');

  var KEYS = cards.map(function (c) { return c.dataset.card; });
  var N = KEYS.length;
  var ai = 0, switches = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function nameOf(key) {
    var t = root.querySelector('[data-tab="' + key + '"]');
    return t && t.lastElementChild ? t.lastElementChild.textContent : key;
  }
  // data-glow="R,G,B,Alpha" → weicher Lichthof hinter der Bühne
  function glowOf(card) {
    var p = (card.dataset.glow || '185,139,94,0.55').split(',');
    var rgb = p.slice(0, 3).join(',');
    return 'radial-gradient(circle, rgba(' + rgb + ',' + p[3] + '), rgba(' + rgb + ',0) 70%)';
  }

  function render() {
    var cur = KEYS[ai];
    cards.forEach(function (c, i) {
      var rel = (i - ai + N) % N;
      var pos = rel === 0 ? 'pos-front' : rel === 1 ? 'pos-right' : rel === N - 1 ? 'pos-left' : 'pos-back';
      c.classList.remove('pos-front', 'pos-right', 'pos-left', 'pos-back');
      c.classList.add(pos);
      c.setAttribute('aria-pressed', rel === 0);
      c.tabIndex = pos === 'pos-back' ? -1 : 0;
    });
    tabs.forEach(function (t) { var on = t.dataset.tab === cur; t.classList.toggle('is-active', on); t.setAttribute('aria-pressed', on); });
    details.forEach(function (d) { d.classList.toggle('is-active', d.dataset.detail === cur); });
    segs.forEach(function (s) { s.classList.toggle('on', KEYS.indexOf(s.dataset.seg) <= ai); });
    num.textContent = pad(ai + 1);
    live.textContent = nameOf(cur);
    glow.style.background = glowOf(cards[ai]);
    prevBtn.disabled = ai === 0;
    nextBtn.disabled = ai === N - 1;
  }

  // fx-a / fx-b wechseln sich ab, damit die Wechsel-Keyframes bei jedem Wechsel neu starten.
  // Sitzt auf .stage-wrap, weil der Puls in der Hintergrund-Ebene (.stage-back) liegt.
  function fire() {
    switches++;
    stageWrap.classList.remove('fx-a', 'fx-b');
    stageWrap.classList.add(switches % 2 ? 'fx-a' : 'fx-b');
  }

  function go(i) {
    if (i < 0 || i >= N || i === ai) return;
    ai = i;
    root.classList.add('pz-used');          // Prinzip verstanden → Hinweis-Puls ruht
    fire();
    render();
  }

  if (total) total.textContent = pad(N);
  render();

  /* Klick auf die Bühne: Alles links der vorderen Karte holt die linke, alles rechts die rechte Karte nach vorn.
     Bewusst über die Position statt über das angeklickte Element – Safari meldet in 3D-Szenen
     nicht zuverlässig, welche Karte getroffen wurde. Tastatur (Enter/Leertaste auf einer Karte) geht direkt. */
  stageWrap.addEventListener('click', function (e) {
    var card = e.target.closest ? e.target.closest('[data-card]') : null;
    if (card === cards[ai]) return;
    if (e.detail === 0) { if (card) go(cards.indexOf(card)); return; }
    var r = cards[ai].getBoundingClientRect();
    go(e.clientX < r.left + r.width / 2 ? (ai + N - 1) % N : (ai + 1) % N);
  });
  tabs.forEach(function (t) { t.addEventListener('click', function () { go(KEYS.indexOf(t.dataset.tab)); }); });
  prevBtn.addEventListener('click', function () { go(ai - 1); });
  nextBtn.addEventListener('click', function () { go(ai + 1); });
  document.querySelectorAll('[data-goto]').forEach(function (a) {
    a.addEventListener('click', function () { go(KEYS.indexOf(a.dataset.goto)); });
  });
  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') go(ai + 1);
    if (e.key === 'ArrowLeft') go(ai - 1);
  });

  /* Swipe */
  var touch = null;
  root.addEventListener('touchstart', function (e) { touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (!touch) return;
    var dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(ai + (dx < 0 ? 1 : -1));
  }, { passive: true });

  if (reduce) return;

  /* Einflug beim ersten Sichtkontakt */
  (function entrance() {
    if (!('IntersectionObserver' in window)) return;
    var sort = document.querySelector('[data-pz-sort]');
    var paths = [].slice.call(root.querySelectorAll('.mycel path:not(.sig)'));

    root.classList.add('pz-pre');
    if (sort) sort.classList.add('pz-pre');
    paths.forEach(function (p) {
      var len = Math.ceil(p.getTotalLength());
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
    });

    // .pz-entering liefert die Staffelung nur für den Einflug – danach reagiert alles wieder ohne Verzögerung
    function enter(el, done) {
      el.classList.add('pz-entering');
      el.classList.remove('pz-pre');
      setTimeout(function () { el.classList.remove('pz-entering'); if (done) done(); }, 2900);
    }

    // Auslöser am Bildschirm statt an der Elementhöhe: startet, sobald die Oberkante ins untere
    // Bildschirmdrittel bzw. -achtel kommt – funktioniert auch, wenn das Element höher als der Bildschirm ist.
    function onEnter(el, margin, cb) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        cb();
      }, { threshold: 0, rootMargin: '0px 0px -' + margin + '% 0px' });
      io.observe(el);
    }
    onEnter(stageWrap, 25, function () {
      // Fotos vorab dekodieren, damit beim ersten Wechsel kein Bild für einen Frame leer bleibt
      cards.forEach(function (c) { var im = c.querySelector('img'); if (im && im.decode) im.decode().catch(function () {}); });
      enter(root, function () {
        paths.forEach(function (p) { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; });
      });
      paths.forEach(function (p) { p.style.strokeDashoffset = '0'; });
      setTimeout(fire, 950);                  // Gold-Impuls, sobald die Karten gelandet sind
    });
    if (sort) onEnter(sort.querySelector('.sort-grid') || sort, 12, function () { enter(sort); });
  })();

  /* Parallax: geglättete Maus (Lerp) + Idle-Bewegung + Scroll-Tiefe */
  var tx = 0, ty = 0, cx = 0, cy = 0, hover = false, visible = true, raf = 0;
  root.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var r = root.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    hover = true;
  });
  root.addEventListener('pointerleave', function () { hover = false; });

  function loop(t) {
    if (!hover) { tx = Math.sin(t / 2600) * 0.35; ty = Math.cos(t / 3100) * 0.22; }
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    var r = root.getBoundingClientRect();
    var vh = window.innerHeight || 1;
    var sy = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
    root.style.setProperty('--px', cx.toFixed(4));
    root.style.setProperty('--py', cy.toFixed(4));
    root.style.setProperty('--sy', sy.toFixed(4));
    raf = visible ? requestAnimationFrame(loop) : 0;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      root.classList.toggle('pz-paused', !visible);   // Endlos-Animationen ruhen außer Sicht (spart Akku)
      if (visible && !raf) raf = requestAnimationFrame(loop);
    }).observe(root);
  }
  raf = requestAnimationFrame(loop);
})();
