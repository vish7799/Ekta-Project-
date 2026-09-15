import React from 'react';
import { ExternalLink, Menu } from 'lucide-react';

const PUBLIC_SITE_URL =
  import.meta.env.VITE_PUBLIC_SITE_URL || 'https://frontend-five-sepia-67.vercel.app/';

export const AdminHeader = ({ title = 'Dashboard', onToggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-admin-800 bg-admin-900/70 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded border border-admin-700 bg-admin-950 p-2 text-admin-300 transition-colors hover:border-admin-600 hover:text-white lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        <a
          href={PUBLIC_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded border border-amber-500/30 bg-amber-500/10 px-2.5 py-1.5 text-[10px] font-mono text-amber-400 transition-colors hover:text-amber-300 sm:text-xs"
        >
          <span className="hidden sm:inline">View Public Website</span>
          <span className="sm:hidden">Website</span>
          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
};