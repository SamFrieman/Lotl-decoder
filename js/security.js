// Security utilities and input validation

// Sanitize user input to prevent XSS attacks
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    // Remove any potentially dangerous characters while preserving encoding data
    // This is a balance between security and functionality for a decoder tool
    const maxLength = 50000;
    if (input.length > maxLength) {
        input = input.substring(0, maxLength);
    }
    
    return input;
}

// Sanitize output for display to prevent XSS
function sanitizeOutput(output) {
    if (typeof output !== 'string') {
        return '';
    }
    
    // Create a text node to ensure HTML entities are properly escaped
    const div = document.createElement('div');
    div.textContent = output;
    return div.innerHTML;
}

// Validate that input contains only expected characters for a given cipher
function validateCipherInput(input, cipherType) {
    if (!input || typeof input !== 'string') {
        return false;
    }
    
    const validationPatterns = {
        'base64': /^[A-Za-z0-9+/=\s-]*$/,
        'hex': /^[0-9A-Fa-f\s:,-]*$/,
        'binary': /^[01\s]*$/,
        'octal': /^[0-7\s]*$/,
        'decimal': /^[0-9\s,.-]*$/,
        'morse': /^[\.\-\s/]*$/
    };
    
    // If no specific pattern, allow all printable ASCII
    const pattern = validationPatterns[cipherType] || /^[\x20-\x7E\s]*$/;
    return pattern.test(input);
}

// Rate limiting to prevent abuse
const rateLimiter = {
    requests: [],
    maxRequests: 100,
    timeWindow: 60000, // 1 minute
    
    canProceed: function() {
        const now = Date.now();
        // Remove old requests outside the time window
        this.requests = this.requests.filter(time => now - time < this.timeWindow);
        
        if (this.requests.length >= this.maxRequests) {
            return false;
        }
        
        this.requests.push(now);
        return true;
    }
};

// Check if operation should be allowed
function securityCheck(input, operation) {
    // Rate limiting check
    if (!rateLimiter.canProceed()) {
        throw new Error('Rate limit exceeded. Please wait before trying again.');
    }
    
    // Input length check
    if (input.length > 50000) {
        throw new Error('Input too large. Maximum 50,000 characters allowed.');
    }
    
    // Check for obvious script injection attempts
    const dangerousPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi
    ];
    
    for (const pattern of dangerousPatterns) {
        if (pattern.test(input)) {
            throw new Error('Invalid input detected.');
        }
    }
    
    return true;
}
