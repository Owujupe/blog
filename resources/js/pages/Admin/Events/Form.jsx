import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';

export default function AdminEventForm({ event = null }) {
  const { props: { auth } } = usePage();
  const isEdit = !!event;
  const [form, setForm] = useState({
    title: event?.title || '',
    description: event?.description || '',
    eventDate: event?.eventDate || new Date().toISOString().split('T')[0],
    eventTime: event?.eventTime || '09:00',
    location: event?.location || '',
    banner: event?.banner || '',
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
      const res = await axios.post('/api/upload/events', data, { headers });
      setForm(f => ({ ...f, banner: res.data.path }));
      toast.success('Banner uploaded successfully');
    } catch {
      toast.error('Failed to upload banner');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.eventDate || !form.eventTime || !form.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    setSaving(true);
    try {
      if (isEdit) {
        await axios.put(`/api/events/${event.id}`, form, { headers });
        toast.success('Event updated successfully');
      } else {
        await axios.post('/api/events', form, { headers });
        toast.success('Event created successfully');
      }
      router.visit('/admin/events');
    } catch {
      toast.error(isEdit ? 'Failed to update event' : 'Failed to create event');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="admin-event-form">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 hover:bg-white/5 rounded">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <h1 className="text-3xl font-bold text-white">{isEdit ? 'Edit Event' : 'New Event'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Event Title *</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Event title" className="input-base w-full" data-testid="event-title-input" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Date *</label>
              <input type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                className="input-base w-full" data-testid="event-date-input" />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Time *</label>
              <input type="time" value={form.eventTime} onChange={(e) => setForm({ ...form, eventTime: e.target.value })}
                className="input-base w-full" data-testid="event-time-input" />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Location *</label>
              <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Event location" className="input-base w-full" data-testid="event-location-input" />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Event description..." rows={6}
              className="input-base w-full resize-none" data-testid="event-description-input" />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Banner Image</label>
            <div className="flex gap-4 items-start">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="event-banner" />
              <label htmlFor="event-banner" className="btn-outline cursor-pointer">
                {uploading ? 'Uploading...' : 'Upload Banner'}
              </label>
              {form.banner && <img src={form.banner} alt="Preview" className="h-20 object-cover" />}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2" data-testid="save-event-btn">
            <Save size={18} />{saving ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
          </button>
          <Link href="/admin/events" className="btn-outline">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

AdminEventForm.layout = page => <AdminLayout>{page}</AdminLayout>;
