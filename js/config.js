// Configuration and constants for the decoder
// Example strings that demonstrate different encoding types
const examples = [
    { text: "V3JpdGUtSG9zdCAiTWFsaWNpb3VzIGNvZGUgZGV0ZWN0ZWQi", cipher: "base64" },
    { text: "49 6e 76 6f 6b 65 2d 57 65 62 52 65 71 75 65 73 74", cipher: "hex" },
    { text: "cmd.exe%20%2Fc%20%22whoami%22", cipher: "url" },
    { text: "01001000 01100001 01100011 01101011", cipher: "binary" }
// List of potentially dangerous commands that might indicate malicious intent
// Used for threat detection in decoded output
const dangerousCommands = [
    'Invoke-WebRequest', 'IWR', 'wget', 'curl',
    'Invoke-Expression', 'IEX',
    'DownloadString', 'DownloadFile',
    'Start-Process',
    'net user', 'net localgroup',
    'reg add', 'reg delete',
    'schtasks', 'at.exe',
    'wmic', 'certutil', 'bitsadmin',
    'powershell', 'cmd.exe',
    'rundll32', 'mshta',
    'whoami', 'systeminfo'
];

// Morse code lookup table for encoding and decoding
const morseToChar = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
    '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
    '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
    '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
    '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
    '--..': 'Z', '-----': '0', '.----': '1', '..---': '2', '...--': '3',
    '....-': '4', '.....': '5', '-....': '6', '--...': '7', '---..': '8',
    '----.': '9', '/': ' '
};

const charToMorse = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', ' ': '/'
};
