import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Zap, FolderGit2, Mail, Users, CheckCircle2, Clock } from 'lucide-react';
import { adminFetchApi } from '../api/adminApiClient';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    servicesCount: 0,
    projectsCount: 0,
    enquiriesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetchApi('/services/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/projects/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/enquiries').catch(() => ({ meta: { total: 0 } })),
    ]).then(([servicesRes, projectsRes, enquiriesRes]) => {
      setStats({
        servicesCount: servicesRes.data ? servicesRes.data.length : 0,
        projectsCount: projectsRes.data ? projectsRes.data.length : 0,
        enquiriesCount: enquiriesRes.meta ? enquiriesRes.meta.total : 0,
      });
      setLoading(false);
    });
  }, []);

  return (
    <AdminLayout title="CMS Overview Dashboard">
      <div className="space-y-8">
        {/* Metric Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-mono text-admin-400">Total Services</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.servicesCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-mono text-admin-400">Total Projects</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.projectsCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-admin-900 border border-admin-800 rounded-lg p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-mono text-admin-400">Client Enquiries</p>
              <p className="text-3xl font-bold text-white mt-2">
                {loading ? '...' : stats.enquiriesCount}
              </p>
            </div>
            <div className="w-12 h-12 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* System Architecture Status */}
        <div className="bg-admin-900 border border-admin-800 rounded-lg p-6">
          <h2 className="text-base font-bold text-white mb-4">CMS Architectural Health Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-admin-800">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-admin-200">Express REST API Middleware</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                ACTIVE / PROTECTED
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-admin-800">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-admin-200">Role-Based Access Control (RBAC)</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                JWT ENFORCED
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-admin-200">NoSQL Injection & Rate Limiting</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                HELMET & SANITIZED
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
