import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../Layouts/AdminLayout';

export default function AdminSettings({ settings: initialSettings }) {
  const { props: { auth } } = usePage();
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put('/api/settings', settings, {
        headers: { Authorization: `Bearer ${auth.admin.token}` }
      });
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div data-testid="admin-settings-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Site Settings</h1>
        <p className="text-white/60">Configure your website information</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* General Information */}
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <SettingsIcon size={20} className="text-[#cdac69]" />
            General Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Church Name</label>
              <input
                type="text"
                name="churchName"
                value={settings.churchName || ''}
                onChange={handleChange}
                className="input-base w-full"
                data-testid="church-name-input"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline || ''}
                onChange={handleChange}
                className="input-base w-full"
                data-testid="tagline-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={settings.address || ''}
              onChange={handleChange}
              className="input-base w-full"
              data-testid="address-input"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone || ''}
                onChange={handleChange}
                className="input-base w-full"
                data-testid="phone-input"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email || ''}
                onChange={handleChange}
                className="input-base w-full"
                data-testid="email-input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Service Day</label>
              <input
                type="text"
                name="serviceDay"
                value={settings.serviceDay || ''}
                onChange={handleChange}
                placeholder="e.g., Sunday"
                className="input-base w-full"
                data-testid="service-day-input"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Service Time</label>
              <input
                type="text"
                name="serviceTime"
                value={settings.serviceTime || ''}
                onChange={handleChange}
                placeholder="e.g., 9:00 AM"
                className="input-base w-full"
                data-testid="service-time-input"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          <h2 className="text-xl font-semibold text-white">About Section</h2>
          
          <div>
            <label className="block text-white/70 text-sm mb-2">Short Description</label>
            <textarea
              name="aboutShort"
              value={settings.aboutShort || ''}
              onChange={handleChange}
              rows={3}
              className="input-base w-full resize-none"
              data-testid="about-short-input"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Vision</label>
            <textarea
              name="vision"
              value={settings.vision || ''}
              onChange={handleChange}
              rows={3}
              className="input-base w-full resize-none"
              data-testid="vision-input"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Mission</label>
            <textarea
              name="mission"
              value={settings.mission || ''}
              onChange={handleChange}
              rows={3}
              className="input-base w-full resize-none"
              data-testid="mission-input"
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          <h2 className="text-xl font-semibold text-white">Social Media</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 text-sm mb-2">Facebook URL</label>
              <input
                type="url"
                name="facebookUrl"
                value={settings.facebookUrl || ''}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="input-base w-full"
                data-testid="facebook-input"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Instagram URL</label>
              <input
                type="url"
                name="instagramUrl"
                value={settings.instagramUrl || ''}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="input-base w-full"
                data-testid="instagram-input"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Twitter URL</label>
              <input
                type="url"
                name="twitterUrl"
                value={settings.twitterUrl || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/..."
                className="input-base w-full"
                data-testid="twitter-input"
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">YouTube URL</label>
              <input
                type="url"
                name="youtubeUrl"
                value={settings.youtubeUrl || ''}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="input-base w-full"
                data-testid="youtube-input"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2"
          data-testid="save-settings-btn"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

AdminSettings.layout = page => <AdminLayout>{page}</AdminLayout>;
