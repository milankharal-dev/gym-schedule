const STORAGE_KEY = "gym-schedule-v3";
const MUSCLE_IMAGE = "./assets/muscle-anatomy.png";

const dayDefinitions = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" },
];

const e = (id, name, sets, reps, rest, tempo, target, secondary, regions) => ({
  id, name, sets, reps, rest, tempo, target, secondary, regions,
});

const programWorkouts = [
  {
    id: "legs-full", title: "Full leg day", focus: "Quads, hamstrings, glutes and calves", duration: "70–85 min",
    warmup: [
      "5–7 min easy bike or incline walk — finish warm, not tired.",
      "Ankle rocks and 90/90 hip switches — 8 controlled reps per side.",
      "Bodyweight squats and glute bridges — 2 rounds of 10 reps each.",
      "Complete 3–4 progressively heavier squat practice sets before working sets.",
    ],
    exercises: [
      e("back-squat", "Back squat", "4", "6–8", "2–3 min", "3-1-1-0", "Quads", "Glutes, core", ["quads", "glutes"]),
      e("romanian-deadlift", "Romanian deadlift", "3", "8–10", "2–3 min", "3-1-1-0", "Hamstrings", "Glutes, spinal erectors", ["hamstrings", "glutes"]),
      e("bulgarian-split-squat", "Bulgarian split squat", "3", "8–10 / side", "90 sec", "3-1-1-0", "Quads", "Glutes, adductors", ["quads", "glutes"]),
      e("leg-press", "Leg press", "3", "10–12", "90 sec", "3-0-1-0", "Quads", "Glutes", ["quads", "glutes"]),
      e("leg-curl", "Seated or lying leg curl", "3", "10–12", "75 sec", "2-1-2-0", "Hamstrings", "Calves", ["hamstrings"]),
      e("calf-raise", "Standing calf raise", "4", "12–15", "60 sec", "2-1-2-1", "Calves", "Soleus", ["calves"]),
    ],
    notes: [
      "Brace before each squat rep and keep your knees tracking in the same direction as your toes.",
      "Use a pain-free range you can control. Reduce load or range when position changes under fatigue.",
      "Tempo is written as lowering · bottom pause · lifting · top pause, in seconds.",
    ],
  },
  {
    id: "chest-triceps", title: "Chest + triceps", focus: "Pressing strength, chest volume and triceps", duration: "60–75 min",
    warmup: [
      "5–6 min easy rower or bike.", "Band pull-aparts and shoulder circles — 2 rounds of 12–15 reps.",
      "Scapular push-ups — 2 sets of 8–10 controlled reps.", "Complete 3–4 gradual bench-press practice sets.",
    ],
    exercises: [
      e("bench-press", "Barbell bench press", "4", "6–8", "2–3 min", "3-1-1-0", "Chest", "Triceps, front delts", ["chest", "triceps"]),
      e("incline-db-press", "Incline dumbbell press", "3", "8–10", "2 min", "3-0-1-0", "Upper chest", "Front delts, triceps", ["chest", "shoulders"]),
      e("cable-fly", "Cable chest fly", "3", "10–15", "75 sec", "3-1-2-0", "Chest", "Front delts", ["chest"]),
      e("overhead-triceps", "Overhead cable extension", "3", "10–12", "75 sec", "3-1-1-0", "Triceps", "Forearms", ["triceps"]),
      e("rope-pushdown", "Rope triceps pushdown", "3", "12–15", "60 sec", "2-1-2-0", "Triceps", "Forearms", ["triceps"]),
    ],
    notes: [
      "Set your shoulder blades before pressing and keep your feet planted throughout each working set.",
      "Keep elbows and wrists stacked during presses; never force an uncomfortable fly depth.",
      "If your shoulders feel irritated, reduce load and range or choose a comfortable machine variation.",
    ],
  },
  {
    id: "back", title: "Back day", focus: "Lats, upper back, rear delts and biceps", duration: "60–75 min",
    warmup: [
      "5–6 min easy rowing with smooth strokes.", "Cat-cow and open-book rotations — 6–8 reps per movement.",
      "Scapular pull-ups or pulldown shrugs — 2 sets of 8 reps.", "Complete 2–3 light ramp-up sets before the first pull.",
    ],
    exercises: [
      e("pull-up-pulldown", "Pull-up or lat pulldown", "4", "6–10", "2 min", "2-1-1-1", "Lats", "Biceps, upper back", ["lats", "biceps"]),
      e("chest-supported-row", "Chest-supported row", "4", "8–10", "2 min", "2-1-1-1", "Upper back", "Lats, biceps", ["upper-back", "lats"]),
      e("single-arm-row", "Single-arm cable row", "3", "10–12 / side", "90 sec", "2-1-1-1", "Lats", "Upper back, biceps", ["lats"]),
      e("straight-arm-pulldown", "Straight-arm pulldown", "3", "12–15", "75 sec", "2-1-2-0", "Lats", "Teres major", ["lats"]),
      e("reverse-fly", "Reverse cable fly", "3", "12–15", "60 sec", "2-1-2-0", "Rear delts", "Mid traps, rhomboids", ["shoulders", "upper-back"]),
    ],
    notes: [
      "Start each pull by moving the shoulder blade, then drive the elbow without jerking your torso.",
      "Keep your neck neutral and avoid turning rows into uncontrolled lower-back movement.",
      "Straps are optional when grip limits the intended back work.",
    ],
  },
  {
    id: "shoulders-core", title: "Shoulders + core", focus: "Delts, shoulder control and trunk stability", duration: "55–70 min",
    warmup: [
      "5 min easy bike or brisk walk.", "Arm circles and wall slides — 2 rounds of 8–10 reps.",
      "Light band external rotations — 2 sets of 12 reps per side.", "Complete 2–3 gradual shoulder-press practice sets.",
    ],
    exercises: [
      e("db-shoulder-press", "Seated dumbbell press", "4", "6–10", "2 min", "3-0-1-0", "Shoulders", "Triceps, upper chest", ["shoulders", "triceps"]),
      e("cable-lateral-raise", "Cable lateral raise", "4", "12–15", "60 sec", "2-1-2-0", "Side delts", "Upper traps", ["shoulders"]),
      e("rear-delt-fly", "Rear-delt fly", "3", "12–15", "60 sec", "2-1-2-0", "Rear delts", "Rhomboids, mid traps", ["shoulders", "upper-back"]),
      e("face-pull", "Face pull", "3", "12–15", "60 sec", "2-1-2-0", "Rear delts", "Rotator cuff, mid traps", ["shoulders", "upper-back"]),
      e("dead-bug", "Dead bug", "3", "8–10 / side", "45 sec", "3-1-2-0", "Deep core", "Hip flexors", ["core"]),
      e("pallof-press", "Pallof press", "3", "10 / side", "45 sec", "2-2-2-0", "Obliques", "Deep core", ["core"]),
      e("plank", "Front plank", "3", "30–60 sec", "45 sec", "Controlled", "Core", "Glutes, shoulders", ["core"]),
    ],
    notes: [
      "Keep ribs stacked over your pelvis during presses rather than arching your lower back.",
      "Lead lateral raises with the elbows and avoid swinging the weight.",
      "Core sets should resist movement while you continue breathing normally.",
    ],
  },
  {
    id: "arms-chest-accessory", title: "Arms + chest", focus: "Biceps, triceps and controlled chest accessories", duration: "55–70 min",
    warmup: [
      "5 min easy cardio.", "Band pull-aparts and arm circles — 2 rounds of 12 reps.",
      "Very light curls and pushdowns — 2 sets of 15 each.", "Complete 1–2 easy sets before the first chest movement.",
    ],
    exercises: [
      e("machine-chest-press", "Machine chest press", "3", "10–12", "90 sec", "3-0-1-0", "Chest", "Triceps, front delts", ["chest", "triceps"]),
      e("low-high-fly", "Low-to-high cable fly", "3", "12–15", "75 sec", "3-1-2-0", "Upper chest", "Front delts", ["chest"]),
      e("ez-bar-curl", "EZ-bar curl", "3", "8–12", "75 sec", "3-1-1-0", "Biceps", "Brachialis, forearms", ["biceps"]),
      e("incline-curl", "Incline dumbbell curl", "3", "10–12", "60 sec", "3-1-1-0", "Biceps", "Forearms", ["biceps"]),
      e("cable-pushdown", "Cable pushdown", "3", "10–12", "60 sec", "2-1-2-0", "Triceps", "Forearms", ["triceps"]),
      e("overhead-cable-extension", "Overhead cable extension", "3", "12–15", "60 sec", "3-1-1-0", "Triceps", "Forearms", ["triceps"]),
    ],
    notes: [
      "This is an accessory session: prioritize smooth reps and muscle control over maximum loads.",
      "Keep the upper arm quiet during curls and extensions; stop when other joints take over.",
      "Reduce sets if chest, elbows or shoulders have not recovered from earlier sessions.",
    ],
  },
];

