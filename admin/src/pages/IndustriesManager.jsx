import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Plus, Factory, RefreshCw, X, Trash2, Search, Filter } from 'lucide-react';
import { adminFetchApi } from '../api/adminApiClient';

const emptyIndustry = { name: '', slug: '', shortDescription: '', overview: '', solutionsProvided: '', icon: '', displayOrder: 0, status: 'published' };

const DEFAULT_INDUSTRIES = [
  { name: 'Healthcare & Critical Medical Facilities', slug: 'healthcare', shortDescription: 'Zero-downtime power infrastructure for hospitals, ICUs, and surgical facilities.', overview: 'Redundant substations, isolated medical grounding, and automatic transfer systems engineered for critical healthcare loads.', solutionsProvided: '33kV dual redundant infeeds\nHarmonic-filtered clean power\nIsolated surgical grounds', displayOrder: 1, status: 'published' },
  { name: 'Data Centres & Telecom Networks', slug: 'telecom-data', shortDescription: 'High-availability electrical distribution for mission-critical computing.', overview: '2N distribution, compact busbars, continuous UPS systems, and low-impedance grounding for data infrastructure.', solutionsProvided: '2500A busduct risers\nK-rated isolation transformers\nTHD-I below 3%', displayOrder: 2, status: 'published' },
  { name: 'Logistics Parks & Heavy Industrial Plants', slug: 'logistics-warehouses', shortDescription: 'Large-scale power routing for warehouses, plants, and automated operations.', overview: 'Multi-bay raceways, high-mast lighting, DG synchronization, and motor control centers for industrial sites.', solutionsProvided: 'Cable trunking and busducts\nAutomated DG synchronization\nIP67 industrial sockets', displayOrder: 3, status: 'published' },
  { name: 'Commercial Towers & Showroom Networks', slug: 'commercial-retail', shortDescription: 'Class-A electrical installations for commercial and retail environments.', overview: 'Riser busways, architectural lighting, surge protection, and building-management electrical integration.', solutionsProvided: 'DALI lighting controls\nMulti-zone distribution boards\nHigh surge suppression', displayOrder: 4, status: 'published' },
  { name: 'Banking & Financial Institutions', slug: 'banking-finance', shortDescription: 'Secure electrical infrastructure for banking networks and financial operations.', overview: 'Clean power, emergency UPS failover, isolated earthing, and security-loop interlocks for financial facilities.', solutionsProvided: 'Dedicated isolated earth pits\nRedundant power feeds\nATM and server-room clean power', displayOrder: 5, status: 'published' },
];

const toForm = (industry) => ({ ...emptyIndustry, ...industry, solutionsProvided: Array.isArray(industry.solutionsProvided) ? industry.solutionsProvided.join('\n') : industry.solutionsProvided || '' });

