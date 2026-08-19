/* ============================================
   PORTFOLIO — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // CUSTOM CURSOR
  // ==========================================
  const cursor = document.getElementById('cursor');
  let cursorX = 0, cursorY = 0;
  let actualX = 0, actualY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    actualX += (cursorX - actualX) * 0.15;
    actualY += (cursorY - actualY) * 0.15;
    cursor.style.transform = `translate(${actualX - 8}px, ${actualY - 8}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover states
  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const text = el.getAttribute('data-cursor');
      cursor.querySelector('.cursor-text').textContent = text;
      cursor.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursor.querySelector('.cursor-text').textContent = '';
    });
  });

  // Cursor on CTAs and buttons
  document.querySelectorAll('.btn, .showreel-play, .nav-link, .social-link, .client-name, .skill-tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.5)';
      cursor.style.background = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.background = 'var(--accent)';
    });
  });

  // ==========================================
  // NAVIGATION
  // ==========================================
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // SCROLL REVEAL (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the reveal animation
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // HERO ANIMATION (on load)
  // ==========================================
  function animateHero() {
    const heroLines = document.querySelectorAll('.hero-line');
    const heroSub = document.querySelector('.hero-sub');
    const heroRoles = document.querySelectorAll('.hero-role');

    // Reveal lines one by one
    heroLines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('revealed');
      }, 200 + i * 200);
    });

    // Reveal subtitle block
    setTimeout(() => {
      if (heroSub) heroSub.classList.add('revealed');
    }, 800);

    // Reveal roles one by one
    heroRoles.forEach((role, i) => {
      setTimeout(() => {
        role.classList.add('revealed');
      }, 1000 + i * 150);
    });
  }

  // Run hero animation
  setTimeout(animateHero, 300);

  // ==========================================
  // SHOWREEL PARALLAX SCALE
  // ==========================================
  const showreelVideo = document.querySelector('.showreel-video');
  if (showreelVideo) {
    const showreelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.3 });
    showreelObserver.observe(showreelVideo);
  }

  // ==========================================
  // SHOWREEL PLAY BUTTON
  // ==========================================
  const showreelPlay = document.getElementById('showreelPlay');
  if (showreelPlay) {
    showreelPlay.addEventListener('click', () => {
      // Placeholder — replace with actual video play logic
      showreelPlay.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></svg>';
    });
  }

  // ==========================================
  // STATEMENT SECTION REVEAL
  // ==========================================
  const statementLines = document.querySelectorAll('.statement-line');
  const statementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, i * 300);
        statementObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statementLines.forEach(line => statementObserver.observe(line));

  // ==========================================
  // SMOOTH ANCHOR SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // DISCIPLINE CARD HOVER EFFECT
  // ==========================================
  document.querySelectorAll('.discipline-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--accent)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  // ==========================================
  // PROJECT CARD PARALLAX (subtle)
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');
  window.addEventListener('scroll', () => {
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 20;
        const img = card.querySelector('.project-img');
        if (img) {
          img.style.transform = `translateY(${offset}px) scale(1.02)`;
        }
      }
    });
  });

  // ==========================================
  // CURSOR HIDE ON LEAVE
  // ==========================================
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  // ==========================================
  // LOADING STATE
  // ==========================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

});