const markerPositions = {
  chest: [[24, 24], [35, 24]], shoulders: [[16, 21], [42, 21], [61, 22], [89, 22]],
  triceps: [[61, 34], [90, 34]], biceps: [[15, 32], [43, 32]], lats: [[69, 36], [82, 36]],
  "upper-back": [[75, 27]], core: [[29, 38]], quads: [[23, 62], [36, 62]],
  hamstrings: [[69, 65], [81, 65]], glutes: [[69, 52], [81, 52]], calves: [[69, 79], [81, 79]],
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const defaultState = () => ({
  profileName: "", startDayId: "monday",
  trainingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  workouts: clone(programWorkouts), completions: {},
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored || !Array.isArray(stored.workouts)) return defaultState();
    const validDays = Array.isArray(stored.trainingDays)
      ? stored.trainingDays.filter((id) => dayDefinitions.some((day) => day.id === id)).slice(0, 5) : [];
    const trainingDays = validDays.length ? validDays : defaultState().trainingDays;
    return {
      profileName: typeof stored.profileName === "string" ? stored.profileName : "",
      startDayId: trainingDays.includes(stored.startDayId) ? stored.startDayId : trainingDays[0],
      trainingDays,
      workouts: programWorkouts.map((template) => {
        const saved = stored.workouts.find((workout) => workout.id === template.id);
        return saved ? { ...clone(template), ...saved } : clone(template);
      }),
      completions: stored.completions && typeof stored.completions === "object" ? stored.completions : {},
    };
  } catch { return defaultState(); }
}

