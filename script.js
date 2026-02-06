// ===================================
// INITIALIZATION & UTILITY FUNCTIONS
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupCarousel();
    setupKitSelector();
    setupHowWeLook();
    setupGallery();
    setupDownloads();
    setupModals();
    setupAnimations();
    setupSmoothScroll();
}

// ===================================
// NAVIGATION
// ===================================

function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    });
}

// ===================================
// CAROUSEL
// ===================================

function setupCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!track) return;

    let currentIndex = 0;
    const cards = track.querySelectorAll('.product-card');
    const cardWidth = 350 + 30; // card width + gap
    const visibleCards = getVisibleCards();

    function getVisibleCards() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - visibleCards;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleCards = getVisibleCards();
        if (currentIndex >= cards.length - newVisibleCards) {
            currentIndex = Math.max(0, cards.length - newVisibleCards);
        }
        updateCarousel();
    });

    // Initialize
    updateCarousel();

    // Auto-scroll carousel every 5 seconds
    setInterval(() => {
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
}

// ===================================
// KIT SELECTOR
// ===================================

const kitData = {
    red: {
        jersey: {
            name: 'Red Edition Jersey',
            image: 'RED/RED FRONT AND BACK WITH LOGO COLOR RED.png'
        },
        hoodie: {
            name: 'Red Edition Hoodie',
            image: 'RED/RED hoodie.png'
        }
    },
    yellow: {
        jersey: {
            name: 'Yellow Edition Jersey',
            image: 'YELLOW/YELLOW FRONT AND BACK T_SHIRT.png'
        },
        hoodie: {
            name: 'Yellow Edition Hoodie',
            image: 'YELLOW/Yellow Hoddie.png'
        }
    },
    white: {
        jersey: {
            name: 'White Edition Jersey',
            image: 'WHITE/WHITE FRONT AND BACK T-Shirt.png'
        },
        hoodie: {
            name: 'White Edition Hoodie',
            image: 'WHITE/White hoodie.png'
        }
    },
    teal: {
        jersey: {
            name: 'Teal Edition Jersey',
            image: 'TALE/TALE FRONT AND BACK WITH LOGO.png'
        },
        hoodie: {
            name: 'Teal Edition Hoodie',
            image: 'TALE/Tale Hoodie.png'
        }
    }
};

function setupKitSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const typeButtons = document.querySelectorAll('.type-btn');
    const kitImage = document.getElementById('kitImage');
    const currentKitName = document.getElementById('currentKitName');

    let selectedColor = 'red';
    let selectedType = 'jersey';

    function updateKitPreview() {
        const kit = kitData[selectedColor][selectedType];
        const img = kitImage.querySelector('.kit-image');

        // Update image
        img.src = kit.image;

        // Update kit name
        currentKitName.textContent = kit.name;
    }

    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            selectedColor = option.dataset.color;
            updateKitPreview();
            
            // Add animation
            kitImage.style.animation = 'none';
            setTimeout(() => {
                kitImage.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    });

    // Type selection (Jersey/Hoodie)
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedType = button.dataset.type;
            updateKitPreview();
        });
    });

    // Image zoom on hover
    const kitImages = document.querySelectorAll('.kit-image');
    kitImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Initialize
    updateKitPreview();
}

// ===================================
// HOW WE LOOK SECTION
// ===================================

function setupHowWeLook() {
    const colorButtons = document.querySelectorAll('.look-color-btn');
    const personImg = document.getElementById('person-view-img');
    const teamImg = document.getElementById('team-view-img');
    const lookZoomBtns = document.querySelectorAll('.look-zoom-btn');

    // Image mapping
    const lookImages = {
        red: {
            person: 'How we look/RED.png',
            team: 'How we look/TEAM RED.png'
        },
        yellow: {
            person: 'How we look/YELLOW.png',
            team: 'How we look/TEAM YELLOW.png'
        },
        white: {
            person: 'How we look/WHITE.png',
            team: 'How we look/TEAM WHITE.png'
        },
        teal: {
            person: 'How we look/TALE.png',
            team: 'How we look/TEAM TALE.png'
        }
    };

    // Color button functionality
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            
            // Update active state
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update images with fade effect
            personImg.style.opacity = '0';
            teamImg.style.opacity = '0';
            
            setTimeout(() => {
                personImg.src = lookImages[color].person;
                teamImg.src = lookImages[color].team;
                personImg.style.transition = 'opacity 0.3s ease';
                teamImg.style.transition = 'opacity 0.3s ease';
                personImg.style.opacity = '1';
                teamImg.style.opacity = '1';
            }, 300);
        });
    });

    // Zoom button functionality
    lookZoomBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const type = btn.dataset.type;
            const imgSrc = type === 'person' ? personImg.src : teamImg.src;
            const imgAlt = type === 'person' ? 'Person View' : 'Team View';
            openImageModal(imgSrc, imgAlt);
        });
    });
}

