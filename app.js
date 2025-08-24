// Portfolio Website JavaScript - Fixed Navigation & Experience Scrolling
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.currentExperienceIndex = 0;
        this.experienceCards = [];
        this.totalExperienceCards = 6;
        this.cardWidth = 420;
        this.cardGap = 32;
        this.typingTexts = [
            "Started full-time role at Tesla as Thermal Vehicle Controls Engineer",
            "Working on thermal+controls+Data Science topics on various Tesla Fleets",
            "Developing innovative solutions for automotive thermal systems",
            "Exploring the intersection of ML and thermal engineering"
        ];
        this.currentTypingIndex = 0;
        this.typingSpeed = 100;
        this.pauseTime = 2000;
        this.isTyping = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupComponents();
            });
        } else {
            this.setupComponents();
        }
    }

    setupComponents() {
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupExperienceScroll();
        this.setupScrollAnimations();
        this.setupTypingAnimation();
        this.handleScrollEffects();
        
        // Initialize experience cards and dots
        this.experienceCards = document.querySelectorAll('.experience__card');
        this.totalExperienceCards = this.experienceCards.length;
        this.createExperienceDots();
        this.updateExperienceDisplay();
        this.calculateResponsiveCardWidth();
        
        console.log('Portfolio app initialized successfully');
        console.log(`Found ${this.totalExperienceCards} experience cards`);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');

        if (!themeToggle || !themeIcon) {
            console.error('Theme toggle elements not found');
            return;
        }

        let savedTheme;
        try {
            savedTheme = localStorage.getItem('theme');
        } catch (e) {
            console.log('LocalStorage not available, using system theme');
        }

        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = savedTheme || systemTheme;
        this.setTheme(currentTheme);

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);

            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.log('Could not save theme preference');
        }

        const themeIcon = document.querySelector('.theme-toggle__icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav__link');
        if (navLinks.length === 0) {
            console.error('Navigation links not found');
            return;
        }

        console.log(`Found ${navLinks.length} navigation links`);

        navLinks.forEach((link, index) => {
            const targetPage = link.getAttribute('data-page');
            console.log(`Setting up nav link ${index}: ${targetPage}`);
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Navigation clicked:', targetPage);
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                link.classList.add('active');
                // Navigate to the page
                this.navigateToPage(targetPage);
            });
        });
    }

    navigateToPage(pageId) {
        if (pageId === this.currentPage) {
            console.log('Already on page:', pageId);
            return;
        }

        const pages = document.querySelectorAll('.page');
        if (pages.length === 0) {
            console.error('Page elements not found');
            return;
        }

        console.log(`Switching from ${this.currentPage} to ${pageId}`);

        // Stop typing animation when leaving updates page
        if (this.currentPage === 'updates' && pageId !== 'updates') {
            this.isTyping = false;
        }

        // Hide current page
        const currentPageElement = document.querySelector(`[data-page="${this.currentPage}"]`);
        if (currentPageElement) {
            currentPageElement.classList.add('hidden');
        }

        // Show target page
        const targetPage = document.querySelector(`[data-page="${pageId}"]`);
        if (targetPage) {
            // Use setTimeout to ensure smooth transition
            setTimeout(() => {
                targetPage.classList.remove('hidden');
                this.currentPage = pageId;
                
                // Start typing animation if on updates page
                if (pageId === 'updates') {
                    setTimeout(() => {
                        this.startTypingAnimation();
                    }, 300);
                }
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 50);
        } else {
            console.error(`Page with data-page="${pageId}" not found`);
        }
    }

    calculateResponsiveCardWidth() {
        if (window.innerWidth <= 480) {
            this.cardWidth = 280;
        } else if (window.innerWidth <= 768) {
            this.cardWidth = 320;
        } else {
            this.cardWidth = 420;
        }
    }

    setupExperienceScroll() {
        const prevBtn = document.getElementById('prevExp');
        const nextBtn = document.getElementById('nextExp');
        const scrollContainer = document.getElementById('experienceScroll');
        const scrollWrapper = document.getElementById('experienceScrollContainer');

        if (!prevBtn || !nextBtn || !scrollContainer || !scrollWrapper) {
            console.error('Experience scroll elements not found');
            return;
        }

        console.log('Setting up experience scroll navigation');

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateExperience('prev');
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateExperience('next');
        });

        this.setupTouchEvents(scrollWrapper);

        document.addEventListener('keydown', (e) => {
            if (this.currentPage === 'home') {
                if (e.key === 'ArrowRight') {
                    this.navigateExperience('next');
                } else if (e.key === 'ArrowLeft') {
                    this.navigateExperience('prev');
                }
            }
        });
    }

    setupTouchEvents(element) {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;

        element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            currentX = startX;
            currentY = startY;
            isDragging = true;
        }, { passive: true });

        element.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.navigateExperience('prev');
                } else {
                    this.navigateExperience('next');
                }
            }
        }, { passive: true });
    }

    createExperienceDots() {
        const dotsContainer = document.getElementById('experienceDots');
        if (!dotsContainer) {
            console.error('Dots container not found');
            return;
        }

        dotsContainer.innerHTML = '';
        console.log(`Creating ${this.totalExperienceCards} dots`);

        for (let i = 0; i < this.totalExperienceCards; i++) {
            const dot = document.createElement('div');
            dot.className = 'experience__dot';
            if (i === this.currentExperienceIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                this.currentExperienceIndex = i;
                this.updateExperienceDisplay();
            });

            dotsContainer.appendChild(dot);
        }
    }

    navigateExperience(direction) {
        const oldIndex = this.currentExperienceIndex;

        if (direction === 'next') {
            this.currentExperienceIndex = Math.min(
                this.totalExperienceCards - 1,
                this.currentExperienceIndex + 1
            );
        } else if (direction === 'prev') {
            this.currentExperienceIndex = Math.max(
                0,
                this.currentExperienceIndex - 1
            );
        }

        console.log(`Navigate ${direction}: ${oldIndex} -> ${this.currentExperienceIndex}`);
        this.updateExperienceDisplay();
    }

    updateExperienceDisplay() {
        const scrollContainer = document.getElementById('experienceScroll');
        const prevBtn = document.getElementById('prevExp');
        const nextBtn = document.getElementById('nextExp');

        if (!scrollContainer) {
            console.error('Scroll container not found');
            return;
        }

        console.log(`Updating experience display - index: ${this.currentExperienceIndex}`);

        const containerWidth = scrollContainer.parentElement.offsetWidth;
        this.calculateResponsiveCardWidth();

        const cardTotalWidth = this.cardWidth + this.cardGap;
        const centerOffset = (containerWidth - this.cardWidth) / 2;
        const translateX = centerOffset - (this.currentExperienceIndex * cardTotalWidth);

        scrollContainer.style.transform = `translateX(${translateX}px)`;

        // Update card states
        this.experienceCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentExperienceIndex) {
                card.classList.add('active');
            }
        });

        // Update dots
        const dots = document.querySelectorAll('.experience__dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === this.currentExperienceIndex) {
                dot.classList.add('active');
            }
        });

        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = this.currentExperienceIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = this.currentExperienceIndex === this.totalExperienceCards - 1;
        }
    }

    setupScrollAnimations() {
        if (!window.IntersectionObserver) {
            console.log('IntersectionObserver not supported');
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '-50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.education__card, .research__card, .section__title'
        );

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupTypingAnimation() {
        this.typingElement = document.getElementById('typingText');
        if (!this.typingElement) {
            console.error('Typing element not found');
            return;
        }
        console.log('Typing animation setup complete');
    }

    async startTypingAnimation() {
        if (!this.typingElement || this.isTyping) return;

        this.isTyping = true;
        console.log('Starting typing animation');

        while (this.currentPage === 'updates' && this.isTyping) {
            const text = this.typingTexts[this.currentTypingIndex];

            // Type out the text
            for (let i = 0; i <= text.length; i++) {
                if (this.currentPage !== 'updates' || !this.isTyping) return;
                this.typingElement.textContent = text.slice(0, i);
                await this.sleep(this.typingSpeed);
            }

            // Pause at the end
            await this.sleep(this.pauseTime);

            // Delete the text
            for (let i = text.length; i >= 0; i--) {
                if (this.currentPage !== 'updates' || !this.isTyping) return;
                this.typingElement.textContent = text.slice(0, i);
                await this.sleep(this.typingSpeed / 2);
            }

            // Move to next text
            this.currentTypingIndex = (this.currentTypingIndex + 1) % this.typingTexts.length;
            await this.sleep(500);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            const shapes = document.querySelectorAll('.bg-shape');

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                const yOffset = scrollY * speed;
                shape.style.transform = `translate3d(0, ${yOffset}px, 0)`;
            });

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
        updateScrollEffects();
    }

    handleResize() {
        this.calculateResponsiveCardWidth();
        this.updateExperienceDisplay();
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize the app
let portfolioApp;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    portfolioApp = new PortfolioApp();

    window.addEventListener('resize', () => {
        if (portfolioApp) {
            portfolioApp.handleResize();
        }
    });

    setupAdditionalFeatures();
    console.log('Portfolio website loaded successfully! 🚀');
}

