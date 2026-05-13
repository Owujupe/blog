import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';

export default function AdminPostForm({ post = null }) {
  const { props: { auth } } = usePage();
  const isEdit = !!post;
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    featuredImage: post?.featuredImage || '',
    status: post?.status || 'draft',
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
      const res = await axios.post('/api/upload/posts', data, { headers });
      setForm(f => ({ ...f, featuredImage: res.data.path }));
      toast.success('Image uploaded successfully');
    } catch {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error('Please fill in title and content');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await axios.put(`/api/posts/${post.id}`, form, { headers });
        toast.success('Post updated successfully');
      } else {
        await axios.post('/api/posts', form, { headers });
        toast.success('Post created successfully');
      }
      router.visit('/admin/posts');
    } catch {
      toast.error(isEdit ? 'Failed to update post' : 'Failed to create post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="admin-post-form">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/posts" className="p-2 hover:bg-white/5 rounded">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">{isEdit ? 'Edit Post' : 'New Post'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter post title" className="input-base w-full" data-testid="post-title-input" />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your post content..." rows={15}
              className="input-base w-full resize-none" data-testid="post-content-input" />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Featured Image</label>
            <div className="flex gap-4 items-start">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="featured-image" />
              <label htmlFor="featured-image" className="btn-outline cursor-pointer">
                {uploading ? 'Uploading...' : 'Upload Image'}
              </label>
              {form.featuredImage && <img src={form.featuredImage} alt="Preview" className="h-20 object-cover" />}
            </div>
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="input-base w-48" data-testid="post-status-select">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2" data-testid="save-post-btn">
            <Save size={18} />{saving ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
          </button>
          <Link href="/admin/posts" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

AdminPostForm.layout = page => <AdminLayout>{page}</AdminLayout>;
