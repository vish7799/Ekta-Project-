import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const LightboxModal = ({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex] || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Engineering visual inspection"
      onClick={onClose}
    >
      {/* Top Header bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-white z-10">
        <div className="flex items-center space-x-3 font-mono text-xs text-stone-300">
          <span className="text-red-400">ARCHIVE INSPECTION</span>
          <span>//</span>
          <span>
            IMAGE {currentIndex + 1} OF {images.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image inspection"
          className="p-2 rounded-sm border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Previous */}
      {images.length > 1 && onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-sm border border-white/20 bg-black/60 hover:bg-black/90 text-white transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Navigation Next */}
      {images.length > 1 && onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-sm border border-white/20 bg-black/60 hover:bg-black/90 text-white transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Center Image Container */}
      <div
        className="max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src || currentImage.url}
          alt={currentImage.alt || currentImage.title || 'Engineering inspection image'}
          className="max-h-[75vh] max-w-full object-contain border border-stone-800 shadow-2xl rounded-sm"
        />

        {(currentImage.title || currentImage.caption) && (
          <div className="mt-4 text-center max-w-xl">
            <h3 className="text-white text-base font-medium">
              {currentImage.title}
            </h3>
            {currentImage.caption && (
              <p className="text-stone-400 text-xs mt-1 font-mono">
                {currentImage.caption}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
