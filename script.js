// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeSearch();
    initializeNavigation();
    initializeButtons();
    initializeHoverEffects();
});


// Filter cards based on search term
function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.card-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        const category = card.querySelector('.category')?.textContent.toLowerCase() || '';
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.some(tag => tag.includes(searchTerm)) ||
                       category.includes(searchTerm);
        
        if (matches) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Show all cards
function showAllCards() {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
    });
}

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if it's a navigation link to another page
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                // Allow normal navigation for actual links
                return;
            }
            
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation (you can add actual page navigation here)
            const page = this.textContent.toLowerCase();
            console.log(`Navigating to: ${page}`);
            
            // Example: Scroll to section if it exists
            const targetSection = document.querySelector(`.${page}-section`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Hover Effects
function initializeHoverEffects() {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.search-input');
        if (searchInput && searchInput.value !== '') {
            searchInput.value = '';
            showAllCards();
        }
    }
});

// Add some dynamic content updates
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const dateString = now.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
    
    // You can add a time display element to the page if needed
    console.log(`Current time: ${timeString} ${dateString}`);
}

// Update time every minute
setInterval(updateTime, 60000);
updateTime(); // Initial call

// Add click outside to close functionality for any future modals
document.addEventListener('click', function(e) {
    // Example: if you add modals later, you can close them by clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Add smooth reveal animation for cards when scrolling
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Music Player Functionality
function initializeVisualEscapeCarousel() {
    const carousel = document.querySelector('.visual-escape-carousel');
    if (!carousel) return;

    const iframe = carousel.querySelector('iframe');
    const prevBtn = document.querySelector('.ve-prev-btn');
    const nextBtn = document.querySelector('.ve-next-btn');
    const dots = document.querySelectorAll('.ve-dot');
    const currentEl = document.querySelector('.ve-current');

    const videos = [
        'mMLVr19wYZw',
        'KJwYBJMSbPI'
    ];

    function goTo(index) {
        carousel.dataset.videoIndex = index;
        iframe.src = `https://www.youtube-nocookie.com/embed/${videos[index]}`;
        iframe.title = `Visual Escape video ${index + 1}`;
        if (currentEl) currentEl.textContent = index + 1;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            goTo((Number(carousel.dataset.videoIndex) + 1) % videos.length);
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            goTo((Number(carousel.dataset.videoIndex) - 1 + videos.length) % videos.length);
        });
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
}

document.addEventListener('DOMContentLoaded', initializeVisualEscapeCarousel);

function initializeMusicPlayer() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (prevBtn && nextBtn) {
        let currentTrack = 0;
        const totalTracks = dots.length;
        
        // Sample music data (you can expand this)
        const musicData = [
            {
                title: "Butterfly Waltz",
                artist: "BRIAN CRAIN",
                featured: "DANIELE LEONI"
            },
            {
                title: "River Flows in You",
                artist: "YIRUMA",
                featured: ""
            },
            {
                title: "Fur Elise",
                artist: "BEETHOVEN",
                featured: ""
            },
            {
                title: "Forest au lait",
                artist: "ZMI",
                featured: ""
            }
        ];
        
        function updateMusicDisplay(trackIndex) {
            const albumTitle = document.querySelector('.album-title');
            const albumArtist = document.querySelector('.album-artist');
            const albumFeatured = document.querySelector('.album-featured');
            
            if (albumTitle && albumArtist && albumFeatured) {
                albumTitle.textContent = musicData[trackIndex].title;
                albumArtist.textContent = musicData[trackIndex].artist;
                albumFeatured.textContent = musicData[trackIndex].featured;
            }
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === trackIndex);
            });
        }
        
        // Previous button
        prevBtn.addEventListener('click', function() {
            currentTrack = (currentTrack - 1 + totalTracks) % totalTracks;
            updateMusicDisplay(currentTrack);
        });
        
        // Next button
        nextBtn.addEventListener('click', function() {
            currentTrack = (currentTrack + 1) % totalTracks;
            updateMusicDisplay(currentTrack);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentTrack = index;
                updateMusicDisplay(currentTrack);
            });
        });
    }
}

// Initialize music player if on about page
if (document.querySelector('.music-player')) {
    document.addEventListener('DOMContentLoaded', initializeMusicPlayer);
}

