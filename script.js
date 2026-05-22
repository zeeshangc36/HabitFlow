/************************************************************
 * HABITFLOW - COMPLETE APP ENGINE (FINAL + FIXED VERSION)
 ************************************************************/

/* =========================
   STORAGE + STATE
========================= */

const STORAGE_KEY = "habitflow_data_v1";

let state = {
  habits: [],
  currentWeekStart: getStartOfWeek(new Date()),
};

let editingHabitId = null;
let selectedIcon = "🏃";

/* =========================
   ICON LIBRARY
========================= */

const ICONS = [
  // FITNESS
  { icon: "🏃", cat: "fitness" },
  { icon: "🏋️", cat: "fitness" },
  { icon: "🚴", cat: "fitness" },
  { icon: "🧘", cat: "fitness" },
  { icon: "🤸", cat: "fitness" },
  { icon: "🏊", cat: "fitness" },

  // STUDY
  { icon: "📚", cat: "study" },
  { icon: "✏️", cat: "study" },
  { icon: "📝", cat: "study" },
  { icon: "🎓", cat: "study" },
  { icon: "📖", cat: "study" },
  { icon: "🧠", cat: "study" },

  // HEALTH
  { icon: "💧", cat: "health" },
  { icon: "🥗", cat: "health" },
  { icon: "🛌", cat: "health" },
  { icon: "🧘‍♂️", cat: "health" },
  { icon: "💊", cat: "health" },

  // PRODUCTIVITY
  { icon: "💻", cat: "productivity" },
  { icon: "📊", cat: "productivity" },
  { icon: "📅", cat: "productivity" },
  { icon: "⏰", cat: "productivity" },
  { icon: "📌", cat: "productivity" },
];


/* =========================
   DOM ELEMENTS
========================= */

const habitBody = document.getElementById("habitTrackerBody");
const habitModal = document.getElementById("habitModal");
const habitForm = document.getElementById("habitForm");

const openHabitModalBtn = document.getElementById("openHabitModalBtn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const cancelBtn = document.getElementById("cancelHabitBtn");

const previousWeekBtn = document.getElementById("previousWeekBtn");
const nextWeekBtn = document.getElementById("nextWeekBtn");
const goToCurrentWeekBtn = document.getElementById("goToCurrentWeekBtn");

const weekRangeText = document.getElementById("weekRangeText");

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");
const mobileOverlay = document.querySelector(".mobile-overlay");
const emptyStateAddBtn = document.getElementById("emptyStateAddBtn");

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  render();
  attachEvents();

  // default icon selection
  setDefaultIcon();
});

/* =========================
   EVENTS
========================= */

function attachEvents() {
  openHabitModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  emptyStateAddBtn?.addEventListener("click", openModal);

  // FIX: cancel button now works
  cancelBtn?.addEventListener("click", closeModal);

  habitModal.addEventListener("click", (e) => {
    if (e.target === habitModal) closeModal();
  });

  habitForm.addEventListener("submit", addOrUpdateHabit);

  previousWeekBtn.addEventListener("click", () => changeWeek(-7));
  nextWeekBtn.addEventListener("click", () => changeWeek(7));
  goToCurrentWeekBtn.addEventListener("click", goToTodayWeek);

  mobileMenuBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    mobileOverlay.classList.toggle("hidden");
  });

  mobileOverlay?.addEventListener("click", () => {
    sidebar.classList.remove("active");
    mobileOverlay.classList.add("hidden");
  });

  // FIX: icon selection system
  document.querySelectorAll(".icon-option").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".icon-option")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
      selectedIcon = btn.textContent.trim();
    });
  });
}

/* =========================
   HABITS CRUD
========================= */

function addOrUpdateHabit(e) {
  e.preventDefault();

  const name = document.getElementById("habitName").value.trim();
  const desc = document.getElementById("habitDescription").value.trim();

  if (!name) return;

  // EDIT MODE
  if (editingHabitId) {
    const habit = state.habits.find(h => h.id === editingHabitId);

    if (habit) {
      habit.name = name;
      habit.desc = desc;
      habit.icon = selectedIcon;
    }

    editingHabitId = null;
  }

  // ADD MODE
  else {
    const newHabit = {
      id: crypto.randomUUID(),
      name,
      desc,
      icon: selectedIcon,
      createdAt: new Date().toISOString(),
      logs: {},
    };

    state.habits.push(newHabit);
  }

  saveState();
  render();
  closeModal();
  habitForm.reset();
}

/* =========================
   DELETE
========================= */

