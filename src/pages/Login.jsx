import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Building2 } from 'lucide-react';
import { auth, db, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUser({ uid: user.uid, email: user.email, ...userData });
        if (userData.role === 'admin') navigate('/admin/dashboard');
        else if (userData.role === 'lister') navigate('/lister/dashboard');
        else navigate('/client/dashboard');
      } else {
        // First time Google login, default to client
        const userData = {
          name: user.displayName || 'Google User',
          email: user.email,
          role: 'client',
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, userData);
        setUser({ uid: user.uid, ...userData });
        navigate('/client/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to login with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
        setUser({
          uid: user.uid,
          email: user.email,
          ...userData
        });

        if (userData.role === 'admin') navigate('/admin/dashboard');
        else if (userData.role === 'lister') navigate('/lister/dashboard');
        else navigate('/client/dashboard');
      } else {
        throw new Error("User data not found.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-[var(--color-border-div)]">
        <div className="text-center flex flex-col items-center">
          <div className="h-12 w-12 bg-[var(--color-primary)] rounded-xl flex items-center justify-center mb-4">
             <Building2 className="text-[var(--color-accent-gold)] h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Welcome Back</h2>
          <p className="mt-2 text-sm text-[var(--color-text-sec)]">
            Sign in to your StaySphere account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-[var(--color-text-main)] text-sm font-medium mb-1 block">Email address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
              />
            </div>
            <div>
              <label className="text-[var(--color-text-main)] text-sm font-medium mb-1 block">Password</label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              Sign In
            </Button>
            <Button type="button" variant="outline" className="w-full h-12 text-lg flex items-center justify-center gap-2" onClick={handleGoogleLogin} disabled={loading}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
          </div>
          
          <div className="text-center text-sm text-[var(--color-text-sec)]">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
