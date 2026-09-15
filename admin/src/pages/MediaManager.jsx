import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Image, RefreshCw, Trash2, Search } from 'lucide-react';
import { adminFetchApi, resolveMediaUrl } from '../api/adminApiClient';

export const MediaManager = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const loadMedia = () => {
    setLoading(true);
    setError('');
    adminFetchApi('/media')
      .then((response) => setMedia(response.data || []))
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

  const filteredMedia = media.filter((item) => {
    const term = searchTerm.toLowerCase();
    return [item.originalName, item.fileName, item.altText, item.caption]
      .some((value) => value?.toLowerCase().includes(term));
  });

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

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-admin-500" />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search uploaded images..." className="w-full rounded border border-admin-800 bg-admin-950 py-1.5 pl-9 pr-3 text-xs text-white focus:border-amber-500 focus:outline-none" />
        </div>

        {error && <div className="rounded border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">{error}</div>}

        {loading ? (
          <div className="rounded-lg border border-admin-800 bg-admin-900 p-12 text-center text-xs text-admin-400"><RefreshCw className="mr-2 inline h-4 w-4 animate-spin text-amber-500" /> Loading media library...</div>
        ) : filteredMedia.length === 0 ? (
          <div className="rounded-lg border border-dashed border-admin-800 bg-admin-900/40 p-12 text-center"><Image className="mx-auto mb-3 h-12 w-12 text-admin-600" /><h3 className="text-sm font-bold text-admin-200">No uploaded images found</h3></div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredMedia.map((item) => (
              <div key={item._id} className="overflow-hidden rounded-lg border border-admin-800 bg-admin-900">
                <div className="flex aspect-video items-center justify-center bg-admin-950 p-2">
                  <img src={resolveMediaUrl(item.filePath)} alt={item.altText || item.originalName} className="h-full w-full object-contain" />
                </div>
                <div className="space-y-3 p-4">
                  <div className="min-w-0"><p className="truncate text-xs font-semibold text-white" title={item.originalName}>{item.originalName}</p><p className="mt-1 text-[10px] font-mono text-admin-500">{Math.ceil((item.sizeBytes || 0) / 1024)} KB</p></div>
                  <button onClick={() => handleDelete(item)} disabled={deletingId === item._id} className="inline-flex w-full items-center justify-center rounded border border-rose-500/30 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 disabled:opacity-50"><Trash2 className="mr-1.5 h-4 w-4" />{deletingId === item._id ? 'Deleting...' : 'Delete Image'}</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