function deleteHabit(id) {
  state.habits = state.habits.filter(h => h.id !== id);
  saveState();
  render();
}

/* =========================
   EDIT
========================= */

function openEditModal(habit) {
  editingHabitId = habit.id;

  document.getElementById("habitName").value = habit.name;
  document.getElementById("habitDescription").value = habit.desc;

  selectedIcon = habit.icon || "🏃";
  updateIconUI(selectedIcon);

  openModal();
}

/* =========================
   ICON UI HELPERS
========================= */

function setDefaultIcon() {
  const first = document.querySelector(".icon-option");
  if (first) first.classList.add("active");
}

function updateIconUI(icon) {
  document.querySelectorAll(".icon-option").forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent.trim() === icon) {
      btn.classList.add("active");
    }
  });
}

/* =========================
   WEEK SYSTEM
========================= */

function changeWeek(days) {
  const newDate = new Date(state.currentWeekStart);
  newDate.setDate(newDate.getDate() + days);

  state.currentWeekStart = getStartOfWeek(newDate);
  render();
}

function goToTodayWeek() {
  state.currentWeekStart = getStartOfWeek(new Date());
  render();
}

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 1;
  return new Date(d.setDate(diff));
}

function getWeekDates(startDate) {
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  return dates;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

/* =========================
   TOGGLE CHECK
========================= */

function toggleHabit(habitId, date) {
  const habit = state.habits.find(h => h.id === habitId);
  if (!habit) return;

  if (habit.logs[date]) {
    delete habit.logs[date];
  } else {
    habit.logs[date] = true;
  }

  saveState();
  render();
}

/* =========================
   STREAK
========================= */

function calculateStreak(habit) {
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const key = formatDate(d);

    if (habit.logs[key]) streak++;
    else break;
  }

  return streak;
}

/* =========================
   RENDER
========================= */

function render() {
  renderWeekHeader();
  renderHabits();
  updateStats();
  updateWeeklyProgress();
  updateTopStreaks();
  saveState();
}

/* =========================
   WEEK HEADER
========================= */

function renderWeekHeader() {
  const weekDates = getWeekDates(state.currentWeekStart);

  const start = weekDates[0];
  const end = weekDates[6];

  weekRangeText.textContent = `${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${end.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;

  const header = document.querySelector(".tracker-days");
  header.innerHTML = "";

  weekDates.forEach(date => {
    const isToday = formatDate(date) === formatDate(new Date());

    const el = document.createElement("div");
    el.className = `tracker-day ${isToday ? "today-column" : ""}`;

    el.innerHTML = `
      <span class="day-name">${date.toLocaleDateString("en-US", {
        weekday: "short",
      })}</span>
      <span class="day-date">${date.getDate()}</span>
    `;

    header.appendChild(el);
  });
}

/* =========================
   HABITS RENDER
========================= */

function renderHabits() {
  const emptyState = document.getElementById("emptyState");

  if (state.habits.length === 0) {
    habitBody.innerHTML = "";
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  habitBody.innerHTML = "";

  const weekDates = getWeekDates(state.currentWeekStart);

  state.habits.forEach(habit => {
    const row = document.createElement("div");
    row.className = "habit-row";

    const streak = calculateStreak(habit);

    const info = document.createElement("div");
    info.className = "habit-info";

    info.innerHTML = `
      <div class="habit-icon green-soft">${habit.icon}</div>

      <div class="habit-details">
        <h4>${habit.name}</h4>
        <p>${habit.desc || ""}</p>
      </div>

      <div class="habit-actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    const checks = document.createElement("div");
    checks.className = "habit-checks";

    weekDates.forEach(date => {
      const key = formatDate(date);

      const btn = document.createElement("button");
      btn.className = `habit-check ${
        habit.logs[key] ? "completed" : ""
      } ${formatDate(date) === formatDate(new Date()) ? "today-check" : ""}`;

      btn.innerHTML = habit.logs[key]
        ? `<i class="fa-solid fa-check"></i>`
        : "";

      btn.addEventListener("click", () =>
        toggleHabit(habit.id, key)
      );

      checks.appendChild(btn);
    });

    const streakEl = document.createElement("div");
    streakEl.className = "habit-streak";

    streakEl.innerHTML = `
      <span class="streak-fire">🔥</span>
      <span class="streak-count">${streak}</span>
    `;

    row.appendChild(info);
    row.appendChild(checks);
    row.appendChild(streakEl);

    info.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Delete this habit?")) deleteHabit(habit.id);
    });

    info.querySelector(".edit-btn").addEventListener("click", () => {
      openEditModal(habit);
    });

    habitBody.appendChild(row);
  });
}

