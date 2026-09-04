import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { signIn, signUp, bypassLogin } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      onAuthSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    bypassLogin();
    onAuthSuccess?.();
    onClose();
  };

  return (
    <div className="ub-auth-modal-overlay">
      <div className="ub-auth-card">
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <span style={{ fontFamily: 'var(--font-sans-bold)', fontSize: '0.7rem', letterSpacing: '0.12em', color: '#87359f', textTransform: 'uppercase' }}>
            Patient Portal & Kiosk
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#111', marginTop: '0.25rem' }}>
            {isSignUp ? 'Create Patient Account' : 'Patient Sign In'}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '0.25rem' }}>
            Secure session persistence powered by Supabase Auth
          </p>
        </div>

        {error && (
          <div style={{ background: '#fce8e6', color: '#c5221f', padding: '0.65rem 1rem', borderRadius: '0.5rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-sans-bold)', color: '#444', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem 0.7rem 2.4rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.6rem',
                  outline: 'none',
                  fontSize: '0.85rem',
                }}
              />
              <Mail size={16} color="#888" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-sans-bold)', color: '#444', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.7rem 1rem 0.7rem 2.4rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.6rem',
                  outline: 'none',
                  fontSize: '0.85rem',
                }}
              />
              <Lock size={16} color="#888" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ub-see-chap-btn"
            style={{
              background: '#111',
              color: '#fff',
              borderColor: '#111',
              marginTop: '0.5rem',
              width: '100%',
            }}
          >
            {loading ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast Track Access */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <button
            onClick={handleDemoAccess}
            style={{
              background: '#f8f4fa',
              border: '1px solid #87359f44',
              color: '#87359f',
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-sans-bold)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Sparkles size={14} /> Quick Demo Access (Bypass Login)
          </button>

          <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '1rem' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              style={{ color: '#87359f', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
