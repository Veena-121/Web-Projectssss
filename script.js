// DOM Elements
const signinForm = document.getElementById('signinForm');
const expandBtn = document.querySelector('.expand-btn');
const heroContent = document.querySelector('.hero-content');
const solarObjects = document.querySelectorAll('.solar-object');

// Form Validation and Submission
signinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Simulate login process
    const submitBtn = document.querySelector('.signin-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Sign in successful! Welcome to SOLARSHARE', 'success');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        signinForm.reset();
    }, 2000);
});

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(10px);
            animation: slideIn 0.3s ease-out;
        }
        
        .notification.success {
            background: linear-gradient(135deg, rgba(72, 187, 120, 0.9), rgba(56, 178, 172, 0.9));
            color: white;
        }
        
        .notification.error {
            background: linear-gradient(135deg, rgba(245, 101, 101, 0.9), rgba(229, 62, 62, 0.9));
            color: white;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }
        
        .notification-message {
            font-weight: 500;
            font-size: 14px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Solar Objects Interaction
function initializeSolarObjects() {
    solarObjects.forEach((object, index) => {
        // Add click interactions
        object.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = this.style.animation || '';
            
            // Add a bounce effect
            this.style.transform += ' scale(1.3)';
            setTimeout(() => {
                this.style.transform = this.style.transform.replace(' scale(1.3)', '');
            }, 200);
            
            // Show object-specific messages
            const objectMessages = {
                'sun-object': 'The sun provides endless clean energy! ☀️',
                'panel-object-1': 'Solar panels convert sunlight to electricity! ⚡',
                'panel-object-2': 'Efficient solar technology powers homes! 🏠',
                'leaf-object': 'Going green saves our planet! 🌱',
                'battery-object': 'Energy storage for sustainable future! 🔋',
                'bolt-object': 'Clean electricity for everyone! ⚡',
                'recycle-object': 'Recycling creates a circular economy! ♻️',
                'house-object': 'Solar-powered smart homes! 🏡',
                'earth-object': 'Protecting our beautiful Earth! 🌍',
                'car-object': 'Electric vehicles for clean transport! 🚗'
            };
            
            const className = this.className.split(' ').find(cls => cls.endsWith('-object'));
            const message = objectMessages[className] || 'Solar energy is amazing!';
            showNotification(message, 'success');
        });
        
        // Add hover effects
        object.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2) saturate(1.3)';
        });
        
        object.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}

// Expand/resize functionality
let isExpanded = false;

expandBtn.addEventListener('click', function() {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
        heroContent.style.transform = 'scale(1.2)';
        heroContent.style.zIndex = '1000';
        heroContent.style.position = 'fixed';
        heroContent.style.top = '50%';
        heroContent.style.left = '50%';
        heroContent.style.transform = 'translate(-50%, -50%) scale(1.2)';
        heroContent.style.maxWidth = '90vw';
        heroContent.style.maxHeight = '90vh';
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'hero-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 999;
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(overlay);
        
        // Close on overlay click
        overlay.addEventListener('click', () => {
            expandBtn.click();
        });
        
        expandBtn.innerHTML = '<i class="fas fa-compress-arrows-alt"></i>';
    } else {
        heroContent.style.transform = '';
        heroContent.style.zIndex = '';
        heroContent.style.position = '';
        heroContent.style.top = '';
        heroContent.style.left = '';
        heroContent.style.maxWidth = '';
        heroContent.style.maxHeight = '';
        
        const overlay = document.querySelector('.hero-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        expandBtn.innerHTML = '<i class="fas fa-expand-arrows-alt"></i>';
    }
});

// Enhanced solar object animations
function enhanceSolarObjectAnimations() {
    solarObjects.forEach((object, index) => {
        // Add random subtle movements to make them more lively
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 5;
            const randomY = (Math.random() - 0.5) * 5;
            const currentTransform = object.style.transform;
            
            // Only add to existing transform if it doesn't already have translate
            if (!currentTransform.includes('translate(')) {
                object.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            }
        }, 4000 + index * 800);
        
        // Add periodic glow effects
        setInterval(() => {
            object.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            setTimeout(() => {
                object.style.boxShadow = '';
            }, 1000);
        }, 8000 + index * 2000);
    });
}

// Form input enhancements
function enhanceFormInputs() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
}

// Google sign-in simulation
document.querySelector('.google-btn').addEventListener('click', function() {
    showNotification('Google Sign-In would be implemented here', 'success');
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSolarObjects();
    enhanceSolarObjectAnimations();
    enhanceFormInputs();
    
    // Add additional CSS for enhanced interactions
    const additionalStyles = `
        .form-group.focused input {
            border-color: #FFA500 !important;
            box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.1) !important;
        }
        
        .form-group.filled label {
            color: #FFA500;
        }
        
        .hero-content {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .solar-object {
            transition: transform 0.3s ease-out, filter 0.3s ease-out;
        }
        
        .solar-object:hover {
            animation-play-state: paused;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
});

// Handle escape key for expanded view
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isExpanded) {
        expandBtn.click();
    }
});