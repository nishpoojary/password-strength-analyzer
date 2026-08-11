import { useEffect, useState } from 'react';
import { generatePassword } from '../lib/generator';

const OPTION_LABELS = [
  { key: 'upper', label: 'A–Z' },
  { key: 'lower', label: 'a–z' },
  { key: 'digits', label: '0–9' },
  { key: 'symbols', label: '!@#$' },
];

export default function Generator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const regenerate = () => setOutput(generatePassword(length, options));

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, options]);

  const toggleOption = (key) => {
    const activeCount = Object.values(options).filter(Boolean).length;
    if (options[key] && activeCount === 1) return; // keep at least one active
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="gen-panel">
      <div className="gen-output">
        <span id="genOutput">{output || '—'}</span>
        <button type="button" className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copy}>
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>

      <div className="gen-controls">
        <div className="gen-row">
          <label htmlFor="lenSlider">Length</label>
          <span className="len-val">
            <span>{length}</span> chars
          </span>
        </div>
        <input
          id="lenSlider"
          type="range"
          min="8"
          max="40"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
        />

        <div className="toggles">
          {OPTION_LABELS.map(({ key, label }) => (
            <div
              key={key}
              className={`toggle-chip ${options[key] ? 'active' : ''}`}
              onClick={() => toggleOption(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleOption(key)}
            >
              {label}
            </div>
          ))}
        </div>

        <button type="button" className="regen-btn" onClick={regenerate}>
          ↻ GENERATE NEW PASSWORD
        </button>
      </div>
    </div>
  );
}