// ===================================
// GALLERY
// ===================================

function setupGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-image');
            openImageModal(img.src, img.alt);
        });
    });
}

function openImageModal(src, alt) {
    const modal = document.getElementById('quickViewModal');
    const modalImage = document.getElementById('modalImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductCategory = document.getElementById('modalProductCategory');

    modalImage.src = src;
    modalProductName.textContent = alt;
    modalProductCategory.textContent = 'Premium Design';

    // Update the global currentImageSrc for download
    if (window.updateCurrentImageSrc) {
        window.updateCurrentImageSrc(src);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===================================
// MODALS
// ===================================

function setupModals() {
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const modalViewKit = document.getElementById('modalViewKit');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');
    const modalImage = document.getElementById('modalImage');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomResetBtn = document.getElementById('zoomReset');

    let currentZoom = 1;
    let currentImageSrc = '';

    // Expose function to update currentImageSrc from outside
    window.updateCurrentImageSrc = function(src) {
        currentImageSrc = src;
    };

    // Open modal on quick view
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.product-card');
            const img = card.querySelector('.product-image');
            const name = card.querySelector('.product-name').textContent;
            const category = card.querySelector('.product-category').textContent;
            const kitColor = card.dataset.kit;

            const modalProductName = document.getElementById('modalProductName');
            const modalProductCategory = document.getElementById('modalProductCategory');

            modalImage.src = img.src;
            currentImageSrc = img.src;
            modalProductName.textContent = name;
            modalProductCategory.textContent = category;

            // Reset zoom
            currentZoom = 1;
            modalImage.style.transform = 'scale(1)';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Set up view kit button
            modalViewKit.onclick = () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Scroll to kit selector and select the color
                document.getElementById('kits').scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const colorOption = document.querySelector(`.color-option[data-color="${kitColor}"]`);
                    if (colorOption) colorOption.click();
                }, 500);
            };
        });
    });

    // Zoom controls
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            currentZoom = Math.min(currentZoom + 0.5, 5);
            modalImage.style.transform = `scale(${currentZoom})`;
            if (currentZoom > 1) {
                modalImage.classList.add('zoomed');
            } else {
                modalImage.classList.remove('zoomed');
            }
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            currentZoom = Math.max(currentZoom - 0.5, 1);
            modalImage.style.transform = `scale(${currentZoom})`;
            if (currentZoom > 1) {
                modalImage.classList.add('zoomed');
            } else {
                modalImage.classList.remove('zoomed');
            }
        });
    }

    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', () => {
            currentZoom = 1;
            modalImage.style.transform = 'scale(1)';
            modalImage.classList.remove('zoomed');
        });
    }

    // Click on image to toggle zoom
    if (modalImage) {
        const modalImageContainer = modalImage.parentElement;
        
        modalImage.addEventListener('click', () => {
            if (currentZoom === 1) {
                currentZoom = 2;
            } else {
                currentZoom = 1;
            }
            modalImage.style.transform = `scale(${currentZoom})`;
            if (currentZoom > 1) {
                modalImage.classList.add('zoomed');
            } else {
                modalImage.classList.remove('zoomed');
            }
        });

        // Mouse wheel zoom
        modalImageContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            // Zoom in or out based on wheel direction
            if (e.deltaY < 0) {
                // Scroll up - zoom in
                currentZoom = Math.min(currentZoom + 0.2, 5);
            } else {
                // Scroll down - zoom out
                currentZoom = Math.max(currentZoom - 0.2, 1);
            }
            
            modalImage.style.transform = `scale(${currentZoom})`;
            
            if (currentZoom > 1) {
                modalImage.classList.add('zoomed');
            } else {
                modalImage.classList.remove('zoomed');
            }
        }, { passive: false });

        // Enable dragging when zoomed
        let isDragging = false;
        let startX, startY;
        let scrollLeft, scrollTop;

        modalImageContainer.addEventListener('mousedown', (e) => {
            if (currentZoom > 1) {
                isDragging = true;
                modalImageContainer.style.cursor = 'grabbing';
                startX = e.pageX - modalImageContainer.offsetLeft;
                startY = e.pageY - modalImageContainer.offsetTop;
                scrollLeft = modalImageContainer.scrollLeft;
                scrollTop = modalImageContainer.scrollTop;
                e.preventDefault();
            }
        });

        modalImageContainer.addEventListener('mouseleave', () => {
            isDragging = false;
            if (currentZoom > 1) {
                modalImageContainer.style.cursor = 'grab';
            }
        });

        modalImageContainer.addEventListener('mouseup', () => {
            isDragging = false;
            if (currentZoom > 1) {
                modalImageContainer.style.cursor = 'grab';
            }
        });

        modalImageContainer.addEventListener('mousemove', (e) => {
            if (!isDragging || currentZoom <= 1) return;
            e.preventDefault();
            
            const x = e.pageX - modalImageContainer.offsetLeft;
            const y = e.pageY - modalImageContainer.offsetTop;
            const walkX = (x - startX) * 1.5;
            const walkY = (y - startY) * 1.5;
            
            modalImageContainer.scrollLeft = scrollLeft - walkX;
            modalImageContainer.scrollTop = scrollTop - walkY;
        });
    }

    // Download button
    if (modalDownloadBtn) {
        modalDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = currentImageSrc;
            const fileName = currentImageSrc.split('/').pop() || 'shaheen-design.png';
            link.download = fileName;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.style.display = 'none';
            
            document.body.appendChild(link);
            
            // Trigger download
            setTimeout(() => {
                link.click();
                document.body.removeChild(link);
                showNotification('Download started! Check your Downloads folder.', 'success');
            }, 100);
        });
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentZoom = 1;
        modalImage.style.transform = 'scale(1)';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===================================
