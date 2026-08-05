'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Role = 'student' | 'assistant' | 'professional' | 'event_registration';

export default function GambiaApplicationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [fieldOfProfession, setFieldOfProfession] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await supabase.from('gambia_applications').insert({
      name,
      email,
      date_of_birth: dateOfBirth || null,
      gender: gender || null,
      role,
      field_of_profession: role === 'professional' ? fieldOfProfession : null,
    });

    if (error) {
      console.error(error);
      setStatus('error');
      return;
    }

    setStatus('success');
    setName('');
    setEmail('');
    setDateOfBirth('');
    setGender('');
    setRole('');
    setFieldOfProfession('');
  }

  return (
    <form onSubmit={handleSubmit} className="gambia-application-form">
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="gambia-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="gambia-field"
      />
      <div className="gambia-field-group">
        <label>Date of birth</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="gambia-field"
        />
      </div>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="gambia-field"
      >
        <option value="">Gender (optional)</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        required
        className="gambia-field"
      >
        <option value="" disabled>
          I am applying as...
        </option>
        <option value="student">Student</option>
        <option value="assistant">Assistant</option>
        <option value="professional">Professional</option>
        <option value="event_registration">Event registration</option>
      </select>

      {role === 'professional' && (
        <input
          type="text"
          placeholder="Field of profession"
          value={fieldOfProfession}
          onChange={(e) => setFieldOfProfession(e.target.value)}
          required
          className="gambia-field"
        />
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="gambia-submit"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit application'}
      </button>

      {status === 'success' && <p className="text-green-600">Application submitted — thank you!</p>}
      {status === 'error' && <p className="text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
