const DEV_ALWAYS_OPEN = true; // 制作中は true、本番は false

const enterBtn = document.getElementById("enterBtn");
const statusText = document.getElementById("statusText");
const curtain = document.getElementById("curtain");

function isOpenNow() {
  if (DEV_ALWAYS_OPEN) return true;
  const h = new Date().getHours();
  return (h >= 23 || h < 5);
}

function setStatus(text) {
  if (statusText) statusText.textContent = text;
}

function update() {
  if (isOpenNow()) {
    enterBtn.classList.remove("disabled");
    setStatus("営業中です。扉が開きます。");
  } else {
    enterBtn.classList.add("disabled");
    setStatus("いまは、まだ夜が足りません。");
  }
}

update();
setInterval(update, 30000);

enterBtn.addEventListener("click", () => {
  if (enterBtn.classList.contains("disabled")) return;

  if (curtain) curtain.classList.add("show");
  setTimeout(() => {
    window.location.href = "about.html";
  }, 500);
});
