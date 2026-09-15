import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Plus, Quote, RefreshCw, X, Trash2, Search, Filter } from 'lucide-react';
import { adminFetchApi } from '../api/adminApiClient';

const emptyTestimonial = {
  clientName: '',
  designation: '',
  companyName: '',
  statement: '',
  rating: 5,
  avatar: '',
  projectRef: '',
  displayOrder: 0,
  status: 'published',
};

export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadTestimonials = () => {
    setLoading(true);
    adminFetchApi('/testimonials/admin/all')
      .then((response) => setTestimonials(response.data || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const openEditor = (testimonial = null) => {
    setEditor(testimonial);
    setForm(testimonial ? {
      ...emptyTestimonial,
      ...testimonial,
      avatar: testimonial.avatar?._id || testimonial.avatar || '',
      projectRef: testimonial.projectRef?._id || testimonial.projectRef || '',
    } : { ...emptyTestimonial, displayOrder: testimonials.length + 1 });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        clientName: form.clientName.trim(),
        designation: form.designation.trim(),
        companyName: form.companyName.trim(),
        statement: form.statement.trim(),
        rating: Number(form.rating) || 5,
        displayOrder: Number(form.displayOrder) || 0,
        status: form.status,
      };

      if (form.avatar.trim()) payload.avatar = form.avatar.trim();
      if (form.projectRef.trim()) payload.projectRef = form.projectRef.trim();

      await adminFetchApi(editor?._id ? `/testimonials/${editor._id}` : '/testimonials', {
        method: editor?._id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      closeEditor();
      loadTestimonials();
    } catch (requestError) {
      setError(requestError.message || 'Unable to save testimonial.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editor?._id || !window.confirm(`Delete testimonial from "${editor.clientName}"?`)) return;
    setDeleting(true);
    setError('');
    try {
      await adminFetchApi(`/testimonials/${editor._id}`, { method: 'DELETE' });
      closeEditor();
      loadTestimonials();
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete testimonial.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = [testimonial.clientName, testimonial.companyName, testimonial.designation, testimonial.statement]
      .some((value) => value?.toLowerCase().includes(term));
    return matchesSearch && (statusFilter === 'all' || testimonial.status === statusFilter);
  });

  return (
    <AdminLayout title="Testimonials Manager">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Engineering References</h2>
            <p className="mt-0.5 text-xs text-admin-400">Manage published client testimonials shown on the public website.</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={loadTestimonials} className="inline-flex items-center rounded border border-admin-800 bg-admin-900 px-3 py-2 text-xs font-semibold text-admin-300">
              <RefreshCw className={`mr-1.5 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button onClick={() => openEditor()} className="inline-flex items-center rounded border border-amber-500 bg-amber-500 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950">
              <Plus className="mr-1 h-4 w-4" /> Add Testimonial
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-admin-800 bg-admin-900/60 p-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-admin-500" />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search client, company, designation, or statement..." className="w-full rounded border border-admin-800 bg-admin-950 py-1.5 pl-9 pr-3 text-xs text-white focus:border-amber-500 focus:outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-admin-400" />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded border border-admin-800 bg-admin-950 px-2.5 py-1.5 text-xs text-admin-200">
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-lg border border-admin-800 bg-admin-900 p-12 text-center text-xs text-admin-400"><RefreshCw className="mr-2 inline h-4 w-4 animate-spin text-amber-500" /> Loading testimonials...</div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="rounded-lg border border-dashed border-admin-800 bg-admin-900/40 p-12 text-center"><Quote className="mx-auto mb-3 h-12 w-12 text-admin-600" /><h3 className="text-sm font-bold text-admin-200">No testimonials found</h3><p className="mt-1 text-xs text-admin-500">Create a testimonial and publish it to show it on the public website.</p><button onClick={() => openEditor()} className="mt-5 rounded border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400"><Plus className="mr-1.5 inline h-3.5 w-3.5" /> Add Testimonial</button></div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTestimonials.map((testimonial) => (
              <button key={testimonial._id} onClick={() => openEditor(testimonial)} className="rounded-lg border border-admin-800 bg-admin-900 p-5 text-left transition-colors hover:border-amber-500/50">
                <div className="flex items-start justify-between gap-3"><Quote className="h-5 w-5 shrink-0 text-amber-500" /><span className="rounded border border-admin-700 px-1.5 py-0.5 text-[10px] uppercase text-admin-400">{testimonial.status}</span></div>
                <p className="mt-4 line-clamp-4 text-xs leading-relaxed text-admin-300">“{testimonial.statement}”</p>
                <div className="mt-4 border-t border-admin-800 pt-3"><p className="text-sm font-bold text-white">{testimonial.clientName}</p><p className="text-xs text-amber-400">{testimonial.designation || testimonial.companyName}</p><p className="mt-1 text-[11px] font-mono text-admin-500">{testimonial.companyName} · Rating {testimonial.rating}/5</p></div>
              </button>
            ))}
          </div>
        )}

        {editorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-admin-800 bg-admin-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-admin-800 px-6 py-4"><div><h3 className="text-base font-bold text-white">{editor?._id ? `Edit Testimonial: ${editor.clientName}` : 'Add Testimonial'}</h3><p className="text-xs text-admin-400">Configure the public client reference and publication status.</p></div><button onClick={closeEditor} disabled={saving || deleting} className="rounded p-1 text-admin-400 hover:bg-admin-800 hover:text-white"><X className="h-5 w-5" /></button></div>
              <form onSubmit={handleSubmit} className="space-y-4 p-6">
                {error && <div className="rounded border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">{error}</div>}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Client Name *</span><input required value={form.clientName} onChange={(event) => setForm({ ...form, clientName: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                  <label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Designation</span><input value={form.designation} onChange={(event) => setForm({ ...form, designation: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                  <label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Company Name *</span><input required value={form.companyName} onChange={(event) => setForm({ ...form, companyName: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                  <label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Testimonial Statement *</span><textarea required rows="5" maxLength="1000" value={form.statement} onChange={(event) => setForm({ ...form, statement: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                  <label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Rating</span><select value={form.rating} onChange={(event) => setForm({ ...form, rating: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white"><option value="5">5 / 5</option><option value="4">4 / 5</option><option value="3">3 / 5</option><option value="2">2 / 5</option><option value="1">1 / 5</option></select></label>
                  <label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Display Order</span><input type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                  <label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Status</span><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white"><option value="published">Published</option><option value="draft">Draft</option><option value="archived">Archived</option></select></label>
                  <label><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Project Reference ID</span><input value={form.projectRef} onChange={(event) => setForm({ ...form, projectRef: event.target.value })} placeholder="Optional MongoDB project ID" className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                  <label className="sm:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-admin-300">Avatar Media ID</span><input value={form.avatar} onChange={(event) => setForm({ ...form, avatar: event.target.value })} placeholder="Optional MongoDB media ID" className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white" /></label>
                </div>
                <div className="flex items-center justify-between border-t border-admin-800 pt-4"><button type="button" onClick={handleDelete} disabled={!editor?._id || saving || deleting} className="inline-flex items-center rounded border border-rose-500/30 px-3 py-2 text-xs text-rose-400 disabled:opacity-40"><Trash2 className="mr-1.5 h-4 w-4" /> Delete</button><div className="flex gap-2"><button type="button" onClick={closeEditor} className="rounded border border-admin-700 px-4 py-2 text-xs text-admin-300">Cancel</button><button type="submit" disabled={saving || deleting} className="rounded bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-50">{saving ? 'Saving...' : 'Save Testimonial'}</button></div></div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