let state = loadState();
let selectedDayId = getDayId(new Date());

const $ = (selector) => document.querySelector(selector);
const elements = {
  fullDate: $("#fullDate"), greeting: $("#greeting"), todaySummary: $("#todaySummary"),
  progressPercent: $("#progressPercent"), progressLabel: $("#progressLabel"), dayTabs: $("#dayTabs"),
  workoutHero: $("#workoutHero"), selectedDayLabel: $("#selectedDayLabel"), workoutDuration: $("#workoutDuration"),
  workoutTitle: $("#workoutTitle"), workoutFocus: $("#workoutFocus"), exerciseCount: $("#exerciseCount"),
  workoutDetails: $("#workoutDetails"), warmupList: $("#warmupList"), exerciseList: $("#exerciseList"), notesList: $("#notesList"),
  restState: $("#restState"), editWorkout: $("#editWorkout"), openSettings: $("#openSettings"),
  openScheduleSettings: $("#openScheduleSettings"), settingsDialog: $("#settingsDialog"), settingsForm: $("#settingsForm"),
  profileName: $("#profileName"), startDay: $("#startDay"), scheduleError: $("#scheduleError"), resetData: $("#resetData"),
  editDialog: $("#editDialog"), editForm: $("#editForm"), editDayLabel: $("#editDayLabel"), editTitle: $("#editTitle"),
  editFocus: $("#editFocus"), exerciseEditor: $("#exerciseEditor"), editorTemplate: $("#exerciseEditorRow"),
  addExercise: $("#addExercise"), saveStatus: $("#saveStatus"),
};
const dayCheckboxes = Array.from(document.querySelectorAll(".day-picker input[type='checkbox']"));

