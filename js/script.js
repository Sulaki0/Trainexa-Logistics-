/* ============================================
   TRAINEXA LOGISTICS - JAVASCRIPT
   Student: Sulakshya Acharya | ID: 20037363
   ============================================ */

// ============================================
// 1. HAMBURGER MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // ============================================
    // 2. ACTIVE NAV LINK HIGHLIGHTING
    // ============================================

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // 3. ANIMATED STATISTICS COUNTER
    // ============================================

    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateNumbers = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const current = parseInt(stat.innerText) || 0;
                const increment = Math.max(1, Math.ceil(target / 80));
                
                if (current < target) {
                    const newValue = Math.min(current + increment, target);
                    stat.innerText = newValue;
                }
            });
        };

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            let animationStarted = false;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !animationStarted) {
                        animationStarted = true;
                        const interval = setInterval(() => {
                            let allComplete = true;
                            statNumbers.forEach(stat => {
                                const target = parseInt(stat.getAttribute('data-target'));
                                const current = parseInt(stat.innerText) || 0;
                                if (current < target) {
                                    allComplete = false;
                                }
                            });
                            
                            if (allComplete) {
                                clearInterval(interval);
                            }
                            animateNumbers();
                        }, 25);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
    }

    // ============================================
    // 4. IMAGE GALLERY LIGHTBOX
    // ============================================

    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox && lightboxImg) {
        galleryItems.forEach(img => {
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                const src = this.getAttribute('src');
                const alt = this.getAttribute('alt');
                lightboxImg.setAttribute('src', src);
                lightboxImg.setAttribute('alt', alt);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // 5. CONTACT FORM VALIDATION
    // ============================================

    const form = document.getElementById('contactForm');
    
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const serviceSelect = document.getElementById('service');
        const messageInput = document.getElementById('message');
        const successMessage = document.getElementById('success-message');
        
        const inputs = [nameInput, emailInput, phoneInput, serviceSelect, messageInput];
        inputs.forEach(input => {
            if (input) {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        this.classList.remove('error');
                    }
                });
            }
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let allValid = true;
            inputs.forEach(input => {
                if (input && !validateField(input)) {
                    allValid = false;
                }
            });
            
            if (allValid) {
                showSuccessMessage();
                form.reset();
                document.querySelectorAll('.form-group input, .form-group textarea, .form-group select')
                    .forEach(el => el.classList.remove('success'));
            }
        });
        
        function validateField(input) {
            const errorElement = document.getElementById(input.id + '-error');
            const value = input.value.trim();
            let isValid = true;
            let errorMessage = '';
            
            if (input.id === 'name') {
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Full name is required';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Please enter your full name (minimum 2 characters)';
                }
            } else if (input.id === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Email address is required';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            } else if (input.id === 'phone') {
                const phoneRegex = /^[\+\d\s\-\(\)]{10,20}$/;
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Phone number is required';
                } else if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number (10-20 digits)';
                }
            } else if (input.id === 'message') {
                if (value === '') {
                    isValid = false;
                    errorMessage = 'Message is required';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Please provide more detail (minimum 10 characters)';
                }
            }
            
            if (!isValid) {
                input.classList.add('error');
                input.classList.remove('success');
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                    errorElement.classList.add('show');
                }
                return false;
            } else {
                input.classList.remove('error');
                input.classList.add('success');
                if (errorElement) {
                    errorElement.classList.remove('show');
                }
                return true;
            }
        }
        
        function showSuccessMessage() {
            if (successMessage) {
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <strong>Thank You!</strong>
                    Your message has been sent successfully. Our Trainexa team will respond within 24 hours.
                `;
                successMessage.classList.add('show');
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 6000);
            }
        }
    }
});