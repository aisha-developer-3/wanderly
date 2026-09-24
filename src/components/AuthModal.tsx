import React, { useState } from 'react';
import { X, Compass, CheckCircle2, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (user: { name: string; email: string; avatar?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSignInSuccess,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignInSuccess({
      name: name || (email ? email.split('@')[0] : 'Sarah Jenkins'),
      email: email || 'sarah.traveler@wanderly.com',
    });
    onClose();
  };

  const handleDemoSignIn = () => {
    onSignInSuccess({
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@wanderly.com',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border-2 border-teal-700 flex items-center justify-center text-teal-700 mx-auto mb-3">
            <Compass className="w-7 h-7 stroke-[2.2] -rotate-45" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {mode === 'signin' ? 'Welcome to Wanderly' : 'Create an Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Access member-only hotel rates, saved wishlists, and priority booking.
          </p>
        </div>

        {/* Quick Demo Login Pill */}
        <div className="mb-5 p-3 bg-teal-50/80 rounded-xl border border-teal-100 text-center">
          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Instant Demo Sign In (Sarah Jenkins)</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] uppercase font-bold text-slate-400 absolute">
            or continue with
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500">Full Name</label>
              <input
                type="text"
                placeholder="Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
              />
            </div>
          )}

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500">Email Address</label>
            <input
              type="email"
              placeholder="sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 hover:bg-teal-950 text-white rounded-xl text-xs font-bold transition-colors shadow-md mt-2"
          >
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center mt-5 text-xs text-slate-500">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-teal-700 font-bold hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-teal-700 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
