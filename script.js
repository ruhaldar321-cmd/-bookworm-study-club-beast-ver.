/* ============================================
   BOOKWORM STUDY CLUB — SCRIPT
   ============================================
   CONFIG — Edit these values easily
   ============================================ */

const CONFIG = {
  BOOK_COUNT: '10,000+',
  TOTAL_SEATS: 120,
  AVAILABLE_SEATS: 34,
  PHONE: '+91 98765 43210',
  EMAIL: 'ruhaldar321@gmail.com',
  ADDRESS: '123 Reading Lane, Quiet District, Baramulla, Jammu & Kashmir',
  OPENING_HOURS: 'Monday – Sunday, 6:00 AM – 10:00 PM',

  /* ─── FORMSPREE ENDPOINT ───
     Replace the placeholder string below with your real Formspree endpoint.

     How to get one (free):
       1. Go to https://formspree.io and create an account.
       2. Create a new form and set the destination email to:
          ruhaldar321@gmail.com
       3. Formspree will give you an endpoint URL that looks like:
          https://formspree.io/f/xxxxxxxx
       4. Paste that URL as the value of FORMSPREE_ENDPOINT below.

     Until this is replaced, the query form will show a friendly
     "not configured yet" message instead of sending. */
  FORMSPREE_ENDPOINT: 'YOUR_FORMSPREE_ENDPOINT_HERE'
};

/* ============================================
   LOADER
   ============================================ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 600);
});

/* ============================================
   NAVBAR
   ============================================ */
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================
   HERO & STATS — populate from CONFIG
   ============================================ */
document.getElementById('heroBooks').textContent = CONFIG.BOOK_COUNT + ' Books';
document.getElementById('heroSeats').textContent = CONFIG.TOTAL_SEATS + ' Study Seats';
document.getElementById('statBooks').textContent = CONFIG.BOOK_COUNT;
document.getElementById('statSeats').textContent = CONFIG.TOTAL_SEATS;
document.getElementById('statAvailable').textContent = CONFIG.AVAILABLE_SEATS;

/* ============================================
   SEAT AVAILABILITY — legend values
   (bar fill animation is triggered in animateStats())
   ============================================ */
const occupiedSeats = CONFIG.TOTAL_SEATS - CONFIG.AVAILABLE_SEATS;

document.getElementById('seatAvailableLegend').textContent = CONFIG.AVAILABLE_SEATS;
document.getElementById('seatOccupiedLegend').textContent = occupiedSeats;

/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealElements = document.querySelectorAll(
  '.section-header, .library-grid, .cafe-layout, .prayer-layout, .amenities-grid, .pricing-grid, .gallery-grid, .about-layout, .testimonials-grid, .faq-list, .contact-layout, .stats-grid, .seat-availability'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ============================================
   FAQ ACCORDION
   ============================================ */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-question').classList.remove('active');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it wasn't active
    if (!isActive) {
      item.classList.add('active');
      button.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ============================================
   GALLERY LIGHTBOX
   ============================================ */
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGalleryIndex = 0;
const galleryImages = [];

galleryItems.forEach((item, index) => {
  const img = item.querySelector('img');
  galleryImages.push({
    src: item.dataset.src || img.src,
    alt: img.alt
  });

  item.addEventListener('click', () => {
    currentGalleryIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightboxImage.src = galleryImages[currentGalleryIndex].src;
  lightboxImage.alt = galleryImages[currentGalleryIndex].alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentGalleryIndex].src;
  lightboxImage.alt = galleryImages[currentGalleryIndex].alt;
}

function showNext() {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentGalleryIndex].src;
  lightboxImage.alt = galleryImages[currentGalleryIndex].alt;
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

/* ============================================
   QUERY / CHAT BOX
   ============================================ */
const queryFab = document.getElementById('queryFab');
const queryModal = document.getElementById('queryModal');
const queryClose = document.getElementById('queryClose');
const queryCancel = document.getElementById('queryCancel');
const queryForm = document.getElementById('queryForm');
const querySubmit = document.getElementById('querySubmit');
const formStatus = document.getElementById('formStatus');
const queryMessage = document.getElementById('queryMessage');
const charCount = document.getElementById('charCount');

// Open / close
queryFab.addEventListener('click', () => {
  queryModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeQueryModal() {
  queryModal.classList.remove('open');
  document.body.style.overflow = '';
  formStatus.textContent = '';
  formStatus.className = 'form-status';
}

queryClose.addEventListener('click', closeQueryModal);
queryCancel.addEventListener('click', closeQueryModal);

queryModal.addEventListener('click', (e) => {
  if (e.target === queryModal) closeQueryModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && queryModal.classList.contains('open')) {
    closeQueryModal();
  }
});

// Character count
queryMessage.addEventListener('input', () => {
  charCount.textContent = queryMessage.value.length + ' / 500';
});

// Form submission
queryForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('queryName').value.trim();
  const email = document.getElementById('queryEmail').value.trim();
  const message = queryMessage.value.trim();

  // Validation
  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.className = 'form-status error';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = 'Please enter a valid email address.';
    formStatus.className = 'form-status error';
    return;
  }

  if (message.length > 500) {
    formStatus.textContent = 'Message must be 500 characters or fewer.';
    formStatus.className = 'form-status error';
    return;
  }

  // Check if endpoint is configured
  if (!CONFIG.FORMSPREE_ENDPOINT || CONFIG.FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT_HERE') {
    formStatus.textContent = 'Query form is not configured yet. Please email us directly at ' + CONFIG.EMAIL;
    formStatus.className = 'form-status error';
    return;
  }

  // Sending state
  querySubmit.disabled = true;
  querySubmit.textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const response = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _replyto: email,
        _subject: 'New Query from Bookworm Study Club Website'
      })
    });

    if (response.ok) {
      formStatus.textContent = 'Your query has been sent successfully. We\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      queryForm.reset();
      charCount.textContent = '0 / 500';

      setTimeout(() => {
        closeQueryModal();
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formStatus.textContent = 'Something went wrong. Please try again.';
    formStatus.className = 'form-status error';
  } finally {
    querySubmit.disabled = false;
    querySubmit.textContent = 'Send Query';
  }
});

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   STAT NUMBER + SEAT BAR ANIMATION
   Both are triggered when the stats section
   scrolls into view.
   ============================================ */
function animateStats() {
  // 1) Count-up animation for the stat numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(el => {
    const text = el.textContent;
    const match = text.match(/^([\d,]+)/);
    if (!match) return;
    const target = parseInt(match[1].replace(/,/g, ''), 10);
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.ceil(target / 40);
    const suffix = text.replace(/[\d,]+/, '');

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current.toLocaleString() + suffix;
    }, 30);
  });

  // 2) Seat availability bar fill animation
  const seatBarFill = document.getElementById('seatBarFill');
  if (seatBarFill) {
    const occupiedPercent = Math.round((occupiedSeats / CONFIG.TOTAL_SEATS) * 100);
    // Reset to 0 before animating so the transition plays
    seatBarFill.style.width = '0%';
    // Use a small rAF delay so the browser registers the reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        seatBarFill.style.width = occupiedPercent + '%';
      });
    });
  }
}

// Trigger stats animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

/* ============================================
   END OF SCRIPT
   ============================================ */
