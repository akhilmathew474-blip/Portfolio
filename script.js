/* =========================================================
   Akhil Mathew - Portfolio scripts (vanilla JavaScript)
   Edit the DATA section below to add skills, projects and labs.
   ========================================================= */

/* ---------------------- DATA (edit me) ---------------------- */

// SKILLS: add ONLY skills you can genuinely demonstrate.
// Leave the array empty to keep the "Awaiting verified skills" placeholders.
// Example:
//   { category: "Networking", items: ["TCP/IP", "DNS"] },
const SKILLS = [];

// PROJECTS: add real, published projects only. Leave empty to show the empty state.
// Example (remove the // to use):
//   {
//     title: "Project name",
//     description: "One or two sentences about the project.",
//     objective: "What you set out to do.",
//     technologies: ["Tool A", "Tool B"],
//     contribution: "What you personally did.",
//     findings: "Verified outcomes or lessons learned.",
//     repo: "https://github.com/akhilmathew474-blip/repo-name",   // optional
//     caseStudy: "case-studies/project-name.html"                 // optional (file must exist)
//   },
const PROJECTS = [];

// LABS: verified learning activities. status must be "completed" or "in-progress".
// Example:
//   { title: "Room or lab name", platform: "TryHackMe", status: "completed",
//     notes: "What you learned.", link: "https://..." },   // link is optional
const LABS = [];

/* ---------------------- HELPERS ---------------------- */

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function makeLink(href, label, external) {
  const a = el('a', 'text-link', label);
  a.href = href;
  if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  return a;
}

/* ---------------------- RENDERERS ---------------------- */

function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid || !SKILLS.length) return;
  grid.textContent = '';
  SKILLS.forEach(function (group) {
    const card = el('article', 'card');
    card.appendChild(el('h3', '', group.category));
    const tags = el('ul', 'skill-tags');
    (group.items || []).forEach(function (item) {
      const li = el('li', 'tag', item);
      tags.appendChild(li);
    });
    card.appendChild(tags);
    grid.appendChild(card);
  });
}

function renderProjects() {
  const grid = document.getElementById('project-grid');
  const empty = document.getElementById('projects-empty');
  if (!grid || !PROJECTS.length) return;
  if (empty) empty.hidden = true;

  PROJECTS.forEach(function (p) {
    const card = el('article', 'card project-card');
    card.appendChild(el('h3', '', p.title));
    if (p.description) card.appendChild(el('p', '', p.description));

    if (p.technologies && p.technologies.length) {
      const tags = el('ul', 'skill-tags');
      p.technologies.forEach(function (t) { tags.appendChild(el('li', 'tag', t)); });
      card.appendChild(tags);
    }

    const rows = [['Objective', p.objective], ['My contribution', p.contribution], ['Findings and outcomes', p.findings]]
      .filter(function (r) { return r[1]; });
    if (rows.length) {
      const details = el('details');
      details.appendChild(el('summary', '', 'Project details'));
      const dl = el('dl');
      rows.forEach(function (r) {
        const wrap = el('div');
        wrap.appendChild(el('dt', '', r[0]));
        wrap.appendChild(el('dd', '', r[1]));
        dl.appendChild(wrap);
      });
      details.appendChild(dl);
      card.appendChild(details);
    }

    const links = el('div', 'project-links');
    if (p.repo) links.appendChild(makeLink(p.repo, 'View on GitHub', true));
    if (p.caseStudy) links.appendChild(makeLink(p.caseStudy, 'Read case study', false));
    if (links.children.length) card.appendChild(links);

    grid.appendChild(card);
  });
}

function renderLabs() {
  const targets = {
    'completed': document.getElementById('labs-completed'),
    'in-progress': document.getElementById('labs-progress')
  };
  Object.keys(targets).forEach(function (status) {
    const box = targets[status];
    const items = LABS.filter(function (l) { return l.status === status; });
    if (!box || !items.length) return;
    box.textContent = '';
    items.forEach(function (lab) {
      const item = el('article', 'lab-item');
      item.appendChild(el('h4', '', lab.title));
      const meta = [lab.platform, status === 'completed' ? 'Completed' : 'In progress'].filter(Boolean).join(', ');
      item.appendChild(el('p', '', meta));
      if (lab.notes) item.appendChild(el('p', '', lab.notes));
      if (lab.link) item.appendChild(makeLink(lab.link, 'Open write-up', true));
      box.appendChild(item);
    });
  });
}

/* ---------------------- BEHAVIOUR ---------------------- */

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });
}

function initActiveSection() {
  const links = Array.prototype.slice.call(document.querySelectorAll('.nav-list a'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  const sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      map[entry.target.id].setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  sections.forEach(function (s) { observer.observe(s); });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (n) { n.classList.add('is-visible'); });
    return;
  }
  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (n) { observer.observe(n); });
}

function initToTop() {
  const btn = document.getElementById('to-top');
  if (!btn) return;
  let ticking = false;
  function update() { btn.hidden = window.scrollY < 600; ticking = false; }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  btn.addEventListener('click', function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    const home = document.getElementById('home');
    if (home) { home.setAttribute('tabindex', '-1'); home.focus({ preventScroll: true }); }
  });
  update();
}

function initYear() {
  const span = document.getElementById('year');
  if (span) span.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', function () {
  renderSkills();
  renderProjects();
  renderLabs();
  initNav();
  initActiveSection();
  initReveal();
  initToTop();
  initYear();
});
