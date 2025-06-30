import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className: string;
  context: string;
}

// Card Component
export const Card: React.FC<CardProps> = ({
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
