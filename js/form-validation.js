/* ==========================================
   FORM VALIDATION SCRIPTS
   ========================================== */

// Validation Patterns
const patterns = {
    name: /^[A-Za-z][A-Za-z\s'-]*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9]\d{9}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
};

// Show Error Message
function showError(input, message) {
    const formGroup = input.closest('.form-group') || input.closest('.col-md-6') || input.parentElement;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Insert after input
    if (input.parentElement.classList.contains('input-with-icon')) {
        input.parentElement.after(errorDiv);
    } else {
        input.after(errorDiv);
    }
}

// Show Success
function showSuccess(input) {
    const formGroup = input.closest('.form-group') || input.closest('.col-md-6') || input.parentElement;
    
    // Remove error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add success class
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

// Clear All Errors
function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

// Validate Name
function validateName(input, fieldName) {
    const value = input.value;
    
    // Check if empty
    if (!value || value.trim() === '') {
        showError(input, `${fieldName} is required`);
        return false;
    }
    
    // Check for leading/trailing spaces
    if (value !== value.trim()) {
        showError(input, `${fieldName} cannot start or end with spaces`);
        return false;
    }
    
    // Check minimum length
    if (value.trim().length < 2) {
        showError(input, `${fieldName} must be at least 2 characters`);
        return false;
    }
    
    // Check for valid characters (only letters, spaces, hyphens, apostrophes)
    if (!patterns.name.test(value.trim())) {
        showError(input, `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
        return false;
    }
    
    // Check if starts with number or special character
    if (/^[^A-Za-z]/.test(value.trim())) {
        showError(input, `${fieldName} must start with a letter`);
        return false;
    }
    
    showSuccess(input);
    return true;
}

// Validate Email
function validateEmail(input) {
    const value = input.value;
    
    // Check if empty
    if (!value || value.trim() === '') {
        showError(input, 'Email address is required');
        return false;
    }
    
    // Check for leading/trailing spaces
    if (value !== value.trim()) {
        showError(input, 'Email cannot start or end with spaces');
        return false;
    }
    
    // Check for spaces in email
    if (value.includes(' ')) {
        showError(input, 'Email cannot contain spaces');
        return false;
    }
    
    // Validate email format
    if (!patterns.email.test(value.trim())) {
        showError(input, 'Please enter a valid email address');
        return false;
    }
    
    showSuccess(input);
    return true;
}

// Validate Phone
function validatePhone(input) {
    const value = input.value;
    
    // Check if empty
    if (!value || value.trim() === '') {
        showError(input, 'Phone number is required');
        return false;
    }
    
    // Remove spaces and hyphens
    const cleanValue = value.replace(/[\s-]/g, '');
    
    // Check if contains only numbers
    if (!/^\d+$/.test(cleanValue)) {
        showError(input, 'Phone number can only contain digits');
        return false;
    }
    
    // Check exact length (10 digits)
    if (cleanValue.length !== 10) {
        showError(input, 'Phone number must be exactly 10 digits');
        return false;
    }
    
    // Check if starts with valid digit (6-9 for Indian numbers)
    if (!/^[6-9]/.test(cleanValue)) {
        showError(input, 'Phone number must start with 6, 7, 8, or 9');
        return false;
    }
    
    showSuccess(input);
    return true;
}

// Validate Password
function validatePassword(input, isConfirm = false, originalPassword = null) {
    const value = input.value;
    
    // Check if empty
    if (!value || value.trim() === '') {
        showError(input, 'Password is required');
        return false;
    }
    
    // If this is confirm password, just check if it matches
    if (isConfirm && originalPassword) {
        if (value !== originalPassword) {
            showError(input, 'Passwords do not match');
            return false;
        }
        showSuccess(input);
        return true;
    }
    
    // Check minimum length
    if (value.length < 8) {
        showError(input, 'Password must be at least 8 characters long');
        return false;
    }
    
    // Check for uppercase letter
    if (!/[A-Z]/.test(value)) {
        showError(input, 'Password must contain at least one uppercase letter');
        return false;
    }
    
    // Check for lowercase letter
    if (!/[a-z]/.test(value)) {
        showError(input, 'Password must contain at least one lowercase letter');
        return false;
    }
    
    // Check for number
    if (!/\d/.test(value)) {
        showError(input, 'Password must contain at least one number');
        return false;
    }
    
    showSuccess(input);
    return true;
}

// Validate Subject/Select
function validateSelect(input, fieldName) {
    const value = input.value;
    
    if (!value || value === '') {
        showError(input, `Please select a ${fieldName}`);
        return false;
    }
    
    showSuccess(input);
    return true;
}

// Validate Message/Textarea
function validateMessage(input, fieldName, minLength = 10) {
    const value = input.value;
    
    // Check if empty
    if (!value || value.trim() === '') {
        showError(input, `${fieldName} is required`);
        return false;
    }
    
    // Check for leading/trailing spaces
    if (value !== value.trim()) {
        showError(input, `${fieldName} cannot start or end with spaces`);
        return false;
    }
    
    // Check minimum length
    if (value.trim().length < minLength) {
        showError(input, `${fieldName} must be at least ${minLength} characters`);
        return false;
    }
    
    showSuccess(input);
    return true;
}

// Real-time Validation for Inputs
function addRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Prevent leading spaces on keypress
        input.addEventListener('keypress', function(e) {
            if (this.value.length === 0 && e.key === ' ') {
                e.preventDefault();
            }
        });
        
        // Validate on blur
        input.addEventListener('blur', function() {
            const id = this.id;
            
            if (id === 'firstName') {
                validateName(this, 'First name');
            } else if (id === 'lastName') {
                validateName(this, 'Last name');
            } else if (id === 'name') {
                validateName(this, 'Full name');
            } else if (id === 'email' || id === 'regEmail') {
                validateEmail(this);
            } else if (id === 'phone') {
                validatePhone(this);
            } else if (id === 'password') {
                validatePassword(this);
            } else if (id === 'regPassword') {
                validatePassword(this);
            } else if (id === 'confirmPassword') {
                const originalPassword = document.getElementById('regPassword').value;
                validatePassword(this, true, originalPassword);
            } else if (id === 'subject') {
                validateSelect(this, 'subject');
            } else if (id === 'message') {
                validateMessage(this, 'Message', 10);
            }
        });
        
        // Clear error on input
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                const formGroup = this.closest('.form-group') || this.closest('.col-md-6') || this.parentElement;
                const error = formGroup.querySelector('.error-message');
                if (error) error.remove();
                this.classList.remove('is-invalid');
            }
        });
    });
}

// Phone Number Formatting and Validation
function setupPhoneValidation(phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove non-numeric characters
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        this.value = value;
    });
    
    phoneInput.addEventListener('keypress', function(e) {
        // Only allow numbers
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab') {
            e.preventDefault();
        }
    });
}

/* ==========================================
   LOGIN FORM VALIDATION
   ========================================== */

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    addRealTimeValidation(loginForm);
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors(this);
        
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        
        if (isEmailValid && isPasswordValid) {
            console.log('Login form is valid');
            alert('Login successful! Redirecting...');
            setTimeout(() => window.location.href = 'index.html', 1000);
        } else {
            // Focus on first invalid field
            const firstInvalid = this.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
}

/* ==========================================
   REGISTER FORM VALIDATION
   ========================================== */

const registerForm = document.getElementById('registerForm');
if (registerForm) {
    addRealTimeValidation(registerForm);
    
    // Setup phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        setupPhoneValidation(phoneInput);
    }
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors(this);
        
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('regEmail');
        const phone = document.getElementById('phone');
        const password = document.getElementById('regPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const terms = document.getElementById('terms');
        
        const isFirstNameValid = validateName(firstName, 'First name');
        const isLastNameValid = validateName(lastName, 'Last name');
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validatePassword(confirmPassword, true, password.value);
        
        let isTermsValid = true;
        if (!terms.checked) {
            alert('Please accept the Terms & Conditions');
            isTermsValid = false;
        }
        
        if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && 
            isPasswordValid && isConfirmPasswordValid && isTermsValid) {
            console.log('Registration form is valid');
            alert('Registration successful! Please check your email.');
            setTimeout(() => window.location.href = 'login.html', 1000);
        } else {
            // Focus on first invalid field
            const firstInvalid = this.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
}

/* ==========================================
   CONTACT FORM VALIDATION
   ========================================== */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    addRealTimeValidation(contactForm);
    
    // Setup phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        setupPhoneValidation(phoneInput);
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors(this);
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        const isNameValid = validateName(name, 'Full name');
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isSubjectValid = validateSelect(subject, 'subject');
        const isMessageValid = validateMessage(message, 'Message', 10);
        
        if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
            console.log('Contact form is valid');
            alert('Message sent successfully! We will contact you soon.');
            this.reset();
            clearErrors(this);
        } else {
            // Focus on first invalid field
            const firstInvalid = this.querySelector('.is-invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
}
