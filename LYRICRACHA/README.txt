LYRICRACHA PWA START SCREEN (30 min)

FILES TO REPLACE/ADD (relative to project root):
REPLACE index.html
REPLACE js/script.js
ADD css/start-screen.css
ADD js/start-screen.js
ADD images/logos/skz-logo.png

These replacement HTML/JS files are based on the two uploaded text files.
Back up your existing files first, especially if you have made further changes.

Behavior:
- Standalone installed PWA only; normal browser skips start screen.
- First standalone visit or visit after 30+ minutes since previous activity: show title.
- PRESS START: handwritten logo impact/glitch, then normal home.
- Ordinary page navigation does not show the intro.
- No manifest.json changes.
- Existing 0-100% custom loader is removed from index.html and js/script.js.

NOTE: Existing CSS rules for .loading-screen are left untouched but unused.
NOTE: If your existing PWA service worker caches old HTML/JS, update its cache version later for deployment.
NOTE: OS-controlled splash icon may still appear briefly before the custom start screen.
NOTE: Provided logo is a recreated graphic, not guaranteed identical to official logo.
