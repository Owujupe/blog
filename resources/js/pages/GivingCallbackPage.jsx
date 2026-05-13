import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function GivingCallbackPage() {
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('reference') || params.get('trxref');

    if (!reference) {
      setStatus('error');
      setMessage('No payment reference found');
      return;
    }

    axios.get(`/api/giving/verify/${reference}`)
      .then((response) => {
        if (response.data.status === 'success') {
          setStatus('success');
          setAmount(response.data.amount);
          setMessage(`Thank you for your generous giving of ₦${response.data.amount?.toLocaleString()}!`);
        } else {
          setStatus('failed');
          setMessage(response.data.message || 'Payment verification failed');
        }
      })
      .catch(() => {
        setStatus('failed');
        setMessage('Unable to verify payment. Please contact support.');
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 pt-20" data-testid="giving-callback">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
        {status === 'verifying' && (
          <div className="p-8 bg-[#121212] border border-white/5">
            <Loader2 className="w-16 h-16 text-[#cdac69] mx-auto animate-spin mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-2">Verifying Payment</h2>
            <p className="text-white/60">Please wait while we confirm your transaction...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="p-8 bg-[#121212] border border-green-500/30">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-2">Payment Successful!</h2>
            <p className="text-white/70 mb-6">{message}</p>
            <p className="text-white/50 text-sm mb-6">A receipt has been sent to your email.</p>
            <Link href="/" className="btn-primary" data-testid="back-home-btn">Return to Home</Link>
          </div>
        )}

        {status === 'failed' && (
          <div className="p-8 bg-[#121212] border border-red-500/30">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-2">Payment Failed</h2>
            <p className="text-white/70 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <Link href="/giving" className="btn-outline" data-testid="try-again-btn">Try Again</Link>
              <Link href="/" className="btn-primary" data-testid="go-home-btn">Go Home</Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="p-8 bg-[#121212] border border-white/5">
            <XCircle className="w-16 h-16 text-white/40 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-2">Something Went Wrong</h2>
            <p className="text-white/70 mb-6">{message}</p>
            <Link href="/" className="btn-primary">Return to Home</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
