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

// AI Section Enhanced Animations
function initAIAnimations() {
    // Enhanced Brain Animation
    const brain = document.querySelector('.ai-brain');
    const brainWaves = document.querySelector('.brain-waves');
    
    if (brain) {
        // Add pulse effect on hover
        brain.addEventListener('mouseenter', () => {
            brain.style.transform = 'scale(1.1)';
            brain.style.boxShadow = '0 20px 40px rgba(96, 165, 250, 0.5)';
        });
        
        brain.addEventListener('mouseleave', () => {
            brain.style.transform = 'scale(1)';
            brain.style.boxShadow = '0 10px 25px rgba(96, 165, 250, 0.3)';
        });
    }
    
    // Animate AI Features on Scroll
    const aiFeatures = document.querySelectorAll('.ai-feature-large');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    aiFeatures.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(50px)';
        feature.style.transition = 'all 0.6s ease';
        observer.observe(feature);
    });
    
    // Animate workflow items
    const workflowItems = document.querySelectorAll('.workflow-item');
    workflowItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                    }
                });
            });
            itemObserver.observe(item);
        }, 100);
    });
    
    // Add typing effect to AI section headers
    const aiHeaders = document.querySelectorAll('.ai-section h3, .ai-section h4');
    const typeWriter = (element, text, speed = 50) => {
        element.innerHTML = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };
    
    // Add hover effects to benefits
    const benefitCards = document.querySelectorAll('.benefit-detailed');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add particle effect to AI section
    createAIParticles();
}

// Create floating particles for AI section
function createAIParticles() {
    const aiSection = document.querySelector('.ai-section');
    if (!aiSection) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'ai-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    aiSection.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'ai-particle';
    
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #60a5fa, #34d399);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatParticle ${duration}s linear infinite ${delay}s;
        opacity: 0.6;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (duration + delay) * 1000);
}

// Add CSS animations for particles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Enhanced comparison table animation
function animateComparisonTable() {
    const comparisonRows = document.querySelectorAll('.comparison-row:not(.header)');
    
    comparisonRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-30px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        
                        // Add glow effect to AI cells
                        const aiCell = entry.target.querySelector('.comparison-cell.ai');
                        if (aiCell) {
                            setTimeout(() => {
                                aiCell.style.boxShadow = '0 0 20px rgba(52, 211, 153, 0.5)';
                                setTimeout(() => {
                                    aiCell.style.boxShadow = 'none';
                                }, 1000);
                            }, 300);
                        }
                    }, index * 150);
                }
            });
        });
        
        observer.observe(row);
    });
}

// Add AI section to scroll animations
function enhanceScrollAnimations() {
    const aiSection = document.querySelector('.ai-section');
    if (!aiSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const aiSectionTop = aiSection.offsetTop;
        const aiSectionHeight = aiSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled > aiSectionTop - windowHeight && scrolled < aiSectionTop + aiSectionHeight) {
            // Parallax effect for AI section background
            aiSection.style.backgroundPosition = `center ${rate}px`;
        }
    });
}

// Enhanced Animations for New Sections
function initEnhancedSectionAnimations() {
    // Inventory Section Animations
    const inventoryFeatures = document.querySelectorAll('.inventory-feature');
    inventoryFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateX(-50px)';
        feature.style.transition = 'all 0.8s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 300);
                }
            });
        });
        observer.observe(feature);
    });
    
    // Inventory Dashboard Animation
    const inventoryDashboard = document.querySelector('.inventory-dashboard');
    if (inventoryDashboard) {
        inventoryDashboard.addEventListener('mouseenter', () => {
            inventoryDashboard.style.transform = 'scale(1.1) rotate(5deg)';
            inventoryDashboard.style.boxShadow = '0 30px 80px rgba(168, 85, 247, 0.5)';
        });
        
        inventoryDashboard.addEventListener('mouseleave', () => {
            inventoryDashboard.style.transform = 'scale(1) rotate(0deg)';
            inventoryDashboard.style.boxShadow = '0 20px 60px rgba(168, 85, 247, 0.3)';
        });
    }
    
    // ROI Section Loss/Return Items Animation
    const lossItems = document.querySelectorAll('.loss-item');
    const returnItems = document.querySelectorAll('.return-item');
    
    [...lossItems, ...returnItems].forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Add shake effect for loss items
                        if (entry.target.classList.contains('loss-item')) {
                            setTimeout(() => {
                                entry.target.style.animation = 'shake 0.5s ease-in-out';
                            }, 200);
                        }
                        // Add bounce effect for return items
                        else if (entry.target.classList.contains('return-item')) {
                            setTimeout(() => {
                                entry.target.style.animation = 'bounce 0.6s ease-in-out';
                            }, 200);
                        }
                    }, index * 100);
                }
            });
        });
        observer.observe(item);
    });
    
    // Pricing Category Animations
    const pricingCategories = document.querySelectorAll('.pricing-category');
    pricingCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(50px)';
        category.style.transition = 'all 0.8s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 400);
                }
            });
        });
        observer.observe(category);
    });
    
    // Payment Methods Animation
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'scale(0.8)';
        method.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 200);
                }
            });
        });
        observer.observe(method);
        
        // Add hover effects
        method.addEventListener('mouseenter', () => {
            method.style.transform = 'scale(1.05) translateY(-10px)';
            method.style.boxShadow = '0 30px 60px rgba(168, 85, 247, 0.4)';
        });
        
        method.addEventListener('mouseleave', () => {
            method.style.transform = 'scale(1) translateY(0)';
            method.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Guarantee Cards Animation
    const guaranteeCards = document.querySelectorAll('.guarantee-card');
    guaranteeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'rotateY(90deg)';
        card.style.transition = 'all 0.8s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'rotateY(0deg)';
                    }, index * 300);
                }
            });
        });
        observer.observe(card);
    });
    
    // Contact Section Animations
    const visionPoints = document.querySelectorAll('.vision-point');
    visionPoints.forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transform = 'translateX(50px)';
        point.style.transition = 'all 0.6s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 150);
                }
            });
        });
        observer.observe(point);
    });
}

