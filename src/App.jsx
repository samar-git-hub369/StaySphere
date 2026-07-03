import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { auth, db } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Search from './pages/Search';
import HotelDetails from './pages/HotelDetails';
import ClientDashboard from './pages/client/ClientDashboard';
import ListerDashboard from './pages/lister/ListerDashboard';
import AddHotel from './pages/lister/AddHotel';
import AdminDashboard from './pages/admin/AdminDashboard';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) return <div className="p-8">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/" />;
  
  return children;
};

function App() {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userData
            });
          } else {
            // Document might not exist right away during signup, 
            // signup function handles setting the initial user state.
            // But if it's a login without doc, we shouldn't fail silently.
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-background)]">
        <Routes>
          {/* Public Routes with MainLayout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
          <Route path="/hotel/:id" element={<MainLayout><HotelDetails /></MainLayout>} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/client/dashboard" element={
            <ProtectedRoute allowedRoles={['client']}>
              <DashboardLayout role="client"><ClientDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/lister/dashboard" element={
            <ProtectedRoute allowedRoles={['lister']}>
              <DashboardLayout role="lister"><ListerDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/lister/hotels/new" element={
            <ProtectedRoute allowedRoles={['lister']}>
              <DashboardLayout role="lister"><AddHotel /></DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
