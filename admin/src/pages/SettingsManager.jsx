import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { adminFetchApi } from '../api/adminApiClient';

export const SettingsManager = () => {
  const [settings, setSettings] = useState({
    companyName: 'EKTA ELECTRICAL WORKS',
    tagline: 'Turnkey Industrial Electrical & Power Engineering Solutions',
    corporateAddress: 'EKTA ELECTRICAL WORKS Complex, Industrial Zone',
    primaryPhone: '+91 (0) 1234 567 890',
    emergencyPhone: '+91 (0) 9876 543 210',
    email: 'contact@ektaelectrical.com',
    secondaryEmail: '',
  });
  const [loading, setLoading] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    adminFetchApi('/site-settings')
      .then((res) => {
        if (res.data) setSettings(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    adminFetchApi('/site-settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }).then(() => {
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    });
  };

  return (
    <AdminLayout title="Site Settings">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">Global Corporate Site Settings</h2>
          <p className="text-xs text-admin-400">Configure global metadata, official contact lines, and address info.</p>
        </div>

        {savedMsg && (
          <div className="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center space-x-3 text-emerald-400 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>Site settings updated cleanly.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-admin-900 border border-admin-800 rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
              Corporate Name
            </label>
            <input
              type="text"
              value={settings.companyName || ''}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
              Corporate Tagline / Positioning
            </label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
                Primary Desk Phone
              </label>
              <input
                type="text"
                value={settings.primaryPhone || ''}
                onChange={(e) => setSettings({ ...settings, primaryPhone: e.target.value })}
                className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
                Emergency / Secondary Phone
              </label>
              <input
                type="text"
                value={settings.emergencyPhone || ''}
                onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
                Official Email Address
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
                Secondary Email Address
              </label>
              <input
                type="email"
                value={settings.secondaryEmail || ''}
                onChange={(e) => setSettings({ ...settings, secondaryEmail: e.target.value })}
                className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300 mb-2">
              Corporate Headquarters Address
            </label>
            <textarea
              rows={3}
              value={settings.corporateAddress || ''}
              onChange={(e) => setSettings({ ...settings, corporateAddress: e.target.value })}
              className="w-full bg-admin-950 border border-admin-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-admin-950 font-bold px-6 py-2.5 rounded text-xs flex items-center shadow-lg shadow-amber-500/10"
          >
            <Save className="w-4 h-4 mr-2" /> Save Global Settings
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
