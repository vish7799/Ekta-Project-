import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { COMPANY_INFO } from '../../data/companyData';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Industries', path: '/industries' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'bg-ekta-surface/95 backdrop-blur-md border-b border-ekta-border shadow-sm'
          : 'bg-ekta-surface/90 backdrop-blur-sm border-b border-ekta-border'
      }`}
    >
      {/* Engineering Corporate Telemetry Strip */}
      <div className="bg-ekta-elevated border-b border-ekta-border text-[11px] font-mono py-1 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-ekta-secondary">
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center text-brand-green font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-brand-green" />
              Class-A Licensed Contractor (Est. 1983)
            </span>
            <span className="text-ekta-muted">|</span>
            <span>
              GSTIN: <strong className="text-ekta-text">{COMPANY_INFO.gstin}</strong>
            </span>
            <span className="text-ekta-muted">|</span>
            <span className="text-ekta-muted">COORD: {COMPANY_INFO.coordinates}</span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href="tel:+919899442333"
              className="hover:text-brand-green flex items-center transition-colors"
            >
              <PhoneCall className="w-3 h-3 mr-1.5 text-brand-green" />
              Direct Line: +91 9899442333
            </a>
            <span className="text-ekta-muted">|</span>
            <a
              href="https://wa.me/919899442333"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:underline font-medium"
            >
              24/7 Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity / Logo */}
          <Link to="/" className="group flex items-center gap-3 min-w-0">
            <img
              src="/logo.png"
              alt="EKTA ELECTRICAL WORKS logo"
              className="h-10 w-10 shrink-0 rounded-full border border-ekta-border bg-white object-contain shadow-sm transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14"
            />
            <div className="hidden min-w-0 sm:flex sm:flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base font-extrabold tracking-tight text-ekta-text leading-none sm:text-lg">
                  EKTA <span className="text-brand-green">ELECTRICAL</span>
                </span>
                <span className="rounded bg-brand-green/10 px-1 py-0.5 text-[10px] font-mono font-semibold text-brand-green">
                  CLASS-A
                </span>
              </div>
              <span className="mt-1 text-[10px] font-mono uppercase tracking-widest text-ekta-muted">
                Industrial Power Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-all duration-150 relative rounded-sm ${
                    isActive
                      ? 'text-brand-green font-semibold'
                      : 'text-ekta-secondary hover:text-ekta-text hover:bg-ekta-elevated/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-green rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions & Theme Switcher */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeSwitcher />
            <Button
              to="/contact"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
            >
              GET A QUOTE
            </Button>
          </div>

          {/* Mobile Actions & Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-ekta-secondary hover:text-ekta-text hover:bg-ekta-elevated rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-green"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-ekta-surface border-b border-ekta-border shadow-2xl animate-fade-in">
          <div className="px-4 pt-3 pb-6 space-y-1">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-ekta-muted border-b border-ekta-border mb-2">
              Engineering Navigation
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 text-base font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'bg-brand-green/10 text-brand-green font-semibold'
                      : 'text-ekta-text hover:bg-ekta-elevated'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs text-ekta-muted">→</span>
              </NavLink>
            ))}

            <div className="pt-4 border-t border-ekta-border space-y-2.5">
              <Button
                to="/contact"
                variant="primary"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                REQUEST TECHNICAL QUOTE
              </Button>

              <a
                href="tel:+919899442333"
                className="w-full flex items-center justify-center py-2.5 px-4 text-xs font-mono font-medium rounded-sm border border-ekta-border bg-ekta-elevated text-ekta-text hover:bg-ekta-surface transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-2 text-brand-green" />
                CALL DESK: +91 9899442333
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
