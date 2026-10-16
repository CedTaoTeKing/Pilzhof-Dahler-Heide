/* ═══════════════════════════════════════════════════════════════
   SECTION 2 – PHILOSOPHIE – Myzel-Generator, Parallax, 3D-Karten
   Läuft unabhängig von script.js. Parallax-Stärke: PARALLAX (0 = aus, 1 = normal, 2 = stark).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  var root = document.getElementById('pf-philo');
  if (!root || root.getAttribute('data-pf-ready')) return;
  root.setAttribute('data-pf-ready', '1');

  /* Einstellungen */
  var PARALLAX = 1; // 0 = aus, 1 = normal, 2 = stark

  var reduce = false;
  try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var amt = reduce ? 0 : PARALLAX;
  var tilt = reduce ? 0 : 1;
  var GOLD = (getComputedStyle(root).getPropertyValue('--pf-gold') || '').trim() || '#C9AE5D';

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function r2(v) { return Math.round(v * 100) / 100; }
  function sm(v) { return v * v * (3 - 2 * v); }
  function rgba(hex, a) {
    var h = String(hex).replace('#', '');
    if (h.length === 3) h = h.replace(/./g, function (x) { return x + x; });
    var n = parseInt(h.slice(0, 6), 16);
    if (isNaN(n)) n = 0xC9AE5D;
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function rng(seed) {
    var s = seed;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }
  function set(el, prop, val) {
    if (!el) return;
    var c = el.__pf || (el.__pf = {});
    if (c[prop] === val) return;
    c[prop] = val;
    el.style[prop] = val;
  }

  /* Myzel-Generator */
  function makeWeb(seed, origins, bounds) {
    var rnd = rng(seed);
    var b = [[], [], [], []];
    var nodes = [];
    var P = [0.12, 0.09, 0.06];
    function grow(x, y, ang, len, dep) {
      var pull = ang, step = 8, n = Math.max(2, Math.round(len / step));
      var d = 'M' + Math.round(x) + ' ' + Math.round(y);
      for (var i = 0; i < n; i++) {
        ang += (rnd() - 0.5) * 0.6 + (pull - ang) * 0.05;
        x += Math.cos(ang) * step;
        y += Math.sin(ang) * step;
        if (x < bounds[0] || x > bounds[2] || y < bounds[1] || y > bounds[3]) break;
        d += 'L' + Math.round(x) + ' ' + Math.round(y);
        if (dep < 3 && i > 1 && rnd() < P[dep]) {
          var side = rnd() < 0.5 ? -1 : 1;
          var rem = (n - i) / n;
          grow(x, y, ang + side * (0.5 + rnd() * 0.7), len * (0.3 + rnd() * 0.3) * (0.5 + rem), dep + 1);
          if (rnd() < 0.4) nodes.push(Math.round(x) + ' ' + Math.round(y));
        }
      }
      b[dep].push(d);
    }
    origins.forEach(function (o) { grow(o[0], o[1], o[2], o[3], 0); });
    return {
      p0: b[0].join(''), p1: b[1].join(''), p2: b[2].join(''), p3: b[3].join(''),
      glow: b[0].join('') + b[1].join(''),
      nodes: nodes.map(function (n) { return 'M' + n + 'm-1.8 0a1.8 1.8 0 1 0 3.6 0a1.8 1.8 0 1 0 -3.6 0'; }).join('')
    };
  }

  var LOW = [-640, -690, 640, 55], HEAD = [-490, -190, 490, 490];
  var COLS = {
    bl: { seed: 101, ox: 650, oy: 700, w: 1300, h: 760, max: 780, kx: 6, ko: 0, ky: 0, low: 1, b: LOW, o: [[0, 0, -1.57, 440], [0, 0, -1.12, 420], [0, 0, -2.02, 380], [0, 0, -0.38, 520], [0, 0, -2.78, 300], [-30, 0, -1.35, 300]] },
    bc: { seed: 202, ox: 650, oy: 700, w: 1300, h: 760, max: 780, kx: 4, ko: 0, ky: 0, low: 1, b: LOW, o: [[0, 0, -1.57, 400], [0, 0, -1.05, 420], [0, 0, -2.09, 420], [0, 0, -0.26, 470], [0, 0, -2.88, 470]] },
    br: { seed: 303, ox: 650, oy: 700, w: 1300, h: 760, max: 780, kx: 6, ko: 0, ky: 0, low: 1, b: LOW, o: [[0, 0, -1.57, 440], [0, 0, -2.02, 420], [0, 0, -1.12, 380], [0, 0, -2.76, 520], [0, 0, -0.36, 300], [30, 0, -1.79, 300]] },
    hl: { seed: 404, ox: 500, oy: 200, w: 1000, h: 700, max: 580, kx: 24, ko: 0.12, ky: 10, low: 0, b: HEAD, o: [[0, 0, 1.57, 340], [0, 0, 0.62, 460], [0, 0, 0.1, 520], [0, 0, 2.45, 300], [0, 0, -2.5, 170], [0, 0, 3.05, 240]] },
    hr: { seed: 505, ox: 500, oy: 200, w: 1000, h: 700, max: 580, kx: 18, ko: 0.09, ky: 8, low: 0, b: HEAD, o: [[0, 0, 1.57, 340], [0, 0, 2.52, 460], [0, 0, 3.04, 520], [0, 0, 0.69, 300], [0, 0, -0.64, 170], [0, 0, 0.09, 240]] }
  };

  /* Kleine Pilze unten */
  var T = {
    classic: [64, 96, '<path class="f" d="M25 94 C 24 78, 26 62, 26 50 L 38 50 C 38 62, 40 78, 39 94 C 34 96, 30 96, 25 94 Z"/><path class="l" d="M26 60 C 30 63, 34 63, 38 60"/><path class="f" d="M6 52 C 6 30, 18 16, 32 16 C 46 16, 58 30, 58 52 C 48 56, 16 56, 6 52 Z"/><path class="l" d="M13 51 C 24 48.5, 40 48.5, 51 51"/><circle class="d" cx="24" cy="31" r="2.2"/><circle class="d" cx="38" cy="26" r="1.6"/><circle class="d" cx="45" cy="38" r="1.5"/>'],
    king: [80, 160, '<path class="f" d="M28 156 C 25 124, 32 92, 30 58 L 50 58 C 50 92, 56 124, 52 156 C 45 160, 35 160, 28 156 Z"/><path class="f" d="M10 60 C 12 46, 26 38, 40 38 C 54 38, 68 46, 70 60 C 64 63, 56 60, 50 62 C 44 64, 36 64, 30 62 C 24 60, 16 63, 10 60 Z"/><path class="l" d="M34 63 C 35 72, 36 80, 36 86 M40 64 V 88 M46 63 C 45 72, 44 80, 44 86"/><circle class="d" cx="32" cy="48" r="1.8"/>'],
    button: [48, 64, '<path class="f" d="M19 62 C 18 52, 20 42, 20 36 L 28 36 C 28 42, 30 52, 29 62 C 26 64, 22 64, 19 62 Z"/><path class="f" d="M8 38 C 8 26, 15 20, 24 20 C 33 20, 40 26, 40 38 C 32 41, 16 41, 8 38 Z"/><circle class="d" cx="20" cy="28" r="1.6"/>']
  };
  // [Typ, x-Versatz, Höhe, Wachs-Verzögerung, Wiegen-Dauer, Wiegen-Versatz, gespiegelt]
  var MUSH = {
    bl: [['button', -100, 32, 1.35, 6.2, -1, 1], ['classic', -68, 96, 1.15, 7.4, -3, 0], ['king', -12, 120, 1.25, 8.1, -5, 0], ['button', 42, 44, 1.45, 6.8, -2, 0]],
    bc: [['classic', -46, 64, 1.3, 7, -4, 0], ['button', 2, 40, 1.45, 6.4, -1.5, 0], ['button', 32, 28, 1.6, 7.8, -6, 1]],
    br: [['button', -90, 30, 1.5, 6.6, -2.5, 0], ['king', -64, 136, 1.2, 8.4, -3.5, 0], ['classic', 0, 80, 1.35, 7.2, -0.5, 1], ['button', 50, 38, 1.55, 6, -4.5, 0]]
  };

  var cols = [];
  Object.keys(COLS).forEach(function (k) {
    var d = COLS[k];
    var a = root.querySelector('.pf-back [data-col="' + k + '"]');
    if (!a) return;
    var w = makeWeb(d.seed, d.o, d.b);
    var svg = '<svg class="pf-websvg" viewBox="' + (-d.ox) + ' ' + (-d.oy) + ' ' + d.w + ' ' + d.h + '" width="' + d.w + '" height="' + d.h + '">';
    a.innerHTML = '<div class="pf-move"><div class="pf-webmask" style="left:' + (-d.ox) + 'px;top:' + (-d.oy) + 'px;width:' + d.w + 'px;height:' + d.h + 'px">' +
      svg + '<path class="w0" d="' + w.p0 + '"/><path class="w1" d="' + w.p1 + '"/><path class="g0" d="' + w.p0 + '"/><path class="g1" d="' + w.p1 + '"/><path class="g2" d="' + w.p2 + '"/><path class="g3" d="' + w.p3 + '"/><path class="nd" d="' + w.nodes + '"/></svg>' +
      '<div class="pf-glow"><div class="pf-glow-in">' + svg + '<path class="gl" d="' + w.glow + '"/></svg></div></div></div></div>';
    var front = root.querySelector('.pf-front [data-move="' + k + '"]');
    if (front && MUSH[k]) {
      front.innerHTML = MUSH[k].map(function (m) {
        var t = T[m[0]], h = m[2], wd = Math.round(h * t[0] / t[1]);
        return '<div class="pf-bm" style="left:' + m[1] + 'px"><div class="pf-grow" style="transition-delay:' + m[3] + 's"><div class="pf-sway" style="animation-duration:' + m[4] + 's;animation-delay:' + m[5] + 's">' +
          '<svg class="pf-ms" viewBox="0 0 ' + t[0] + ' ' + t[1] + '" width="' + wd + '" height="' + h + '"' + (m[6] ? ' style="transform:scaleX(-1)"' : '') + '>' + t[2] + '</svg></div></div></div>';
      }).join('');
    }
    cols.push({ d: d, anchor: a, move: a.firstChild, mask: a.querySelector('.pf-webmask'), glow: a.querySelector('.pf-glow'), glowIn: a.querySelector('.pf-glow-in'), front: front, turn: front ? front.querySelector('.pf-mush') : null, x: 0, y: 0, ok: false });
  });

  /* Sporen */
  var rs = rng(11), spores = [], backBox = root.querySelector('[data-spores="back"]'), frontBox = root.querySelector('[data-spores="front"]');
  for (var i = 0; i < 30; i++) {
    var sp = { x: rs() * 100, y: rs() * 100, d: rs(), gold: rs() > 0.42, dur: 8 + rs() * 10, del: -rs() * 12 };
    var el = document.createElement('div');
    el.className = 'pf-spore';
    el.style.left = r2(sp.x) + '%';
    el.style.top = r2(sp.y) + '%';
    var dot = document.createElement('i');
    var sz = (2 + sp.d * 8).toFixed(1) + 'px';
    dot.style.width = sz;
    dot.style.height = sz;
    dot.style.background = sp.gold ? 'var(--pf-gold)' : 'var(--pf-accent)';
    dot.style.opacity = sp.d >= 0.82 ? '0.36' : (0.16 + sp.d * 0.44).toFixed(2);
    dot.style.filter = sp.d > 0.82 ? 'blur(' + ((sp.d - 0.82) * 14).toFixed(1) + 'px)' : (sp.d < 0.25 ? 'blur(1px)' : 'none');
    dot.style.animation = 'pf-float ' + sp.dur.toFixed(1) + 's ease-in-out ' + sp.del.toFixed(1) + 's infinite';
    el.appendChild(dot);
    (sp.d >= 0.82 ? frontBox : backBox).appendChild(el);
    sp.el = el;
    spores.push(sp);
  }

  /* Elemente */
  var head = root.querySelector('.pf-head');
  var spot = root.querySelector('.pf-spot');
  // Licht und Glow-Maske werden einmal gemalt und danach nur per transform verschoben –
  // ein neuer Gradient pro Frame würde jedes Mal die ganze Fläche neu rastern.
  var SR = 700, GR = 210;
  var spotLight = spot.querySelector('.pf-spot-light');
  spotLight.style.background = 'radial-gradient(620px circle at 50% 50%, rgba(255,253,247,0.85), rgba(255,253,247,0) 62%), radial-gradient(980px circle at 50% 50%, ' + rgba(GOLD, 0.09) + ', ' + rgba(GOLD, 0) + ' 70%)';
  var thread = [].slice.call(root.querySelectorAll('.pf-thread [data-k]')).map(function (el) {
    return { el: el, k: el.getAttribute('data-k'), f: parseFloat(el.getAttribute('data-f') || '0'), len: parseFloat(el.getAttribute('data-len') || '0') };
  });
  var hover = -1, hx = 0.5, hy = 0.5;
  var FX = [0.05, -0.035, 0.065, -0.015];
  var cards = [].slice.call(root.querySelectorAll('.pf-rv')).map(function (rv, i) {
    var par = rv.querySelector('.pf-par'), card = rv.querySelector('.pf-card');
    var o = { par: par, card: card, bg: card.querySelector('.pf-card-bg'), glare: card.querySelector('.pf-card-glare'), rx: 0, ry: 0, z: 0, gx: 50, gy: 50, ga: 0, fx: FX[i] || 0 };
    par.addEventListener('mousemove', function (e) {
      var r = par.getBoundingClientRect();
      if (!r.width || !r.height) return;
      hover = i;
      hx = clamp((e.clientX - r.left) / r.width, 0, 1);
      hy = clamp((e.clientY - r.top) / r.height, 0, 1);
      kick();
    });
    par.addEventListener('mouseleave', function () { if (hover === i) hover = -1; kick(); });
    return o;
  });

  /* Zustand */
  var tg = { mx: 0, my: 0, off: 0, gx: 0, gy: 0, spot: 0 };
  var st = { mx: 0, my: 0, off: 0, gx: 0, gy: 0, spot: 0 };
  var vh = window.innerHeight || 900, measured = false, inView = false, inAt = 0, rv = reduce ? 1 : 0, raf = 0, wide = 1;
  if (reduce) { inView = true; root.classList.add('is-in'); }

  function kick() { if (!raf) raf = requestAnimationFrame(frame); }

  function measure() {
    var r = root.getBoundingClientRect();
    vh = window.innerHeight || document.documentElement.clientHeight || 900;
    wide = r.width < 760 ? 0 : 1;
    var off = (r.top + r.height / 2) - vh / 2;
    tg.off = clamp(off, -vh * 1.2, vh * 1.2);
    if (!measured) { st.off = tg.off; measured = true; }
    if (!inView && r.top < vh * 0.82 && r.bottom > vh * 0.1) {
      inView = true;
      inAt = performance.now();
      root.classList.add('is-in');
    }
    cols.forEach(function (c) {
      var q = c.anchor.getBoundingClientRect();
      c.x = q.left - r.left;
      c.y = q.top - r.top;
      c.ok = true;
    });
    kick();
  }

  root.addEventListener('mousemove', function (e) {
    var r = root.getBoundingClientRect();
    if (!r.width || !r.height) return;
    tg.mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    tg.my = ((e.clientY - r.top) / r.height) * 2 - 1;
    tg.gx = e.clientX - r.left;
    tg.gy = e.clientY - r.top;
    if (st.spot < 0.01) { st.gx = tg.gx; st.gy = tg.gy; }
    tg.spot = 1;
    kick();
  });
  root.addEventListener('mouseleave', function () {
    tg.mx = 0; tg.my = 0; tg.spot = 0; hover = -1;
    kick();
  });

  function frame() {
    raf = 0;
    var moving = false;
    function L(a, b, f, eps) {
      var v = a + (b - a) * f;
      if (Math.abs(b - v) < eps) return b;
      moving = true;
      return v;
    }
    st.mx = L(st.mx, tg.mx, 0.07, 0.0005);
    st.my = L(st.my, tg.my, 0.07, 0.0005);
    st.off = L(st.off, tg.off, 0.1, 0.05);
    st.gx = L(st.gx, tg.gx, 0.16, 0.2);
    st.gy = L(st.gy, tg.gy, 0.16, 0.2);
    st.spot = L(st.spot, tg.spot, 0.07, 0.002);
    cards.forEach(function (k, i) {
      var on = hover === i, other = hover >= 0 && !on;
      k.rx = L(k.rx, on ? (0.5 - hy) * 14 : 0, 0.12, 0.01);
      k.ry = L(k.ry, on ? (hx - 0.5) * 16 : 0, 0.12, 0.01);
      k.z = L(k.z, on ? 1 : (other ? -1 : 0), 0.1, 0.002);
      k.gx = L(k.gx, on ? hx * 100 : k.gx, 0.22, 0.05);
      k.gy = L(k.gy, on ? hy * 100 : k.gy, 0.22, 0.05);
      k.ga = L(k.ga, on ? 1 : 0, 0.1, 0.002);
    });
    if (inView && rv < 1) {
      rv = Math.min(1, (performance.now() - inAt) / 4200);
      moving = true;
    }
    render();
    if (moving) kick();
  }

  function render() {
    var off = st.off * amt, mx = st.mx * amt, my = st.my * amt;

    set(head, 'transform', 'perspective(1400px) translate3d(0,' + r2(-off * 0.07) + 'px,0) rotateX(' + r2(-my * 5) + 'deg) rotateY(' + r2(mx * 8) + 'deg)');

    set(spot, 'opacity', String(r2(st.spot)));
    if (st.spot > 0.002) {
      set(spotLight, 'transform', 'translate3d(' + r2(st.gx - SR) + 'px,' + r2(st.gy - SR) + 'px,0)');
    }

    var scrollDraw = amt === 0 ? 1 : clamp(1 - Math.max(0, st.off) / (vh * 0.5), 0, 1);
    var D = Math.min(scrollDraw, sm(clamp((rv * 4200 - 900) / 2800, 0, 1)));
    var m = clamp(D / 0.78, 0, 1);
    thread.forEach(function (t) {
      var g = clamp((D - t.f * 0.78) / 0.22, 0, 1);
      if (t.k === 'm') set(t.el, 'strokeDashoffset', String(r2(t.len * (1 - m))));
      else if (t.k === 'b') set(t.el, 'strokeDashoffset', String(r2(t.len * (1 - g))));
      else if (t.k === 't') set(t.el, 'opacity', g > 0.98 ? '1' : '0');
      else if (t.k === 'n') set(t.el, 'opacity', m >= t.f ? '1' : '0');
      else if (t.k === 's') set(t.el, 'opacity', D > 0.995 ? '1' : '0');
    });

    var G = Math.min(scrollDraw, sm(clamp((rv * 4200 - 200) / 3400, 0, 1)));
    cols.forEach(function (c) {
      var d = c.d;
      var tx = -mx * d.kx, ty = d.low ? 0 : -off * d.ko - my * d.ky;
      var mv = 'translate3d(' + r2(tx) + 'px,' + r2(ty) + 'px,0)';
      set(c.move, 'transform', mv);
      if (c.front) set(c.front, 'transform', d.low ? 'translate3d(' + r2(tx * 1.7) + 'px,0,0)' : mv);
      if (c.turn) set(c.turn, 'transform', 'perspective(900px) rotateY(' + r2(mx * 16) + 'deg)');
      var R = G * (d.max + 150) - 150;
      var mk = R >= d.max ? 'none' : 'radial-gradient(circle at ' + d.ox + 'px ' + d.oy + 'px, #000 ' + r2(Math.max(0, R)) + 'px, rgba(0,0,0,0) ' + r2(Math.max(0, R + 150)) + 'px)';
      set(c.mask, 'webkitMaskImage', mk);
      set(c.mask, 'maskImage', mk);
      set(c.glow, 'opacity', String(r2(st.spot)));
      if (st.spot > 0.002 && c.ok) {
        // Maskenfenster wandert zum Cursor, der Inhalt läuft exakt entgegen und bleibt so deckungsgleich mit dem Netz.
        var wx = r2(st.gx - c.x - tx + d.ox - GR), wy = r2(st.gy - c.y - ty + d.oy - GR);
        set(c.glow, 'transform', 'translate3d(' + wx + 'px,' + wy + 'px,0)');
        set(c.glowIn, 'transform', 'translate3d(' + (-wx) + 'px,' + (-wy) + 'px,0)');
      }
    });

    spores.forEach(function (sp) {
      set(sp.el, 'transform', 'translate3d(' + r2(-mx * sp.d * 38) + 'px,' + r2(-off * (0.55 - sp.d) * 0.7 - my * sp.d * 22) + 'px,0)');
    });

    cards.forEach(function (k) {
      set(k.par, 'transform', 'translate3d(0,' + r2(-off * k.fx * wide) + 'px,0)');
      set(k.card, 'transform', 'perspective(1100px) rotateX(' + r2(k.rx * tilt) + 'deg) rotateY(' + r2(k.ry * tilt) + 'deg) translateZ(' + r2(k.z * 22 * tilt) + 'px)');
      set(k.bg, 'boxShadow', '0 ' + r2(30 + k.z * 18) + 'px ' + r2(64 + k.z * 28) + 'px -30px rgba(31,48,28,' + r2(0.2 + k.z * 0.1) + '), 0 2px 8px rgba(31,48,28,0.04), inset 0 0 0 1px ' + rgba(GOLD, r2(k.ga * 0.5)));
      set(k.glare, 'opacity', String(r2(k.ga)));
      if (k.ga > 0.002) {
        set(k.glare, 'background', 'radial-gradient(200px circle at ' + r2(k.gx) + '% ' + r2(k.gy) + '%, rgba(255,255,255,0.9), rgba(255,255,255,0) 70%), radial-gradient(460px circle at ' + r2(k.gx) + '% ' + r2(k.gy) + '%, ' + rgba(GOLD, 0.18) + ', ' + rgba(GOLD, 0) + ' 70%)');
      }
    });
  }

  window.addEventListener('scroll', measure, { passive: true, capture: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  render();
  setTimeout(measure, 140);
  setTimeout(measure, 800);
})();
