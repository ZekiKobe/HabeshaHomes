import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart, Share2, MapPin, Bed, Bath, Square, Eye, Star, Phone,
  MessageCircle, Calendar, ChevronLeft, ChevronRight, Check,
  Building2, Tag, ArrowRight, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import propertyVilla from '@/assets/property-villa.jpg';
import propertyApartment from '@/assets/property-apartment.jpg';
import propertyCommercial from '@/assets/property-commercial.jpg';

const MOCK_PROPERTY = {
  id: '2',
  title: 'Modern Villa with Swimming Pool',
  description: `This stunning executive villa offers the perfect blend of modern luxury and traditional Ethiopian charm. Nestled in the prestigious Old Airport neighborhood of Addis Ababa, this property features premium finishes throughout.

The open-plan ground floor features a spacious living room, formal dining area, and a gourmet kitchen with imported appliances. Upstairs, the master suite boasts a walk-in closet and a spa-like en-suite bathroom with panoramic views of the landscaped garden.

The outdoor space is truly exceptional, featuring a 15-meter infinity pool, a covered entertainment pavilion, and lush tropical gardens maintained by a full-time gardener.`,
  price: 25_000_000,
  priceType: 'sale' as const,
  propertyType: 'villa',
  status: 'available',
  bedrooms: 5,
  bathrooms: 4,
  areaSqm: 420,
  floorNumber: null,
  totalFloors: 2,
  address: 'Old Airport, Addis Ababa',
  region: 'Addis Ababa',
  zone: 'Bole Zone',
  country: 'Ethiopia',
  latitude: 8.9906,
  longitude: 38.7578,
  amenities: ['Swimming Pool', 'Garden', 'Parking (3 cars)', 'Security 24/7', 'Generator Backup', 'CCTV', 'Smart Home', 'Gym', 'Storage'],
  images: [propertyVilla, propertyApartment, propertyCommercial, propertyVilla],
  isFeatured: true,
  viewCount: 215,
  rating: 4.9,
  agent: {
    id: 'a1',
    name: 'Abebe Girma',
    avatar: null,
    phone: '+251 91 234 5678',
    email: 'abebe@example.com',
    company: 'Addis Luxury Homes',
    listings: 24,
    rating: 4.9,
    reviews: 38,
    isVerified: true,
  },
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', phone: '', message: `Hi, I'm interested in this property. Could you please provide more information?` });

  const property = MOCK_PROPERTY;

  const prevImage = () => setActiveImage(i => (i - 1 + property.images.length) % property.images.length);
  const nextImage = () => setActiveImage(i => (i + 1) % property.images.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <Button
          variant="ghost"
          className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to listings
        </Button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {property.isFeatured && (
                <Badge className="gradient-gold text-gold-foreground text-xs">✦ Featured</Badge>
              )}
              <Badge variant="secondary" className="capitalize">{property.propertyType}</Badge>
              <Badge className="bg-success text-success-foreground capitalize">{property.status}</Badge>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-2">
              {property.title}
            </h1>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-sm">{property.address}</span>
              <span className="text-sm text-muted-foreground/50">•</span>
              <Eye className="w-4 h-4" />
              <span className="text-sm">{property.viewCount} views</span>
              <span className="text-sm text-muted-foreground/50">•</span>
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="text-sm">{property.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className={isFavorited ? 'text-destructive border-destructive' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Saved' : 'Save'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button
              size="sm"
              className="gradient-gold text-gold-foreground shadow-gold"
              onClick={() => setShowAI(true)}
            >
              <Zap className="w-4 h-4 mr-2" /> Ask AI
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2">
            {/* Image gallery */}
            <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-muted">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
                width={900}
                height={506}
              />
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/20 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 glass w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/20 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-gold w-5' : 'bg-primary-foreground/50'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-16 rounded-lg overflow-hidden shrink-0 transition-all ${i === activeImage ? 'ring-2 ring-gold' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" width={80} height={64} />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                    { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                    { icon: Square, label: 'Area', value: `${property.areaSqm} m²` },
                    { icon: Building2, label: 'Floors', value: property.totalFloors },
                  ].filter(s => s.value).map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-muted/50 rounded-xl p-4 text-center">
                      <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-foreground text-lg">{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-display font-semibold text-xl mb-3">About This Property</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="details">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['Property Type', property.propertyType],
                    ['Status', property.status],
                    ['Price Type', property.priceType],
                    ['Area', `${property.areaSqm} m²`],
                    ['Bedrooms', property.bedrooms],
                    ['Bathrooms', property.bathrooms],
                    ['Country', property.country],
                    ['Region', property.region],
                    ['Zone', property.zone],
                    ['Address', property.address],
                  ].filter(([,v]) => v).map(([label, value]) => (
                    <div key={label as string} className="bg-muted/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      <p className="font-medium text-foreground capitalize">{value as string}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="amenities">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 bg-muted/30 rounded-lg p-3">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      <span className="text-sm text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location">
                <div className="bg-muted/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{property.address}</p>
                      <p className="text-sm text-muted-foreground">{property.zone}, {property.region}, {property.country}</p>
                    </div>
                  </div>
                  {/* Map placeholder */}
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Map View</p>
                      <p className="text-xs">{property.latitude}, {property.longitude}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => window.open(`https://www.openstreetmap.org/?mlat=${property.latitude}&mlon=${property.longitude}`, '_blank')}
                      >
                        Open in Maps
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Price */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-md">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-bold text-3xl text-foreground">
                  ETB {property.price.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-5">
                {(property.priceType as string) === 'rent' ? 'Per month' : 'Sale price'}
              </p>

              {/* WhatsApp contact */}
              <Button
                className="w-full bg-success text-success-foreground hover:bg-success/90 mb-3"
                onClick={() => window.open(`https://wa.me/${property.agent.phone.replace(/\s/g, '')}`, '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp Agent
              </Button>
              <Button variant="outline" className="w-full mb-3">
                <Phone className="w-4 h-4 mr-2" /> Call Agent
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" /> Schedule Visit
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3">Free consultation • No obligation</p>
            </div>

            {/* Agent card */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-md">
              <h4 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">Listed By</h4>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={property.agent.avatar ?? undefined} />
                  <AvatarFallback className="gradient-hero text-primary-foreground font-semibold">
                    {property.agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-foreground">{property.agent.name}</p>
                    {property.agent.isVerified && (
                      <Check className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{property.agent.company}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center bg-muted/50 rounded-lg p-2">
                  <p className="font-bold text-foreground">{property.agent.listings}</p>
                  <p className="text-[10px] text-muted-foreground">Listings</p>
                </div>
                <div className="text-center bg-muted/50 rounded-lg p-2">
                  <p className="font-bold text-foreground">{property.agent.rating}</p>
                  <p className="text-[10px] text-muted-foreground">Rating</p>
                </div>
                <div className="text-center bg-muted/50 rounded-lg p-2">
                  <p className="font-bold text-foreground">{property.agent.reviews}</p>
                  <p className="text-[10px] text-muted-foreground">Reviews</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Agent Profile <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Inquiry form */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-md">
              <h4 className="font-semibold mb-4">Send an Inquiry</h4>
              <div className="space-y-3">
                <Input
                  placeholder="Your name"
                  value={inquiryForm.name}
                  onChange={e => setInquiryForm(f => ({ ...f, name: e.target.value }))}
                />
                <Input
                  placeholder="Email address"
                  type="email"
                  value={inquiryForm.email}
                  onChange={e => setInquiryForm(f => ({ ...f, email: e.target.value }))}
                />
                <Input
                  placeholder="Phone number"
                  value={inquiryForm.phone}
                  onChange={e => setInquiryForm(f => ({ ...f, phone: e.target.value }))}
                />
                <Textarea
                  placeholder="Your message..."
                  rows={4}
                  value={inquiryForm.message}
                  onChange={e => setInquiryForm(f => ({ ...f, message: e.target.value }))}
                  className="resize-none"
                />
                <Button className="w-full gradient-hero text-primary-foreground">
                  Send Message
                </Button>
              </div>
            </div>

            {/* AI price estimate */}
            <div className="gradient-hero rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 gradient-gold opacity-20 rounded-full -translate-y-8 translate-x-8 blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-gold" />
                  <h4 className="font-semibold text-primary-foreground">AI Price Analysis</h4>
                </div>
                <p className="text-sm text-primary-foreground/80 mb-3">
                  Based on similar properties in {property.region}, this listing is priced <strong className="text-gold">competitively</strong> compared to the market.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-primary-foreground/70 text-xs">Market avg:</span>
                  <span className="font-bold text-gold">ETB 27.5M</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => setShowAI(true)}
                >
                  Get Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      {showAI && (
        <AIAssistant
          propertyContext={`Property: ${property.title}, Price: ETB ${property.price.toLocaleString()}, Location: ${property.address}, Type: ${property.propertyType}, ${property.bedrooms} beds, ${property.bathrooms} baths, ${property.areaSqm}m²`}
          onClose={() => setShowAI(false)}
        />
      )}

      <Footer />
    </div>
  );
}
