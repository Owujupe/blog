import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, User } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function SermonDetailPage({ sermon }) {
  if (!sermon) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-white/60">Sermon not found</p>
      </div>
    );
  }

  return (
    <div data-testid="sermon-detail-page" className="pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="aspect-video bg-[#121212] mb-8 overflow-hidden" data-testid="sermon-video">
            <iframe
              src={getYouTubeEmbedUrl(sermon.videoUrl)}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-[#cdac69]" />
              {formatDate(sermon.sermonDate)}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} className="text-[#cdac69]" />
              {sermon.speaker}
            </span>
            {sermon.series && <span className="badge badge-gold">{sermon.series}</span>}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{sermon.title}</h1>

          {sermon.description && (
            <div className="prose max-w-none">
              <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">{sermon.description}</p>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/sermons" className="text-[#cdac69] hover:underline">← Back to Sermons</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

SermonDetailPage.layout = page => <PublicLayout>{page}</PublicLayout>;
