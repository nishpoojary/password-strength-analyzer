import { useMemo, useState } from 'react';
import PasswordConsole from './components/PasswordConsole';
import ChecklistPanel from './components/ChecklistPanel';
import EntropyPanel from './components/EntropyPanel';
import BreachPanel from './components/BreachPanel';
import Generator from './components/Generator';
import EducationPanel from './components/EducationPanel';
import { analyzePassword } from './lib/analyze';

export default function App() {
  const [password, setPassword] = useState('');
  const result = useMemo(() => analyzePassword(password), [password]);

  return (
    <div className="page">
      <header className="hero">
        <div className="wrap">
          <div className="eyebrow">Security Console</div>
          <h1>Password Strength Analyzer</h1>
          <p className="sub">
            Type a password to see it scored in real time — length, character mix,
            entropy, breach exposure, and estimated crack time. Nothing here leaves
            your browser.
          </p>
          <PasswordConsole password={password} onChange={setPassword} result={result} />
        </div>
      </header>

      <section>
        <div className="wrap">
          <h2>Composition Checks</h2>
          <ChecklistPanel checks={result.checks} length={result.length} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Entropy &amp; Crack Resistance</h2>
          <EntropyPanel result={result} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Breach &amp; Pattern Check</h2>
          <BreachPanel result={result} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Strong Password Generator</h2>
          <Generator />
        </div>
      </section>

      <section className="last-section">
        <div className="wrap">
          <h2>Security Notes</h2>
          <EducationPanel />
        </div>
      </section>

      <footer>
        Client-side analysis only — no password is transmitted or stored. Breach list
        is a small illustrative sample, not a full leaked-credential database.
      </footer>
    </div>
  );
}
