(function registerExerciseSafety(global) {
  const response = {
    joint: "Stop the set and avoid the painful range. Protect and rest the area; for early swelling, use a wrapped cold pack, light compression and elevation. Get urgent care for deformity, numbness, a cold/discolored limb or inability to use it normally; get assessed if pain is worsening or not improving.",
    muscle: "Stop the set—do not stretch or reload a suddenly painful muscle. Protect and rest it; for early swelling, use a wrapped cold pack, light compression and elevation. Seek urgent care after a crack/pop with major weakness, deformity, rapidly increasing bruising or inability to bear weight; get assessed if it is worsening or not improving.",
    back: "Stop the loaded movement. Keep gently mobile only if comfortable and avoid heavy lifting until symptoms settle. Seek emergency care for new numbness around the groin/buttocks, bladder or bowel changes, or weakness/numbness in both legs; seek prompt care for severe or rapidly worsening pain.",
    general: "Stop the exercise and do not test the pain with more weight. Rest from the aggravating movement and use a wrapped cold pack if swelling develops. Seek urgent care for deformity, numbness, a cold/discolored limb, severe worsening pain or loss of normal function; arrange an assessment if it is not improving.",
  };

  const profiles = {
    knee: {
      prevent: "Keep the whole foot planted, track the knee with the toes and use only the depth you can control without the pelvis or heel shifting.",
      common: "Knee irritation or a quad, patellar-tendon or hip strain if depth, load or knee position is not controlled.",
      action: response.joint,
    },
    hinge: {
      prevent: "Brace before each rep, hinge through the hips, keep the load close and stop the range before the lower back rounds.",
      common: "Lower-back or hamstring strain when fatigue, excess range or a load jump changes the hinge.",
      action: response.back,
    },
    backExtension: {
      prevent: "Move through the hips and finish with the body in a straight line; do not force the spine past neutral.",
      common: "Lower-back irritation or glute/hamstring strain from hyperextension or uncontrolled loading.",
      action: response.back,
    },
    chestPress: {
      prevent: "Set the shoulder blades, keep wrists stacked and elbows at a comfortable angle; use safeties or a spotter for heavy barbell sets.",
      common: "Front-shoulder or pectoral strain and, with an unsupported barbell, a dropped-bar or pinning injury.",
      action: response.joint,
    },
    shoulderPress: {
      prevent: "Keep ribs stacked, wrists over elbows and use a pain-free path; do not force range or grind unstable reps overhead.",
      common: "Shoulder or rotator-cuff irritation, neck strain, or loss of control overhead.",
      action: response.joint,
    },
    shoulderIsolation: {
      prevent: "Use a light controllable load, keep the neck relaxed and stop at the highest pain-free position without swinging.",
      common: "Shoulder or rotator-cuff irritation and upper-trap/neck strain from excess load or range.",
      action: response.joint,
    },
    verticalPull: {
      prevent: "Start with the shoulder blades controlled, avoid jerking from a dead hang and pull in front of the body through a comfortable range.",
      common: "Shoulder, elbow or biceps-tendon irritation from swinging, forced range or abrupt loading.",
      action: response.joint,
    },
    row: {
      prevent: "Brace the torso, keep shoulders away from the ears and pull without twisting or using momentum.",
      common: "Lower-back strain on unsupported rows or shoulder/elbow irritation from jerking the load.",
      action: response.general,
    },
    fly: {
      prevent: "Keep a soft elbow bend and stop the stretch before the upper arm moves beyond a comfortable shoulder position.",
      common: "Front-shoulder or pectoral strain from too much stretch, load or speed.",
      action: response.joint,
    },
    biceps: {
      prevent: "Keep the wrist neutral, control the lowering phase and avoid swinging or suddenly extending a heavily loaded elbow.",
      common: "Elbow or biceps-tendon irritation and forearm strain from momentum or abrupt overload.",
      action: response.joint,
    },
    triceps: {
      prevent: "Keep wrists neutral, use a comfortable elbow path and control the stretched position instead of forcing lockout.",
      common: "Elbow or triceps-tendon irritation; deep dips may also irritate the front of the shoulder.",
      action: response.joint,
    },
    core: {
      prevent: "Brace while breathing, keep the pelvis controlled and stop when the lower back arches or twisting becomes uncontrolled.",
      common: "Lower-back, abdominal or hip-flexor strain from momentum, excessive range or loss of trunk control.",
      action: response.general,
    },
    hipThrust: {
      prevent: "Pad and center the load, keep ribs down and finish with the glutes rather than hyperextending the lower back.",
      common: "Lower-back irritation, hip discomfort or bruising from poor bar placement or overextension.",
      action: response.general,
    },
    legCurl: {
      prevent: "Align the machine pivot with the knee, keep the hips supported and control the return without snapping the knee straight.",
      common: "Hamstring or back-of-knee strain from poor setup, bouncing or an abrupt load increase.",
      action: response.muscle,
    },
    adductor: {
      prevent: "Enter the stretch gradually, keep the pelvis stable and avoid bouncing or forcing a range you do not own.",
      common: "Inner-thigh or groin strain from excessive stretch, speed or load.",
      action: response.muscle,
    },
    calf: {
      prevent: "Use a stable setup, lower slowly into a comfortable stretch and rise without bouncing or rolling the ankle.",
      common: "Calf or Achilles-tendon strain and, in unsupported versions, loss of balance.",
      action: "Stop immediately and avoid calf loading if you feel a sharp pain or pop. Protect and rest the area; seek prompt medical care if you cannot push off, walk normally or if swelling/bruising develops quickly. Otherwise get assessed if symptoms worsen or do not improve.",
    },
    shrugCarry: {
      prevent: "Keep the neck neutral, shoulders moving straight up or held stable, and use a load you can carry without leaning or losing grip.",
      common: "Neck/upper-trap strain, grip strain or a dropped-weight foot injury.",
      action: response.general,
    },
  };

  const profileRules = [
    [/good morning|romanian deadlift|stiff.?legged.*deadlift/, "hinge"],
    [/back extension|hyperextension/, "backExtension"],
    [/squat|lunge|step.?up|leg press/, "knee"],
    [/leg curl/, "legCurl"],
    [/hip thrust/, "hipThrust"],
    [/adductor|adduction|inner thigh|sumo/, "adductor"],
    [/calf raise/, "calf"],
    [/incline.*press|flat.*press|bench press|chest.?press|weighted dips|dip machine|triceps.?dip/, "chestPress"],
    [/chest fly|cable fly|pec.?deck|dumbbell fly/, "fly"],
    [/seated dumbbell press|shoulder press|overhead press/, "shoulderPress"],
    [/lateral raise|rear.?delt|reverse.*fly|reverse.*pec|face pull|upright row/, "shoulderIsolation"],
    [/pull.?up|pulldown|pullover/, "verticalPull"],
    [/row/, "row"],
    [/curl/, "biceps"],
    [/pushdown|triceps|skull crusher|jm press|overhead.*extension/, "triceps"],
    [/crunch|leg raise|knee raise|russian twist|rotary torso|rotation|pallof|plank|dead bug|rollout/, "core"],
    [/shrug|carry|farmer/, "shrugCarry"],
  ];

  const highRisk = /barbell (back squat|front squat|romanian deadlift|reverse lunge|good morning)|good morning|standing barbell overhead press|incline barbell (bench )?press|flat barbell bench press|decline barbell bench press|close.?grip barbell bench press|weighted dips|barbell rollout/;
  const stableLowRisk = /seated chest press machine|incline chest press machine|pec deck|preacher curl machine|triceps extension machine|lateral raise machine|reverse pec deck|ab crunch machine|hip adductor machine|leg curl machine/;
  const moderateRisk = /squat|lunge|step.?up|leg press|romanian deadlift|back extension|hyperextension|hip thrust|incline.*press|flat.*press|seated dumbbell press|bench press|chest.?press|dips?|shoulder press|overhead press|pull.?up|row|pulldown|pullover|upright row|fly|leg raise|knee raise|russian twist|rotation|rollout|carry|standing barbell calf raise/;

  function normalize(value) {
    return String(value || "").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  function getRisk(name) {
    const normalized = normalize(name);
    if (highRisk.test(normalized)) return "high";
    if (stableLowRisk.test(normalized)) return "low";
    if (moderateRisk.test(normalized)) return "moderate";
    return "low";
  }

  function get(name) {
    const normalized = normalize(name);
    const profileId = profileRules.find(([pattern]) => pattern.test(normalized))?.[1];
    const profile = profiles[profileId] || {
      prevent: "Use a controlled range, begin with a manageable load and stop the set when form changes or pain appears.",
      common: "A muscle, tendon or joint strain can occur when load, range or fatigue exceeds current capacity.",
      action: response.general,
    };
    return { ...profile, risk: getRisk(name) };
  }

  global.exerciseSafety = {
    get,
    riskLabels: { low: "Low", moderate: "Moderate", high: "High" },
    ratingNote: "Relative technical, loading and stability demand at typical gym use—not a prediction of your personal injury risk. A supported machine is usually rated below the equivalent free-path movement, while load, range, setup and fatigue still matter.",
    urgentNote: "Emergency signs: deformity, numbness/tingling, a cold or discolored limb, inability to use or bear weight, or back pain with new groin numbness, bladder/bowel changes, or weakness in both legs.",
  };
}(globalThis));
