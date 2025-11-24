// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimations();
    initGallery();
    initForms();
    initAdminPanel();
    initImageSlider();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
}


// Events Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('eventsSlider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Function to update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.events-slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    sliderContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
});

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.section-title, .card, .theme-card, .event-card, .schedule-card, .gallery-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Gallery functionality
function initGallery() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            alert('More photos would be loaded here. In a real implementation, this would fetch additional images from a server.');
        });
    }
    
    // Initialize lightbox functionality
    initLightbox();
}

function initLightbox() {
    // Check if lightbox already exists
    if (document.getElementById('lightbox')) return;
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
            <button class="download-btn">Download</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Add click events to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const captionEl = this.querySelector('.gallery-overlay h3');
            
            if (!img || !captionEl) return;
            
            const imgSrc = img.src;
            const caption = captionEl.textContent;
            
            lightbox.querySelector('img').src = imgSrc;
            lightbox.querySelector('.lightbox-caption').textContent = caption;
            lightbox.classList.add('active');
            
            // Download button functionality
            const downloadBtn = lightbox.querySelector('.download-btn');
            downloadBtn.onclick = function() {
                const a = document.createElement('a');
                a.href = imgSrc;
                a.download = `TAFES-KIUT-${caption.replace(/\s+/g, '-')}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };
        });
    });
    
    // Close lightbox
    const closeBtn = lightbox.querySelector('.close-lightbox');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Form handling
function initForms() {
    // Testimony form
    const testimonyForm = document.querySelector('.testimony-form');
    if (testimonyForm) {
        testimonyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const testimony = document.getElementById('testimony').value;
            
            if (!name || !testimony) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            addTestimony(name, testimony);
            testimonyForm.reset();
            showNotification('Testimony shared successfully!', 'success');
        });
    }
    
    // Prayer request form
    const prayerForm = document.querySelector('.prayer-form');
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('prayer-name').value || 'Anonymous';
            const request = document.getElementById('prayer-request').value;
            
            if (!request) {
                showNotification('Please enter your prayer request', 'error');
                return;
            }
            
            prayerForm.reset();
            showNotification('Prayer request submitted. We will pray for you!', 'success');
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            contactForm.reset();
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
        });
    }
}

function addTestimony(name, testimony) {
    const testimoniesList = document.querySelector('.testimonies-list');
    if (!testimoniesList) return;
    
    const testimonyItem = document.createElement('div');
    testimonyItem.className = 'testimony-item';
    testimonyItem.innerHTML = `
        <h4>${name}</h4>
        <p>${testimony}</p>
    `;
    
    testimoniesList.prepend(testimonyItem);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        document.body.removeChild(notification);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Admin panel functionality
function initAdminPanel() {
    // Check if admin panel exists
    const adminPanel = document.getElementById('adminPanel');
    if (!adminPanel) return;
    
    // Add admin access trigger (hidden in normal use)
    const adminTrigger = document.createElement('div');
    adminTrigger.id = 'adminTrigger';
    adminTrigger.innerHTML = '<i class="fas fa-cog"></i>';
    document.body.appendChild(adminTrigger);
    
    // Toggle admin panel
    adminTrigger.addEventListener('click', function() {
        adminPanel.style.display = 'flex';
    });
    
    // Close admin panel
    const closeBtn = document.getElementById('closeAdminPanel');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            adminPanel.style.display = 'none';
        });
    }
    
    // Handle photo upload
    const photoUploadForm = document.getElementById('photoUploadForm');
    if (photoUploadForm) {
        photoUploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('photoTitle').value;
            const fileInput = document.getElementById('photoFile');
            
            if (!title || fileInput.files.length === 0) {
                showNotification('Please fill in all fields and select a photo', 'error');
                return;
            }
            
            showNotification('Photo uploaded successfully!', 'success');
            photoUploadForm.reset();
            adminPanel.style.display = 'none';
        });
    }
}

// Image Slider functionality
function initImageSlider() {
    const slider = document.querySelector('.events-slider');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider || !slides.length || !nextBtn || !prevBtn || !dotsContainer) {
        console.log('Slider elements not found');
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Next button
    nextBtn.addEventListener('click', nextSlide);
    
    // Previous button
    prevBtn.addEventListener('click', prevSlide);
    
    // Start auto slide
    startAutoSlide();
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.events-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Touch swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}