
/* =====================
   CONFIG
===================== */
const STORE_TIMEZONE = "Europe/London";
const days = ["sun","mon","tue","wed","thu","fri","sat"];
let expanded = false;
let refreshTimer = null;

/* =====================
   INIT FUNCTION (ONLY THIS RUNS AFTER LOAD)
===================== */
function scheduleLogicInit() {

  const tbody = document.getElementById("hours-body");
  const toggleBtn = document.getElementById("toggleView");
  const status = document.getElementById("storeStatus");

  if (!tbody || !toggleBtn || !status) {
    console.warn("Schedule section elements not found.");
    return;
  }

  buildSchedule();
  renderTable();
  startHourlyRefresh();

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    toggleBtn.textContent =
      expanded ? "Collapse view" : "Expand to hourly view";
    renderTable();
  });
}

/* =====================
   BUILD SCHEDULE
===================== */
let schedule = [];

function buildSchedule() {
  schedule = [];

  for (let h = 0; h < 24; h++) {
    const row = { hour: h };
    days.forEach(d => row[d] = openHours[d]?.includes(h) ? 1 : 0);
    schedule.push(row);
  }
}

/* =====================
   COLLAPSE LOGIC
===================== */
function samePattern(a, b) {
  return days.every(d => a[d] === b[d]);
}

function collapseSchedule(data) {
  const rows = [];
  let start = data[0];
  let prev = data[0];

  for (let i = 1; i < data.length; i++) {
    if (!samePattern(prev, data[i])) {
      rows.push({ start: start.hour, end: prev.hour + 1, pattern: prev });
      start = data[i];
    }
    prev = data[i];
  }

  rows.push({ start: start.hour, end: prev.hour + 1, pattern: prev });
  return rows;
}

/* =====================
   TIME HELPERS
===================== */
function getStoreNow() {
  return new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: STORE_TIMEZONE,
      hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit"
    })
    .format(new Date())
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")
  );
}

const pad = n => String(n).padStart(2, "0");

/* =====================
   RENDER TABLE
===================== */
function renderTable() {

  const tbody = document.getElementById("hours-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  const now = getStoreNow();
  const hour = now.getHours();

  // ? Collapse hours unless expanded
  const rows = expanded
    ? schedule.map(h => ({ start: h.hour, end: h.hour + 1, pattern: h }))
    : collapseSchedule(schedule);

  rows.forEach(row => {
    const tr = document.createElement("tr");

    if (hour >= row.start && hour < row.end) {
      tr.classList.add("is-current");
    }

    tr.innerHTML = `
      <th>${pad(row.start)}:00 - ${pad(row.end)}:00</th>
      ${days.map(d =>
        `<td>
          <div class="status-pill ${row.pattern[d] ? "is-open" : "is-closed"}"></div>
        </td>`).join("")}
    `;

    tbody.appendChild(tr);
  });

  updateStoreStatus();
}

/* =====================
   STATUS BAR
===================== */
function updateStoreStatus() {

  const status = document.getElementById("storeStatus");
  if (!status) return;

  const now = getStoreNow();
  const h = now.getHours();
  const dayKey = days[now.getDay()];

  const current = schedule[h];

  if (!current || current[dayKey] !== 1) {
    const next = schedule.find(x => x.hour > h && x[dayKey] === 1);
    if (next) {
      status.className = "notification is-warning";
      status.textContent = "Store is CLOSED - opens in 1 hour";
    } else {
      status.className = "notification is-danger";
      status.textContent = "Store is CLOSED";
    }
    return;
  }

  const closesNextHour =
    h + 1 < 24 && schedule[h + 1][dayKey] === 0;

  status.className = "notification is-success";
  status.textContent = closesNextHour
    ? "Store is OPEN - closes in 1 hour"
    : "Store is OPEN";
}

/* =====================
   HOURLY REFRESH
===================== */
function startHourlyRefresh() {

  clearTimeout(refreshTimer);

  const now = getStoreNow();
  const msToNextHour =
    ((60 - now.getMinutes()) * 60 - now.getSeconds()) * 1000;

  refreshTimer = setTimeout(() => {
    renderTable();
    startHourlyRefresh();
  }, msToNextHour);
}

