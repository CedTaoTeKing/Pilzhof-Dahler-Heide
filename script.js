/* ═══════════════════════════════════════════════════════════════
   PILZHOF DAHLER HEIDE – INTERACTIVE SCRIPTS
   Scroll animations, navigation, recipe toggles, parallax
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── SCROLL REVEAL OBSERVER ───
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  // ─── STICKY HEADER ───
  const header = document.getElementById('site-header');
  let lastScrollY = 0;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check


  // ─── MOBILE NAVIGATION ───
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on backdrop click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  // ─── SMOOTH SCROLL WITH OFFSET ───
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });


  // ─── ACTIVE NAV HIGHLIGHTING ───
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinksAll.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'rgba(245, 241, 232, 1)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });


  // ─── HERO PARALLAX ───
  const heroBg = document.querySelector('.hero-bg-img');

  function heroParallax() {
    if (heroBg && window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      heroBg.style.transform = `scale(1.05) translateY(${offset}px)`;
    }
  }

  window.addEventListener('scroll', heroParallax, { passive: true });


  // ─── PROCESS SECTION — SCROLL CONTROLLER ───
  (function initProcessSection() {
    const section = document.getElementById('process');
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const phasesContainer = document.getElementById('process-phases');
    const svg = document.getElementById('process-network');

    // ── Build Dynamic SVG Network ──
    function buildNetwork() {
      if (!svg || !phasesContainer) return;
      const markers = phasesContainer.querySelectorAll('.node-marker');
      if (markers.length < 3) return;

      const containerRect = phasesContainer.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

      // Get marker centers relative to the phases container
      function markerCenter(marker) {
        const r = marker.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top
        };
      }

      const p1 = markerCenter(markers[0]);
      const p2 = markerCenter(markers[1]);
      const p3 = markerCenter(markers[2]);

      svg.innerHTML = '';

      // Helper: create path with classes
      function makePath(d, classes, id) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'none');
        if (id) path.id = id;
        classes.forEach(c => path.classList.add(c));
        svg.appendChild(path);
        const len = path.getTotalLength();
        path.style.setProperty('--path-len', len);
        path.setAttribute('stroke-dasharray', len);
        path.setAttribute('stroke-dashoffset', len);
        return path;
      }

      // Helper: create dot
      function makeDot(cx, cy, r, opacity) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', `rgba(197,179,88,${opacity})`);
        circle.classList.add('mycelium-dot');
        svg.appendChild(circle);
        return circle;
      }

      // ── Path 1→2: organic S-curve ──
      const mid12x = (p1.x + p2.x) / 2;
      const mid12y = (p1.y + p2.y) / 2;
      const cp1a = { x: p1.x + 60, y: p1.y + (mid12y - p1.y) * 0.5 };
      const cp1b = { x: p2.x - 80, y: p2.y - (p2.y - mid12y) * 0.6 };
      const d12 = `M${p1.x},${p1.y} C${cp1a.x},${cp1a.y} ${cp1b.x},${cp1b.y} ${p2.x},${p2.y}`;

      // Glow layer first (behind)
      makePath(d12, ['mycelium-glow'], 'glow-1-2');
      // Main line
      makePath(d12, ['mycelium-main'], 'main-1-2');

      // Branches from path 1→2 midpoint
      const branchMid = { x: mid12x, y: mid12y };
      makePath(
        `M${branchMid.x},${branchMid.y} C${branchMid.x - 40},${branchMid.y + 20} ${branchMid.x - 80},${branchMid.y + 15} ${branchMid.x - 100},${branchMid.y + 30}`,
        ['mycelium-branch'], 'branch-1a'
      );
      makePath(
        `M${branchMid.x},${branchMid.y} C${branchMid.x + 30},${branchMid.y - 25} ${branchMid.x + 60},${branchMid.y - 30} ${branchMid.x + 80},${branchMid.y - 20}`,
        ['mycelium-branch'], 'branch-1b'
      );

      // ── Path 2→3: warmer organic curve toward Telos ──
      const cp2a = { x: p2.x - 40, y: p2.y + (p3.y - p2.y) * 0.4 };
      const cp2b = { x: p3.x + 60, y: p3.y - (p3.y - p2.y) * 0.3 };
      const d23 = `M${p2.x},${p2.y} C${cp2a.x},${cp2a.y} ${cp2b.x},${cp2b.y} ${p3.x},${p3.y}`;

      makePath(d23, ['mycelium-glow', 'mycelium-glow--telos'], 'glow-2-3');
      makePath(d23, ['mycelium-main', 'mycelium-main--telos'], 'main-2-3');

      // Branches from path 2→3
      const mid23 = { x: (p2.x + p3.x) / 2, y: (p2.y + p3.y) / 2 };
      makePath(
        `M${mid23.x},${mid23.y} C${mid23.x + 50},${mid23.y + 15} ${mid23.x + 90},${mid23.y + 10} ${mid23.x + 110},${mid23.y + 25}`,
        ['mycelium-branch'], 'branch-2a'
      );
      makePath(
        `M${mid23.x},${mid23.y} C${mid23.x - 35},${mid23.y - 20} ${mid23.x - 70},${mid23.y - 25} ${mid23.x - 90},${mid23.y - 15}`,
        ['mycelium-branch'], 'branch-2b'
      );

      // Extra branches emanating from node 1
      makePath(
        `M${p1.x},${p1.y} C${p1.x - 50},${p1.y + 30} ${p1.x - 80},${p1.y + 25} ${p1.x - 100},${p1.y + 40}`,
        ['mycelium-branch'], 'branch-origin-a'
      );
      // Extra branches emanating from node 3 (Telos)
      makePath(
        `M${p3.x},${p3.y} C${p3.x + 50},${p3.y + 25} ${p3.x + 90},${p3.y + 30} ${p3.x + 110},${p3.y + 20}`,
        ['mycelium-branch'], 'branch-telos-a'
      );
      makePath(
        `M${p3.x},${p3.y} C${p3.x - 40},${p3.y + 30} ${p3.x - 80},${p3.y + 35} ${p3.x - 100},${p3.y + 25}`,
        ['mycelium-branch'], 'branch-telos-b'
      );

      // Junction dots
      makeDot(p1.x, p1.y, 3, 0.15);
      makeDot(p2.x, p2.y, 3, 0.15);
      makeDot(p3.x, p3.y, 4, 0.25);
      makeDot(branchMid.x, branchMid.y, 1.5, 0.08);
      makeDot(mid23.x, mid23.y, 1.5, 0.1);
      makeDot(branchMid.x - 100, branchMid.y + 30, 1.5, 0.06);
      makeDot(p3.x + 110, p3.y + 20, 1.5, 0.06);
    }

    // Build after layout is settled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        buildNetwork();
      });
    });

    // Rebuild on resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildNetwork, 300);
    }, { passive: true });

    if (prefersReducedMotion) {
      section.querySelectorAll('.hook-line, .process-hook-sub, .process-phase-label, .process-cta-wrap').forEach(el => el.classList.add('revealed'));
      section.querySelectorAll('.process-node').forEach(el => el.classList.add('phase-active'));
      svg.querySelectorAll('.mycelium-main, .mycelium-glow, .mycelium-branch').forEach(p => p.classList.add('drawn'));
      svg.querySelectorAll('.mycelium-dot').forEach(d => d.classList.add('visible'));
      return;
    }

    // ── Hook Lines — Sequential Reveal ──
    const hookLines = section.querySelectorAll('.hook-line');
    const hookSub = section.querySelector('.process-hook-sub');

    const hookObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
          const order = parseInt(entry.target.dataset.reveal) || 1;
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, (order - 1) * 300);
          hookObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

    hookLines.forEach(line => hookObserver.observe(line));
    if (hookSub) hookObserver.observe(hookSub);

    // ── Phase Label Reveal ──
    const phaseLabel = section.querySelector('.process-phase-label');
    if (phaseLabel) {
      const labelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            labelObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5, rootMargin: '0px 0px -40px 0px' });
      labelObserver.observe(phaseLabel);
    }

    // ── Phase Nodes — Sequential Activation + Connector Drawing ──
    const nodes = section.querySelectorAll('.process-node');
    const connectorGroups = {
      1: ['glow-1-2', 'main-1-2', 'branch-1a', 'branch-1b', 'branch-origin-a'],
      2: ['glow-2-3', 'main-2-3', 'branch-2a', 'branch-2b'],
      3: ['branch-telos-a', 'branch-telos-b']
    };

    const nodeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('phase-active')) {
          const phase = parseInt(entry.target.dataset.phase);
          entry.target.classList.add('phase-active');

          // Draw connectors for this phase
          const ids = connectorGroups[phase] || [];
          ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.classList.add('drawn'), 150);
          });

          // Show dots when phase 1 or 3 activates
          if (phase === 1 || phase === 3) {
            svg.querySelectorAll('.mycelium-dot').forEach(d => {
              setTimeout(() => d.classList.add('visible'), 600);
            });
          }

          nodeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach(node => nodeObserver.observe(node));

    // ── CTA Reveal ──
    const cta = section.querySelector('.process-cta-wrap');
    if (cta) {
      const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            ctaObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      ctaObserver.observe(cta);
    }
  })();


  // ─── BABA CARD TILT EFFECT ───
  const babaCards = document.querySelectorAll('.baba-card');

  babaCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ─── RECIPE CARD IMAGE HOVER GLOW ───
  const recipeCards = document.querySelectorAll('.recipe-card');

  recipeCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(197, 179, 88, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });


  // ─── CINEMATIC VIDEO PLAYER ───
  const filmVideo = document.getElementById('film-video');
  const filmOverlay = document.getElementById('film-play-overlay');
  const filmPlayBtn = document.getElementById('film-play-btn');

  if (filmVideo && filmOverlay) {
    // Play on overlay click
    filmOverlay.addEventListener('click', () => {
      filmVideo.play();
      filmOverlay.classList.add('hidden');
      filmVideo.setAttribute('controls', 'true');
    });

    // Pause → show overlay again
    filmVideo.addEventListener('pause', () => {
      if (!filmVideo.ended) {
        filmOverlay.classList.remove('hidden');
        filmVideo.removeAttribute('controls');
      }
    });

    // Video ended → reset overlay
    filmVideo.addEventListener('ended', () => {
      filmOverlay.classList.remove('hidden');
      filmVideo.removeAttribute('controls');
      filmVideo.currentTime = 0;
    });

    // Click on video to pause
    filmVideo.addEventListener('click', () => {
      if (!filmVideo.paused) {
        filmVideo.pause();
      }
    });
  }

  // ─── FORM SUBMISSION (WEB3FORMS) ───
  window.submitForm = async function (event, formElement) {
    event.preventDefault();
    const form = formElement || event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Success feedback
        submitBtn.textContent = 'Erfolgreich gesendet!';
        submitBtn.style.backgroundColor = 'var(--forest-600)';
        form.reset();

        // Optional: Close modal if it's the event form
        if (form.id === 'event-form') {
          setTimeout(() => {
            closeEventModal();
            // Reset button after closing
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.style.backgroundColor = '';
          }, 2000);
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      submitBtn.textContent = 'Fehler beim Senden';
      submitBtn.style.backgroundColor = '#d44007';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.style.backgroundColor = '';
      }, 3000);
    }
  };

  // Event specifically for the event modal form in the HTML onsubmit attribute
  window.submitEventForm = function (event) {
    window.submitForm(event);
  };

  // ─── MODAL CONTROLS ───
  const eventModal = document.getElementById('event-modal');

  window.openEventModal = function () {
    if (eventModal) {
      eventModal.classList.add('open');
      eventModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeEventModal = function () {
    if (eventModal) {
      eventModal.classList.remove('open');
      eventModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Close modal on escape or backdrop click
  if (eventModal) {
    eventModal.addEventListener('click', (e) => {
      if (e.target === eventModal) closeEventModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && eventModal.classList.contains('open')) {
        closeEventModal();
      }
    });
  }

})();

// ─── RECIPE TOGGLE (GLOBAL) ───
function toggleRecipe(button) {
  const expanded = button.nextElementSibling;
  const isOpen = expanded.classList.toggle('open');
  button.setAttribute('aria-expanded', isOpen);
  button.textContent = isOpen ? 'Rezept schließen' : 'Jetzt nachkochen';
}


