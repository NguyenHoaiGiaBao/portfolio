/**
 * Smooth Scroll & Reveal Animations
 * Hiệu ứng mượt mà khi chuyển section và scroll
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll(
        '.section-header, .goal-card, .project-card, .skill-item, .expertise-card, .highlight-item, .contact-card, .education-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Stagger effect for cards in same container
                const parent = entry.target.parentElement;
                if (parent && parent.children.length > 1) {
                    const siblings = Array.from(parent.querySelectorAll('.reveal-hidden, .revealed'));
                    const index = siblings.indexOf(entry.target);
                    if (index > 0) {
                        entry.target.style.transitionDelay = `${index * 200}ms`;
                    }
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
                
                // Close mobile menu if open
                const navList = document.querySelector('.nav-list');
                const navToggle = document.querySelector('.nav-toggle');
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // ===== COUNTER ANIMATION - Simple =====
    const counters = document.querySelectorAll('.stat-value');
    let animatedCounters = new Set();
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedCounters.has(entry.target)) {
                animatedCounters.add(entry.target);
                const counter = entry.target;
                const text = counter.textContent;
                const num = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[\d]/g, '');
                
                // Simple animation with fewer frames
                let current = 0;
                const step = Math.ceil(num / 20);
                
                const interval = setInterval(() => {
                    current += step;
                    if (current >= num) {
                        current = num;
                        clearInterval(interval);
                    }
                    counter.textContent = current + suffix;
                }, 50);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== SCROLL PROGRESS BAR - Throttled =====
    const scrollProgress = document.getElementById('scrollProgress');
    let ticking = false;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking && scrollProgress) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }, { passive: true });

    // ===== SECTION INDICATORS =====
    const sectionDots = document.querySelectorAll('.section-dot');
    
    sectionDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== SECTION ACTIVE INDICATOR & TRANSITIONS =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = null;
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            
            if (entry.isIntersecting) {
                // Add in-view class for animations
                section.classList.add('in-view');
                section.classList.remove('incoming');
                
                // Update nav active state
                const id = section.getAttribute('id');
                currentSection = id;
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                
                // Update section dots
                sectionDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('data-section') === id) {
                        dot.classList.add('active');
                    }
                });
                
                // Trigger reveal for children
                const revealElements = section.querySelectorAll('.reveal-hidden');
                revealElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, index * 100);
                });
            } else {
                section.classList.remove('in-view');
                
                // Check if section is above or below viewport
                const rect = section.getBoundingClientRect();
                if (rect.top > 0) {
                    section.classList.add('incoming');
                }
            }
        });
    }, { 
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-10% 0px -10% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));
    
});

// ===== PROGRESS BAR ANIMATION =====
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-fill');
            fills.forEach((fill, index) => {
                setTimeout(() => {
                    const width = fill.dataset.width;
                    fill.style.width = width + '%';
                }, index * 100);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-bars').forEach(el => {
    progressObserver.observe(el);
});
