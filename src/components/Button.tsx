import React from 'react';
import './Button.css';

// Atomic Component: Button
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'carousel'
  | 'signup'
  | 'authSecondary';

type ButtonIntent = '' | 'submit' | 'cancel' | 'danger';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  intent?: ButtonIntent | string;
  ariaLabel?: string;
  disabled?: boolean;
  tabIndex?: number;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // visual intent
  intent = '', // semantic intent: 'submit' | 'cancel' | 'danger'
  ariaLabel,
  disabled = false,
  tabIndex = 0,
  className = '',
}) => {
  const baseStyles = 'btn-base';
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    carousel: 'btn-carousel',
    signup: 'btn-signup',
    authSecondary: 'btn-auth-secondary',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={tabIndex}
      className={`${baseStyles} ${variantStyles[variant]} intent-${intent} ${className} `.trim()}
    >
      {children}
    </button>
  );
};

export default Button;

// Wrapper: ButtonGroup (context-aware layout container)
// export const ButtonGroup = ({ children, layout, className = '' }) => {
//   const layoutClass =
//     layout === 'grid' ? 'button-group-grid' : 'button-group-flex';

//   return (
//     <div
//       className={`button-group ${layoutClass} ${className}`.trim()}
//       role="group"
//     >
//       {children}
//     </div>
//   );
// };
