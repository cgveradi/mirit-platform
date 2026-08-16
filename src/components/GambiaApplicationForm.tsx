'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

type Role = 'student' | 'assistant' | 'professional' | 'event_registration';

export default function GambiaApplicationForm() {
  const t = useTranslations('gambiaProject.form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const { error } = await supabase.from('gambia_applications').insert({
        name,
        email,
        role,
        // Reuse the existing free-text column until the application table is migrated.
        field_of_profession: message || null,
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setRole('');
    setMessage('');
    setConsent(false);
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form gambia-application-form">
      <label>
        <span>{t('name')}</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
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
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="contact-field"
        />
      </label>

      <label>
        <span>{t('role')}</span>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          required
          className="contact-field"
        >
          <option value="" disabled>{t('rolePlaceholder')}</option>
          <option value="student">{t('roles.student')}</option>
          <option value="assistant">{t('roles.assistant')}</option>
          <option value="professional">{t('roles.professional')}</option>
          <option value="event_registration">{t('roles.event')}</option>
        </select>
      </label>

      <label>
        <span>{t('message')}</span>
        <textarea
          name="message"
          placeholder={t('messagePlaceholder')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="contact-field contact-message"
        />
      </label>

      <label className="gambia-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>{t('consentShort')}</span>
      </label>

      <button type="submit" disabled={status === 'submitting'} className="contact-submit">
        {status === 'submitting' ? t('submitting') : t('submit')} <span aria-hidden="true">→</span>
      </button>

      <div aria-live="polite">
        {status === 'success' && <p className="contact-status contact-status-success">{t('success')}</p>}
        {status === 'error' && <p className="contact-status contact-status-error">{t('error')}</p>}
      </div>
    </form>
  );
}
