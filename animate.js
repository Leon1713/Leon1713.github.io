const fadeElements = document.querySelectorAll('.why-us-card,.animateOnScroll,.vechicle-spec-card');
fadeElements.forEach(element => {
    element.classList.add("animate");
})
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animateScrollUp');
            entry.target.classList.remove('animate')
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));

function doObserve()
{
    const fadeElements = document.querySelectorAll('.why-us-card,.animateOnScroll');
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animateScrollUp');
            entry.target.classList.remove('animate')
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });
fadeElements.forEach(el => observer.observe(el));
}