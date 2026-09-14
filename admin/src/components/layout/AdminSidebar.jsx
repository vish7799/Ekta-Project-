import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, FolderGit2, Mail, Settings, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminSidebar = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Services', path: '/services', icon: Zap },
    { name: 'Projects', path: '/projects', icon: FolderGit2 },
    { name: 'Enquiries', path: '/enquiries', icon: Mail },
    { name: 'Site Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-admin-900 border-r border-admin-800 flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-admin-800">
          <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-admin-950 font-bold mr-3">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wider uppercase">EKTA ADMIN</h1>
            <span className="text-[10px] text-amber-500 font-mono">CMS Console</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-admin-950 font-semibold'
                      : 'text-admin-300 hover:bg-admin-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-3 shrink-0" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-admin-800">
        <div className="mb-3 px-2">
          <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
          <p className="text-[10px] text-admin-400 truncate">{user?.email || 'admin@ekta.com'}</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center px-4 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" /> Sign Out
        </button>
      </div>
    </aside>
  );
};
