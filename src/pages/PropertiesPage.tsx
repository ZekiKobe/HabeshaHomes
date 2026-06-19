import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Grid3X3, List, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters, { type SearchFiltersState } from '@/components/SearchFilters';
import propertyVilla from '@/assets/property-villa.jpg';
import propertyApartment from '@/assets/property-apartment.jpg';
import propertyCommercial from '@/assets/property-commercial.jpg';

const ALL_PROPERTIES = [
  { id: '1', title: 'Luxury 3-Bed Apartment in Bole', price: 8_500_000, priceType: 'sale' as const, propertyType: 'apartment', status: 'available', bedrooms: 3, bathrooms: 2, areaSqm: 145, address: 'Bole Road', region: 'Addis Ababa', images: [propertyApartment], isFeatured: true, viewCount: 342, rating: 4.8 },
  { id: '2', title: 'Modern Villa with Swimming Pool', price: 25_000_000, priceType: 'sale' as const, propertyType: 'villa', status: 'available', bedrooms: 5, bathrooms: 4, areaSqm: 420, address: 'Old Airport', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true, viewCount: 215, rating: 4.9 },
  { id: '3', title: 'Prime Commercial Office Space', price: 120_000, priceType: 'rent' as const, propertyType: 'commercial', status: 'available', areaSqm: 250, address: 'Kazanchis', region: 'Addis Ababa', images: [propertyCommercial], viewCount: 98, rating: 4.6 },
  { id: '4', title: 'Cozy 2-Bed Apartment – Megenagna', price: 25_000, priceType: 'rent' as const, propertyType: 'apartment', status: 'available', bedrooms: 2, bathrooms: 1, areaSqm: 85, address: 'Megenagna', region: 'Addis Ababa', images: [propertyApartment], viewCount: 180, rating: 4.5 },
  { id: '5', title: 'Investment Land – Oromia Suburb', price: 3_200_000, priceType: 'sale' as const, propertyType: 'land', status: 'available', areaSqm: 1200, address: 'Bishoftu Road', region: 'Oromia', images: [propertyVilla], viewCount: 75, rating: 4.3 },
  { id: '6', title: '4-Bed Executive Villa – CMC', price: 32_000_000, priceType: 'sale' as const, propertyType: 'villa', status: 'available', bedrooms: 4, bathrooms: 3, areaSqm: 380, address: 'CMC Area', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true, viewCount: 290, rating: 5.0 },
  { id: '7', title: 'Studio Apartment – Sarbet', price: 15_000, priceType: 'rent' as const, propertyType: 'apartment', status: 'available', bedrooms: 1, bathrooms: 1, areaSqm: 45, address: 'Sarbet', region: 'Addis Ababa', images: [propertyApartment], viewCount: 120, rating: 4.1 },
  { id: '8', title: 'Commercial Warehouse – Akaki', price: 85_000, priceType: 'rent' as const, propertyType: 'commercial', status: 'available', areaSqm: 500, address: 'Akaki', region: 'Addis Ababa', images: [propertyCommercial], viewCount: 55, rating: 4.2 },
  { id: '9', title: 'Family Home – Ayat Area', price: 12_000_000, priceType: 'sale' as const, propertyType: 'house', status: 'available', bedrooms: 4, bathrooms: 3, areaSqm: 290, address: 'Ayat', region: 'Addis Ababa', images: [propertyVilla], viewCount: 140, rating: 4.7 },
];

export default function PropertiesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [properties, setProperties] = useState(ALL_PROPERTIES);

  useEffect(() => {
    const q = searchParams.get('q')?.toLowerCase() ?? '';
    const region = searchParams.get('region') ?? 'all';
    const type = searchParams.get('type') ?? 'all';
    const pricetype = searchParams.get('pricetype') ?? 'all';

    let filtered = ALL_PROPERTIES;
    if (q) filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.address?.toLowerCase().includes(q));
    if (region !== 'all') filtered = filtered.filter(p => p.region === region);
    if (type !== 'all') filtered = filtered.filter(p => p.propertyType === type);
    if (pricetype !== 'all') filtered = filtered.filter(p => p.priceType === pricetype);
    setProperties(filtered);
  }, [searchParams]);

  const handleSearch = (filters: SearchFiltersState) => {
    let filtered = ALL_PROPERTIES;
    if (filters.query) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        p.address?.toLowerCase().includes(filters.query.toLowerCase())
      );
    }
    if (filters.region !== 'all') filtered = filtered.filter(p => p.region === filters.region);
    if (filters.propertyType !== 'all') filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    if (filters.priceType !== 'all') filtered = filtered.filter(p => p.priceType === filters.priceType);
    if (filters.bedrooms !== 'any') {
      const min = parseInt(filters.bedrooms);
      filtered = filtered.filter(p => (p.bedrooms ?? 0) >= min);
    }
    filtered = filtered.filter(p => p.price >= filters.priceMin && p.price <= filters.priceMax);

    if (filters.sortBy === 'price_asc') filtered.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === 'price_desc') filtered.sort((a, b) => b.price - a.price);
    else if (filters.sortBy === 'popular') filtered.sort((a, b) => (b.viewCount ?? 0) - (a.viewCount ?? 0));

    setProperties(filtered);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Browse Properties
          </h1>
          <p className="text-primary-foreground/70">
            {properties.length} properties found across Ethiopia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} />
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{properties.length}</span> properties
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Properties grid */}
        {properties.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <SortAsc className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search filters</p>
            <Button onClick={() => { setProperties(ALL_PROPERTIES); }}>Clear Filters</Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }>
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                {...p}
                isFavorited={favorites.has(p.id)}
                onFavorite={toggleFavorite}
                onClick={() => navigate(`/properties/${p.id}`)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