// DOWNLOADS
// ===================================

const kitPDFs = {
    red: 'PDF AND MATERIAL/RED KIT PDF OF MATERIAL AND PICS.pdf',
    yellow: 'PDF AND MATERIAL/Yellow KIT PDF OF MATERIAL AND PICS.pdf',
    white: 'PDF AND MATERIAL/WHITE KIT PDF OF MATERIAL AND PICS.pdf',
    teal: 'PDF AND MATERIAL/TALE KIT PDF OF MATERIAL AND PICS.pdf'
};

function setupDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');

    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const kit = button.dataset.kit;
            handleDownload(kit);
        });
    });
}

function handleDownload(kitColor) {
    // Create a notification
    showNotification(`Preparing ${capitalizeFirst(kitColor)} Kit assets for download...`);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = kitPDFs[kitColor];
    link.download = `${capitalizeFirst(kitColor)}_Kit_Material_and_Pics.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    
    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Success notification
    setTimeout(() => {
        showNotification(`${capitalizeFirst(kitColor)} Kit PDF downloaded! Check your downloads folder.`, 'success');
    }, 500);

    // Add click animation
    const button = document.querySelector(`.download-btn[data-kit="${kitColor}"]`);
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00c4cb' : '#1d4068'};
        color: white;
        padding: 20px 30px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// ANIMATIONS
// ===================================

function setupAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect on hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-image, .hero-content');
        
        parallaxElements.forEach((el, index) => {
            const speed = index === 0 ? 0.3 : 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Debounce function for resize events
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

// ===================================
// ADDITIONAL FEATURES
// ===================================

// Add to cart functionality (if needed later)
function addToCart(productId) {
    console.log(`Added product ${productId} to cart`);
    showNotification('Added to cart!', 'success');
}

// Share functionality
function shareProduct(productName, productUrl) {
    if (navigator.share) {
        navigator.share({
            title: productName,
            text: `Check out this amazing ${productName} design!`,
            url: productUrl
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        copyToClipboard(productUrl);
        showNotification('Link copied to clipboard!', 'success');
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

// Console message
console.log('%c🏏 Shaheen Cricket Club - Jersey Design Portfolio', 'font-size: 20px; font-weight: bold; color: #00c4cb;');
console.log('%c👕 Designed by Anil Kakkar', 'font-size: 14px; color: #1d4068;');
console.log('%c🎨 Jersey Design Competition 2026', 'font-size: 12px; color: #ffbb59;');
