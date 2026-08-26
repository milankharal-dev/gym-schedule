# My Training Week

A dependency-free, mobile-friendly personal gym schedule. Workouts are editable and completion data is stored locally in the visitor's browser.

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
