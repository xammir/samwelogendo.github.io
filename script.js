// Scroll Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 25, 47, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks && mobileMenu && !navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// CONTACT FORM HANDLING
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data for debugging
        const formData = new FormData(contactForm);
        console.log('Form data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        // Show loading state
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        formStatus.style.display = 'none';
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            // Log the response for debugging
            console.log('Response status:', response.status);
            
            let data;
            try {
                data = await response.json();
                console.log('Response data:', data);
            } catch (e) {
                console.log('No JSON in response');
            }
            
            if (response.ok) {
                // Success
                formStatus.style.display = 'block';
                formStatus.style.background = 'rgba(0, 173, 181, 0.2)';
                formStatus.style.color = '#00ADB5';
                formStatus.style.border = '1px solid #00ADB5';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
                
                // Reset form
                contactForm.reset();
            } else {
                // Show specific error from Formspree
                let errorMsg = 'Failed to send message';
                if (data && data.errors) {
                    errorMsg = data.errors.map(err => err.message).join(', ');
                } else if (data && data.error) {
                    errorMsg = data.error;
                }
                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('Form error:', error);
            
            // Error display
            formStatus.style.display = 'block';
            formStatus.style.background = 'rgba(255, 100, 100, 0.2)';
            formStatus.style.color = '#ff6464';
            formStatus.style.border = '1px solid #ff6464';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + error.message;
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
        }
    });
});
    // PROJECT MODAL FUNCTIONALITY
    const projectData = {
        poultry: {
            title: "Poultry Management System",
            description: "A comprehensive web-based solution designed specifically for poultry farmers to efficiently manage their operations. This system streamlines daily tasks and provides valuable insights for better decision making.",
            image: "poultry-system.jpg",
            tags: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Chart.js"],
            features: [
                "Track flock size and bird demographics",
                "Vaccination scheduling and reminders",
                "Feed consumption monitoring",
                "Health records and medical history",
                "Egg production tracking",
                "Financial reports and analytics",
                "Multi-user access for farm workers"
            ],
            liveLink: "#",
            codeLink: "#"
        },
        clothing: {
            title: "Online Clothing Store",
            description: "A full-featured e-commerce platform built for a local fashion retailer. Includes customer-facing storefront and comprehensive admin dashboard for inventory and order management.",
            image: "online-store.jpg",
            tags: ["JavaScript", "PHP", "MySQL", "PayPal API", "AJAX"],
            features: [
                "User registration and authentication",
                "Shopping cart with session persistence",
                "Secure PayPal payment integration",
                "Real-time inventory management",
                "Order tracking and history",
                "Admin dashboard with analytics",
                "Responsive mobile-first design"
            ],
            liveLink: "#",
            codeLink: "#"
        },
        student: {
            title: "Student Database System",
            description: "An institutional-grade student information management system developed for educational institutions. Features role-based access and comprehensive reporting capabilities.",
            image: "student-system.jpg",
            tags: ["HTML/CSS", "PHP", "MySQL", "AJAX", "DataTables"],
            features: [
                "Student enrollment and registration",
                "Academic records management",
                "Course registration system",
                "Grade tracking and transcripts",
                "Parent/guardian portal",
                "Automated report generation",
                "Advanced search and filtering"
            ],
            liveLink: "#",
            codeLink: "#"
        }
    };

    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalTags = document.getElementById('modalTags');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalLiveLink = document.getElementById('modalLiveLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    const closeModal = document.querySelector('.close-modal');

    // Open modal when clicking View Details
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectCard = button.closest('.project-card');
            const projectId = projectCard.dataset.project;
            const data = projectData[projectId];

            if (data) {
                // Set content
                modalTitle.textContent = data.title;
                modalDescription.textContent = data.description;
                
                // Set image
                modalImg.src = data.image;
                modalImg.alt = data.title;
                modalImg.style.display = 'block';
                
                // Set tags
                modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                // Set features
                modalFeatures.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');
                
                // Set links
                modalLiveLink.href = data.liveLink;
                modalCodeLink.href = data.codeLink;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
