import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Calendar, Users, MapPin, Star } from 'lucide-react';

const FEATURED_HOTELS = [
  {
    id: 'h1',
    name: 'The Grand Azure Resort',
    city: 'Maldives',
    rating: 4.9,
    reviews: 128,
    price: 450,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'h2',
    name: 'Alpine Peak Chalet',
    city: 'Swiss Alps',
    rating: 4.8,
    reviews: 94,
    price: 320,
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'h3',
    name: 'Oasis Desert Camp',
    city: 'Dubai',
    rating: 4.7,
    reviews: 215,
    price: 280,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('2');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${location}&guests=${guests}`);
  };

  return (
    <div className="bg-[var(--color-background)]">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Hotel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Discover Your Next Premium Stay
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow">
            Experience uncompromised luxury and comfort at our handpicked selections around the globe.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Where are you going?" 
                className="pl-10 h-12 border-none bg-gray-50 focus:bg-white text-base"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex-1 relative border-t md:border-t-0 md:border-l border-[var(--color-border-div)]">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Check in - Check out" 
                className="pl-10 h-12 border-none bg-gray-50 focus:bg-white text-base"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
            <div className="w-full md:w-32 relative border-t md:border-t-0 md:border-l border-[var(--color-border-div)]">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] h-5 w-5" />
              <Input 
                type="number" 
                min="1"
                placeholder="Guests" 
                className="pl-10 h-12 border-none bg-gray-50 focus:bg-white text-base"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <Button 
              size="lg" 
              className="h-12 px-8 text-base font-semibold md:w-auto w-full"
              onClick={handleSearch}
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">Featured Destinations</h2>
            <p className="text-[var(--color-text-sec)]">Explore our most popular premium stays.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/search')}>View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_HOTELS.map((hotel) => (
            <div 
              key={hotel.id} 
              className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-border-div)] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 text-sm font-semibold text-[var(--color-text-main)] shadow-sm">
                  <Star className="w-4 h-4 text-[var(--color-accent-gold)] fill-[var(--color-accent-gold)]" />
                  {hotel.rating}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[var(--color-primary)] truncate pr-4">{hotel.name}</h3>
                </div>
                <div className="flex items-center text-[var(--color-text-sec)] mb-4 text-sm gap-1">
                  <MapPin className="w-4 h-4" />
                  {hotel.city}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-div)]">
                  <div>
                    <span className="text-lg font-bold text-[var(--color-text-main)]">${hotel.price}</span>
                    <span className="text-sm text-[var(--color-text-sec)]"> / night</span>
                  </div>
                  <span className="text-sm text-[var(--color-text-sec)] underline underline-offset-2">
                    {hotel.reviews} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="bg-[var(--color-section)] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-12">Why Choose StaySphere</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-[var(--color-primary)]">
                <Star className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Selection</h3>
              <p className="text-[var(--color-text-sec)]">Every property is vetted to ensure the highest standards of luxury and comfort.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-[var(--color-accent-green)]">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Booking</h3>
              <p className="text-[var(--color-text-sec)]">Our platform provides a smooth, secure, and hassle-free booking experience.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mx-auto mb-6 text-[var(--color-accent-gold)]">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-[var(--color-text-sec)]">Our dedicated support team is available around the clock to assist you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
