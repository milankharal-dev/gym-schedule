const ASSETS = {
  bestLegs: "./assets/best-mix-legs-v1.png",
  bestChest: "./assets/best-mix-chest-triceps-v1.png",
  bestBack: "./assets/best-mix-back-v1.png",
  bestShoulders: "./assets/best-mix-shoulders-core-v2.png",
  bestArms: "./assets/best-mix-arms-chest-v1.png",
  machineLegs: "./assets/equipment-machine-legs-v2.png",
  machineChest: "./assets/equipment-machine-chest-v1.png",
  machineBack: "./assets/equipment-machine-back-v1.png",
  machineShoulders: "./assets/equipment-machine-shoulders-core-v1.png",
  machineArms: "./assets/equipment-machine-arms-chest-v1.png",
  dumbbellLegs: "./assets/equipment-dumbbell-legs-v1.png",
  dumbbellBack: "./assets/equipment-dumbbell-back-v1.png",
  dumbbellShoulders: "./assets/equipment-dumbbell-shoulders-core-v1.png",
  barbellLegs: "./assets/equipment-barbell-legs-v1.png",
  barbellBack: "./assets/equipment-barbell-back-v1.png",
  lateralMachine: "./assets/equipment-machine-lateral-raise-v1.png",
  rearDeltMachine: "./assets/equipment-machine-reverse-pec-deck-v1.png",
  facePull: "./assets/equipment-machine-face-pull-guide-v2.png",
  backExtensionMachine: "./assets/equipment-machine-back-extension-v1.png",
};

const visual = (src, columns, rows, index, fit = "crop", extras = {}) => ({ src, columns, rows, index, fit, ...extras });
const motionVisual = (datasetId) => visual(`./assets/motion/${datasetId}/0.jpg`, 1, 1, 0, "contain");
const exercise = (name, equipment, focus, cue, image) => ({ name, equipment, focus, cue, image });

