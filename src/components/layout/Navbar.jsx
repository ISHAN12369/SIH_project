import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User, Menu } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Don't show on landing or auth pages
  if (location.pathname === '/' || location.pathname === '/auth') {
    return null;
  }

  return (
    <nav className="app-navbar">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer lg:hidden"
        >
          <Menu size={20} className="text-white/60" />
        </button>
        <div
          onClick={() => navigate('/')}
          className="font-display font-bold text-lg gradient-text cursor-pointer"
        >
          MEDU VADA
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-primary-600/30 flex items-center justify-center">
                <User size={12} className="text-primary-400" />
              </div>
              <span className="text-sm text-white/60">{user.email || 'Demo User'}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-all cursor-pointer"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
