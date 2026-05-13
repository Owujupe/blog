import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { Radio, Save } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from '../Layouts/AdminLayout';

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  let videoId = '';
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  const liveMatch = url.match(/\/live\/([^?]+)/);
  const embedMatch = url.match(/\/embed\/([^?]+)/);
  if (watchMatch) videoId = watchMatch[1];
  else if (shortMatch) videoId = shortMatch[1];
  else if (liveMatch) videoId = liveMatch[1];
  else if (embedMatch) videoId = embedMatch[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default function AdminLivestream({ livestream: initialLivestream }) {
  const { props: { auth } } = usePage();
  const [livestream, setLivestream] = useState(initialLivestream || { youtubeUrl: '', isActive: false });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put('/api/livestream', livestream, {
        headers: { Authorization: `Bearer ${auth.admin.token}` },
      });
      toast.success('Livestream settings saved');
    } catch {
      toast.error('Failed to save livestream settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div data-testid="admin-livestream-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Livestream</h1>
        <p className="text-white/60">Configure your YouTube livestream settings</p>
      </div>

      <div className="max-w-3xl space-y-6">
        <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-white/5">
            <div className="flex items-center gap-4">
              <div className={`p-3 ${livestream.isActive ? 'bg-red-500/20' : 'bg-white/5'}`}>
                <Radio className={`w-6 h-6 ${livestream.isActive ? 'text-red-500' : 'text-white/40'}`} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Livestream Status</h3>
                <p className="text-white/60 text-sm">
                  {livestream.isActive ? 'Livestream is visible on the homepage' : 'Livestream is hidden'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLivestream({ ...livestream, isActive: !livestream.isActive })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${livestream.isActive ? 'bg-[#cdac69]' : 'bg-white/20'}`}
              data-testid="livestream-toggle"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${livestream.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* YouTube URL */}
          <div>
            <label className="block text-white/70 text-sm mb-2">YouTube Livestream URL</label>
            <input
              type="url"
              value={livestream.youtubeUrl}
              onChange={(e) => setLivestream({ ...livestream, youtubeUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=... or youtube.com/live/..."
              className="input-base w-full"
              data-testid="livestream-url-input"
            />
            <p className="text-white/40 text-xs mt-2">Paste your YouTube video URL, livestream URL, or embed URL</p>
          </div>

          {/* Preview */}
          {livestream.youtubeUrl && (
            <div>
              <label className="block text-white/70 text-sm mb-2">Preview</label>
              <div className="aspect-video bg-[#0a0a0a] overflow-hidden" data-testid="livestream-preview">
                <iframe
                  src={getYouTubeEmbedUrl(livestream.youtubeUrl)}
                  title="Livestream Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2" data-testid="save-livestream-btn">
          <Save size={18} />{saving ? 'Saving...' : 'Save Settings'}
        </button>

        <div className="p-4 bg-[#121212] border border-[#cdac69]/20">
          <h4 className="text-[#cdac69] font-semibold mb-2">How to use:</h4>
          <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
            <li>Go to YouTube and start your livestream or get the URL of the video you want to display</li>
            <li>Copy the URL from your browser</li>
            <li>Paste it in the field above</li>
            <li>Toggle the switch to enable the livestream on your homepage</li>
            <li>Click "Save Settings"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

AdminLivestream.layout = page => <AdminLayout>{page}</AdminLayout>;
