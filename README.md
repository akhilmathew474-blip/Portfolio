# Akhil Mathew - Cybersecurity Portfolio

A static portfolio website built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies, no backend. It runs by opening `index.html` and deploys directly on GitHub Pages.

The site is deliberately honest: skills, projects, lab work and resume are shown as clearly labelled placeholders until you add verified content.

## Features

- Responsive, mobile-first layout (320px to 1440px+)
- Dark navy and cyan theme driven by CSS custom properties
- AM monogram (inline SVG) and SVG favicon
- Terminal-styled profile card (decorative, static, not a simulation)
- Mobile menu, smooth scrolling, active-section highlight, back-to-top button
- Subtle scroll-reveal animations (disabled with `prefers-reduced-motion`)
- Accessible: semantic HTML, skip link, visible focus, keyboard navigation
- Data-driven skills, projects and lab sections (edit arrays in `script.js`)
- Resume download that only appears once you enable it
- Contact through a real `mailto:` link (no fake form)

## Folder structure

```text
akhil-mathew-portfolio/
├── index.html        Page content (edit text here)
├── style.css         Design and colours
├── script.js         Behaviour and data arrays (SKILLS, PROJECTS, LABS)
├── favicon.svg       AM monogram favicon
├── .nojekyll         Tells GitHub Pages to serve files as-is
├── README.md         This file
├── assets/
│   └── images/       Your own images (optional)
└── resume/
    ├── README.md
    └── akhil-mathew-resume.pdf   (you add this)
```

## Preview locally

Unzip the project and double-click `index.html`. It opens in your browser with no server needed.

## Deploy on GitHub Pages

1. Sign in to GitHub and click **New repository**.
2. Name it exactly `akhilmathew474-blip.github.io`. Set it to **Public**. Click **Create repository**.
3. Unzip `akhil-mathew-portfolio.zip`. Open the extracted `akhil-mathew-portfolio` folder.
4. In the repository, click **Add file > Upload files**. Select everything **inside** the folder (`index.html`, `style.css`, `script.js`, `favicon.svg`, `.nojekyll`, `README.md`, `assets`, `resume`) and drag it in. `index.html` must be at the repository root, not inside a subfolder.
   - If your file manager hides `.nojekyll`, don't worry: the site works without it.
5. Write a commit message such as "Add portfolio" and click **Commit changes**.
6. Open the repository **Settings**, then **Pages** in the left sidebar.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
8. Choose branch **main** and folder **/ (root)**, then click **Save**.
9. Wait one to three minutes. Refresh the Pages settings screen until it shows the site address.
10. Open `https://akhilmathew474-blip.github.io/`.

### Updating the site later

Open a file in the repository, click the pencil icon, edit, and click **Commit changes**. To replace or add files, use **Add file > Upload files**. Changes appear after a short deployment delay.

## How to edit content

### About Me
In `index.html`, find `id="about"` and edit the paragraphs. Also keep the hero intro (`class="hero-intro"`) consistent.

### Add verified technical skills
Open `script.js` and fill in the `SKILLS` array near the top:

```js
const SKILLS = [
  { category: "Networking", items: ["TCP/IP", "DNS"] },
  { category: "Operating Systems", items: ["Linux"] }
];
```

Only list what you can honestly demonstrate in an interview. When the array has entries, the placeholder cards are replaced automatically. Do not add percentages or progress bars.

### Add projects
Fill in the `PROJECTS` array in `script.js`:

```js
const PROJECTS = [
  {
    title: "Project name",
    description: "Short description.",
    objective: "What you set out to do.",
    technologies: ["Tool A", "Tool B"],
    contribution: "What you personally did.",
    findings: "Verified outcomes.",
    repo: "https://github.com/akhilmathew474-blip/repo-name",
    caseStudy: "case-studies/project-name.html"
  }
];
```

`repo` and `caseStudy` are optional. A button appears only if you provide the value. If you use `caseStudy`, create that HTML file first. The empty state hides automatically.

### Update certifications
In `index.html`, find `id="certifications"`. Replace "Not added yet" with the real issue date, credential ID, or a link (for example `<a href="..." target="_blank" rel="noopener noreferrer">Verify</a>`). To add another certification, copy the whole `<article class="card cert-card">` block.

### Document learning activities
Fill in the `LABS` array in `script.js`. Use `status: "completed"` or `status: "in-progress"`; items are placed in the matching column.

```js
const LABS = [
  { title: "Room name", platform: "TryHackMe", status: "completed", notes: "What you learned.", link: "https://..." }
];
```

### Add the resume PDF
1. Name your file `akhil-mathew-resume.pdf` (lowercase).
2. Put it in the `resume` folder.
3. In `index.html`, change `data-resume-ready="false"` to `data-resume-ready="true"` on the `#resume` section.
4. Commit both changes.

### Change colours and styles
Open `style.css`. All colours are variables at the top of the `:root` block (`--bg`, `--surface`, `--accent`, `--text`, `--muted`).

### Update contact links
Search `index.html` for `akhilmathew474@gmail.com`, `github.com/akhilmathew474-blip` and `linkedin.com/in/akhil-mathew-t-e` and edit them. They appear in the hero, contact section and footer.

> **Check your email address.** The address in the original brief (`akhilmathew@474@gmail.com`) contains two `@` signs and cannot work. The site uses `akhilmathew474@gmail.com`. If that is wrong, replace it everywhere in `index.html`.

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| 404 on the site | Repository name must be exactly `akhilmathew474-blip.github.io`; `index.html` must be at the root; Pages must be set to branch `main`, folder `/ (root)`. |
| Page has no styling | `style.css` is missing, misspelled, or in a subfolder. Names are case-sensitive. |
| Menu or animations do nothing | `script.js` is missing or misnamed. Open browser DevTools (F12) and check the Console. |
| Images missing | Check the path and capitalisation, e.g. `assets/images/name.png`. |
| Resume button not showing | PDF must be at `resume/akhil-mathew-resume.pdf` and `data-resume-ready` must be `"true"`. |
| Resume link 404 | File name or case does not match exactly. |
| Changes not visible | Wait a few minutes, then hard-refresh (Ctrl+Shift+R / Cmd+Shift+R). |
