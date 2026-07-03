import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Building2 } from 'lucide-react';
import { auth, db, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Create user document in Firestore
      const userData = {
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);

      // 3. Update local state
      setUser({
        uid: user.uid,
        ...userData
      });

      // 4. Redirect
      if (role === 'lister') navigate('/lister/dashboard');
      else navigate('/client/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        const userData = {
          name: user.displayName || 'Google User',
          email: user.email,
          role: role,
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, userData);
        setUser({ uid: user.uid, ...userData });
      } else {
        const userData = userDocSnap.data();
        setUser({ uid: user.uid, email: user.email, ...userData });
      }
      
      // Redirect based on selected role or existing role
      const redirectRole = userDocSnap.exists() ? userDocSnap.data().role : role;
      if (redirectRole === 'lister') navigate('/lister/dashboard');
      else if (redirectRole === 'admin') navigate('/admin/dashboard');
      else navigate('/client/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to sign up with Google.");
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
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">Create an Account</h2>
          <p className="mt-2 text-sm text-[var(--color-text-sec)]">
            Join StaySphere to discover premium stays
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-[var(--color-text-main)] text-sm font-medium mb-1 block">Full Name</label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-[var(--color-text-main)] text-sm font-medium mb-1 block">Email address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
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
            <div>
              <label className="text-[var(--color-text-main)] text-sm font-medium mb-1 block">I want to...</label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`border rounded-lg p-3 text-sm font-medium ${
                    role === 'client' 
                      ? 'border-[var(--color-primary)] bg-[var(--color-section)] text-[var(--color-primary)]' 
                      : 'border-[var(--color-border-div)] text-[var(--color-text-sec)] hover:bg-gray-50'
                  }`}
                >
                  Book Stays
                </button>
                <button
                  type="button"
                  onClick={() => setRole('lister')}
                  className={`border rounded-lg p-3 text-sm font-medium ${
                    role === 'lister' 
                      ? 'border-[var(--color-primary)] bg-[var(--color-section)] text-[var(--color-primary)]' 
                      : 'border-[var(--color-border-div)] text-[var(--color-text-sec)] hover:bg-gray-50'
                  }`}
                >
                  List Property
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-6">
            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              Sign Up
            </Button>
            <Button type="button" variant="outline" className="w-full h-12 text-lg flex items-center justify-center gap-2" onClick={handleGoogleSignup} disabled={loading}>
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
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
