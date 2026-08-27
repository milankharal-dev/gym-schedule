# My Training Week

A dependency-free, mobile-first personal gym schedule. Users choose their exact training weekdays, which selected day begins the five-workout sequence, and an equipment profile: Beginner, Machines, Dumbbells, Barbells, or Best mix. Best Mix has its own five-day program, while each equipment-only profile retains an independent exercise list. The selected profile changes the programmed exercises and matching reference images; other valid equipment choices stay inside each exercise's illustrated alternatives panel. Movement and alternative images can be tapped or clicked for an expanded reference view. Every exercise includes sets, reps, rest, tempo, targets and a visual muscle map. Each session begins with a clearly marked primary movement. Completion data is stored locally in the visitor's browser.

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
