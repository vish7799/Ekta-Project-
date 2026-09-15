import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import {
  Plus,
  Building2,
  RefreshCw,
  X,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  Upload,
  Globe,
  Briefcase
} from 'lucide-react';
import { adminFetchApi, API_BASE_URL, resolveMediaUrl } from '../api/adminApiClient';

const emptyClient = {
  name: '',
  industrySector: '',
  location: '',
  scope: '',
  websiteUrl: '',
  displayOrder: 0,
  status: 'published',
  logo: null,
};

const SECTOR_SUGGESTIONS = [
  'Healthcare & Hospitals',
  'Data Centres & Telecommunications',
  'Logistics Parks & Warehousing',
  'Banking & Financial Institutions',
  'Retail Networks & Flagship Showrooms',
  'Heavy Engineering & Exhibitions',
  'Housing Societies & Townships',
  'Automotive & Industrial Manufacturing',
  'Commercial & Corporate Offices',
];

const DEFAULT_CLIENTS = [
  { name: 'Max Super Speciality Hospital', industrySector: 'Healthcare & Hospitals', location: 'Shalimar Bagh & Saket, New Delhi', scope: '33kV HT Substation, Cast Resin Transformers & Critical ICU Distribution', displayOrder: 1, status: 'published' },
  { name: 'Bharti Airtel Data Centre', industrySector: 'Data Centres & Telecommunications', location: 'Guwahati, Assam', scope: 'Turnkey Data Centre Substation, 2500A Busduct Risers & Harmonic Filtration', displayOrder: 2, status: 'published' },
  { name: 'TVS Logistics Parks', industrySector: 'Logistics Parks & Warehousing', location: 'Pataudi, Jamalpur, Sohna & Lucknow', scope: 'Multi-Bay Warehouse Electrification, 14,000m Cable Laying & AMF Panels', displayOrder: 3, status: 'published' },
  { name: 'IndusInd Bank Regional Hubs', industrySector: 'Banking & Financial Institutions', location: 'Kota, Bikaner, Dehradun, Indore, Chandigarh', scope: 'Standardized Branch Power, Dual-UPS Distribution & Isolated Earth Pits', displayOrder: 4, status: 'published' },
  { name: 'Federal Bank Commercial Branches', industrySector: 'Banking & Financial Institutions', location: 'Karol Bagh & Pitampura, New Delhi', scope: 'Commercial Power Panels, High-Load Busbars & Server Room Security Circuits', displayOrder: 5, status: 'published' },
  { name: 'Kajaria Tiles Flagship Showrooms', industrySector: 'Retail Networks & Flagship Showrooms', location: 'Rewari, Delhi NCR & Pan-India', scope: 'Architectural Accent Lighting, Chiller MCCs & Harmonic Filtering', displayOrder: 6, status: 'published' },
  { name: 'JCB International', industrySector: 'Heavy Engineering & Exhibitions', location: 'Excon Mega Exhibition Grounds', scope: 'Heavy Machinery Power Drops, High-Amp Industrial Socket Panels', displayOrder: 7, status: 'published' },
  { name: 'Pacific State Township (370 Flats)', industrySector: 'Housing Societies & Townships', location: 'Dehradun, Uttarakhand', scope: '11kV Complete Substation, Rising Mains & Prepaid Energy Meters', displayOrder: 8, status: 'published' },
  { name: 'DD News & Media One Studios', industrySector: 'Data Centres & Telecommunications', location: 'Delhi & Mumbai Studios', scope: 'Broadcast Studio Clean Power, Acoustic Transformers & Noise Filtration', displayOrder: 9, status: 'published' },
  { name: 'Industry Buying Mega Facility', industrySector: 'Logistics Parks & Warehousing', location: 'Ghitorni, Delhi NCR', scope: 'Warehouse Busducts, High-Bay LED Systems & DG Backup Sync', displayOrder: 10, status: 'published' },
];

