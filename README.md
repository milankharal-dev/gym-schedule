# My Training Week

A dependency-free, mobile-first personal gym schedule plus a separate exercise-reference library. Users choose their exact training weekdays, which selected day begins the five-workout sequence, and an equipment profile: Beginner, Machines, Dumbbells, Barbells, or Best mix. Best Mix has its own five-day program, while each equipment-only profile retains an independent exercise list. The selected profile changes the programmed exercises and matching reference images; other valid equipment choices stay inside each exercise's illustrated alternatives panel. Movement and alternative images can be tapped or clicked for an expanded reference view. Every programmed exercise includes sets, reps, rest, tempo, targets and a visual muscle map. Train Mode presents one exercise at a time, lets the user focus any illustrated alternative for that slot, supports previous and next navigation, saves completed movements, and can be exited without losing progress or moving the schedule behind it. The dashboard's **Show me how** setting adds lightweight start/finish motion guides to every scheduled exercise, alternative, Train Mode exercise, and library entry; it is off by default so the existing still references remain unchanged. The separate, same-width library organizes reference exercises by muscle group without changing the weekly plan. Completion data, the motion setting, and Train Mode choices are stored locally in the visitor's browser.

Motion-reference pairs are adapted from the public-domain [Free Exercise DB](https://github.com/yuhonas/free-exercise-db). See `assets/motion/NOTICE.md` for details. The custom Face Pull guide remains a locally generated app asset.

## Run locally

From this directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy with GitHub Pages

1. Create a GitHub repository and put the contents of this directory at the repository root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch and the **/(root)** folder, then save.

GitHub will provide a public URL. Each visitor receives their own browser-local schedule and progress; this version does not sync data between devices.
