import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, ArrowRight, MapPin, TrendingUp, Shield, Star,
  Users, Home, Landmark, Store, CheckCircle2, Zap, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters, { type SearchFiltersState } from '@/components/SearchFilters';
import heroBg from '@/assets/hero-bg.jpg';
import propertyVilla from '@/assets/property-villa.jpg';
import propertyApartment from '@/assets/property-apartment.jpg';
import propertyCommercial from '@/assets/property-commercial.jpg';

// Mock properties for demo
const MOCK_PROPERTIES = [
  {
    id: '1', title: 'Luxury 3-Bed Apartment in Bole', price: 8_500_000, priceType: 'sale' as const,
    propertyType: 'apartment', status: 'available', bedrooms: 3, bathrooms: 2, areaSqm: 145,
    address: 'Bole Road', region: 'Addis Ababa', images: [propertyApartment], isFeatured: true,
    viewCount: 342, rating: 4.8,
  },
  {
    id: '2', title: 'Modern Villa with Swimming Pool', price: 25_000_000, priceType: 'sale' as const,
    propertyType: 'villa', status: 'available', bedrooms: 5, bathrooms: 4, areaSqm: 420,
    address: 'Old Airport', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true,
    viewCount: 215, rating: 4.9,
  },
  {
    id: '3', title: 'Prime Commercial Office Space', price: 120_000, priceType: 'rent' as const,
    propertyType: 'commercial', status: 'available', areaSqm: 250,
    address: 'Kazanchis', region: 'Addis Ababa', images: [propertyCommercial],
    viewCount: 98, rating: 4.6,
  },
  {
    id: '4', title: 'Cozy 2-Bed Apartment – Megenagna', price: 25_000, priceType: 'rent' as const,
    propertyType: 'apartment', status: 'available', bedrooms: 2, bathrooms: 1, areaSqm: 85,
    address: 'Megenagna', region: 'Addis Ababa', images: [propertyApartment],
    viewCount: 180, rating: 4.5,
  },
  {
    id: '5', title: 'Investment Land – Oromia Suburb', price: 3_200_000, priceType: 'sale' as const,
    propertyType: 'land', status: 'available', areaSqm: 1200,
    address: 'Bishoftu Road', region: 'Oromia', images: [propertyVilla],
    viewCount: 75, rating: 4.3,
  },
  {
    id: '6', title: '4-Bed Executive Villa – CMC', price: 32_000_000, priceType: 'sale' as const,
    propertyType: 'villa', status: 'available', bedrooms: 4, bathrooms: 3, areaSqm: 380,
    address: 'CMC Area', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true,
    viewCount: 290, rating: 5.0,
  },
];

const STATS = [
  { label: 'Properties Listed', value: '12,400+', icon: Home },
  { label: 'Happy Clients', value: '8,900+', icon: Users },
  { label: 'Cities Covered', value: '45+', icon: MapPin },
  { label: 'Verified Agents', value: '1,200+', icon: Shield },
];

