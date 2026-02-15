// ✅ app.js に追記（既存コードの一番下に貼ってOK）

/* ===== WEB予約フォーム ===== */
const form = document.getElementById("reserveForm");
const successBox = document.getElementById("reserveSuccess");
const errorBox = document.getElementById("reserveError");

const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");
const demoBtn = document.getElementById("fillDemo");

function pad2(n){ return String(n).padStart(2, "0"); }

function todayISO(){
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
}

// 診療時間の候補（例：9:30-12:30 / 14:30-17:30 を30分刻み）
function makeTimeSlots(){
  const slots = [];
  const add = (h, m) => slots.push(`${pad2(h)}:${pad2(m)}`);

  // morning 09:30 -> 12:30
  for (let h = 9; h <= 12; h++){
    for (let m of [0,30]){
      if (h === 9 && m === 0) continue;
      if (h === 12 && m === 30) add(h,m); // include 12:30
      else if (h < 12 || (h === 12 && m === 0)) add(h,m);
    }
  }
  // afternoon 14:30 -> 17:30
  for (let h = 14; h <= 17; h++){
    for (let m of [0,30]){
      if (h === 14 && m === 0) continue;
      add(h,m);
    }
  }
  add(17,30);
  // 重複を軽く整理
  return Array.from(new Set(slots));
}

const ALL_SLOTS = makeTimeSlots();

// 日付選択で時間候補を生成（曜日や休診ルールの簡易版つき）
function populateTimes(){
  const v = dateEl.value;
  timeEl.innerHTML = `<option value="" selected disabled>選択してください</option>`;
  if (!v) return;

  const d = new Date(v + "T00:00:00");
  const day = d.getDay(); // 0 Sun ... 6 Sat

  // 例：日曜休診（候補なし）
  if (day === 0){
    timeEl.innerHTML = `<option value="" selected disabled>日曜は休診です</option>`;
    return;
  }

  // 例：水曜午後・土曜午後は候補を午前のみへ
  const isWed = day === 3;
  const isSat = day === 6;
  const slots = ALL_SLOTS.filter((t) => {
    const hh = Number(t.slice(0,2));
    if ((isWed || isSat) && hh >= 14) return false;
    return true;
  });

  const frag = document.createDocumentFragment();
  for (const t of slots){
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    frag.appendChild(opt);
  }
  timeEl.appendChild(frag);
}

// バリデーション補助
function setError(name, on){
  const field = form?.querySelector(`[name="${name}"]`)?.closest(".field");
  const msg = form?.querySelector(`[data-error-for="${name}"]`);
  if (field) field.classList.toggle("is-error", on);
  if (msg) msg.hidden = !on;
}

function clearAllErrors(){
  ["name","tel","email","visitType","menu","date","time","symptoms","privacy"].forEach((k)=>setError(k,false));
  errorBox && (errorBox.hidden = true);
}

function validTel(v){
  const digits = v.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

function validEmail(v){
  if (!v) return true; // 任意
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// 初期設定：過去日を選べないように
if (dateEl){
  dateEl.min = todayISO();
  dateEl.addEventListener("change", populateTimes);
}

// デモ入力
demoBtn?.addEventListener("click", () => {
  clearAllErrors();
  form.name.value = "山田 花子";
  form.furigana.value = "やまだ はなこ";
  form.tel.value = "09012345678";
  form.email.value = "hanako@example.com";
  form.visitType.value = "first";
  form.menu.value = "general";
  // 明日
  const d = new Date(); d.setDate(d.getDate()+1);
  form.date.value = `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
  populateTimes();
  // 可能なら最初の候補
  setTimeout(()=>{
    const first = timeEl.querySelector('option[value]:not([disabled])');
    if (first) timeEl.value = first.value;
  }, 0);
  form.symptoms.value = "右下の奥歯がしみます。冷たいものを飲むと痛みます。";
  document.getElementById("privacy").checked = true;
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  clearAllErrors();
  successBox && (successBox.hidden = true);

  let ok = true;

  const name = form.name.value.trim();
  const tel = form.tel.value.trim();
  const email = form.email.value.trim();
  const visitType = form.visitType.value;
  const menu = form.menu.value;
  const date = form.date.value;
  const time = form.time.value;
  const symptoms = form.symptoms.value.trim();
  const privacy = document.getElementById("privacy")?.checked;

  if (!name){ setError("name", true); ok = false; }
  if (!validTel(tel)){ setError("tel", true); ok = false; }
  if (!validEmail(email)){ setError("email", true); ok = false; }
  if (!visitType){ setError("visitType", true); ok = false; }
  if (!menu){ setError("menu", true); ok = false; }
  if (!date){ setError("date", true); ok = false; }
  if (!time){ setError("time", true); ok = false; }
  if (!symptoms){ setError("symptoms", true); ok = false; }
  if (!privacy){ setError("privacy", true); ok = false; }

  if (!ok){
    errorBox && (errorBox.hidden = false);
    // 最初のエラーへスクロール
    const firstErr = form.querySelector(".field.is-error");
    firstErr?.scrollIntoView({ behavior:"smooth", block:"center" });
    return;
  }

  // ✅ ここは「送信したフリ」: 実運用は fetch() でサーバーへPOST
  const payload = { name, tel, email, visitType, menu, date, time, symptoms };
  try{
    localStorage.setItem("reserveDraft", JSON.stringify(payload));
  }catch{}

  successBox && (successBox.hidden = false);
  errorBox && (errorBox.hidden = true);
  form.reset();
  populateTimes();

  // 表示位置へ
  successBox?.scrollIntoView({ behavior:"smooth", block:"center" });
});
