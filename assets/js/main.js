// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  highlightNav();
});

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ===== TYPEWRITER =====
const roles = ['Bioinformatics Engineer', 'Software Engineer', 'Data Scientist'];
let roleIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
  if (!typeEl) return;
  const current = roles[roleIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; type(); }, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children
      entry.target.style.transitionDelay = `${i * 0.05}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== DNA CANVAS =====
(function () {
  const canvas = document.getElementById('dna-canvas');
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
  }
  resize();
  window.addEventListener('resize', resize);

  const ctx = canvas.getContext('2d');
  let phase = 0;

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx  = W / 2;
    const amp = W * 0.28;
    const N   = 80;
    const pts1 = [], pts2 = [];

    for (let i = 0; i <= N; i++) {
      const y = (i / N) * H;
      const t = (i / N) * Math.PI * 8 + phase;
      pts1.push({ x: cx + amp * Math.cos(t), y });
      pts2.push({ x: cx - amp * Math.cos(t), y });
    }

    // Strand 1
    ctx.beginPath();
    pts1.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = 'rgba(37,99,235,0.75)';
    ctx.lineWidth = 3 * dpr;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Strand 2
    ctx.beginPath();
    pts2.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = 'rgba(99,162,255,0.75)';
    ctx.lineWidth = 3 * dpr;
    ctx.stroke();

    // Base pairs + nodes
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * Math.PI * 8 + phase;
      if (Math.abs(Math.cos(t)) < 0.13) {
        const p1 = pts1[i], p2 = pts2[i];
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, 'rgba(37,99,235,0.55)');
        grad.addColorStop(1, 'rgba(99,162,255,0.55)');
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2 * dpr;
        ctx.stroke();

        [[p1, [37,99,235]], [p2, [99,162,255]]].forEach(([p, c]) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${c.join(',')},0.9)`;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.9)';
          ctx.lineWidth = 1.5 * dpr;
          ctx.stroke();
        });
      }
    }

    phase += 0.008;
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      formStatus.textContent = 'Message sent! I\'ll get back to you soon.';
      formStatus.style.color = '#16a34a';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    formStatus.textContent = 'Something went wrong. Please email me directly.';
    formStatus.style.color = '#dc2626';
  }
  btn.disabled = false;
  btn.textContent = 'Send Message';
});