function getDayId(date) { return dayDefinitions[(date.getDay() + 6) % 7].id; }
function getMonday(date = new Date()) {
  const result = new Date(date); result.setHours(0, 0, 0, 0);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7)); return result;
}
function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function orderedTrainingDays() {
  const start = dayDefinitions.findIndex((day) => day.id === state.startDayId);
  return Array.from({ length: 7 }, (_, index) => dayDefinitions[(start + index) % 7].id)
    .filter((id) => state.trainingDays.includes(id));
}
function getSchedule() {
  const assigned = new Map();
  orderedTrainingDays().forEach((dayId, index) => assigned.set(dayId, {
    ...state.workouts[index], dayId, workoutId: state.workouts[index].id, sequence: index + 1, isRest: false,
  }));
  return dayDefinitions.map((day) => assigned.get(day.id) || {
    dayId: day.id, title: "Recovery day", focus: "Rest and prepare for the next session", isRest: true, exercises: [],
  });
}
function weekCompletion() {
  const key = toDateKey(getMonday()); if (!state.completions[key]) state.completions[key] = {}; return state.completions[key];
}
function completionKey(workout, exercise) { return `${workout.dayId}:${workout.workoutId}:${exercise.id}`; }
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); elements.saveStatus.textContent = "Saved just now";
  clearTimeout(saveState.timer); saveState.timer = setTimeout(() => { elements.saveStatus.textContent = "All changes saved"; }, 1600);
}
function makeElement(tag, className, text) {
  const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node;
}

