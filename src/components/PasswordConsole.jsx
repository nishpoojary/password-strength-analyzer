import { useState } from 'react';
import { strengthLabel } from '../lib/analyze';

const SEGMENT_COUNT = 20;

export default function PasswordConsole({ password, onChange, result }) {
  const [visible, setVisible] = useState(false);
  const strength = strengthLabel(result.score);
  const litCount = Math.round((result.score / 100) * SEGMENT_COUNT);

  return (
    <div className="prompt-box">
      <div className="prompt-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="prompt-bar-label">analyzer.sh</span>
      </div>

      <div className="prompt-input-row">
        <span className="chevron">&gt;</span>
        <input
          id="pwInput"
          type={visible ? 'text' : 'password'}
          autoComplete="off"
          spellCheck="false"
          placeholder="enter a password to analyze"
          value={password}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="button" className="toggle-vis" onClick={() => setVisible((v) => !v)}>
          {visible ? 'HIDE' : 'SHOW'}
        </button>
      </div>

      <div className="clearance-row">
        <div className={`clearance-badge tone-${strength.tone}`}>{strength.clearance}</div>
        <div className="segments">
          {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`segment ${i < litCount ? `tone-${strength.tone}` : ''}`}
            />
          ))}
        </div>
        <div className="score-num">{result.score}/100</div>
      </div>
    </div>
  );
}
