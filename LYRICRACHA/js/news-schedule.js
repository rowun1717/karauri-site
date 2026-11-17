
(() => {
  "use strict";

  // 更新予定：ここを編集するだけで反映される
  const events = [
    {
      date: "2026-11-20",
      title: "NEWS機能の調整",
      type: "SYSTEM"
    },
    {
      date: "2026-11-25",
      title: "ABOUTページの更新",
      type: "UPDATE"
    },
    {
      date: "2026-12-01",
      title: "楽曲データの整備",
      type: "LYRICS"
    }
  ];

  const calendarGrid = document.getElementById("calendarGrid");
  if (!calendarGrid) return;

  const monthLabel = document.getElementById("calendarMonth");
  const eventList = document.getElementById("calendarEventList");
  const countdown = document.getElementById("nextUpdateCountdown");
  const nextTitle = document.getElementById("nextUpdateTitle");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const parseDate = (str) => {
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const dateKey = (year, month, day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const sortedEvents = [...events].sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  // 次回更新カウントダウン
  function renderCountdown() {
    const next = sortedEvents.find(
      (event) => parseDate(event.date) >= today
    );

    if (!next) {
      countdown.textContent = "STANDBY";
      nextTitle.textContent = "現在、更新予定はありません";
      return;
    }

    const days = Math.round(
      (parseDate(next.date) - today) / 86400000
    );

    countdown.textContent =
      days === 0 ? "TODAY" : `${days} DAYS`;

    nextTitle.textContent =
      `${next.date.replaceAll("-", ".")} / ${next.title}`;
  }

  // カレンダー描画
  function renderCalendar() {
    calendarGrid.replaceChildren();
    eventList.replaceChildren();

    monthLabel.textContent =
      `${viewYear}.${String(viewMonth + 1).padStart(2, "0")}`;

    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    weekdays.forEach((day) => {
      const label = document.createElement("span");
      label.className = "calendar-weekday";
      label.textContent = day;
      calendarGrid.append(label);
    });

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("span");
      blank.className = "calendar-empty";
      calendarGrid.append(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const key = dateKey(viewYear, viewMonth, day);
      const dayEvents = sortedEvents.filter((event) => event.date === key);


    const cell = document.createElement(
      dayEvents.length ? "button" : "div"
    );

    cell.className = "calendar-day";
    cell.textContent = day;

    if (dayEvents.length) {
      cell.type = "button";
      cell.setAttribute(
        "aria-label",
        `${viewMonth + 1}月${day}日の予定を表示`
      );

      cell.addEventListener("click", () => {
        const target = eventList.querySelector(
          `[data-event-date="${key}"]`
        );

        if (!target) return;

        // 前回の選択を解除
        eventList.querySelectorAll(".is-selected").forEach((item) => {
          item.classList.remove("is-selected");
        });

        calendarGrid.querySelectorAll(".is-selected").forEach((item) => {
          item.classList.remove("is-selected");
        });

        // 選択した日付と予定を強調
        cell.classList.add("is-selected");
        target.classList.add("is-selected");

        target.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      });
    }

      if (key === dateKey(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )) {
        cell.classList.add("is-today");
      }

      if (dayEvents.length) {
        cell.classList.add("has-event");
        cell.title = dayEvents.map((event) => event.title).join(" / ");
      }

      calendarGrid.append(cell);
    }

    const monthlyEvents = sortedEvents.filter((event) => {
      const date = parseDate(event.date);
      return date.getFullYear() === viewYear &&
             date.getMonth() === viewMonth;
    });

    if (!monthlyEvents.length) {
      const empty = document.createElement("p");
      empty.textContent = "NO SCHEDULED TRANSMISSIONS";
      eventList.append(empty);
      return;
    }

    monthlyEvents.forEach((event) => {
      const item = document.createElement("div");
      item.className = "calendar-event-item";
      item.dataset.eventDate = event.date;
      
      const date = document.createElement("time");
      date.dateTime = event.date;
      date.textContent = event.date.replaceAll("-", ".");

      const type = document.createElement("span");
      type.textContent = `[${event.type}]`;

      const title = document.createElement("strong");
      title.textContent = event.title;

      item.append(date, type, title);
      eventList.append(item);
    });
  }

  document.getElementById("calendarPrev")?.addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear--;
    }
    renderCalendar();
  });

  document.getElementById("calendarNext")?.addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear++;
    }
    renderCalendar();
  });

  renderCountdown();
  renderCalendar();
})();
