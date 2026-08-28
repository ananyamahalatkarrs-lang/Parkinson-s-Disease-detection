import React from 'react';
import './Card.css';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export const MetricCard: React.FC<{ title: string; value: string | number; description?: string; highlight?: boolean }> = ({ title, value, description, highlight }) => {
  return (
    <div className={`metric-card ${highlight ? 'highlight' : ''}`}>
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      {description && <div className="metric-description">{description}</div>}
    </div>
  );
}
