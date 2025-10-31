// Global variables
let currentTheme = 'light';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    setupGlobalEventListeners();
});

// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        localStorage.setItem('NINADTheme', 'light');
        currentTheme = 'light';
    } else {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        localStorage.setItem('NINADTheme', 'dark');
        currentTheme = 'dark';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('NINADTheme');
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        currentTheme = 'dark';
    } else {
        body.removeAttribute('data-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        currentTheme = 'light';
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Global Event Listeners
function setupGlobalEventListeners() {
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Escape key to close modals
        if (event.key === 'Escape') {
            closeAllModals();
        }
        
        // Ctrl/Cmd + K to focus search (if search input exists)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Modal Management
function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Utility Functions
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
}

// Local Storage Management
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Animation and Visual Effects
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    const cards = document.querySelectorAll('.event-card, .category-card, .highlight-card, .about-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addScrollAnimations, 100);
});

// Form Validation Utilities
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = 'var(--error-color)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '0.9rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const fields = document.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        field.style.borderColor = 'var(--border-color)';
    });
}

// Network Status Detection
function checkNetworkStatus() {
    return navigator.onLine;
}

// Add network status listeners
window.addEventListener('online', function() {
    console.log('Network connection restored');
    // You can add UI feedback here
});

window.addEventListener('offline', function() {
    console.log('Network connection lost');
    // You can add UI feedback here
});

// Performance Optimization
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error Handling
function handleError(error, context = 'Application') {
    console.error(`${context} Error:`, error);
    
    // You can add user-friendly error notifications here
    const errorMessage = error.message || 'An unexpected error occurred';
    
    // Show error notification (you can customize this)
    if (typeof showNotification === 'function') {
        showNotification(errorMessage, 'error');
    }
}

// Notification System (optional)
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = 'var(--success-color)';
            break;
        case 'error':
            notification.style.backgroundColor = 'var(--error-color)';
            break;
        case 'warning':
            notification.style.backgroundColor = 'var(--warning-color)';
            break;
        default:
            notification.style.backgroundColor = 'var(--primary-color)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Export functions for use in other scripts
window.NINADUtils = {
    toggleTheme,
    loadTheme,
    toggleMobileMenu,
    closeAllModals,
    generateUUID,
    formatDate,
    formatTime,
    saveToLocalStorage,
    getFromLocalStorage,
    validateEmail,
    validatePhone,
    showFormError,
    clearFormErrors,
    checkNetworkStatus,
    debounce,
    throttle,
    handleError,
    showNotification
};