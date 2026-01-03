// Main application logic and UI handlers

// Load an example into the decode section
function loadExample(index) {
    const example = examples[index];
    document.getElementById('decodeInput').value = example.text;
    document.getElementById('decodeCipher').value = example.cipher;
}

// Perform decoding based on selected cipher
function performDecode() {
    const input = document.getElementById('decodeInput').value.trim();
    const cipher = document.getElementById('decodeCipher').value;
    
    if (!input) {
        displayDecodeOutput('Please enter something to decode first');
        return;
    }

    let result;
    try {
        // Route to the appropriate decoder
        switch(cipher) {
            case 'base64':
                result = decodeBase64(input);
                break;
            case 'hex':
                result = decodeHex(input);
                break;
            case 'url':
                result = decodeURL(input);
                break;
            case 'rot13':
                result = decodeROT13(input);
                break;
            case 'binary':
                result = decodeBinary(input);
                break;
            case 'ascii':
                result = decodeASCII(input);
                break;
            case 'morse':
                result = decodeMorse(input);
                break;
            case 'reverse':
                result = decodeReverse(input);
                break;
            case 'caesar':
                result = decodeCaesar(input);
                break;
            case 'atbash':
                result = decodeAtbash(input);
                break;
            default:
                result = 'Unknown cipher type';
        }
        
        displayDecodeOutput(result);
        checkForThreats(result);
    } catch (e) {
        displayDecodeOutput('Decoding failed: ' + e.message);
    }
}

// Try decoding with all available methods
function autoDetectDecode() {
    const input = document.getElementById('decodeInput').value.trim();
    if (!input) {
        displayDecodeOutput('Please enter something first');
        return;
    }

    let results = '=== AUTO-DETECTION RESULTS ===\n\n';
    
    const methods = ['base64', 'hex', 'url', 'rot13', 'binary', 'ascii', 'morse', 'reverse', 'caesar', 'atbash'];
    
    methods.forEach(method => {
        try {
            let decoded;
            // Call the appropriate decoder
            switch(method) {
                case 'base64': decoded = decodeBase64(input); break;
                case 'hex': decoded = decodeHex(input); break;
                case 'url': decoded = decodeURL(input); break;
                case 'rot13': decoded = decodeROT13(input); break;
                case 'binary': decoded = decodeBinary(input); break;
                case 'ascii': decoded = decodeASCII(input); break;
                case 'morse': decoded = decodeMorse(input); break;
                case 'reverse': decoded = decodeReverse(input); break;
                case 'caesar': decoded = decodeCaesar(input); break;
                case 'atbash': decoded = decodeAtbash(input); break;
            }
            
            // Only show results that contain readable ASCII characters
            if (decoded && /[\x20-\x7E]/.test(decoded)) {
                results += `${method.toUpperCase()}:\n${decoded}\n\n`;
            }
        } catch (e) {
            // Silently skip failed decodings
        }
    });
    
    displayDecodeOutput(results);
}

// Perform encoding based on selected cipher
function performEncode() {
    const input = document.getElementById('encodeInput').value.trim();
    const cipher = document.getElementById('encodeCipher').value;
    
    if (!input) {
        displayEncodeOutput('Please enter text to encode');
        return;
    }

    let result;
    try {
        // Route to the appropriate encoder
        switch(cipher) {
            case 'base64':
                result = btoa(input);
                break;
            case 'hex':
                result = encodeHex(input);
                break;
            case 'url':
                result = encodeURIComponent(input);
                break;
            case 'rot13':
                result = decodeROT13(input); // ROT13 is its own inverse
                break;
            case 'binary':
                result = encodeBinary(input);
                break;
            case 'ascii':
                result = encodeASCII(input);
                break;
            case 'morse':
                result = encodeMorse(input);
                break;
            case 'reverse':
                result = input.split('').reverse().join('');
                break;
            case 'caesar':
                result = encodeCaesar(input);
                break;
            case 'atbash':
                result = decodeAtbash(input); // Atbash is also its own inverse
                break;
            default:
                result = 'Unknown cipher type';
        }
        
        displayEncodeOutput(result);
    } catch (e) {
        displayEncodeOutput('Encoding failed: ' + e.message);
    }
}

// Encode input with all available methods
function encodeAll() {
    const input = document.getElementById('encodeInput').value.trim();
    if (!input) {
        displayEncodeOutput('Please enter text first');
        return;
    }

    let results = '=== ENCODED WITH ALL CIPHERS ===\n\n';
    
    try {
        results += `Base64:\n${btoa(input)}\n\n`;
        results += `Hexadecimal:\n${encodeHex(input)}\n\n`;
        results += `URL Encoded:\n${encodeURIComponent(input)}\n\n`;
        results += `ROT13:\n${decodeROT13(input)}\n\n`;
        results += `Binary:\n${encodeBinary(input)}\n\n`;
        results += `ASCII Decimal:\n${encodeASCII(input)}\n\n`;
        results += `Morse Code:\n${encodeMorse(input)}\n\n`;
        results += `Reversed:\n${input.split('').reverse().join('')}\n\n`;
        results += `Caesar (shift 3):\n${encodeCaesar(input)}\n\n`;
        results += `Atbash:\n${decodeAtbash(input)}\n\n`;
    } catch (e) {
        results += '\nSome encodings failed: ' + e.message;
    }
    
    displayEncodeOutput(results);
}

// Scan decoded text for potentially dangerous commands
function checkForThreats(decodedText) {
    const warnings = [];
    const lowerText = decodedText.toLowerCase();

    // Check against known dangerous command patterns
    dangerousCommands.forEach(cmd => {
        if (lowerText.includes(cmd.toLowerCase())) {
            warnings.push(`Found: <strong>${cmd}</strong>`);
        }
    });

    const warningsDiv = document.getElementById('decodeWarnings');
    if (warnings.length > 0) {
        warningsDiv.innerHTML = `
            <div class="warning">
                <div class="warning-title">SUSPICIOUS CONTENT DETECTED</div>
                ${warnings.join('<br>')}
                <div style="margin-top: 12px; font-size: 0.9em;">
                    This decoded content contains commands often seen in malicious scripts.
                    Proceed with extreme caution and verify the source before executing.
                </div>
            </div>
        `;
    } else {
        warningsDiv.innerHTML = '';
    }
}

// Update the decode output display
function displayDecodeOutput(text) {
    document.getElementById('decodeOutputText').textContent = text;
}

// Update the encode output display
function displayEncodeOutput(text) {
    document.getElementById('encodeOutputText').textContent = text;
}

// Copy output text to clipboard
function copyOutput(type) {
    const textElement = type === 'decode' ? 
        document.getElementById('decodeOutputText') : 
        document.getElementById('encodeOutputText');
    const text = textElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        // Reset after 2 seconds
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}
