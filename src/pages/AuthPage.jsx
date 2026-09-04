import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, ArrowLeft, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, demoSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      navigate('/chat');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    demoSignIn();
    navigate('/chat');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back to home
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold gradient-text mb-2">MediKiosk</h1>
          <p className="text-white/40 text-sm">
            {isLogin ? 'Welcome back — sign in to continue' : 'Create your account to get started'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm animate-slide-up">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm text-white/60 mb-1.5 font-medium">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="input-field pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-white/60 mb-1.5 font-medium">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-1.5 font-medium">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-white/30 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Demo mode */}
        <Button
          variant="secondary"
          onClick={handleDemoMode}
          className="w-full"
          size="md"
        >
          <Zap size={18} className="text-teal-400" />
          Demo Mode (No Login Required)
        </Button>

        {/* Toggle */}
        <p className="text-center mt-6 text-sm text-white/40">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-primary-400 hover:text-primary-300 transition-colors font-medium cursor-pointer"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
