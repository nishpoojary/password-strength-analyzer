import { entropyLabelText, crackEstimates } from '../lib/analyze';

export default function EntropyPanel({ result }) {
  const crack = crackEstimates(result);

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Entropy</div>
          <div className="stat-value violet">{result.entropy.toFixed(1)} bits</div>
          <div className="stat-sub">{entropyLabelText(result.entropy)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Character space</div>
          <div className="stat-value">{result.pool}</div>
          <div className="stat-sub">Possible symbols per position</div>
        </div>
      </div>

      <div className="stat-card crack-card">
        <div className="stat-label">Estimated time to crack</div>
        <table className="crack-table">
          <tbody>
            <tr>
              <td>Fast online guessing (10/sec)</td>
              <td>{crack.online}</td>
            </tr>
            <tr>
              <td>Offline, slow hash (10k/sec)</td>
              <td>{crack.offlineSlow}</td>
            </tr>
            <tr>
              <td>Offline, fast hash / GPU rig (10B/sec)</td>
              <td>{crack.offlineFast}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
