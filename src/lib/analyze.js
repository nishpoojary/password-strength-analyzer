import { COMMON_PASSWORDS, DICTIONARY_WORDS, KEYBOARD_PATTERNS } from './wordlists';

function hasSequential(pw) {
  const seqs = ['abcdefghijklmnopqrstuvwxyz', '0123456789'];
  const lower = pw.toLowerCase();
  for (const seq of seqs) {
    for (let i = 0; i <= seq.length - 3; i++) {
      const fwd = seq.substring(i, i + 3);
      const rev = fwd.split('').reverse().join('');
      if (lower.includes(fwd) || lower.includes(rev)) return true;
    }
  }
  return false;
}

function hasRepeats(pw) {
  return /(.)\1\1/.test(pw);
}

function hasKeyboardPattern(pw) {
  const lower = pw.toLowerCase();
  return KEYBOARD_PATTERNS.some((p) => lower.includes(p));
}

function hasDictionaryWord(pw) {
  const lower = pw.toLowerCase();
  return DICTIONARY_WORDS.some((w) => lower.includes(w));
}

function isCommonPassword(pw) {
  return COMMON_PASSWORDS.includes(pw.toLowerCase());
}

export function poolSize(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;
  return pool;
}

export function formatDuration(seconds) {
  if (!isFinite(seconds)) return 'effectively never';
  if (seconds < 1) return 'instantly';
  const units = [
    ['centuries', 60 * 60 * 24 * 365 * 100],
    ['years', 60 * 60 * 24 * 365],
    ['days', 60 * 60 * 24],
    ['hours', 60 * 60],
    ['minutes', 60],
    ['seconds', 1],
  ];
  for (const [label, size] of units) {
    const val = seconds / size;
    if (val >= 1) {
      if (label === 'centuries' && val > 1e6) return 'longer than the age of the universe';
      return `${Math.round(val).toLocaleString()} ${label}`;
    }
  }
  return 'instantly';
}

export function analyzePassword(pw) {
  const checks = {
    length12: pw.length >= 12,
    length8: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    digit: /[0-9]/.test(pw),
    special: /[^a-zA-Z0-9]/.test(pw),
    noRepeat: !hasRepeats(pw),
    noSequential: !hasSequential(pw),
    noKeyboard: !hasKeyboardPattern(pw),
    noDictionary: !hasDictionaryWord(pw),
    notCommon: !isCommonPassword(pw),
  };

  const pool = poolSize(pw);
  const entropy = pw.length > 0 ? pw.length * Math.log2(Math.max(pool, 1)) : 0;

  let score = 0;
  if (pw.length > 0) {
    score += Math.min(pw.length * 4, 40);
    if (checks.upper) score += 8;
    if (checks.lower) score += 8;
    if (checks.digit) score += 8;
    if (checks.special) score += 10;
    if (checks.noRepeat) score += 6;
    if (checks.noSequential) score += 6;
    if (checks.noKeyboard) score += 6;
    if (checks.noDictionary) score += 4;
    if (checks.notCommon) score += 4;
    if (!checks.notCommon) score = Math.min(score, 8);
  }
  score = Math.max(0, Math.min(100, Math.round(score)));

  return { checks, pool, entropy, score, length: pw.length };
}

export function strengthLabel(score) {
  if (score === 0) return { label: 'Unrated', clearance: 'UNRATED', tone: 'neutral' };
  if (score < 25) return { label: 'Very Weak', clearance: 'UNCLASSIFIED', tone: 'danger' };
  if (score < 45) return { label: 'Weak', clearance: 'RESTRICTED', tone: 'danger' };
  if (score < 65) return { label: 'Moderate', clearance: 'CONFIDENTIAL', tone: 'warn' };
  if (score < 85) return { label: 'Strong', clearance: 'SECRET', tone: 'good' };
  return { label: 'Very Strong', clearance: 'TOP SECRET', tone: 'good' };
}

export function entropyLabelText(entropy) {
  if (entropy < 28) return 'Low entropy — crackable quickly';
  if (entropy < 60) return 'Medium entropy';
  if (entropy < 80) return 'High entropy';
  return 'Very high entropy';
}

export function crackEstimates(result) {
  if (result.length === 0) {
    return { online: '—', offlineSlow: '—', offlineFast: '—' };
  }
  if (!result.checks.notCommon) {
    return { online: 'instantly', offlineSlow: 'instantly', offlineFast: 'instantly' };
  }
  const guesses = Math.pow(2, result.entropy) / 2;
  return {
    online: formatDuration(guesses / 10),
    offlineSlow: formatDuration(guesses / 10000),
    offlineFast: formatDuration(guesses / 10000000000),
  };
}
