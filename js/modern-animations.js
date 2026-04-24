/**
 * Modern Animation Effects
 * 3D transforms, mask reveals, and advanced interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== 3D TILT EFFECT FOR CARDS =====
    const tiltCards = document.querySelectorAll('.expertise-card, .project-card, .contact-card');
    
    tiltCards.forEach(card => {
        card.classList.add('tilt-card');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // ===== MAGNETIC BUTTONS =====
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline');
    
    magneticBtns.forEach(btn => {
        btn.classList.add('magnetic-btn');
        
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
    
    // ===== SPLIT TEXT ANIMATION FOR HERO =====
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.innerHTML;
        heroName.innerHTML = '';
        
        // Wrap each line in a container
        const lines = text.split('<br>');
        lines.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('span');
            lineDiv.style.display = 'block';
            lineDiv.style.overflow = 'hidden';
            
            // Parse any HTML tags in the line
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = line.trim();
            
            Array.from(tempDiv.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Split text into characters
                    const chars = node.textContent.split('');
                    chars.forEach((char, charIndex) => {
                        const span = document.createElement('span');
                        span.className = 'char-reveal';
                        span.textContent = char === ' ' ? '\u00A0' : char;
                        span.style.display = 'inline-block';
                        span.style.transitionDelay = `${(lineIndex * 0.1) + (charIndex * 0.03)}s`;
                        lineDiv.appendChild(span);
                    });
                } else {
                    lineDiv.appendChild(node.cloneNode(true));
                }
            });
            
            heroName.appendChild(lineDiv);
        });
        
        // Trigger animation
        setTimeout(() => {
            heroName.querySelectorAll('.char-reveal').forEach(char => {
                char.classList.add('revealed');
            });
        }, 300);
    }
    
    // ===== MASK REVEAL FOR SECTION HEADERS =====
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.classList.add('mask-reveal');
    });
    
    // ===== MODERN REVEAL ANIMATIONS - DISABLED =====
    // Content visible immediately, no scroll animations
    const modernRevealElements = document.querySelectorAll(
        '.goal-card, .project-card, .skill-item, .highlight-item'
    );
    
    modernRevealElements.forEach(el => {
        el.classList.add('revealed');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    
    // ===== NEON GLOW FOR FEATURED PROJECT =====
    const featuredProject = document.querySelector('.project-card.featured');
    if (featuredProject) {
        featuredProject.classList.add('neon-glow');
    }
    
    // ===== RIPPLE EFFECT FOR CONTACT CARDS =====
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.classList.add('ripple');
    });
    
    // ===== FLOATING ANIMATION FOR ICONS =====
    const icons = document.querySelectorAll('.goal-icon i, .expertise-icon i');
    icons.forEach((icon, index) => {
        icon.parentElement.classList.add('float-rotate');
        icon.parentElement.style.animationDelay = `${index * 0.5}s`;
    });
    
    // ===== GRADIENT TEXT FOR ACCENT =====
    const accentTexts = document.querySelectorAll('.accent, .highlight');
    accentTexts.forEach(text => {
        text.classList.add('gradient-text-animated');
    });
    
    // ===== MODERN CARD HOVER =====
    const modernCards = document.querySelectorAll('.goal-content, .education-card');
    modernCards.forEach(card => {
        card.classList.add('modern-card');
    });
    
    // ===== BORDER DRAW FOR BUTTONS =====
    const buttons = document.querySelectorAll('.btn-outline');
    buttons.forEach(btn => {
        btn.classList.add('border-draw');
    });
    
    // ===== SCAN LINE FOR EXPERIENCE SECTION =====
    const experienceCard = document.querySelector('.experience-main-card');
    if (experienceCard) {
        experienceCard.classList.add('scan-line');
    }
    
    // ===== MASK REVEAL OBSERVER - DISABLED =====
    // Show all mask elements immediately
    const maskElements = document.querySelectorAll('.mask-reveal, .clip-reveal');
    
    maskElements.forEach(el => {
        el.classList.add('revealed');
        el.style.opacity = '1';
    });
    
    // ===== PARTICLE TRAIL FOR NAV LINKS =====
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.add('particle-trail');
    });
    
    // ===== SMOOTH SCROLL WITH CUSTOM EASING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const startPosition = window.pageYOffset;
                const targetPosition = target.offsetTop - 80;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let startTime = null;
                
                function easeOutQuint(t) {
                    return 1 - Math.pow(1 - t, 5);
                }
                
                function animation(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    window.scrollTo(0, startPosition + distance * easeOutQuint(progress));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
                
                // Close mobile menu
                const navList = document.querySelector('.nav-list');
                const navToggle = document.querySelector('.nav-toggle');
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
});
