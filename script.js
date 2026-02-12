function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPos = window.scrollY + 100;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-section="${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.contains('light');
    
    if (isLight) {
        body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon();
    } else {
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon();
    }
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    if (document.body.classList.contains('light')) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light');
} else {
    document.body.classList.remove('light');
}
updateThemeIcon();

const reveals = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.3
});

reveals.forEach(element => {
    observer.observe(element);
});