/* Shared navigation for pages other than index and song pages. */
(() => {
  "use strict";
  const button = document.getElementById("menuButton");
  const nav = document.getElementById("globalNav");
  if (!button || !nav) return;
  const close = () => {
    nav.classList.remove("is-open");
    button.classList.remove("is-active");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "メニューを開く");
  };
  button.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    button.classList.toggle("is-active", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  document.addEventListener("click", e => {
    if (!button.contains(e.target) && !nav.contains(e.target)) close();
  });
})();
