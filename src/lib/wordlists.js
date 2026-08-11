// Small illustrative sample lists for client-side pattern detection.
// Not exhaustive — a production system would check against a full
// breached-credential database server-side.

export const COMMON_PASSWORDS = [
  '123456', 'password', '123456789', '12345678', '12345', 'qwerty', 'abc123',
  '111111', '1234567', 'password1', '12345678910', '1234567890', 'letmein',
  'admin', 'welcome', 'monkey', 'login', 'princess', 'qwerty123', 'solo',
  'passw0rd', 'starwars', 'dragon', 'freedom', 'whatever', 'qazwsx',
  'trustno1', '666666', 'iloveyou', 'football', 'baseball', 'master',
  'superman', 'access', 'shadow', 'batman', 'michael', '696969', 'admin123',
  'charlie', 'aa123456', 'donald', 'password123', '1q2w3e4r', 'sunshine',
  'hottie', 'loveme', 'zaq1zaq1', 'hello', 'harley', 'ranger', 'jordan23',
  'hunter', 'fuckyou', 'asdfgh', '1qaz2wsx', 'killer', 'liverpool', 'flower',
  'hockey', 'george', 'asshole', 'computer', 'michelle', 'jessica', 'pepper',
  '1111', 'zxcvbn', '555555', '11111111', '131313', '121212', 'test',
  'summer', 'internet', 'service', 'canada', 'cheese',
];

export const DICTIONARY_WORDS = [
  'password', 'dragon', 'monkey', 'football', 'baseball', 'letmein',
  'welcome', 'princess', 'sunshine', 'superman', 'batman', 'master',
  'shadow', 'freedom', 'whatever', 'trustno', 'admin', 'login', 'starwars',
  'hunter', 'summer', 'winter', 'spring', 'autumn', 'love', 'hello',
  'qwerty', 'iloveyou',
];

export const KEYBOARD_PATTERNS = [
  'qwerty', 'asdf', 'zxcv', 'qazwsx', '1qaz', 'qwertyuiop', 'asdfghjkl',
  'zxcvbnm', '1234567890',
];
