const STORAGE_KEY = "gym-schedule-v5";
const LEGACY_STORAGE_KEYS = ["gym-schedule-v4", "gym-schedule-v3"];
const PROGRAM_VERSION = 3;
const MUSCLE_IMAGE = "./assets/muscle-anatomy.png";
const exerciseAtlases = {
  best: {
    "legs-full": { src: "./assets/best-mix-legs-v1.png", rows: 4, layout: "wide" },
    "chest-triceps": { src: "./assets/best-mix-chest-triceps-v1.png", rows: 3, layout: "wide" },
    back: { src: "./assets/best-mix-back-v1.png", rows: 3, layout: "wide" },
    "shoulders-core": { src: "./assets/best-mix-shoulders-core-v1.png", rows: 3, layout: "wide" },
    "arms-chest-accessory": { src: "./assets/best-mix-arms-chest-v1.png", rows: 3, layout: "wide" },
  },
  machine: {
    "legs-full": { src: "./assets/equipment-machine-legs-v1.png", rows: 3, layout: "wide" },
    "chest-triceps": { src: "./assets/equipment-machine-chest-v1.png", rows: 3, layout: "wide" },
    back: { src: "./assets/equipment-machine-back-v1.png", columns: 4, rows: 3, cells: [0, 2, 4, 6, 8, 10], layout: "wide" },
    "shoulders-core": { src: "./assets/equipment-machine-shoulders-core-v1.png", rows: 4, layout: "wide" },
    "arms-chest-accessory": { src: "./assets/equipment-machine-arms-chest-v1.png", rows: 3, layout: "wide" },
  },
  dumbbell: {
    "legs-full": { src: "./assets/equipment-dumbbell-legs-v1.png", rows: 3, layout: "wide" },
    "chest-triceps": { src: "./assets/equipment-dumbbell-chest-v1.png", rows: 3, layout: "wide" },
    back: { src: "./assets/equipment-dumbbell-back-v1.png", rows: 3, cells: [1, 0, 2, 3, 4, 5], layout: "wide" },
    "shoulders-core": { src: "./assets/equipment-dumbbell-shoulders-core-v1.png", rows: 4, layout: "wide" },
    "arms-chest-accessory": { src: "./assets/equipment-dumbbell-arms-chest-v1.png", rows: 3, layout: "wide" },
  },
  barbell: {
    "legs-full": { src: "./assets/equipment-barbell-legs-v1.png", rows: 3, layout: "wide" },
    "chest-triceps": { src: "./assets/equipment-barbell-chest-v1.png", rows: 3, layout: "wide" },
    back: { src: "./assets/equipment-barbell-back-v1.png", rows: 3, cells: [1, 0, 2, 3, 4, 5], layout: "wide" },
    "shoulders-core": { src: "./assets/equipment-barbell-shoulders-core-v1.png", rows: 4, layout: "wide" },
    "arms-chest-accessory": { src: "./assets/equipment-barbell-arms-chest-v1.png", rows: 3, layout: "wide" },
  },
};

const equipmentProfiles = {
  beginner: { label: "Beginner", short: "Beginner · easy machines", visualProfile: "machine", description: "Easiest stable machines with 2–3 working sets." },
  machine: { label: "Machines", short: "Machines only", visualProfile: "machine", description: "Machine, cable and Smith-machine exercises only." },
  dumbbell: { label: "Dumbbells", short: "Dumbbells only", visualProfile: "dumbbell", description: "Dumbbell resistance only; unavailable movement patterns are omitted." },
  barbell: { label: "Barbells", short: "Barbells only", visualProfile: "barbell", description: "Barbell and EZ-bar exercises only; duplicate substitutions are omitted." },
  best: { label: "Best mix", short: "Best equipment mix", visualProfile: "best", description: "The strongest practical combination of free weights, cables and machines." },
};

const equipmentProfileNotes = {
  beginner: "Beginner mode uses stable machines and 2–3 working sets. Build consistent form first; add load only after every rep feels controlled.",
  dumbbell: {
    back: "Dumbbell-only limitation: dumbbells cannot reproduce a true vertical pull. For maximum lat development, use a pull-up or pulldown when available instead of adding another row.",
  },
  barbell: {
    "legs-full": "Barbell-only limitation: no barbell movement directly reproduces knee-flexion leg curls, so that duplicate hinge slot is omitted. Use a leg-curl machine when direct hamstring work is available.",
    "chest-triceps": "Barbell-only limitation: the fly slot is omitted because another barbell press would duplicate pressing volume. A pec deck or cable fly is the better complement when available.",
    back: "Barbell-only limitation: there is no true barbell vertical pull, so the plan uses a heavy row plus pullover. A pull-up or pulldown remains the better addition for back width when available.",
    "shoulders-core": "Barbell-only limitation: face pulls are omitted to avoid duplicating rear-delt rows. Machines or dumbbells are usually easier for precise side- and rear-delt isolation.",
  },
};

const dayDefinitions = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" },
];

