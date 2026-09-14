import React from 'react';
import { ExternalLink } from 'lucide-react';

const PUBLIC_SITE_URL =
  import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:3000';

export const AdminHeader = ({ title = 'Dashboard' }) => {
  return (
    <header className="h-16 bg-admin-900/60 border-b border-admin-800 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md">
      <h1 className="text-lg font-bold text-white tracking-tight">
        {title}
      </h1>

      <div className="flex items-center space-x-4">
        <a
          href={PUBLIC_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center font-mono border border-amber-500/30 px-3 py-1.5 rounded bg-amber-500/10"
        >
          View Public Website
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </a>
      </div>
    </header>
  );
};