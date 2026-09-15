import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '../../theme/ThemeContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { ScrollToTop } from '../ui/ScrollToTop';
import { SiteSettingsProvider } from '../../context/SiteSettingsContext';

// Scroll restoration on route change
const ScrollRestoration = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

export const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <SiteSettingsProvider>
        <div className="min-h-screen flex flex-col bg-ekta-bg text-ekta-text transition-colors duration-200 relative selection:bg-brand-green/20 selection:text-brand-green">
          <ScrollRestoration />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
        </div>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
};