const e = (id, name, sets, reps, rest, tempo, target, secondary, regions, extras = {}) => ({
  id, name, sets, reps, rest, tempo, target, secondary, regions, ...extras,
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
      "Coverage: quads, hamstrings, glutes, adductors and calves all receive direct or compound work.",
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
      "Coverage: flat and incline pressing train the full chest, while both overhead and pushdown patterns train the triceps.",
      "Set your shoulder blades before pressing and keep your feet planted throughout each working set.",
      "Keep elbows and wrists stacked during presses; never force an uncomfortable fly depth.",
      "If your shoulders feel irritated, reduce load and range or choose a comfortable machine variation.",
    ],
  },
  {
    id: "back", title: "Back day", focus: "Lats, upper back, lower back, rear delts and traps", duration: "70–85 min",
    warmup: [
      "5–6 min easy rowing with smooth strokes.", "Cat-cow and open-book rotations — 6–8 reps per movement.",
      "Scapular pull-ups or pulldown shrugs — 2 sets of 8 reps.", "Complete 2–3 light ramp-up sets before the first pull.",
    ],
    exercises: [
      e("pull-up-pulldown", "Weighted pull-up or heavy lat pulldown", "4", "6–8", "2–3 min", "2-1-1-1", "Lats", "Biceps, upper back", ["lats", "biceps"]),
      e("bench-supported-row", "Bench-supported dumbbell row", "4", "8–10", "2 min", "2-1-1-1", "Upper back", "Lats, biceps", ["upper-back", "lats"]),
      e("back-extension", "45-degree back extension", "3", "10–15", "90 sec", "3-1-1-1", "Lower back", "Glutes, hamstrings", ["lower-back", "glutes"]),
      e("straight-arm-pulldown", "Straight-arm pulldown", "3", "12–15", "75 sec", "2-1-2-0", "Lats", "Teres major", ["lats"]),
      e("reverse-fly", "Reverse cable fly", "3", "12–15", "60 sec", "2-1-2-0", "Rear delts", "Mid traps, rhomboids", ["shoulders", "upper-back"]),
      e("dumbbell-shrug", "Dumbbell shrug", "3", "10–15", "75 sec", "2-1-2-1", "Upper traps", "Levator scapulae", ["upper-back"]),
    ],
    notes: [
      "Coverage: vertical and horizontal pulls train back width and thickness; extensions and shrugs add direct lower-back and upper-trap work.",
      "Start each pull by moving the shoulder blade, then drive the elbow without jerking your torso.",
      "Keep back extensions controlled with a neutral spine; this is direct lower-back work, not a max-load hinge.",
      "The Romanian deadlift already trains the hip hinge on leg day, so do not add heavy good mornings here.",
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
      "Coverage: presses train front delts, raises train side delts, and fly/face-pull work trains rear delts and shoulder control.",
      "Keep ribs stacked over your pelvis during presses rather than arching your lower back.",
      "Lead lateral raises with the elbows and avoid swinging the weight.",
      "Core sets should resist movement while you continue breathing normally.",
    ],
  },
  {
    id: "arms-chest-accessory", title: "Biceps + upper-body refresh", focus: "Biceps growth with a small chest and triceps maintenance dose", duration: "45–60 min",
    warmup: [
      "5 min easy cardio — finish warm, not tired.", "Wrist circles, arm circles and band pull-aparts — 2 rounds of 10–12 reps.",
      "Very light curls and pushdowns — 2 sets of 15 each.", "Complete 2–3 gradual practice sets of the first curl before working sets.",
    ],
    exercises: [
      e("ez-bar-curl", "EZ-bar curl", "4", "6–10", "90 sec", "3-1-1-0", "Biceps", "Brachialis, forearms", ["biceps"], { primaryLabel: "Primary biceps lift", visualIndex: 2 }),
      e("incline-curl", "Incline dumbbell curl", "4", "8–12", "75 sec", "3-1-1-0", "Biceps", "Forearms", ["biceps"], { visualIndex: 3 }),
      e("low-high-fly", "Low-to-high cable fly", "2", "10–15", "60 sec", "3-1-2-0", "Upper chest", "Front delts", ["chest"], { visualIndex: 1 }),
      e("cable-pushdown", "Cable pushdown", "2", "10–15", "60 sec", "2-1-2-0", "Triceps", "Forearms", ["triceps"], { visualIndex: 4 }),
    ],
    notes: [
      "Priority: two biceps exercises come first; chest and triceps each receive only one refresher exercise, keeping this from turning into another push day.",
      "Programming limitation: direct biceps exercises are single-joint movements. A chest or back compound first would shift focus away from biceps, so the heaviest curl is the primary lift today.",
      "The first curl is the heavier loading slot; the second trains the biceps in a lengthened position. These are complementary angles, not duplicate exercises.",
      "Keep the upper arm quiet during curls and stop the set when your shoulders or lower back begin moving the weight.",
      "Chest and triceps work is maintenance volume. Do not add extra sets unless those muscles are fully recovered from the earlier chest session.",
    ],
  },
];