// Blog Page Functionality
function initializeBlogPage() {
    const categoryFilter = document.querySelector('.category-filter');
    const layoutBtns = document.querySelectorAll('.layout-btn');
    const blogGrid = document.querySelector('#blogGrid');
    const loadMoreBtn = document.querySelector('#loadMoreBtn');
    
    if (categoryFilter && layoutBtns.length > 0) {
        // Category Filtering
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            filterBlogPosts(selectedCategory);
        });
        
        // Layout Toggle
        layoutBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const layout = this.getAttribute('data-layout');
                toggleLayout(layout, this);
            });
        });
        
        // Load More Functionality
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                loadMorePosts();
            });
        }
    }
}

// Filter blog posts by category
function filterBlogPosts(category) {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
        }
    });
    
    // Update URL with filter parameter
    const url = new URL(window.location);
    if (category !== 'all') {
        url.searchParams.set('category', category);
    } else {
        url.searchParams.delete('category');
    }
    window.history.replaceState({}, '', url);
}

// Toggle between grid and list layout
function toggleLayout(layout, clickedBtn) {
    const blogGrid = document.querySelector('#blogGrid');
    const layoutBtns = document.querySelectorAll('.layout-btn');
    
    // Update active button
    layoutBtns.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
    
    // Update grid layout
    if (layout === 'list') {
        blogGrid.classList.add('list-layout');
    } else {
        blogGrid.classList.remove('list-layout');
    }
    
    // Save preference to localStorage
    localStorage.setItem('blogLayout', layout);
    
    // Update URL with layout parameter
    const url = new URL(window.location);
    url.searchParams.set('layout', layout);
    window.history.replaceState({}, '', url);
}

// Load more blog posts
function loadMorePosts() {
    const loadMoreBtn = document.querySelector('#loadMoreBtn');
    const blogGrid = document.querySelector('#blogGrid');
    
    // Simulate loading
    loadMoreBtn.textContent = 'Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Add more sample posts (you can replace this with actual API calls)
        const newPosts = [
            {
                category: 'ai',
                date: 'November 15, 2023',
                title: 'Machine Learning Fundamentals',
                description: 'A comprehensive introduction to machine learning concepts, algorithms, and practical applications...',
                views: '1247'
            },
            {
                category: 'dev',
                date: 'October 20, 2023',
                title: 'Web Development Best Practices',
                description: 'Essential tips and tricks for modern web development, including performance optimization...',
                views: '892'
            }
        ];
        
        newPosts.forEach(post => {
            const postElement = createBlogPostElement(post);
            blogGrid.appendChild(postElement);
        });
        
        // Reset button
        loadMoreBtn.textContent = 'Load More Posts';
        loadMoreBtn.disabled = false;
        
        // Hide button if no more posts
        if (newPosts.length < 2) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1500);
}

// Create blog post element
function createBlogPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'blog-card';
    postDiv.setAttribute('data-category', post.category);
    
    postDiv.innerHTML = `
        <div class="card-header">
            <span class="date">${post.date}</span>
            <span class="category">${post.category.toUpperCase()}</span>
        </div>
        <h3 class="card-title">${post.title}</h3>
        <p class="card-description">${post.description}</p>
        <div class="blog-card-footer">
            <button class="read-more-btn">Read More ></button>
            <span class="views">${post.views} views</span>
        </div>
    `;
    
    // Add animation
    postDiv.style.opacity = '0';
    postDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        postDiv.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        postDiv.style.opacity = '1';
        postDiv.style.transform = 'translateY(0)';
    }, 100);
    
    return postDiv;
}

// Initialize blog page if on blog page
if (document.querySelector('.blog-header')) {
    document.addEventListener('DOMContentLoaded', initializeBlogPage);
}

// Restore layout preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLayout = localStorage.getItem('blogLayout');
    const urlParams = new URLSearchParams(window.location.search);
    const urlLayout = urlParams.get('layout');
    
    if (savedLayout || urlLayout) {
        const layout = urlLayout || savedLayout;
        const layoutBtn = document.querySelector(`[data-layout="${layout}"]`);
        if (layoutBtn) {
            toggleLayout(layout, layoutBtn);
        }
    }
    
    // Restore category filter
    const urlCategory = urlParams.get('category');
    if (urlCategory) {
        const categoryFilter = document.querySelector('.category-filter');
        if (categoryFilter) {
            categoryFilter.value = urlCategory;
            filterBlogPosts(urlCategory);
        }
    }
});

// Mobile Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Only show popup if on mobile and not previously dismissed
    if (window.innerWidth <= 900 && !localStorage.getItem('mobilePopupDismissed')) {
        document.getElementById('mobile-popup').style.display = 'flex';
    }
    document.getElementById('mobile-popup-btn').onclick = function() {
        document.getElementById('mobile-popup').style.display = 'none';
        localStorage.setItem('mobilePopupDismissed', '1');
    };
});