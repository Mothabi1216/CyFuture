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

    // 2. DYNAMIC ROLE AUTO-SELECTION FROM GATEWAY BUTTONS
    window.setPartnerRole = function(roleValue) {
        const partnerTypeSelect = document.getElementById('partnerType');
        if (partnerTypeSelect) {
            partnerTypeSelect.value = roleValue;
            
            // Highlight select box briefly to indicate selection
            partnerTypeSelect.focus();
            partnerTypeSelect.classList.add('highlight-field');
            setTimeout(() => {
                partnerTypeSelect.classList.remove('highlight-field');
            }, 1000);
        }
    };

    // 3. PARTNER FORM VALIDATION & HANDLING
    const partnerForm = document.getElementById('partnerForm');
    const formAlert = document.getElementById('formAlert');

    if (partnerForm) {
        partnerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form inputs
            const orgName = document.getElementById('orgName').value.trim();
            const partnerType = document.getElementById('partnerType').value;
            const contactName = document.getElementById('contactName').value.trim();
            const contactEmail = document.getElementById('contactEmail').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value.trim();
            const overview = document.getElementById('overview').value.trim();

            // Email validation regex
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Simple validation check
            if (!orgName || !partnerType || !contactName || !contactEmail || !phone || !country || !overview) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            if (!emailPattern.test(contactEmail)) {
                showAlert('Please enter a valid official business email address.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = partnerForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Submitting Application...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                showAlert('Application submitted successfully! Our partnership team will review your credentials and contact you within 48 hours.', 'success');
                partnerForm.reset();
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

    // 4. BACK TO TOP BUTTON
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

    // 5. SCROLL REVEAL ANIMATIONS (.fade-up)
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