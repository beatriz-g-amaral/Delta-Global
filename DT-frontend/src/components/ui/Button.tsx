import { type ButtonHTMLAttributes, forwardRef } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', variant = 'primary', isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`button button-${variant} ${className} ${isLoading ? 'loading' : ''}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <span className="button-content">
            <span className="spinner"></span>
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
