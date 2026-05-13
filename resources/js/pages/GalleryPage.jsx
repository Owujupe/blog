import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

const categories = [
  { value: 'all', label: 'All' },
  // { value: 'worship', label: 'Worship' },
  { value: 'conferences', label: 'Conferences' },
  { value: 'community', label: 'Community' },
  { value: 'general', label: 'General' },
];

export default function GalleryPage({ images = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = selectedCategory === 'all' ? images : images.filter(img => img.category === selectedCategory);

  return (
    <div data-testid="gallery-page" className="pt-20">
      <section className="py-16 md:py-24 bg-[#111111]" data-testid="gallery-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">Our Moments</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Capturing memorable moments and community life.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap gap-2 mb-12 bg-[#1c1c1c] border border-white/10 p-1 inline-flex">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-sm transition-colors ${
                  selectedCategory === cat.value ? 'bg-[#cdac69] text-black font-semibold' : 'text-white/70 hover:text-white'
                }`}
                data-testid={`category-${cat.value}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No images in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="aspect-square overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                  data-testid={`gallery-item-${index}`}
                >
                  <img
                    src={image.imagePath}
                    alt={image.caption || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" data-testid="lightbox">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>
          <div className="relative max-w-4xl w-full">
            <img
              src={selectedImage.imagePath}
              alt={selectedImage.caption || 'Gallery image'}
              className="w-full max-h-[80vh] object-contain"
            />
            {selectedImage.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
                <p className="text-white text-center">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

GalleryPage.layout = page => <PublicLayout>{page}</PublicLayout>;
