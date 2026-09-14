import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  to,
  href,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'accent'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-green/40 disabled:opacity-50 disabled:cursor-not-allowed group select-none';

  const variants = {
    primary: 'bg-[#0E7A4A] hover:bg-[#075E38] text-white font-semibold shadow-sm border border-[#0E7A4A]',
    secondary: 'bg-ekta-surface hover:bg-ekta-elevated text-ekta-text border border-ekta-border shadow-sm',
    outline: 'border border-brand-green text-brand-green hover:bg-brand-green/10',
    ghost: 'text-ekta-secondary hover:text-ekta-text hover:bg-ekta-elevated',
    accent: 'bg-brand-orange hover:bg-brand-orange-hover text-stone-950 font-semibold shadow-sm',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs tracking-wider font-mono min-h-[36px]',
    md: 'px-5 py-2.5 text-sm tracking-wide min-h-[44px]',
    lg: 'px-7 py-3.5 text-base tracking-wide min-h-[48px]',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const renderContent = () => (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 mr-2 transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {renderContent()}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {renderContent()}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {renderContent()}
    </button>
  );
};
