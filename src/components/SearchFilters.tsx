import { useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersState) => void;
  compact?: boolean;
}

export interface SearchFiltersState {
  query: string;
  priceMin: number;
  priceMax: number;
  propertyType: string;
  priceType: string;
  bedrooms: string;
  region: string;
  status: string;
  sortBy: string;
}

const DEFAULT_FILTERS: SearchFiltersState = {
  query: '',
  priceMin: 0,
  priceMax: 50_000_000,
  propertyType: 'all',
  priceType: 'all',
  bedrooms: 'any',
  region: 'all',
  status: 'available',
  sortBy: 'newest',
};

const ETHIOPIAN_REGIONS = [
  'Addis Ababa', 'Oromia', 'Amhara', 'Tigray', 'SNNPR',
  'Somali', 'Afar', 'Dire Dawa', 'Harar', 'Benishangul-Gumuz', 'Gambela',
];

export default function SearchFilters({ onSearch, compact = false }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersState>(DEFAULT_FILTERS);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (key: keyof SearchFiltersState, value: string | number | number[]) => {
    if (Array.isArray(value)) {
      const newFilters = { ...filters, priceMin: value[0], priceMax: value[1] };
      setFilters(newFilters);
    } else {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
    }
  };

  const handleSearch = () => onSearch(filters);

  const activeFilterCount = [
    filters.propertyType !== 'all',
    filters.priceType !== 'all',
    filters.bedrooms !== 'any',
    filters.region !== 'all',
    filters.priceMin > 0,
    filters.priceMax < 50_000_000,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    onSearch(DEFAULT_FILTERS);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-md overflow-hidden">
      {/* Main search row */}
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, location, or keywords..."
            className="pl-9 border-border focus-visible:ring-primary"
            value={filters.query}
            onChange={(e) => update('query', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Select value={filters.priceType} onValueChange={(v) => update('priceType', v)}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Buy & Rent</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.region} onValueChange={(v) => update('region', v)}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {ETHIOPIAN_REGIONS.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="relative"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 gradient-gold text-gold-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <Button onClick={handleSearch} className="gradient-hero text-primary-foreground px-6">
            Search
          </Button>
        </div>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="border-t border-border p-4 bg-muted/30 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Property Type</label>
              <Select value={filters.propertyType} onValueChange={(v) => update('propertyType', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bedrooms</label>
              <Select value={filters.bedrooms} onValueChange={(v) => update('bedrooms', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sort By</label>
              <Select value={filters.sortBy} onValueChange={(v) => update('sortBy', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
              <Select value={filters.status} onValueChange={(v) => update('status', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-muted-foreground mb-3 block">
              Price Range: ETB {filters.priceMin.toLocaleString()} – ETB {filters.priceMax.toLocaleString()}
            </label>
            <Slider
              min={0}
              max={50_000_000}
              step={100_000}
              value={[filters.priceMin, filters.priceMax]}
              onValueChange={(v) => update('priceMin', v)}
              className="w-full"
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3 mr-1" /> Clear all filters
                </Button>
              )}
            </div>
            <Button size="sm" onClick={handleSearch} className="gradient-hero text-primary-foreground">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