const muscleGroups = [
  {
    id: "chest", label: "Chest", description: "Pressing and fly patterns for the upper, middle and lower chest.", markers: [[24,24],[35,24]],
    exercises: [
      exercise("Seated chest-press machine", "machine", "Mid chest · triceps", "Keep the shoulder blades set against the pad.", visual(ASSETS.machineChest,2,3,0)),
      exercise("Incline barbell press", "barbell", "Upper chest · triceps", "Use a moderate incline and keep wrists stacked.", visual(ASSETS.bestChest,2,3,0)),
      exercise("Flat dumbbell press", "dumbbell", "Mid chest · deeper stretch", "Lower only as far as the shoulder stays comfortable.", visual(ASSETS.bestChest,2,3,1)),
      exercise("Cable chest fly", "cable", "Chest isolation", "Move the upper arms together without turning it into a press.", visual(ASSETS.bestChest,2,3,3)),
    ],
  },
  {
    id: "shoulders", label: "Shoulders", description: "Front, side and rear-delt options for strength and shoulder shape.", markers: [[16,21],[42,21],[61,22],[89,22]],
    exercises: [
      exercise("Seated shoulder-press machine", "machine", "Front and side delts", "Keep the back supported and avoid forcing lockout.", visual(ASSETS.machineShoulders,2,4,0)),
      exercise("Lateral-raise machine", "machine", "Side delts", "Lead with the padded elbows and stop near shoulder height.", visual(ASSETS.lateralMachine,1,1,0)),
      exercise("Reverse pec-deck rear-delt fly", "machine", "Rear delts · upper back", "Face the pad and open the arms without shrugging.", visual(ASSETS.rearDeltMachine,1,1,0)),
      exercise("Rope cable face pull", "cable", "Rear delts · external rotators", "Separate the rope ends beside the temples with high elbows.", visual(ASSETS.facePull,2,1,0,"cover",{ animated: true, displayAspect: "4 / 5" })),
    ],
  },
  {
    id: "biceps", label: "Biceps", description: "Curl variations covering overall mass, the long head and brachialis.", markers: [[15,32],[43,32]],
    exercises: [
      exercise("EZ-bar curl", "barbell", "Both biceps heads", "Pin the elbows near the sides and avoid swinging.", visual(ASSETS.bestArms,2,3,0)),
      exercise("Incline dumbbell curl", "dumbbell", "Long head · lengthened position", "Control the bottom stretch without moving the shoulder.", visual(ASSETS.bestArms,2,3,1)),
      exercise("Hammer curl", "dumbbell", "Brachialis · forearms", "Keep a neutral grip from start to finish.", visual(ASSETS.bestArms,2,3,2)),
      exercise("Preacher-curl machine", "machine", "Biceps isolation", "Keep the upper arms supported and stop before the shoulder rolls forward.", visual(ASSETS.machineArms,2,3,2)),
    ],
  },
  {
    id: "triceps", label: "Triceps", description: "Pressing, pushdown and overhead work for all three triceps heads.", markers: [[61,34],[90,34]],
    exercises: [
      exercise("Close-grip bench press", "barbell", "Overall triceps mass", "Use a comfortable shoulder-width grip and keep elbows controlled.", visual(ASSETS.bestArms,2,3,3)),
      exercise("Rope pushdown", "cable", "Lateral and medial heads", "Keep the upper arms still and separate the rope at the bottom.", visual(ASSETS.bestArms,2,3,4)),
      exercise("Overhead cable extension", "cable", "Long head", "Keep elbows aimed forward and control the stretched position.", visual(ASSETS.bestChest,2,3,4)),
      exercise("Seated triceps-dip machine", "machine", "Triceps · lower chest", "Keep shoulders down and drive the handles toward the floor.", visual(ASSETS.machineArms,2,3,0)),
    ],
  },
  {
    id: "lats", label: "Lats", description: "Vertical pulls and pullovers that build back width and the V-taper.", markers: [[69,36],[82,36]],
    exercises: [
      exercise("Pull-up", "bodyweight", "Lat width · biceps", "Start from a controlled hang and pull the elbows toward the ribs.", visual(ASSETS.bestBack,2,3,1)),
      exercise("Plate-loaded lat pulldown", "machine", "Lat width", "Keep the ribs controlled and pull toward the upper chest.", visual(ASSETS.machineBack,4,3,0)),
      exercise("Dumbbell pullover", "dumbbell", "Lats · teres major", "Keep a soft elbow bend and move through the shoulder rather than the low back.", visual(ASSETS.dumbbellBack,2,3,0)),
      exercise("Pullover machine", "machine", "Lats in a long range", "Drive the upper arms down without turning it into a triceps press.", visual(ASSETS.machineBack,4,3,6)),
    ],
  },
  {
    id: "upper-back", label: "Upper back", description: "Rows and rear-delt work for thickness, rhomboids and mid/lower traps.", markers: [[75,27]],
    exercises: [
      exercise("Bent-over barbell row", "barbell", "Mid back · lats", "Brace the trunk and row toward the lower chest.", visual(ASSETS.bestBack,2,3,0)),
      exercise("Chest-supported machine row", "machine", "Upper-back thickness", "Stay against the pad and pull the elbows behind the torso.", visual(ASSETS.bestBack,2,3,2)),
      exercise("Seated cable row", "cable", "Rhomboids · lower traps", "Reach forward under control, then squeeze the shoulder blades back.", visual(ASSETS.bestBack,2,3,4)),
      exercise("Reverse pec-deck fly", "machine", "Rear delts · upper back", "Open in a wide arc without lifting the shoulders.", visual(ASSETS.rearDeltMachine,1,1,0)),
    ],
  },
  {
    id: "lower-back", label: "Lower back", description: "Controlled extension and hinge options for the spinal erectors.", markers: [[75,43]],
    exercises: [
      exercise("Seated back-extension machine", "machine", "Spinal erectors", "Extend against the pad without hyperextending at the top.", visual(ASSETS.backExtensionMachine,1,1,0,"contain")),
      exercise("45-degree back extension", "bodyweight", "Lower back · glutes", "Move from the hips and finish in a straight line.", visual(ASSETS.bestBack,2,3,3)),
      exercise("Dumbbell-loaded back extension", "dumbbell", "Lower back · glutes", "Hold the load close and keep every rep controlled.", visual(ASSETS.dumbbellBack,2,3,2)),
      exercise("Barbell good morning", "barbell", "Spinal erectors · hamstrings", "Brace first, hinge at the hips and keep the bar stable.", visual(ASSETS.barbellBack,2,3,2)),
    ],
  },
  {
    id: "traps", label: "Traps", description: "Shrug variations for the upper traps and loaded shoulder elevation.", markers: [[75,24]],
    exercises: [
      exercise("Dumbbell shrug", "dumbbell", "Upper traps", "Lift the shoulders straight up and pause without rolling.", visual(ASSETS.bestShoulders,2,3,2)),
      exercise("Plate-loaded shrug machine", "machine", "Upper traps · grip", "Stand tall and pause at the top of each rep.", visual(ASSETS.machineBack,4,3,10)),
      exercise("Standing dumbbell shrug", "dumbbell", "Upper traps", "Keep arms long and avoid using momentum.", visual(ASSETS.dumbbellBack,2,3,5)),
      exercise("Standing barbell shrug", "barbell", "Upper traps · grip", "Keep the bar close and elevate the shoulders vertically.", visual(ASSETS.barbellBack,2,3,5)),
    ],
  },
  {
    id: "core", label: "Abs & core", description: "Flexion, leg-raise and rotation patterns for the abs and obliques.", markers: [[29,38]],
    exercises: [
      exercise("Cable crunch", "cable", "Rectus abdominis", "Curl the ribs toward the pelvis instead of pulling with the arms.", visual(ASSETS.bestShoulders,2,3,3)),
      exercise("Hanging leg raise", "bodyweight", "Lower abs · hip flexors", "Raise the legs without swinging or losing pelvic control.", visual(ASSETS.bestShoulders,2,3,4)),
      exercise("Weighted Russian twist", "dumbbell", "Obliques", "Rotate through the torso under control rather than moving only the hands.", visual(ASSETS.bestShoulders,2,3,5)),
      exercise("Ab-crunch machine", "machine", "Abs", "Set the pivot correctly and shorten the space between ribs and pelvis.", visual(ASSETS.machineShoulders,2,4,4)),
    ],
  },
  {
    id: "glutes", label: "Glutes", description: "Hip extension and unilateral patterns for glute size and strength.", markers: [[69,52],[81,52]],
    exercises: [
      exercise("Barbell hip thrust", "barbell", "Glute max", "Finish with the ribs down and pause at full hip extension.", visual(ASSETS.bestLegs,2,4,3)),
      exercise("Romanian deadlift", "barbell", "Glutes · hamstrings", "Push the hips back while keeping the bar close.", visual(ASSETS.bestLegs,2,4,1)),
      exercise("Dumbbell reverse lunge", "dumbbell", "Glutes · quads", "Step back far enough to keep the front foot planted.", visual(ASSETS.dumbbellLegs,2,3,2)),
      exercise("Barbell reverse lunge", "barbell", "Glutes · quads", "Use a stable stance and control the rear-knee descent.", visual(ASSETS.barbellLegs,2,3,2)),
    ],
  },
  {
    id: "quads", label: "Quads", description: "Squat and press patterns that train all four quadriceps muscles.", markers: [[23,62],[36,62]],
    exercises: [
      exercise("Barbell back squat", "barbell", "Quads · glutes", "Brace before descending and track the knees with the toes.", visual(ASSETS.bestLegs,2,4,0)),
      exercise("Leg press", "machine", "Quads", "Use a depth you can control without the pelvis rolling off the pad.", visual(ASSETS.bestLegs,2,4,2)),
      exercise("Hack squat machine", "machine", "Quads · glutes", "Keep the back supported and drive through the whole foot.", visual(ASSETS.machineLegs,2,3,0)),
      exercise("Barbell front squat", "barbell", "Quads · upper back", "Keep the elbows high and torso controlled.", visual(ASSETS.barbellLegs,2,3,3)),
    ],
  },
  {
    id: "hamstrings", label: "Hamstrings", description: "Hip hinges and knee curls covering both major hamstring functions.", markers: [[69,65],[81,65]],
    exercises: [
      exercise("Romanian deadlift", "barbell", "Hamstrings · glutes", "Hinge until the hamstrings are loaded without rounding the back.", visual(ASSETS.bestLegs,2,4,1)),
      exercise("Lying leg-curl machine", "machine", "Hamstrings · knee flexion", "Keep the hips against the pad and control the lowering phase.", visual(ASSETS.bestLegs,2,4,4)),
      exercise("Lying dumbbell leg curl", "dumbbell", "Hamstrings", "Secure the dumbbell carefully and use a slow range.", visual(ASSETS.dumbbellLegs,2,3,4)),
      exercise("Barbell good morning", "barbell", "Hamstrings · spinal erectors", "Keep a soft knee bend and hinge from the hips.", visual(ASSETS.barbellBack,2,3,2)),
    ],
  },
  {
    id: "adductors", label: "Inner thighs", description: "Direct adduction plus squat and lunge patterns where the adductors assist.", markers: [[27,64],[32,64]],
    exercises: [
      exercise("Hip-adductor machine", "machine", "Inner thighs", "Use a controlled close and avoid bouncing out of the stretch.", visual(ASSETS.bestLegs,2,4,5)),
      exercise("Goblet squat", "dumbbell", "Quads · adductors · glutes", "Use a comfortable stance and keep the whole foot planted.", visual(ASSETS.dumbbellLegs,2,3,0)),
      exercise("Barbell back squat", "barbell", "Quads · adductors", "Choose a stance that allows the knees to track comfortably.", visual(ASSETS.bestLegs,2,4,0)),
      exercise("Single-leg press", "machine", "Quads · adductor support", "Keep the pelvis level and control the knee path.", visual(ASSETS.machineLegs,2,3,2)),
    ],
  },
  {
    id: "calves", label: "Calves", description: "Straight- and bent-knee calf work for gastrocnemius and soleus.", markers: [[69,79],[81,79]],
    exercises: [
      exercise("Standing + seated calf raises", "machine", "Gastrocnemius · soleus", "Use a full stretch and pause at the top of both variations.", visual(ASSETS.bestLegs,2,4,6)),
      exercise("Standing calf-raise machine", "machine", "Gastrocnemius", "Keep the knees softly extended and avoid bouncing.", visual(ASSETS.machineLegs,2,3,5)),
      exercise("Standing dumbbell calf raise", "dumbbell", "Calves · balance", "Use support if balance limits the calf contraction.", visual(ASSETS.dumbbellLegs,2,3,5)),
      exercise("Standing barbell calf raise", "barbell", "Calves", "Use a rack and stable platform before adding load.", visual(ASSETS.barbellLegs,2,3,5)),
    ],
  },
];

