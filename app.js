const STORAGE_KEY = "gym-schedule-v1";

const dayDefinitions = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" },
];

const sampleSchedule = [
  {
    id: "monday",
    title: "Push day",
    focus: "Chest, shoulders & triceps",
    exercises: [
      { id: "bench-press", name: "Bench press", sets: "4 sets", reps: "6–8 reps" },
      { id: "shoulder-press", name: "Shoulder press", sets: "3 sets", reps: "8–10 reps" },
      { id: "incline-db-press", name: "Incline dumbbell press", sets: "3 sets", reps: "10–12 reps" },
      { id: "tricep-pushdown", name: "Tricep pushdown", sets: "3 sets", reps: "12–15 reps" },
    ],
  },
  {
    id: "tuesday",
    title: "Pull day",
    focus: "Back, rear delts & biceps",
    exercises: [
      { id: "lat-pulldown", name: "Lat pulldown", sets: "4 sets", reps: "8–10 reps" },
      { id: "cable-row", name: "Seated cable row", sets: "3 sets", reps: "8–12 reps" },
      { id: "face-pull", name: "Face pull", sets: "3 sets", reps: "12–15 reps" },
      { id: "db-curl", name: "Dumbbell curl", sets: "3 sets", reps: "10–12 reps" },
    ],
  },
  {
    id: "wednesday",
    title: "Active recovery",
    focus: "Mobility, light cardio or a full rest day",
    exercises: [],
  },
  {
    id: "thursday",
    title: "Leg day",
    focus: "Quads, hamstrings, glutes & calves",
    exercises: [
      { id: "squat", name: "Back squat", sets: "4 sets", reps: "6–8 reps" },
      { id: "rdl", name: "Romanian deadlift", sets: "3 sets", reps: "8–10 reps" },
      { id: "leg-press", name: "Leg press", sets: "3 sets", reps: "10–12 reps" },
      { id: "calf-raise", name: "Standing calf raise", sets: "3 sets", reps: "12–15 reps" },
    ],
  },
  {
    id: "friday",
    title: "Upper body",
    focus: "Balanced strength and accessories",
    exercises: [
      { id: "pull-up", name: "Pull-up", sets: "4 sets", reps: "6–10 reps" },
      { id: "db-bench", name: "Dumbbell bench press", sets: "3 sets", reps: "8–10 reps" },
      { id: "lateral-raise", name: "Lateral raise", sets: "3 sets", reps: "12–15 reps" },
      { id: "hammer-curl", name: "Hammer curl", sets: "3 sets", reps: "10–12 reps" },
    ],
  },
  {
    id: "saturday",
    title: "Conditioning",
    focus: "Cardio, core and work capacity",
    exercises: [
      { id: "incline-walk", name: "Incline treadmill walk", sets: "1 round", reps: "20 min" },
      { id: "plank", name: "Plank", sets: "3 sets", reps: "45 sec" },
      { id: "farmers-carry", name: "Farmer’s carry", sets: "4 rounds", reps: "30 m" },
    ],
  },
  {
    id: "sunday",
    title: "Rest day",
    focus: "Recover and prepare for the week ahead",
    exercises: [],
  },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const defaultState = () => ({
  profileName: "",
  schedule: clone(sampleSchedule),
  completions: {},
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.schedule)) return defaultState();

    const schedule = dayDefinitions.map((definition) => {
      const savedDay = stored.schedule.find((day) => day.id === definition.id);
      return savedDay || sampleSchedule.find((day) => day.id === definition.id);
    });

    return {
      profileName: typeof stored.profileName === "string" ? stored.profileName : "",
      schedule,
      completions: stored.completions && typeof stored.completions === "object" ? stored.completions : {},
    };
  } catch {
    return defaultState();
  }
}

let state = loadState();
let selectedDayId = getDayId(new Date());

