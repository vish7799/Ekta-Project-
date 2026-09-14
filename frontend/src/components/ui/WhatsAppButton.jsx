import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const phoneNumber = '919899442333';
  const defaultMessage = encodeURIComponent(
    'Hello EKTA ELECTRICAL WORKS, I would like to inquire about your electrical contracting services.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-glow group border border-emerald-400/30"
      aria-label="Chat on WhatsApp with EKTA ELECTRICAL WORKS"
    >
      <MessageCircle className="w-6 h-6 fill-current text-white" />
      <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
        WhatsApp
      </span>
    </a>
  );
};
