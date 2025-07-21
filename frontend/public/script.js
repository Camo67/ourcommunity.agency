document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('show');
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Reviews Section Functionality ---
    const reviewForm = document.getElementById('reviewForm');
    const ratingInput = document.getElementById('ratingInput');
    const reviewRatingInput = document.getElementById('reviewRating');
    const stars = ratingInput ? Array.from(ratingInput.children) : [];
    const reviewsGrid = document.getElementById('reviewsGrid');

    let currentRating = 0;

    if (ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.rating);
                reviewRatingInput.value = currentRating;
                updateStars();
            });
            star.addEventListener('mouseover', () => {
                highlightStars(parseInt(star.dataset.rating));
            });
            star.addEventListener('mouseout', () => {
                highlightStars(currentRating);
            });
            star.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentRating = parseInt(star.dataset.rating);
                    reviewRatingInput.value = currentRating;
                    updateStars();
                }
            });
        });
    }

    function updateStars() {
        stars.forEach(star => {
            if (parseInt(star.dataset.rating) <= currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function highlightStars(rating) {
        stars.forEach(star => {
            if (parseInt(star.dataset.rating) <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const reviewerName = document.getElementById('reviewerName').value;
            const reviewText = document.getElementById('reviewText').value;
            const reviewEmail = document.getElementById('reviewerEmail').value; // Get email, though not displayed

            if (currentRating === 0) {
                alert('Please provide a star rating!');
                return;
            }

            // Create new review card
            const newReviewCard = document.createElement('div');
            newReviewCard.classList.add('review-card', 'fade-in'); // Add fade-in for animation
            
            const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const avatarInitials = reviewerName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

            newReviewCard.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-avatar">${avatarInitials}</div>
                    <div class="reviewer-info">
                        <h4>${reviewerName}</h4>
                        <span class="review-date">${date}</span>
                    </div>
                </div>
                <div class="review-stars">
                    ${'<i class="fas fa-star"></i>'.repeat(currentRating)}
                    ${'<i class="far fa-star"></i>'.repeat(5 - currentRating)}
                </div>
                <p class="review-text">"${reviewText}"</p>
            `;

            reviewsGrid.prepend(newReviewCard); // Add new review to the top

            // Trigger fade-in animation
            setTimeout(() => {
                newReviewCard.classList.add('appear');
            }, 10); // Small delay to allow CSS to register initial state

            // Reset form
            reviewForm.reset();
            currentRating = 0;
            updateStars(); // Reset star display
            alert('Thank you for your review!');
        });
    }

    // --- Intersection Observer for Fade-in Animations ---
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // When 20% of the item is visible
        rootMargin: "0px 0px -50px 0px" // Start animating 50px before it reaches the bottom of the viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
