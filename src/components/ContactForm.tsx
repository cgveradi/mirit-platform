'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await supabase
      .from('contact_messages')
      .insert({ name, email, message });

    if (error) {
      console.error(error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-black px-4 py-3"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-black px-4 py-3"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="border border-black px-4 py-3"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-black text-white px-6 py-3 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && <p className="text-green-600">Message sent — thank you!</p>}
      {status === 'error' && <p className="text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}