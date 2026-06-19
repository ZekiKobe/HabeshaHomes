import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2, Share2, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import propertyVilla from '@/assets/property-villa.jpg';
import propertyApartment from '@/assets/property-apartment.jpg';

const FAVORITE_PROPERTIES = [
  { id: '1', title: 'Luxury 3-Bed Apartment in Bole', price: 8_500_000, priceType: 'sale' as const, propertyType: 'apartment', status: 'available', bedrooms: 3, bathrooms: 2, areaSqm: 145, address: 'Bole Road', region: 'Addis Ababa', images: [propertyApartment], isFeatured: true, viewCount: 342, rating: 4.8 },
  { id: '2', title: 'Modern Villa with Swimming Pool', price: 25_000_000, priceType: 'sale' as const, propertyType: 'villa', status: 'available', bedrooms: 5, bathrooms: 4, areaSqm: 420, address: 'Old Airport', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true, viewCount: 215, rating: 4.9 },
  { id: '6', title: '4-Bed Executive Villa – CMC', price: 32_000_000, priceType: 'sale' as const, propertyType: 'villa', status: 'available', bedrooms: 4, bathrooms: 3, areaSqm: 380, address: 'CMC Area', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true, viewCount: 290, rating: 5.0 },
];

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(FAVORITE_PROPERTIES);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  };

  const toggleFavorite = (id: string) => {
    removeFavorite(id);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">No Favorites Yet</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Start saving properties you love to compare and view them later.</p>
          <Button className="gradient-hero text-primary-foreground" onClick={() => navigate('/properties')}>
            Browse Properties
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            My Favorites
          </h1>
          <p className="text-primary-foreground/70">
            {favorites.length} saved {favorites.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* View controls */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{favorites.length}</span> favorites
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

        {/* Favorites grid */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }>
          {favorites.map((p) => (
            <div key={p.id} className="relative group">
              <PropertyCard
                {...p}
                isFavorited={true}
                onFavorite={toggleFavorite}
                onClick={() => navigate(`/properties/${p.id}`)}
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(p.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={() => navigate('/properties')}>
            Discover More Properties
          </Button>
          <Button className="gradient-gold text-gold-foreground shadow-gold">
            <Share2 className="w-4 h-4 mr-2" /> Share Favorites
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
