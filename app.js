document.addEventListener('DOMContentLoaded', function() {
    const loginCard = document.querySelector('.login-card');
    const registerCard = document.querySelector('.register-card');
    const nextBtn = document.getElementById('next-btn');
    const registerForm = document.getElementById('register-form');
    const emailInput = document.getElementById('email');
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    
    // Handle next button click
    nextBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // On mobile, hide the login card
            if (window.innerWidth <= 768) {
                loginCard.classList.add('hidden-mobile');
            }
            
            // Show register card
            registerCard.classList.remove('hidden');
            
            // Pre-fill year, month, day with default values
            yearInput.value = '1992';
            monthInput.value = '06';
            dayInput.value = '20';
        } else {
            // Show error for invalid email
            emailInput.style.borderColor = '#e91e63';
            showToast('Please enter a valid email address');
        }
    });
    
    // Handle form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const year = yearInput.value.trim();
        const month = monthInput.value.trim();
        const day = dayInput.value.trim();
        
        if (validateName(firstName) && validateName(lastName) && validateDate(year, month, day)) {
            // Form is valid, show success message
            showToast('Registration successful!', 'success');
            
            // In a real application, you would submit the form data to a server here
            console.log({
                email: emailInput.value,
                firstName,
                lastName,
                dob: `${year}-${month}-${day}`
            });
            
            // Reset form
            registerForm.reset();
            emailInput.value = '';
            
            // Hide register card and show login card
            registerCard.classList.add('hidden');
            loginCard.classList.remove('hidden-mobile');
        }
    });
    
    // Input validation for year, month, day
    yearInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 4) {
            monthInput.focus();
        }
    });
    
    monthInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 2) {
            dayInput.focus();
        }
    });
    
    dayInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    
    // Validation functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validateName(name) {
        return name.length > 1;
    }
    
    function validateDate(year, month, day) {
        // Basic validation
        if (!/^\d{4}$/.test(year) || !/^\d{1,2}$/.test(month) || !/^\d{1,2}$/.test(day)) {
            showToast('Please enter a valid date');
            return false;
        }
        
        // Convert to numbers
        const y = parseInt(year);
        const m = parseInt(month) - 1; // JavaScript months are 0-11
        const d = parseInt(day);
        
        // Create date object and check if it's valid
        const date = new Date(y, m, d);
        
        if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) {
            showToast('Please enter a valid date');
            return false;
        }
        
        // Check if date is not in the future and person is at least 13 years old
        const now = new Date();
        const thirteenYearsAgo = new Date();
        thirteenYearsAgo.setFullYear(now.getFullYear() - 13);
        
        if (date > now) {
            showToast('Date cannot be in the future');
            return false;
        }
        
        return true;
    }
    
    // Toast notification function
    function showToast(message, type = 'error') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        // Add toast to body
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Add toast styles
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: #f44336;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 1000;
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .toast.success {
            background-color: #4CAF50;
        }
        
        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});