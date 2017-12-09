import '../styles/index.scss';
import '../img/short_cap.jpg';
import '../img/short_cap2.jpg';

// this is the entry point for the app
if (document.readyState === 'complete' ||
    document.readyState === 'loaded' ||
    document.readyState === 'interactive') {
  // check if the main container has loaded
  const main = document.querySelector('.content') || null;

  if (main.length < 1) {
    setTimeout(() => {
      main.innerText = 'init app after 50ms';
    }, 50); // giving the page some time, maybe it will load
  } else {
    main.innerText = 'init app';
  }
} else {
  window.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('.content') || null;
    main.innerText = 'init app on DOM content loaded.';
  });
}
