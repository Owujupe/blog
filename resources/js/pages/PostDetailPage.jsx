import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function PostDetailPage({ post }) {
  if (!post) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-white/60">Post not found</p>
      </div>
    );
  }

  return (
    <div data-testid="post-detail-page" className="pt-20">
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
              <Calendar size={16} className="text-[#cdac69]" />
              {formatDate(post.created_at)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
          </header>

          {post.featuredImage && (
            <div className="aspect-[16/9] mb-12 overflow-hidden">
              <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div
              className="text-white/80 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <footer className="mt-12 pt-8 border-t border-white/10">
            <Link href="/posts" className="text-[#cdac69] hover:underline">← Back to Blog</Link>
          </footer>
        </div>
      </article>
    </div>
  );
}

PostDetailPage.layout = page => <PublicLayout>{page}</PublicLayout>;
