import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SectionHeading = ({
  number, // e.g. "01", "02"
  eyebrow, // e.g. "CORE ENGINEERING SERVICES"
  title, // e.g. "Comprehensive High-Voltage & Turnkey Solutions"
  description, // e.g. "From 33kV substation erection to precision switchboard..."
  linkText,
  linkTo,
  align = 'left', // 'left', 'center', 'right', 'split'
  className = '',
}) => {
  if (align === 'split') {
    return (
      <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16 ${className}`}>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            {number && (
              <span className="font-mono text-xs text-brand-green font-bold tracking-wider">
                {number} //
              </span>
            )}
            {eyebrow && (
              <span className="font-mono text-xs uppercase tracking-widest text-ekta-muted font-semibold">
                {eyebrow}
              </span>
            )}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ekta-text leading-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-lg text-ekta-secondary leading-relaxed max-w-xl">
              {description}
            </p>
          )}
        </div>
        {linkText && linkTo && (
          <Link
            to={linkTo}
            className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-dark transition-colors group whitespace-nowrap self-start lg:self-end pb-1"
          >
            <span>{linkText}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    );
  }

  const alignStyles = {
    left: 'text-left max-w-3xl',
    center: 'text-center mx-auto max-w-3xl',
    right: 'text-right ml-auto max-w-3xl',
  };

  return (
    <div className={`mb-12 md:mb-16 ${alignStyles[align] || alignStyles.left} ${className}`}>
      <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
        {number && (
          <span className="font-mono text-xs text-brand-green font-bold tracking-wider">
            {number} //
          </span>
        )}
        {eyebrow && (
          <span className="font-mono text-xs uppercase tracking-widest text-ekta-muted font-semibold">
            {eyebrow}
          </span>
        )}
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ekta-text leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-ekta-secondary leading-relaxed">
          {description}
        </p>
      )}

      {linkText && linkTo && (
        <div className="mt-6">
          <Link
            to={linkTo}
            className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-dark transition-colors group"
          >
            <span>{linkText}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
};
