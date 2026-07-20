/* ============================================================================
   WEDDING PLANNER — APP LOGIC  (src/app.ts)
   ----------------------------------------------------------------------------
   You generally shouldn't need to edit this file to customize your site —
   put your wedding details in src/config.ts instead. This file just reads
   that data and draws the page / handles clicks.

   A couple of notes since you're new to this:
   - "personal tasks" (added from the "+ Add your own task" box on the page)
     are saved in the visitor's own browser (localStorage), NOT in config.ts.
     They are private to whoever added them and won't show up for other
     visitors or survive a "clear browsing data". If you want a task to be
     permanent and visible to everyone, add it to TIMELINE_TASKS in
     src/config.ts instead and push it to GitHub.
   - Checking a box (marking something "done") is also saved in that same
     browser's localStorage, per task id.
   ============================================================================ */

interface PersonalTask extends TimelineTask {
  isPersonal: true;
}

const STORAGE_COMPLETED = "wp_completed_v1";
const STORAGE_PERSONAL = "wp_personal_v1";

let currentFilter: string = "All";

// ---------------------------------------------------------------------------
// small localStorage helpers
// ---------------------------------------------------------------------------
function loadCompleted(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_COMPLETED);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCompleted(map: Record<string, boolean>): void {
  localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(map));
}