const atlasAdditions = {
  chest: [
    exercise("Incline chest-press machine", "machine", "Upper chest · triceps", "Set the seat so the handles begin near the upper chest.", motionVisual("Leverage_Incline_Chest_Press")),
    exercise("Flat dumbbell chest fly", "dumbbell", "Chest in a lengthened position", "Use a soft elbow bend and stop at a comfortable shoulder depth.", motionVisual("Dumbbell_Flyes")),
  ],
  shoulders: [
    exercise("Seated dumbbell shoulder press", "dumbbell", "Front and side delts", "Keep the ribs stacked and press with wrists over elbows.", motionVisual("Dumbbell_Shoulder_Press")),
    exercise("Cable lateral raise", "cable", "Side delts · constant tension", "Lead with the elbow and stop near shoulder height.", motionVisual("Cable_Seated_Lateral_Raise")),
  ],
  biceps: [
    exercise("Alternating dumbbell curl", "dumbbell", "Both biceps heads", "Keep the shoulder quiet and finish each side without swinging.", motionVisual("Dumbbell_Alternate_Bicep_Curl")),
    exercise("Bayesian cable curl", "cable", "Biceps long head", "Stand just ahead of the cable and keep the upper arm behind the torso.", motionVisual("Standing_Biceps_Cable_Curl")),
  ],
  triceps: [
    exercise("Seated triceps-extension machine", "machine", "Triceps isolation", "Align the elbow with the machine pivot and control the return.", motionVisual("Machine_Triceps_Extension")),
    exercise("Dumbbell triceps kickback", "dumbbell", "Triceps · lockout control", "Keep the upper arm still and use a light load you can fully control.", motionVisual("Tricep_Dumbbell_Kickback")),
  ],
  lats: [
    exercise("Straight-arm cable pulldown", "cable", "Lats · shoulder extension", "Keep a soft elbow and drive the upper arms toward the hips.", motionVisual("Straight-Arm_Pulldown")),
    exercise("Barbell pullover", "barbell", "Lats · teres major", "Use a light load and keep the rib cage controlled as the bar travels overhead.", motionVisual("Bent-Arm_Barbell_Pullover")),
  ],
  "upper-back": [
    exercise("Bench-supported one-arm dumbbell row", "dumbbell", "Lats · rhomboids", "Keep the torso supported and pull the elbow toward the hip.", motionVisual("One-Arm_Dumbbell_Row")),
    exercise("Seated row machine", "machine", "Mid back · lats", "Stay tall and finish by moving the shoulder blade without leaning back.", motionVisual("Leverage_Iso_Row")),
  ],
  "lower-back": [
    exercise("Dumbbell Romanian deadlift", "dumbbell", "Spinal erectors · hamstrings", "Keep the dumbbells close and stop before the lower back rounds.", motionVisual("Stiff-Legged_Dumbbell_Deadlift")),
    exercise("Barbell Romanian deadlift", "barbell", "Spinal erectors · posterior chain", "Brace first, push the hips back and keep the bar close to the legs.", motionVisual("Romanian_Deadlift")),
  ],
  traps: [
    exercise("Wide-grip barbell upright row", "barbell", "Upper traps · side delts", "Use a comfortable grip and stop before the shoulders pinch.", motionVisual("Upright_Barbell_Row")),
    exercise("One-arm dumbbell suitcase carry", "dumbbell", "Upper traps · grip · core", "Walk tall without leaning toward or away from the weight.", motionVisual("Farmers_Walk")),
  ],
  core: [
    exercise("Front plank", "bodyweight", "Deep core · anti-extension", "Squeeze the glutes, keep ribs down and continue breathing.", motionVisual("Plank")),
    exercise("Pallof press", "cable", "Obliques · anti-rotation", "Keep hips and ribs square while the hands move away from the chest.", motionVisual("Pallof_Press")),
  ],
  glutes: [
    exercise("Dumbbell hip thrust", "dumbbell", "Glute max", "Keep the load centered, ribs down and pause without overextending.", motionVisual("Barbell_Hip_Thrust")),
    exercise("Bulgarian split squat", "dumbbell", "Glutes · quads", "Use a stable stance and descend only as far as the front foot stays planted.", motionVisual("Dumbbell_Rear_Lunge")),
  ],
  quads: [
    exercise("Bulgarian split squat", "dumbbell", "Quads · glutes", "Keep the front knee tracking over the toes and use support if balance limits you.", motionVisual("Dumbbell_Rear_Lunge")),
    exercise("Single-leg press", "machine", "Quads · unilateral control", "Keep the pelvis level and use a depth you can control.", motionVisual("Leg_Press")),
  ],
  hamstrings: [
    exercise("Seated leg-curl machine", "machine", "Hamstrings in a lengthened position", "Align the knee with the pivot and control the return.", motionVisual("Lying_Leg_Curls")),
    exercise("Dumbbell Romanian deadlift", "dumbbell", "Hamstrings · glutes", "Push the hips back and stop before the spine or shoulders round.", motionVisual("Stiff-Legged_Dumbbell_Deadlift")),
  ],
  adductors: [
    exercise("Cable standing hip adduction", "cable", "Inner thigh · hip control", "Hold a stable support and move the working leg slowly across the body.", motionVisual("Thigh_Adductor")),
    exercise("Wide-stance goblet squat", "dumbbell", "Adductors · quads · glutes", "Use a stance that lets the knees track comfortably with the toes.", motionVisual("Goblet_Squat")),
  ],
  calves: [
    exercise("Seated calf raise", "machine", "Soleus", "Keep the balls of the feet secure and pause through a full controlled range.", motionVisual("Standing_Calf_Raises")),
    exercise("Leg-press calf raise", "machine", "Gastrocnemius · soleus", "Keep the knees softly extended and move only through the ankle.", motionVisual("Standing_Calf_Raises")),
  ],
};

