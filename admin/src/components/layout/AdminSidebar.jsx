import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, FolderGit2, Mail, Settings, LogOut, Shield, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = ({ isOpen = true, onClose = () => {} }) => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Services', path: '/services', icon: Zap },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Enquiries', path: '/enquiries', icon: Mail },
    { name: 'Site Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/60 transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 -translate-x-full border-r border-admin-800 bg-admin-900/95 shadow-2xl backdrop-blur-md transition-transform duration-200 ease-in-out lg:static lg:w-64 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex h-20 items-center gap-3 border-b border-admin-800 px-4 sm:px-5">
              <img
                src="/guru-kripa-logo.svg"
                alt="Guru Kripa EEW logo"
                className="h-12 w-12 rounded-md border border-amber-500/40 bg-white object-contain shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-[11px] font-black uppercase tracking-[0.2em] text-white">Guru Kripa</h1>
                <span className="block text-[10px] font-mono text-amber-500">EEW Admin</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1.5 text-admin-400 hover:bg-admin-800 hover:text-white lg:hidden"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="space-y-1 p-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center rounded px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-500 text-admin-950 font-semibold'
                          : 'text-admin-300 hover:bg-admin-800 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="mr-3 h-4 w-4 shrink-0" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-admin-800 p-4">
            <div className="mb-3 rounded border border-admin-700 bg-admin-950/60 px-3 py-2">
              <p className="truncate text-xs font-bold text-white">{user?.name || 'Administrator'}</p>
              <p className="truncate text-[10px] text-admin-400">{user?.email || 'admin@ekta.com'}</p>
            </div>
            <button
              onClick={logout}
              className="flex w-full items-center rounded px-4 py-2 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
