import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid admin credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-admin-950 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-xl border border-admin-800 bg-admin-900 p-5 shadow-2xl shadow-slate-950/40 sm:p-8">
        <div className="mb-8 text-center">
          <img
            src="/logo.png"
            alt="EKTA ELECTRICAL WORKS logo"
            className="mx-auto mb-4 h-16 w-16 rounded-full border border-amber-500/30 bg-white object-contain shadow-lg shadow-amber-500/10 sm:h-20 sm:w-20"
          />
          <h1 className="text-lg font-black uppercase tracking-[0.18em] text-white sm:text-xl">EKTA ELECTRICAL WORKS</h1>
          <p className="mt-2 text-xs text-admin-400">EEW CMS Console</p>
        </div>

        {error && (
          <div className="mb-6 flex items-start space-x-3 rounded border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-admin-300">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-admin-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-admin-700 bg-admin-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-admin-500 focus:border-amber-500 focus:outline-none"
                placeholder="admin@ektaelectrical.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-admin-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-admin-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-admin-700 bg-admin-950 py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-admin-500 focus:border-amber-500 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-2.5 text-admin-500 hover:text-admin-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-amber-500 py-2.5 text-sm font-bold text-admin-950 transition-colors hover:bg-amber-600 disabled:opacity-50"
          >
            {submitting ? 'Authenticating...' : 'Sign In to Console'}
          </button>
        </form>
      </div>
    </div>
  );
};