muscleGroups.forEach((group) => group.exercises.push(...(atlasAdditions[group.id] || [])));

const equipmentLabels = { machine: "Machine", cable: "Cable", dumbbell: "Dumbbell", barbell: "Barbell", bodyweight: "Bodyweight" };
function motionGuidesEnabled() {
  try {
    return JSON.parse(localStorage.getItem("gym-schedule-v5") || "null")?.showMotionGuides === true;
  } catch { return false; }
}
const showMotionGuides = motionGuidesEnabled();
const elements = {
  picker: document.querySelector("#musclePicker"), markers: document.querySelector("#libraryMarkers"),
  description: document.querySelector("#selectedMuscleDescription"), title: document.querySelector("#libraryResultsTitle"),
  count: document.querySelector("#libraryResultCount"), search: document.querySelector("#librarySearch"),
  equipment: document.querySelector("#libraryEquipment"), grid: document.querySelector("#libraryGrid"), empty: document.querySelector("#emptyLibrary"),
  dialog: document.querySelector("#libraryVisualDialog"), dialogTitle: document.querySelector("#libraryVisualTitle"),
  dialogEquipment: document.querySelector("#libraryVisualEquipment"), expanded: document.querySelector("#libraryExpandedVisual"),
  closeDialog: document.querySelector("#closeLibraryVisual"),
};

