import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Phone, Mail, MessageCircle, Filter, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AGENTS = [
  {
    id: 'a1',
    name: 'Abebe Girma',
    avatar: null,
    company: 'Addis Luxury Homes',
    location: 'Addis Ababa',
    specialty: ['villa', 'apartment'],
    listings: 24,
    rating: 4.9,
    reviews: 38,
    phone: '+251 91 234 5678',
    email: 'abebe@example.com',
    isVerified: true,
    languages: ['Amharic', 'English'],
    experience: '8 years',
  },
  {
    id: 'a2',
    name: 'Marta Solomon',
    avatar: null,
    company: 'Ethiopian Premium Properties',
    location: 'Bole, Addis Ababa',
    specialty: ['commercial', 'apartment'],
    listings: 18,
    rating: 4.8,
    reviews: 29,
    phone: '+251 91 345 6789',
    email: 'marta@example.com',
    isVerified: true,
    languages: ['Amharic', 'English', 'French'],
    experience: '6 years',
  },
  {
    id: 'a3',
    name: 'Dawit Tadesse',
    avatar: null,
    company: 'Capital Real Estate',
    location: 'Kazanchis, Addis Ababa',
    specialty: ['land', 'commercial'],
    listings: 31,
    rating: 4.7,
    reviews: 45,
    phone: '+251 91 456 7890',
    email: 'dawit@example.com',
    isVerified: false,
    languages: ['Amharic', 'English'],
    experience: '10 years',
  },
  {
    id: 'a4',
    name: 'Hana Kebede',
    avatar: null,
    company: 'Independent Agent',
    location: 'CMC, Addis Ababa',
    specialty: ['apartment', 'villa'],
    listings: 15,
    rating: 4.9,
    reviews: 22,
    phone: '+251 91 567 8901',
    email: 'hana@example.com',
    isVerified: true,
    languages: ['Amharic', 'English'],
    experience: '5 years',
  },
];

export default function AgentsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'listings'>('rating');

  const filteredAgents = AGENTS.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || agent.specialty.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.listings - a.listings;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Find Your Perfect Agent
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Connect with experienced, verified real estate agents across Ethiopia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Specialties</option>
                <option value="apartment">Apartments</option>
                <option value="villa">Villas</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'listings')}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="rating">Top Rated</option>
                <option value="listings">Most Listings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Agents', value: '1,230+', icon: Users, color: 'text-primary' },
            { label: 'Verified Agents', value: '890+', icon: Award, color: 'text-gold' },
            { label: 'Active Listings', value: '12,400+', icon: TrendingUp, color: 'text-success' },
            { label: 'Happy Clients', value: '8,900+', icon: Star, color: 'text-blue-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card rounded-xl border border-border p-5 shadow-sm text-center">
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <p className="font-display font-bold text-2xl text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/agents/${agent.id}`)}
            >
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={agent.avatar ?? undefined} />
                    <AvatarFallback className="gradient-hero text-primary-foreground font-semibold text-xl">
                      {agent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {agent.isVerified && (
                    <Badge className="bg-success/10 text-success text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg text-foreground mb-1">{agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{agent.company}</p>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 text-gold" />
                  {agent.location}
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="font-semibold text-foreground">{agent.rating}</span>
                  <span className="text-sm text-muted-foreground">({agent.reviews} reviews)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specialty.map(spec => (
                    <Badge key={spec} variant="secondary" className="text-xs capitalize">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Listings</p>
                    <p className="font-semibold text-foreground">{agent.listings}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Experience</p>
                    <p className="font-semibold text-foreground">{agent.experience}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border p-4 bg-muted/30 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 gradient-hero text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://wa.me/${agent.phone.replace(/\s/g, '')}`, '_blank');
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`tel:${agent.phone}`);
                  }}
                >
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No agents found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search filters</p>
            <Button onClick={() => { setSearchQuery(''); setSelectedSpecialty('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
