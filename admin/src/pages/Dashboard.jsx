import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Zap, FolderGit2, Building2, Factory, Mail } from 'lucide-react';
import { adminFetchApi } from '../api/adminApiClient';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    servicesCount: 0,
    projectsCount: 0,
    clientsCount: 0,
    industriesCount: 0,
    enquiriesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetchApi('/services/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/projects/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/clients/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/industries/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/enquiries').catch(() => ({ meta: { total: 0 } })),
    ]).then(([servicesRes, projectsRes, clientsRes, industriesRes, enquiriesRes]) => {
      setStats({
        servicesCount: servicesRes.data ? servicesRes.data.length : 0,
        projectsCount: projectsRes.data ? projectsRes.data.length : 0,
        clientsCount: clientsRes.data ? clientsRes.data.length : 0,
        industriesCount: industriesRes.data ? industriesRes.data.length : 0,
        enquiriesCount: enquiriesRes.meta ? enquiriesRes.meta.total : 0,
      });
      setLoading(false);
    });
  }, []);

  return (
    <AdminLayout title="CMS Overview Dashboard">
      <div className="space-y-8">
        {/* Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link
            to="/services"
            className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between hover:border-amber-500/50 transition-colors group"
          >
            <div>
              <p className="text-xs uppercase font-mono text-admin-400 group-hover:text-amber-400">Total Services</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.servicesCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </Link>

          <Link to="/industries" className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between hover:border-cyan-500/50 transition-colors group"><div><p className="text-xs uppercase font-mono text-admin-400 group-hover:text-cyan-400">Industry Sectors</p><p className="text-3xl font-bold text-white mt-2">{loading ? '...' : stats.industriesCount}</p></div><div className="w-12 h-12 rounded bg-cyan-500/10 text-cyan-400 flex items-center justify-center"><Factory className="w-6 h-6" /></div></Link>

          <Link
            to="/projects"
            className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between hover:border-blue-500/50 transition-colors group"
          >
            <div>
              <p className="text-xs uppercase font-mono text-admin-400 group-hover:text-blue-400">Total Projects</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.projectsCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
          </Link>

          <Link
            to="/clients"
            className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between hover:border-purple-500/50 transition-colors group"
          >
            <div>
              <p className="text-xs uppercase font-mono text-admin-400 group-hover:text-purple-400">Total Clients</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.clientsCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </Link>

          <Link
            to="/enquiries"
            className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between hover:border-emerald-500/50 transition-colors group"
          >
            <div>
              <p className="text-xs uppercase font-mono text-admin-400 group-hover:text-emerald-400">Client Enquiries</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.enquiriesCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
          </Link>
        </div>

      </div>
    </AdminLayout>
  );
};
