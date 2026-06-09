'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/api-client';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function NewsletterModal({ open, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      const result = await subscribeNewsletter(email.trim());
      setStatus('success');
      setMessage(
        result.alreadySubscribed
          ? 'You are already subscribed to our newsletter.'
          : 'Thank you! You have been subscribed successfully.'
      );
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Subscription failed. Please try again.');
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#1A1A1A] border border-[#262626] rounded-[16px] p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7E7E81] hover:text-white"
        >
          <X size={20} />
        </button>
        <h3 className="text-white text-xl font-semibold mb-2">Subscribe to Newsletter</h3>
        <p className="text-[#7E7E81] text-sm font-light mb-6">
          Get the latest blogs, news, podcasts and resources delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-[#141414] border border-[#262626] rounded-[10px] px-4 py-3 text-sm text-white outline-none focus:border-[#3a3a3a]"
          />
          {message && (
            <p
              className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-[#FFD11A]'}`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-[#FFD11A] text-black px-4 py-3 rounded-[10px] text-sm font-medium hover:brightness-95 disabled:opacity-60"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}
