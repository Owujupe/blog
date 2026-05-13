import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Heart, Mail, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../Layouts/AdminLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function PrayerRequestCard({ request, onMarkRead, onDelete, isRead }) {
  return (
    <div className={`p-6 bg-[#121212] border ${isRead ? 'border-white/5' : 'border-[#cdac69]/30'}`} data-testid={`prayer-request-${request.id}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white font-semibold">{request.name}</h3>
          <p className="text-white/60 text-sm flex items-center gap-2">
            <Mail size={14} />
            {request.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm">{formatDate(request.created_at)}</span>
          {!isRead && onMarkRead && (
            <button onClick={() => onMarkRead(request.id)} className="p-2 hover:bg-white/5 rounded text-green-400" title="Mark as read" data-testid={`mark-read-${request.id}`}>
              <Check size={18} />
            </button>
          )}
          <button onClick={() => onDelete(request.id)} className="p-2 hover:bg-white/5 rounded text-red-400" data-testid={`delete-prayer-${request.id}`}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="p-4 bg-[#0a0a0a] border border-white/5">
        <p className="text-white/80 whitespace-pre-wrap">{request.request}</p>
      </div>
    </div>
  );
}

export default function AdminPrayerRequests({ prayerRequests: initialRequests = [] }) {
  const { props: { auth } } = usePage();
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState('unread');

  const headers = { Authorization: `Bearer ${auth.admin.token}` };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`/api/prayer-requests/${id}/read`, {}, { headers });
      setRequests(requests.map(r => r.id === id ? { ...r, isRead: true } : r));
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this prayer request?')) return;
    try {
      await axios.delete(`/api/prayer-requests/${id}`, { headers });
      setRequests(requests.filter(r => r.id !== id));
      toast.success('Prayer request deleted');
    } catch {
      toast.error('Failed to delete prayer request');
    }
  };

  const unreadRequests = requests.filter(r => !r.isRead);
  const readRequests = requests.filter(r => r.isRead);

  return (
    <div data-testid="admin-prayer-requests-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Prayer Requests</h1>
        <p className="text-white/60">View and manage prayer requests from visitors</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <Heart className="w-12 h-12 text-[#cdac69] mx-auto mb-4" />
          <p className="text-white/60">No prayer requests yet</p>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-6 bg-[#1c1c1c] border border-white/10 p-1 w-fit">
            <button onClick={() => setActiveTab('unread')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'unread' ? 'bg-[#cdac69] text-black' : 'text-white/60 hover:text-white'}`}
              data-testid="unread-tab">
              Unread ({unreadRequests.length})
            </button>
            <button onClick={() => setActiveTab('read')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'read' ? 'bg-[#cdac69] text-black' : 'text-white/60 hover:text-white'}`}
              data-testid="read-tab">
              Read ({readRequests.length})
            </button>
          </div>

          {activeTab === 'unread' && (
            unreadRequests.length === 0 ? (
              <div className="text-center py-12 bg-[#121212] border border-white/5">
                <p className="text-white/60">No unread prayer requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {unreadRequests.map((request) => (
                  <PrayerRequestCard key={request.id} request={request} onMarkRead={handleMarkRead} onDelete={handleDelete} />
                ))}
              </div>
            )
          )}

          {activeTab === 'read' && (
            readRequests.length === 0 ? (
              <div className="text-center py-12 bg-[#121212] border border-white/5">
                <p className="text-white/60">No read prayer requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {readRequests.map((request) => (
                  <PrayerRequestCard key={request.id} request={request} onDelete={handleDelete} isRead />
                ))}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

AdminPrayerRequests.layout = page => <AdminLayout>{page}</AdminLayout>;
