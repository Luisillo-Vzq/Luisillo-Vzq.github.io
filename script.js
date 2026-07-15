// ============================================
// FIT HOUSE 54 - INTERACTIVE FUNCTIONALITY
// Engineer-Built Landing Page
// ============================================

// ====================================
// DOM READY
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initStickyHeader();
    initSmoothScroll();
    initModalHandlers();
    initScrollAnimations();
    initImageErrorHandling();
    logPerformanceMetrics();
});

// ====================================
// STICKY HEADER
// ====================================
function initStickyHeader() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// ====================================
// SMOOTH SCROLL
// ====================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
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
}

// ====================================
// MODAL HANDLERS
// ====================================
let modalOpen = false;

function openModal() {
    const modal = document.getElementById('membershipModal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    modalOpen = true;
    
    // Accessibility: Focus on close button
    setTimeout(() => {
        const closeBtn = modal.querySelector('button[onclick="closeModal()"]');
        if (closeBtn) closeBtn.focus();
    }, 100);
    
    // Track modal open event
    trackEvent('modal_opened', 'membership_modal');
}

function closeModal() {
    const modal = document.getElementById('membershipModal');
    if (!modal) return;
    
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
    modalOpen = false;
    
    // Track modal close event
    trackEvent('modal_closed', 'membership_modal');
}

function initModalHandlers() {
    const modal = document.getElementById('membershipModal');
    if (!modal) return;
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOpen) {
            closeModal();
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// ====================================
// SCROLL ANIMATIONS
// ====================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ====================================
// IMAGE ERROR HANDLING
// ====================================
function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        // Skip if already handled by onerror attribute
        if (img.getAttribute('onerror')) return;
        
        img.addEventListener('error', function() {
            console.warn(`Failed to load image: ${this.src}`);
            // Could add placeholder logic here
        });
    });
}

// ====================================
// WHATSAPP CLICK TRACKING
// ====================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('whatsapp_click', this.href);
    });
});

// ====================================
// ANALYTICS & TRACKING
// ====================================
function trackEvent(eventName, eventData) {
    // Console log for development
    console.log(`Event: ${eventName}`, eventData);
    
    // Add your analytics integration here
    // Example: gtag('event', eventName, { value: eventData });
    // Example: fbq('track', eventName, { value: eventData });
}

// ====================================
// PERFORMANCE MONITORING
// ====================================
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
                
                console.log('Performance Metrics:');
                console.log(`- Page Load Time: ${loadTime}ms`);
                console.log(`- DOM Ready: ${domReady}ms`);
                
                trackEvent('page_performance', {
                    load_time: loadTime,
                    dom_ready: domReady
                });
            }, 0);
        });
    }
}

// ====================================
// FORM VALIDATION (for future use)
// ====================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ====================================
// SCROLL TO TOP FUNCTION
// ====================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ====================================
// MOBILE MENU TOGGLE (if needed)
// ====================================
let mobileMenuOpen = false;

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ====================================
// LAZY LOADING ENHANCEMENTS
// ====================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ====================================
// COPY TO CLIPBOARD FUNCTION
// ====================================
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copiado al portapapeles');
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

// ====================================
// NOTIFICATION SYSTEM
// ====================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-xl transform transition-all duration-300 ${
        type === 'success' ? 'bg-neon-yellow text-deep-black' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    notification.style.transform = 'translateX(400px)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ====================================
// SHARE API INTEGRATION
// ====================================
async function shareContent(title, text, url) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: title,
                text: text,
                url: url
            });
            trackEvent('content_shared', 'native_share');
        } catch (err) {
            console.log('Share cancelled or failed:', err);
        }
    } else {
        // Fallback: Copy to clipboard
        copyToClipboard(url);
    }
}

// ====================================
// GEOLOCATION (for future use)
// ====================================
function getDistanceToGym() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const gymLat = 20.6739208;
                const gymLng = -103.3866349;
                
                const distance = calculateDistance(userLat, userLng, gymLat, gymLng);
                console.log(`Distance to gym: ${distance.toFixed(2)} km`);
                
                trackEvent('user_location', { distance: distance });
            },
            error => {
                console.log('Geolocation error:', error);
            }
        );
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// ====================================
// INITIALIZE ON LOAD
// ====================================
console.log('Fit House 54 - Landing Page Loaded Successfully');
console.log('Version: 1.0.0');
console.log('Built with: HTML5, Tailwind CSS, Vanilla JS');
