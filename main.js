// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    
    lucide.createIcons();
});

// Close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Electric Particles Animation
class ElectricParticles {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.connectionDistance = 150;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Create gradient for particle
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 2
        );
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    connectParticles(p1, p2, distance) {
        const opacity = 1 - (distance / this.connectionDistance);
        this.ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 0.3})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }
    
    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    this.connectParticles(this.particles[i], this.particles[j], distance);
                }
            }
        }
        
        // Draw particles
        this.particles.forEach(particle => this.drawParticle(particle));
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ElectricParticles(canvas);
    }
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// Add hover effect to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add typing effect to hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Form validation (if you add a contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Smooth reveal animations
const revealElements = () => {
    const reveals = document.querySelectorAll('.fade-in-up');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealElements);

// Initialize on load
window.addEventListener('load', () => {
    revealElements();
    
    // Add stagger delay to feature pills
    const featurePills = document.querySelectorAll('.feature-pill');
    featurePills.forEach((pill, index) => {
        pill.style.animationDelay = `${index * 0.2}s`;
    });
});

// Handle external links
document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Console log (optional - remove in production)
console.log('%cCyberElectric', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%cTransformamos energía y diseño en resultados perfectos', 'color: #007bff; font-size: 14px;');
