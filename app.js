// Global variables
let currentUpdateIndex = 0;
const updates = [
    "Full-time Thermal Vehicle Controls Engineer position at Tesla",
    "Completed M.S. in Mechanical Engineering at UC San Diego", 
    "Started internship at Tesla's Thermal Vehicle Controls team",
    "Completed internship at Lennox International in Dallas",
    "Finished battery engineering work at Cuberg"
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is updates page by URL or create updates page functionality
    handlePageRouting();
    
    // Common initializations
    initNavigation();
    initScrollAnimations();
    
    // Initialize based on current page content
    if (document.querySelector('.updates-hero')) {
        initUpdatesPage();
    } else {
        initMainPage();
    }
});

// Handle page routing and updates page creation
function handlePageRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    
    if (page === 'updates' || window.location.hash === '#updates') {
        createUpdatesPage();
    }
    
    // Handle navigation clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href*="updates"]')) {
            e.preventDefault();
            createUpdatesPage();
            window.history.pushState({page: 'updates'}, 'Updates', '?page=updates');
        } else if (e.target.matches('a[href="index.html"], a[href="#home"]')) {
            e.preventDefault();
            createMainPage();
            window.history.pushState({page: 'home'}, 'Home', '/');
        }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page === 'updates') {
            createUpdatesPage();
        } else {
            createMainPage();
        }
    });
}

