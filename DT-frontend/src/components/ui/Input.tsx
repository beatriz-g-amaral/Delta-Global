import { type InputHTMLAttributes, forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, type, className = '', ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="input-container">
        {label && (
          <label className="input-label">
            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
          </label>
        )}
        <div className="input-relative-wrapper">
          <input
            ref={ref}
            type={inputType}
            className={`input-field ${error ? 'input-error-border' : ''} ${isPassword ? 'input-password-padding' : ''} ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <span className="input-error-message">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
