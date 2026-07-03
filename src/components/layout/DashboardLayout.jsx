import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { Home, Hotel, PlusCircle, Users, Activity, CheckSquare } from 'lucide-react';

export default function DashboardLayout({ children, role }) {
  const location = useLocation();

  const getLinks = () => {
    if (role === 'admin') {
      return [
        { name: 'Overview', path: '/admin/dashboard', icon: Activity },
        { name: 'Approvals', path: '/admin/approvals', icon: CheckSquare },
        { name: 'Users', path: '/admin/users', icon: Users },
      ];
    }
    if (role === 'lister') {
      return [
        { name: 'Overview', path: '/lister/dashboard', icon: Activity },
        { name: 'My Hotels', path: '/lister/hotels', icon: Hotel },
        { name: 'Add Hotel', path: '/lister/hotels/new', icon: PlusCircle },
      ];
    }
    // client
    return [
      { name: 'Overview', path: '/client/dashboard', icon: Home },
      { name: 'My Bookings', path: '/client/bookings', icon: CheckSquare },
    ];
  };

  const links = getLinks();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)]">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-border-div)]">
            <h2 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4 px-3">
              {role} Menu
            </h2>
            <nav className="space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-[var(--color-primary)] text-white' 
                        : 'text-[var(--color-text-main)] hover:bg-[var(--color-section)]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-[var(--color-border-div)]">
          {children}
        </main>
      </div>
    </div>
  );
}
