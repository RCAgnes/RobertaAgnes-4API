// Main contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all required elements
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('input, textarea');
    const errorSound = document.getElementById('ErrorSound');
    const confirmationPopup = document.getElementById('confirmation-popup');
    const overlay = document.getElementById('overlay');
    const closePopupBtn = document.getElementById('closePopup');

    // Input validation with improved visual feedback
    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', () => {
            input.style.borderColor = '#ec9b3f';
            input.style.backgroundColor = 'rgba(236, 155, 63, 0.1)';
        });

        // Blur effect
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Real-time validation
        input.addEventListener('input', function() {
            if (this.classList.contains('error-field')) {
                validateField(this);
            }
        });
    });

    // Field validation function
    function validateField(field) {
        const errorMessage = field.nextElementSibling;
        if (!field.value.trim()) {
            field.classList.add('error-field');
            errorMessage.classList.add('visible');
            if (errorSound) errorSound.play();
            return false;
        } else {
            field.classList.remove('error-field');
            errorMessage.classList.remove('visible');
            return true;
        }
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            showConfirmation();
            form.reset();
        }
    });

    // Show confirmation popup
    function showConfirmation() {
        const name = document.getElementById('firstName').value;
        const confirmationMessage = document.getElementById('confirmation-message');
        if (confirmationMessage) {
            confirmationMessage.textContent = `Thank you ${name}! Your message has been sent successfully.`;
            confirmationPopup.style.display = 'block';
            overlay.style.display = 'block';
            confirmationPopup.classList.add('fade-in');
        }
    }

    // Close popup handlers
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }

    if (overlay) {
        overlay.addEventListener('click', closePopup);
    }

    function closePopup() {
        confirmationPopup.style.display = 'none';
        overlay.style.display = 'none';
    }
});
