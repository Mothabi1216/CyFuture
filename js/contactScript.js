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

    // 2. CONTACT FORM VALIDATION & HANDLING
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form inputs
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const role = document.getElementById('role').value;
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Email validation regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Simple validation check
            if (!fullName || !email || !role || !subject || !message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (!emailPattern.test(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                showAlert('Thank you! Your message has been sent successfully. We will get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });
    }

    // Helper function to show alert messages
    function showAlert(msg, type) {
        if (!formAlert) return;

        formAlert.innerText = msg;
        formAlert.className = `alert-box alert-${type}`;
        formAlert.style.display = 'block';

        // Auto-scroll to alert if needed
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 3. BACK TO TOP BUTTON
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