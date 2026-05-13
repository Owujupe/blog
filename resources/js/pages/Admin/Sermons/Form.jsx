import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';

export default function AdminSermonForm({ sermon = null }) {
  const { props: { auth } } = usePage();
  const isEdit = !!sermon;
  const [form, setForm] = useState({
    title: sermon?.title || '',
    speaker: sermon?.speaker || '',
    series: sermon?.series || '',
    description: sermon?.description || '',
    videoUrl: sermon?.videoUrl || '',
    thumbnail: sermon?.thumbnail || '',
    sermonDate: sermon?.sermonDate || new Date().toISOString().split('T')[0],
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const headers = { Authorization: `Bearer ${auth.admin.token}` };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await axios.post('/api/upload/sermons', data, { headers });
      setForm(f => ({ ...f, thumbnail: res.data.path }));
      toast.success('Thumbnail uploaded successfully');
    } catch {
      toast.error('Failed to upload thumbnail');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.speaker || !form.videoUrl || !form.sermonDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await axios.put(`/api/sermons/${sermon.id}`, form, { headers });
        toast.success('Sermon updated successfully');
      } else {
        await axios.post('/api/sermons', form, { headers });
        toast.success('Sermon created successfully');
      }
      router.visit('/admin/sermons');
    } catch {
      toast.error(isEdit ? 'Failed to update sermon' : 'Failed to create sermon');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="admin-sermon-form">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/sermons" className="p-2 hover:bg-white/5 rounded">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">{isEdit ? 'Edit Sermon' : 'New Sermon'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Sermon title" className="input-base w-full" data-testid="sermon-title-input" />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Speaker *</label>
              <input type="text" value={form.speaker} onChange={(e) => setForm({ ...form, speaker: e.target.value })}
                placeholder="Speaker name" className="input-base w-full" data-testid="sermon-speaker-input" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Series</label>
              <input type="text" value={form.series} onChange={(e) => setForm({ ...form, series: e.target.value })}
                placeholder="Sermon series (optional)" className="input-base w-full" data-testid="sermon-series-input" />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Sermon Date *</label>
              <input type="date" value={form.sermonDate} onChange={(e) => setForm({ ...form, sermonDate: e.target.value })}
                className="input-base w-full" data-testid="sermon-date-input" />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">YouTube Video URL *</label>
            <input type="url" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=..." className="input-base w-full" data-testid="sermon-video-input" />
            <p className="text-white/40 text-xs mt-1">Paste the YouTube video URL</p>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Sermon description..." rows={6}
              className="input-base w-full resize-none" data-testid="sermon-description-input" />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Thumbnail</label>
            <div className="flex gap-4 items-start">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="sermon-thumbnail" />
              <label htmlFor="sermon-thumbnail" className="btn-outline cursor-pointer">
                {uploading ? 'Uploading...' : 'Upload Thumbnail'}
              </label>
              {form.thumbnail && <img src={form.thumbnail} alt="Preview" className="h-20 object-cover" />}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2" data-testid="save-sermon-btn">
            <Save size={18} />{saving ? 'Saving...' : (isEdit ? 'Update Sermon' : 'Create Sermon')}
          </button>
          <Link href="/admin/sermons" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

AdminSermonForm.layout = page => <AdminLayout>{page}</AdminLayout>;
