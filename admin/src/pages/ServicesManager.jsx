import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Plus, Zap, RefreshCw, X, Trash2 } from 'lucide-react';
import { adminFetchApi } from '../api/adminApiClient';

const emptyService = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  keyFeatures: '',
  displayOrder: 0,
  status: 'draft',
};

export const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyService);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const loadServices = () => {
    setLoading(true);
    adminFetchApi('/services/admin/all')
      .then((res) => setServices(res.data || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openEditor = (service = null) => {
    setError('');
    setEditor(service);
    setEditorOpen(true);
    setForm(service ? {
      ...emptyService,
      ...service,
      keyFeatures: (service.keyFeatures || []).join('\n'),
    } : emptyService);
  };

  const closeEditor = () => {
    if (!saving) {
      setEditor(null);
      setEditorOpen(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      title: form.title,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      keyFeatures: form.keyFeatures.split('\n').map((item) => item.trim()).filter(Boolean),
      displayOrder: Number(form.displayOrder) || 0,
      status: form.status,
    };
    if (form.slug) payload.slug = form.slug;

    try {
      await adminFetchApi(editor?._id ? `/services/${editor._id}` : '/services', {
        method: editor?._id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      closeEditor();
      loadServices();
    } catch (requestError) {
      setError(requestError.message || 'Unable to save service.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editor?._id || !window.confirm(`Delete service "${editor.title}"? This cannot be undone.`)) return;

    setDeleting(true);
    setError('');
    try {
      await adminFetchApi(`/services/${editor._id}`, { method: 'DELETE' });
      closeEditor();
      loadServices();
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete service.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Services Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Engineering Services Directory</h2>
            <p className="text-xs text-admin-400">Manage turnkey electrical service offerings and technical specs.</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={loadServices}
              className="p-2 bg-admin-900 border border-admin-800 rounded text-admin-300 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={() => openEditor()} className="bg-amber-500 hover:bg-amber-600 text-admin-950 font-bold px-4 py-2 rounded text-xs flex items-center">
              <Plus className="w-4 h-4 mr-1.5" /> Add New Service
            </button>
          </div>
        </div>

        <div className="bg-admin-900 border border-admin-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-admin-400 text-sm">Loading services data...</div>
          ) : services.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="min-w-[640px] w-full text-left text-sm text-admin-300">
              <thead className="bg-admin-950 text-xs font-semibold uppercase tracking-wider text-admin-400 border-b border-admin-800">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Slug</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-800">
                {services.map((item) => (
                  <tr key={item._id} className="hover:bg-admin-800/40">
                    <td className="px-6 py-4 font-semibold text-white">{item.title}</td>
                    <td className="px-6 py-4 font-mono text-xs text-amber-500">/services/{item.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono uppercase ${
                        item.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => openEditor(item)} className="text-xs text-admin-400 hover:text-white">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div className="p-12 text-center text-admin-400">
              <Zap className="w-10 h-10 text-admin-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-admin-300">No Services Found</p>
              <p className="text-xs text-admin-500 mt-1">Create your first service record using the button above.</p>
            </div>
          )}
        </div>
      </div>
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto" role="dialog" aria-modal="true">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 bg-admin-900 border border-admin-700 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editor?._id ? 'Edit Service' : 'Add Service'}</h2>
              <button type="button" onClick={closeEditor} className="text-admin-400 hover:text-white" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Service Title<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Enter service title" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">URL Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="Generated automatically if empty" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Short Description<input required value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} placeholder="Short service overview" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Full Description<textarea value={form.fullDescription} onChange={(event) => setForm({ ...form, fullDescription: event.target.value })} placeholder="Detailed service description" rows="4" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Key Features<textarea value={form.keyFeatures} onChange={(event) => setForm({ ...form, keyFeatures: event.target.value })} placeholder="Enter one feature per line" rows="4" className="admin-input mt-2" /></label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Display Order<input type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: event.target.value })} placeholder="0" className="admin-input mt-2" /></label>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Publication Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="admin-input mt-2"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
            </div>
            <div className="flex items-center justify-between gap-3 pt-2"><button type="button" onClick={handleDelete} disabled={!editor?._id || saving || deleting} className="flex items-center gap-1.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 disabled:opacity-50"><Trash2 className="w-4 h-4" />{deleting ? 'Deleting...' : 'Delete Service'}</button><div className="flex gap-3"><button type="button" onClick={closeEditor} className="px-4 py-2 text-sm text-admin-300">Cancel</button><button disabled={saving || deleting} className="bg-amber-500 px-4 py-2 rounded text-sm font-bold text-admin-950">{saving ? 'Saving...' : 'Save Service'}</button></div></div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};
