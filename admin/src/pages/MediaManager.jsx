import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Image, RefreshCw, Trash2, Search, Folder, FolderOpen, ArrowLeft } from 'lucide-react';
import { adminFetchApi, resolveMediaUrl } from '../api/adminApiClient';

export const MediaManager = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [usageFilter, setUsageFilter] = useState('all');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [error, setError] = useState('');

  const loadMedia = () => {
    setLoading(true);
    setError('');
    Promise.all([
      adminFetchApi('/media'),
      adminFetchApi('/services/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/projects/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/clients/admin/all').catch(() => ({ data: [] })),
      adminFetchApi('/industries/admin/all').catch(() => ({ data: [] })),
    ])
      .then(([mediaResponse, servicesResponse, projectsResponse, clientsResponse, industriesResponse]) => {
        const usageById = new Map();
        const addUsage = (id, label) => {
          if (!id) return;
          const current = usageById.get(String(id)) || [];
          usageById.set(String(id), [...current, label]);
        };
        (servicesResponse.data || []).forEach((item) => addUsage(item.featuredImage?._id || item.featuredImage, `Service: ${item.title}`));
        (projectsResponse.data || []).forEach((item) => {
          addUsage(item.featuredImage?._id || item.featuredImage, `Project: ${item.title}`);
          (item.gallery || []).forEach((image) => addUsage(image?._id || image, `Project: ${item.title}`));
        });
        (clientsResponse.data || []).forEach((item) => addUsage(item.logo?._id || item.logo, `Client: ${item.name}`));
        (industriesResponse.data || []).forEach((item) => addUsage(item.featuredImage?._id || item.featuredImage, `Industry: ${item.name}`));
        setMedia((mediaResponse.data || []).map((item) => ({
          ...item,
          usage: usageById.get(String(item._id)) || [],
        })));
      })
      .catch((requestError) => {
        setMedia([]);
        setError(requestError.message || 'Unable to load media library.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete image "${item.originalName}"? This cannot be undone.`)) return;
    setDeletingId(item._id);
    setError('');
    try {
      await adminFetchApi(`/media/${item._id}`, { method: 'DELETE' });
      setMedia((current) => current.filter((mediaItem) => mediaItem._id !== item._id));
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete image.');
    } finally {
      setDeletingId(null);
    }
  };

  const matchesFilters = (item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = [item.originalName, item.fileName, item.altText, item.caption, ...(item.usage || [])]
      .some((value) => value?.toLowerCase().includes(term));
    const matchesUsage = usageFilter === 'all'
      || (usageFilter === 'used' && item.usage?.length > 0)
      || (usageFilter === 'unused' && !item.usage?.length);
    const matchesFolder = !selectedFolder
      || (selectedFolder === 'Unused Images' ? !item.usage?.length : item.usage?.includes(selectedFolder));
    return matchesSearch && matchesUsage && matchesFolder;
  };

  const filteredMedia = media
    .filter(matchesFilters)
    .sort((left, right) => {
      if (sortOrder === 'name-asc') return left.originalName.localeCompare(right.originalName);
      if (sortOrder === 'name-desc') return right.originalName.localeCompare(left.originalName);
      if (sortOrder === 'usage') return (right.usage?.length || 0) - (left.usage?.length || 0);
      return new Date(right.createdAt || 0) - new Date(left.createdAt || 0);
    });

  const folderNames = Array.from(new Set(media.flatMap((item) => item.usage || []))).sort();
  const folderCount = (folderName) => media.filter((item) => {
    if (!matchesFilters({ ...item, usage: folderName === 'Unused Images' ? [] : item.usage })) return false;
    return folderName === 'Unused Images' ? !item.usage?.length : item.usage?.includes(folderName);
  }).length;

  return (
    <AdminLayout title="Media Library">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Uploaded Images</h2>
            <p className="mt-0.5 text-xs text-admin-400">Review and remove images uploaded through the CMS.</p>
          </div>
          <button onClick={loadMedia} className="inline-flex items-center rounded border border-admin-800 bg-admin-900 px-3 py-2 text-xs font-semibold text-admin-300">
            <RefreshCw className={`mr-1.5 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-admin-500" />
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search image, service, project, client, or industry..." className="w-full rounded border border-admin-800 bg-admin-950 py-1.5 pl-9 pr-3 text-xs text-white focus:border-amber-500 focus:outline-none" />
          </div>
          <select value={usageFilter} onChange={(event) => setUsageFilter(event.target.value)} className="rounded border border-admin-800 bg-admin-950 px-3 py-1.5 text-xs text-admin-200"><option value="all">All Images</option><option value="used">Used in CMS</option><option value="unused">Unused Images</option></select>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="rounded border border-admin-800 bg-admin-950 px-3 py-1.5 text-xs text-admin-200"><option value="newest">Newest</option><option value="name-asc">Name A-Z</option><option value="name-desc">Name Z-A</option><option value="usage">Most Used</option></select>
        </div>

        {error && <div className="rounded border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">{error}</div>}

        {loading ? (
          <div className="rounded-lg border border-admin-800 bg-admin-900 p-12 text-center text-xs text-admin-400"><RefreshCw className="mr-2 inline h-4 w-4 animate-spin text-amber-500" /> Loading media library...</div>
        ) : !selectedFolder ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[...folderNames, 'Unused Images'].map((folderName) => (
              <button key={folderName} onClick={() => setSelectedFolder(folderName)} className="rounded-lg border border-admin-800 bg-admin-900 p-5 text-left transition-colors hover:border-amber-500/50">
                <Folder className="h-9 w-9 text-amber-500" />
                <p className="mt-4 truncate text-sm font-bold text-white" title={folderName}>{folderName}</p>
                <p className="mt-1 text-xs text-admin-500">{folderCount(folderName)} image{folderCount(folderName) === 1 ? '' : 's'}</p>
              </button>
            ))}
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="rounded-lg border border-dashed border-admin-800 bg-admin-900/40 p-12 text-center"><Image className="mx-auto mb-3 h-12 w-12 text-admin-600" /><h3 className="text-sm font-bold text-admin-200">No uploaded images found</h3></div>
        ) : (
          <div>
            <button onClick={() => setSelectedFolder(null)} className="mb-4 inline-flex items-center rounded border border-admin-800 bg-admin-900 px-3 py-2 text-xs text-admin-300 hover:text-white"><ArrowLeft className="mr-1.5 h-4 w-4" /> All Folders</button>
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white"><FolderOpen className="h-5 w-5 text-amber-500" /> {selectedFolder}</div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filteredMedia.map((item) => (
                <div key={item._id} className="overflow-hidden rounded-lg border border-admin-800 bg-admin-900">
                  <div className="flex aspect-video items-center justify-center bg-admin-950 p-2"><img src={resolveMediaUrl(item.filePath)} alt={item.altText || item.originalName} className="h-full w-full object-contain" /></div>
                  <div className="space-y-3 p-4"><div className="min-w-0"><p className="truncate text-xs font-semibold text-white" title={item.originalName}>{item.originalName}</p><p className="mt-1 text-[10px] font-mono text-admin-500">{Math.ceil((item.sizeBytes || 0) / 1024)} KB</p></div><button onClick={() => handleDelete(item)} disabled={deletingId === item._id} className="inline-flex w-full items-center justify-center rounded border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 disabled:opacity-50"><Trash2 className="mr-1.5 h-4 w-4" />{deletingId === item._id ? 'Deleting...' : 'Delete Image'}</button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
