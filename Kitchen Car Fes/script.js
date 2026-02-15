// 画像クリックで拡大（dialog）
const flyerImg = document.querySelector(".flyer img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

if (flyerImg && modal && modalImg) {
  flyerImg.addEventListener("click", () => {
    modalImg.src = flyerImg.src;
    modalImg.alt = flyerImg.alt;
    modal.showModal();
  });

  modalClose?.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    // 背景クリックで閉じる
    const rect = modalImg.getBoundingClientRect();
    const inImg =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inImg) modal.close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.open) modal.close();
  });
}