/* =========================
   STATS
========================= */

function updateStats() {
  const totalHabits = state.habits.length;

  const weekDates = getWeekDates(state.currentWeekStart);

let completedChecks = 0;
const totalChecks = state.habits.length * 7;

state.habits.forEach(habit => {
  weekDates.forEach(date => {
    const key = formatDate(date);

    if (habit.logs[key]) {
      completedChecks++;
    }
  });
});

const completion =
  totalChecks === 0
    ? 0
    : Math.round((completedChecks / totalChecks) * 100);

  const streaks = state.habits.map(calculateStreak);
  const bestStreak = streaks.length ? Math.max(...streaks) : 0;
  const currentStreak = bestStreak;

  setStat(0, currentStreak);
  setStat(1, bestStreak);
  setStat(2, totalHabits);
  setStat(3, `${completion}%`);
}

function updateWeeklyProgress() {
  const weekDates = getWeekDates(state.currentWeekStart);

  let completed = 0;
  let total = state.habits.length * 7;

  state.habits.forEach(habit => {
    weekDates.forEach(date => {
      const key = formatDate(date);

      if (habit.logs[key]) {
        completed++;
      }
    });
  });

  const percent = total === 0
    ? 0
    : Math.round((completed / total) * 100);

  // TEXT
  document.getElementById("weeklyProgressPercent").textContent =
    `${percent}%`;

  document.getElementById("weeklyCompletedStats").textContent =
    `${completed} / ${total}`;

 document.getElementById("weeklyTotalStats").textContent =
  state.habits.length;

  // CIRCLE
  const circle = document.querySelector(".progress-circle");

  circle.style.background = `
    conic-gradient(
      var(--green) 0% ${percent}%,
      #e5e7eb ${percent}% 100%
    )
  `;
}

function updateTopStreaks() {
  const container = document.getElementById("topStreaksList");

  if (!container) return;

  container.innerHTML = "";

  if (state.habits.length === 0) {
    container.innerHTML = `
      <p class="no-streaks-text">
        No habits yet.
      </p>
    `;
    return;
  }

  const sorted = [...state.habits]
    .map(habit => ({
      ...habit,
      streak: calculateStreak(habit),
    }))
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 5);

  sorted.forEach(habit => {
    const item = document.createElement("div");
    item.className = "top-streak-item";

    item.innerHTML = `
      <div class="top-streak-left">
        <span>${habit.icon}</span>
        <p>${habit.name}</p>
      </div>

      <span class="top-streak-days">
        ${habit.streak} day${habit.streak !== 1 ? "s" : ""}
      </span>
    `;

    container.appendChild(item);
  });
}

function setStat(index, value) {
  const el = document.querySelectorAll(".stat-number")[index];
  if (el) el.childNodes[0].nodeValue = value + " ";
}

/* =========================
   MODAL
========================= */

function openModal() {
  habitModal.classList.remove("hidden");
}

function closeModal() {
  habitModal.classList.add("hidden");
  editingHabitId = null;
  habitForm.reset();

  selectedIcon = "🏃";
  setDefaultIcon();
}

/* =========================
   STORAGE
========================= */

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) {
    state = JSON.parse(data);
    state.currentWeekStart = new Date(state.currentWeekStart);
  }
}

const iconLibraryModal = document.getElementById("iconLibraryModal");
const iconGrid = document.getElementById("iconGrid");
const iconSearch = document.getElementById("iconSearch");

document.getElementById("openIconLibrary").addEventListener("click", () => {
  iconLibraryModal.classList.remove("hidden");
  renderIcons("all");
});

document.querySelector(".close-icon-library").addEventListener("click", () => {
  iconLibraryModal.classList.add("hidden");
});

iconSearch.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = ICONS.filter(i =>
    i.icon.includes(value) || i.cat.includes(value)
  );

  renderIcons("all", filtered);
});

document.querySelectorAll(".icon-cat").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".icon-cat")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    renderIcons(btn.dataset.cat);
  });
});

function renderIcons(category = "all", list = ICONS) {
  iconGrid.innerHTML = "";

  const filtered = category === "all"
    ? list
    : list.filter(i => i.cat === category);

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "icon-item";
    div.textContent = item.icon;

    div.addEventListener("click", () => {
      selectedIcon = item.icon;
      updateIconUI(item.icon);

      iconLibraryModal.classList.add("hidden");
    });

    iconGrid.appendChild(div);
  });
}