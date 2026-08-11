// Cryptographically secure password generation using the Web Crypto API.
// Avoids visually ambiguous characters (0/O, 1/l/I) by default.

const POOLS = {
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  lower: 'abcdefghijkmnpqrstuvwxyz',
  digits: '23456789',
  symbols: '!@#$%^&*()-_=+?',
};

function secureRandomInt(max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  // Rejection sampling would be more precise for very large `max`; the
  // pool sizes used here are small enough that modulo bias is negligible.
  return arr[0] % max;
}

export function generatePassword(length, options) {
  const activePools = Object.keys(options)
    .filter((key) => options[key])
    .map((key) => POOLS[key]);

  if (activePools.length === 0) return '';

  const fullPool = activePools.join('');
  const result = [];

  // Guarantee at least one character from each selected pool.
  activePools.forEach((pool) => {
    result.push(pool[secureRandomInt(pool.length)]);
  });

  while (result.length < length) {
    result.push(fullPool[secureRandomInt(fullPool.length)]);
  }

  // Fisher–Yates shuffle using the secure RNG.
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.slice(0, length).join('');
}
