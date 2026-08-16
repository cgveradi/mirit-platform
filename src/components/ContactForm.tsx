'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
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
    <form onSubmit={handleSubmit} className="contact-form">
      <label>
        <span>{t('name')}</span>
        <input
          type="text"
          placeholder={t('namePlaceholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="contact-field"
        />
      </label>
      <label>
        <span>{t('email')}</span>
        <input
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="contact-field"
        />
      </label>
      <label>
        <span>{t('message')}</span>
        <textarea
          placeholder={t('messagePlaceholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="contact-field contact-message"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="contact-submit"
      >
        {status === 'submitting' ? t('sending') : t('submit')} <span aria-hidden="true">→</span>
      </button>

      {status === 'success' && <p className="contact-status contact-status-success">{t('success')}</p>}
      {status === 'error' && <p className="contact-status contact-status-error">{t('error')}</p>}
    </form>
  );
}
