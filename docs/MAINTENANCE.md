# Website maintenance

This repository powers the public portfolio index at **https://leobobadilha.github.io/**. It is a static presentation website. The three featured projects remain independent applications with their own repositories, deployment workflows and sources of truth.

## Edit safely

- Update copy, project names, technologies and external destinations in `index.html`.
- Update appearance and 3D motion in `styles.css`; interactions live in `main.js`.
- Brand assets and social sharing previews live in `assets/`.
- Keep this README consistent with the live cards, particularly project source visibility and research claims.
- Do not add secrets, private position/trade ledgers, employer information, production credentials or private trading strategy implementations.

The Workforce Analytics demonstration is synthetic. Brazil Fixed Income Lab includes simulations and financial assumptions, and its source repository is private. Project Vortex is a historical research/backtesting showcase; do not imply deployed profitable live execution.

## Local preview

From the repository root:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Validate changes

Node.js 20+ is sufficient; there are no npm dependencies:

```powershell
node --check main.js
node scripts/check-site.mjs
```

The script checks important static assets, page metadata, unique HTML IDs, internal anchors, links to the three published projects, the LinkedIn destination and safe external-link attributes. It does not replace browser, mobile-device or accessibility testing.

## Publishing

GitHub Pages serves the repository's `main` branch from the root folder. Pushes to `main` trigger deployment, and the website-quality workflow runs on pull requests and pushes to `main`.

```powershell
git pull --ff-only origin main
git add .
git commit -m "docs: update portfolio content"
git push origin main
```

Check the **Actions** tab and the live URL after publishing. A successful commit does not by itself prove the live deployment has finished.

If GitHub repository **About** fields are empty, use **About → Edit** to set:

- **Description:** Data & Analytics portfolio showcasing independent projects in BI, data engineering and quantitative research.
- **Website:** https://leobobadilha.github.io/
- **Topics:** `portfolio`, `data-engineering`, `business-intelligence`, `data-analytics`, `github-pages`

These repository metadata fields are separate from the website HTML and cannot be changed by editing this repository's files.
