/* LYRICRACHA: PWA-only start screen, 30-minute inactivity threshold. */
(() => {
  'use strict';
  const INACTIVITY_MS = 30 * 60 * 1000; // change to 45 * 60 * 1000 if desired
  const KEY = 'lyricracha:last-active-at:v1';
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (!standalone) return; // ordinary browser visits skip intro

  const screen = document.getElementById('lrStartScreen');
  const button = document.getElementById('lrStartButton');
  if (!screen || !button) return;

  const readTime = () => {
    try { return Number(localStorage.getItem(KEY)) || 0; } catch { return 0; }
  };
  const saveTime = () => {
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* private mode */ }
  };

  // Only evaluate at document startup. Ordinary navigation and tab switches do not trigger the title.
  const lastActive = readTime();
  const showIntro = !lastActive || Date.now() - lastActive >= INACTIVITY_MS;
  let playing = false;
  if (showIntro) {
    screen.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  saveTime();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') saveTime();
  });
  window.addEventListener('pagehide', saveTime);

  button.addEventListener('click', () => {
    if (playing) return;
    playing = true;
    button.disabled = true;
    screen.classList.add('is-playing');
    window.setTimeout(() => {
      screen.classList.add('is-exiting');
      window.setTimeout(() => {
        screen.hidden = true;
        screen.classList.remove('is-playing', 'is-exiting');
        document.body.style.overflow = '';
        saveTime();
      }, 300);
    }, 1750);
  });
})();
