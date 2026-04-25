/**
 * Portfolio Website - Main JavaScript
 * Features: Dark Mode, Mobile Menu, Smooth Scroll, Form Validation, Scroll Animations
 * Author: Nguyễn Hoài Gia Bảo
 */

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initFormValidation();
    initProjectModals();
    initNavbarScroll();
});

// ========================================
// 1. Dark Mode Toggle
// ========================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

// ========================================
// 2. Mobile Menu
// ========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on window resize (if desktop)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ========================================
// 3. Smooth Scroll
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// 4. Scroll Animations (Intersection Observer)
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .experience-card, .project-card, .skill-category, .education-card, .info-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ========================================
// 5. Back to Top Button
// ========================================
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// 6. Form Validation
// ========================================
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset previous errors
        clearErrors();
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Vui lòng nhập họ tên');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError(name, 'Họ tên phải có ít nhất 2 ký tự');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Vui lòng nhập email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Vui lòng nhập email hợp lệ');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Vui lòng nhập nội dung tin nhắn');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Tin nhắn phải có ít nhất 10 ký tự');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            
            // Submit form (uncomment when using Formspree)
            // form.submit();
            
            // For demo: reset form after delay
            setTimeout(() => {
                form.reset();
            }, 2000);
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #EF4444; font-size: 0.85rem; margin-top: 0.25rem;';
        
        formGroup.appendChild(errorDiv);
        input.style.borderColor = '#EF4444';
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
            el.style.borderColor = '';
        });
    }
    
    function showSuccessMessage() {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Đã gửi thành công!';
        submitBtn.style.background = '#10B981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    }
}

// ========================================
// 7. Project Modals
// ========================================
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    const modalBody = modal.querySelector('.modal-body');
    const viewButtons = document.querySelectorAll('.btn-view');
    
    // Project data
    const projectData = {
        hrm: {
            title: 'HRM System - Quản lý Nhân sự',
            subtitle: 'Hệ thống quản lý nhân sự toàn diện',
            description: `
                <p>Tham gia xây dựng hệ thống quản lý thông tin nhân viên, chấm công, tính lương và đánh giá hiệu suất tại Sea Dragon Technology.</p>
                <h4>Trách nhiệm chính:</h4>
                <ul>
                    <li>Thu thập yêu cầu từ bộ phận HR thông qua interview và workshop</li>
                    <li>Viết user stories và acceptance criteria cho các tính năng</li>
                    <li>Thiết kế quy trình chấm công, tính lương và đánh giá KPI</li>
                    <li>Phối hợp với dev team để triển khai giải pháp</li>
                    <li>Testing và đảm bảo chất lượng sản phẩm</li>
                </ul>
                <h4>Kết quả:</h4>
                <p>Giảm 30% thời gian xử lý bảng lương và cải thiện quy trình đánh giá hiệu suất.</p>
            `,
            tech: ['Jira', 'Figma', 'SQL', 'Agile', 'User Stories'],
            role: 'Business Analyst'
        },
        pmt: {
            title: 'Project Management Tool',
            subtitle: 'Công cụ quản lý dự án nội bộ',
            description: `
                <p>Xây dựng công cụ quản lý dự án giúp theo dõi công việc, timeline và báo cáo tiến độ cho các dự án phát triển sản phẩm.</p>
                <h4>Trách nhiệm chính:</h4>
                <ul>
                    <li>Làm cầu nối giữa stakeholders và development team</li>
                    <li>Xây dựng product backlog và sắp xếp ưu tiên tính năng</li>
                    <li>Định nghĩa MVP và lộ trình phát triển sản phẩm</li>
                    <li>Dẫn dắt team 4 người trong quá trình phát triển</li>
                    <li>Tổ chức daily standup và sprint planning</li>
                </ul>
                <h4>Kết quả:</h4>
                <p>Tăng 40% hiệu quả theo dõi tiến độ dự án và cải thiện giao tiếp trong team.</p>
            `,
            tech: ['Jira', 'Scrum', 'User Stories', 'MVP', 'Product Backlog'],
            role: 'Team Leader & BA'
        },
        marketing: {
            title: 'Marketing Data & Reporting System',
            subtitle: 'Hệ thống báo cáo Marketing',
            description: `
                <p>Phát triển hệ thống nhập liệu và dashboard báo cáo cho bộ phận Marketing, hỗ trợ theo dõi hiệu quả các chiến dịch.</p>
                <h4>Trách nhiệm chính:</h4>
                <ul>
                    <li>Thu thập yêu cầu từ team Marketing</li>
                    <li>Thiết kế cấu trúc database và các báo cáo cần thiết</li>
                    <li>Tạo mockup và wireframe cho dashboard</li>
                    <li>Hỗ trợ dev team trong việc hiểu yêu cầu nghiệp vụ</li>
                    <li>Training người dùng sử dụng hệ thống</li>
                </ul>
                <h4>Kết quả:</h4>
                <p>Giảm 50% thời gian tạo báo cáo và cải thiện khả năng ra quyết định dựa trên dữ liệu.</p>
            `,
            tech: ['SQL', 'Data Analysis', 'Dashboard', 'Excel', 'Figma'],
            role: 'Business Analyst'
        }
    };
    
    // Open modal
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-subtitle">${project.subtitle}</p>
                    <div class="modal-role">
                        <span class="role-label">Vai trò:</span>
                        <span class="role-value">${project.role}</span>
                    </div>
                    <div class="modal-description">${project.description}</div>
                    <div class="modal-tech">
                        <h4>Công nghệ & Tools:</h4>
                        <div class="tech-list">
                            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========================================
// 8. Navbar Scroll Effect
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.getElementById('navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// ========================================
// 9. Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for modal content (dynamically)
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-title {
        font-size: 1.5rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .modal-subtitle {
        color: var(--primary);
        font-weight: 500;
        margin-bottom: 1rem;
    }
    
    .modal-role {
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .modal-description h4 {
        color: var(--text-primary);
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
    }
    
    .modal-description ul {
        list-style: none;
        padding-left: 0;
    }
    
    .modal-description li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-secondary);
    }
    
    .modal-description li::before {
        content: '•';
        color: var(--primary);
        position: absolute;
        left: 0;
        font-weight: bold;
    }
    
    .modal-description p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1rem;
    }
    
    .modal-tech h4 {
        color: var(--text-primary);
        margin-bottom: 0.75rem;
    }
    
    .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
`;
document.head.appendChild(modalStyles);

// Console greeting
console.log('%c👨‍💼 Nguyễn Hoài Gia Bảo', 'font-size: 24px; font-weight: bold; color: #3B82F6;');
console.log('%cAspiring Product Owner | IT Business Analyst', 'font-size: 14px; color: #64748B;');
console.log('%cPortfolio Website Loaded Successfully! 🚀', 'font-size: 12px; color: #10B981;');
