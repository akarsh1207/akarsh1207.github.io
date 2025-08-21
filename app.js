// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const mainPage = document.getElementById('main-page');
    const updatesPage = document.getElementById('updates-page');
    
    // Ensure main page is shown by default
    mainPage.classList.add('active');
    updatesPage.classList.remove('active');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target page
            if (targetPage === 'main') {
                mainPage.classList.add('active');
                updatesPage.classList.remove('active');
                stopTypewriter();
            } else if (targetPage === 'updates') {
                mainPage.classList.remove('active');
                updatesPage.classList.add('active');
                // Start typewriter animation when updates page is shown
                setTimeout(startTypewriter, 100);
            }
        });
    });
    
    // Set initial active states
    document.querySelector('.nav-link[data-page="main"]').classList.add('active');
});

// Typewriter Animation
let typewriterTimeout;
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isTypewriterActive = false;

// Array of phrases to cycle through (you can customize these)
const phrases = [
    "Writing new research papers",
    "Growing the team", 
    "Designing interfaces",
    "Building the future",
    "Exploring new ideas"
];

// Typewriter configuration
const typewriterConfig = {
    typeSpeed: 100,        // Speed of typing (ms per character)
    deleteSpeed: 50,       // Speed of deleting (ms per character)
    pauseTime: 2000,       // Pause time at end of phrase (ms)
    deletePauseTime: 1000  // Pause time before deleting (ms)
};

function startTypewriter() {
    // Prevent multiple instances
    if (isTypewriterActive) return;
    
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    isTypewriterActive = true;
    currentCharIndex = 0;
    currentPhraseIndex = 0;
    isDeleting = false;
    
    // Clear any existing content
    typewriterElement.textContent = '';
    
    // Start the animation
    typewriterAnimation();
}

function typewriterAnimation() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement || !isTypewriterActive) return;
    
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (!isDeleting) {
        // Typing
        if (currentCharIndex < currentPhrase.length) {
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typewriterTimeout = setTimeout(typewriterAnimation, typewriterConfig.typeSpeed);
        } else {
            // Finished typing, pause then start deleting
            typewriterTimeout = setTimeout(() => {
                isDeleting = true;
                typewriterAnimation();
            }, typewriterConfig.deletePauseTime);
        }
    } else {
        // Deleting
        if (currentCharIndex > 0) {
            typewriterElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typewriterTimeout = setTimeout(typewriterAnimation, typewriterConfig.deleteSpeed);
        } else {
            // Finished deleting, move to next phrase
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typewriterTimeout = setTimeout(typewriterAnimation, typewriterConfig.pauseTime);
        }
    }
}

// Stop typewriter when leaving updates page
function stopTypewriter() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
        typewriterTimeout = null;
    }
    isTypewriterActive = false;
    currentCharIndex = 0;
    isDeleting = false;
    
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        typewriterElement.textContent = '';
    }
}

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', function() {
    const updatesPage = document.getElementById('updates-page');
    
    if (document.hidden) {
        // Page is hidden, stop typewriter
        if (isTypewriterActive) {
            stopTypewriter();
        }
    } else {
        // Page is visible, restart typewriter if on updates page
        if (updatesPage && updatesPage.classList.contains('active') && !isTypewriterActive) {
            setTimeout(startTypewriter, 100);
        }
    }
});

// Smooth scrolling for any internal links (optional enhancement)
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]') && !e.target.hasAttribute('data-page')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for better UX (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.hero-section, .about-section, .education-section, .experience-section, .research-section, .timeline-item');
    
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
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility function to update typewriter phrases (for easy customization)
function updateTypewriterPhrases(newPhrases) {
    if (Array.isArray(newPhrases) && newPhrases.length > 0) {
        phrases.length = 0; // Clear existing phrases
        phrases.push(...newPhrases);
        
        // Reset animation if currently active
        if (isTypewriterActive) {
            stopTypewriter();
            setTimeout(startTypewriter, 100);
        }
    }
}

// Debug function to check page states
function debugPageState() {
    console.log('Main page active:', document.getElementById('main-page').classList.contains('active'));
    console.log('Updates page active:', document.getElementById('updates-page').classList.contains('active'));
    console.log('Typewriter active:', isTypewriterActive);
}

// Accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Handle keyboard navigation for nav links
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Allow Enter key to activate navigation links
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
        e.target.click();
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Console message for developers
console.log('Personal Website initialized successfully!');
console.log('Navigation: Use Home/Updates links to switch pages');
console.log('Typewriter: Automatically starts when Updates page is viewed');
console.log('Debug: Use debugPageState() to check current page state');
console.log('Customization: Use updateTypewriterPhrases(["phrase1", "phrase2"]) to change animated text');

// Export functions for potential future use
if (typeof window !== 'undefined') {
    window.updateTypewriterPhrases = updateTypewriterPhrases;
    window.debugPageState = debugPageState;
}