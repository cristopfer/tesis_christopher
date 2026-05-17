// src/components/ui/Button.js
import './Button.css';

export const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClass = variant === 'back' ? 'btn-back' : 'btn-primary';
  
  return (
    <button 
      className={`${baseClass} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};