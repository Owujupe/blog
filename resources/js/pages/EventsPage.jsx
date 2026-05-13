import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

function getCountdown(eventDate) {
  const now = new Date();
  const target = new Date(eventDate);
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

function EventCard({ event, index, showCountdown }) {
  const [countdown, setCountdown] = useState(getCountdown(event.eventDate));

  useEffect(() => {
    if (!showCountdown) return;
    const timer = setInterval(() => setCountdown(getCountdown(event.eventDate)), 1000);
    return () => clearInterval(timer);
  }, [event.eventDate, showCountdown]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      className="card-base flex flex-col md:flex-row overflow-hidden" data-testid={`event-card-${index}`}>
      {event.banner && (
        <div className="md:w-80 aspect-video md:aspect-auto overflow-hidden flex-shrink-0">
          <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/60">
            <span className="flex items-center gap-2"><Calendar size={16} className="text-[#cdac69]" />{formatDate(event.eventDate)}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-[#cdac69]" />{formatTime(event.eventTime)}</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[#cdac69]" />{event.location}</span>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">{event.title}</h3>
          <p className="text-white/60">{truncate(event.description, 200)}</p>
        </div>
        {showCountdown && countdown.days > 0 && (
          <div className="mt-6 flex gap-4">
            <div className="countdown-item"><span className="countdown-number">{countdown.days}</span><span className="countdown-label">Days</span></div>
            <div className="countdown-item"><span className="countdown-number">{countdown.hours}</span><span className="countdown-label">Hours</span></div>
            <div className="countdown-item"><span className="countdown-number">{countdown.minutes}</span><span className="countdown-label">Mins</span></div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function EventsPage({ upcomingEvents = [], pastEvents = [] }) {
  const [tab, setTab] = useState('upcoming');

  return (
    <div data-testid="events-page" className="pt-20">
      <section className="py-16 md:py-24 bg-[#111111]" data-testid="events-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">What's Happening</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Events</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Corporate and Community Events.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex gap-2 mb-8 bg-[#1c1c1c] border border-white/10 p-1 inline-flex rounded">
            <button onClick={() => setTab('upcoming')}
              className={`px-4 py-2 text-sm rounded transition-colors ${tab === 'upcoming' ? 'bg-[#cdac69] text-black font-semibold' : 'text-white/70 hover:text-white'}`}
              data-testid="upcoming-tab">
              Upcoming Events ({upcomingEvents.length})
            </button>
            <button onClick={() => setTab('past')}
              className={`px-4 py-2 text-sm rounded transition-colors ${tab === 'past' ? 'bg-[#cdac69] text-black font-semibold' : 'text-white/70 hover:text-white'}`}
              data-testid="past-tab">
              Past Events ({pastEvents.length})
            </button>
          </div>

          {tab === 'upcoming' && (
            upcomingEvents.length === 0 ? (
              <div className="text-center py-20"><p className="text-white/60 text-lg">No upcoming events at the moment.</p></div>
            ) : (
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} showCountdown />
                ))}
              </div>
            )
          )}

          {tab === 'past' && (
            pastEvents.length === 0 ? (
              <div className="text-center py-20"><p className="text-white/60 text-lg">No past events.</p></div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                    className="card-base" data-testid={`past-event-${index}`}>
                    {event.banner && (
                      <div className="aspect-video overflow-hidden opacity-70">
                        <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-white/40 text-sm">{formatDate(event.eventDate)}</span>
                      <h3 className="text-lg font-semibold text-white/80 mt-2">{event.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

EventsPage.layout = page => <PublicLayout>{page}</PublicLayout>;
