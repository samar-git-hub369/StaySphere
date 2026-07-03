import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MapPin, Star, Wifi, Coffee, Car, Wind, Calendar, Users, Check } from 'lucide-react';

// Using mock data for now
const MOCK_HOTEL = {
  id: 'h1',
  name: 'The Grand Azure Resort',
  city: 'Maldives',
  address: '123 Ocean Drive, North Atoll, Maldives',
  rating: 4.9,
  reviews: 128,
  description: 'Experience unparalleled luxury at The Grand Azure Resort. Nestled in the pristine waters of the Maldives, our resort offers private overwater villas, world-class dining, and breathtaking sunset views. Whether you are looking for a romantic getaway or a family vacation, we have everything you need for an unforgettable stay.',
  images: [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800'
  ],
  amenities: ['Free WiFi', 'Breakfast Included', 'Free Parking', 'Air Conditioning', 'Pool', 'Spa'],
  rooms: [
    { id: 'r1', name: 'Deluxe Ocean View', price: 450, capacity: 2, beds: '1 King Bed' },
    { id: 'r2', name: 'Premium Overwater Villa', price: 850, capacity: 2, beds: '1 King Bed' },
    { id: 'r3', name: 'Family Suite', price: 600, capacity: 4, beds: '2 Queen Beds' }
  ]
};

const AMENITY_ICONS = {
  'Free WiFi': Wifi,
  'Breakfast Included': Coffee,
  'Free Parking': Car,
  'Air Conditioning': Wind,
};

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const [selectedRoom, setSelectedRoom] = useState(MOCK_HOTEL.rooms[0]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  
  // Mock calculation
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    // Just a mock calculation of 3 days
    return selectedRoom.price * 3;
  };

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    alert('Booking confirmed! (Mock)');
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">{MOCK_HOTEL.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-sec)]">
            <span className="flex items-center gap-1 font-semibold text-[var(--color-text-main)]">
              <Star className="h-4 w-4 text-[var(--color-accent-gold)] fill-[var(--color-accent-gold)]" />
              {MOCK_HOTEL.rating} ({MOCK_HOTEL.reviews} reviews)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {MOCK_HOTEL.address}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[50vh] min-h-[400px] mb-12">
          <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden cursor-pointer group">
            <img src={MOCK_HOTEL.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block relative rounded-2xl overflow-hidden cursor-pointer group">
            <img src={MOCK_HOTEL.images[1]} alt="Gallery 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block relative rounded-2xl overflow-hidden cursor-pointer group">
            <img src={MOCK_HOTEL.images[2]} alt="Gallery 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block relative rounded-2xl overflow-hidden cursor-pointer group">
            <img src={MOCK_HOTEL.images[1]} alt="Gallery 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:block relative rounded-2xl overflow-hidden cursor-pointer group">
            <img src={MOCK_HOTEL.images[2]} alt="Gallery 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-lg">View All Photos</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <section className="mb-10 pb-10 border-b border-[var(--color-border-div)]">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">About this property</h2>
              <p className="text-[var(--color-text-sec)] leading-relaxed">{MOCK_HOTEL.description}</p>
            </section>

            <section className="mb-10 pb-10 border-b border-[var(--color-border-div)]">
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {MOCK_HOTEL.amenities.map(amenity => {
                  const Icon = AMENITY_ICONS[amenity] || Check;
                  return (
                    <div key={amenity} className="flex items-center gap-3 text-[var(--color-text-main)]">
                      <Icon className="h-5 w-5 text-[var(--color-text-muted)]" />
                      {amenity}
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Choose your room</h2>
              <div className="space-y-4">
                {MOCK_HOTEL.rooms.map(room => (
                  <div 
                    key={room.id}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedRoom.id === room.id 
                        ? 'border-[var(--color-primary)] bg-[var(--color-section)] ring-1 ring-[var(--color-primary)]' 
                        : 'border-[var(--color-border-div)] bg-white hover:border-[var(--color-text-muted)]'
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-[var(--color-primary)]">{room.name}</h3>
                        <p className="text-sm text-[var(--color-text-sec)] mt-1">{room.beds} • Up to {room.capacity} guests</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${room.price}</div>
                        <div className="text-sm text-[var(--color-text-sec)]">/ night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Widget */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-[var(--color-border-div)] sticky top-24">
              <div className="text-2xl font-bold text-[var(--color-primary)] mb-6">
                ${selectedRoom.price} <span className="text-base font-normal text-[var(--color-text-sec)]">/ night</span>
              </div>
              
              <div className="border border-[var(--color-border-div)] rounded-xl mb-6 overflow-hidden">
                <div className="flex border-b border-[var(--color-border-div)]">
                  <div className="p-3 flex-1 border-r border-[var(--color-border-div)]">
                    <label className="block text-xs font-bold text-[var(--color-text-main)] uppercase tracking-wider mb-1">Check-in</label>
                    <input 
                      type="date" 
                      className="w-full border-none p-0 focus:ring-0 text-sm bg-transparent"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="p-3 flex-1">
                    <label className="block text-xs font-bold text-[var(--color-text-main)] uppercase tracking-wider mb-1">Check-out</label>
                    <input 
                      type="date" 
                      className="w-full border-none p-0 focus:ring-0 text-sm bg-transparent"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-bold text-[var(--color-text-main)] uppercase tracking-wider mb-1">Guests</label>
                  <select 
                    className="w-full border-none p-0 focus:ring-0 text-sm bg-transparent"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} guests</option>)}
                  </select>
                </div>
              </div>

              <Button size="lg" className="w-full h-12 text-lg mb-4" onClick={handleBook}>
                Reserve
              </Button>
              <p className="text-center text-sm text-[var(--color-text-sec)] mb-6">You won't be charged yet</p>

              {checkIn && checkOut && (
                <div className="space-y-3 pt-4 border-t border-[var(--color-border-div)]">
                  <div className="flex justify-between text-[var(--color-text-main)]">
                    <span className="underline">${selectedRoom.price} x 3 nights</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-main)]">
                    <span className="underline">Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-text-main)]">
                    <span className="underline">Service fee</span>
                    <span>$80</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-[var(--color-border-div)]">
                    <span>Total</span>
                    <span>${calculateTotal() + 130}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
