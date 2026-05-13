import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, Users, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import PublicLayout from './Layouts/PublicLayout';

const givingTypes = [
  { id: 'tithe', name: 'Tithe', icon: Heart, description: 'Honor the Lord with your wealth and the firstfruits of all your crops.', verse: 'Malachi 3:10', color: 'text-red-400', bgColor: 'bg-red-400/10' },
  { id: 'offering', name: 'Offering', icon: Gift, description: 'Each of you should give what you have decided in your heart to give.', verse: '2 Corinthians 9:7', color: 'text-[#cdac69]', bgColor: 'bg-[#cdac69]/10' },
  { id: 'benevolent', name: 'Benevolent', icon: Users, description: 'Whoever is kind to the poor lends to the Lord, and he will reward them.', verse: 'Proverbs 19:17', color: 'text-green-400', bgColor: 'bg-green-400/10' },
];

const suggestedAmounts = [1000, 5000, 10000, 25000, 50000, 100000];

export default function GivingPage() {
  const [selectedType, setSelectedType] = useState('tithe');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAmountSelect = (value) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !amount || parseInt(amount) < 100) {
      toast.error('Please enter a valid email and amount (minimum ₦100)');
      return;
    }

    setLoading(true);
    try {
      const callbackUrl = `${window.location.origin}/giving/callback`;
      const response = await axios.post('/api/giving/initialize', {
        email,
        amount: parseFloat(amount),
        givingType: selectedType,
        name: name || null,
        phone: phone || null,
        callbackUrl,
      });

      if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to initialize payment');
    } finally {
      setLoading(false);
    }
  };

  const selectedTypeData = givingTypes.find(t => t.id === selectedType);

  return (
    <div data-testid="giving-page" className="pt-20">
      <section className="py-16 md:py-24 bg-[#111111]" data-testid="giving-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="text-[#cdac69] text-sm uppercase tracking-widest mb-4 block">Support Our Ministry</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Give Online</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Your generosity helps us build leaders and change the world. Thank you for your faithful giving.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Select Giving Type</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {givingTypes.map((type) => (
                <button key={type.id} onClick={() => setSelectedType(type.id)}
                  className={`p-6 text-left transition-all ${selectedType === type.id ? 'bg-[#121212] border-2 border-[#cdac69]' : 'bg-[#121212] border border-white/5 hover:border-white/20'}`}
                  data-testid={`giving-type-${type.id}`}>
                  <div className={`p-3 ${type.bgColor} inline-block mb-4`}>
                    <type.icon className={`w-6 h-6 ${type.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                  <p className="text-white/60 text-sm mb-2">{type.description}</p>
                  <p className="text-[#cdac69] text-xs">— {type.verse}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Select Amount (₦)</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {suggestedAmounts.map((value) => (
                <button key={value} onClick={() => handleAmountSelect(value)}
                  className={`p-4 text-center transition-all ${amount === value.toString() && !customAmount ? 'bg-[#cdac69] text-black font-semibold' : 'bg-[#121212] border border-white/10 text-white hover:border-[#cdac69]/50'}`}
                  data-testid={`amount-${value}`}>
                  ₦{value.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">₦</span>
              <input type="text" value={customAmount} onChange={handleCustomAmountChange}
                placeholder="Enter custom amount" className="input-base w-full pl-10 text-lg h-14"
                data-testid="custom-amount-input" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="giving-form">
            <div className="p-6 bg-[#121212] border border-white/5 space-y-6">
              <h2 className="text-xl font-semibold text-white">Your Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-sm mb-2">Full Name (Optional)</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" className="input-base w-full" data-testid="giving-name-input" />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-2">Phone Number (Optional)</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone" className="input-base w-full" data-testid="giving-phone-input" />
                </div>
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-2">Email Address *</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" className="input-base w-full" required
                  data-testid="giving-email-input" />
                <p className="text-white/40 text-xs mt-1">Receipt will be sent to this email</p>
              </div>
            </div>

            <div className="p-6 bg-[#cdac69]/10 border border-[#cdac69]/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white/70">Giving Type:</span>
                <span className="text-white font-semibold">{selectedTypeData?.name}</span>
              </div>
              <div className="flex justify-between items-center text-2xl">
                <span className="text-white/70">Amount:</span>
                <span className="text-[#cdac69] font-bold">₦{amount ? parseInt(amount).toLocaleString() : '0'}</span>
              </div>
            </div>

            <button type="submit" disabled={loading || !amount || parseInt(amount) < 100}
              className="btn-primary w-full h-14 text-lg flex items-center justify-center gap-3" data-testid="give-now-btn">
              {loading ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : <><CreditCard size={20} /> Give Now - ₦{amount ? parseInt(amount).toLocaleString() : '0'}</>}
            </button>
            <p className="text-center text-white/40 text-sm">Secure payment powered by Paystack</p>
          </form>
        </div>
      </section>

      <section className="py-16 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="text-white/80 text-xl italic mb-4">
            "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."
          </p>
          <p className="text-[#cdac69]">— Luke 6:38</p>
        </div>
      </section>
    </div>
  );
}

GivingPage.layout = page => <PublicLayout>{page}</PublicLayout>;
