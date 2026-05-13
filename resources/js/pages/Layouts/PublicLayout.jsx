import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://wujupay.ca/assets/images/wujupay_logo.png";

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/posts' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Events', path: '/events' },
  // { name: 'About', path: '/about' },
  // { name: 'Sermons', path: '/sermons' },
  // { name: 'Give', path: '/giving' },
  // { name: 'Contact', path: '/contact' },
];

function Navbar({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3" data-testid="navbar-logo">
            <img src={LOGO_URL} alt="GLA Logo" className="h-12 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className={`nav-link ${currentPath === link.path ? 'text-[#cdac69]' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* <div className="hidden lg:block">
            <Link href="/contact" data-testid="nav-cta-button" className="btn-primary">
              Plan Your Visit
            </Link>
          </div> */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a0a] border-t border-white/5"
            data-testid="mobile-menu"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                  className={`block py-2 text-lg ${
                    currentPath === link.path ? 'text-[#cdac69]' : 'text-white/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                data-testid="mobile-nav-cta"
                className="block mt-4 btn-primary text-center"
              >
                Plan Your Visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer({ settings }) {
  const s = settings || {};

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          

          {/* <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-white/60 hover:text-[#cdac69] text-sm transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Service Times</h4>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/5">
                <p className="text-[#cdac69] font-semibold">{s.serviceDay || 'Sunday'} Service</p>
                <p className="text-white/60 text-sm">{s.serviceTime || '9:00 AM'}</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5">
                <p className="text-[#cdac69] font-semibold">Wednesday Bible Study</p>
                <p className="text-white/60 text-sm">6:00 PM</p>
              </div>
            </div>
          </div> */}

          {/* <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#cdac69] mt-1 flex-shrink-0" />
                <span className="text-white/60 text-sm">{s.address || '123 Faith Avenue, Wuse 2, Abuja, Nigeria'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#cdac69] flex-shrink-0" />
                <a href={`tel:${s.phone}`} className="text-white/60 text-sm hover:text-[#cdac69]">
                  {s.phone || '+234 800 123 4567'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#cdac69] flex-shrink-0" />
                <a href={`mailto:${s.email}`} className="text-white/60 text-sm hover:text-[#cdac69]">
                  {s.email || 'info@guidinglightassembly.org'}
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {'WujuBlog'}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="https://owujupe.com" className="text-white/40 hover:text-[#cdac69] text-sm" data-testid="admin-login-link">
              Owujupe
            </Link>
            <a href="https://wujupay.ca" className="text-white/40 hover:text-[#cdac69] text-sm" data-testid="admin-login-link">
              WujuPay
            </a>
           
          </div>
          <div className="lg:col-span-1">
            {/* <Link href="/" className="inline-block mb-6">
              <img src={LOGO_URL} alt="GLA Logo" className="h-16 w-auto" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Building Leaders. Changing the World. Join us every {s.serviceDay || 'Sunday'} at {s.serviceTime || '9:00 AM'}.
            </p> */}
            <div className="flex gap-4">
              {s.facebookUrl && (
                <a href={s.facebookUrl} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#cdac69] hover:text-black rounded-sm transition-colors"
                  data-testid="social-facebook">
                  <Facebook size={18} />
                </a>
              )}
              {s.instagramUrl && (
                <a href={s.instagramUrl} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#cdac69] hover:text-black rounded-sm transition-colors"
                  data-testid="social-instagram">
                  <Instagram size={18} />
                </a>
              )}
              {s.twitterUrl && (
                <a href={s.twitterUrl} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#cdac69] hover:text-black rounded-sm transition-colors"
                  data-testid="social-twitter">
                  <Twitter size={18} />
                </a>
              )}
              {s.youtubeUrl && (
                <a href={s.youtubeUrl} target="_blank" rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-[#cdac69] hover:text-black rounded-sm transition-colors"
                  data-testid="social-youtube">
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PublicLayout({ children }) {
  const { url, props } = usePage();
  const currentPath = '/' + url.split('/').slice(1).join('/').split('?')[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar currentPath={url} />
      <main>{children}</main>
      <Footer settings={props.siteSettings} />
    </div>
  );
}
