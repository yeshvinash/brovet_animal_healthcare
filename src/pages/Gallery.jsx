import React, { useState } from 'react';
import { db } from '../utils/db';
import { Icons } from '../components/UI/Icons';
import { SimpleBreadcrumbs as Breadcrumbs } from '../components/UI/Breadcrumb';
import { Tabs, TabsList, TabsTrigger } from '../components/UI/Tabs';

const Gallery = () => {
  const gallery = db.getGallery();
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxImg, setLightboxImg] = useState(null);

  const tabs = ['All', 'Products', 'Packaging', 'Office', 'Warehouse', 'Team', 'Events', 'Farm Visits'];

  const filteredItems = activeTab === 'All' 
    ? gallery 
    : gallery.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
      
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Photo Gallery" }]} />

      {/* Header */}
      <div className="py-5 sm:py-6 border-b border-neutral-border mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark">Brovet Gallery</h1>
        <p className="text-neutral-muted text-sm mt-1 leading-relaxed">
          Take a look at our manufacturing facility, raw material warehouses, packaging lines, team meets, and farm trials.
        </p>
      </div>

      {/* Category Tabs — scrollable on mobile */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8 sm:mb-10">
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList variant="line" className="w-full">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="px-3 sm:px-5">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {/* Gallery Photo Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-xl border border-neutral-border overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 sm:hover:-translate-y-1 cursor-pointer"
              onClick={() => setLightboxImg(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxImg(item);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="aspect-square bg-neutral-light overflow-hidden relative">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 sm:group-hover:scale-105" 
                />
                {/* Overlay: always readable on touch; enriched on hover for desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-widest text-amber-200 font-bold mb-1">{item.category}</span>
                  <h4 className="font-bold text-sm leading-tight">{item.title}</h4>
                </div>
              </div>
              <div className="p-4 border-t sm:group-hover:hidden">
                <span className="text-xs font-bold text-primary uppercase block mb-1">{item.category}</span>
                <h4 className="font-bold text-sm text-neutral-dark line-clamp-2">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-muted">
          No photos found under this category tab.
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            type="button"
            className="absolute top-4 right-4 text-white hover:text-slate-300 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg bg-white/10"
            onClick={() => setLightboxImg(null)}
            aria-label="Close lightbox"
          >
            <Icons.X className="w-6 h-6" />
          </button>
          
          <div 
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center bg-transparent relative fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImg.url} 
              alt={lightboxImg.title} 
              className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="text-center text-white mt-4 space-y-1 px-2">
              <span className="text-xs uppercase tracking-wider text-accent font-bold">{lightboxImg.category}</span>
              <h3 className="text-base font-bold">{lightboxImg.title}</h3>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
