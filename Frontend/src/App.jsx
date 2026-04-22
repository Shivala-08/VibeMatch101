import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateProfile from './pages/CreateProfile';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Discover from './pages/Discover';
import UserProfile from './pages/UserProfile';

function AuthRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-background)' }}>
        <div className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin"
             style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', borderWidth: '3px' }} />
      </div>
    );
  }

  // If already authenticated, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function ProfileGuard({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--color-background)' }}>
        <div className="w-10 h-10 rounded-full border-3 border-t-transparent animate-spin"
             style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', borderWidth: '3px' }} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (profile) return <Navigate to="/" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "var(--font-body)",
              fontSize: '0.9rem',
              background: 'var(--color-surface-container-lowest)',
              color: 'var(--color-on-surface)',
              borderRadius: '0.75rem',
              boxShadow: '0 0 24px rgba(233,30,140,0.3)',
            },
          }}
        />

        <Routes>
          {/* Auth routes — redirect to home if already logged in */}
          <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />

          {/* Profile creation — only for authenticated users without profile */}
          <Route path="/create-profile" element={<ProfileGuard><CreateProfile /></ProfileGuard>} />

          {/* Protected routes — require auth + profile */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/discover" element={<ProtectedRoute><Discover /></ProtectedRoute>} />
          <Route path="/user/:userId" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
