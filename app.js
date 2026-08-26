const STORAGE_KEY = "gym-schedule-v2";

const dayDefinitions = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" },
];

const programWorkouts = [
  {
    id: "legs-full",
    title: "Full leg day",
    focus: "Quads, hamstrings, glutes and calves",
    duration: "70–85 min",
    warmup: [
      "5–7 min easy bike or incline walk — gradually raise your body temperature.",
      "Ankle rocks and 90/90 hip switches — 8 controlled reps per side.",
      "Bodyweight squats and glute bridges — 2 rounds of 10 reps each.",
      "Before squats, complete 3–4 progressively heavier practice sets without fatigue.",
    ],
    exercises: [
      { id: "back-squat", name: "Back squat", sets: "4 sets", reps: "6–8 reps" },
      { id: "romanian-deadlift", name: "Romanian deadlift", sets: "3 sets", reps: "8–10 reps" },
      { id: "bulgarian-split-squat", name: "Bulgarian split squat", sets: "3 sets", reps: "8–10 / side" },
      { id: "leg-press", name: "Leg press", sets: "3 sets", reps: "10–12 reps" },
      { id: "leg-curl", name: "Seated or lying leg curl", sets: "3 sets", reps: "10–12 reps" },
      { id: "calf-raise", name: "Standing calf raise", sets: "4 sets", reps: "12–15 reps" },
    ],
    notes: [
      "Brace before each squat rep and keep your knees tracking in the same direction as your toes.",
      "Rest 2–3 minutes after squats and Romanian deadlifts; 60–90 seconds is usually enough for accessories.",
      "Use a pain-free range you can control. Reduce the load or range if your position changes under fatigue.",
    ],
  },
  {
    id: "chest-triceps",
    title: "Chest + triceps",
    focus: "Pressing strength, chest volume and triceps",
    duration: "60–75 min",
    warmup: [
      "5–6 min easy rower or bike — finish warm, not tired.",
      "Band pull-aparts and shoulder circles — 2 rounds of 12–15 reps.",
      "Scapular push-ups — 2 sets of 8–10 slow reps.",
      "Before bench press, complete 3–4 practice sets while gradually adding weight.",
    ],
    exercises: [
      { id: "bench-press", name: "Barbell bench press", sets: "4 sets", reps: "6–8 reps" },
      { id: "incline-db-press", name: "Incline dumbbell press", sets: "3 sets", reps: "8–10 reps" },
      { id: "cable-fly", name: "Cable chest fly", sets: "3 sets", reps: "10–15 reps" },
      { id: "overhead-triceps", name: "Overhead cable extension", sets: "3 sets", reps: "10–12 reps" },
      { id: "rope-pushdown", name: "Rope triceps pushdown", sets: "3 sets", reps: "12–15 reps" },
    ],
    notes: [
      "Set your shoulder blades before pressing and keep your feet planted throughout each working set.",
      "Use a bench angle that lets your shoulders move comfortably; a steeper angle shifts more work to the shoulders.",
      "Keep elbows and wrists stacked during presses. Avoid forcing an uncomfortable depth on fly movements.",
    ],
  },
  {
    id: "back",
    title: "Back day",
    focus: "Lats, upper back, rear delts and spinal support",
    duration: "60–75 min",
    warmup: [
      "5–6 min easy rowing with a relaxed grip and smooth strokes.",
      "Cat-cow and open-book thoracic rotations — 6–8 reps per movement.",
      "Scapular pull-ups or pulldown shrugs — 2 sets of 8 controlled reps.",
      "Perform 2–3 light ramp-up sets before your first row or pulldown.",
    ],
    exercises: [
      { id: "pull-up-pulldown", name: "Pull-up or lat pulldown", sets: "4 sets", reps: "6–10 reps" },
      { id: "chest-supported-row", name: "Chest-supported row", sets: "4 sets", reps: "8–10 reps" },
      { id: "single-arm-row", name: "Single-arm cable row", sets: "3 sets", reps: "10–12 / side" },
      { id: "straight-arm-pulldown", name: "Straight-arm pulldown", sets: "3 sets", reps: "12–15 reps" },
      { id: "reverse-fly", name: "Reverse cable fly", sets: "3 sets", reps: "12–15 reps" },
    ],
    notes: [
      "Start each pull by moving the shoulder blade, then drive the elbow without jerking your torso.",
      "Use straps only if grip is limiting the intended back work; continue training grip separately if needed.",
      "Keep your neck neutral and avoid turning rows into uncontrolled lower-back movement.",
    ],
  },
  {
    id: "shoulders-core",
    title: "Shoulders + core",
    focus: "Delts, shoulder control and trunk stability",
    duration: "55–70 min",
    warmup: [
      "5 min easy bike or brisk walk with relaxed arm movement.",
      "Arm circles and wall slides — 2 rounds of 8–10 reps.",
      "Light band external rotations — 2 sets of 12 reps per side.",
      "Complete 2–3 gradual practice sets before the shoulder press.",
    ],
    exercises: [
      { id: "db-shoulder-press", name: "Seated dumbbell press", sets: "4 sets", reps: "6–10 reps" },
      { id: "cable-lateral-raise", name: "Cable lateral raise", sets: "4 sets", reps: "12–15 reps" },
      { id: "rear-delt-fly", name: "Rear-delt fly", sets: "3 sets", reps: "12–15 reps" },
      { id: "face-pull", name: "Face pull", sets: "3 sets", reps: "12–15 reps" },
      { id: "dead-bug", name: "Dead bug", sets: "3 sets", reps: "8–10 / side" },
      { id: "pallof-press", name: "Pallof press", sets: "3 sets", reps: "10 / side" },
      { id: "plank", name: "Front plank", sets: "3 sets", reps: "30–60 sec" },
    ],
    notes: [
      "Keep ribs stacked over your pelvis during presses rather than gaining range by arching your lower back.",
      "Lead lateral raises with the elbows and use a load that does not require swinging.",
      "Core sets should challenge your ability to resist movement while you continue breathing normally.",
    ],
  },
  {
    id: "arms-chest-accessory",
    title: "Arms + chest accessory",
    focus: "Biceps, triceps and controlled chest volume",
    duration: "55–70 min",
    warmup: [
      "5 min easy cardio, gradually increasing the pace.",
      "Band pull-aparts and relaxed arm circles — 2 rounds of 12 reps.",
      "Very light curls and pushdowns — 2 sets of 15 reps each.",
      "Complete 1–2 easy sets before the first chest movement; stop well short of fatigue.",
    ],
    exercises: [
      { id: "machine-chest-press", name: "Machine chest press", sets: "3 sets", reps: "10–12 reps" },
      { id: "low-high-fly", name: "Low-to-high cable fly", sets: "3 sets", reps: "12–15 reps" },
      { id: "ez-bar-curl", name: "EZ-bar curl", sets: "3 sets", reps: "8–12 reps" },
      { id: "incline-curl", name: "Incline dumbbell curl", sets: "3 sets", reps: "10–12 reps" },
      { id: "cable-pushdown", name: "Cable pushdown", sets: "3 sets", reps: "10–12 reps" },
      { id: "overhead-cable-extension", name: "Overhead cable extension", sets: "3 sets", reps: "12–15 reps" },
    ],
    notes: [
      "This is an accessory session: prioritize smooth reps and muscle control over maximum loads.",
      "Keep the upper arm quiet during curls and extensions; stop the set when other joints begin taking over.",
      "If chest, elbows or shoulders have not recovered from earlier sessions, reduce sets or choose a comfortable variation.",
    ],
  },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const defaultState = () => ({
  profileName: "",
  startDayId: "monday",
  trainingDayCount: 5,
  workouts: clone(programWorkouts),
  completions: {},
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.workouts)) return defaultState();

    return {
      profileName: typeof stored.profileName === "string" ? stored.profileName : "",
      startDayId: dayDefinitions.some((day) => day.id === stored.startDayId)
        ? stored.startDayId
        : "monday",
      trainingDayCount: Math.min(5, Math.max(1, Number(stored.trainingDayCount) || 5)),
      workouts: programWorkouts.map((template) => {
        const saved = stored.workouts.find((workout) => workout.id === template.id);
        return saved ? { ...clone(template), ...saved } : clone(template);
      }),
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
  openScheduleSettings: document.querySelector("#openScheduleSettings"),
  dayTabs: document.querySelector("#dayTabs"),
  selectedDayLabel: document.querySelector("#selectedDayLabel"),
  workoutTitle: document.querySelector("#workoutTitle"),
  workoutFocus: document.querySelector("#workoutFocus"),
  workoutMeta: document.querySelector("#workoutMeta"),
  workoutDetails: document.querySelector("#workoutDetails"),
  warmupList: document.querySelector("#warmupList"),
  exerciseList: document.querySelector("#exerciseList"),
  notesList: document.querySelector("#notesList"),
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
  openSettings: document.querySelector("#openSettings"),
  settingsDialog: document.querySelector("#settingsDialog"),
  settingsForm: document.querySelector("#settingsForm"),
  profileName: document.querySelector("#profileName"),
  startDay: document.querySelector("#startDay"),
  trainingDayCount: document.querySelector("#trainingDayCount"),
  resetData: document.querySelector("#resetData"),
  saveStatus: document.querySelector("#saveStatus"),
};

function getDayId(date) {
  return dayDefinitions[(date.getDay() + 6) % 7].id;
}

function getMonday(date = new Date()) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
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

function getSchedule() {
  const startIndex = dayDefinitions.findIndex((day) => day.id === state.startDayId);
  const assignments = new Map();

  for (let index = 0; index < state.trainingDayCount; index += 1) {
    const day = dayDefinitions[(startIndex + index) % dayDefinitions.length];
    const workout = state.workouts[index];
    assignments.set(day.id, {
      ...workout,
      dayId: day.id,
      workoutId: workout.id,
      sequence: index + 1,
      isRest: false,
    });
  }

  return dayDefinitions.map((day) =>
    assignments.get(day.id) || {
      dayId: day.id,
      workoutId: null,
      title: "Recovery day",
      focus: "Rest, walk, hydrate and prepare for the next session",
      duration: "As needed",
      warmup: [],
      exercises: [],
      notes: [],
      sequence: null,
      isRest: true,
    },
  );
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
  const todayWorkout = getSchedule().find((day) => day.dayId === getDayId(now));
  const name = state.profileName.trim();

  elements.fullDate.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);
  elements.greeting.textContent = name ? `Ready to move, ${name}?` : "Ready to move?";
  elements.todaySummary.textContent = todayWorkout.isRest
    ? "Today is a recovery day. Your next session will be waiting when the plan resumes."
    : `Today is ${todayWorkout.title.toLowerCase()} — ${todayWorkout.exercises.length} working exercises.`;
}

