import { CheckSquare, Heart, MapPin, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

const MOCK_BOOKINGS = [
  {
    id: 'b1',
    hotelName: 'The Grand Azure Resort',
    city: 'Maldives',
    checkIn: 'Oct 12, 2026',
    checkOut: 'Oct 15, 2026',
    status: 'Upcoming',
    price: 1350,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800'
  }
];

const MOCK_WISHLIST = [
  {
    id: 'h2',
    name: 'Alpine Peak Chalet',
    city: 'Swiss Alps',
    rating: 4.8,
    price: 320,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800'
  }
];

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Welcome back!</h1>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-[var(--color-border-div)] rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--color-text-sec)] mb-1">Upcoming Trips</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-main)]">1</h3>
          </div>
          <div className="bg-[var(--color-section)] p-3 rounded-xl">
            <CheckSquare className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
        </div>
        <div className="bg-white border border-[var(--color-border-div)] rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--color-text-sec)] mb-1">Saved Hotels</p>
            <h3 className="text-2xl font-bold text-[var(--color-text-main)]">1</h3>
          </div>
          <div className="bg-[var(--color-section)] p-3 rounded-xl">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border-div)] mb-6">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 ${activeTab === 'bookings' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-sec)] hover:text-[var(--color-text-main)]'}`}
        >
          My Bookings
        </button>
        <button 
          onClick={() => setActiveTab('wishlist')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 ${activeTab === 'wishlist' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-sec)] hover:text-[var(--color-text-main)]'}`}
        >
          Wishlist
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 text-sm font-semibold border-b-2 ${activeTab === 'profile' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-text-sec)] hover:text-[var(--color-text-main)]'}`}
        >
          Profile
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'bookings' && (
        <div>
          <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">Your Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_BOOKINGS.map(booking => (
              <div key={booking.id} className="bg-white border border-[var(--color-border-div)] rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/3 h-40 sm:h-auto min-h-[160px]">
                  <img src={booking.image} alt={booking.hotelName} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 w-full sm:w-2/3 flex flex-col justify-center">
                  <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-section)] px-2 py-1 rounded-full w-fit mb-2 uppercase tracking-wider">
                    {booking.status}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-text-main)] line-clamp-1">{booking.hotelName}</h3>
                  <div className="flex items-center text-sm text-[var(--color-text-sec)] mt-1 mb-3">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {booking.city}
                  </div>
                  <div className="text-sm font-medium text-[var(--color-text-main)]">
                    {booking.checkIn} - {booking.checkOut}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div>
           <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">Saved Hotels</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_WISHLIST.map(hotel => (
              <div key={hotel.id} className="bg-white rounded-xl overflow-hidden border border-[var(--color-border-div)] shadow-sm cursor-pointer" onClick={() => navigate(`/hotel/${hotel.id}`)}>
                <div className="relative h-40">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[var(--color-primary)] truncate">{hotel.name}</h3>
                  <div className="flex items-center text-[var(--color-text-sec)] text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {hotel.city}
                  </div>
                </div>
              </div>
            ))}
           </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white border border-[var(--color-border-div)] rounded-xl p-6 shadow-sm">
           <h2 className="text-xl font-bold text-[var(--color-primary)] mb-6">Profile Settings</h2>
           <form className="space-y-4">
             <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Full Name</label>
                  <Input defaultValue="John Doe" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Email</label>
                  <Input defaultValue="client@example.com" disabled />
                </div>
             </div>
             <div>
               <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Phone Number</label>
               <Input placeholder="+1 (555) 000-0000" />
             </div>
             <Button type="button" className="mt-4">Save Changes</Button>
           </form>
        </div>
      )}
    </div>
  );
}
