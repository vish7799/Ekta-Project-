import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

export const ThemeSwitcher = ({ className = '' }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeOptions = [
    { key: 'light', label: 'Light', icon: Sun, desc: 'Architectural & clean' },
    { key: 'dark', label: 'Dark', icon: Moon, desc: 'Cinematic & technical' },
    { key: 'system', label: 'System', icon: Laptop, desc: 'Match OS setting' },
  ];

  const currentIcon = resolvedTheme === 'dark' ? (
    <Moon className="w-4 h-4 text-red-400" />
  ) : (
    <Sun className="w-4 h-4 text-blue-600" />
  );

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Switch display theme. Current: ${theme} mode`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-sm border border-ekta-border bg-ekta-surface px-2.5 py-1.5 text-xs font-mono font-medium text-ekta-text transition-colors hover:bg-ekta-elevated focus:outline-none focus:ring-1 focus:ring-red-500 sm:min-w-0"
      >
        <span className="flex items-center justify-center w-4 h-4">{currentIcon}</span>
        <span className="hidden sm:inline capitalize">{theme}</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-48 rounded-sm bg-ekta-surface border border-ekta-border shadow-xl z-50 py-1.5 focus:outline-none backdrop-blur-md"
        >
          <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-ekta-muted border-b border-ekta-border mb-1">
            Display Mode
          </div>
          {themeOptions.map(({ key, label, icon: Icon, desc }) => {
            const isSelected = theme === key;
            return (
              <button
                key={key}
                role="menuitem"
                onClick={() => {
                  setTheme(key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400 font-semibold'
                    : 'text-ekta-text hover:bg-ekta-elevated'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 text-ekta-muted" />
                  <div>
                    <div className="leading-none">{label}</div>
                    <div className="text-[10px] text-ekta-muted mt-0.5">{desc}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