export const IndustriesManager = () => {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [editor, setEditor] = useState(null);
  const [form, setForm] = useState(emptyIndustry);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadIndustries = () => {
    setLoading(true);
    adminFetchApi('/industries/admin/all').then((res) => setIndustries(res.data || [])).catch(() => setIndustries([])).finally(() => setLoading(false));
  };

  useEffect(() => { loadIndustries(); }, []);

  const openEditor = (industry = null) => {
    setEditor(industry);
    setForm(industry ? toForm(industry) : { ...emptyIndustry, displayOrder: industries.length + 1 });
    setError('');
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (!saving && !deleting) {
      setEditor(null);
      setEditorOpen(false);
      setError('');
    }
  };

  const handleImportDefaults = async () => {
    if (!window.confirm('Import the five verified industry sectors into the CMS?')) return;
    setImporting(true);
    try {
      for (const industry of DEFAULT_INDUSTRIES) await adminFetchApi('/industries', { method: 'POST', body: JSON.stringify(industry) });
      loadIndustries();
    } catch (requestError) {
      window.alert(requestError.message || 'Unable to import default industries.');
    } finally { setImporting(false); }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = { name: form.name.trim(), slug: form.slug.trim(), shortDescription: form.shortDescription.trim(), overview: form.overview.trim(), solutionsProvided: form.solutionsProvided.split('\n').map((item) => item.trim()).filter(Boolean), icon: form.icon.trim(), displayOrder: Number(form.displayOrder) || 0, status: form.status };
      await adminFetchApi(editor?._id ? `/industries/${editor._id}` : '/industries', { method: editor?._id ? 'PUT' : 'POST', body: JSON.stringify(payload) });
      closeEditor();
      loadIndustries();
    } catch (requestError) { setError(requestError.message || 'Unable to save industry.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!editor?._id || !window.confirm(`Delete industry "${editor.name}"?`)) return;
    setDeleting(true);
    try {
      await adminFetchApi(`/industries/${editor._id}`, { method: 'DELETE' });
      closeEditor();
      loadIndustries();
    } catch (requestError) { setError(requestError.message || 'Unable to delete industry.'); }
    finally { setDeleting(false); }
  };

  const filteredIndustries = industries.filter((industry) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = [industry.name, industry.slug, industry.shortDescription, industry.overview].some((value) => value?.toLowerCase().includes(term));
    return matchesSearch && (statusFilter === 'all' || industry.status === statusFilter);
  });

  return (
    <AdminLayout title="Industries Manager">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-bold text-white">Industry Sectors</h2><p className="mt-0.5 text-xs text-admin-400">Manage sector profiles shown on the public industries directory.</p></div><div className="flex items-center gap-2.5"><button onClick={handleImportDefaults} disabled={importing || loading} className="inline-flex items-center rounded border border-purple-500/40 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300 disabled:opacity-50"><Factory className="mr-1.5 h-4 w-4" /> {importing ? 'Importing...' : 'Import Defaults'}</button><button onClick={loadIndustries} className="inline-flex items-center rounded border border-admin-800 bg-admin-900 px-3 py-2 text-xs font-semibold text-admin-300"><RefreshCw className={`mr-1.5 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh</button><button onClick={() => openEditor()} className="inline-flex items-center rounded border border-amber-500 bg-amber-500 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950"><Plus className="mr-1 h-4 w-4" /> Add Industry</button></div></div>
        <div className="flex flex-col gap-3 rounded-lg border border-admin-800 bg-admin-900/60 p-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-2.5 h-4 w-4 text-admin-500" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search industry sectors..." className="w-full rounded border border-admin-800 bg-admin-950 py-1.5 pl-9 pr-3 text-xs text-white focus:border-amber-500 focus:outline-none" /></div><div className="flex items-center gap-2"><Filter className="h-3.5 w-3.5 text-admin-400" /><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded border border-admin-800 bg-admin-950 px-2.5 py-1.5 text-xs text-admin-200"><option value="all">All Statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></div></div>
        {loading ? <div className="rounded-lg border border-admin-800 bg-admin-900 p-12 text-center text-xs text-admin-400"><RefreshCw className="mr-2 inline h-4 w-4 animate-spin text-amber-500" /> Loading industry records...</div> : filteredIndustries.length === 0 ? <div className="rounded-lg border border-dashed border-admin-800 bg-admin-900/40 p-12 text-center"><Factory className="mx-auto mb-3 h-12 w-12 text-admin-600" /><h3 className="text-sm font-bold text-admin-200">No industry records found</h3><button onClick={handleImportDefaults} disabled={importing} className="mt-5 rounded border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-xs font-semibold text-purple-300">{importing ? 'Importing...' : 'Import Default Industries'}</button></div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredIndustries.map((industry) => <button key={industry._id} onClick={() => openEditor(industry)} className="rounded-lg border border-admin-800 bg-admin-900 p-5 text-left transition-colors hover:border-amber-500/50"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-bold text-white">{industry.name}</h3><p className="mt-1 text-[11px] font-mono text-amber-500">/{industry.slug}</p></div><span className="rounded border border-admin-700 px-1.5 py-0.5 text-[10px] uppercase text-admin-400">{industry.status}</span></div><p className="mt-4 line-clamp-3 text-xs leading-relaxed text-admin-300">{industry.shortDescription || industry.overview || 'No description provided.'}</p><div className="mt-4 border-t border-admin-800 pt-3 text-[11px] font-mono text-admin-500">Order: #{industry.displayOrder ?? 0}</div></button>)}</div>}
        {editorOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-admin-800 bg-admin-900 shadow-2xl"><div className="flex items-center justify-between border-b border-admin-800 px-6 py-4"><div><h3 className="text-base font-bold text-white">{editor?._id ? `Edit Industry: ${editor.name}` : 'Add Industry Sector'}</h3><p className="text-xs text-admin-400">Configure public sector content and publishing status.</p></div><button onClick={closeEditor} disabled={saving || deleting} className="rounded p-1 text-admin-400 hover:bg-admin-800 hover:text-white"><X className="h-5 w-5" /></button></div><form onSubmit={handleSubmit} className="space-y-4 p-6">{error && <div className="rounded border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">{error}</div>}<div className="grid grid-cols-1 gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Industry Name *</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Slug</span><input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="healthcare" className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Icon</span><input value={form.icon} onChange={(event) => setForm({ ...form, icon: event.target.value })} placeholder="Building2" className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Short Description</span><textarea rows="2" value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Overview</span><textarea rows="4" value={form.overview} onChange={(event) => setForm({ ...form, overview: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Solutions Provided <span className="font-normal normal-case text-admin-500">(one per line)</span></span><textarea rows="4" value={form.solutionsProvided} onChange={(event) => setForm({ ...form, solutionsProvided: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Display Order</span><input type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label><label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Status</span><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white"><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label></div><div className="flex items-center justify-between border-t border-admin-800 pt-4"><button type="button" onClick={handleDelete} disabled={!editor?._id || saving || deleting} className="inline-flex items-center rounded border border-rose-500/30 px-3 py-2 text-xs text-rose-400 disabled:opacity-40"><Trash2 className="mr-1.5 h-4 w-4" /> Delete</button><div className="flex gap-2"><button type="button" onClick={closeEditor} className="rounded border border-admin-700 px-4 py-2 text-xs text-admin-300">Cancel</button><button type="submit" disabled={saving || deleting} className="rounded bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-50">{saving ? 'Saving...' : 'Save Industry'}</button></div></div></form></div></div>}
      </div>
    </AdminLayout>
  );
};