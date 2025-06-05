// =============================================
// SMART CAFE - ENHANCED JAVASCRIPT
// =============================================

// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.querySelector('.contact-form-element');

// Enhanced Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(44, 62, 80, 0.15)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Hide/Show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Enhanced Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    
    mobileMenuBtn.innerHTML = isActive 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
        
    // Add animation class
    mobileMenuBtn.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0deg)';
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
});

// Enhanced Smooth Scrolling
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
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.transform = 'rotate(0deg)';
            document.body.style.overflow = 'auto';
        }
    });
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add specific animations based on element type
            if (entry.target.classList.contains('benefit-card')) {
                entry.target.style.animationDelay = '0.2s';
            }
            if (entry.target.classList.contains('testimonial')) {
                entry.target.style.animationDelay = '0.3s';
            }
        }
    });
}, observerOptions);

// Enhanced Animation System
window.addEventListener('load', () => {
    // Add animate-on-scroll class to various elements
    const elementsToAnimate = [
        '.benefit-card',
        '.problem-card',
        '.solution-card',
        '.feature-item',
        '.testimonial',
        '.app-stat',
        '.stat'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
});

// Enhanced Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .benefit-percentage, .success-stat .stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;
        
        const updateCounter = () => {
            const current = parseInt(counter.textContent.replace(/[^0-9]/g, '')) || 0;
            const increment = target / 50;
            
            if (current < target) {
                const newValue = Math.ceil(current + increment);
                const originalText = counter.textContent;
                counter.textContent = originalText.replace(/\d+/, Math.min(newValue, target));
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(updateCounter, 200);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

// Enhanced ROI Calculator
function initROICalculator() {
    const currentSalesInput = document.getElementById('current-sales');
    const dailyCustomersInput = document.getElementById('daily-customers');
    const projectedRevenueEl = document.getElementById('projected-revenue');
    const monthlySavingsEl = document.getElementById('monthly-savings');
    const netIncreaseEl = document.getElementById('net-increase');

    function updateCalculations() {
        const currentSales = parseInt(currentSalesInput?.value) || 10000;
        const dailyCustomers = parseInt(dailyCustomersInput?.value) || 80;
        
        // Enhanced calculations with realistic growth factors
        const growthFactor = Math.min(1.6, 1.3 + (dailyCustomers / 1000));
        const projectedRevenue = Math.round(currentSales * growthFactor);
        
        // Dynamic savings calculation based on business size
        const savingsRate = Math.min(0.35, 0.25 + (currentSales / 100000));
        const monthlySavings = Math.round(currentSales * savingsRate);
        
        const netIncrease = projectedRevenue - currentSales + monthlySavings;
        
        // Animate the number changes
        animateNumberChange(projectedRevenueEl, projectedRevenue, '$');
        animateNumberChange(monthlySavingsEl, monthlySavings, '$');
        animateNumberChange(netIncreaseEl, netIncrease, '+$');
    }

    function animateNumberChange(element, targetValue, prefix = '') {
        if (!element) return;
        
        const currentValue = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
        const increment = (targetValue - currentValue) / 20;
        let current = currentValue;
        
        const animate = () => {
            current += increment;
            if ((increment > 0 && current < targetValue) || (increment < 0 && current > targetValue)) {
                element.textContent = `${prefix}${Math.round(current).toLocaleString()}`;
                requestAnimationFrame(animate);
            } else {
                element.textContent = `${prefix}${targetValue.toLocaleString()}`;
            }
        };
        
        animate();
    }

    // Add event listeners with debouncing
    let timeout;
    function debouncedUpdate() {
        clearTimeout(timeout);
        timeout = setTimeout(updateCalculations, 300);
    }

    if (currentSalesInput && dailyCustomersInput) {
        currentSalesInput.addEventListener('input', debouncedUpdate);
        dailyCustomersInput.addEventListener('input', debouncedUpdate);
        updateCalculations(); // Initial calculation
    }
}

// Enhanced Comparison Bars Animation
function animateComparisonBars() {
    const bars = document.querySelectorAll('.bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => {
        observer.observe(bar);
    });
}

// Enhanced Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
            contactForm.reset();
            
            // Track form submission (Google Analytics, etc.)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: 'Contact Form'
                });
            }
            
        } catch (error) {
            showNotification('حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Form Validation
function validateForm(data) {
    const required = ['name', 'phone', 'email'];
    const missing = required.filter(field => !data[field] || data[field].trim() === '');
    
    if (missing.length > 0) {
        showNotification('يرجى ملء جميع الحقول المطلوبة.', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح.', 'error');
        return false;
    }
    
    // Phone validation (Iraqi format)
    const phoneRegex = /^(\+964|0)7[0-9]{9}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showNotification('يرجى إدخال رقم هاتف عراقي صحيح.', 'error');
        return false;
    }
    
    return true;
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Enhanced notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        font-family: 'Cairo', sans-serif;
        border-left: 4px solid rgba(255, 255, 255, 0.3);
    `;
    
    // Notification content styles
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;
    
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

// Enhanced Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Hero parallax
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
    
    // Background patterns
    const patterns = document.querySelectorAll('.hero-section::before, .before-after::before');
    patterns.forEach(pattern => {
        if (pattern) {
            pattern.style.transform = `translateY(${rate * 0.5}px)`;
        }
    });
});

// Enhanced 3D Card Effects
function init3DCardEffects() {
    const cards = document.querySelectorAll('.benefit-card, .testimonial, .problem-card, .solution-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transformStyle = 'preserve-3d';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
                scale(1.02)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
        });
    });
}

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2c3e50);
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Enhanced WhatsApp Button
function enhanceWhatsAppButton() {
    const whatsappFloat = document.querySelector('.whatsapp-float a');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('mouseenter', () => {
            whatsappFloat.style.transform = 'scale(1.15) rotate(15deg)';
            whatsappFloat.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.6)';
        });
        
        whatsappFloat.addEventListener('mouseleave', () => {
            whatsappFloat.style.transform = 'scale(1) rotate(0deg)';
            whatsappFloat.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
        });
        
        // Add click tracking
        whatsappFloat.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'WhatsApp',
                    event_label: 'Float Button'
                });
            }
        });
    }
}

// Performance Optimizations
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

// Lazy Loading for Images
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.transform = 'rotate(0deg)';
        document.body.style.overflow = 'auto';
        
        // Close any open notifications
        document.querySelectorAll('.notification').forEach(n => hideNotification(n));
    }
});

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    animateCounters();
    initROICalculator();
    animateComparisonBars();
    init3DCardEffects();
    createScrollProgress();
    enhanceWhatsAppButton();
    initLazyLoading();
    
    // Add enhanced CSS for animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .scroll-progress {
            background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-visual {
            transition: transform 0.1s ease-out;
        }
        
        .nav-menu.active {
            animation: slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .mobile-menu-btn {
            transition: transform 0.3s ease;
        }
        
        .navbar {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(enhancedStyles);
    
    console.log('🚀 Smart Cafe Website Enhanced - All Systems Ready!');
    console.log('💎 جاهز لتحويل مقهاك إلى إمبراطورية رقمية متطورة!');
}); 