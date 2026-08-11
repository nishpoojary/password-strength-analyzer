const NOTES = [
  {
    q: 'Why does length matter more than complexity?',
    a: 'Every extra character multiplies the number of guesses an attacker needs by the size of your character pool. A long passphrase beats a short jumble like "P@55!" because length compounds — one extra character can add more possibilities than swapping cases and symbols around.',
  },
  {
    q: 'What is password entropy?',
    a: 'Entropy measures unpredictability in bits: log2(pool size) × length. It approximates how many guesses, in the worst case, an attacker needs before they\'re likely to find your password. Above ~60 bits is generally considered strong against offline attacks; above ~80 is very strong.',
  },
  {
    q: 'How does password cracking actually work?',
    a: 'Attackers rarely guess randomly. They start with breached password lists, then dictionary words, then common patterns (keyboard walks, leetspeak substitutions, appended digits), and only fall back to full brute force last. This is why "P@ssw0rd1" is weak despite looking complex.',
  },
  {
    q: 'Why do password managers matter?',
    a: 'They let you use a unique, high-entropy password for every account without memorizing any of them, which eliminates the biggest real-world risk: reusing one password across multiple sites so a breach on one leaks access to all of them.',
  },
  {
    q: 'Why enable multi-factor authentication (MFA)?',
    a: 'Even a strong password can be phished or leaked in a breach. MFA adds a second proof of identity — a code, a key, a biometric — so a stolen password alone isn\'t enough to get in.',
  },
];

export default function EducationPanel() {
  return (
    <div className="edu-grid">
      {NOTES.map((note, i) => (
        <details key={i}>
          <summary>{note.q}</summary>
          <p>{note.a}</p>
        </details>
      ))}
    </div>
  );
}
