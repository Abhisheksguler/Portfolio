// ── Custom Cursor ───────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Smooth ring follow
function animateRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale on hover
document.querySelectorAll('a, button, .proj-card, .stat-box, .contact-link-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
    ring.style.width  = '48px';
    ring.style.height = '48px';
    ring.style.opacity = '.3';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width  = '28px';
    ring.style.height = '28px';
    ring.style.opacity = '1';
  });
});

// ── Typing effect ────────────────────────────────────
const roles = [
  'Software Developer',
  'Python Engineer',
  'Django Specialist',
  'React Developer',
  'AI / ML Builder',
  'Full Stack Engineer',
];
let ri = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed');

function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 75);
}
typeLoop();

// ── Scroll Reveal ────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Skill Icon Bars
const sicObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sic-fill').forEach(bar => {
        bar.style.width = (bar.dataset.w || 70) + '%';
      });
      sicObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-icon-grid').forEach(el => sicObs.observe(el));

// ── Skill Bars ───────────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = (bar.dataset.w || 70) + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-grid').forEach(el => barObs.observe(el));

// ── Active Nav Highlight ─────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        const active = a.getAttribute('href') === '#' + e.target.id;
        a.style.color = active ? 'var(--text)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObs.observe(s));

// ── Console easter egg ───────────────────────────────
console.log('%c  Abhishek S Guler  ', 'background:#00d4ff;color:#000;font-family:monospace;font-size:14px;padding:4px;');
console.log('%c  sgabhishek009@gmail.com  ', 'color:#00d4ff;font-family:monospace;font-size:11px;');
