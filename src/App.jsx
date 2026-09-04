import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import UploadPage from './pages/UploadPage';
import SummaryPage from './pages/SummaryPage';

import UnleashingPage from './pages/UnleashingPage';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isUnleashingPage = location.pathname === '/' || location.pathname.startsWith('/chapter');

  if (isUnleashingPage) {
    return (
      <Routes>
        <Route path="/" element={<UnleashingPage />} />
        <Route path="/chapter/:slug" element={<UnleashingPage />} />
      </Routes>
    );
  }

  const isPublicPage = location.pathname === '/medikiosk' || location.pathname === '/auth';

  if (isPublicPage) {
    return (
      <Routes>
        <Route path="/medikiosk" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Routes>
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <SummaryPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
