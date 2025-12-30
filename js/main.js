/* ============================================
   101 MONROE - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ---------- Navigation Scroll Effect ----------
  const nav = document.querySelector('.nav');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---------- Mobile Menu ----------
  const mobileToggle = document.querySelector('.nav__mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-menu__close');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  
  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileMenu);
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }
  
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---------- Modal ----------
  const modal = document.querySelector('.modal');
  const modalOverlay = document.querySelector('.modal__overlay');
  const modalClose = document.querySelector('.modal__close');
  const modalTriggers = document.querySelectorAll('[data-modal="interest-form"]');
  
  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  // ---------- Lightbox ----------
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox__image');
  const lightboxCaption = document.querySelector('.lightbox__caption');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxPrev = document.querySelector('.lightbox__nav--prev');
  const lightboxNext = document.querySelector('.lightbox__nav--next');
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  
  let currentLightboxIndex = 0;
  let lightboxImages = [];
  
  // Collect all lightbox images
  galleryItems.forEach((item, index) => {
    lightboxImages.push({
      src: item.dataset.lightbox,
      caption: item.dataset.caption || ''
    });
    
    item.addEventListener('click', function() {
      currentLightboxIndex = index;
      openLightbox();
    });
  });
  
  function openLightbox() {
    if (lightboxImages.length === 0) return;
    
    updateLightboxImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  
  function updateLightboxImage() {
    const current = lightboxImages[currentLightboxIndex];
    lightboxImage.src = current.src;
    lightboxCaption.textContent = current.caption;
    lightboxCaption.style.display = current.caption ? 'block' : 'none';
  }
  
  function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  }
  
  function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  }
  
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxNext) {
    lightboxNext.addEventListener('click', nextImage);
  }
  
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', prevImage);
  }
  
  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  
  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('is-open')) return;
    
    if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  });

  // ---------- Gallery Filters ----------
  const filterButtons = document.querySelectorAll('.gallery__filter');
  const galleryGrid = document.querySelector('.gallery__grid');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      const items = galleryGrid.querySelectorAll('.gallery__item, .gallery__cta-card');
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter || item.classList.contains('gallery__cta-card')) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ---------- Form Handling ----------
  const forms = document.querySelectorAll('form[data-formspree]');
  
  forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          // Show success message
          form.style.display = 'none';
          const successEl = form.parentElement.querySelector('.form__success');
          if (successEl) {
            successEl.classList.add('is-visible');
          }
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        alert('There was a problem submitting the form. Please try again or email us directly.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  });

  // ---------- Pets Conditional Field ----------
  const petsSelect = document.querySelector('[name="pets"]');
  const petCountGroup = document.querySelector('.pet-count-group');
  
  if (petsSelect && petCountGroup) {
    function togglePetCount() {
      if (petsSelect.value && petsSelect.value !== 'No') {
        petCountGroup.style.display = '';
      } else {
        petCountGroup.style.display = 'none';
      }
    }
    
    petsSelect.addEventListener('change', togglePetCount);
    togglePetCount(); // Initial check
  }

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#interest-form') return; // Modal handles #interest-form
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ---------- Current Year in Footer ----------
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ---------- Intersection Observer for Animations ----------
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

});