const CATEGORIES = [
  { label: 'Apartments', icon: Building2, count: 4200, slug: 'apartment', color: 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400' },
  { label: 'Villas', icon: Home, count: 1800, slug: 'villa', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400' },
  { label: 'Commercial', icon: Store, count: 950, slug: 'commercial', color: 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400' },
  { label: 'Land', icon: Landmark, count: 3200, slug: 'land', color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400' },
];

const WHY_CHOOSE = [
  { icon: Shield, title: 'Verified Listings', desc: 'All properties are verified by our expert team to ensure accuracy and safety.' },
  { icon: Zap, title: 'Instant Alerts', desc: 'Get real-time notifications when new properties match your criteria.' },
  { icon: Star, title: 'Rated Agents', desc: 'Connect with top-rated, licensed agents with proven track records.' },
  { icon: TrendingUp, title: 'Market Insights', desc: 'AI-powered price estimates and market trend analysis for smart decisions.' },
];

export default function Index() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleSearch = (filters: SearchFiltersState) => {
    const params = new URLSearchParams();
    if (filters.query) params.set('q', filters.query);
    if (filters.region !== 'all') params.set('region', filters.region);
    if (filters.propertyType !== 'all') params.set('type', filters.propertyType);
    if (filters.priceType !== 'all') params.set('pricetype', filters.priceType);
    navigate(`/properties?${params.toString()}`);
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

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src={heroBg}
          alt="Luxury property"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />

        <div className="container mx-auto px-4 relative z-10 pt-16 pb-32">
          <div className="max-w-2xl">
            <Badge className="gradient-gold text-gold-foreground mb-5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase shadow-gold">
              ✦ Ethiopia's #1 Real Estate Platform
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Find Your
              <span className="block text-gradient-gold">Dream Home</span>
              in Ethiopia
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-10 max-w-lg">
              Discover thousands of verified properties across Ethiopia. Buy, sell, or rent with confidence using our AI-powered platform.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mb-10">
              {STATS.slice(0, 3).map(({ label, value }) => (
                <div key={label}>
                  <p className="font-display font-bold text-2xl text-gold">{value}</p>
                  <p className="text-xs text-primary-foreground/70">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="gradient-gold text-gold-foreground font-semibold px-8 shadow-gold hover:opacity-90 text-base"
                onClick={() => navigate('/properties')}
              >
                Browse Properties <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
                onClick={() => navigate('/auth?tab=signup')}
              >
                List Your Property
              </Button>
            </div>
          </div>
        </div>

        {/* Search panel floating at bottom */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 container mx-auto px-4">
          <SearchFilters onSearch={handleSearch} />
        </div>
      </section>

      {/* Stats bar */}
      <section className="mt-24 py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center mx-auto mb-3 shadow-gold">
                  <Icon className="w-5 h-5 text-gold-foreground" />
                </div>
                <p className="font-display font-bold text-3xl text-primary-foreground mb-1">{value}</p>
                <p className="text-sm text-primary-foreground/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Browse By Type</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Explore Categories</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Find the perfect property type that suits your needs and lifestyle.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, count, slug, color }) => (
              <button
                key={label}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 text-left"
                onClick={() => navigate(`/properties?type=${slug}`)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} transition-transform group-hover:scale-110`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground">{count.toLocaleString()} listings</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Handpicked</Badge>
              <h2 className="font-display text-4xl font-bold text-foreground">Featured Properties</h2>
            </div>
            <Button
              variant="ghost"
              className="text-primary hover:text-primary/80 hidden md:flex items-center gap-1"
              onClick={() => navigate('/properties')}
            >
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.map((p) => (
              <PropertyCard
                key={p.id}
                {...p}
                isFavorited={favorites.has(p.id)}
                onFavorite={toggleFavorite}
                onClick={() => navigate(`/properties/${p.id}`)}
              />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Button
              variant="outline"
              onClick={() => navigate('/properties')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              View All Properties <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Why HabeshaHomes</Badge>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                The Smart Way to Find<br />Real Estate in Ethiopia
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                We combine cutting-edge AI technology with local market expertise to deliver the most accurate property listings and insights in Ethiopia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shrink-0 shadow-md">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                className="mt-10 gradient-hero text-primary-foreground hover:opacity-90 shadow-md"
                size="lg"
                onClick={() => navigate('/about')}
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Image grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3">
                <img src={propertyApartment} alt="Property" className="rounded-xl w-full aspect-square object-cover shadow-lg" loading="lazy" width={400} height={400} />
                <img src={propertyVilla} alt="Property" className="rounded-xl w-full aspect-square object-cover shadow-lg mt-6" loading="lazy" width={400} height={400} />
                <img src={propertyCommercial} alt="Property" className="rounded-xl w-full aspect-square object-cover shadow-lg -mt-6" loading="lazy" width={400} height={400} />
                <div className="rounded-xl gradient-hero flex items-center justify-center aspect-square">
                  <div className="text-center">
                    <p className="font-display font-bold text-4xl text-primary-foreground">10+</p>
                    <p className="text-primary-foreground/80 text-sm">Years of Experience</p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass-dark rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center shadow-gold">
                    <CheckCircle2 className="w-5 h-5 text-gold-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Fully Verified</p>
                    <p className="text-xs text-muted-foreground">All listings checked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold blur-3xl" />
            </div>
            <div className="relative z-10">
              <Badge className="gradient-gold text-gold-foreground mb-5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest shadow-gold">
                Start Today
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Find Your<br />Perfect Property?
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-lg mx-auto text-lg">
                Join over 8,900 satisfied clients who found their dream home through HabeshaHomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gradient-gold text-gold-foreground font-semibold px-10 shadow-gold hover:opacity-90"
                  onClick={() => navigate('/properties')}
                >
                  Browse Properties
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => navigate('/auth?tab=signup')}
                >
                  Become an Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
