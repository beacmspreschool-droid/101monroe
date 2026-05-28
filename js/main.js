/* ============================================
   MONROE RESIDENCES - Main JavaScript
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
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

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

  galleryItems.forEach((item, index) => {
    lightboxImages.push({
      src: item.dataset.lightbox,
      caption: item.dataset.caption || '',
      el: item
    });

    item.addEventListener('click', function() {
      lightboxImages[index].src = item.dataset.lightbox;
      lightboxImages[index].caption = item.dataset.caption || '';
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

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
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

      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

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

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

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

  // ---------- 3D Showcase Thumbnail Switcher ----------
  const showcaseThumbs = document.querySelectorAll('.showcase__thumb');
  const showcaseViewer = document.querySelector('.showcase__viewer');
  const showcasePrescreenBtn = document.querySelector('.showcase__btn-prescreen');
  const showcaseActions = document.querySelector('.showcase__actions');

  // Don't trigger the lightbox when clicking the action buttons inside the viewer
  if (showcaseActions) {
    showcaseActions.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  if (showcaseViewer && showcaseThumbs.length) {
    const previewImg = showcaseViewer.querySelector('.showcase__image');
    const previewName = showcaseViewer.querySelector('.showcase__name');
    const previewDetails = showcaseViewer.querySelector('.showcase__details');
    const previewBadge = showcaseViewer.querySelector('.showcase__badge');

    showcaseThumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        showcaseThumbs.forEach(function(t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');

        previewImg.src = thumb.dataset.img;
        previewImg.alt = thumb.dataset.name + ' furnished 3D floor plan';
        previewName.textContent = thumb.dataset.name;
        previewDetails.innerHTML = thumb.dataset.specs;

        // Update the lightbox source on the viewer
        showcaseViewer.dataset.lightbox = thumb.dataset.full;
        showcaseViewer.dataset.caption = thumb.dataset.name + ' — 3D View — ' + thumb.dataset.specs.replace(/&bull;/g, '/').replace(/<[^>]*>/g, '');

        // Update badge
        var badgeText = thumb.dataset.badge;
        var badgeType = thumb.dataset.badgeType;
        previewBadge.textContent = badgeText;
        previewBadge.className = 'showcase__badge';
        if (badgeType) {
          previewBadge.classList.add('showcase__badge--' + badgeType);
        }

        // Update the Get Pre-Screened button URL for this unit
        if (showcasePrescreenBtn && thumb.dataset.prescreen) {
          showcasePrescreenBtn.href = thumb.dataset.prescreen;
        }

        // Sync the showcase entry in the lightbox array
        var lbIndex = lightboxImages.findIndex(function(item) {
          return item.el === showcaseViewer;
        });
        if (lbIndex !== -1) {
          lightboxImages[lbIndex].src = thumb.dataset.full;
          lightboxImages[lbIndex].caption = showcaseViewer.dataset.caption;
        }
      });
    });
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
