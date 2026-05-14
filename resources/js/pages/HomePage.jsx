import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import axios from 'axios';
import { Play, Calendar, Clock, MapPin, ArrowRight, Send } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

const HERO_IMAGE = "https://gjonas.owujupe.com/img/start.jpeg";

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function formatTime(time) {
  if (!time) return '';

  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);

  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
}

function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength
    ? text.substring(0, maxLength) + '...'
    : text;
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

function getYouTubeEmbedUrl(url) {
  if (!url) return '';

  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
  );

  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : '';
}

export default function HomePage({
  latestSermon = null,
  upcomingEvents = [],
  galleryImages = [],
  livestream = null,
  settings = null,
  posts = [],
}) {
  const [prayerForm, setPrayerForm] = useState({
    name: '',
    email: '',
    request: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handlePrayerSubmit = async (e) => {
    e.preventDefault();

    if (!prayerForm.name || !prayerForm.email || !prayerForm.request) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);

    try {
      await axios.post('/api/prayer-requests', prayerForm);

      toast.success('Prayer request submitted successfully');

      setPrayerForm({
        name: '',
        email: '',
        request: '',
      });
    } catch {
      toast.error('Failed to submit prayer request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="home-page">

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center"
        data-testid="hero-section"
      >
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Worship"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
          <div className="max-w-3xl">

            <span className="inline-block text-[#cdac69] text-sm uppercase tracking-widest mb-6">
              This is
            </span>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Wuju
              <span className="text-[#cdac69]"> Blog</span>
            </h1>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/gallery"
                className="btn-primary"
                data-testid="hero-cta-visit"
              >
                Gallery
              </Link>

              <Link
                href="/posts"
                className="btn-outline"
                data-testid="hero-cta-sermons"
              >
                Stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      {posts.length > 0 && (
        <section
          className="py-24 md:py-32 bg-[#111111]"
          data-testid="posts-section"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-2 block">
                  From The Blog
                </span>

                <h2 className="text-4xl md:text-5xl font-semibold text-white">
                  Latest Stories
                </h2>
              </div>

              <Link
                href="/posts"
                className="text-[#cdac69] flex items-center gap-2 hover:gap-3 transition-all"
                data-testid="view-all-posts"
              >
                View All Posts <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {posts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card-base group"
                  data-testid={`home-post-card-${index}`}
                >
                  <Link href={`/posts/${post.slug}`}>

                    {post.featuredImage && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6">

                      <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
                        <Calendar
                          size={14}
                          className="text-[#cdac69]"
                        />

                        {formatDate(post.created_at)}
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#cdac69] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-white/60 text-sm mb-4">
                        {truncate(
                          stripHtml(post.content),
                          120
                        )}
                      </p>

                      <span className="text-[#cdac69] text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}

            </div>
          </div>
        </section>
      )}

      {/* Livestream Section */}
      {livestream?.isActive && livestream?.youtubeUrl && (
        <section className="py-24 md:py-32" data-testid="livestream-section">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-red-500 text-sm uppercase tracking-widest mb-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Live Now
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-white">Watch Live</h2>
            </div>
            <div className="aspect-video bg-[#121212] overflow-hidden">
              <iframe src={getYouTubeEmbedUrl(livestream.youtubeUrl)} title="Livestream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full" data-testid="livestream-iframe" />
            </div>
          </div>
        </section>
      )}

      {/* Latest Sermon Section */}
      {latestSermon && (
        <section
          className="py-24 md:py-32"
          data-testid="latest-sermon-section"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">

              <div>
                <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-2 block">
                  Latest
                </span>

                <h2 className="text-4xl md:text-5xl font-semibold text-white">
                  Publication
                </h2>
              </div>

              <Link
                href="/sermons"
                className="text-[#cdac69] flex items-center gap-2 hover:gap-3 transition-all"
                data-testid="view-all-sermons"
              >
                View All Publications <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <div className="relative aspect-video bg-[#121212] overflow-hidden group">

                {latestSermon.thumbnail ? (
                  <img
                    src={latestSermon.thumbnail}
                    alt={latestSermon.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play
                      size={48}
                      className="text-[#cdac69]"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">

                  <Link
                    href={`/sermons/${latestSermon.slug}`}
                    className="p-4 bg-[#cdac69] rounded-full"
                    data-testid="play-latest-sermon"
                  >
                    <Play
                      size={32}
                      className="text-black fill-black"
                    />
                  </Link>
                </div>
              </div>

              <div>

                <span className="text-[#cdac69] text-sm uppercase tracking-wider">
                  {formatDate(latestSermon.sermonDate)}
                </span>

                <h3 className="text-3xl font-semibold text-white mt-2 mb-4">
                  {latestSermon.title}
                </h3>

                <p className="text-white/60 mb-2">
                  Speaker:
                  <span className="text-white">
                    {' '}
                    {latestSermon.speaker}
                  </span>
                </p>

                {latestSermon.series && (
                  <p className="text-white/60 mb-4">
                    Series:
                    <span className="text-white">
                      {' '}
                      {latestSermon.series}
                    </span>
                  </p>
                )}

                <p className="text-white/70 mb-6">
                  {truncateText(latestSermon.description, 200)}
                </p>

                <Link
                  href={`/sermons/${latestSermon.slug}`}
                  className="btn-outline"
                  data-testid="watch-sermon-btn"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

HomePage.layout = page => (
  <PublicLayout>{page}</PublicLayout>
);