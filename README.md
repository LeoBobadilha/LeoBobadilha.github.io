# Leonardo Bobadilha — Data & Analytics

A standalone, static portfolio hub for three independent projects. Designed to present completed work rather than a job-search pitch.

## Live projects

| Project | Website | Source |
| --- | --- | --- |
| Workforce Analytics | https://leobobadilha.github.io/workforce-analytics-portfolio/ | https://github.com/LeoBobadilha/workforce-analytics-portfolio |
| Brazil Fixed Income Lab | https://leobobadilha.github.io/brazil-fixed-income-lab/ | Private; intentionally not linked on the public page |
| Project Vortex | https://leobobadilha.github.io/project-vortex-portfolio/ | https://github.com/LeoBobadilha/project-vortex-portfolio |

Professional profile: https://www.linkedin.com/in/leonardobobadilha/

## Architecture

- HTML + CSS + vanilla JavaScript; no bundler, paid services, API keys or trackers.
- 3D-effect hero built with CSS transforms; no additional graphics library or WebGL requirement.
- Responsive, semantic page with keyboard-friendly links, skip navigation and reduced-motion support.
- Decorative visualisations within the project cards are **illustrative designs, not live data or screenshots**. The actual project websites host the real interactive reports and figures.
- The Brazil Fixed Income Lab source repo is private, so there is **no public repo link** in its card.
- Outbound links open in a new tab with `noopener noreferrer`.

## Run locally

From this directory:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000. Directly opening `index.html` also works.

## Publish to GitHub Pages (recommended)

For a free GitHub account, create a **public** repository named `LeoBobadilha.github.io` (capitalization is not relevant to the hostname). Its site will use `https://leobobadilha.github.io/`, a short professional URL that sits naturally above the three project sites. GitHub Pages from a **private** repository requires GitHub Pro/Team/Enterprise. A private repository does not make the resulting website private.

The `publish.ps1` script can initialize and publish the repository once you have Git, GitHub CLI (`gh`) and a GitHub CLI session (`gh auth login`). It verifies your GitHub identity and asks before creating or pushing.

Alternatively, create the repository through https://github.com/new and upload all files from this folder to the root of the repository. Then configure **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**. If the site doesn't appear, confirm that Pages is enabled and a deployment has completed.

## Content maintenance

Project summaries, outbound links, headline and toolkit are in `index.html` and can be edited without rebuilding. Update project details when the live sites change. Review the `og:image` metadata on publication: social-preview.svg is a fallback; social preview services may prefer a PNG.

## Privacy & risk notes

Do not add credentials, personal trade ledgers or private research files to the published repository. The Project Vortex portfolio is a research/backtest showcase; its page does not claim actual live trading results. External financial figures or project performance metrics should be sourced on their own project sites, not invented here.