let selectedMuscleId = "chest";

function getExerciseSafety(exerciseName) { return globalThis.exerciseSafety.get(exerciseName); }
function createRiskBadge(safety) {
  const badge = document.createElement("span"); badge.className = `risk-badge risk-${safety.risk}`;
  badge.textContent = `${globalThis.exerciseSafety.riskLabels[safety.risk]} risk`; return badge;
}
function createSafetyGuide(exerciseName) {
  const safety = getExerciseSafety(exerciseName);
  const details = document.createElement("details"); details.className = "exercise-safety-guide";
  const summary = document.createElement("summary");
  const icon = document.createElement("span"); icon.className = "safety-shield"; icon.textContent = "+";
  const label = document.createElement("span"); label.textContent = "Injury guide";
  const chevron = document.createElement("span"); chevron.className = "safety-chevron"; chevron.textContent = "⌄";
  summary.append(icon, label, chevron);
  const body = document.createElement("div"); body.className = "safety-guide-body";
  [["Avoid injury", safety.prevent], ["Common problem", safety.common], ["If it happens", safety.action]].forEach(([heading, text]) => {
    const row = document.createElement("p"); const strong = document.createElement("strong"); strong.textContent = heading;
    const copy = document.createElement("span"); copy.textContent = text; row.append(strong, copy); body.append(row);
  });
  details.append(summary, body); return details;
}

