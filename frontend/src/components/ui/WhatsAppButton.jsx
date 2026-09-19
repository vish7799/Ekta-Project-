import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

export const WhatsAppButton = () => {
  const settings = useSiteSettings();
  const phoneNumber = String(settings.primaryPhone || '').replace(/\D/g, '');
  const defaultMessage = encodeURIComponent(
    'Hello EKTA ELECTRICAL WORKS, I would like to inquire about your electrical contracting services.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-50 flex min-h-11 max-w-[calc(100vw-2rem)] items-center space-x-2 rounded-full border border-red-400/30 bg-red-600 px-4 py-3 text-white shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5"
      aria-label="Chat on WhatsApp with EKTA ELECTRICAL WORKS"
    >
      <MessageCircle className="w-6 h-6 fill-current text-white" />
      <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
        WhatsApp
      </span>
    </a>
  );
};
