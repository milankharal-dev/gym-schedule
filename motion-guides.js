(function registerMotionGuides(global) {
  const basePath = "./assets/motion";

  const rules = [
    [/face pull/, null],
    [/ab.?crunch machine/, "Ab_Crunch_Machine"],
    [/cable crunch/, "Cable_Crunch"],
    [/captain.*knee raise|hanging leg raise/, "Hanging_Leg_Raise"],
    [/russian twist/, "Russian_Twist"],
    [/rotary.?torso|landmine.*rotation/, "Landmine_180s"],
    [/pallof press/, "Pallof_Press"],
    [/barbell rollout/, "Barbell_Ab_Rollout"],
    [/dead.?bug/, "Dead_Bug"],
    [/front plank|weighted.*plank/, "Plank"],
    [/suitcase carry|front.?rack.*carry/, "Farmers_Walk"],

    [/hack squat/, "Hack_Squat"],
    [/front.*squat/, "Front_Barbell_Squat"],
    [/goblet.*squat/, "Goblet_Squat"],
    [/dumbbell.*squat/, "Dumbbell_Squat"],
    [/back squat|barbell.*squat/, "Barbell_Full_Squat"],
    [/bulgarian.*split|dumbbell.*reverse lunge/, "Dumbbell_Rear_Lunge"],
    [/barbell.*reverse lunge/, "Barbell_Lunge"],
    [/dumbbell.*step.?up/, "Dumbbell_Step_Ups"],
    [/single.?leg press|leg press/, "Leg_Press"],
    [/dumbbell.*romanian|dumbbell.*back extension/, "Stiff-Legged_Dumbbell_Deadlift"],
    [/romanian deadlift|smith.*romanian/, "Romanian_Deadlift"],
    [/barbell good morning/, "Good_Morning"],
    [/lying.*leg curl|seated or lying.*leg curl/, "Lying_Leg_Curls"],
    [/hip thrust/, "Barbell_Hip_Thrust"],
    [/hip.?adductor/, "Thigh_Adductor"],
    [/back.?extension|hyperextension/, "Hyperextensions_Back_Extensions"],
    [/barbell.*calf raise/, "Standing_Barbell_Calf_Raise"],
    [/dumbbell.*calf raise/, "Standing_Dumbbell_Calf_Raise"],
    [/calf raise/, "Standing_Calf_Raises"],

    [/incline.*chest.?press machine/, "Leverage_Incline_Chest_Press"],
    [/seated.*chest.?press machine/, "Leverage_Chest_Press"],
    [/decline.*barbell.*bench press/, "Decline_Barbell_Bench_Press"],
    [/incline.*barbell.*press/, "Barbell_Incline_Bench_Press_-_Medium_Grip"],
    [/flat.*barbell.*bench press|barbell bench press/, "Barbell_Bench_Press_-_Medium_Grip"],
    [/neutral.?grip.*dumbbell.*bench press/, "Dumbbell_Bench_Press_with_Neutral_Grip"],
    [/incline.*dumbbell.*press/, "Incline_Dumbbell_Press"],
    [/flat.*dumbbell.*press|dumbbell bench press/, "Dumbbell_Bench_Press"],
    [/weighted.*dips/, "Dips_-_Chest_Version"],
    [/pec.?deck fly/, "Butterfly"],
    [/low.?to.?high.*fly|low.?mid.*fly|incline.*cable fly/, "Incline_Cable_Flye"],
    [/cable.*chest fly|cable fly/, "Flat_Bench_Cable_Flyes"],
    [/low.?incline.*dumbbell.*fly/, "Incline_Dumbbell_Flyes"],
    [/flat.*dumbbell.*fly/, "Dumbbell_Flyes"],

    [/weighted pull.?up|pull.?up.*lat pulldown/, "Weighted_Pull_Ups"],
    [/^pull up$/, "Weighted_Pull_Ups"],
    [/plate.?loaded.*lat.?pulldown|lat pulldown/, "Wide-Grip_Lat_Pulldown"],
    [/straight.?arm pulldown/, "Straight-Arm_Pulldown"],
    [/barbell pullover/, "Bent-Arm_Barbell_Pullover"],
    [/dumbbell pullover|dead.?bug pullover/, "Bent-Arm_Dumbbell_Pullover"],
    [/pullover machine/, "Straight-Arm_Pulldown"],
    [/chest.?supported.*machine row|row machine/, "Leverage_Iso_Row"],
    [/bench.?supported.*one.?arm.*dumbbell row/, "One-Arm_Dumbbell_Row"],
    [/bench.?supported.*dumbbell row/, "Dumbbell_Incline_Row"],
    [/seated.*cable row/, "Seated_Cable_Rows"],
    [/bent.?over.*barbell row/, "Bent_Over_Barbell_Row"],

    [/reverse pec.?deck|reverse machine fly/, "Reverse_Machine_Flyes"],
    [/chest.?supported.*dumbbell.*(rear.?delt|reverse) fly/, "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench"],
    [/rear.?delt fly|reverse cable fly/, "Cable_Rear_Delt_Fly"],
    [/wide.?elbow.*rear.?delt row/, "Barbell_Rear_Delt_Row"],
    [/lateral.?raise machine/, "Cable_Seated_Lateral_Raise"],
    [/cable lateral raise/, "Cable_Seated_Lateral_Raise"],
    [/dumbbell lateral raise|db lateral raise/, "Side_Lateral_Raise"],
    [/upright row/, "Upright_Barbell_Row"],
    [/shoulder.?press machine/, "Leverage_Shoulder_Press"],
    [/barbell overhead press/, "Barbell_Shoulder_Press"],
    [/dumbbell.*(shoulder press|press)/, "Dumbbell_Shoulder_Press"],
    [/plate.?loaded shrug machine/, "Leverage_Shrug"],
    [/barbell shrug/, "Barbell_Shrug"],
    [/dumbbell shrug|shrug/, "Dumbbell_Shrug"],

    [/preacher.?curl machine/, "Machine_Preacher_Curls"],
    [/ez.?bar preacher curl/, "Preacher_Curl"],
    [/incline dumbbell curl/, "Incline_Dumbbell_Curl"],
    [/hammer curl/, "Hammer_Curls"],
    [/bayesian cable curl/, "Standing_Biceps_Cable_Curl"],
    [/alternating dumbbell curl/, "Dumbbell_Alternate_Bicep_Curl"],
    [/ez.?bar curl/, "EZ-Bar_Curl"],
    [/dumbbell.*curl/, "Dumbbell_Bicep_Curl"],

    [/seated triceps.?dip machine/, "Dip_Machine"],
    [/close.?grip.*bench press/, "Close-Grip_Barbell_Bench_Press"],
    [/jm press/, "JM_Press"],
    [/triceps.?extension machine/, "Machine_Triceps_Extension"],
    [/(overhead cable|cable overhead) extension/, "Cable_Rope_Overhead_Triceps_Extension"],
    [/seated dumbbell overhead extension/, "Seated_Triceps_Press"],
    [/lying dumbbell triceps extension/, "Decline_Dumbbell_Triceps_Extension"],
    [/skull crusher/, "EZ-Bar_Skullcrusher"],
    [/dumbbell triceps kickback/, "Tricep_Dumbbell_Kickback"],
    [/pushdown/, "Triceps_Pushdown_-_Rope_Attachment"],
  ];

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function resolve(name) {
    const normalized = normalize(name);
    const match = rules.find(([pattern]) => pattern.test(normalized));
    if (!match || !match[1]) return null;
    const datasetId = match[1];
    return {
      datasetId,
      start: `${basePath}/${datasetId}/0.jpg`,
      finish: `${basePath}/${datasetId}/1.jpg`,
    };
  }

  global.motionGuideCatalog = { resolve };
}(globalThis));
