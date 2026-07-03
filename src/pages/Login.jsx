import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Building2 } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

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

          <Button type="submit" className="w-full h-12 text-lg">
            Sign In
          </Button>
          
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