const bestMixProgramWorkouts = [
  {
    id: "legs-full", title: "Legs — full", focus: "Complete quads, glutes, hamstrings, adductors and calves", duration: "75–90 min",
    warmup: [
      "5 min bike.", "Hip circles — 10 reps per side.", "Leg swings — 10 reps per side.",
      "Bodyweight goblet squat — 10 reps.", "Squat warm-up sets: 50% × 8, then 70% × 5.",
    ],
    exercises: [
      e("back-squat", "Barbell Back Squat", "4", "6–8", "3 min", "Controlled", "Quads", "Glutes, hamstrings", ["quads", "glutes", "hamstrings"], { alternativeVisualIndex: 0 }),
      e("romanian-deadlift", "Romanian Deadlift", "4", "8–10", "2.5 min", "3 sec down", "Hamstrings", "Glutes", ["hamstrings", "glutes", "lower-back"], { alternativeVisualIndex: 1 }),
      e("leg-press", "Leg Press (feet low/narrow)", "3", "10–12", "2 min", "Controlled", "Quads", "VMO / teardrop", ["quads", "glutes"], { alternativeVisualIndex: 3 }),
      e("hip-thrust", "Hip Thrust", "3", "12–15", "90 sec", "Squeeze 1 sec at top", "Glutes", "Hamstrings", ["glutes", "hamstrings"]),
      e("leg-curl", "Lying Leg Curl", "3", "12–15", "90 sec", "3 sec down", "Hamstrings", "Knee-flexion emphasis", ["hamstrings"], { alternativeVisualIndex: 4 }),
      e("hip-adductor", "Hip Adductor Machine", "3", "15–20", "60 sec", "Slow squeeze", "Inner thighs", "Adductors", ["adductors"]),
      e("calf-raise-superset", "Calf Raise Superset ★", "4", "15–20 each", "60 sec", "2 sec down, pause at top", "Calves", "Gastrocnemius, soleus", ["calves"], { primaryLabel: "Calf superset" }),
    ],
    notes: [
      "Calf superset: perform 15–20 standing calf raises, immediately perform 15–20 seated calf raises, then rest 60 seconds. Do not rest between the two movements.",
      "Squat: use the deepest comfortable range you can control and keep knees tracking over the toes.",
      "Romanian deadlift: hinge at the hips and never round the lower back.",
      "Hip thrust: drive through the heels and finish by squeezing the glutes rather than arching the back.",
      "Leg curl: control the full 3-second lowering phase. Calf raises: use a full stretch without bouncing.",
    ],
  },
  {
    id: "chest-triceps", title: "Chest + triceps", focus: "Heavy pressing with complete chest and triceps coverage", duration: "65–80 min",
    warmup: [
      "Band pull-aparts — 15 reps.", "Arm circles — 10 reps per direction.", "Flat-bench warm-up sets: 50% × 8, then 70% × 5.",
    ],
    exercises: [
      e("incline-db-press", "Incline Barbell Press", "4", "6–8", "3 min", "2 sec down, explosive up", "Upper chest", "Triceps, front delts", ["chest", "triceps", "shoulders"], { alternativeVisualIndex: 1 }),
      e("bench-press", "Flat Dumbbell Press", "3", "8–10", "2 min", "2 sec down, full stretch", "Mid chest", "Triceps, deeper stretch", ["chest", "triceps"], { alternativeVisualIndex: 0 }),
      e("weighted-dips", "Weighted Dips ★ (lean 15–20°)", "3", "8–12", "2 min", "Controlled", "Lower chest", "Triceps", ["chest", "triceps"]),
      e("cable-fly", "Cable Fly (low-mid angle)", "3", "12–15", "60 sec", "2 sec stretch, squeeze at top", "Inner chest line", "Front delts", ["chest"], { alternativeVisualIndex: 2 }),
      e("overhead-triceps", "Cable Overhead Extension", "3", "10–12", "90 sec", "3 sec down", "Triceps long head", "Forearms", ["triceps"], { alternativeVisualIndex: 3 }),
      e("rope-pushdown", "Rope Pushdown", "3", "12–15", "60 sec", "Squeeze at bottom", "Triceps lateral head", "Forearms", ["triceps"], { alternativeVisualIndex: 4 }),
    ],
    notes: [
      "Coverage: incline press targets upper chest, flat dumbbell press targets mid chest, weighted dips target lower chest, and the cable fly finishes the chest through adduction.",
      "Keep pressing elbows roughly 45–75° from the torso rather than flared to 90°.",
      "For chest-biased dips, lean forward. A decline barbell press is the listed replacement when dips are unavailable or uncomfortable.",
      "Keep a soft elbow bend during cable flyes and never force the shoulder into a painful stretch.",
      "The overhead extension emphasizes the long head; the pushdown emphasizes the lateral head. Use the prescribed controlled lowering phases.",
    ],
  },
  {
    id: "back", title: "Back", focus: "Lat width, back thickness, lower back, traps and rear delts", duration: "70–85 min",
    warmup: [
      "Band pull-aparts — 10 reps.", "Cat-cow — 10 reps.", "Bodyweight scapular pull-ups — 10 reps.",
      "Row warm-up sets: 50% × 8, then 70% × 5.",
    ],
    exercises: [
      e("bent-over-barbell-row", "Bent-Over Barbell Row", "4", "8–10", "2.5 min", "3 sec down, row to lower chest", "Mid back", "Lats, thickness", ["upper-back", "lats", "biceps"]),
      e("pull-up-pulldown", "Pull-Up / Lat Pulldown", "4", "8–10", "2.5 min", "2 sec down, full stretch", "Lats", "Back width, V-taper", ["lats", "biceps"], { alternativeVisualIndex: 0 }),
      e("chest-supported-machine-row", "Chest-Supported Machine Row ★", "3", "10–12", "2 min", "Controlled", "Full back", "Minimal spinal loading", ["upper-back", "lats"]),
      e("hyperextension-machine", "Hyperextension Machine", "3", "12–15", "90 sec", "Controlled", "Lower back", "Spinal erectors, glutes", ["lower-back", "glutes"]),
      e("seated-cable-row", "Seated Cable Row", "3", "12–15", "90 sec", "2 sec stretch, squeeze back", "Rhomboids", "Lower traps", ["upper-back", "lats"]),
      e("reverse-fly", "Reverse Pec Deck Machine", "2", "15–20", "60 sec", "Slow and controlled", "Rear delts", "Shoulder health", ["shoulders", "upper-back"], { alternativeVisualIndex: 4 }),
    ],
    notes: [
      "Coverage: pull-ups or pulldowns build lat width; barbell, machine and cable rows cover thickness and mid-back; hyperextensions train the lower back; reverse pec deck trains rear delts.",
      "Bent-over row: use roughly a 45° hip hinge, brace the core and avoid momentum.",
      "Pull-up: reach a controlled dead hang at the bottom and pull the chin over the bar without swinging.",
      "Seated row: allow a controlled forward stretch before rowing. Keep reverse pec-deck work light because rear delts are trained again on the next workout.",
      "Optional progression: when ready for conventional deadlifts, replace the chest-supported machine row, place the deadlift first and move the bent-over row to second. Start light and learn the hip hinge before adding load.",
    ],
  },
  {
    id: "shoulders-core", title: "Shoulders + core", focus: "Side and rear delts, upper traps and complete core work", duration: "50–65 min",
    warmup: [
      "Band pull-aparts — 15 reps.", "Arm circles — 10 reps per direction.", "Shoulder CARs — 10 slow, full-range reps per side.",
    ],
    exercises: [
      e("cable-lateral-raise", "DB Lateral Raise → Cable Lateral Raise ★", "4", "12–15 each", "90 sec", "Slow, no swinging", "Side delts", "Shoulder width", ["shoulders"], { primaryLabel: "Primary superset", alternativeVisualIndex: 1 }),
      e("rear-delt-fly", "Reverse Pec Deck Machine", "3", "15–20", "60 sec", "Squeeze, 2 sec return", "Rear delts", "3D shoulder roundness", ["shoulders", "upper-back"], { alternativeVisualIndex: 2 }),
      e("dumbbell-shrug", "Dumbbell Shrug", "3", "15–20", "60 sec", "Hold 1 sec at top", "Upper traps", "Levator scapulae", ["upper-back"], { alternativeVisualIndex: 5, alternativeWorkoutId: "back" }),
      e("cable-crunch", "Cable Crunch", "3", "15–20", "60 sec", "Controlled", "Rectus abdominis", "Deep core", ["core"]),
      e("hanging-leg-raise", "Hanging Leg Raise", "3", "12–15", "60 sec", "Controlled", "Lower abs", "Hip flexors", ["core"]),
      e("weighted-russian-twist", "Russian Twist (weighted)", "3", "20 / side", "60 sec", "Controlled", "Obliques", "Deep core", ["core"]),
    ],
    notes: [
      "Lateral-raise superset: perform 12–15 dumbbell lateral raises, immediately perform 12–15 cable lateral raises, then rest 90 seconds. Dumbbells load the bottom differently; cables maintain tension through more of the range.",
      "Lead lateral raises with the elbows, stop near shoulder height and do not swing.",
      "Shrug straight up and down without rolling the shoulders. During cable crunches, move through the abs rather than pulling with the arms.",
      "No overhead press in this Best Mix session: front delts were loaded heavily during chest training, while this day prioritizes side and rear delts before they receive indirect work again on day five.",
    ],
  },
  {
    id: "arms-chest-accessory", title: "Arms + chest accessory", focus: "Fresh biceps, complete triceps and a small chest maintenance stimulus", duration: "60–75 min",
    warmup: [
      "Arm circles — 10 reps per direction.", "Bodyweight curls — 10 controlled reps.", "Band triceps pushdowns — 10 reps.",
    ],
    exercises: [
      e("ez-bar-curl", "EZ Bar Curl", "4", "8–10", "2 min", "3 sec down, explosive up", "Biceps — both heads", "Overall biceps mass", ["biceps"], { primaryLabel: "Primary biceps lift", alternativeVisualIndex: 2 }),
      e("incline-curl", "Incline Dumbbell Curl", "3", "10–12", "90 sec", "3 sec down, stop at 90°", "Biceps long head", "Peak emphasis", ["biceps"], { alternativeVisualIndex: 3 }),
      e("hammer-curl", "Hammer Curl", "3", "12–15", "90 sec", "Controlled", "Brachialis", "Forearm thickness", ["biceps"]),
      e("close-grip-bench", "Close-Grip Bench Press", "3", "8–10", "2 min", "2 sec down, elbows tucked", "Triceps", "Overall triceps mass, chest", ["triceps", "chest"], { alternativeVisualIndex: 0 }),
      e("cable-pushdown", "Rope Pushdown", "3", "12–15", "60 sec", "Squeeze at bottom", "Triceps lateral head", "Horseshoe emphasis", ["triceps"], { alternativeVisualIndex: 4 }),
      e("low-high-fly", "Cable Fly", "2", "15", "60 sec", "2 sec stretch, squeeze at top", "Chest", "Pump and maintenance stimulus", ["chest"], { alternativeVisualIndex: 1 }),
    ],
    notes: [
      "Coverage: EZ-bar curls train overall biceps mass, incline curls emphasize the long head, and hammer curls add brachialis and forearm thickness.",
      "Keep the elbows pinned during EZ-bar curls without swinging. On incline curls, keep the stretch controlled and stop near 90° as prescribed.",
      "Keep a neutral wrist during hammer curls. On close-grip bench press, use roughly shoulder-width hands and keep elbows near 45° rather than forcing an extremely narrow grip.",
      "The cable fly is only a two-set chest refresher; it is not another full chest session.",
      "Weekend recovery: prioritize sleep and full rest. Light walking and comfortable mobility work are fine; avoid adding unnecessary muscle-damaging sessions.",
    ],
  },
];

