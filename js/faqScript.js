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

    // 2. ACCORDION TOGGLE LOGIC
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all other active items for a clean single-accordion experience
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // 3. CATEGORY TAB FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('faqSearchInput');
    const noResultsMsg = document.getElementById('noResultsMsg');

    function filterFAQs() {
        const activeCategory = document.querySelector('.filter-btn.active').getAttribute('data-category');
        const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        faqItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const questionText = item.querySelector('.faq-question h3').innerText.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').innerText.toLowerCase();

            const matchesCategory = (activeCategory === 'all' || category === activeCategory);
            const matchesSearch = questionText.includes(searchQuery) || answerText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
                item.classList.remove('active'); // Close hidden accordions
            }
        });

        // Show "No Results" message if zero questions match search
        if (noResultsMsg) {
            noResultsMsg.style.display = (visibleCount === 0) ? 'block' : 'none';
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterFAQs();
        });
    });

    // 4. LIVE SEARCH FILTER
    if (searchInput) {
        searchInput.addEventListener('input', filterFAQs);
    }

    // 5. BACK TO TOP BUTTON
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                topBtn.style.display = 'flex';
            } else {
                topBtn.style.display = 'none';
            }
        });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. SCROLL FADE-IN ANIMATIONS
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