// Año
document.getElementById('year').textContent = new Date().getFullYear();

// Barra de progreso de scroll
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
});

// Navegación activa
const links = Array.from(document.querySelectorAll('header nav a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const setActive = () => {
    let idx = sections.findIndex(s => s.getBoundingClientRect().top > 90) - 1;
    if (idx < 0) idx = sections.length - 1;
    links.forEach(l => l.classList.remove('active'));
    links[Math.max(0, idx)].classList.add('active');
};
window.addEventListener('scroll', setActive);
setActive();

// Reveal on scroll (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.style.animation = 'fadeUp .6s both';
            io.unobserve(e.target);
        }
    })
}, {
    threshold: .12
});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Modo claro/oscuro
const btnTheme = document.getElementById('toggleTheme');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
btnTheme.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    btnTheme.textContent = root.classList.contains('light') ? '🌞' : '🌙';
});
btnTheme.textContent = root.classList.contains('light') ? '🌞' : '🌙';

// Accesibilidad: cerrar foco en navegación tras click
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => a.blur());
});