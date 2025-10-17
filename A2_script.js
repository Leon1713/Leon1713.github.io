
// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀' : '☾';
});

// Booking Confirmation Popup
const form = document.querySelector('.booking-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Booking confirmed! Thank you for choosing AZONE.');
        form.reset();
    });
}

// Scroll Fade-In Animation
const fadeElements = document.querySelectorAll('.testimonials, .footer');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));

// Smooth Scroll Active Link Highlight
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});