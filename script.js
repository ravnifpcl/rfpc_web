/* ========================================
   RAVNI FARMERS PRODUCER COMPANY LIMITED
   Premium Website JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ──────────────────────────────────────
  // 1. PRELOADER HIDING
  // ──────────────────────────────────────
  const preloader = document.getElementById('preloader');
  
  const hidePreloader = () => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // Hide when window has fully loaded
  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 600); // smooth initial view
  });

  // Safe fallback to guarantee preloader disappears after max 3.5 seconds
  setTimeout(hidePreloader, 3500);


  // ──────────────────────────────────────
  // 2. NAVBAR SCROLL EFFECT & SCROLL SPY
  // ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const handleNavbarState = () => {
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll spy for active navigation highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && (href === `#${current}` || href.endsWith(`#${current}`))) {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleNavbarState);
  handleNavbarState(); // Initial run


  // ──────────────────────────────────────
  // 3. RESPONSIVE MOBILE MENU (HAMBURGER)
  // ──────────────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburger && navLinksContainer && mobileOverlay) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
      mobileOverlay.classList.toggle('visible');
      if (navLinksContainer.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    hamburger.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);

    // Close menu when clicking navigation links (with dropdown support for mobile)
    const links = navLinksContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.classList.contains('dropdown-trigger') && window.innerWidth <= 992) {
          e.preventDefault();
          const parent = link.closest('.nav-dropdown');
          if (parent) {
            parent.classList.toggle('open');
          }
          return;
        }
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
        mobileOverlay.classList.remove('visible');
        document.body.style.overflow = '';
      });
    });
  }


  // ──────────────────────────────────────
  // 4. HERO SLIDESHOW SLIDER
  // ──────────────────────────────────────
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      if (slides[index]) slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      currentSlide = index;
    };

    const nextSlide = () => {
      let next = (currentSlide + 1) % slides.length;
      showSlide(next);
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 5000); // Transition every 5s
    };

    const stopSlideShow = () => {
      clearInterval(slideInterval);
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopSlideShow();
        showSlide(index);
        startSlideShow();
      });
    });

    startSlideShow();
  }


  // ──────────────────────────────────────
  // 5. ANIMATED STATISTICS COUNTER
  // ──────────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds counting animation
      const stepTime = 30;
      const steps = duration / stepTime;
      const stepValue = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, stepTime);
    };

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    statNumbers.forEach(num => observer.observe(num));
  }


  // ──────────────────────────────────────
  // 6. PRODUCT FILTER & INFINITE MARQUEE
  // ──────────────────────────────────────
  const track = document.getElementById('products-scroll-track');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (track) {
    // Retain a master list of all original, unique product cards
    const originalCards = Array.from(track.querySelectorAll('.product-card'));

    // Helper to configure navigation & Enquiry triggers
    const setupCardEvents = (card) => {
      // Direct click on product card triggers detail page
      card.addEventListener('click', (e) => {
        const enquiryBtn = card.querySelector('.enquiry-btn');
        if (enquiryBtn && enquiryBtn.contains(e.target)) {
          return; // Ignore card wrapper click if Enquiry button was explicitly targeted
        }
        const href = card.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        }
      });

      // Enquiry button fills form with selected product and scrolls down
      const enquiryBtn = card.querySelector('.enquiry-btn');
      if (enquiryBtn) {
        enquiryBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const productName = enquiryBtn.getAttribute('data-product');
          const productSelect = document.getElementById('product');
          const contactSection = document.getElementById('contact');
          
          if (productSelect) {
            productSelect.value = productName;
          }
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    };

    // Filter application logic
    const applyProductFilter = (filterValue) => {
      track.innerHTML = ''; // Reset container content

      const filteredCards = originalCards.filter(card => {
        if (filterValue === 'all') return true;
        return card.getAttribute('data-category') === filterValue;
      });

      if (filteredCards.length === 0) return;

      // 1st Set (Unique elements)
      filteredCards.forEach(card => {
        const clone = card.cloneNode(true);
        setupCardEvents(clone);
        track.appendChild(clone);
      });

      // 2nd Set (Duplicates to create seamless infinite scrolling transition)
      filteredCards.forEach(card => {
        const clone = card.cloneNode(true);
        setupCardEvents(clone);
        track.appendChild(clone);
      });

      // Dynamically modify marquee duration to keep consistent linear speed
      const totalCount = filteredCards.length;
      const speedDuration = Math.max(totalCount * 3.5, 12); // ~3.5s per item
      track.style.setProperty('--scroll-duration', `${speedDuration}s`);
    };

    // Initial Marquee Setup
    applyProductFilter('all');

    // Filter button trigger events
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        applyProductFilter(filterVal);
      });
    });
  }


  // ──────────────────────────────────────
  // 7. VIDEO REELS SYNCHRONISATION
  // ──────────────────────────────────────
  const galleryVideos = document.querySelectorAll('.video-grid video');
  
  if (galleryVideos.length > 0) {
    galleryVideos.forEach((video, index) => {
      // Play next video in loop when current ends
      video.addEventListener('ended', () => {
        const nextIndex = (index + 1) % galleryVideos.length;
        galleryVideos.forEach(v => v.pause());
        if (galleryVideos[nextIndex]) {
          galleryVideos[nextIndex].play().catch(err => {
            console.log('Autoplay block on sequential video loop:', err);
          });
        }
      });

      // Pause all other active videos when a manual play starts
      video.addEventListener('play', () => {
        galleryVideos.forEach((v, i) => {
          if (i !== index) {
            v.pause();
          }
        });
      });
    });
  }


  // ──────────────────────────────────────
  // 8. CONTACT FORM SUBMISSION
  // ──────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Enquiry...';
      submitBtn.disabled = true;

      // Simulate network request delays
      setTimeout(() => {
        // Build modern floating success toast
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        toast.style.backgroundColor = 'var(--clr-primary-dark, #0B3D20)';
        toast.style.color = '#ffffff';
        toast.style.padding = '16px 32px';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
        toast.style.zIndex = '100000';
        toast.style.fontFamily = 'var(--ff-body, sans-serif)';
        toast.style.fontWeight = '600';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '12px';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.innerHTML = '<span style="font-size: 1.2rem;">🌾</span> Enquiry Submitted Successfully! We will respond shortly.';
        
        document.body.appendChild(toast);
        
        // Force reflow and slide in
        setTimeout(() => {
          toast.style.opacity = '1';
          toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 50);

        // Reset form controls
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Dismiss Toast
        setTimeout(() => {
          toast.style.opacity = '0';
          toast.style.transform = 'translateX(-50%) translateY(-20px)';
          setTimeout(() => toast.remove(), 500);
        }, 4000);
      }, 1200);
    });
  }


  // ──────────────────────────────────────
  // 9. BACK TO TOP BUTTON
  // ──────────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
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
  }


  // ──────────────────────────────────────
  // 10. SCROLL REVEAL ANIMATIONS
  // ──────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (revealElements.length > 0) {
    const checkScrollReveal = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Trigger reveal when element is 85% visible from viewport bottom
        if (rect.top <= windowHeight * 0.88) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', checkScrollReveal);
    // Execute on initialization
    setTimeout(checkScrollReveal, 400); 
  }
});


// ──────────────────────────────────────
// 11. GLOBAL LIGHTBOX (For index.html elements)
// ──────────────────────────────────────
window.openLightbox = function(card) {
  const img = card.querySelector('img');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightbox = document.getElementById('lightbox');
  
  if (img && lightboxImg && lightbox) {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function(e) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    // Close only when clicking overlay background or the close button
    if (!e || e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});
