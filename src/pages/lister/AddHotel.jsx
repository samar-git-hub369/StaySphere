import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Building2, Plus, Trash2 } from 'lucide-react';

export default function AddHotel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    pricePerNight: '',
    amenities: [''],
  });

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = value;
    setFormData({ ...formData, amenities: newAmenities });
  };

  const addAmenityField = () => {
    setFormData({ ...formData, amenities: [...formData.amenities, ''] });
  };

  const removeAmenityField = (index) => {
    const newAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData({ ...formData, amenities: newAmenities });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock save
    setTimeout(() => {
      alert('Hotel submitted for approval!');
      setLoading(false);
      navigate('/lister/dashboard');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[var(--color-primary)] p-2 rounded-xl">
          <Building2 className="text-[var(--color-accent-gold)] h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)]">Add New Property</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-[var(--color-border-div)] shadow-sm">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--color-text-main)] border-b border-[var(--color-border-div)] pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Property Name</label>
              <Input 
                required 
                placeholder="e.g. The Grand Resort" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">City</label>
              <Input 
                required 
                placeholder="e.g. Paris"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Starting Price per Night ($)</label>
              <Input 
                required 
                type="number" 
                placeholder="e.g. 150"
                value={formData.pricePerNight}
                onChange={(e) => setFormData({...formData, pricePerNight: e.target.value})} 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Full Address</label>
              <Input 
                required 
                placeholder="e.g. 123 Luxury Ave, District 1"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--color-text-main)] mb-1">Description</label>
              <textarea 
                required 
                className="flex w-full rounded-md border border-[var(--color-border-div)] bg-white px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                rows="4"
                placeholder="Describe your property..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--color-text-main)] border-b border-[var(--color-border-div)] pb-2">Amenities</h2>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input 
                placeholder="e.g. Free WiFi"
                value={amenity}
                onChange={(e) => handleAmenityChange(index, e.target.value)}
              />
              {formData.amenities.length > 1 && (
                <button type="button" onClick={() => removeAmenityField(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addAmenityField} className="mt-2">
            <Plus className="h-4 w-4 mr-1" /> Add Amenity
          </Button>
        </div>

        <div className="pt-4 border-t border-[var(--color-border-div)] flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => navigate('/lister/dashboard')}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit for Approval'}
          </Button>
        </div>
      </form>
    </div>
  );
}
