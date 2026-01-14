  const calendar = document.querySelector(".calendar");
  const title = document.getElementById("calendar-title");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  let currentYear = 2026;
  let currentMonth = 0; // 1月

const events = [
  {
	title: "ミツ境スイーツボックス",
    start: "2025-10-28",
    end: "2025-11-03"
  },
  {
    title: "蒲田マイスーツ",
    start: "2025-10-29",
    end: "2025-11-04"
  },
  {
    title: "アトレテイル大塚",
    start: "2025-11-01",
    end: "2025-11-10"
  },
  {
    title: "青物横丁",
    start: "2025-12-26",
    end: "2026-01-07"
  },
  {
    title: "湘南POP UP",
    start: "2026-01-08",
    end: "2026-01-14"
  }
];

  function updateTitle() {
    title.textContent = currentYear + "年" + (currentMonth + 1) + "月";
  }

  function renderCalendar() {
    calendar.innerHTML = "";

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      calendar.appendChild(document.createElement("div"));
    }

    for (let day = 1; day <= lastDate; day++) {
      const cell = document.createElement("div");
      cell.className = "day";

      const num = document.createElement("div");
      num.className = "day-number";
      num.textContent = day;
      cell.appendChild(num);

      const dateStr =
        currentYear + "-" +
        String(currentMonth + 1).padStart(2, "0") + "-" +
        String(day).padStart(2, "0");

      events.forEach(e => {
        if (dateStr >= e.start && dateStr <= e.end) {
          const label = document.createElement("div");
          label.className = "event-title";
          label.textContent = e.title;
          cell.classList.add("event-day");
          cell.appendChild(label);
        }
      });

      calendar.appendChild(cell);
    }
  }

  prevBtn.onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
    updateTitle();
  };

  nextBtn.onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
    updateTitle();
  };

  renderCalendar();
  updateTitle();

  