// Create updates page content
function createUpdatesPage() {
    const body = document.body;
    body.classList.add('updates-page');
    
    // Hide main page content
    const mainSections = document.querySelectorAll('.hero, .introduction, .education, .experience, .research');
    mainSections.forEach(section => section.style.display = 'none');
    
    // Remove existing updates content if any
    const existingUpdates = document.querySelector('.updates-hero, .timeline-section');
    if (existingUpdates) {
        existingUpdates.remove();
    }
    
    // Create updates hero section
    const updatesHero = document.createElement('section');
    updatesHero.className = 'updates-hero';
    updatesHero.innerHTML = `
        <div class="updates-background"></div>
        <div class="container">
            <div class="updates-content">
                <h1 class="updates-title">Recent Updates</h1>
                <div class="typewriter-container">
                    <p class="typewriter-text" id="typewriter"></p>
                    <span class="cursor">|</span>
                </div>
            </div>
        </div>
    `;
    
    // Create timeline section
    const timelineSection = document.createElement('section');
    timelineSection.className = 'timeline-section';
    timelineSection.innerHTML = `
        <div class="container">
            <div class="timeline">
                <div class="timeline-item" data-date="08.23.25">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3>Full-time Position at Tesla</h3>
                        <p>Started as a Thermal Vehicle Controls Engineer at Tesla, working on thermal+controls+Data Science topics on various Tesla Fleets</p>
                        <span class="timeline-date">August 2025</span>
                    </div>
                </div>
                
                <div class="timeline-item" data-date="06.15.25">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3>M.S. Graduation</h3>
                        <p>Completed M.S. in Mechanical Engineering at UC San Diego with a GPA of 3.777/4.0, specializing in thermal processes and energy systems</p>
                        <span class="timeline-date">June 2025</span>
                    </div>
                </div>
                
                <div class="timeline-item" data-date="01.15.25">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3>Tesla Internship</h3>
                        <p>Started internship at Tesla's Thermal Vehicle Controls team, developing thermal models for windshield glass and achieving 1°C accuracy</p>
                        <span class="timeline-date">January 2025</span>
                    </div>
                </div>
                
                <div class="timeline-item" data-date="12.20.24">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3>Lennox International</h3>
                        <p>Completed internship at Lennox International in Dallas, working on thermal system modeling and exploring Physics Informed Neural Networks for HVAC simulation</p>
                        <span class="timeline-date">December 2024</span>
                    </div>
                </div>
                
                <div class="timeline-item" data-date="08.30.24">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <h3>Cuberg Battery Engineering</h3>
                        <p>Finished battery engineering work at Cuberg, developing computer vision algorithms for battery CT scan analysis and fault detection</p>
                        <span class="timeline-date">August 2024</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    navbar.insertAdjacentElement('afterend', updatesHero);
    updatesHero.insertAdjacentElement('afterend', timelineSection);
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent === 'Updates') {
            link.classList.add('active');
        }
    });
    
    // Initialize updates page functionality
    setTimeout(() => {
        initUpdatesPage();
    }, 100);
}

// Create main page content  
function createMainPage() {
    const body = document.body;
    body.classList.remove('updates-page');
    
    // Remove updates content
    const updatesContent = document.querySelectorAll('.updates-hero, .timeline-section');
    updatesContent.forEach(content => content.remove());
    
    // Show main page content
    const mainSections = document.querySelectorAll('.hero, .introduction, .education, .experience, .research');
    mainSections.forEach(section => section.style.display = '');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent === 'Home') {
            link.classList.add('active');
        }
    });
    
    // Re-initialize main page
    setTimeout(() => {
        initMainPage();
    }, 100);
}

// Main page initialization
function initMainPage() {
    initParallaxEffects();
    initHorizontalScroll();
    initSectionAnimations();
    initScrollIndicator();
    addInteractiveEffects();
}

// Updates page initialization
function initUpdatesPage() {
    initTypewriter();
    initTimelineAnimations();
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Handle internal page links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                if (targetId === 'updates') {
                    createUpdatesPage();
                    return;
                }
                
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttledScrollHandler);
}

// Enhanced parallax effects for hero section
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');
    
    if (!hero || !heroBackground) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const scrollPercent = scrolled / heroHeight;
        
        if (scrolled < heroHeight) {
            // Enhanced background parallax with multiple effects
            if (heroBackground) {
                const parallaxOffset = scrolled * 0.6;
                const scaleValue = 1 + (scrollPercent * 0.2);
                heroBackground.style.transform = `translateY(${parallaxOffset}px) scale(${scaleValue})`;
                heroBackground.style.filter = `brightness(${1 - scrollPercent * 0.3})`;
            }
            
            // Enhanced content parallax with rotation and scale
            if (heroContent) {
                const contentOffset = scrolled * 0.4;
                const opacity = Math.max(0, 1 - (scrollPercent * 1.5));
                const scale = Math.max(0.8, 1 - (scrollPercent * 0.3));
                const rotate = scrollPercent * 2;
                
                heroContent.style.transform = `translateY(${contentOffset}px) scale(${scale}) rotate(${rotate}deg)`;
                heroContent.style.opacity = opacity;
            }
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    
    // Initial call
    updateParallax();
}

// Enhanced horizontal scroll for experience section
function initHorizontalScroll() {
    const experienceScroll = document.querySelector('.experience-scroll');
    
    if (!experienceScroll) return;
    
    // Enhanced mouse wheel horizontal scrolling
    experienceScroll.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            const scrollAmount = e.deltaY * 2;
            this.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }, { passive: false });
    
    // Enhanced scroll animations for experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceScroll.addEventListener('scroll', function() {
        const scrollLeft = this.scrollLeft;
        const containerWidth = this.offsetWidth;
        
        experienceItems.forEach((item, index) => {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const itemCenter = itemLeft + (itemWidth / 2);
            const containerCenter = scrollLeft + (containerWidth / 2);
            const distance = Math.abs(itemCenter - containerCenter);
            const maxDistance = containerWidth / 2;
            
            // Calculate scale and opacity based on distance from center
            const scale = Math.max(0.85, 1 - (distance / maxDistance) * 0.15);
            const opacity = Math.max(0.7, 1 - (distance / maxDistance) * 0.3);
            const rotateY = (itemCenter - containerCenter) / maxDistance * 10;
            
            item.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
            item.style.opacity = opacity;
            
            // Add perspective effect
            item.style.transformStyle = 'preserve-3d';
            item.style.perspective = '1000px';
        });
    });
    
    // Auto-scroll on first load to showcase the effect
    setTimeout(() => {
        experienceScroll.scrollBy({
            left: 100,
            behavior: 'smooth'
        });
    }, 2000);
}

// Enhanced section animations on scroll
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.education-card, .research-item, .intro-content, .section-title');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Enhanced stagger animations for child elements
                const children = entry.target.querySelectorAll('.education-card, .research-item');
                children.forEach((child, index) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(50px) rotateX(15deg)';
                    
                    setTimeout(() => {
                        child.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) rotateX(0)';
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced scroll indicator for hero section
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight;
        const fadeStart = heroHeight * 0.2;
        const fadeEnd = heroHeight * 0.8;
        
        if (scrolled < fadeStart) {
            scrollIndicator.style.opacity = '0.8';
            scrollIndicator.style.transform = 'translateX(-50%) scale(1)';
        } else if (scrolled < fadeEnd) {
            const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
            const opacity = 0.8 - (fadeProgress * 0.8);
            const scale = 1 - (fadeProgress * 0.3);
            scrollIndicator.style.opacity = opacity;
            scrollIndicator.style.transform = `translateX(-50%) scale(${scale})`;
        } else {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) scale(0.7)';
        }
    });
    
    // Enhanced smooth scroll to next section on click
    scrollIndicator.addEventListener('click', function() {
        const introduction = document.querySelector('.introduction');
        if (introduction) {
            introduction.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add click animation
            this.style.transform = 'translateX(-50%) scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'translateX(-50%) scale(1)';
            }, 200);
        }
    });
}

// Enhanced typewriter effect for updates page
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (!typewriterElement) return;
    
    function typeWriter(text, element, callback) {
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '2px solid currentColor';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                // Variable typing speed for more natural effect
                const delay = Math.random() * 100 + 50;
                setTimeout(type, delay);
            } else {
                element.style.borderRight = 'none';
                setTimeout(callback, 2000);
            }
        }
        
        type();
    }
    
    function eraseText(element, callback) {
        const text = element.textContent;
        let i = text.length;
        element.style.borderRight = '2px solid currentColor';
        
        function erase() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(erase, 30);
            } else {
                element.style.borderRight = 'none';
                setTimeout(callback, 800);
            }
        }
        
        erase();
    }
    
    function nextUpdate() {
        const currentText = updates[currentUpdateIndex];
        
        // Add entrance effect
        typewriterElement.style.opacity = '0';
        typewriterElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            typewriterElement.style.transition = 'all 0.5s ease';
            typewriterElement.style.opacity = '1';
            typewriterElement.style.transform = 'translateY(0)';
            
            typeWriter(currentText, typewriterElement, function() {
                setTimeout(() => {
                    eraseText(typewriterElement, function() {
                        currentUpdateIndex = (currentUpdateIndex + 1) % updates.length;
                        nextUpdate();
                    });
                }, 3000);
            });
        }, 200);
    }
    
    // Start the typewriter effect
    nextUpdate();
}

// Enhanced timeline animations for updates page
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add ripple effect to timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    marker.style.animation = 'pulse 1s ease-out';
                }
            }
        });
    }, observerOptions);
    
    timelineItems.forEach((item, index) => {
        // Enhanced stagger delay with different directions
        const isEven = index % 2 === 0;
        item.style.transform = `translateY(50px) translateX(${isEven ? '-30px' : '30px'})`;
        item.style.transitionDelay = `${index * 0.3}s`;
        
        timelineObserver.observe(item);
    });
    
    // Add pulse animation for timeline markers
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.5); box-shadow: 0 0 20px rgba(var(--color-primary-rgb, 33, 128, 141), 0.6); }
            100% { transform: translateX(-50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced scroll animations for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add random animation delay for more dynamic effect
                const delay = Math.random() * 500;
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                    entry.target.style.opacity = '1';
                }, delay);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        // Set initial transform with random rotation
        const randomRotate = (Math.random() - 0.5) * 10;
        element.style.transform = `translateY(50px) rotate(${randomRotate}deg) scale(0.95)`;
        scrollObserver.observe(element);
    });
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Enhanced interactive effects
function addInteractiveEffects() {
    // Enhanced card hover effects with 3D transforms
    const cards = document.querySelectorAll('.education-card, .research-item, .experience-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.transformStyle = 'preserve-3d';
            this.style.perspective = '1000px';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Enhanced magnetic effect for profile placeholder
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (profilePlaceholder) {
        profilePlaceholder.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        profilePlaceholder.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    }
    
    // Add floating animation to various elements
    const floatingElements = document.querySelectorAll('.edu-logo, .company-logo');
    floatingElements.forEach(element => {
        const randomDelay = Math.random() * 2;
        element.style.animation = `float 4s ease-in-out ${randomDelay}s infinite`;
    });
    
    // Add float animation CSS
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(function() {
    updateActiveNavLink();
}, 50);

// Enhanced loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Create enhanced loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-container">
            <div class="loader-animation"></div>
            <div class="loader-text">Loading Portfolio...</div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Enhanced loader styles
    const loaderStyles = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--color-background), var(--color-surface));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: all 0.6s ease-out;
        }
        
        .loader-container {
            text-align: center;
        }
        
        .loader-animation {
            width: 60px;
            height: 60px;
            border: 4px solid var(--color-border);
            border-top: 4px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
            margin: 0 auto 20px;
        }
        
        .loader-text {
            color: var(--color-text-secondary);
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-medium);
            animation: fade 2s ease-in-out infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes fade {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
    
    // Hide loader with enhanced animation
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.transform = 'scale(0.8)';
            loader.style.opacity = '0';
            document.body.style.overflow = 'visible';
            
            setTimeout(() => {
                loader.remove();
                styleSheet.remove();
                
                // Add entrance animation to body
                document.body.style.opacity = '0';
                document.body.style.transform = 'scale(1.02)';
                document.body.style.transition = 'all 0.8s ease-out';
                
                requestAnimationFrame(() => {
                    document.body.style.opacity = '1';
                    document.body.style.transform = 'scale(1)';
                });
            }, 600);
        }, 1000);
    });
});

// Handle resize events with debouncing
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate effects on resize
        if (typeof initParallaxEffects === 'function') {
            initParallaxEffects();
        }
    }, 250);
});