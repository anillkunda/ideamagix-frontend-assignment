'use strict';

// ----- Make mobile navigation work

const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

// ----- Smooth scrolling animation

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile navigation
    if (link.classList.contains('nav-link'))
      headerEl.classList.toggle('nav-open');
  });
});

// ----- Sticky navigation

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add('sticky');
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove('sticky');
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: '-400px',
  }
);
obs.observe(sectionHeroEl);

// ----- About Stats slider (Owl Carousel)

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.about-stats-track');
  const cards = document.querySelectorAll('.about-stat-card');

  if (!track || !cards.length) return;

  let index = 0;
  let itemsToShow = 3;
  let autoplay;

  function setItems() {
    const width = window.innerWidth;

    if (width >= 1700) {
      itemsToShow = 3;
    } else if (width >= 1200) {
      itemsToShow = 2;
    } else {
      itemsToShow = 1;
    }
  }

  function move() {
    const gap = 24; // 2.4rem
    const cardWidth = cards[0].offsetWidth + gap;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function next() {
    index++;
    if (index > cards.length - itemsToShow) {
      index = 0;
    }
    move();
  }

  function start() {
    stop();
    autoplay = setInterval(next, 2500);
  }

  function stop() {
    clearInterval(autoplay);
  }

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  window.addEventListener('resize', () => {
    index = 0;
    setItems();
    move();
  });

  setItems();
  start();
});
