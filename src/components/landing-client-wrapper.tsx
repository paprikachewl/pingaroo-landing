'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

// Waitlist form with client-side state
export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.email?.[0] || 'An unknown error occurred.');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center p-4 rounded-lg bg-green-900/50 border border-green-700 text-green-200">
        <p className="font-semibold">Thank you for joining!</p>
        <p className="text-sm">We'll notify you when the Pingaroo app is ready.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <div className="flex-grow flex flex-col">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
          className="w-full px-4 py-2.5 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
          disabled={status === 'submitting'}
        />
        {status === 'error' && <p className="text-red-400 text-xs mt-1 text-left">{errorMessage}</p>}
      </div>
      <Button
        type="submit"
        className="px-6 py-2.5 text-base font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-lg disabled:bg-gray-500"
        disabled={status === 'submitting'}
        aria-label="Join waitlist"
      >
        {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
      </Button>
    </form>
  );
};

// Header with client-side smooth scroll logic
export const LandingHeader = () => {
  const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Pingaroo
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            API Docs
          </Link>
          <a
            href="#waitlist"
            onClick={scrollToWaitlist}
            className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-md transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </nav>
    </header>
  );
}; 