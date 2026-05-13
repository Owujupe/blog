import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FileText, Video, Calendar, Image, Heart, MessageSquare } from 'lucide-react';
import AdminLayout from '../Layouts/AdminLayout';

export default function AdminDashboard({ stats = {} }) {
  const statCards = [
    { name: 'Posts', value: stats.posts || 0, icon: FileText, color: 'text-blue-400', link: '/admin/posts' },
    { name: 'Sermons', value: stats.sermons || 0, icon: Video, color: 'text-purple-400', link: '/admin/sermons' },
    { name: 'Events', value: stats.events || 0, icon: Calendar, color: 'text-green-400', link: '/admin/events' },
    { name: 'Gallery', value: stats.gallery || 0, icon: Image, color: 'text-pink-400', link: '/admin/gallery' },
    { name: 'Prayer Requests', value: stats.prayer_requests || 0, icon: Heart, color: 'text-red-400', link: '/admin/prayer-requests', badge: stats.unread_prayers },
    { name: 'Messages', value: stats.contact_messages || 0, icon: MessageSquare, color: 'text-yellow-400', link: '/admin/messages' },
  ];

  const quickActions = [
    { name: 'New Post', link: '/admin/posts/create', icon: FileText },
    { name: 'New Sermon', link: '/admin/sermons/create', icon: Video },
    { name: 'New Event', link: '/admin/events/create', icon: Calendar },
    { name: 'Upload Images', link: '/admin/gallery', icon: Image },
  ];

  return (
    <div data-testid="admin-dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome to the Guiding Light Assembly CMS</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div key={stat.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Link href={stat.link}
              className="block p-6 bg-[#121212] border border-white/5 hover:border-[#cdac69]/30 transition-colors relative"
              data-testid={`stat-${stat.name.toLowerCase().replace(' ', '-')}`}>
              {stat.badge > 0 && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{stat.badge}</span>
              )}
              <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.name}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.name} href={action.link}
              className="flex items-center gap-3 p-4 bg-[#121212] border border-white/5 hover:border-[#cdac69]/30 transition-colors"
              data-testid={`quick-action-${action.name.toLowerCase().replace(' ', '-')}`}>
              <div className="p-2 bg-[#cdac69]/10">
                <action.icon size={20} className="text-[#cdac69]" />
              </div>
              <span className="text-white">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-6 bg-[#121212] border border-white/5">
        <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
        <div className="space-y-4 text-white/70">
          <p>Welcome to your church website CMS. Here you can:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Create and manage blog posts</li>
            <li>Upload sermon videos with YouTube links</li>
            <li>Schedule and manage events</li>
            <li>Upload images to the gallery</li>
            <li>Control your YouTube livestream display</li>
            <li>View prayer requests from visitors</li>
            <li>Read and manage contact messages</li>
            <li>Update site settings and contact information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

AdminDashboard.layout = page => <AdminLayout>{page}</AdminLayout>;
