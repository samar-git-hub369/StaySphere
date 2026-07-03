import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Building2 } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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

          <Button type="submit" className="w-full h-12 text-lg">
            Create Account
          </Button>
          
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
