import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { adminFetchApi } from '../api/adminApiClient';

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in-review', label: 'In Review' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'closed', label: 'Closed' },
];

const statusClasses = {
  new: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'in-review': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  contacted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  closed: 'bg-admin-800 text-admin-400 border-admin-700',
};

const escapeCsv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

export const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [status, setStatus] = useState('new');
  const [adminNotes, setAdminNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const response = await adminFetchApi(`/enquiries?${params.toString()}`);
      setEnquiries(response.data || []);
      setMeta(response.meta || { page, total: 0, totalPages: 1 });
      setError('');
    } catch (requestError) {
      setEnquiries([]);
      setError(requestError.message || 'Unable to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [page, search, statusFilter]);

  const submitSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const openDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setStatus(enquiry.status);
    setAdminNotes(enquiry.adminNotes || '');
    setError('');
  };

  const closeDetails = () => {
    if (!saving && !deleting) setSelectedEnquiry(null);
  };

  const saveEnquiry = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await adminFetchApi(`/enquiries/${selectedEnquiry._id}`, {
        method: 'PUT',
        body: JSON.stringify({ status, adminNotes }),
      });
      setEnquiries((current) => current.map((item) => (
        item._id === selectedEnquiry._id ? response.data : item
      )));
      setSelectedEnquiry(response.data);
    } catch (requestError) {
      setError(requestError.message || 'Unable to update enquiry.');
    } finally {
      setSaving(false);
    }
  };

  const deleteEnquiry = async () => {
    if (!selectedEnquiry || !window.confirm(`Delete the enquiry from "${selectedEnquiry.fullName}"? This cannot be undone.`)) return;
    setDeleting(true);
    setError('');
    try {
      await adminFetchApi(`/enquiries/${selectedEnquiry._id}`, { method: 'DELETE' });
      setSelectedEnquiry(null);
      loadEnquiries();
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete enquiry.');
    } finally {
      setDeleting(false);
    }
  };

  const exportEnquiries = async () => {
    setExporting(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: '1', limit: '100' });
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      const firstPage = await adminFetchApi(`/enquiries?${params.toString()}`);
      const allEnquiries = [...(firstPage.data || [])];
      for (let currentPage = 2; currentPage <= (firstPage.meta?.totalPages || 1); currentPage += 1) {
        const nextParams = new URLSearchParams({ page: String(currentPage), limit: '100' });
        if (search) nextParams.set('search', search);
        if (statusFilter) nextParams.set('status', statusFilter);
        const nextPage = await adminFetchApi(`/enquiries?${nextParams.toString()}`);
        allEnquiries.push(...(nextPage.data || []));
      }
      const headers = ['Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Subject', 'Status', 'Message', 'Admin Notes'];
      const rows = allEnquiries.map((item) => [
        item.createdAt, item.fullName, item.email, item.phone, item.companyName,
        item.serviceRequested, item.subject, item.status, item.message, item.adminNotes,
      ]);
      const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `ekta-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (requestError) {
      setError(requestError.message || 'Unable to export enquiries.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout title="Enquiries Management">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Client Technical Enquiries</h2>
            <p className="text-xs text-admin-400">{meta.total || 0} enquiries matching the current view.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={loadEnquiries} title="Refresh" className="p-2 bg-admin-900 border border-admin-800 rounded text-admin-300 hover:text-white"><RefreshCw className="w-4 h-4" /></button>
            <button onClick={exportEnquiries} disabled={exporting} className="flex items-center gap-2 px-3 py-2 bg-admin-900 border border-admin-800 rounded text-xs text-admin-300 hover:text-white disabled:opacity-50"><Download className="w-4 h-4" />{exporting ? 'Exporting...' : 'Export CSV'}</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_12rem]">
          <form onSubmit={submitSearch} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2">
            <div className="relative min-w-0"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-300" aria-hidden="true" /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search name, email, company, subject" className="admin-input pl-10 pr-3" /></div>
            <button type="submit" className="shrink-0 bg-amber-500 px-4 rounded text-sm font-bold text-admin-950">Search</button>
          </form>
          <select value={statusFilter} onChange={(event) => { setPage(1); setStatusFilter(event.target.value); }} className="admin-input w-full min-w-0">{statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
        </div>

        {error && !selectedEnquiry && <p className="text-sm text-rose-400">{error}</p>}
        <div className="bg-admin-900 border border-admin-800 rounded-lg overflow-hidden">
          {loading ? <div className="p-8 text-center text-admin-400 text-sm">Loading enquiries list...</div> : enquiries.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-left text-sm text-admin-300">
              <thead className="bg-admin-950 text-xs font-semibold uppercase tracking-wider text-admin-400 border-b border-admin-800"><tr><th className="px-6 py-3">Client / Company</th><th className="px-6 py-3">Subject</th><th className="px-6 py-3">Phone / Email</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">View</th></tr></thead>
              <tbody className="divide-y divide-admin-800">{enquiries.map((item) => <tr key={item._id} className="hover:bg-admin-800/40"><td className="px-6 py-4"><div className="font-semibold text-white">{item.fullName}</div><div className="text-xs text-admin-400">{item.companyName || 'Individual'}</div></td><td className="px-6 py-4 font-medium text-amber-400">{item.subject}</td><td className="px-6 py-4 text-xs font-mono text-admin-300"><div>{item.email}</div><div>{item.phone}</div></td><td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-xs font-mono uppercase border ${statusClasses[item.status] || statusClasses.new}`}>{item.status}</span></td><td className="px-6 py-4 text-right"><button onClick={() => openDetails(item)} className="text-xs text-admin-400 hover:text-white p-1" aria-label={`View enquiry from ${item.fullName}`}><Eye className="w-4 h-4" /></button></td></tr>)}</tbody>
            </table>
            </div>
          ) : <div className="p-12 text-center text-admin-400"><Mail className="w-10 h-10 text-admin-600 mx-auto mb-3" /><p className="text-sm font-semibold text-admin-300">No Enquiries Found</p><p className="text-xs text-admin-500 mt-1">Try changing the search or status filter.</p></div>}
        </div>

        <div className="flex items-center justify-between text-sm text-admin-400"><span>Page {meta.page || page} of {meta.totalPages || 1}</span><div className="flex gap-2"><button disabled={page <= 1 || loading} onClick={() => setPage((current) => current - 1)} className="p-2 border border-admin-800 rounded hover:text-white disabled:opacity-40" aria-label="Previous page"><ChevronLeft className="w-4 h-4" /></button><button disabled={page >= (meta.totalPages || 1) || loading} onClick={() => setPage((current) => current + 1)} className="p-2 border border-admin-800 rounded hover:text-white disabled:opacity-40" aria-label="Next page"><ChevronRight className="w-4 h-4" /></button></div></div>
      </div>

      {selectedEnquiry && <div className="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto" role="dialog" aria-modal="true"><form onSubmit={saveEnquiry} className="max-w-2xl mx-auto mt-8 bg-admin-900 border border-admin-700 rounded-lg p-6 space-y-5"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">Enquiry Details</h2><p className="text-xs text-admin-400 mt-1">Received {new Date(selectedEnquiry.createdAt).toLocaleString()}</p></div><button type="button" onClick={closeDetails} className="text-admin-400 hover:text-white" aria-label="Close"><X className="w-5 h-5" /></button></div>{error && <p className="text-sm text-rose-400">{error}</p>}<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"><div><p className="text-xs uppercase text-admin-500">Name</p><p className="text-white mt-1">{selectedEnquiry.fullName}</p></div><div><p className="text-xs uppercase text-admin-500">Company</p><p className="text-white mt-1">{selectedEnquiry.companyName || 'Individual'}</p></div><div><p className="text-xs uppercase text-admin-500">Email</p><p className="text-white mt-1 break-all">{selectedEnquiry.email}</p></div><div><p className="text-xs uppercase text-admin-500">Phone</p><p className="text-white mt-1">{selectedEnquiry.phone}</p></div><div><p className="text-xs uppercase text-admin-500">Service Requested</p><p className="text-white mt-1">{selectedEnquiry.serviceRequested || 'Not specified'}</p></div><div><p className="text-xs uppercase text-admin-500">Subject</p><p className="text-white mt-1">{selectedEnquiry.subject}</p></div></div><div><p className="text-xs uppercase text-admin-500">Message</p><p className="mt-2 whitespace-pre-wrap rounded border border-admin-800 bg-admin-950 p-4 text-sm text-admin-200">{selectedEnquiry.message}</p></div><div className="flex flex-wrap gap-2"><a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-2 px-3 py-2 rounded bg-blue-500/10 text-blue-400 text-xs"><Mail className="w-4 h-4" />Email</a><a href={`tel:${selectedEnquiry.phone}`} className="flex items-center gap-2 px-3 py-2 rounded bg-emerald-500/10 text-emerald-400 text-xs"><Phone className="w-4 h-4" />Call</a></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><label className="text-xs uppercase text-admin-500">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className="admin-input mt-2 normal-case">{statusOptions.slice(1).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label><label className="text-xs uppercase text-admin-500">Admin Notes<textarea value={adminNotes} onChange={(event) => setAdminNotes(event.target.value)} rows="3" className="admin-input mt-2 normal-case" placeholder="Internal notes" /></label></div><div className="flex items-center justify-between gap-3"><button type="button" onClick={deleteEnquiry} disabled={saving || deleting} className="flex items-center gap-1.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 disabled:opacity-50"><Trash2 className="w-4 h-4" />{deleting ? 'Deleting...' : 'Delete'}</button><div className="flex gap-3"><button type="button" onClick={closeDetails} className="px-4 py-2 text-sm text-admin-300">Close</button><button disabled={saving || deleting} className="bg-amber-500 px-4 py-2 rounded text-sm font-bold text-admin-950">{saving ? 'Saving...' : 'Save Changes'}</button></div></div></form></div>}
    </AdminLayout>
  );
};
