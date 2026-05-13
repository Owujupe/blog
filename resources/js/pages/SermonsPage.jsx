import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Play, Calendar, User, Search } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function SermonsPage({ sermons = [], speakers = [], seriesList = [] }) {
  const [search, setSearch] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');

  const filtered = sermons.filter((s) => {
    const matchesSearch = !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      (s.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesSpeaker = !selectedSpeaker || selectedSpeaker === 'all' || s.speaker === selectedSpeaker;
    const matchesSeries = !selectedSeries || selectedSeries === 'all' || s.series === selectedSeries;
    return matchesSearch && matchesSpeaker && matchesSeries;
  });

  return (
    <div data-testid="sermons-page" className="pt-20">
      <section className="py-16 md:py-24 bg-[#111111]" data-testid="sermons-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">Wuju</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Publications</h1>
            {/* <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Explore our sermon library and grow in your faith through God's Word.
            </p> */}
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search sermons..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base w-full pl-12"
                data-testid="sermon-search"
              />
            </div>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="input-base w-full md:w-48"
              data-testid="speaker-filter"
            >
              <option value="">All Speakers</option>
              <option value="all">All Speakers</option>
              {speakers.map((sp) => <option key={sp} value={sp}>{sp}</option>)}
            </select>
            <select
              value={selectedSeries}
              onChange={(e) => setSelectedSeries(e.target.value)}
              className="input-base w-full md:w-48"
              data-testid="series-filter"
            >
              <option value="">All Series</option>
              <option value="all">All Series</option>
              {seriesList.map((sr) => <option key={sr} value={sr}>{sr}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="sermons-list">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No Publication found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((sermon, index) => (
                <motion.div key={sermon.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  className="card-base group" data-testid={`sermon-card-${index}`}>
                  <Link href={`/sermons/${sermon.slug}`}>
                    <div className="relative aspect-video overflow-hidden">
                      {sermon.thumbnail ? (
                        <img src={sermon.thumbnail} alt={sermon.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-[#1c1c1c] flex items-center justify-center">
                          <Play size={48} className="text-[#cdac69]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-4 bg-[#cdac69] rounded-full">
                          <Play size={24} className="text-black fill-black" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-[#cdac69]" />
                          {formatDate(sermon.sermonDate)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#cdac69] transition-colors">
                        {sermon.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-3 flex items-center gap-1">
                        <User size={14} className="text-[#cdac69]" />
                        {sermon.speaker}
                      </p>
                      {sermon.series && <span className="badge badge-gold">{sermon.series}</span>}
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

SermonsPage.layout = page => <PublicLayout>{page}</PublicLayout>;