export const ClientsManager = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [editor, setEditor] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [form, setForm] = useState(emptyClient);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadClients = () => {
    setLoading(true);
    adminFetchApi('/clients/admin/all')
      .then((res) => setClients(res.data || []))
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  };

  const handleImportDefaults = async () => {
    if (!window.confirm('Import 10 verified default enterprise clients from the company profile into the CMS?')) return;
    setImporting(true);
    try {
      for (const item of DEFAULT_CLIENTS) {
        await adminFetchApi('/clients', {
          method: 'POST',
          body: JSON.stringify(item),
        });
      }
      loadClients();
    } catch (err) {
      alert(err.message || 'Failed to import default clients');
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const openEditor = (client = null) => {
    setError('');
    setEditor(client);
    setLogoFile(null);
    setLogoPreview(null);
    setEditorOpen(true);
    if (client) {
      setForm({
        ...emptyClient,
        ...client,
      });
      if (client.logo) {
        setLogoPreview(
          typeof client.logo === 'string'
            ? resolveMediaUrl(client.logo)
            : resolveMediaUrl(client.logo.filePath)
        );
      }
    } else {
      setForm({
        ...emptyClient,
        displayOrder: clients.length + 1,
      });
    }
  };

  const closeEditor = () => {
    if (!saving && !deleting) {
      setEditor(null);
      setEditorOpen(false);
      setLogoFile(null);
      setLogoPreview(null);
      setError('');
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const uploadLogoMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', `${form.name || 'Client'} logo`);
    const token = localStorage.getItem('ekta_admin_token');
    const response = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.message || 'Failed to upload client logo.');
    }
    const resData = await response.json();
    return resData.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      let logoId = form.logo?._id || form.logo || null;

      if (logoFile) {
        const uploadedLogo = await uploadLogoMedia(logoFile);
        logoId = uploadedLogo._id;
      }

      const payload = {
        name: form.name.trim(),
        industrySector: form.industrySector.trim(),
        location: form.location?.trim() || '',
        scope: form.scope?.trim() || '',
        websiteUrl: form.websiteUrl?.trim() || '',
        displayOrder: Number(form.displayOrder) || 0,
        status: form.status,
      };

      if (logoId) {
        payload.logo = logoId;
      }

      await adminFetchApi(editor?._id ? `/clients/${editor._id}` : '/clients', {
        method: editor?._id ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
      });

      closeEditor();
      loadClients();
    } catch (requestError) {
      setError(requestError.message || 'Unable to save client record.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!editor?._id || !window.confirm(`Delete client "${editor.name}"? This will remove it from the client directory.`)) {
      return;
    }

    setDeleting(true);
    setError('');
    try {
      await adminFetchApi(`/clients/${editor._id}`, { method: 'DELETE' });
      closeEditor();
      loadClients();
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete client record.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industrySector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.scope?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Clients & Project References Manager">
      <div className="space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Client Portfolio</h2>
            <p className="text-xs text-admin-400 mt-0.5">
              Manage client directory cards, enterprise sectors, locations, and technical project scope displayed on the frontend.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleImportDefaults}
              disabled={importing || loading}
              className="inline-flex items-center rounded border border-purple-500/40 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 transition-colors disabled:opacity-50"
              title="Import 10 verified company profile clients into CMS"
            >
              <Building2 className="h-4 w-4 mr-1.5 text-purple-400" />
              {importing ? 'Importing...' : 'Import Default Clients'}
            </button>
            <button
              onClick={loadClients}
              className="inline-flex items-center rounded border border-admin-800 bg-admin-900 px-3 py-2 text-xs font-semibold text-admin-300 hover:bg-admin-800 hover:text-white transition-colors"
              title="Refresh clients list"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => openEditor()}
              className="inline-flex items-center rounded border border-amber-500 bg-amber-500 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Client
            </button>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="flex flex-col sm:flex-row gap-3 rounded-lg border border-admin-800 bg-admin-900/60 p-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-admin-500" />
            <input
              type="text"
              placeholder="Search by client name, sector, location, or scope..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded border border-admin-800 bg-admin-950 py-1.5 pl-9 pr-3 text-xs text-admin-100 placeholder-admin-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-admin-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded border border-admin-800 bg-admin-950 px-2.5 py-1.5 text-xs text-admin-200 focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="flex h-64 items-center justify-center rounded-lg border border-admin-800 bg-admin-900 text-xs text-admin-400 font-mono">
            <RefreshCw className="mr-2 h-4 w-4 animate-spin text-amber-500" /> Loading client records...
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="rounded-lg border border-dashed border-admin-800 bg-admin-900/40 p-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-admin-600 mb-3" />
            <h3 className="text-sm font-bold text-admin-200">No client records found</h3>
            <p className="mt-1 text-xs text-admin-500 max-w-sm mx-auto">
              {searchTerm || statusFilter !== 'all'
                ? 'No clients match your filter criteria. Try clearing search filters.'
                : 'Get started by creating your first client card or importing verified company clients.'}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleImportDefaults}
                disabled={importing}
                className="inline-flex items-center rounded border border-purple-500/40 bg-purple-500/20 px-4 py-2 text-xs font-semibold text-purple-300 hover:bg-purple-500/30"
              >
                <Building2 className="mr-1.5 h-3.5 w-3.5 text-purple-400" />
                {importing ? 'Importing...' : 'Import 10 Verified Clients'}
              </button>
              <button
                onClick={() => openEditor()}
                className="inline-flex items-center rounded border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/20"
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Create Client Card
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredClients.map((client) => {
              const logoSrc = client.logo?.filePath
                ? resolveMediaUrl(client.logo.filePath)
                : typeof client.logo === 'string'
                ? resolveMediaUrl(client.logo)
                : null;

              return (
                <div
                  key={client._id}
                  onClick={() => openEditor(client)}
                  className="group relative flex flex-col justify-between rounded-lg border border-admin-800 bg-admin-900 p-5 hover:border-amber-500/50 hover:bg-admin-850 cursor-pointer transition-all shadow-sm"
                >
                  <div>
                    {/* Header: Logo / Avatar + Name + Status */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-admin-700 bg-admin-950 p-1">
                        {logoSrc ? (
                          <img
                            src={logoSrc}
                            alt={client.name}
                            className="h-full w-full object-contain rounded"
                          />
                        ) : (
                          <Building2 className="h-6 w-6 text-amber-500" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="truncate text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                            {client.name}
                          </h3>
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase ${
                              client.status === 'published'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : client.status === 'draft'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                            }`}
                          >
                            {client.status}
                          </span>
                        </div>

                        {client.industrySector && (
                          <span className="inline-block mt-0.5 text-xs text-amber-500/90 font-medium">
                            {client.industrySector}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata: Location */}
                    {client.location && (
                      <div className="flex items-center text-xs text-admin-400 font-mono mb-2">
                        <MapPin className="mr-1.5 h-3.5 w-3.5 text-admin-500 shrink-0" />
                        <span className="truncate">{client.location}</span>
                      </div>
                    )}

                    {/* Scope of Work */}
                    {client.scope && (
                      <p className="text-xs text-admin-300 line-clamp-2 leading-relaxed mt-2 bg-admin-950/40 p-2 rounded border border-admin-800/80">
                        <strong className="text-admin-400 font-medium">Scope:</strong> {client.scope}
                      </p>
                    )}
                  </div>

                  {/* Footer Bar */}
                  <div className="mt-4 pt-3 border-t border-admin-800 flex items-center justify-between text-[11px] text-admin-500 font-mono">
                    <span>Order: #{client.displayOrder ?? 0}</span>
                    <span className="text-amber-400 group-hover:underline">Edit details →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal / Slide-Over Drawer Editor */}
        {editorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-admin-800 bg-admin-900 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-admin-800 px-6 py-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editor?._id ? `Edit Client: ${editor.name}` : 'Add New Client Reference'}
                  </h3>
                  <p className="text-xs text-admin-400">
                    Configure client card details, sector categorization, and project scope.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeEditor}
                  disabled={saving || deleting}
                  className="rounded p-1 text-admin-400 hover:bg-admin-800 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="rounded border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Client Name */}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                      Client / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Max Super Speciality Hospital, TVS Logistics"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Industry Sector */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                      Industry Sector
                    </label>
                    <input
                      type="text"
                      list="sectors-list"
                      placeholder="e.g. Healthcare & Hospitals"
                      value={form.industrySector}
                      onChange={(e) => setForm({ ...form, industrySector: e.target.value })}
                      className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                    <datalist id="sectors-list">
                      {SECTOR_SUGGESTIONS.map((sector) => (
                        <option key={sector} value={sector} />
                      ))}
                    </datalist>
                  </div>

                  {/* Location / Site */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                      Location / Branch / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Shalimar Bagh, New Delhi; Pan-India"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Scope of Work */}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                      Scope of Engineering Work
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the electrical services provided (e.g. 33kV HT Substation, Cast Resin Transformers & Critical ICU Distribution)"
                      value={form.scope}
                      onChange={(e) => setForm({ ...form, scope: e.target.value })}
                      className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Website URL */}
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                      Website URL (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-3.5 w-3.5 text-admin-500" />
                      <input
                        type="url"
                        placeholder="https://..."
                        value={form.websiteUrl}
                        onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                        className="w-full rounded border border-admin-800 bg-admin-950 py-2 pl-9 pr-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Display Order & Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={form.displayOrder}
                        onChange={(e) => setForm({ ...form, displayOrder: e.target.value })}
                        className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full rounded border border-admin-800 bg-admin-950 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="sm:col-span-2 border-t border-admin-800 pt-3">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-admin-300">
                      Client Logo (Optional)
                    </label>
                    <div className="flex items-center gap-4">
                      {logoPreview ? (
                        <div className="relative h-16 w-20 rounded border border-admin-700 bg-admin-950 p-1 flex items-center justify-center">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="h-full w-full object-contain rounded"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-20 rounded border border-dashed border-admin-800 bg-admin-950 flex items-center justify-center text-admin-600">
                          <Building2 className="h-6 w-6" />
                        </div>
                      )}

                      <div className="flex-1">
                        <label className="inline-flex cursor-pointer items-center rounded border border-admin-700 bg-admin-800 px-3 py-1.5 text-xs font-medium text-admin-200 hover:bg-admin-700 transition-colors">
                          <Upload className="mr-1.5 h-3.5 w-3.5" />
                          Choose Logo File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </label>
                        <p className="mt-1 text-[11px] text-admin-500">
                          Recommended format: PNG, SVG, or JPG with clean transparent or light background.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-between border-t border-admin-800 pt-4 mt-6">
                  {editor?._id ? (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={deleting || saving}
                      className="inline-flex items-center text-xs font-semibold text-rose-400 hover:text-rose-300 disabled:opacity-50"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      {deleting ? 'Deleting...' : 'Delete Client'}
                    </button>
                  ) : <div />}

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={closeEditor}
                      disabled={saving || deleting}
                      className="rounded border border-admin-800 bg-admin-950 px-4 py-2 text-xs font-semibold text-admin-300 hover:bg-admin-800 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving || deleting}
                      className="inline-flex items-center rounded border border-amber-500 bg-amber-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 hover:bg-amber-400 transition-colors shadow-sm disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Client'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ClientsManager;
