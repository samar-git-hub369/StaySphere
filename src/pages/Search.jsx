import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { MapPin, Star, Filter, SlidersHorizontal } from 'lucide-react';

const MOCK_HOTELS = [
  { id: 'h1', name: 'The Grand Azure Resort', city: 'Maldives', rating: 4.9, reviews: 128, price: 450, image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800' },
  { id: 'h2', name: 'Alpine Peak Chalet', city: 'Swiss Alps', rating: 4.8, reviews: 94, price: 320, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800' },
  { id: 'h3', name: 'Oasis Desert Camp', city: 'Dubai', rating: 4.7, reviews: 215, price: 280, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800' },
  { id: 'h4', name: 'Metropolitan Luxury', city: 'New York', rating: 4.6, reviews: 312, price: 390, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800' },
  { id: 'h5', name: 'Sunset Villa', city: 'Santorini', rating: 4.9, reviews: 405, price: 550, image: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&q=80&w=800' },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialLocation = searchParams.get('location') || '';
  const initialGuests = searchParams.get('guests') || '2';
  
  const [location, setLocation] = useState(initialLocation);
  const [guests, setGuests] = useState(initialGuests);
  const [priceRange, setPriceRange] = useState(1000);
  
  const filteredHotels = MOCK_HOTELS.filter(h => 
    h.price <= priceRange && 
    (location ? h.city.toLowerCase().includes(location.toLowerCase()) || h.name.toLowerCase().includes(location.toLowerCase()) : true)
  );

  const handleUpdateSearch = () => {
    setSearchParams({ location, guests });
  };

  return (
    <div className="bg-[var(--color-background)] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[var(--color-border-div)] flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] h-5 w-5" />
            <Input 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where to?" 
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-32 relative">
             <Input 
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Guests" 
            />
          </div>
          <Button onClick={handleUpdateSearch} className="w-full md:w-auto">Update</Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-border-div)] sticky top-24">
              <div className="flex items-center gap-2 font-semibold text-[var(--color-text-main)] border-b border-[var(--color-border-div)] pb-4 mb-4">
                <SlidersHorizontal className="h-5 w-5" /> Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-[var(--color-text-main)] mb-2 block">
                    Max Price: ${priceRange}
                  </label>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-[var(--color-primary)]"
                  />
                  <div className="flex justify-between text-xs text-[var(--color-text-sec)] mt-1">
                    <span>$100</span>
                    <span>$1000+</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[var(--color-text-main)] mb-2 block">Rating</label>
                  <div className="space-y-2">
                    {[5, 4, 3].map(rating => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                        <span className="flex items-center text-sm text-[var(--color-text-sec)]">
                          {rating} <Star className="h-3 w-3 ml-1 text-[var(--color-accent-gold)] fill-[var(--color-accent-gold)]" /> & Up
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-primary)]">
                {filteredHotels.length} Stays found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => (
                <div 
                  key={hotel.id} 
                  className="bg-white rounded-xl overflow-hidden border border-[var(--color-border-div)] shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                >
                  <div className="relative h-48">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-[var(--color-primary)] line-clamp-1">{hotel.name}</h3>
                      <div className="flex items-center gap-1 bg-[var(--color-section)] px-2 py-1 rounded text-sm font-semibold">
                        <Star className="w-3.5 h-3.5 text-[var(--color-accent-gold)] fill-[var(--color-accent-gold)]" />
                        {hotel.rating}
                      </div>
                    </div>
                    <div className="flex items-center text-[var(--color-text-sec)] text-sm mb-4">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {hotel.city}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--color-border-div)]">
                      <div className="font-bold text-[var(--color-text-main)] text-lg">
                        ${hotel.price} <span className="font-normal text-sm text-[var(--color-text-sec)]">/ night</span>
                      </div>
                      <span className="text-xs text-[var(--color-text-sec)]">{hotel.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredHotels.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-[var(--color-border-div)]">
                <Filter className="mx-auto h-12 w-12 text-[var(--color-text-muted)] mb-4" />
                <h3 className="text-lg font-medium text-[var(--color-text-main)]">No stays found</h3>
                <p className="text-[var(--color-text-sec)] mt-1">Try adjusting your filters or search destination.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