// Savings Counter Animation
function animateSavingsCounters() {
    const savingAmounts = document.querySelectorAll('.saving-item .amount, .total-savings strong');
    
    savingAmounts.forEach(amount => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const numbers = text.match(/[\d,]+/g);
                    
                    if (numbers) {
                        const targetValue = parseInt(numbers[0].replace(/,/g, ''));
                        animateNumberChange(entry.target, targetValue, text.replace(/[\d,]+/g, ''));
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(amount);
    });
}

// ROI Numbers Animation
function animateROINumbers() {
    const roiNumbers = document.querySelectorAll('.amount.profit, .amount.loss, .percentage, .final-result strong');
    
    roiNumbers.forEach(number => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const numbers = text.match(/[\d,]+/g);
                    
                    if (numbers) {
                        const targetValue = parseInt(numbers[0].replace(/,/g, ''));
                        const prefix = text.split(numbers[0])[0];
                        const suffix = text.split(numbers[0])[1];
                        
                        animateCountUp(entry.target, targetValue, prefix, suffix);
                    }
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(number);
    });
}

// Count Up Animation Function
function animateCountUp(element, targetValue, prefix = '', suffix = '') {
    let currentValue = 0;
    const increment = targetValue / 60; // 1 second animation at 60fps
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        const displayValue = Math.floor(currentValue).toLocaleString();
        element.textContent = `${prefix}${displayValue}${suffix}`;
    }, 1000 / 60);
}

// Pricing Offer Pulse Effect
function initPricingOfferEffects() {
    const pricingOffer = document.querySelector('.pricing-offer');
    if (pricingOffer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'offerPulse 2s ease-in-out infinite';
                }
            });
        });
        observer.observe(pricingOffer);
    }
}

// Form Enhancement
function enhanceContactForm() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.style.transform = 'scale(1.02)';
            input.style.boxShadow = '0 0 30px rgba(96, 165, 250, 0.4)';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale(1)';
            input.style.boxShadow = '0 0 20px rgba(96, 165, 250, 0.3)';
        });
        
        // Add typing effect
        input.addEventListener('input', () => {
            input.style.borderColor = '#60a5fa';
            setTimeout(() => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 300);
        });
    });
}

// Advanced Hover Effects
function initAdvancedHoverEffects() {
    // Inventory feature details animation
    const featureDetails = document.querySelectorAll('.feature-details');
    featureDetails.forEach(detail => {
        const items = detail.querySelectorAll('.detail-item');
        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(20px) scale(1.05)';
                item.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0) scale(1)';
                item.style.background = 'transparent';
            });
        });
    });
    
    // Price items hover effect
    const priceItems = document.querySelectorAll('.price-item');
    priceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const price = item.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1.2)';
                price.style.color = '#fbbf24';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const price = item.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.color = '#fbbf24';
            }
        });
    });
}

// Particle Effects for Sections
function createSectionParticles(sectionClass, particleColor) {
    const section = document.querySelector(sectionClass);
    if (!section) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'section-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    section.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 15; i++) {
        createFloatingParticle(particleContainer, particleColor);
    }
}

function createFloatingParticle(container, color) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: floatUpDown ${duration}s linear infinite ${delay}s;
        opacity: 0.6;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createFloatingParticle(container, color);
        }
    }, (duration + delay) * 1000);
}

// Initialize all new animations
document.addEventListener('DOMContentLoaded', function() {
    // Add to existing initialization
    initEnhancedSectionAnimations();
    animateSavingsCounters();
    animateROINumbers();
    initPricingOfferEffects();
    enhanceContactForm();
    initAdvancedHoverEffects();
    
    // Create particle effects for different sections
    createSectionParticles('.inventory-section', 'linear-gradient(45deg, #a855f7, #6366f1)');
    createSectionParticles('.roi-section', 'linear-gradient(45deg, #0ea5e9, #0284c7)');
    createSectionParticles('.pricing-section', 'linear-gradient(45deg, #a855f7, #8b5cf6)');
    createSectionParticles('.guarantees-section', 'linear-gradient(45deg, #10b981, #059669)');
    createSectionParticles('.contact-section', 'linear-gradient(45deg, #60a5fa, #3b82f6)');
    
    // Add enhanced CSS animations
    const enhancedAnimationStyles = document.createElement('style');
    enhancedAnimationStyles.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes floatUpDown {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes offerGlow {
            0%, 100% { 
                box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 50px rgba(251, 191, 36, 0.6);
                transform: scale(1.02);
            }
        }
        
        .inventory-feature::before,
        .pricing-category::before,
        .guarantee-card::before {
            transition: left 0.6s ease;
        }
        
        .payment-method {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .vision-point {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .detail-item {
            transition: all 0.3s ease;
        }
        
        .price-item .price {
            transition: all 0.3s ease;
        }
        
        .contact-form input,
        .contact-form textarea {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(enhancedAnimationStyles);
    
    console.log('🎨 Enhanced Section Animations Loaded!');
    console.log('✨ All interactive effects are now active!');
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
    
    // Initialize AI animations
    initAIAnimations();
    animateComparisonTable();
    enhanceScrollAnimations();
    
    // Add smooth scrolling to AI section
    const aiNavLink = document.querySelector('a[href="#ai"]');
    if (aiNavLink) {
        aiNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            const aiSection = document.querySelector('#ai');
            if (aiSection) {
                aiSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}); 