function appendMotionGuide(node, guide) {
  if (!guide) return;
  node.classList.add("has-motion-guide");
  node.dataset.motionStart = guide.start;
  node.dataset.motionFinish = guide.finish;
  const layer = document.createElement("span"); layer.className = "motion-guide-layer"; layer.setAttribute("aria-hidden", "true");
  const start = document.createElement("span"); start.className = "motion-guide-frame motion-guide-start"; start.style.backgroundImage = `url("${guide.start}")`;
  const finish = document.createElement("span"); finish.className = "motion-guide-frame motion-guide-finish"; finish.style.backgroundImage = `url("${guide.finish}")`;
  layer.append(start, finish); node.prepend(layer);
}

function applyVisual(node, image) {
  const column = image.index % image.columns;
  const row = Math.floor(image.index / image.columns);
  const horizontal = image.columns === 1 ? 0 : (column / (image.columns - 1)) * 100;
  const vertical = image.rows === 1 ? 0 : (row / (image.rows - 1)) * 100;
  node.style.backgroundImage = `url("${image.src}")`;
  node.style.backgroundSize = image.fit === "contain" ? "contain" : image.fit === "cover" ? `${image.columns * 100}% auto` : `${image.columns * 100}% ${image.rows * 100}%`;
  node.style.backgroundPosition = image.fit === "contain" ? "center" : `${horizontal}% ${image.fit === "cover" ? 50 : vertical}%`;
  node.dataset.imageSrc = image.src;
  node.dataset.columns = String(image.columns);
  node.dataset.rows = String(image.rows);
  if (image.displayAspect) node.dataset.displayAspect = image.displayAspect;
  if (image.animated && showMotionGuides) {
    node.dataset.animated = "true";
    node.classList.add("is-animated-guide");
  }
  if (image.displayAspect) {
    node.style.aspectRatio = image.displayAspect;
    return;
  }
  const source = new Image(); source.addEventListener("load", () => {
    const cellAspect = (source.naturalWidth / image.columns) / (source.naturalHeight / image.rows);
    if (Number.isFinite(cellAspect) && cellAspect > 0) node.style.aspectRatio = String(cellAspect);
  }, { once: true }); source.src = image.src;
}

