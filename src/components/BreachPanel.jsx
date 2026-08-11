function buildSuggestions(checks, length) {
  if (length === 0) {
    return ['Start typing above to get personalized suggestions.'];
  }

  const tips = [];
  if (!checks.notCommon)
    tips.push('This exact password appears in known breach lists — change it immediately, especially if reused anywhere.');
  if (!checks.length12)
    tips.push('Extend it to at least 12–16 characters; length is the single biggest factor in resisting brute force.');
  if (!checks.upper) tips.push('Mix in an uppercase letter.');
  if (!checks.lower) tips.push('Mix in a lowercase letter.');
  if (!checks.digit) tips.push('Add at least one number.');
  if (!checks.special) tips.push('Add a special character like ! ? # or %.');
  if (!checks.noSequential)
    tips.push('Avoid sequential runs like "abc" or "123" — they\'re among the first patterns attackers try.');
  if (!checks.noKeyboard) tips.push('Avoid keyboard-walk patterns like "qwerty" or "1qaz".');
  if (!checks.noDictionary)
    tips.push('Avoid plain dictionary words — try an unrelated multi-word passphrase instead.');
  if (!checks.noRepeat) tips.push('Avoid repeating the same character three or more times in a row.');
  if (tips.length === 0)
    tips.push('Solid password. Consider a unique passphrase of 4+ random words for even stronger, easier-to-remember security.');

  return tips;
}

export default function BreachPanel({ result }) {
  const { checks, length } = result;
  const suggestions = buildSuggestions(checks, length);

  return (
    <>
      {length > 0 && (
        <div className={`banner ${checks.notCommon ? 'ok' : 'danger'}`}>
          {checks.notCommon
            ? '✓ Not found in the sample breach list.'
            : '⚠ This password matches a known commonly-breached password. It offers essentially no protection.'}
        </div>
      )}
      <ul className="suggestions">
        {suggestions.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </>
  );
}