const equipmentVariants = {
  "back-squat": {
    machine: { name: "Hack squat machine" },
    dumbbell: { name: "Goblet dumbbell squat", reps: "8–12" },
    barbell: { name: "Barbell back squat" },
  },
  "romanian-deadlift": {
    machine: { name: "Smith-machine Romanian deadlift" },
    dumbbell: { name: "Dumbbell Romanian deadlift" },
    barbell: { name: "Barbell Romanian deadlift" },
  },
  "bulgarian-split-squat": {
    machine: { name: "Single-leg press machine", reps: "10–12 / side" },
    dumbbell: { name: "Dumbbell reverse lunge" },
    barbell: { name: "Barbell reverse lunge" },
  },
  "leg-press": {
    machine: { name: "Seated leg press machine" },
    dumbbell: { name: "Dumbbell step-up", reps: "10–12 / side" },
    barbell: { name: "Barbell front squat", reps: "8–10", rest: "2 min" },
  },
  "leg-curl": {
    machine: { name: "Seated leg-curl machine" },
    dumbbell: { name: "Lying dumbbell leg curl" },
    barbell: { skip: true },
  },
  "calf-raise": {
    machine: { name: "Standing calf-raise machine" },
    dumbbell: { name: "Standing dumbbell calf raise" },
    barbell: { name: "Standing barbell calf raise" },
  },
  "bench-press": {
    machine: { name: "Seated chest-press machine" },
    dumbbell: { name: "Flat dumbbell bench press" },
    barbell: { name: "Flat barbell bench press" },
  },
  "incline-db-press": {
    machine: { name: "Incline chest-press machine" },
    dumbbell: { name: "Incline dumbbell press" },
    barbell: { name: "Incline barbell bench press" },
  },
  "cable-fly": {
    machine: { name: "Pec-deck fly machine" },
    dumbbell: { name: "Flat dumbbell chest fly" },
    barbell: { skip: true },
  },
  "overhead-triceps": {
    machine: { name: "Seated triceps-extension machine" },
    dumbbell: { name: "Seated dumbbell overhead extension" },
    barbell: { name: "EZ-bar skull crusher" },
  },
  "rope-pushdown": {
    machine: { name: "Seated triceps-dip machine", reps: "10–12", rest: "75 sec" },
    dumbbell: { name: "Lying dumbbell triceps extension", reps: "10–12" },
    barbell: { name: "Close-grip barbell bench press", reps: "8–10", rest: "90 sec", secondary: "Chest, front delts" },
  },
  "pull-up-pulldown": {
    machine: { name: "Plate-loaded lat-pulldown machine" },
    dumbbell: { name: "Bench-supported one-arm dumbbell row", reps: "8–10 / side", target: "Lats", secondary: "Upper back, biceps" },
    barbell: { name: "Bent-over barbell row", reps: "6–8", target: "Upper back", secondary: "Lats, biceps" },
  },
  "bench-supported-row": {
    machine: { name: "Chest-supported row machine" },
    dumbbell: { name: "Dumbbell pullover", reps: "10–12", target: "Lats", secondary: "Teres major, triceps" },
    barbell: { name: "Barbell pullover", reps: "10–12", target: "Lats", secondary: "Teres major, triceps" },
  },
  "back-extension": {
    machine: { name: "Seated back-extension machine" },
    dumbbell: { name: "Dumbbell-loaded 45-degree back extension" },
    barbell: { name: "Barbell good morning", reps: "8–12", rest: "2 min" },
  },
  "straight-arm-pulldown": {
    machine: { name: "Pullover machine" },
    dumbbell: { skip: true },
    barbell: { skip: true },
  },
  "reverse-fly": {
    machine: { name: "Reverse pec-deck machine" },
    dumbbell: { name: "Chest-supported dumbbell reverse fly" },
    barbell: { name: "Wide-elbow barbell rear-delt row", reps: "10–12", rest: "75 sec" },
  },
  "dumbbell-shrug": {
    machine: { name: "Plate-loaded shrug machine" },
    dumbbell: { name: "Standing dumbbell shrug" },
    barbell: { name: "Standing barbell shrug" },
  },
  "db-shoulder-press": {
    machine: { name: "Seated shoulder-press machine" },
    dumbbell: { name: "Seated dumbbell shoulder press" },
    barbell: { name: "Standing barbell overhead press" },
  },
  "cable-lateral-raise": {
    machine: { name: "Lateral-raise machine" },
    dumbbell: { name: "Standing dumbbell lateral raise" },
    barbell: { name: "Wide-grip barbell upright row", reps: "10–12", secondary: "Upper traps" },
  },
  "rear-delt-fly": {
    machine: { name: "Reverse pec-deck rear-delt fly" },
    dumbbell: { name: "Chest-supported dumbbell rear-delt fly" },
    barbell: { name: "Wide-elbow barbell rear-delt row", reps: "10–12" },
  },
  "face-pull": {
    machine: { name: "Cable face pull" },
    dumbbell: { skip: true },
    barbell: { skip: true },
  },
  "dead-bug": {
    machine: { name: "Ab-crunch machine", reps: "10–15", target: "Abs", secondary: "Deep core" },
    dumbbell: { name: "Dumbbell dead-bug pullover", target: "Deep core", secondary: "Lats, hip flexors" },
    barbell: { name: "Kneeling barbell rollout", reps: "8–12", target: "Abs", secondary: "Lats, shoulders" },
  },
  "pallof-press": {
    machine: { name: "Rotary-torso machine", reps: "10–12 / side" },
    dumbbell: { name: "One-arm dumbbell suitcase carry", reps: "30–45 sec / side", rest: "45 sec", secondary: "Grip, deep core" },
    barbell: { name: "Landmine barbell rotation", reps: "8–12 / side", rest: "60 sec", secondary: "Shoulders, deep core" },
  },
  plank: {
    machine: { name: "Captain’s-chair knee raise", reps: "10–15", target: "Abs", secondary: "Hip flexors" },
    dumbbell: { name: "Dumbbell-weighted front plank" },
    barbell: { name: "Front-rack barbell carry", reps: "30–45 sec", rest: "60 sec", secondary: "Upper back, glutes" },
  },
  "close-grip-bench": {
    machine: { name: "Seated triceps-dip machine" },
    dumbbell: { name: "Neutral-grip dumbbell bench press" },
    barbell: { name: "Close-grip barbell bench press" },
  },
  "low-high-fly": {
    machine: { name: "Incline chest-press machine", reps: "10–12", rest: "90 sec" },
    dumbbell: { name: "Low-incline dumbbell chest fly" },
    barbell: { name: "Incline barbell bench press", reps: "8–10", rest: "90 sec", secondary: "Triceps, front delts" },
  },
  "ez-bar-curl": {
    machine: { name: "Preacher-curl machine" },
    dumbbell: { name: "Alternating dumbbell curl" },
    barbell: { name: "Standing EZ-bar curl" },
  },
  "incline-curl": {
    machine: { name: "Bayesian cable curl" },
    dumbbell: { name: "Incline dumbbell curl" },
    barbell: { name: "EZ-bar preacher curl" },
  },
  "cable-pushdown": {
    machine: { name: "Cable triceps pushdown" },
    dumbbell: { name: "Dumbbell triceps kickback" },
    barbell: { name: "Barbell JM press", reps: "8–10", rest: "90 sec", secondary: "Chest, front delts" },
  },
  "overhead-cable-extension": {
    machine: { name: "Seated triceps-extension machine" },
    dumbbell: { name: "Seated dumbbell overhead extension" },
    barbell: { name: "EZ-bar skull crusher" },
  },
  "calf-raise-superset": {
    machine: { name: "Standing + seated calf-raise machines", visualIndex: 5 },
    dumbbell: { name: "Standing + seated dumbbell calf raises", visualIndex: 5 },
    barbell: { name: "Standing barbell calf raise", visualIndex: 5 },
  },
  "weighted-dips": {
    machine: { name: "Seated triceps-dip machine", visualIndex: 4 },
    dumbbell: { name: "Neutral-grip dumbbell bench press", visualIndex: 0 },
    barbell: { name: "Decline barbell bench press", visualIndex: 0 },
  },
  "bent-over-barbell-row": {
    machine: { name: "Chest-supported row machine", visualIndex: 1 },
    dumbbell: { name: "Bench-supported one-arm dumbbell row", visualIndex: 0 },
    barbell: { name: "Bent-over barbell row", visualIndex: 0 },
  },
  "chest-supported-machine-row": {
    machine: { name: "Chest-supported row machine", visualIndex: 1 },
    dumbbell: { name: "Bench-supported one-arm dumbbell row", visualIndex: 0 },
    barbell: { name: "Bent-over barbell row", visualIndex: 0 },
  },
  "hyperextension-machine": {
    machine: { name: "Seated back-extension machine", visualIndex: 2 },
    dumbbell: { name: "Dumbbell-loaded 45-degree back extension", visualIndex: 2 },
    barbell: { name: "Barbell good morning", visualIndex: 2 },
  },
  "seated-cable-row": {
    machine: { name: "Seated row machine", visualIndex: 1 },
    dumbbell: { name: "Bench-supported one-arm dumbbell row", visualIndex: 0 },
    barbell: { name: "Bent-over barbell row", visualIndex: 0 },
  },
  "cable-crunch": {
    machine: { name: "Ab-crunch machine", visualIndex: 4 },
  },
  "hanging-leg-raise": {
    machine: { name: "Captain’s-chair knee raise", visualIndex: 6 },
  },
  "weighted-russian-twist": {
    machine: { name: "Rotary-torso machine", visualIndex: 5 },
    barbell: { name: "Landmine barbell rotation", visualIndex: 5 },
  },
};

