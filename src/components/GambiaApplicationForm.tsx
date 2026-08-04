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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto text-left">
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border border-muted/40 bg-transparent px-4 py-3"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border border-muted/40 bg-transparent px-4 py-3"
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted">Date of birth</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="border border-muted/40 bg-transparent px-4 py-3"
        />
      </div>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="border border-muted/40 bg-transparent px-4 py-3"
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
        className="border border-muted/40 bg-transparent px-4 py-3"
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
          className="border border-muted/40 bg-transparent px-4 py-3"
        />
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-accent text-background px-8 py-3 rounded-full font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit application'}
      </button>

      {status === 'success' && <p className="text-green-600">Application submitted — thank you!</p>}
      {status === 'error' && <p className="text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}