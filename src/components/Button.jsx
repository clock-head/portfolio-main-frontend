import React from 'react';
import './Button.css';

// Atomic Component: Button
const Button = ({
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
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    carousel: 'btn-carousel',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={tabIndex}
      className={`${baseStyles} ${variantStyles[variant]} intent-${intent} ${className}`.trim()}
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
