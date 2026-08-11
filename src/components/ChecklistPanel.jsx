export default function ChecklistPanel({ checks, length }) {
  const items = [
    {
      label:
        length === 0
          ? '12+ characters'
          : checks.length12
          ? '12+ characters'
          : checks.length8
          ? '8+ chars (12+ recommended)'
          : 'Too short',
      ok: checks.length12,
      warnOnly: checks.length8 && !checks.length12,
    },
    { label: 'Uppercase letter', ok: checks.upper },
    { label: 'Lowercase letter', ok: checks.lower },
    { label: 'Number', ok: checks.digit },
    { label: 'Special character', ok: checks.special },
    { label: 'No repeated characters (aaa)', ok: checks.noRepeat },
    { label: 'No sequential runs (abc, 123)', ok: checks.noSequential },
    { label: 'No keyboard pattern (qwerty)', ok: checks.noKeyboard },
    { label: 'No common dictionary word', ok: checks.noDictionary },
    { label: 'Not a known leaked password', ok: checks.notCommon },
  ];

  return (
    <div className="checklist">
      {items.map((item, i) => (
        <div
          key={i}
          className={`check-item ${item.ok ? 'pass' : item.warnOnly ? 'warn' : 'fail'}`}
        >
          <span className="mark">{item.ok ? '✓' : item.warnOnly ? '!' : '·'}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
