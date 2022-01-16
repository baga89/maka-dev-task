import { getOffset } from './getOffset';

import '../css/index.css';

const slides = [...document.querySelectorAll('.slide')];
const slidesCounter = document.querySelector('.slides-counter');
const [slidesCounterCurrent, slidesCounterTotal] = slidesCounter.children;

slidesCounterTotal.innerHTML = `/ ${slides.length}`;

// Observer options
const options = {
  root: null,
  rootMargin: `${slides[0].offsetHeight}px 0px 0px 0px`,
  threshold: [1.0],
};

const onIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    let index = entry.target.index;
    const [slideTextWrapper, slideImgWrapper] = entry.target.children;
    const [slideText] = slideTextWrapper.children;
    const [slideImg] = slideImgWrapper.children;

    if (entry.isIntersecting) {
      // Set slides counter position
      slidesCounter.style.top = `${slideText.offsetTop - 24}px`;
      slidesCounter.style.left = `${slideText.offsetLeft}px`;
      // Update counter
      slidesCounterCurrent.innerHTML = index + 1;

      // If slide is active
      slideTextWrapper.style.zIndex = 1;
      slideText.style.opacity = 1;

      // Parallax
      window.addEventListener('scroll', () => {
        let dist = window.scrollY - getOffset(slideImg).top;
        return (slideImg.style.transform = `translateY(${dist * 0.5}px)`);
      });
    } else {
      // If slide is not active
      slideTextWrapper.style.zIndex = 0;
      slideText.style.opacity = 0;
    }
  });
};

const observer = new IntersectionObserver(onIntersect, options);

slides.forEach((slide, index) => {
  // save index as element property before
  // registering the element in the observer
  slide.index = index;
  observer.observe(slide);
});

// Cool blog post about Intersection Observer
// https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/

// If you want to visualize how Intersection Observer works
// https://codepen.io/michellebarker/full/xxwLpRG