function setupAdditionalFeatures() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.education__card, .research__card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Add click-to-copy functionality for contact info
    const contactElements = document.querySelectorAll('.hero__contact span');
    contactElements.forEach(el => {
        if (el.textContent.includes('@') || el.textContent.includes('-')) {
            el.style.cursor = 'pointer';
            el.title = 'Click to copy';
            
            el.addEventListener('click', async () => {
                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(el.textContent);
                        showCopyFeedback(el);
                    }
                } catch (err) {
                    console.log('Clipboard not available');
                }
            });
        }
    });

    // Add smooth scroll to sections within the same page
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').slice(1);
            if (portfolioApp) {
                portfolioApp.scrollToSection(targetId);
            }
        }
    });
}

function showCopyFeedback(element) {
    const originalText = element.textContent;
    const originalColor = element.style.color;
    
    element.textContent = 'Copied!';
    element.style.color = 'var(--color-primary)';
    element.style.fontWeight = 'bold';
    
    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = originalColor;
        element.style.fontWeight = '';
    }, 2000);
}

// Utility functions for external use
window.portfolioUtils = {
    navigateToExperience: (index) => {
        if (portfolioApp && index >= 0 && index < portfolioApp.totalExperienceCards) {
            portfolioApp.currentExperienceIndex = index;
            portfolioApp.updateExperienceDisplay();
        }
    },
    navigateToPage: (pageId) => {
        if (portfolioApp) {
            portfolioApp.navigateToPage(pageId);
        }
    },
    getCurrentExperienceIndex: () => {
        return portfolioApp ? portfolioApp.currentExperienceIndex : 0;
    }
};