import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Plus, FolderGit2, RefreshCw, X, Trash2 } from 'lucide-react';
import { adminFetchApi, API_BASE_URL, resolveMediaUrl } from '../api/adminApiClient';

const emptyProject = {
  title: '',
  slug: '',
  clientName: '',
  location: '',
  completionDate: '',
  summary: '',
  description: '',
  highlights: '',
  featuredImage: null,
  gallery: [],
  isFeatured: false,
  status: 'draft',
};

export const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyProject);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [error, setError] = useState('');

  const loadProjects = () => {
    setLoading(true);
    adminFetchApi('/projects/admin/all')
      .then((res) => setProjects(res.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openEditor = (project = null) => {
    setError('');
    setEditor(project);
    setEditorOpen(true);
    setCoverFile(null);
    setGalleryFiles([]);
    setForm(project ? {
      ...emptyProject,
      ...project,
      completionDate: project.completionDate ? project.completionDate.slice(0, 10) : '',
      highlights: (project.highlights || []).join('\n'),
    } : emptyProject);
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

    try {
      let featuredImage = form.featuredImage?._id || form.featuredImage || null;
      const gallery = (form.gallery || []).map((item) => item._id || item).filter(Boolean);

      if (coverFile) {
        const uploadedCover = await uploadMedia(coverFile);
        featuredImage = uploadedCover._id;
      }
      for (const file of galleryFiles) {
        const uploadedImage = await uploadMedia(file);
        gallery.push(uploadedImage._id);
      }

      const payload = {
      title: form.title,
      clientName: form.clientName,
      location: form.location,
      completionDate: form.completionDate || undefined,
      summary: form.summary,
      description: form.description,
      highlights: form.highlights.split('\n').map((item) => item.trim()).filter(Boolean),
      featuredImage,
      gallery,
      isFeatured: form.isFeatured,
      status: form.status,
      };
      if (form.slug) payload.slug = form.slug;

      await adminFetchApi(editor?._id ? `/projects/${editor._id}` : '/projects', {
        method: editor?._id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });
      closeEditor();
      loadProjects();
    } catch (requestError) {
      setError(requestError.message || 'Unable to save project.');
    } finally {
      setSaving(false);
    }
  };

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', form.title || 'Project image');
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('ekta_admin_token')}` },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Unable to upload project image.');
    return data.data;
  };

  const handleDelete = async () => {
    if (!editor?._id || !window.confirm(`Delete project "${editor.title}"? This cannot be undone.`)) return;

    setDeleting(true);
    setError('');
    try {
      await adminFetchApi(`/projects/${editor._id}`, { method: 'DELETE' });
      closeEditor();
      loadProjects();
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete project.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Projects Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Project Case Studies Portfolio</h2>
            <p className="text-xs text-admin-400">Manage completed and active industrial electrical projects.</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={loadProjects}
              className="p-2 bg-admin-900 border border-admin-800 rounded text-admin-300 hover:text-white"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={() => openEditor()} className="bg-amber-500 hover:bg-amber-600 text-admin-950 font-bold px-4 py-2 rounded text-xs flex items-center">
              <Plus className="w-4 h-4 mr-1.5" /> Add Project Scope
            </button>
          </div>
        </div>

        <div className="bg-admin-900 border border-admin-800 rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-admin-400 text-sm">Loading projects data...</div>
          ) : projects.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-sm text-admin-300">
              <thead className="bg-admin-950 text-xs font-semibold uppercase tracking-wider text-admin-400 border-b border-admin-800">
                <tr>
                  <th className="px-6 py-3">Project Title</th>
                  <th className="px-6 py-3">Client / Site</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-800">
                {projects.map((item) => (
                  <tr key={item._id} className="hover:bg-admin-800/40">
                    <td className="px-6 py-4 font-semibold text-white">{item.title}</td>
                    <td className="px-6 py-4 text-xs text-admin-400">{item.clientName || 'N/A'}</td>
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
              <FolderGit2 className="w-10 h-10 text-admin-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-admin-300">No Projects Registered</p>
              <p className="text-xs text-admin-500 mt-1">Add your first project portfolio case study above.</p>
            </div>
          )}
        </div>
      </div>
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto" role="dialog" aria-modal="true">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 bg-admin-900 border border-admin-700 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editor?._id ? 'Edit Project' : 'Add Project'}</h2>
              <button type="button" onClick={closeEditor} className="text-admin-400 hover:text-white" aria-label="Close"><X className="w-5 h-5" /></button>
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Project Title<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Enter project title" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">URL Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="Generated automatically if empty" className="admin-input mt-2" /></label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Client Name<input value={form.clientName} onChange={(event) => setForm({ ...form, clientName: event.target.value })} placeholder="Enter client or company" className="admin-input mt-2" /></label>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Project Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="City or site location" className="admin-input mt-2" /></label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Completion Date<input type="date" value={form.completionDate} onChange={(event) => setForm({ ...form, completionDate: event.target.value })} className="admin-input mt-2" /></label>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Publication Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="admin-input mt-2"><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
            </div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Project Summary<input value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} placeholder="Short project overview" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Project Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Detailed scope and execution description" rows="4" className="admin-input mt-2" /></label>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-300">Project Highlights<textarea value={form.highlights} onChange={(event) => setForm({ ...form, highlights: event.target.value })} placeholder="Enter one highlight per line" rows="4" className="admin-input mt-2" /></label>
            <div className="space-y-3 rounded border border-admin-800 bg-admin-950 p-4">
              <p className="text-sm font-semibold text-white">Project Images</p>
              {form.featuredImage?.filePath && <img src={resolveMediaUrl(form.featuredImage.filePath)} alt="Current project cover" className="h-32 w-full rounded object-cover" />}
              <label className="block text-xs text-admin-400">Cover image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCoverFile(event.target.files?.[0] || null)} className="mt-2 block w-full text-xs text-admin-300" /></label>
              {form.gallery?.length > 0 && <div className="grid grid-cols-4 gap-2">{form.gallery.map((image) => <img key={image._id || image} src={resolveMediaUrl(image.filePath || image)} alt="Project gallery" className="h-16 w-full rounded object-cover" />)}</div>}
              <label className="block text-xs text-admin-400">Gallery images<input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))} className="mt-2 block w-full text-xs text-admin-300" /></label>
              {galleryFiles.length > 0 && <p className="text-xs text-amber-400">{galleryFiles.length} new image(s) selected</p>}
            </div>
            <label className="flex items-center gap-2 text-sm text-admin-300"><input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm({ ...form, isFeatured: event.target.checked })} /> Featured project</label>
            <div className="flex items-center justify-between gap-3 pt-2"><button type="button" onClick={handleDelete} disabled={!editor?._id || saving || deleting} className="flex items-center gap-1.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 disabled:opacity-50"><Trash2 className="w-4 h-4" />{deleting ? 'Deleting...' : 'Delete Project'}</button><div className="flex gap-3"><button type="button" onClick={closeEditor} className="px-4 py-2 text-sm text-admin-300">Close</button><button disabled={saving || deleting} className="bg-amber-500 px-4 py-2 rounded text-sm font-bold text-admin-950">{saving ? 'Saving...' : 'Save Project'}</button></div></div>
          </form>
        </div>
      )}
    </AdminLayout>
  );
};
