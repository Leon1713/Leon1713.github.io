
// Dark Mode Toggle


// Booking Confirmation Popup
const form = document.querySelector('.booking-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Booking confirmed! Thank you for choosing AZONE.');
        form.reset();
    });
}

function test() {
    const hamburger = document.getElementById("hamburger");
    const hamburgerMenu = document.getElementById("hamburger-menu-container");
    const svg = document.getElementById("hamburgerDiv");
    if (hamburger.classList.length > 0) {
        hamburger.classList.remove("active");
        hamburgerMenu.classList.add("hamburger-menu-inactive")
        hamburgerMenu.classList.remove("hamburger-menu-active")
    }
    else {
        hamburger.classList.add("active");
        hamburgerMenu.classList.add("hamburger-menu-active")
        hamburgerMenu.classList.remove("hamburger-menu-inactive")
    }

}

const links = document.querySelectorAll("a");
links.forEach(link => {
    console.log(link.href);
    if (link.href === window.location.href) {
        link.classList.add("isActive");
    }
    else {
        if (link.classList.contains("isActive")) {
            link.classList.remove("isActive");
        }
    }
})

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