function loadPersonalTasks(): PersonalTask[] {
  try {
    const raw = localStorage.getItem(STORAGE_PERSONAL);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePersonalTasks(tasks: PersonalTask[]): void {
  localStorage.setItem(STORAGE_PERSONAL, JSON.stringify(tasks));
}

// ---------------------------------------------------------------------------
// HERO SECTION
// ---------------------------------------------------------------------------
function renderHero(): void {
  const names = document.getElementById("partnerNames");
  const tagline = document.getElementById("tagline");
  const hashtag = document.getElementById("hashtag");
  const hero = document.getElementById("heroSection");

  if (names) names.textContent = `${COUPLE.partner1} & ${COUPLE.partner2}`;
  if (tagline) tagline.textContent = COUPLE.tagline;
  if (hashtag) hashtag.textContent = COUPLE.hashtag;
  if (hero && COUPLE.heroPhoto) {
    hero.style.backgroundImage = `linear-gradient(rgba(20,20,20,0.45), rgba(20,20,20,0.45)), url("${COUPLE.heroPhoto}")`;
  }
}

// ---------------------------------------------------------------------------
// COUNTDOWN
// ---------------------------------------------------------------------------
function renderCountdown(): void {
  const target = new Date(WEDDING_DATE).getTime();
  const el = document.getElementById("countdown");
  const dateLabel = document.getElementById("weddingDateLabel");
  if (!el) return;

  if (dateLabel) {
    const d = new Date(WEDDING_DATE);
    dateLabel.textContent = d.toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }

  function tick(): void {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      el!.textContent = "It's the big day! 🎉";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    el!.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  tick();
  setInterval(tick, 1000);
}

// ---------------------------------------------------------------------------
// CUSTOM VARIABLES ("At a Glance")
// ---------------------------------------------------------------------------
function renderCustomVariables(): void {
  const container = document.getElementById("customVariables");
  if (!container) return;
  container.innerHTML = "";
  CUSTOM_VARIABLES.forEach((item) => {
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `<span class="stat-label">${escapeHtml(item.label)}</span><span class="stat-value">${escapeHtml(item.value)}</span>`;
    container.appendChild(row);
  });
}

// ---------------------------------------------------------------------------
// MEDIA GALLERY
// ---------------------------------------------------------------------------
function renderMediaGallery(): void {
  const container = document.getElementById("mediaGallery");
  const section = document.getElementById("mediaSection");
  if (!container || !section) return;
  if (MEDIA_GALLERY.length === 0) {
    section.style.display = "none";
    return;
  }
  section.style.display = "block";
  container.innerHTML = "";
  MEDIA_GALLERY.forEach((item) => {
    const fig = document.createElement("figure");
    fig.className = "gallery-item";
    fig.innerHTML = `<img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.caption)}" loading="lazy" />
      <figcaption>${escapeHtml(item.caption)}</figcaption>`;
    container.appendChild(fig);
  });
}

// ---------------------------------------------------------------------------
// CATEGORY FILTERS
// ---------------------------------------------------------------------------
function renderFilters(): void {
  const container = document.getElementById("categoryFilters");
  if (!container) return;
  container.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "All";
  allBtn.className = "filter-btn" + (currentFilter === "All" ? " active" : "");
  allBtn.onclick = () => { currentFilter = "All"; renderFilters(); renderTimeline(); };
  container.appendChild(allBtn);

  Object.keys(CATEGORIES).forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = "filter-btn" + (currentFilter === cat ? " active" : "");
    btn.style.borderColor = CATEGORIES[cat];
    if (currentFilter === cat) btn.style.background = CATEGORIES[cat];
    btn.onclick = () => { currentFilter = cat; renderFilters(); renderTimeline(); };
    container.appendChild(btn);
  });
}

// ---------------------------------------------------------------------------
// TIMELINE LIST
// ---------------------------------------------------------------------------
function getAllTasks(): (TimelineTask | PersonalTask)[] {
  const personal = loadPersonalTasks();
  return [...TIMELINE_TASKS, ...personal].sort((a, b) => a.date.localeCompare(b.date));
}

function renderProgress(allTasks: (TimelineTask | PersonalTask)[], completed: Record<string, boolean>): void {
  const bar = document.getElementById("progressBar") as HTMLDivElement | null;
  const label = document.getElementById("progressLabel");
  if (!bar || !label) return;
  const total = allTasks.length;
  const done = allTasks.filter((t) => completed[t.id]).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  bar.style.width = `${pct}%`;
  label.textContent = `${done} / ${total} tasks complete (${pct}%)`;
}

function renderTimeline(): void {
  const list = document.getElementById("timelineList");
  if (!list) return;

  const completed = loadCompleted();
  const allTasks = getAllTasks();
  renderProgress(allTasks, completed);

  const filtered = currentFilter === "All"
    ? allTasks
    : allTasks.filter((t) => t.category === currentFilter);

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = `<p class="empty-msg">No tasks in this category yet.</p>`;
    return;
  }

  filtered.forEach((task) => {
    const isPersonal = (task as PersonalTask).isPersonal === true;
    const isDone = !!completed[task.id];
    const color = CATEGORIES[task.category] || "#6b7280";

    const item = document.createElement("div");
    item.className = "task-item" + (isDone ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isDone;
    checkbox.className = "task-checkbox";
    checkbox.onchange = () => {
      const map = loadCompleted();
      map[task.id] = checkbox.checked;
      saveCompleted(map);
      renderTimeline();
    };

    const body = document.createElement("div");
    body.className = "task-body";

    const dateStr = formatDate(task.date);
    let mediaHtml = "";
    if (task.mediaUrl) {
      mediaHtml = `<img class="task-media" src="${escapeHtml(task.mediaUrl)}" alt="" loading="lazy" />`;
    }
    let linkHtml = "";
    if (task.link) {
      linkHtml = ` &middot; <a href="${escapeHtml(task.link)}" target="_blank" rel="noopener">More info</a>`;
    }
    let deleteHtml = "";
    if (isPersonal) {
      deleteHtml = `<button class="delete-btn" title="Remove this personal task">&times;</button>`;
    }

    body.innerHTML = `
      <div class="task-top">
        <span class="task-date">${dateStr}</span>
        <span class="task-category" style="background:${color}">${escapeHtml(task.category)}</span>
        ${isPersonal ? '<span class="task-personal-badge">personal</span>' : ""}
      </div>
      <div class="task-title">${escapeHtml(task.title)}</div>
      ${task.notes ? `<div class="task-notes">${escapeHtml(task.notes)}</div>` : ""}
      ${mediaHtml}
      <div class="task-links">${linkHtml}</div>
    `;

    if (isPersonal) {
      const delBtn = body.querySelector(".delete-btn") as HTMLButtonElement | null;
      if (delBtn) {
        delBtn.onclick = () => {
          const personal = loadPersonalTasks().filter((t) => t.id !== task.id);
          savePersonalTasks(personal);
          const map = loadCompleted();
          delete map[task.id];
          saveCompleted(map);
          renderTimeline();
        };
        body.querySelector(".task-top")?.appendChild(delBtn);
      }
    }

    item.appendChild(checkbox);
    item.appendChild(body);
    list.appendChild(item);
  });
}

// ---------------------------------------------------------------------------
// ADD YOUR OWN TASK
// ---------------------------------------------------------------------------
function setupAddTaskForm(): void {
  const form = document.getElementById("addTaskForm") as HTMLFormElement | null;
  const categorySelect = document.getElementById("newCategory") as HTMLSelectElement | null;
  if (!form || !categorySelect) return;

  categorySelect.innerHTML = "";
  Object.keys(CATEGORIES).forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  form.onsubmit = (e: Event) => {
    e.preventDefault();
    const dateInput = document.getElementById("newDate") as HTMLInputElement;
    const titleInput = document.getElementById("newTitle") as HTMLInputElement;
    const notesInput = document.getElementById("newNotes") as HTMLTextAreaElement;

    if (!dateInput.value || !titleInput.value) return;

    const newTask: PersonalTask = {
      id: "p" + Date.now(),
      date: dateInput.value,
      category: categorySelect.value,
      title: titleInput.value,
      notes: notesInput.value,
      isPersonal: true
    };

    const personal = loadPersonalTasks();
    personal.push(newTask);
    savePersonalTasks(personal);

    form.reset();
    renderTimeline();
  };
}

// ---------------------------------------------------------------------------
// MISC BUTTONS
// ---------------------------------------------------------------------------
function setupButtons(): void {
  const printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.onclick = () => window.print();

  const resetBtn = document.getElementById("resetProgressBtn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      saveCompleted({});
      renderTimeline();
    };
  }
}

// ---------------------------------------------------------------------------
// UTILITIES
// ---------------------------------------------------------------------------
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function escapeHtml(str: string): string {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------------------------------------------------------------------------
// BOOT
// ---------------------------------------------------------------------------
function init(): void {
  renderHero();
  renderCountdown();
  renderCustomVariables();
  renderMediaGallery();
  renderFilters();
  renderTimeline();
  setupAddTaskForm();
  setupButtons();
}

document.addEventListener("DOMContentLoaded", init);