const exerciseAlternatives = {
  "back-squat": {
    options: ["Hack squat machine", "Pendulum squat machine", "Smith-machine squat"],
    recommendation: "Machine squats are excellent for quad growth and easier to stabilize. Keep the barbell squat only if you enjoy it and can progress with consistent form.",
  },
  "romanian-deadlift": {
    options: ["Smith-machine Romanian deadlift", "Plate-loaded hip-hinge machine", "Dumbbell Romanian deadlift"],
    recommendation: "Keep a hip-hinge pattern for hamstrings, glutes and spinal erectors; a leg curl alone is not an equal replacement.",
  },
  "bulgarian-split-squat": {
    options: ["Single-leg press", "Smith-machine split squat", "Reverse lunge"],
    recommendation: "The single-leg press is the easiest stable choice. Use a split squat when you also want balance and hip-control practice.",
  },
  "leg-press": {
    options: ["Hack squat machine", "Pendulum squat machine", "Belt squat machine"],
    recommendation: "Choose only one stable quad-press exercise here; these variations largely duplicate one another.",
  },
  "leg-curl": {
    options: ["Seated leg-curl machine", "Lying leg-curl machine", "Single-leg curl machine"],
    recommendation: "Prefer the seated machine when comfortable because it trains the hamstrings in a more lengthened hip position.",
  },
  "calf-raise": {
    options: ["Standing calf-raise machine", "Leg-press calf raise", "Smith-machine calf raise"],
    recommendation: "Use the option that allows a deep stretch, full rise and pause without bouncing. A seated raise can be added only when extra soleus work is needed.",
  },
  "bench-press": {
    options: ["Plate-loaded chest-press machine", "Selectorized chest-press machine", "Dumbbell bench press"],
    recommendation: "A chest-press machine is just as useful for chest growth when it fits your joints. Keep barbell bench if building that specific strength skill matters to you.",
  },
  "incline-db-press": {
    options: ["Incline chest-press machine", "Smith-machine incline press", "Incline barbell press"],
    recommendation: "The incline machine is the simplest growth-focused option because stability is handled for you.",
  },
  "cable-fly": {
    options: ["Pec-deck machine", "Single-arm cable fly", "Dumbbell fly"],
    recommendation: "Prefer the pec deck or cable because resistance stays more consistent. Use only one fly variation.",
  },
  "overhead-triceps": {
    options: ["Triceps-extension machine", "Single-arm overhead cable extension", "EZ-bar skull crusher"],
    recommendation: "Keep one overhead pattern to train the long head of the triceps at longer muscle lengths.",
  },
  "rope-pushdown": {
    options: ["Machine triceps dip", "Straight-bar cable pushdown", "V-bar cable pushdown"],
    recommendation: "The cable attachments are interchangeable; choose the one most comfortable for your wrists and elbows.",
  },
  "pull-up-pulldown": {
    options: ["Plate-loaded pulldown machine", "Selectorized lat pulldown", "Assisted pull-up machine"],
    recommendation: "For growth, the stable pulldown is a great default. Use weighted pull-ups if you specifically want pull-up strength and can complete clean reps.",
  },
  "bench-supported-row": {
    options: ["Chest-supported row machine", "Seated cable row", "T-bar row with chest pad"],
    recommendation: "Prefer a chest-supported machine so the lower back does not limit upper-back work. Choose only one heavy horizontal row.",
  },
  "back-extension": {
    options: ["Selectorized back-extension machine", "Reverse-hyper machine", "Roman-chair back extension"],
    recommendation: "Use controlled reps, not maximal loading. If Romanian deadlifts leave your lower back fatigued, reduce this to two light sets rather than adding another hinge.",
  },
  "straight-arm-pulldown": {
    options: ["Pullover machine", "Cable pullover", "Single-arm straight-arm pulldown"],
    recommendation: "A pullover machine is the easiest stable lat-isolation option. Choose one; these fill the same role.",
  },
  "reverse-fly": {
    options: ["Reverse pec-deck machine", "Cable reverse fly", "Chest-supported dumbbell reverse fly"],
    recommendation: "Prefer the reverse pec deck for stability. Do not add another rear-delt fly on top.",
  },
  "dumbbell-shrug": {
    options: ["Plate-loaded shrug machine", "Smith-machine shrug", "Barbell shrug"],
    recommendation: "The machine is easiest to load without balance limiting the upper traps. Pause at the top rather than rolling the shoulders.",
  },
  "db-shoulder-press": {
    options: ["Shoulder-press machine", "Smith-machine shoulder press", "Barbell overhead press"],
    recommendation: "A machine press is the most stable growth-focused option. Keep dumbbells when you value independent-arm control and they feel comfortable.",
  },
  "cable-lateral-raise": {
    options: ["Lateral-raise machine", "Single-arm cable lateral raise", "Dumbbell lateral raise"],
    recommendation: "Prefer the machine or cable for steady tension. Choose one lateral-raise variation.",
  },
  "rear-delt-fly": {
    options: ["Reverse pec-deck machine", "Cable rear-delt fly", "Chest-supported dumbbell fly"],
    recommendation: "Use one rear-delt fly. The reverse pec deck is usually the simplest option to progress.",
  },
  "face-pull": {
    options: ["Rear-delt row machine", "High cable row", "Band face pull"],
    recommendation: "This overlaps with rear-delt flies. Keep two light sets for shoulder control, or skip it if rear delts and upper back are already well trained.",
  },
  "dead-bug": {
    options: ["Ab-crunch machine", "Kneeling cable crunch", "Bird dog"],
    recommendation: "Choose the machine or cable crunch when direct ab growth is the priority; keep dead bugs when trunk control is the priority.",
  },
  "pallof-press": {
    options: ["Rotary-torso machine", "Cable chop", "Band Pallof press"],
    recommendation: "The Pallof press trains anti-rotation control. Use the rotary machine when direct oblique growth is the higher priority, with a controlled range.",
  },
  "plank": {
    options: ["Ab-crunch machine", "Cable crunch", "Body saw"],
    recommendation: "A machine or cable crunch is easier to progressively load for ab growth; keep planks when endurance and bracing are the goal.",
  },
  "close-grip-bench": {
    options: ["Machine triceps dip", "Plate-loaded close-grip press", "Parallel-bar dip"],
    recommendation: "The machine dip is the simplest stable option. Keep close-grip bench if you want pressing strength as well as triceps growth.",
  },
  "low-high-fly": {
    options: ["Converging incline chest-press machine", "Incline chest-fly machine", "Single-arm low-to-high cable fly"],
    recommendation: "Choose one upper-chest isolation. Do not add it to multiple incline fly variations.",
  },
  "ez-bar-curl": {
    options: ["Preacher-curl machine", "Cable curl machine", "Straight-bar curl"],
    recommendation: "The preacher machine is stable and easy to progress. Keep the EZ bar if its grip feels better and you value free-weight skill.",
  },
  "incline-curl": {
    options: ["Biceps-curl machine with arm behind torso", "Bayesian cable curl", "Incline dumbbell curl"],
    recommendation: "Keep one curl that challenges the biceps in a lengthened position; it complements rather than duplicates the bilateral curl exactly.",
  },
  "cable-pushdown": {
    options: ["Machine triceps dip", "Straight-bar cable pushdown", "V-bar cable pushdown"],
    recommendation: "Cable attachment changes are minor. Choose the version that is most comfortable and do not perform all of them.",
  },
  "overhead-cable-extension": {
    options: ["Triceps-extension machine", "Single-arm overhead cable extension", "EZ-bar skull crusher"],
    recommendation: "Keep one overhead extension for the long head of the triceps. It complements the pushdown; multiple overhead variations would be duplicate volume.",
  },
};

