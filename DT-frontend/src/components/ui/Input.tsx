import { type InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="input-container">
        {label && (
          <label className="input-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`input-field ${error ? 'input-error-border' : ''} ${className}`}
          {...props}
        />
        {error && (
          <span className="input-error-message">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
