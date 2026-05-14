import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
  LayoutDashboard,
  FileText,
  Video,
  Calendar,
  Image,
  Radio,
  Heart,
  Settings,
  LogOut,
  MessageSquare,
  Menu,
  X,
  DollarSign,
} from 'lucide-react';

const LOGO_URL = "https://wujupay.ca/assets/images/pingg-removebg-preview.png";

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Posts', path: '/admin/posts', icon: FileText },
  { name: 'Sermons', path: '/admin/sermons', icon: Video },
  { name: 'Events', path: '/admin/events', icon: Calendar },
  { name: 'Gallery', path: '/admin/gallery', icon: Image },
  { name: 'Livestream', path: '/admin/livestream', icon: Radio },
  { name: 'Giving', path: '/admin/giving', icon: DollarSign },
  { name: 'Prayer Requests', path: '/admin/prayer-requests', icon: Heart },
  { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const { url } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.post('/admin/logout');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex" data-testid="admin-layout">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/5 transform transition-transform lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        data-testid="admin-sidebar"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/5">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <img src={LOGO_URL} alt="GLA" className="h-10 w-auto" />
              <span className="text-white font-semibold">Admin CMS</span>
            </Link>
          </div>

          <nav className="flex-1 py-6 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = url.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-6 py-3 text-sm admin-nav-item ${
                    isActive ? 'active text-[#cdac69]' : 'text-white/70 hover:text-white'
                  }`}
                  data-testid={`admin-nav-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  <item.icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-white/5">
            <Link href="/" className="block text-white/50 text-sm hover:text-white mb-4" target="_blank">
              View Website →
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm"
              data-testid="logout-btn"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-[#111111] border-b border-white/5 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-white"
            data-testid="mobile-sidebar-toggle"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm hidden sm:block">Welcome, Admin</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
