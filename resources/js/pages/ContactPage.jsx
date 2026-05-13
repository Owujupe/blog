import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import PublicLayout from './Layouts/PublicLayout';

export default function ContactPage() {
  const { props: { siteSettings: settings } } = usePage();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/api/contact', form);
      toast.success('Message sent successfully! We will get back to you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const s = settings || {};

  return (
    <div data-testid="contact-page" className="pt-20">
      <section className="py-16 md:py-24 bg-[#111111]" data-testid="contact-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">Get In Touch</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We'd love to hear from you. Reach out with any questions or prayer requests.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-white mb-8">Get Directions</h2>
              <div className="aspect-video bg-[#121212] mb-8 overflow-hidden" data-testid="google-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.8233599037397!2d7.4904!3d9.0765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMzUuNCJOIDfCsDI5JzI1LjQiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                  width="100%" height="100%"
                  style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Church Location"
                />
              </div>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Address', value: s.address || '123 Faith Avenue, Wuse 2, Abuja, Nigeria' },
                  { icon: Phone, label: 'Phone', value: s.phone || '+234 800 123 4567', href: `tel:${s.phone}` },
                  { icon: Mail, label: 'Email', value: s.email || 'info@guidinglightassembly.org', href: `mailto:${s.email}` },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 bg-[#121212] border border-white/5">
                    <div className="p-3 bg-[#cdac69]/10"><Icon className="w-6 h-6 text-[#cdac69]" /></div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{label}</h3>
                      {href ? (
                        <a href={href} className="text-white/60 hover:text-[#cdac69]">{value}</a>
                      ) : (
                        <p className="text-white/60">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4 p-4 bg-[#121212] border border-white/5">
                  <div className="p-3 bg-[#cdac69]/10"><Clock className="w-6 h-6 text-[#cdac69]" /></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Service Times</h3>
                    <p className="text-white/60">{s.serviceDay || 'Sunday'} - {s.serviceTime || '9:00 AM'}</p>
                    <p className="text-white/60">Wednesday Bible Study - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-white mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Your Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name" className="input-base w-full" data-testid="contact-name-input" />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Email Address *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter your email" className="input-base w-full" data-testid="contact-email-input" />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Enter your phone number" className="input-base w-full" data-testid="contact-phone-input" />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Message *</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we help you?" rows={6}
                    className="input-base w-full resize-none" data-testid="contact-message-input" />
                </div>
                <button type="submit" disabled={submitting}
                  className="btn-primary w-full flex items-center justify-center gap-2" data-testid="contact-submit-btn">
                  {submitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

ContactPage.layout = page => <PublicLayout>{page}</PublicLayout>;