const markerPositions = {
  chest: [[24, 24], [35, 24]], shoulders: [[16, 21], [42, 21], [61, 22], [89, 22]],
  triceps: [[61, 34], [90, 34]], biceps: [[15, 32], [43, 32]], lats: [[69, 36], [82, 36]],
  "upper-back": [[75, 27]], "lower-back": [[75, 43]], core: [[29, 38]], quads: [[23, 62], [36, 62]],
  adductors: [[27, 64], [32, 64]], hamstrings: [[69, 65], [81, 65]], glutes: [[69, 52], [81, 52]], calves: [[69, 79], [81, 79]],
};

const clone = (value) => JSON.parse(JSON.stringify(value));
const defaultState = () => ({
  profileName: "", equipmentProfile: "best", startDayId: "monday",
  trainingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  programVersion: PROGRAM_VERSION, workouts: clone(programWorkouts), bestMixWorkouts: clone(bestMixProgramWorkouts), completions: {},
});

function loadState() {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const legacy = LEGACY_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    const stored = JSON.parse(current || legacy);
    if (!stored) return defaultState();
    const validDays = Array.isArray(stored.trainingDays)
      ? stored.trainingDays.filter((id) => dayDefinitions.some((day) => day.id === id)).slice(0, 5) : [];
    const trainingDays = validDays.length ? validDays : defaultState().trainingDays;
    const needsProgramUpdate = stored.programVersion !== PROGRAM_VERSION;
    return {
      profileName: typeof stored.profileName === "string" ? stored.profileName : "",
      equipmentProfile: equipmentProfiles[stored.equipmentProfile] ? stored.equipmentProfile : "best",
      startDayId: trainingDays.includes(stored.startDayId) ? stored.startDayId : trainingDays[0],
      trainingDays,
      programVersion: PROGRAM_VERSION,
      workouts: Array.isArray(stored.workouts) ? programWorkouts.map((template) => {
        const saved = stored.workouts.find((workout) => workout.id === template.id);
        return saved ? { ...clone(template), ...saved } : clone(template);
      }) : clone(programWorkouts),
      bestMixWorkouts: !needsProgramUpdate && Array.isArray(stored.bestMixWorkouts) ? bestMixProgramWorkouts.map((template) => {
        const saved = stored.bestMixWorkouts.find((workout) => workout.id === template.id);
        return saved ? { ...clone(template), ...saved } : clone(template);
      }) : clone(bestMixProgramWorkouts),
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
  profileName: $("#profileName"), equipmentProfile: $("#equipmentProfile"), equipmentProfileHelp: $("#equipmentProfileHelp"),
  startDay: $("#startDay"), scheduleError: $("#scheduleError"), resetData: $("#resetData"),
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
function resolveExerciseVariant(exercise, slotIndex, profileId = state.equipmentProfile) {
  const visualProfile = equipmentProfiles[profileId]?.visualProfile || "best";
  const sourceProfile = profileId === "beginner" ? "machine" : profileId;
  const variant = sourceProfile === "best" ? {} : equipmentVariants[exercise.id]?.[sourceProfile];
  if (variant?.skip) return null;
  const resolved = {
    ...exercise,
    ...(variant || {}),
    baseName: exercise.name,
    profileId,
    visualProfile,
    visualIndex: variant?.visualIndex ?? exercise.visualIndex ?? slotIndex,
  };
  if (profileId === "beginner") resolved.sets = slotIndex === 0 ? "3" : "2–3";
  return resolved;
}
function getSchedule() {
  const assigned = new Map();
  const activeWorkouts = state.equipmentProfile === "best" ? state.bestMixWorkouts : state.workouts;
  orderedTrainingDays().forEach((dayId, index) => {
    const workout = activeWorkouts[index];
    const exercises = workout.exercises
      .map((exercise, slotIndex) => resolveExerciseVariant(exercise, slotIndex))
      .filter(Boolean);
    const profileNotes = equipmentProfileNotes[state.equipmentProfile];
    const equipmentNote = typeof profileNotes === "string" ? profileNotes : profileNotes?.[workout.id];
    const notes = equipmentNote ? [...workout.notes, equipmentNote] : workout.notes;
    assigned.set(dayId, { ...workout, exercises, notes, dayId, workoutId: workout.id, sequence: index + 1, isRest: false });
  });
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
  map.append(makeElement("span", "visual-label", "Target"));
  return map;
}
function createMovementVisual(workout, exercise, index, profileId = exercise.visualProfile, className = "movement-visual") {
  const atlas = exerciseAtlases[profileId]?.[exercise.visualWorkoutId || workout.workoutId];
  const visual = makeElement("div", className);
  visual.setAttribute("role", "img");
  visual.setAttribute("aria-label", `${exercise.name} visual reference`);
  if (atlas) {
    if (className === "movement-visual" && atlas.rows === 4) visual.classList.add("is-landscape");
    if (className === "movement-visual" && atlas.layout === "wide") visual.classList.add("is-wide");
    const columns = atlas.columns || 2;
    const sourceIndex = atlas.cells?.[index] ?? index;
    const column = sourceIndex % columns;
    const row = Math.floor(sourceIndex / columns);
    const horizontalPosition = columns === 1 ? 0 : (column / (columns - 1)) * 100;
    const verticalPosition = atlas.rows === 1 ? 0 : (row / (atlas.rows - 1)) * 100;
    visual.style.backgroundImage = `url("${atlas.src}")`;
    visual.style.backgroundSize = `${columns * 100}% ${atlas.rows * 100}%`;
    visual.style.backgroundPosition = `${horizontalPosition}% ${verticalPosition}%`;
  }
  if (className === "movement-visual") visual.append(makeElement("span", "visual-label", "Movement"));
  return visual;
}
function getAlternativeChoices(exercise) {
  const variants = equipmentVariants[exercise.id]; if (!variants) return [];
  const seen = new Set([exercise.name.toLowerCase()]);
  return ["machine", "dumbbell", "barbell", "best"].flatMap((profileId) => {
    const variant = profileId === "best" ? { name: exercise.baseName } : variants[profileId];
    if (!variant || variant.skip || !variant.name) return [];
    const normalized = variant.name.toLowerCase(); if (seen.has(normalized)) return [];
    seen.add(normalized);
    return [{
      name: variant.name,
      profileId,
      label: equipmentProfiles[profileId].label,
      visualProfile: equipmentProfiles[profileId].visualProfile,
      visualIndex: variant.visualIndex ?? exercise.alternativeVisualIndex ?? exercise.visualIndex,
      visualWorkoutId: variant.visualWorkoutId ?? exercise.alternativeWorkoutId,
    }];
  });
}
function createExerciseCard(workout, exercise, index) {
  const key = completionKey(workout, exercise); const complete = Boolean(weekCompletion()[key]);
  const card = makeElement("article", `exercise-card${index === 0 ? " is-primary" : ""}${complete ? " is-complete" : ""}`);
  const top = makeElement("div", "exercise-top"); const toggle = makeElement("label", "completion-toggle");
  const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = complete; checkbox.dataset.completionKey = key;
  checkbox.setAttribute("aria-label", `Mark ${exercise.name} complete`); toggle.append(checkbox);
  const copy = makeElement("div", "exercise-copy");
  if (index === 0) copy.append(makeElement("span", "exercise-role", exercise.primaryLabel || "Primary compound"));
  copy.append(makeElement("span", "exercise-tool", equipmentProfiles[state.equipmentProfile].label));
  copy.append(makeElement("h3", "exercise-name", exercise.name));
  const target = makeElement("p", "target-copy"); const strong = makeElement("strong", "", exercise.target || "Target");
  target.append(strong, document.createTextNode(exercise.secondary ? ` · ${exercise.secondary}` : "")); copy.append(target);
  top.append(toggle, copy);
  const referenceVisuals = makeElement("div", "reference-visuals");
  referenceVisuals.append(createMovementVisual(workout, exercise, exercise.visualIndex ?? index), createMuscleMap(exercise));
  const prescription = makeElement("div", "prescription");
  [["Sets", exercise.sets], ["Reps", exercise.reps], ["Rest", exercise.rest]].forEach(([label, value]) => {
    const item = makeElement("div"); item.append(makeElement("span", "", label), makeElement("strong", "", value || "—")); prescription.append(item);
  });
  const tempo = makeElement("div", "tempo-row"); tempo.append(makeElement("span", "", "Tempo"), makeElement("strong", "", exercise.tempo || "Controlled"));
  card.append(top, referenceVisuals, prescription, tempo);
  const guidance = exerciseAlternatives[exercise.id];
  const alternatives = getAlternativeChoices(exercise);
  if (alternatives.length) {
    const controlsId = `alternatives-${workout.dayId}-${exercise.id}`;
    const button = makeElement("button", "alternatives-button");
    button.type = "button"; button.dataset.alternativesTarget = controlsId; button.dataset.closedLabel = `Show ${alternatives.length} alternatives`;
    button.setAttribute("aria-expanded", "false"); button.setAttribute("aria-controls", controlsId);
    button.append(makeElement("span", "", `Show ${alternatives.length} alternatives`), makeElement("span", "machine-first", "With images"), makeElement("span", "alternatives-chevron", "⌄"));
    const panel = makeElement("div", "alternatives-panel"); panel.id = controlsId; panel.hidden = true;
    panel.append(makeElement("p", "alternatives-intro", "Same training slot — choose one replacement:"));
    const list = makeElement("ul", "alternative-options");
    alternatives.forEach((alternative) => {
      const item = makeElement("li", "alternative-option");
      const altExercise = { name: alternative.name, visualWorkoutId: alternative.visualWorkoutId };
      const visual = createMovementVisual(workout, altExercise, alternative.visualIndex ?? exercise.visualIndex ?? index, alternative.visualProfile, "alternative-visual");
      const text = makeElement("div"); text.append(makeElement("span", "alternative-profile", alternative.label), makeElement("strong", "", alternative.name));
      item.append(visual, text); list.append(item);
    });
    const recommendation = makeElement("p", "coach-note");
    recommendation.append(makeElement("strong", "", "Coach’s take"), document.createTextNode(guidance?.recommendation || "Use the option you can perform comfortably and progress consistently. Replace the programmed exercise rather than adding duplicate sets."));
    panel.append(list, recommendation); card.append(button, panel);
  }
  return card;
}
function renderWorkout() {
  const workout = getSchedule().find((day) => day.dayId === selectedDayId); const day = dayDefinitions.find((item) => item.id === selectedDayId);
  elements.workoutHero.hidden = workout.isRest; elements.workoutDetails.hidden = workout.isRest; elements.restState.hidden = !workout.isRest;
  if (workout.isRest) return;
  elements.selectedDayLabel.textContent = `${day.label} · Workout ${workout.sequence} · ${equipmentProfiles[state.equipmentProfile].short}`; elements.workoutDuration.textContent = workout.duration;
  elements.workoutTitle.textContent = workout.title; elements.workoutFocus.textContent = workout.focus;
  elements.exerciseCount.textContent = `${workout.exercises.length} exercises`;
  renderTextList(elements.warmupList, workout.warmup); renderTextList(elements.notesList, workout.notes);
  elements.exerciseList.replaceChildren(...workout.exercises.map((exercise, index) => createExerciseCard(workout, exercise, index)));
}
function renderProgress() {
  const completion = weekCompletion(); const keys = getSchedule().flatMap((workout) => workout.exercises.map((exercise) => completionKey(workout, exercise)));
  const done = keys.filter((key) => completion[key]).length; const percent = keys.length ? Math.round(done / keys.length * 100) : 0;
  elements.progressPercent.textContent = `${percent}%`; elements.progressLabel.textContent = `${done}/${keys.length}`;
}
function renderEquipmentProfile() {
  const profile = equipmentProfiles[state.equipmentProfile] || equipmentProfiles.best;
  elements.equipmentProfile.value = state.equipmentProfile;
  elements.equipmentProfileHelp.textContent = `${profile.description} Changes apply instantly.`;
}
function renderAll() { renderHeader(); renderTabs(); renderEquipmentProfile(); renderWorkout(); renderProgress(); }

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
  const activeWorkouts = state.equipmentProfile === "best" ? state.bestMixWorkouts : state.workouts;
  const workout = activeWorkouts.find((item) => item.id === scheduled.workoutId); elements.editDayLabel.textContent = `Workout ${scheduled.sequence}`;
  elements.editTitle.value = workout.title; elements.editFocus.value = workout.focus; elements.exerciseEditor.replaceChildren();
  workout.exercises.forEach(addEditorRow); elements.editDialog.showModal();
}
function openSettingsDialog() {
  elements.profileName.value = state.profileName; elements.startDay.value = state.startDayId; elements.scheduleError.textContent = "";
  dayCheckboxes.forEach((checkbox) => { checkbox.checked = state.trainingDays.includes(checkbox.value); }); elements.settingsDialog.showModal();
}

elements.dayTabs.addEventListener("click", (event) => { const tab = event.target.closest(".day-tab"); if (!tab) return; selectedDayId = tab.dataset.dayId; renderTabs(); renderWorkout(); });
elements.exerciseList.addEventListener("change", (event) => { const checkbox = event.target.closest("input[type='checkbox']"); if (!checkbox) return; weekCompletion()[checkbox.dataset.completionKey] = checkbox.checked; saveState(); renderWorkout(); renderProgress(); });
elements.exerciseList.addEventListener("click", (event) => {
  const button = event.target.closest(".alternatives-button"); if (!button) return;
  const panel = document.getElementById(button.dataset.alternativesTarget); if (!panel) return;
  const willOpen = button.getAttribute("aria-expanded") !== "true";
  button.setAttribute("aria-expanded", String(willOpen)); panel.hidden = !willOpen;
  button.querySelector("span:first-child").textContent = willOpen ? "Hide alternatives" : button.dataset.closedLabel;
});
elements.editWorkout.addEventListener("click", openEditDialog); elements.openSettings.addEventListener("click", openSettingsDialog); elements.openScheduleSettings.addEventListener("click", openSettingsDialog);
elements.equipmentProfile.addEventListener("change", () => {
  const profileId = equipmentProfiles[elements.equipmentProfile.value] ? elements.equipmentProfile.value : "best";
  state.equipmentProfile = profileId;
  saveState();
  renderAll();
});
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
  const scheduled = getSchedule().find((day) => day.dayId === selectedDayId); const activeWorkouts = state.equipmentProfile === "best" ? state.bestMixWorkouts : state.workouts;
  const workout = activeWorkouts.find((item) => item.id === scheduled.workoutId);
  workout.title = elements.editTitle.value.trim(); workout.focus = elements.editFocus.value.trim();
  workout.exercises = Array.from(elements.exerciseEditor.querySelectorAll(".editor-row")).map((row) => {
    const name = row.querySelector(".exercise-name-input").value.trim();
    const previous = workout.exercises.find((exercise) => exercise.id === row.dataset.exerciseId) || {};
    return { ...previous,
      id: row.dataset.exerciseId || makeId(name), name, sets: row.querySelector(".sets-input").value.trim(), reps: row.querySelector(".reps-input").value.trim(),
      rest: row.querySelector(".rest-input").value.trim(), tempo: row.querySelector(".tempo-input").value.trim(), target: row.querySelector(".target-input").value.trim(),
      secondary: row.querySelector(".secondary-input").value.trim(), regions: [row.querySelector(".region-input").value],
    };
  });
  saveState(); elements.editDialog.close(); renderAll();
});
[elements.settingsDialog, elements.editDialog].forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=10"));
renderAll();
