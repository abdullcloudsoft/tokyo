import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { Maximize2, X, Sparkles } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 bg-stone-50/70 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700 bg-amber-100/60 px-3 py-1 rounded-full">
            Visual Highlights
          </span>
          <h2
            id="gallery-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mt-3 mb-3"
          >
            Culinary Gallery
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            A glimpse into the art, freshness, and presentation of Tokyo Pan Asian Cuisine.
          </p>
        </div>

        {/* Gallery Grid (8 HD Visuals, 4x2 on desktop, 2x4 on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-stone-200 border border-stone-200 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 sm:p-4">
                <div className="self-end p-1.5 rounded-full bg-white/80 text-stone-900">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-300">
                    {item.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[4/3] sm:aspect-[16/10] w-full bg-stone-100">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h4 className="text-lg font-bold text-stone-900 font-display">
                  {selectedItem.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  {selectedItem.description}
                </p>
              </div>

              <a
                href="#menu"
                onClick={() => setSelectedItem(null)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore on Menu</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
