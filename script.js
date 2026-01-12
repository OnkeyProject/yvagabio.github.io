// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    initParticles();
    
    // Initialize visitor counter
    initVisitorCounter();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize form handling
    initForm();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Show domain notification
    setTimeout(showDomainNotification, 2000);
});

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#8a2be2', '#00bfff', '#ff0080']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8a2be2',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// Visitor Counter
function initVisitorCounter() {
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
        count = Math.floor(Math.random() * 100) + 150;
        localStorage.setItem('visitorCount', count);
    } else {
        count = parseInt(count);
        count++;
        localStorage.setItem('visitorCount', count);
    }
    
    // Animate counter
    const counterElement = document.getElementById('visitorCount');
    if (counterElement) {
        let current = 0;
        const increment = Math.ceil(count / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= count) {
                current = count;
                clearInterval(timer);
            }
            counterElement.textContent = current.toLocaleString();
        }, 30);
    }
}

// Typing Effect
function initTypingEffect() {
    const texts = [
        'Python Bot Developer',
        'AI/ML Enthusiast',
        'Backend Developer',
        'Automation Expert'
    ];
    
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    setTimeout(type, 100);
                }, 2000);
                return;
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        setTimeout(type, isDeleting ? 50 : 100);
    }
    
    // Start typing after delay
    setTimeout(type, 1000);
}

// Navigation
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Form Handling
function initForm() {
    const form = document.getElementById('messageForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create Telegram message
        const telegramMessage = `Новое сообщение с сайта yvagabio.com:%0A%0AИмя: ${name}%0AEmail: ${email}%0AСообщение: ${message}`;
        
        // Open Telegram with pre-filled message
        window.open(`https://t.me/emowarp?text=${telegramMessage}`, '_blank');
        
        // Show success message
        showNotification('Сообщение подготовлено для отправки в Telegram!');
        
        // Reset form
        form.reset();
    });
    
    // Copy Discord to clipboard
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`Скопировано: ${text}`);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
            showNotification('Ошибка копирования');
        });
    };
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.skill-category, .project-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = 'notification show';
    
    // Set color based on type
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff5555, #c23321)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, #ffaa00, #cc8800)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #8a2be2, #00bfff)';
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Domain Notification
function showDomainNotification() {
    if (!window.location.hostname.includes('yvagabio')) {
        const message = `Официальный домен: yvagabio.com (текущий: ${window.location.hostname})`;
        showNotification(message, 'warning');
    }
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + / to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        document.getElementById('name')?.focus();
    }
    
    // Escape to close menu
    if (e.key === 'Escape') {
        document.querySelector('.nav-menu')?.classList.remove('active');
        document.querySelector('.menu-toggle').innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading animation after content loads
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) loading.remove();
    }, 500);
});