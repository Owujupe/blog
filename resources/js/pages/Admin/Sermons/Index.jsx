import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, Play } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../../Layouts/AdminLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AdminSermonsIndex({ sermons: initialSermons = [] }) {
  const { props: { auth } } = usePage();
  const [sermons, setSermons] = useState(initialSermons);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (sermon) => {
    if (!confirm(`Delete "${sermon.title}"? This cannot be undone.`)) return;
    setDeleting(sermon.id);
    try {
      await axios.delete(`/api/sermons/${sermon.id}`, {
        headers: { Authorization: `Bearer ${auth.admin.token}` },
      });
      setSermons(sermons.filter(s => s.id !== sermon.id));
      toast.success('Sermon deleted successfully');
    } catch {
      toast.error('Failed to delete sermon');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div data-testid="admin-sermons-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sermons</h1>
          <p className="text-white/60">Manage your sermon library</p>
        </div>
        <Link href="/admin/sermons/create" className="btn-primary flex items-center gap-2" data-testid="new-sermon-btn">
          <Plus size={18} /> New Sermon
        </Link>
      </div>

      {sermons.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <p className="text-white/60 mb-4">No sermons yet</p>
          <Link href="/admin/sermons/create" className="btn-outline">Add your first sermon</Link>
        </div>
      ) : (
        <div className="bg-[#121212] border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/60 text-sm font-medium">Title</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Speaker</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Series</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Date</th>
                <th className="text-right p-4 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sermons.map((sermon) => (
                <tr key={sermon.id} className="border-b border-white/5 hover:bg-white/2" data-testid={`sermon-row-${sermon.id}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1c1c1c] flex items-center justify-center flex-shrink-0">
                        <Play size={14} className="text-[#cdac69]" />
                      </div>
                      <span className="font-medium text-white">{sermon.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/80">{sermon.speaker}</td>
                  <td className="p-4">
                    {sermon.series && <span className="badge badge-gold">{sermon.series}</span>}
                  </td>
                  <td className="p-4 text-white/60">{formatDate(sermon.sermonDate)}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/sermons/${sermon.id}/edit`} className="p-2 hover:bg-white/5 rounded" data-testid={`edit-sermon-${sermon.id}`}>
                        <Edit size={16} className="text-[#cdac69]" />
                      </Link>
                      <button onClick={() => handleDelete(sermon)} disabled={deleting === sermon.id}
                        className="p-2 hover:bg-white/5 rounded" data-testid={`delete-sermon-${sermon.id}`}>
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

AdminSermonsIndex.layout = page => <AdminLayout>{page}</AdminLayout>;
