import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function AdminPostsIndex({ posts: initialPosts = [] }) {
  const { props: { auth } } = usePage();
  const [posts, setPosts] = useState(initialPosts);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    try {
      await axios.delete(`/api/posts/${post.id}`, {
        headers: { Authorization: `Bearer ${auth.admin.token}` },
      });
      setPosts(posts.filter(p => p.id !== post.id));
      toast.success('Post deleted successfully');
    } catch {
      toast.error('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div data-testid="admin-posts-page">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-white/60">Manage your blog posts</p>
        </div>
        <Link href="/admin/posts/create" className="btn-primary flex items-center gap-2" data-testid="new-post-btn">
          <Plus size={18} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-white/5">
          <p className="text-white/60 mb-4">No posts yet</p>
          <Link href="/admin/posts/create" className="btn-outline">Create your first post</Link>
        </div>
      ) : (
        <div className="bg-[#121212] border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-white/60 text-sm font-medium">Title</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Status</th>
                <th className="text-left p-4 text-white/60 text-sm font-medium">Date</th>
                <th className="text-right p-4 text-white/60 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/2" data-testid={`post-row-${post.id}`}>
                  <td className="p-4 font-medium text-white">{post.title}</td>
                  <td className="p-4">
                    <span className={`badge ${post.status === 'published' ? 'badge-success' : 'badge-warning'}`}>{post.status}</span>
                  </td>
                  <td className="p-4 text-white/60">{formatDate(post.created_at)}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/posts/${post.id}/edit`} className="p-2 hover:bg-white/5 rounded" data-testid={`edit-post-${post.id}`}>
                        <Edit size={16} className="text-[#cdac69]" />
                      </Link>
                      <button onClick={() => handleDelete(post)} disabled={deleting === post.id}
                        className="p-2 hover:bg-white/5 rounded" data-testid={`delete-post-${post.id}`}>
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

AdminPostsIndex.layout = page => <AdminLayout>{page}</AdminLayout>;
