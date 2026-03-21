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


  // ─── TIMELINE STEP COUNTER ANIMATION ───
  const timelineSteps = document.querySelectorAll('.timeline-step');

  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineSteps.forEach((step) => stepObserver.observe(step));


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


