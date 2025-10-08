import "../styles/ProgressBar.css";

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <p>Progreso</p>
        <span className="progress-text">{progress}%</span>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
