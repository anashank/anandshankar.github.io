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
const roles = ['Software Engineer', 'Bioinformatics Engineer', 'Data Engineer'];
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