function renderWeekRange() {
  const monday = getMonday();
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const monthDay = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
  elements.weekRange.textContent = `${monthDay.format(monday)} – ${monthDay.format(sunday)}`;
  const startDay = dayDefinitions.find((day) => day.id === state.startDayId);
  elements.openScheduleSettings.textContent = `${startDay.label} start · ${state.trainingDayCount} training ${state.trainingDayCount === 1 ? "day" : "days"}`;
}

function renderTabs() {
  const monday = getMonday();
  const todayKey = toDateKey(new Date());
  const schedule = getSchedule();
  elements.dayTabs.replaceChildren();

  dayDefinitions.forEach((definition, index) => {
    const date = new Date(monday);
    const scheduledDay = schedule.find((day) => day.dayId === definition.id);
    date.setDate(monday.getDate() + index);

    const button = createElement("button", "day-tab");
    button.type = "button";
    button.role = "tab";
    button.dataset.dayId = definition.id;
    button.setAttribute("aria-selected", String(definition.id === selectedDayId));
    button.setAttribute("aria-label", `${definition.label}, ${date.getDate()}, ${scheduledDay.title}`);
    if (toDateKey(date) === todayKey) button.classList.add("is-today");
    if (!scheduledDay.isRest) button.classList.add("has-workout");

    button.append(
      createElement("span", "tab-day", definition.short),
      createElement("span", "tab-date", String(date.getDate())),
    );
    elements.dayTabs.append(button);
  });
}

