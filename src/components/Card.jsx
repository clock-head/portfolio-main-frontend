import React from 'react';
import './Card.css';

// Card Component
export const Card = ({
  title,
  subtitle,
  children,
  // layout = 'flex',
  footer = null,
  className = '',
  context = 'default-card',
}) => {
  return (
    <div className={`card-container ${context} ${className}`.trim()}>
      {(title || subtitle) && (
        <header className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </header>
      )}
      <div className="card-body">{children}</div>
      {footer && <footer className="card-footer">{footer}</footer>}
    </div>
  );
};
