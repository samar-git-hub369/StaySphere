import { CheckSquare, Heart, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export default function ClientDashboard() {
  const navigate = useNavigate();

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
            <h3 className="text-2xl font-bold text-[var(--color-text-main)]">4</h3>
          </div>
          <div className="bg-[var(--color-section)] p-3 rounded-xl">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* Upcoming Trips */}
      <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4">Your Next Trip</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_BOOKINGS.map(booking => (
          <div key={booking.id} className="bg-white border border-[var(--color-border-div)] rounded-xl overflow-hidden shadow-sm flex">
            <div className="w-1/3 h-full min-h-[160px]">
              <img src={booking.image} alt={booking.hotelName} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 w-2/3 flex flex-col justify-center">
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
  );
}