function exerciseCompletionKey(dayId, workoutId, exerciseId) {
  return `${dayId}:${workoutId}:${exerciseId}`;
}

function renderListItems(container, items) {
  container.replaceChildren(...items.map((item) => createElement("li", "", item)));
}

function renderWorkout() {
  const workout = getSchedule().find((day) => day.dayId === selectedDayId);
  const day = dayDefinitions.find((definition) => definition.id === selectedDayId);
  const completion = getWeekCompletion();

  elements.selectedDayLabel.textContent = workout.isRest
    ? day.label
    : `${day.label} · Workout ${workout.sequence}`;
  elements.workoutTitle.textContent = workout.title;
  elements.workoutFocus.textContent = workout.focus;
  elements.workoutMeta.replaceChildren(
    createElement("span", "", workout.duration),
    createElement("span", "", workout.isRest ? "Recovery" : `${workout.exercises.length} exercises`),
  );
  elements.workoutDetails.hidden = workout.isRest;
  elements.restState.hidden = !workout.isRest;
  elements.editWorkout.hidden = workout.isRest;
  elements.exerciseList.replaceChildren();

  if (workout.isRest) return;

  renderListItems(elements.warmupList, workout.warmup);
  renderListItems(elements.notesList, workout.notes);

  workout.exercises.forEach((exercise) => {
    const key = exerciseCompletionKey(workout.dayId, workout.workoutId, exercise.id);
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
  const keys = getSchedule().flatMap((day) =>
    day.exercises.map((exercise) => exerciseCompletionKey(day.dayId, day.workoutId, exercise.id)),
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
  const scheduled = getSchedule().find((day) => day.dayId === selectedDayId);
  if (scheduled.isRest) return;
  const workout = state.workouts.find((item) => item.id === scheduled.workoutId);
  const day = dayDefinitions.find((definition) => definition.id === selectedDayId);
  elements.editDayLabel.textContent = `${day.label} · Workout ${scheduled.sequence}`;
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

  const scheduled = getSchedule().find((day) => day.dayId === selectedDayId);
  const workout = state.workouts.find((item) => item.id === scheduled.workoutId);
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

function openSettingsDialog() {
  elements.profileName.value = state.profileName;
  elements.startDay.value = state.startDayId;
  elements.trainingDayCount.value = String(state.trainingDayCount);
  elements.settingsDialog.showModal();
}

elements.openSettings.addEventListener("click", openSettingsDialog);
elements.openScheduleSettings.addEventListener("click", openSettingsDialog);

elements.settingsForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  state.profileName = elements.profileName.value.trim();
  state.startDayId = elements.startDay.value;
  state.trainingDayCount = Number(elements.trainingDayCount.value);
  saveState();
  elements.settingsDialog.close();
  renderAll();
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
