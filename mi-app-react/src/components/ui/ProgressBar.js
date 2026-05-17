// src/components/ui/ProgressBar.js
import './ProgressBar.css';

export const ProgressBar = ({ value = 70 }) => {
  return (
    <div className="progress">
      <div className="progress-bar" style={{ width: `${value}%` }}></div>
    </div>
  );
};