import { Heart, Bed, Bath, Square, MapPin, Star, Eye, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  priceType: 'sale' | 'rent';
  propertyType: string;
  status: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  areaSqm?: number | null;
  address?: string | null;
  region?: string;
  images?: string[];
  agentName?: string;
  isFavorited?: boolean;
  isFeatured?: boolean;
  viewCount?: number;
  rating?: number;
  onClick?: () => void;
  onFavorite?: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  available: 'bg-success text-success-foreground',
  sold: 'bg-destructive text-destructive-foreground',
  rented: 'bg-warning text-warning-foreground',
  pending: 'bg-muted text-muted-foreground',
};

const TYPE_LABELS: Record<string, string> = {
  apartment: 'Apartment',
  villa: 'Villa',
  land: 'Land',
  commercial: 'Commercial',
  house: 'House',
};

function formatPrice(price: number, type: string): string {
  if (price >= 1_000_000) return `ETB ${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `ETB ${(price / 1_000).toFixed(0)}K`;
  return `ETB ${price.toLocaleString()}`;
}

export default function PropertyCard({
  id,
  title,
  price,
  priceType,
  propertyType,
  status,
  bedrooms,
  bathrooms,
  areaSqm,
  address,
  region,
  images = [],
  agentName,
  isFavorited = false,
  isFeatured = false,
  viewCount,
  rating,
  onClick,
  onFavorite,
}: PropertyCardProps) {
  const imgSrc = images[0] ?? '/placeholder.svg';

  return (
    <div
      className={cn(
        'group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 cursor-pointer',
        'shadow-sm hover:shadow-property hover:-translate-y-1',
        isFeatured && 'ring-2 ring-gold/40'
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-overlay opacity-80" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {isFeatured && (
            <span className="gradient-gold text-gold-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-gold">
              ✦ Featured
            </span>
          )}
          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide', STATUS_COLORS[status] ?? STATUS_COLORS.available)}>
            {status}
          </span>
        </div>

        {/* Favorite button */}
        <button
          className={cn(
            'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
            isFavorited
              ? 'bg-destructive text-destructive-foreground shadow-md'
              : 'glass text-primary-foreground hover:bg-destructive/80'
          )}
          onClick={(e) => { e.stopPropagation(); onFavorite?.(id); }}
        >
          <Heart className={cn('w-4 h-4', isFavorited && 'fill-current')} />
        </button>

        {/* Price tag */}
        <div className="absolute bottom-3 left-3">
          <div className="glass rounded-lg px-3 py-1.5">
            <p className="text-white font-bold text-base leading-none">
              {formatPrice(price, priceType)}
            </p>
            <p className="text-white/80 text-[10px] mt-0.5">
              {priceType === 'rent' ? '/month' : 'for sale'}
            </p>
          </div>
        </div>

        {/* View count */}
        {viewCount !== undefined && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 glass rounded-full px-2 py-1">
            <Eye className="w-3 h-3 text-white/80" />
            <span className="text-white/80 text-[10px]">{viewCount}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <Badge variant="secondary" className="text-[10px] shrink-0 capitalize">
            {TYPE_LABELS[propertyType] ?? propertyType}
          </Badge>
        </div>

        {/* Location */}
        {(address || region) && (
          <div className="flex items-center gap-1 text-muted-foreground mb-3">
            <MapPin className="w-3 h-3 shrink-0" />
            <p className="text-xs truncate">{[address, region].filter(Boolean).join(', ')}</p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3">
          {bedrooms != null && (
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" />
              <span>{bedrooms} Bed</span>
            </div>
          )}
          {bathrooms != null && (
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" />
              <span>{bathrooms} Bath</span>
            </div>
          )}
          {areaSqm != null && (
            <div className="flex items-center gap-1">
              <Square className="w-3.5 h-3.5" />
              <span>{areaSqm} m²</span>
            </div>
          )}
          {rating != null && (
            <div className="flex items-center gap-1 ml-auto">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-foreground font-medium">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
