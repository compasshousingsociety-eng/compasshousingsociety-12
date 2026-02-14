// ==========================================
// PAGE LOADER
// ==========================================
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    
    // Hide loader after page fully loads
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800); // Adjust timing as needed
});

// ==========================================
// DARK/LIGHT MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
}

// Theme toggle functionality
themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        // Switch to light mode
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    } else {
        // Switch to dark mode
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Newsletter Form Submission

const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(function(form) {
    const emailInput = form.querySelector('input[type="email"]');

    // 1. LIVE: No spaces in email while typing
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            this.value = this.value.replace(/\s/g, '');
        });
    }

    // 2. VALIDATION: Form submit logic
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const gmailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;

        if (!gmailRegex.test(email)) {
            alert('Please enter a valid Gmail address (Ex: example@gmail.com) with no spaces.');
            return;
        }

        // Success Path
        console.log('Newsletter subscription:', email);
        
        // If you have a showNotification function defined elsewhere
        if (typeof showNotification === "function") {
            showNotification('Successfully subscribed to newsletter!');
        } else {
            alert('Successfully subscribed!');
        }

        // Reset the form
        form.reset();
        emailInput.value = '';
    });
});


// const newsletterForm = document.querySelector('.newsletter-form');
// if (newsletterForm) {
//     newsletterForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const emailInput = this.querySelector('input[type="email"]');
//         const email = emailInput.value;
        
//         // Simple validation
//         if (email && email.includes('@gmail.com')) {
//             alert('Thank you for subscribing! We will send updates to: ' + email);
//             this.reset();
//         } else {
//             alert('Please enter a valid email address(Ex: example@gmail.com).');
//         }
//     });
// }

// Property Card Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// // Mobile Menu Close on Link Click
// const navbarCollapse = document.querySelector('.navbar-collapse');
// const navbarToggler = document.querySelector('.navbar-toggler');

// navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
//             navbarToggler.click();
//         }
//     });
// });


// // Dropdown hover for desktop only
// if (window.innerWidth >= 992) {
//     document.querySelectorAll('.dropdown').forEach(dropdown => {
//         dropdown.addEventListener('mouseenter', function() {
//             this.querySelector('.dropdown-menu').classList.add('show');
//         });
//         dropdown.addEventListener('mouseleave', function() {
//             this.querySelector('.dropdown-menu').classList.remove('show');
//         });
//     });
// } else {
//     // Mobile: Let Bootstrap handle dropdown with data-bs-toggle
//     document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
//         toggle.addEventListener('click', function(e) {
//             e.preventDefault();
//             const menu = this.nextElementSibling;
//             menu.classList.toggle('show');
//         });
//     });
// }


// Projects Search Functionality
const projectSearch = document.getElementById('projectSearch');
if (projectSearch) {
    projectSearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const address = card.querySelector('.project-address').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || address.includes(searchTerm)) {
                card.closest('.col-lg-4').style.display = 'block';
            } else {
                card.closest('.col-lg-4').style.display = 'none';
            }
        });
    });
}

// Pagination Functionality (Basic)
// const prevBtn = document.querySelector('.prev-btn');
// const nextBtn = document.querySelector('.next-btn');
// const paginationInfo = document.querySelector('.pagination-info');

// if (prevBtn && nextBtn && paginationInfo) {
//     let currentPage = 1;
//     const totalPages = 2;
    
//     nextBtn.addEventListener('click', function() {
//         if (currentPage < totalPages) {
//             currentPage++;
//             updatePagination();
//         }
//     });
    
//     prevBtn.addEventListener('click', function() {
//         if (currentPage > 1) {
//             currentPage--;
//             updatePagination();
//         }
//     });
    
//     function updatePagination() {
//         paginationInfo.textContent = `${String(currentPage).padStart(2, '0')} of ${totalPages}`;
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
// }


// Mortgage Calculator
function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanPeriod = parseFloat(document.getElementById('loanPeriod').value) * 12;
    
    const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanPeriod)) / 
                          (Math.pow(1 + interestRate, loanPeriod) - 1);
    
    document.getElementById('monthlyPayment').textContent = '₹' + monthlyPayment.toFixed(2);
    document.getElementById('mortgageResult').style.display = 'block';
}

function shareProperty() {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this property!',
            text: 'I found this amazing property and thought you might like it.',
            url: window.location.href // Shares the current page link
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        // Fallback for browsers that don't support native sharing
        alert("Sharing not supported on this browser. You can copy the URL: " + window.location.href);
    }
}

function toggleSave() {
    const icon = document.getElementById('heartIcon');
    
    // Toggle between regular (hollow) and solid heart
    if (icon.classList.contains('fa-regular')) {
        icon.classList.replace('fa-regular', 'fa-solid');
        icon.style.color = 'red';
        alert('Property saved to your favorites!');
        localStorage.setItem('property_saved', 'true');
    } else {
        icon.classList.replace('fa-solid', 'fa-regular');
        icon.style.color = '';
        localStorage.setItem('property_saved', 'false');
    }
}