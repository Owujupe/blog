import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Heart } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import PublicLayout from './Layouts/PublicLayout';

const ABOUT_IMAGE = "https://lyrics.glaabuja.org/backup/public/images/2025/teach.jpg";

const leadership = [
  { name: 'Apostle Israel W. Abam', role: 'Senior Pastor', image: 'https://lyrics.glaabuja.org/backup/public/images/2025/papaaa.jpg' },
  { name: 'Pastor Dorcas Abam', role: 'Pastor', image: 'https://lyrics.glaabuja.org/backup/public/images/slider/mama.jpg' },
  { name: 'Pastor Peter Owoedimo', role: 'Resident Pastor', image: 'https://lyrics.glaabuja.org/backup/public/images/pstp.jpg' },
];

export default function AboutPage() {
  const { props: { siteSettings: settings } } = usePage();

  return (
    <div data-testid="about-page" className="pt-20">
      <section className="relative py-24 md:py-32" data-testid="about-hero">
        <div className="absolute inset-0">
          <img src={ABOUT_IMAGE} alt="About" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Story</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Guiding Light Assembly has been a beacon of hope and faith in Abuja for over a decade.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#111111]" data-testid="church-overview">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-semibold text-white mb-6">Welcome to Our Family</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {settings?.aboutShort || 'Guiding Light Assembly is a vibrant, multicultural church located in the heart of Abuja, Nigeria. Founded on the principles of faith, love, and community service.'}
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Our church is committed to creating an atmosphere where people can encounter God, grow in their faith, and discover their purpose.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={ABOUT_IMAGE} alt="Church community" className="w-full aspect-[4/3] object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" data-testid="vision-mission">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 bg-[#121212] border border-white/5">
              <div className="p-4 bg-[#cdac69]/10 border border-[#cdac69]/30 inline-block mb-6">
                <Eye className="w-8 h-8 text-[#cdac69]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {settings?.vision || "To raise a generation of leaders who will transform their world through the power of God's Word."}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-8 bg-[#121212] border border-white/5">
              <div className="p-4 bg-[#cdac69]/10 border border-[#cdac69]/30 inline-block mb-6">
                <Target className="w-8 h-8 text-[#cdac69]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {settings?.mission || "To build leaders through the teaching of God's Word, fellowship, and community service."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#111111]" data-testid="core-values">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-2 block">What We Believe</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Love', description: 'We are committed to loving God and loving people unconditionally.' },
              { icon: Users, title: 'Community', description: 'We believe in the power of authentic relationships and fellowship.' },
              { icon: Target, title: 'Excellence', description: 'We strive for excellence in everything we do for the glory of God.' },
              { icon: Eye, title: 'Faith', description: 'We walk by faith, trusting God in every situation and circumstance.' },
            ].map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="p-6 bg-[#0a0a0a] border border-white/5 text-center">
                <div className="p-3 bg-[#cdac69]/10 inline-block mb-4">
                  <value.icon className="w-6 h-6 text-[#cdac69]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32" data-testid="leadership">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-2 block">Meet Our Team</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">Leadership</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div key={leader.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="text-center" data-testid={`leader-${index}`}>
                <div className="mb-6 overflow-hidden">
                  <img src={leader.image} alt={leader.name}
                    className="w-48 h-48 mx-auto object-cover rounded-full border-4 border-[#cdac69]/20" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{leader.name}</h3>
                <p className="text-[#cdac69]">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

AboutPage.layout = page => <PublicLayout>{page}</PublicLayout>;