function createExerciseCard(item) {
  const card = document.createElement("article"); card.className = "library-exercise-card";
  const image = document.createElement("div"); image.className = "library-exercise-visual"; image.role = "button"; image.tabIndex = 0;
  image.setAttribute("aria-label", `Expand visual for ${item.name}`); image.dataset.exerciseName = item.name; image.dataset.equipment = equipmentLabels[item.equipment];
  applyVisual(image, item.image);
  if (showMotionGuides && !item.image.animated) appendMotionGuide(image, globalThis.motionGuideCatalog?.resolve(item.name));
  const copy = document.createElement("div"); copy.className = "library-exercise-copy";
  const pill = document.createElement("span"); pill.className = "equipment-pill"; pill.textContent = equipmentLabels[item.equipment];
  const safety = getExerciseSafety(item.name);
  const title = document.createElement("h3"); title.textContent = item.name;
  const focus = document.createElement("p"); focus.className = "exercise-focus"; focus.textContent = item.focus;
  const cue = document.createElement("p"); cue.className = "exercise-cue"; cue.textContent = item.cue;
  copy.append(pill, createRiskBadge(safety), title, focus, cue, createSafetyGuide(item.name)); card.append(image, copy); return card;
}

function renderMarkers(group) {
  elements.markers.replaceChildren(...group.markers.map(([left, top]) => {
    const marker = document.createElement("span"); marker.className = "library-marker"; marker.style.left = `${left}%`; marker.style.top = `${top}%`; return marker;
  }));
}

