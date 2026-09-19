import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Industries', path: '/industries' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        isScrolled
          ? 'border-b border-ekta-border bg-ekta-surface/95 backdrop-blur-md shadow-sm'
          : 'border-b border-ekta-border bg-ekta-surface/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl min-w-0 overflow-x-clip px-3 sm:px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2 sm:h-20 sm:gap-3">
          <Link to="/" className="group flex min-w-0 max-w-[48vw] shrink items-center gap-2.5 sm:max-w-none sm:gap-3" aria-label="EKTA ELECTRICAL WORKS home">
            <img
              src="/logo.png"
              alt="EKTA ELECTRICAL WORKS logo"
              className="h-10 w-10 shrink-0 rounded-full border border-ekta-border bg-white object-contain shadow-sm transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11"
            />
            <div className="min-w-0">
              <div className="truncate text-sm font-black tracking-tight text-ekta-text sm:text-base lg:text-lg">
                EKTA ELECTRICAL WORKS
              </div>
            </div>
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center lg:flex" aria-label="Main Navigation">
            <div className="flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                      `relative rounded-sm px-2.5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-ekta-secondary hover:text-ekta-text'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-red-600 dark:bg-red-400" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeSwitcher />
            <Button to="/contact" variant="primary" size="sm" icon={ArrowRight} iconPosition="right" className="hidden whitespace-nowrap sm:inline-flex">
              Get Quote
            </Button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-ekta-border bg-ekta-elevated text-ekta-text transition-colors hover:bg-ekta-surface focus:outline-none focus:ring-1 focus:ring-red-500 lg:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-ekta-border bg-ekta-surface lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-3 py-4 sm:px-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-sm px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                      : 'text-ekta-text hover:bg-ekta-elevated'
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="text-xs text-ekta-muted">→</span>
              </NavLink>
            ))}

            <Button
              to="/contact"
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              className="mt-2 w-full"
            >
              Get Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