function renderHeader() {
  const now = new Date(); const workout = getSchedule().find((day) => day.dayId === getDayId(now));
  elements.fullDate.textContent = new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(now);
  elements.greeting.textContent = state.profileName.trim() ? `Ready, ${state.profileName.trim()}?` : "Ready to train?";
  elements.todaySummary.textContent = workout.isRest ? "Today is for recovery." : `Today: workout ${workout.sequence} · ${workout.title}`;
}
function renderTabs() {
  const monday = getMonday(); const today = toDateKey(new Date()); const schedule = getSchedule(); elements.dayTabs.replaceChildren();
  dayDefinitions.forEach((day, index) => {
    const date = new Date(monday); date.setDate(monday.getDate() + index);
    const scheduled = schedule.find((item) => item.dayId === day.id); const button = makeElement("button", "day-tab");
    button.type = "button"; button.role = "tab"; button.dataset.dayId = day.id;
    button.setAttribute("aria-selected", String(day.id === selectedDayId));
    button.setAttribute("aria-label", `${day.label}, ${date.getDate()}, ${scheduled.title}`);
    if (!scheduled.isRest) button.classList.add("has-workout"); if (toDateKey(date) === today) button.classList.add("is-today");
    button.append(makeElement("span", "tab-day", day.short), makeElement("span", "tab-date", String(date.getDate()))); elements.dayTabs.append(button);
  });
}
function renderTextList(container, items) { container.replaceChildren(...items.map((item) => makeElement("li", "", item))); }
function createMuscleMap(exercise) {
  const map = makeElement("div", "muscle-map"); map.setAttribute("aria-hidden", "true");
  const image = document.createElement("img"); image.src = MUSCLE_IMAGE; image.alt = ""; map.append(image);
  const positions = [...new Set(exercise.regions || ["core"])].flatMap((region) => markerPositions[region] || []);
  positions.forEach(([left, top]) => { const marker = makeElement("span", "muscle-marker"); marker.style.left = `${left}%`; marker.style.top = `${top}%`; map.append(marker); });
  return map;
}
function createExerciseCard(workout, exercise) {
  const key = completionKey(workout, exercise); const complete = Boolean(weekCompletion()[key]);
  const card = makeElement("article", `exercise-card${complete ? " is-complete" : ""}`);
  const top = makeElement("div", "exercise-top"); const toggle = makeElement("label", "completion-toggle");
  const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = complete; checkbox.dataset.completionKey = key;
  checkbox.setAttribute("aria-label", `Mark ${exercise.name} complete`); toggle.append(checkbox);
  const copy = makeElement("div", "exercise-copy"); copy.append(makeElement("h3", "exercise-name", exercise.name));
  const target = makeElement("p", "target-copy"); const strong = makeElement("strong", "", exercise.target || "Target");
  target.append(strong, document.createTextNode(exercise.secondary ? ` · ${exercise.secondary}` : "")); copy.append(target);
  top.append(toggle, copy, createMuscleMap(exercise));
  const prescription = makeElement("div", "prescription");
  [["Sets", exercise.sets], ["Reps", exercise.reps], ["Rest", exercise.rest]].forEach(([label, value]) => {
    const item = makeElement("div"); item.append(makeElement("span", "", label), makeElement("strong", "", value || "—")); prescription.append(item);
  });
  const tempo = makeElement("div", "tempo-row"); tempo.append(makeElement("span", "", "Tempo"), makeElement("strong", "", exercise.tempo || "Controlled"));
  card.append(top, prescription, tempo); return card;
}
function renderWorkout() {
  const workout = getSchedule().find((day) => day.dayId === selectedDayId); const day = dayDefinitions.find((item) => item.id === selectedDayId);
  elements.workoutHero.hidden = workout.isRest; elements.workoutDetails.hidden = workout.isRest; elements.restState.hidden = !workout.isRest;
  if (workout.isRest) return;
  elements.selectedDayLabel.textContent = `${day.label} · Workout ${workout.sequence}`; elements.workoutDuration.textContent = workout.duration;
  elements.workoutTitle.textContent = workout.title; elements.workoutFocus.textContent = workout.focus;
  elements.exerciseCount.textContent = `${workout.exercises.length} exercises`;
  renderTextList(elements.warmupList, workout.warmup); renderTextList(elements.notesList, workout.notes);
  elements.exerciseList.replaceChildren(...workout.exercises.map((exercise) => createExerciseCard(workout, exercise)));
}
function renderProgress() {
  const completion = weekCompletion(); const keys = getSchedule().flatMap((workout) => workout.exercises.map((exercise) => completionKey(workout, exercise)));
  const done = keys.filter((key) => completion[key]).length; const percent = keys.length ? Math.round(done / keys.length * 100) : 0;
  elements.progressPercent.textContent = `${percent}%`; elements.progressLabel.textContent = `${done}/${keys.length}`;
}
function renderAll() { renderHeader(); renderTabs(); renderWorkout(); renderProgress(); }

function makeId(name) {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "exercise";
  return `${slug}-${globalThis.crypto?.randomUUID?.().slice(0, 6) || Math.random().toString(36).slice(2, 8)}`;
}
function addEditorRow(exercise = {}) {
  const fragment = elements.editorTemplate.content.cloneNode(true); const row = fragment.querySelector(".editor-row"); row.dataset.exerciseId = exercise.id || "";
  const values = { ".exercise-name-input": exercise.name, ".sets-input": exercise.sets, ".reps-input": exercise.reps, ".rest-input": exercise.rest, ".tempo-input": exercise.tempo, ".target-input": exercise.target, ".secondary-input": exercise.secondary };
  Object.entries(values).forEach(([selector, value]) => { row.querySelector(selector).value = value || ""; });
  row.querySelector(".region-input").value = exercise.regions?.[0] || "core"; elements.exerciseEditor.append(fragment);
}
function openEditDialog() {
  const scheduled = getSchedule().find((day) => day.dayId === selectedDayId); if (scheduled.isRest) return;
  const workout = state.workouts.find((item) => item.id === scheduled.workoutId); elements.editDayLabel.textContent = `Workout ${scheduled.sequence}`;
  elements.editTitle.value = workout.title; elements.editFocus.value = workout.focus; elements.exerciseEditor.replaceChildren();
  workout.exercises.forEach(addEditorRow); elements.editDialog.showModal();
}
function openSettingsDialog() {
  elements.profileName.value = state.profileName; elements.startDay.value = state.startDayId; elements.scheduleError.textContent = "";
  dayCheckboxes.forEach((checkbox) => { checkbox.checked = state.trainingDays.includes(checkbox.value); }); elements.settingsDialog.showModal();
}