function renderPicker() {
  elements.picker.replaceChildren(...muscleGroups.map((group) => {
    const button = document.createElement("button"); button.type = "button"; button.className = "muscle-button"; button.dataset.muscleId = group.id;
    button.setAttribute("aria-pressed", String(group.id === selectedMuscleId)); button.textContent = group.label; return button;
  }));
}

function renderExercises() {
  const group = muscleGroups.find((item) => item.id === selectedMuscleId) || muscleGroups[0];
  const query = elements.search.value.trim().toLowerCase(); const equipment = elements.equipment.value;
  const matches = group.exercises.filter((item) => (equipment === "all" || item.equipment === equipment)
    && (!query || `${item.name} ${item.focus} ${item.equipment} ${getExerciseSafety(item.name).risk}`.toLowerCase().includes(query)));
  elements.title.textContent = group.label; elements.description.textContent = group.description;
  elements.count.textContent = `${matches.length} exercise${matches.length === 1 ? "" : "s"}`;
  elements.grid.replaceChildren(...matches.map(createExerciseCard)); elements.empty.hidden = matches.length > 0;
  renderMarkers(group); renderPicker();
}

function openVisual(image) {
  elements.dialogTitle.textContent = image.dataset.exerciseName; elements.dialogEquipment.textContent = `${image.dataset.equipment} reference`;
  elements.expanded.setAttribute("aria-label", `${image.dataset.exerciseName} expanded reference`);
  elements.expanded.style.backgroundImage = image.style.backgroundImage; elements.expanded.style.backgroundSize = image.style.backgroundSize;
  elements.expanded.style.backgroundPosition = image.style.backgroundPosition; elements.expanded.style.aspectRatio = image.dataset.displayAspect || "3 / 2";
  elements.expanded.classList.toggle("is-animated-guide", image.dataset.animated === "true");
  elements.expanded.querySelector(".motion-guide-layer")?.remove(); elements.expanded.classList.remove("has-motion-guide");
  delete elements.expanded.dataset.motionStart; delete elements.expanded.dataset.motionFinish;
  if (image.dataset.motionStart && image.dataset.motionFinish) {
    appendMotionGuide(elements.expanded, { start: image.dataset.motionStart, finish: image.dataset.motionFinish });
  }
  if (image.dataset.displayAspect) { elements.dialog.showModal(); return; }
  const source = new Image(); source.addEventListener("load", () => {
    if (elements.expanded.style.backgroundImage !== image.style.backgroundImage) return;
    const cellAspect = (source.naturalWidth / Number(image.dataset.columns)) / (source.naturalHeight / Number(image.dataset.rows));
    if (Number.isFinite(cellAspect) && cellAspect > 0) elements.expanded.style.aspectRatio = String(cellAspect);
  }, { once: true }); source.src = image.dataset.imageSrc; elements.dialog.showModal();
}

elements.picker.addEventListener("click", (event) => {
  const button = event.target.closest(".muscle-button"); if (!button) return; selectedMuscleId = button.dataset.muscleId; elements.search.value = ""; renderExercises();
});
elements.search.addEventListener("input", renderExercises); elements.equipment.addEventListener("change", renderExercises);
elements.grid.addEventListener("click", (event) => { const image = event.target.closest(".library-exercise-visual"); if (image) openVisual(image); });
elements.grid.addEventListener("keydown", (event) => {
  const image = event.target.closest(".library-exercise-visual"); if (!image || (event.key !== "Enter" && event.key !== " ")) return;
  event.preventDefault(); openVisual(image);
});
elements.closeDialog.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => { if (event.target === elements.dialog) elements.dialog.close(); });

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=21"));
renderExercises();
