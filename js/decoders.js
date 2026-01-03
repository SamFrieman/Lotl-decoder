// Decoding functions for all supported cipher methods

// Base64 decoder - handles standard base64 and PowerShell encoded commands
function decodeBase64(input) {
    let base64String = input;
    // PowerShell often uses "-enc" flag before base64 data
    if (input.toLowerCase().includes('-enc')) {
        base64String = input.split(/\s+/).pop();
    }
    return atob(base64String);
}

// Hex decoder - converts hexadecimal pairs back to characters
function decodeHex(input) {
    // Strip out any formatting (spaces, colons, etc)
    const cleanInput = input.replace(/[^0-9A-Fa-f]/g, '');
    // Process pairs of hex digits
    return cleanInput.match(/.{1,2}/g)
        .map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('');
}
