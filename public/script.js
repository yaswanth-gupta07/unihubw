// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Modal Functionality
const modal = document.getElementById('joinModal');
const closeModal = document.getElementById('closeModal');
const joinForm = document.getElementById('joinForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = document.getElementById('submitBtn');

// Open modal function
function openModal() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal function
function closeModalFunc() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    // Reset form and hide messages
    if (joinForm) {
        joinForm.reset();
    }
    if (successMessage) {
        successMessage.classList.remove('show');
    }
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
}

// Open modal when clicking any join community links/buttons
document.querySelectorAll('a[href="#join"], .btn-hero').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });
});

// Close modal when clicking close button
if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModalFunc();
    }
});

// Handle form submission
if (joinForm) {
    joinForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Hide previous messages
        if (successMessage) {
            successMessage.classList.remove('show');
        }
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        // Disable submit button
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            college: document.getElementById('college').value.trim(),
            year: document.getElementById('year').value,
            role: document.getElementById('role').value,
            skills: document.getElementById('skills').value.trim(),
            contribute: document.getElementById('contribute').value.trim(),
            hours: document.getElementById('hours').value,
            linkedin: document.getElementById('linkedin').value.trim() || '',
            portfolio: document.getElementById('portfolio').value.trim() || ''
        };

        try {
            // Send data to backend API
            const response = await fetch(`${API_CONFIG.BASE_URL}/applications/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Show success message
                if (successMessage) {
                    successMessage.classList.add('show');
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                // Reset form after 4 seconds and close modal after 5 seconds
                setTimeout(() => {
                    if (joinForm) {
                        joinForm.reset();
                    }
                    setTimeout(() => {
                        closeModalFunc();
                    }, 1000);
                }, 4000);
            } else {
                // Show error message
                if (errorMessage) {
                    errorMessage.textContent = data.message || 'Something went wrong. Please try again later.';
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Application';
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            if (errorMessage) {
                errorMessage.textContent = 'Network error. Please check your connection and try again.';
                errorMessage.style.display = 'block';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
            }
        }
    });
}

// Smooth scroll for anchor links (excluding join links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip join links and hero button - they open modal instead
    if (anchor.getAttribute('href') === '#join' || anchor.classList.contains('btn-hero')) {
        return;
    }
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && target.id !== 'join') {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.section-title, .section-subtitle, .about-content, .badge-card, .feature-card, .why-item, .join-section').forEach(el => {
    observer.observe(el);
});

// Stagger animation for badges and features
const badgeCards = document.querySelectorAll('.badge-card');
const featureCards = document.querySelectorAll('.feature-card');
const whyItems = document.querySelectorAll('.why-item');

badgeCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

whyItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
});

