import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTime(time) {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${ampm}`;
}

export default function AdminEventsIndex({ events: initialEvents = [] }) {
  const { props: { auth } } = usePage();
  const [events, setEvents] = useState(initialEvents);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (event) => {
    if (!confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    setDeleting(event.id);
    try {
      await axios.delete(`/api/events/${event.id}`, {
        headers: { Authorization: `Bearer ${auth.admin.token}` },
      });
      setEvents(events.filter(e => e.id !== event.id));
      toast.success('Event deleted successfully');
    } catch {
      toast.error('Failed to delete event');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div data-testid="admin-events-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
          <p className="text-white/60">Manage your church events</p>
        </div>
        <Link href="/admin/events/create" className="btn-primary flex items-center gap-2" data-testid="new-event-btn">
          <Plus size={18} /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <p className="text-white/60 mb-4">No events yet</p>
          <Link href="/admin/events/create" className="btn-outline">Create your first event</Link>
        </div>
      ) : (
        <div className="bg-[#121212] border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/60 text-sm font-medium">Event</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Date</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Time</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Location</th>
                <th className="text-right p-4 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b border-white/5 hover:bg-white/2" data-testid={`event-row-${event.id}`}>
                  <td className="p-4 font-medium text-white">{event.title}</td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-white/80">
                      <Calendar size={14} className="text-[#cdac69]" />
                      {formatDate(event.eventDate)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-white/80">
                      <Clock size={14} className="text-[#cdac69]" />
                      {formatTime(event.eventTime)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-2 text-white/60">
                      <MapPin size={14} className="text-[#cdac69]" />
                      {event.location}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/events/${event.id}/edit`} className="p-2 hover:bg-white/5 rounded" data-testid={`edit-event-${event.id}`}>
                        <Edit size={16} className="text-[#cdac69]" />
                      </Link>
                      <button onClick={() => handleDelete(event)} disabled={deleting === event.id}
                        className="p-2 hover:bg-white/5 rounded" data-testid={`delete-event-${event.id}`}>
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

AdminEventsIndex.layout = page => <AdminLayout>{page}</AdminLayout>;
