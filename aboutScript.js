document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE NAVBAR TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 2. ANIMATED IMPACT COUNTERS
    // Counts up smoothly when the stats section enters the screen
    const counters = document.querySelectorAll('.counter');
    const speed = 120; // Lower number = faster count speed

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let currentCount = 0;
                const increment = Math.ceil(target / speed);

                const updateCount = () => {
                    currentCount += increment;
                    if (currentCount < target) {
                        counter.innerText = currentCount.toLocaleString();
                        setTimeout(updateCount, 20);
                    } else {
                        // Append formatting (+ or %) based on target
                        if (target === 98) {
                            counter.innerText = target + '%';
                        } else {
                            counter.innerText = target.toLocaleString() + '+';
                        }
                    }
                };

                updateCount();
                observer.unobserve(counter); // Run animation once
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, { 
        threshold: 0.3 
    });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // 3. BACK TO TOP BUTTON
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                topBtn.style.display = 'block';
            } else {
                topBtn.style.display = 'none';
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. SCROLL REVEAL ANIMATIONS (.fade-up)
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => fadeObserver.observe(el));
});