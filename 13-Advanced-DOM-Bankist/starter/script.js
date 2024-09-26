'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Smooth scroll

btnScrollTo.addEventListener('click', function (e) {
  // Old way of smooth scroll
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log('current scroll X/Y');
  // console.log(window.pageXOffset, window.pageYOffset);

  // // window.scrollTo calculates from the top of the page, so if there's already a scroll, we also add that scroll
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

// event delegation; it is better than looping all elements and add eventhandlers each; also used when element is not yet created in the DOM
tabsContainer.addEventListener('click', function (e) {
  // if we clicked on button or span, this will always return the parent element or element itself which is .operations__tab (dom traversing)
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // Remove and add active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation

// IMPORTANT: impossible to pass another argument into event handler function. so only 1, which is the event.
// You can pass array or object into "this" keyword of bind, so you can have multiple values
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // The this keyword is now either 0.5 or 1, because that is the first parameter of bind method
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// // scroll event is avaiable on window, because we scroll on window not document (NOT GOOD IN PERFORMANCE)
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

// // 2 arguments: entries and observer object (IntersectionObserver)
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // element that our target element will intersec (null: able to observe our target element intersection entire viewport)
//   threshold: [0, 0.2], // percentage of intersection of obervercallback will be called (view percentage of our target)
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // this is our target

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // callback function will be called when both view is 0 and not 0
  rootMargin: `-${navHeight}px`, // is a box of pixel that will be applied outside of our target element
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections: Intersection Observer API

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // remove the observer for that particular section if we already show it to the page
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden'); // Hide all sections first
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Reveal images: Intersection Observer API

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  // entry.target.classList.remove('lazy-img'); // This won't work because the image needs to loads first; or else we will see a loading image if we remove this suddenly
  // use event listener instead when the image fully loads, then remove the blur
  entry.target.addEventListener('load', function (e) {
    this.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // THIS IS THE MAIN FUNCTION THAT WILL DETERMINE WHICH SLIDE TO SHOW
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      // curSlide = 1: -100% 0% 100% 200%
    });
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    highlightDot(curSlide);
  };

  // Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    highlightDot(curSlide);
  };

  // Highlight the dot
  const highlightDot = function (slide) {
    // Reset the background color of all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // Selecting the element with class and data attribute
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    createDots();

    // Put all slides side-by-side, because initially the slides are overlapping each other
    goToSlide(0);

    highlightDot(curSlide);
  };
  init();

  // Events
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;

    // Get the slide number in data- attribute
    const { slide } = e.target.dataset;

    highlightDot(slide);

    // Change the slide
    curSlide = Number.parseInt(slide);
    goToSlide(curSlide);
  });
};
slider();
