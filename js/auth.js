// ==========================================
// PASSWORD TOGGLE FUNCTIONALITY
// ==========================================
function togglePasswordVisibility(inputId, toggleBtnId) {
    const input = document.getElementById(inputId);
    const toggleBtn = document.getElementById(toggleBtnId);
    
    if (toggleBtn && input) {
        toggleBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
}

togglePasswordVisibility('loginPassword', 'toggleLoginPassword');
togglePasswordVisibility('registerPassword', 'toggleRegisterPassword');
togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');

// ==========================================
// LOGIN FORM VALIDATION
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        if (email && password) {
            console.log('Login Data:', { email, password, rememberMe });
            alert('Login successful! Redirecting to dashboard...');
            
            // In real application, send data to backend
            // window.location.href = 'dashboard.html';
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ==========================================
// REGISTER FORM VALIDATION
// ==========================================
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        // Password validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
        
        // Terms validation
        if (!agreeTerms) {
            alert('Please agree to Terms & Conditions.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        if (firstName && lastName && email && phone && password) {
            console.log('Register Data:', { 
                firstName, 
                lastName, 
                email, 
                phone, 
                password 
            });
            alert('Registration successful! Please check your email to verify your account.');
            
            // In real application, send data to backend
            // window.location.href = 'login.html';
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// ==========================================
// SOCIAL LOGIN HANDLERS
// ==========================================
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Google login will be implemented with OAuth 2.0');
        // In real application: window.location.href = 'your-google-oauth-url';
    });
});

const facebookBtns = document.querySelectorAll('.facebook-btn');
facebookBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Facebook login will be implemented with Facebook SDK');
        // In real application: window.location.href = 'your-facebook-oauth-url';
    });
});
