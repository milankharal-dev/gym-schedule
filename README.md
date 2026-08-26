# My Training Week

A dependency-free, mobile-first personal gym schedule. Users choose their exact training weekdays and which selected day begins the five-workout sequence. Every exercise includes sets, reps, rest, tempo, primary and secondary targets, a visual muscle map, an equipment or movement reference illustration, and a collapsible machine-first list of equivalent alternatives. The alternatives include a coaching note and should replace—not duplicate—the programmed movement. Each session begins with a clearly marked primary compound exercise. Completion data is stored locally in the visitor's browser.

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
