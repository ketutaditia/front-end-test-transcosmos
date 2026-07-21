'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* =========================================================
     Mobile menu toggle
     ========================================================= */
  var hamburgerBtn = document.getElementById('hamburger-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileMenuClose = document.getElementById('mobile-menu-close');
  var mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  function openMobileMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  mobileMenuLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* =========================================================
     Smooth scroll for in-page nav links
     ========================================================= */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');
      if (targetId.length <= 1) {
        return;
      }
      var targetEl = document.querySelector(targetId);
      if (!targetEl) {
        return;
      }
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* =========================================================
     Projects carousel
     ========================================================= */
  var track = document.getElementById('projects-track');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  var dots = document.querySelectorAll('.carousel-dot');
  var slideCount = track ? track.children.length : 0;
  var currentSlide = 0;

  function goToSlide(index) {
    if (!track || slideCount === 0) {
      return;
    }
    currentSlide = (index + slideCount) % slideCount;
    track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    dots.forEach(function (dot, dotIndex) {
      dot.classList.toggle('is-active', dotIndex === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide + 1);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(index);
    });
  });

  /* =========================================================
     GA4 event tracking via data-event attributes
     ========================================================= */
  function trackEvent(eventName, element) {
    if (typeof window.gtag !== 'function') {
      return;
    }
    window.gtag('event', eventName, {
      link_text: element.textContent ? element.textContent.trim() : undefined,
      link_href: element.getAttribute('href') || undefined
    });
  }

  var trackedElements = document.querySelectorAll('[data-event]');

  trackedElements.forEach(function (element) {
    element.addEventListener('click', function () {
      var eventName = element.getAttribute('data-event');
      trackEvent(eventName, element);
    });
  });

});
