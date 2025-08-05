// DOM Elements
const signinForm = document.getElementById('signinForm');
const heroImage = document.getElementById('heroImage');
const expandBtn = document.querySelector('.expand-btn');
const heroContent = document.querySelector('.hero-content');

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

// Image handling and resizing
function handleImageLoad() {
    // Create a placeholder if image doesn't load
    heroImage.onerror = function() {
        this.style.display = 'none';
        createImagePlaceholder();
    };
    
    // Set the image source to the solar energy illustration
    heroImage.src = createSolarEnergyIllustration();
}

// Create SVG illustration for solar energy
function createSolarEnergyIllustration() {
    const svgContent = `
        <svg width="100%" height="100%" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#98FB98;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="panelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2F4F4F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#708090;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Sky background -->
            <rect width="600" height="400" fill="url(#skyGradient)"/>
            
            <!-- Mountains -->
            <polygon points="0,350 150,250 300,300 450,200 600,280 600,400 0,400" fill="#228B22" opacity="0.8"/>
            <polygon points="100,380 250,280 400,320 550,240 600,300 600,400 100,400" fill="#32CD32" opacity="0.6"/>
            
            <!-- Sun -->
            <circle cx="480" cy="80" r="40" fill="url(#sunGradient)">
                <animate attributeName="r" values="35;45;35" dur="4s" repeatCount="indefinite"/>
            </circle>
            
            <!-- Sun rays -->
            <g stroke="#FFD700" stroke-width="3" stroke-linecap="round">
                <line x1="420" y1="80" x2="400" y2="80">
                    <animate attributeName="x1" values="420;410;420" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="540" y1="80" x2="560" y2="80">
                    <animate attributeName="x1" values="540;550;540" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="480" y1="20" x2="480" y2="0">
                    <animate attributeName="y1" values="20;10;20" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="480" y1="140" x2="480" y2="160">
                    <animate attributeName="y1" values="140;150;140" dur="2s" repeatCount="indefinite"/>
                </line>
            </g>
            
            <!-- Solar panels -->
            <g transform="translate(50, 250)">
                <!-- Panel 1 -->
                <rect x="0" y="0" width="120" height="80" fill="url(#panelGradient)" rx="5"/>
                <rect x="5" y="5" width="110" height="70" fill="#1e3a8a" opacity="0.8" rx="3"/>
                <g stroke="#60a5fa" stroke-width="1" opacity="0.6">
                    <line x1="30" y1="5" x2="30" y2="75"/>
                    <line x1="60" y1="5" x2="60" y2="75"/>
                    <line x1="90" y1="5" x2="90" y2="75"/>
                    <line x1="5" y1="25" x2="115" y2="25"/>
                    <line x1="5" y1="50" x2="115" y2="50"/>
                </g>
                
                <!-- Panel 2 -->
                <rect x="140" y="-20" width="120" height="80" fill="url(#panelGradient)" rx="5"/>
                <rect x="145" y="-15" width="110" height="70" fill="#1e3a8a" opacity="0.8" rx="3"/>
                <g stroke="#60a5fa" stroke-width="1" opacity="0.6">
                    <line x1="170" y1="-15" x2="170" y2="55"/>
                    <line x1="200" y1="-15" x2="200" y2="55"/>
                    <line x1="230" y1="-15" x2="230" y2="55"/>
                    <line x1="145" y1="5" x2="255" y2="5"/>
                    <line x1="145" y1="30" x2="255" y2="30"/>
                </g>
                
                <!-- Panel 3 -->
                <rect x="280" y="10" width="120" height="80" fill="url(#panelGradient)" rx="5"/>
                <rect x="285" y="15" width="110" height="70" fill="#1e3a8a" opacity="0.8" rx="3"/>
                <g stroke="#60a5fa" stroke-width="1" opacity="0.6">
                    <line x1="310" y1="15" x2="310" y2="85"/>
                    <line x1="340" y1="15" x2="340" y2="85"/>
                    <line x1="370" y1="15" x2="370" y2="85"/>
                    <line x1="285" y1="35" x2="395" y2="35"/>
                    <line x1="285" y1="60" x2="395" y2="60"/>
                </g>
            </g>
            
            <!-- Energy flow lines -->
            <g stroke="#FFD700" stroke-width="2" fill="none" opacity="0.8">
                <path d="M480,120 Q400,180 200,220">
                    <animate attributeName="stroke-dasharray" values="0,100;100,0;0,100" dur="3s" repeatCount="indefinite"/>
                </path>
                <path d="M480,120 Q350,160 300,200">
                    <animate attributeName="stroke-dasharray" values="0,80;80,0;0,80" dur="2.5s" repeatCount="indefinite"/>
                </path>
            </g>
            
            <!-- Person working on solar panels -->
            <g transform="translate(180, 200)">
                <!-- Body -->
                <ellipse cx="0" cy="20" rx="12" ry="20" fill="#4169E1"/>
                <!-- Head -->
                <circle cx="0" cy="-5" r="8" fill="#FFE4C4"/>
                <!-- Hard hat -->
                <ellipse cx="0" cy="-10" rx="10" ry="6" fill="#FFD700"/>
                <!-- Arms -->
                <ellipse cx="-15" cy="10" rx="6" ry="15" fill="#FFE4C4" transform="rotate(-30)"/>
                <ellipse cx="15" cy="10" rx="6" ry="15" fill="#FFE4C4" transform="rotate(30)"/>
                <!-- Tool -->
                <rect x="20" y="5" width="15" height="3" fill="#8B4513" transform="rotate(30)"/>
                <!-- Legs -->
                <ellipse cx="-6" cy="45" rx="5" ry="18" fill="#4169E1"/>
                <ellipse cx="6" cy="45" rx="5" ry="18" fill="#4169E1"/>
            </g>
            
            <!-- Clouds -->
            <g fill="white" opacity="0.7">
                <ellipse cx="100" cy="60" rx="25" ry="15">
                    <animateTransform attributeName="transform" type="translate" values="0,0;50,0;0,0" dur="10s" repeatCount="indefinite"/>
                </ellipse>
                <ellipse cx="200" cy="40" rx="30" ry="18">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-30,0;0,0" dur="12s" repeatCount="indefinite"/>
                </ellipse>
            </g>
            
            <!-- Energy particles -->
            <g>
                <circle cx="300" cy="150" r="3" fill="#FFD700" opacity="0.8">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-100,50;0,0" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="350" cy="170" r="2" fill="#32CD32" opacity="0.6">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-80,40;0,0" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="250" cy="180" r="2.5" fill="#87CEEB" opacity="0.7">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-60,30;0,0" dur="3.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3.5s" repeatCount="indefinite"/>
                </circle>
            </g>
        </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(svgContent);
}

// Create placeholder if image fails to load
function createImagePlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
        <div class="placeholder-content">
            <i class="fas fa-solar-panel"></i>
            <h3>Solar Energy</h3>
            <p>Powering the Future</p>
        </div>
    `;
    
    // Add placeholder styles
    const placeholderStyles = `
        .image-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            color: white;
            text-align: center;
        }
        
        .placeholder-content i {
            font-size: 80px;
            margin-bottom: 20px;
            color: #FFD700;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .placeholder-content h3 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .placeholder-content p {
            font-size: 16px;
            opacity: 0.8;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    
    if (!document.querySelector('#placeholder-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'placeholder-styles';
        styleSheet.textContent = placeholderStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.querySelector('.hero-image').appendChild(placeholder);
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

// Enhanced floating animation for elements
function enhanceFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
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
    handleImageLoad();
    enhanceFloatingAnimation();
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
        
        .floating-element {
            transition: transform 0.3s ease-out;
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