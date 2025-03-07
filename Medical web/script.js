// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀' : '🌙';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀';
}

// Typing Animation
const text = "Your One-Stop Healthcare Solution";
let index = 0;
const typingText = document.getElementById('typing-text');

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            typingText.textContent = "";
            index = 0;
            type();
        }, 2000);
    }
}
type();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Functions
function openOrderModal() {
    document.getElementById('order-modal').style.display = 'flex';
}

function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const medicineName = button.getAttribute('data-name');
        const medicinePrice = parseFloat(button.getAttribute('data-price'));
        cartCount++;
        cartCountElement.textContent = cartCount;
        alert(`${medicineName} added to cart! Price: ₹${medicinePrice}`);
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});