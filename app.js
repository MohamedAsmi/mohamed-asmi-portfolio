const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const showToast = (message) => {
  const toast = $('[data-toast]');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
};

const themeKey = 'mohamed-asmi-theme';
const storedTheme = localStorage.getItem(themeKey);
if (storedTheme) document.documentElement.dataset.theme = storedTheme;

const themeToggle = $('[data-theme-toggle]');
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(themeKey, nextTheme);
  themeToggle.textContent = nextTheme === 'dark' ? '☾' : '☼';
});
themeToggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☾' : '☼';

const header = $('[data-header]');
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 12), { passive: true });

const mobileMenu = $('[data-mobile-menu]');
const mainNav = $('.main-nav');
mobileMenu.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  mobileMenu.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.textContent = isOpen ? '×' : '☰';
});
$$('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('is-open');
  mobileMenu.setAttribute('aria-expanded', 'false');
  mobileMenu.textContent = '☰';
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
$$('.reveal').forEach((element) => observer.observe(element));

const projects = $$('[data-project-grid] .project-card');
const filterButtons = $$('.filter-chip');
const projectSearch = $('[data-project-search]');
let activeFilter = 'all';
const renderProjects = () => {
  const term = projectSearch.value.trim().toLowerCase();
  let visible = 0;
  projects.forEach((project) => {
    const tags = project.dataset.tags.toLowerCase();
    const search = project.dataset.search.toLowerCase();
    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter.toLowerCase());
    const matchesSearch = !term || search.includes(term);
    const isVisible = matchesFilter && matchesSearch;
    project.hidden = !isVisible;
    if (isVisible) visible += 1;
  });
  $('[data-empty-projects]').hidden = visible !== 0;
};
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  activeFilter = button.dataset.filter;
  renderProjects();
}));
projectSearch.addEventListener('input', renderProjects);

const architectureData = {
  posmate: { description: 'A role-aware operations system that brings sales, inventory and reporting into one dependable workspace.' },
  paperpartner: { description: 'A published education app that helps Sri Lankan students find past papers, model papers and other study materials quickly.' },
  erpnext: { description: 'An education management solution spanning students, instructors, admissions, fee plans, scheduling, attendance, examinations and results.' },
  tour: { description: 'An academic Laravel system for immersive real-estate tours, with authentication, role-based access, responsive UI and extensible tour management.' },
  delivery: { description: 'A practical delivery layer connecting reusable mobile UI, REST APIs, offline persistence, queued synchronization, relational data and production deployment.' },
};
const architectureModal = $('[data-architecture-modal]');
$$('[data-architecture]').forEach((button) => button.addEventListener('click', () => {
  $('[data-modal-description]', architectureModal).textContent = architectureData[button.dataset.architecture].description;
  architectureModal.showModal();
}));
$('[data-modal-close]').addEventListener('click', () => architectureModal.close());
architectureModal.addEventListener('click', (event) => { if (event.target === architectureModal) architectureModal.close(); });

const caseData = {
  posmate: { number: '01', kicker: 'Business system / production', title: 'POSMate', summary: 'A calmer way for retail teams to keep sales, inventory and daily operations moving.', challenge: 'Operators were working across disconnected spreadsheets and tools, which made the end of every day harder than it needed to be.', approach: 'A focused Laravel + React workspace with a clear domain model, role-aware workflows and reports that answer the questions teams actually ask.', outcome: 'Fewer manual handoffs, faster visibility into the day and a foundation that can add new workflows without a redesign.', stack: 'Laravel · React · MySQL · Queues' },
  paperpartner: { number: '02', kicker: 'Education mobile app / published', title: 'Paper Partner', summary: 'A mobile study companion for students in Sri Lanka.', challenge: 'Students need a quick way to find past exam papers, model papers, mark schemes and study resources without searching across disconnected sources.', approach: 'A focused mobile experience that organizes materials by subject and level, with simple navigation built for repeat study sessions.', outcome: 'A published Android app that makes exam preparation resources easier to discover and use.', stack: 'Android · Education · Mobile' },
  erpnext: { number: '03', kicker: 'Education + mobile / ongoing', title: 'Frappe / ERPNext Education', summary: 'An education management solution with a companion mobile app for student-facing services.', challenge: 'The platform needed to support the full education workflow, from admissions and fee plans through schedules, attendance, examinations and results.', approach: 'A Frappe / ERPNext foundation paired with mobile services and API-driven workflows for students, instructors and administrators.', outcome: 'A connected operating system for education teams with a clearer path to mobile access and future workflow expansion.', stack: 'Frappe · ERPNext · Mobile · APIs' },
  tour: { number: '04', kicker: 'Academic / R&D', title: 'AI-Powered 360 Virtual Tour', summary: 'An immersive real-estate tour experience built as an individual academic project.', challenge: 'The system needed to make real-estate exploration more engaging while keeping access, roles and tour management maintainable.', approach: 'A Laravel application with authentication, role-based access, responsive UI and an extensible tour-management model.', outcome: 'A strong foundation for immersive property experiences and a practical demonstration of product architecture.', stack: 'Laravel · Authentication · Responsive UI' },
  delivery: { number: '05', kicker: 'Full-stack contribution / 2020 — now', title: 'Mobile + Backend Delivery', summary: 'The cross-platform and backend work that makes business applications dependable in production.', challenge: 'Business applications need to work across connectivity conditions, devices and integration boundaries without losing data or clarity.', approach: 'Reusable mobile components, Provider / Bloc state patterns, offline-first persistence, queued synchronization, REST API integration and Linux/VPS deployment workflows.', outcome: 'More resilient application flows, cleaner handoffs between mobile and backend systems and 30% faster API data retrieval after query optimization.', stack: 'React Native · Flutter · Laravel · SQLite · AWS' },
};
const caseModal = $('[data-case-modal]');
$$('[data-case-study]').forEach((button) => button.addEventListener('click', () => {
  const data = caseData[button.dataset.caseStudy];
  $('[data-case-number]', caseModal).textContent = data.number;
  $('[data-case-kicker]', caseModal).textContent = data.kicker;
  $('[data-case-title]', caseModal).textContent = data.title;
  $('[data-case-summary]', caseModal).textContent = data.summary;
  $('[data-case-challenge]', caseModal).textContent = data.challenge;
  $('[data-case-approach]', caseModal).textContent = data.approach;
  $('[data-case-outcome]', caseModal).textContent = data.outcome;
  $('[data-case-stack]', caseModal).textContent = data.stack;
  caseModal.showModal();
}));
$('[data-case-close]').addEventListener('click', () => caseModal.close());
caseModal.addEventListener('click', (event) => { if (event.target === caseModal) caseModal.close(); });
$('[data-case-contact]').addEventListener('click', () => caseModal.close());

