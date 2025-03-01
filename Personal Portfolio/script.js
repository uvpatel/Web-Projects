// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
}

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll, .about-content').forEach(el => {
    observer.observe(el);
});

// Skills Scroller with Infinite Loop and Draggable Functionality
const skills = [
    { name: "Python", icon: "python.png" },
    { name: "C", icon: "c.jpg" },
    { name: "CSS", icon: "css.png" },
    { name: "HTML", icon: "html.png" },
    { name: "Tailwind CSS", icon: "tailwind.jpg" },
    { name: "GitHub", icon: "github.png" }
];

const skillsTrack = document.getElementById("skillsTrack");
const skillsScroller = document.querySelector(".skills-scroller");

function populateSkills() {
    const skillsDuplicated = [...skills, ...skills]; // Duplicate for infinite loop
    skillsDuplicated.forEach(skill => {
        const skillCard = document.createElement("div");
        skillCard.classList.add("skill-card");
        skillCard.innerHTML = `
            <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
            <p>${skill.name}</p>
        `;
        skillsTrack.appendChild(skillCard);
    });
}

populateSkills();

// Infinite Loop Scrolling
let scrollPosition = 0;
const scrollSpeed = 1; // Adjust speed here
let isDragging = false;
let startX;
let initialScroll;

function animateSkillsScroll() {
    if (!isDragging) {
        scrollPosition += scrollSpeed;
        const trackWidth = skillsTrack.scrollWidth / 2; // Half because of duplication
        if (scrollPosition >= trackWidth) {
            scrollPosition = 0; // Reset to start for seamless loop
        }
        skillsTrack.style.transform = `translateX(-${scrollPosition}px)`;
    }
    requestAnimationFrame(animateSkillsScroll);
}

skillsScroller.addEventListener("mousedown", (e) => {
    isDragging = true;
    skillsScroller.classList.add('grabbing');
    startX = e.pageX;
    initialScroll = scrollPosition;
});

skillsScroller.addEventListener("mouseleave", () => {
    isDragging = false;
    skillsScroller.classList.remove('grabbing');
});

skillsScroller.addEventListener("mouseup", () => {
    isDragging = false;
    skillsScroller.classList.remove('grabbing');
});

skillsScroller.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX - x) * 2; // Adjust drag sensitivity
    scrollPosition = initialScroll + walk;
    const trackWidth = skillsTrack.scrollWidth / 2;
    if (scrollPosition < 0) scrollPosition += trackWidth; // Wrap around if dragged left
    if (scrollPosition >= trackWidth) scrollPosition -= trackWidth; // Wrap around if dragged right
    skillsTrack.style.transform = `translateX(-${scrollPosition}px)`;
});

// Touch Support for Mobile
skillsScroller.addEventListener("touchstart", (e) => {
    isDragging = true;
    skillsScroller.classList.add('grabbing');
    startX = e.touches[0].pageX;
    initialScroll = scrollPosition;
});

skillsScroller.addEventListener("touchend", () => {
    isDragging = false;
    skillsScroller.classList.remove('grabbing');
});

skillsScroller.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX;
    const walk = (startX - x) * 2;
    scrollPosition = initialScroll + walk;
    const trackWidth = skillsTrack.scrollWidth / 2;
    if (scrollPosition < 0) scrollPosition += trackWidth;
    if (scrollPosition >= trackWidth) scrollPosition -= trackWidth;
    skillsTrack.style.transform = `translateX(-${scrollPosition}px)`;
});

// Start the infinite loop
requestAnimationFrame(animateSkillsScroll);

// Cursor Effect
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Typewriter Effect (for Hero Section only)
document.addEventListener("DOMContentLoaded", () => {
    const titles = [
        "AI Enthusiast",
        "Web Developer",
        "Python Programmer",
        "Bug Bounty Hunter",
        "Future Data Scientist",
        "Tech Explorer",
        "Ethical Hacking Learner",
        "DSA Aspirant"
    ];
    
    const typewriter = document.querySelector(".typewriter");
    let currentIndex = 0;
    let charIndex = 0;
    let isErasing = false;

    const typeSpeed = 150;
    const eraseSpeed = 100;
    const pauseAfterType = 2000;
    const pauseAfterErase = 1000;

    function typeEffect() {
        const text = titles[currentIndex];

        if (!isErasing) {
            typewriter.textContent = text.substring(0, charIndex++);
            if (charIndex <= text.length) {
                setTimeout(typeEffect, typeSpeed);
            } else {
                isErasing = true;
                setTimeout(typeEffect, pauseAfterType);
            }
        } else {
            typewriter.textContent = text.substring(0, charIndex--);
            if (charIndex >= 0) {
                setTimeout(typeEffect, eraseSpeed);
            } else {
                isErasing = false;
                currentIndex = (currentIndex + 1) % titles.length;
                setTimeout(typeEffect, pauseAfterErase);
            }
        }
    }

    typeEffect();
});