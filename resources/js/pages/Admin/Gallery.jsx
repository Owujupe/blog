import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Upload, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../Layouts/AdminLayout';

const categories = [
  { value: 'worship', label: 'Worship' },
  { value: 'conferences', label: 'Conferences' },
  { value: 'community', label: 'Community' },
  { value: 'general', label: 'General' },
];

export default function AdminGallery({ images: initialImages = [] }) {
  const { props: { auth } } = usePage();
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({ caption: '', category: 'general' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const headers = { Authorization: `Bearer ${auth.admin.token}` };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setShowModal(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', selectedFile);
      const uploadRes = await axios.post('/api/upload/gallery', data, { headers });

      const galleryRes = await axios.post('/api/gallery', {
        imagePath: uploadRes.data.path,
        caption: uploadForm.caption,
        category: uploadForm.category,
      }, { headers });

      setImages(prev => [galleryRes.data, ...prev]);
      toast.success('Image uploaded successfully');
      setShowModal(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadForm({ caption: '', category: 'general' });
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image? This cannot be undone.')) return;
    try {
      await axios.delete(`/api/gallery/${id}`, { headers });
      setImages(images.filter(img => img.id !== id));
      toast.success('Image deleted successfully');
    } catch {
      toast.error('Failed to delete image');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div data-testid="admin-gallery-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gallery</h1>
          <p className="text-white/60">Manage your image gallery</p>
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="gallery-upload" />
          <label htmlFor="gallery-upload" className="btn-primary flex items-center gap-2 cursor-pointer" data-testid="upload-image-btn">
            <Upload size={18} /> Upload Image
          </label>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <p className="text-white/60 mb-4">No images in the gallery</p>
          <label htmlFor="gallery-upload" className="btn-outline cursor-pointer">Upload your first image</label>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group aspect-square bg-[#121212] border border-white/5 overflow-hidden" data-testid={`gallery-item-${image.id}`}>
              <img src={image.imagePath} alt={image.caption || 'Gallery image'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => handleDelete(image.id)} className="p-3 bg-red-500 hover:bg-red-600 rounded-full" data-testid={`delete-image-${image.id}`}>
                  <Trash2 size={20} className="text-white" />
                </button>
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/70">
                  <p className="text-white text-sm truncate">{image.caption}</p>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className="badge badge-gold text-xs">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="bg-[#121212] border border-white/10 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Upload Image</h2>
              <button onClick={closeModal} className="p-1 hover:bg-white/5 rounded">
                <X size={20} className="text-white/60" />
              </button>
            </div>
            <div className="space-y-4">
              {previewUrl && (
                <div className="aspect-video bg-[#1c1c1c] overflow-hidden">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <label className="block text-white/70 text-sm mb-2">Caption</label>
                <input type="text" value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                  placeholder="Image caption (optional)" className="input-base w-full" data-testid="image-caption-input" />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Category</label>
                <select value={uploadForm.category}
                  onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                  className="input-base w-full" data-testid="image-category-select">
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4 pt-2">
                <button onClick={handleUpload} disabled={uploading} className="btn-primary flex-1" data-testid="confirm-upload-btn">
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button onClick={closeModal} className="btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

AdminGallery.layout = page => <AdminLayout>{page}</AdminLayout>;