const elements = {
  fullDate: document.querySelector("#fullDate"),
  greeting: document.querySelector("#greeting"),
  todaySummary: document.querySelector("#todaySummary"),
  progressRing: document.querySelector("#progressRing"),
  progressPercent: document.querySelector("#progressPercent"),
  progressLabel: document.querySelector("#progressLabel"),
  weekRange: document.querySelector("#weekRange"),
  dayTabs: document.querySelector("#dayTabs"),
  selectedDayLabel: document.querySelector("#selectedDayLabel"),
  workoutTitle: document.querySelector("#workoutTitle"),
  workoutFocus: document.querySelector("#workoutFocus"),
  exerciseList: document.querySelector("#exerciseList"),
  restState: document.querySelector("#restState"),
  editWorkout: document.querySelector("#editWorkout"),
  editDialog: document.querySelector("#editDialog"),
  editForm: document.querySelector("#editForm"),
  editDayLabel: document.querySelector("#editDayLabel"),
  editTitle: document.querySelector("#editTitle"),
  editFocus: document.querySelector("#editFocus"),
  exerciseEditor: document.querySelector("#exerciseEditor"),
  editorTemplate: document.querySelector("#exerciseEditorRow"),
  addExercise: document.querySelector("#addExercise"),
  saveWorkout: document.querySelector("#saveWorkout"),
  openSettings: document.querySelector("#openSettings"),
  settingsDialog: document.querySelector("#settingsDialog"),
  settingsForm: document.querySelector("#settingsForm"),
  profileName: document.querySelector("#profileName"),
  resetData: document.querySelector("#resetData"),
  saveStatus: document.querySelector("#saveStatus"),
};

function getDayId(date) {
  return dayDefinitions[(date.getDay() + 6) % 7].id;
}

function getMonday(date = new Date()) {
  const result = new Date(date);
  const day = result.getDay();
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - ((day + 6) % 7));
  return result;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekKey() {
  return toDateKey(getMonday());
}

function getWeekCompletion() {
  const key = getWeekKey();
  if (!state.completions[key]) state.completions[key] = {};
  return state.completions[key];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  elements.saveStatus.textContent = "Saved just now";
  window.clearTimeout(saveState.statusTimer);
  saveState.statusTimer = window.setTimeout(() => {
    elements.saveStatus.textContent = "All changes saved";
  }, 1800);
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderHeader() {
  const now = new Date();
  const todayId = getDayId(now);
  const todayWorkout = state.schedule.find((day) => day.id === todayId);
  const name = state.profileName.trim();

  elements.fullDate.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);
  elements.greeting.textContent = name ? `Ready to move, ${name}?` : "Ready to move?";
  elements.todaySummary.textContent = todayWorkout.exercises.length
    ? `Today is ${todayWorkout.title.toLowerCase()} — ${todayWorkout.exercises.length} exercises on deck.`
    : `Today is ${todayWorkout.title.toLowerCase()}. Make recovery count.`;
}

function renderWeekRange() {
  const monday = getMonday();
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const monthDay = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
  elements.weekRange.textContent = `${monthDay.format(monday)} – ${monthDay.format(sunday)}`;
}

function renderTabs() {
  const monday = getMonday();
  const todayKey = toDateKey(new Date());
  elements.dayTabs.replaceChildren();

  dayDefinitions.forEach((definition, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    const button = createElement("button", "day-tab");
    button.type = "button";
    button.role = "tab";
    button.dataset.dayId = definition.id;
    button.setAttribute("aria-selected", String(definition.id === selectedDayId));
    button.setAttribute("aria-label", `${definition.label}, ${date.getDate()}`);
    if (toDateKey(date) === todayKey) button.classList.add("is-today");

    button.append(
      createElement("span", "tab-day", definition.short),
      createElement("span", "tab-date", String(date.getDate())),
    );
    elements.dayTabs.append(button);
  });
}

function exerciseCompletionKey(dayId, exerciseId) {
  return `${dayId}:${exerciseId}`;
}

function renderWorkout() {
  const workout = state.schedule.find((day) => day.id === selectedDayId);
  const day = dayDefinitions.find((definition) => definition.id === selectedDayId);
  const completion = getWeekCompletion();

  elements.selectedDayLabel.textContent = day.label;
  elements.workoutTitle.textContent = workout.title;
  elements.workoutFocus.textContent = workout.focus || "Add a focus or note for this workout.";
  elements.exerciseList.replaceChildren();
  elements.exerciseList.hidden = workout.exercises.length === 0;
  elements.restState.hidden = workout.exercises.length > 0;

  workout.exercises.forEach((exercise) => {
    const key = exerciseCompletionKey(workout.id, exercise.id);
    const complete = Boolean(completion[key]);
    const label = createElement("label", `exercise-item${complete ? " is-complete" : ""}`);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = complete;
    checkbox.dataset.completionKey = key;
    checkbox.setAttribute("aria-label", `Mark ${exercise.name} complete`);

    const textWrap = createElement("span", "exercise-text");
    textWrap.append(
      createElement("span", "exercise-name", exercise.name),
      createElement("span", "exercise-meta", exercise.sets || "Exercise"),
    );
    label.append(
      checkbox,
      createElement("span", "checkmark"),
      textWrap,
      createElement("span", "exercise-count", exercise.reps || ""),
    );
    elements.exerciseList.append(label);
  });
}

