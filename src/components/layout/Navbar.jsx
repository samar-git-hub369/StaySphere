import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/Button';
import { Building2, Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin/dashboard';
    if (user?.role === 'lister') return '/lister/dashboard';
    return '/client/dashboard';
  };

  return (
    <nav className="bg-white border-b border-[var(--color-border-div)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-[var(--color-primary)] p-1.5 rounded-lg flex items-center justify-center">
                 <Building2 className="text-[var(--color-accent-gold)] h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-[var(--color-primary)]">StaySphere</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] font-medium">Find Stays</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-[var(--color-border-div)]">
                <Link to={getDashboardLink()} className="flex items-center gap-2 text-[var(--color-text-main)] hover:text-[var(--color-primary)] font-medium">
                   <User className="h-5 w-5" />
                   <span>{user.name}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-[var(--color-border-div)]">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-text-main)] hover:text-[var(--color-primary)]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border-div)] bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/search" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-main)] hover:bg-[var(--color-section)]">Find Stays</Link>
            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-main)] hover:bg-[var(--color-section)]">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-main)] hover:bg-[var(--color-section)]">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-main)] hover:bg-[var(--color-section)]">Log in</Link>
                <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-main)] hover:bg-[var(--color-section)]">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