elements.dayTabs.addEventListener("click", (event) => { const tab = event.target.closest(".day-tab"); if (!tab) return; selectedDayId = tab.dataset.dayId; renderTabs(); renderWorkout(); });
elements.exerciseList.addEventListener("change", (event) => { const checkbox = event.target.closest("input[type='checkbox']"); if (!checkbox) return; weekCompletion()[checkbox.dataset.completionKey] = checkbox.checked; saveState(); renderWorkout(); renderProgress(); });
elements.editWorkout.addEventListener("click", openEditDialog); elements.openSettings.addEventListener("click", openSettingsDialog); elements.openScheduleSettings.addEventListener("click", openSettingsDialog);
dayCheckboxes.forEach((checkbox) => checkbox.addEventListener("change", () => {
  const checked = dayCheckboxes.filter((item) => item.checked); if (checked.length > 5) { checkbox.checked = false; elements.scheduleError.textContent = "Choose no more than five training days."; } else { elements.scheduleError.textContent = ""; }
}));
elements.settingsForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return; event.preventDefault(); const selected = dayCheckboxes.filter((item) => item.checked).map((item) => item.value);
  if (!selected.length) { elements.scheduleError.textContent = "Choose at least one training day."; return; }
  if (!selected.includes(elements.startDay.value)) { elements.scheduleError.textContent = "Your first training day must also be selected below."; return; }
  state.profileName = elements.profileName.value.trim(); state.startDayId = elements.startDay.value; state.trainingDays = selected; saveState(); elements.settingsDialog.close(); renderAll();
});
elements.resetData.addEventListener("click", () => {
  if (!confirm("Reset your plan, edits and completion history? This cannot be undone on this device.")) return;
  state = defaultState(); saveState(); elements.settingsDialog.close(); selectedDayId = getDayId(new Date()); renderAll();
});
elements.addExercise.addEventListener("click", () => { addEditorRow(); elements.exerciseEditor.lastElementChild?.querySelector(".exercise-name-input")?.focus(); });
elements.exerciseEditor.addEventListener("click", (event) => { const button = event.target.closest(".remove-exercise"); if (button) button.closest(".editor-row").remove(); });
elements.editForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return; event.preventDefault(); if (!elements.editForm.reportValidity()) return;
  const scheduled = getSchedule().find((day) => day.dayId === selectedDayId); const workout = state.workouts.find((item) => item.id === scheduled.workoutId);
  workout.title = elements.editTitle.value.trim(); workout.focus = elements.editFocus.value.trim();
  workout.exercises = Array.from(elements.exerciseEditor.querySelectorAll(".editor-row")).map((row) => {
    const name = row.querySelector(".exercise-name-input").value.trim(); return {
      id: row.dataset.exerciseId || makeId(name), name, sets: row.querySelector(".sets-input").value.trim(), reps: row.querySelector(".reps-input").value.trim(),
      rest: row.querySelector(".rest-input").value.trim(), tempo: row.querySelector(".tempo-input").value.trim(), target: row.querySelector(".target-input").value.trim(),
      secondary: row.querySelector(".secondary-input").value.trim(), regions: [row.querySelector(".region-input").value],
    };
  });
  saveState(); elements.editDialog.close(); renderAll();
});
[elements.settingsDialog, elements.editDialog].forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js"));
renderAll();