function renderProgress() {
  const completion = getWeekCompletion();
  const keys = state.schedule.flatMap((day) =>
    day.exercises.map((exercise) => exerciseCompletionKey(day.id, exercise.id)),
  );
  const completed = keys.filter((key) => completion[key]).length;
  const percentage = keys.length ? Math.round((completed / keys.length) * 100) : 0;

  elements.progressRing.style.setProperty("--progress", `${percentage * 3.6}deg`);
  elements.progressPercent.textContent = `${percentage}%`;
  elements.progressLabel.textContent = `${completed} of ${keys.length}`;
}

function renderAll() {
  renderHeader();
  renderWeekRange();
  renderTabs();
  renderWorkout();
  renderProgress();
}

function makeId(name) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "exercise";
  const suffix = globalThis.crypto?.randomUUID?.().slice(0, 6) || Math.random().toString(36).slice(2, 8);
  return `${slug}-${suffix}`;
}

function addEditorRow(exercise = {}) {
  const fragment = elements.editorTemplate.content.cloneNode(true);
  const row = fragment.querySelector(".editor-row");
  row.dataset.exerciseId = exercise.id || "";
  row.querySelector(".exercise-name-input").value = exercise.name || "";
  row.querySelector(".sets-input").value = exercise.sets || "";
  row.querySelector(".reps-input").value = exercise.reps || "";
  elements.exerciseEditor.append(fragment);
}

function openEditDialog() {
  const workout = state.schedule.find((day) => day.id === selectedDayId);
  const day = dayDefinitions.find((definition) => definition.id === selectedDayId);
  elements.editDayLabel.textContent = day.label;
  elements.editTitle.value = workout.title;
  elements.editFocus.value = workout.focus;
  elements.exerciseEditor.replaceChildren();
  workout.exercises.forEach(addEditorRow);
  elements.editDialog.showModal();
}

elements.dayTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".day-tab");
  if (!button) return;
  selectedDayId = button.dataset.dayId;
  renderTabs();
  renderWorkout();
});

elements.exerciseList.addEventListener("change", (event) => {
  const checkbox = event.target.closest("input[type='checkbox']");
  if (!checkbox) return;
  getWeekCompletion()[checkbox.dataset.completionKey] = checkbox.checked;
  saveState();
  renderWorkout();
  renderProgress();
});

elements.editWorkout.addEventListener("click", openEditDialog);

elements.addExercise.addEventListener("click", () => {
  addEditorRow();
  elements.exerciseEditor.lastElementChild?.querySelector(".exercise-name-input")?.focus();
});

elements.exerciseEditor.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-exercise");
  if (removeButton) removeButton.closest(".editor-row").remove();
});

elements.editForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  if (!elements.editForm.reportValidity()) return;

  const workout = state.schedule.find((day) => day.id === selectedDayId);
  const exercises = Array.from(elements.exerciseEditor.querySelectorAll(".editor-row")).map((row) => {
    const name = row.querySelector(".exercise-name-input").value.trim();
    return {
      id: row.dataset.exerciseId || makeId(name),
      name,
      sets: row.querySelector(".sets-input").value.trim(),
      reps: row.querySelector(".reps-input").value.trim(),
    };
  });

  workout.title = elements.editTitle.value.trim();
  workout.focus = elements.editFocus.value.trim();
  workout.exercises = exercises;
  saveState();
  elements.editDialog.close();
  renderAll();
});

elements.openSettings.addEventListener("click", () => {
  elements.profileName.value = state.profileName;
  elements.settingsDialog.showModal();
});

elements.settingsForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  state.profileName = elements.profileName.value.trim();
  saveState();
  elements.settingsDialog.close();
  renderHeader();
});

elements.resetData.addEventListener("click", () => {
  const confirmed = window.confirm(
    "Reset your schedule and completion history? This cannot be undone on this device.",
  );
  if (!confirmed) return;
  state = defaultState();
  saveState();
  elements.settingsDialog.close();
  selectedDayId = getDayId(new Date());
  renderAll();
});

[elements.editDialog, elements.settingsDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
}

renderAll();