const stackDetail = $('[data-stack-detail]');
const stackCopy = { Frontend: 'React · TypeScript · Electron — interfaces that stay fast and readable.', Backend: 'PHP · Laravel · Node.js — APIs, domain logic and integration layers.', Mobile: 'React Native · Flutter · Dart — cross-platform products with a native feel.', Databases: 'MySQL · PostgreSQL · MariaDB · SQLite — data models shaped around the workflow.', 'Cloud / DevOps': 'AWS · SQS · Linux · CI/CD — delivery and runtime care.', 'Platforms / Tools': 'GitHub · Composer · NPM · Frappe — the tools that keep work moving.' };
$$('[data-stack]').forEach((node) => {
  const activate = () => { $$('[data-stack]').forEach((item) => item.classList.remove('is-active')); node.classList.add('is-active'); stackDetail.textContent = stackCopy[node.dataset.stack]; };
  node.addEventListener('mouseenter', activate); node.addEventListener('focus', activate); node.addEventListener('click', activate);
});

const copyEmail = $('[data-copy-email]');
copyEmail.addEventListener('click', async () => {
  const email = copyEmail.dataset.email;
  try { await navigator.clipboard.writeText(email); showToast('Email copied to clipboard'); } catch { showToast(email); }
});

$('[data-contact-form]').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const reason = String(formData.get('reason') || '').trim();
  const status = $('[data-form-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  const originalLabel = submitButton.innerHTML;
  formData.append('_subject', `${reason} - portfolio enquiry from ${name}`);
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending...';
  status.textContent = '';
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Form submission failed');
    status.textContent = 'Message sent successfully. I will get back to you soon.';
    form.reset();
  } catch {
    status.textContent = 'Could not send the message. Please email me directly at shamsudeenasmi96@gmail.com.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;
  }
});

const commandOverlay = $('[data-command-overlay]');
const commandInput = $('[data-command-input]');
const commandButtons = $$('[data-command]');
const openCommand = () => { commandOverlay.hidden = false; commandInput.value = ''; commandInput.focus(); };
const closeCommand = () => { commandOverlay.hidden = true; };
$('[data-command-open]').addEventListener('click', openCommand);
$('[data-command-close]').addEventListener('click', closeCommand);
commandOverlay.addEventListener('click', (event) => { if (event.target === commandOverlay) closeCommand(); });
commandInput.addEventListener('input', () => {
  const term = commandInput.value.toLowerCase();
  commandButtons.forEach((button) => { button.hidden = !button.textContent.toLowerCase().includes(term); });
});
commandButtons.forEach((button) => button.addEventListener('click', () => {
  const command = button.dataset.command;
  if (command === 'theme') themeToggle.click();
  else document.getElementById(command)?.scrollIntoView({ behavior: 'smooth' });
  closeCommand();
}));
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') { event.preventDefault(); openCommand(); }
  if (event.key === 'Escape') { closeCommand(); if (architectureModal.open) architectureModal.close(); if (caseModal.open) caseModal.close(); }
});

$('[data-year]').textContent = new Date().getFullYear();
