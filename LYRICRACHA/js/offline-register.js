const lyricrachaSwUrl = new URL('../service-worker.js', document.currentScript.src);
if ('serviceWorker' in navigator && location.protocol !== 'file:') { window.addEventListener('load', () => navigator.serviceWorker.register(lyricrachaSwUrl).catch(console.warn)); }
