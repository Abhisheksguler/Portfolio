// ── Custom Cursor ────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
function animateRing() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .sn-mod, .proj-card, .sn-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2.4)';
    ring.style.width = '44px'; ring.style.height = '44px'; ring.style.opacity = '.25';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width = '26px'; ring.style.height = '26px'; ring.style.opacity = '1';
  });
});

// ── Particle Canvas ──────────────────────
(function() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const N = 55;
  for (let i = 0; i < N; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.4 + .4
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(129,230,217,.55)';
      ctx.fill();
    });
    // Connect nearby pts
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(129,230,217,${.12 * (1 - d/130)})`;
          ctx.lineWidth = .6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Typing Effect ────────────────────────
const roles = [
  'ServiceNow Developer',
  'ITSM Engineer',
  'Flow Designer Builder',
  'REST Integration Dev',
  'Change Mgmt Engineer',
  'Python / Django Dev',
  'Full Stack Engineer',
  'CSA Aspirant',
];
let ri = 0, ci = 0, deleting = false;
const typed = document.getElementById('typed');

function typeLoop() {
  const word = roles[ri];
  if (!deleting) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 32 : 68);
}
typeLoop();

// ── Scroll Reveal ────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Skill Bars ───────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sbar-fill').forEach(bar => {
        bar.style.width = (bar.dataset.w || 70) + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.skill-col').forEach(el => barObs.observe(el));

// ── Active Nav ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#'+e.target.id ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => navObs.observe(s));

// ── Navbar scroll shadow ─────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.style.boxShadow = scrollY > 40 ? '0 4px 30px rgba(0,0,0,.4)' : '';
});

// ── Console ──────────────────────────────
console.log('%c  Abhishek S Guler — ServiceNow Developer  ', 'background:#81e6d9;color:#07090f;font-family:monospace;font-size:13px;padding:4px;border-radius:2px;');
console.log('%c  sgabhishek009@gmail.com  ', 'color:#81e6d9;font-family:monospace;font-size:11px;');
console.log('%c  ServiceNow Micro-Certified · REST Integration · Change Mgmt · CSA Path  ', 'color:#9f7aea;font-family:monospace;font-size:10px;');
