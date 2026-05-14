import { useState } from 'react';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const LOGO_URL = "https://wujupay.ca/assets/images/pingg-removebg-preview.png";

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        await axios.post('/api/auth/register', { email, password });
        toast.success('Admin account created. Please sign in.');
        setIsRegister(false);
      } else {
        router.post('/admin/login', { email, password }, {
          onError: (errors) => {
            const msg = errors.email || 'Authentication failed';
            toast.error(msg);
            if (msg.includes('Admin already exists')) setIsRegister(false);
          },
          onFinish: () => setLoading(false),
        });
        return;
      }
    } catch (error) {
      const message = error.response?.data?.detail || 'Authentication failed';
      toast.error(message);
      if (message.includes('Admin already exists')) setIsRegister(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6" data-testid="admin-login-page">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="GLA Logo" className="h-20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/60">{isRegister ? 'Create your admin account' : 'Sign in to manage your website'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-[#121212] border border-white/5" data-testid="login-form">
          <div>
            <label className="block text-white/70 text-sm mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com" className="input-base w-full pl-12" data-testid="email-input" />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" className="input-base w-full pl-12 pr-12" data-testid="password-input" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full" data-testid="login-submit-btn">
            {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Sign In')}
          </button>

          <div className="text-center">
            <button type="button" onClick={() => setIsRegister(!isRegister)}
              className="text-[#cdac69] text-sm hover:underline" data-testid="toggle-register-btn">
              {isRegister ? 'Already have an account? Sign In' : 'First time? Create Admin Account'}
            </button>
          </div>
        </form>

        <p className="text-center text-white/40 text-sm mt-6">Guiding Light Assembly CMS</p>
      </motion.div>
    </div>
  );
}
