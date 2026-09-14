import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = true,
  interactive = false,
  cornerMarks = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`ekta-card p-6 md:p-8 ${hover ? 'hover:-translate-y-1' : ''} ${
        interactive ? 'cursor-pointer' : ''
      } ${cornerMarks ? 'tech-corner-marks' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Badge = ({ children, variant = 'green', className = '' }) => {
  const variants = {
    green: 'bg-brand-green/10 text-brand-green border-brand-green/25',
    teal: 'bg-brand-teal/10 text-brand-teal border-brand-teal/25',
    orange: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
    amber: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30', // backwards compatibility
    slate: 'bg-ekta-elevated text-ekta-secondary border-ekta-border',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-mono font-medium uppercase tracking-widest border rounded-sm ${
        variants[variant] || variants.green
      } ${className}`}
    >
      {children}
    </span>
  );
};
