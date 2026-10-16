// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const hamburger = navToggle.querySelector('.hamburger');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const hamburger = navToggle.querySelector('.hamburger');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Scroll Guide - Update text based on current section
const scrollNext = document.getElementById('scrollNext');
const sections = document.querySelectorAll('section');

function updateScrollGuide() {
    let currentSection = '';
    const scrollPosition = window.scrollY + 400; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (scrollNext) {
        if (currentSection === 'home' || currentSection === '') {
            scrollNext.textContent = 'Next: About Me';
        } else if (currentSection === 'about') {
            scrollNext.textContent = 'Next: Projects';
        } else if (currentSection === 'projects') {
            scrollNext.textContent = 'Next: Contact';
        } else if (currentSection === 'contact') {
            scrollNext.textContent = 'Scroll to top';
        }
    }
}

// Navbar background and active link on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    // Update navbar background on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.08)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
    }

    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
    
    // Update scroll guide
    updateScrollGuide();
});

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        font-weight: 600;
    }
    .nav-link.active::after {
        width: 100%;
    }
    .hamburger.active {
        background-color: transparent;
    }
    .hamburger.active::before {
        top: 0;
        transform: rotate(45deg);
    }
    .hamburger.active::after {
        top: 0;
        transform: rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
const projectCards = document.querySelectorAll('.project-card');
const highlightCards = document.querySelectorAll('.highlight-card');
const skillItems = document.querySelectorAll('.skill-item');
const contactItems = document.querySelectorAll('.contact-item');

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.8s ease-out ${index * 0.12}s, transform 0.8s ease-out ${index * 0.12}s`;
    observer.observe(card);
});

highlightCards.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
    observer.observe(item);
});

skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s`;
    observer.observe(item);
});

contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(item);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 90;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize scroll guide on load
updateScrollGuide();

// Add subtle parallax effect to hero image
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image-wrapper');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Professional console message
console.log(`%c
╔══════════════════════════════════════════╗
║   Anex Joby | Professional Portfolio     ║
║   B.Tech CSE | Aspiring Developer       ║
╚══════════════════════════════════════════╝
%c
Built with HTML5, CSS3, JavaScript
Open to opportunities: anexjoby@example.com
`, 'color: #6366f1; font-size: 12px; font-family: monospace;', 'color: #64748b; font-size: 11px; font-family: monospace;');
