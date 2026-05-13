import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

export default function PostsPage({ posts = [] }) {
  return (
    <div data-testid="posts-page" className="pt-20">
      <section className="py-16 md:py-24 bg-[#111111]" data-testid="posts-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">Our Blog</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Latest Posts</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Stay updated with news, projects, and announcements.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  className="card-base group" data-testid={`post-card-${index}`}>
                  <Link href={`/posts/${post.slug}`}>
                    {post.featuredImage && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={post.featuredImage} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3 text-sm text-white/60">
                        <Calendar size={14} className="text-[#cdac69]" />
                        {formatDate(post.created_at)}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#cdac69] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">{truncate(stripHtml(post.content), 120)}</p>
                      <span className="text-[#cdac69] text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

PostsPage.layout = page => <PublicLayout>{page}</PublicLayout>;
