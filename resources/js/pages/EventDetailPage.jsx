import React from 'react';
import { Link } from '@inertiajs/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import PublicLayout from './Layouts/PublicLayout';

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(time) {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
}

export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-white/60">Event not found</p>
      </div>
    );
  }

  return (
    <div data-testid="event-detail-page" className="pt-20">
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {event.banner && (
            <div className="aspect-video mb-8 overflow-hidden">
              <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-[#cdac69]" />{formatDate(event.eventDate)}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-[#cdac69]" />{formatTime(event.eventTime)}</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[#cdac69]" />{event.location}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{event.title}</h1>

          <div className="prose max-w-none">
            <p className="text-white/70 text-lg leading-relaxed whitespace-pre-wrap">{event.description}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <Link href="/events" className="text-[#cdac69] hover:underline">← Back to Events</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

EventDetailPage.layout = page => <PublicLayout>{page}</PublicLayout>;
