import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart, Clock, MapPin, MessageSquare, Calendar, TrendingUp,
  Home, Bell, Search, ChevronRight, Star, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import propertyVilla from '@/assets/property-villa.jpg';
import propertyApartment from '@/assets/property-apartment.jpg';
import propertyCommercial from '@/assets/property-commercial.jpg';

const RECENT_ACTIVITY = [
  { id: '1', type: 'viewed', property: 'Luxury 3-Bed Apartment in Bole', date: '2 hours ago', img: propertyApartment },
  { id: '2', type: 'favorited', property: 'Modern Villa with Pool', date: '5 hours ago', img: propertyVilla },
  { id: '3', type: 'inquiry', property: 'Office Space - Kazanchis', date: '1 day ago', img: propertyCommercial },
];

const SCHEDULED_VISITS = [
  { id: 'v1', property: '4-Bed Executive Villa – CMC', date: 'Mar 28, 2026', time: '10:00 AM', agent: 'Abebe G.', status: 'confirmed' },
  { id: 'v2', property: '2-Bed Apartment – Megenagna', date: 'Mar 30, 2026', time: '2:30 PM', agent: 'Marta S.', status: 'pending' },
];

const SEARCH_ALERTS = [
  { id: 'a1', title: 'Apartments in Bole', criteria: '2-3 beds, 5M-10M ETB', frequency: 'Daily' },
  { id: 'a2', title: 'Villas in Old Airport', criteria: '4+ beds, 20M+ ETB', frequency: 'Weekly' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [favorites] = useState<Set<string>>(new Set(['1', '2']));

  const toggleFavorite = (id: string) => {
    console.log('Toggle favorite:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                Welcome back, User!
              </h1>
              <p className="text-primary-foreground/70">Manage your property journey</p>
            </div>
            <Button 
              className="gradient-gold text-gold-foreground shadow-gold"
              onClick={() => navigate('/profile')}
            >
              Edit Profile <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Favorites', value: '12', icon: Heart, color: 'text-red-500' },
            { label: 'Properties Viewed', value: '47', icon: Eye, color: 'text-blue-500' },
            { label: 'Scheduled Visits', value: '2', icon: Calendar, color: 'text-green-500' },
            { label: 'Inquiries Sent', value: '8', icon: MessageSquare, color: 'text-purple-500' },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="font-display font-bold text-2xl text-foreground">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="favorites" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-4 gap-2">
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="w-4 h-4" /> Favorites
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Recent
            </TabsTrigger>
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Visits
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" /> Alerts
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" /> My Favorites
                </h2>
                <Button variant="outline" size="sm" onClick={() => navigate('/favorites')}>
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: '1', title: 'Luxury 3-Bed Apartment in Bole', price: 8_500_000, priceType: 'sale' as const, propertyType: 'apartment', status: 'available', bedrooms: 3, bathrooms: 2, areaSqm: 145, address: 'Bole Road', region: 'Addis Ababa', images: [propertyApartment], isFeatured: true, viewCount: 342, rating: 4.8 },
                  { id: '2', title: 'Modern Villa with Swimming Pool', price: 25_000_000, priceType: 'sale' as const, propertyType: 'villa', status: 'available', bedrooms: 5, bathrooms: 4, areaSqm: 420, address: 'Old Airport', region: 'Addis Ababa', images: [propertyVilla], isFeatured: true, viewCount: 215, rating: 4.9 },
                ].map((p) => (
                  <PropertyCard
                    key={p.id}
                    {...p}
                    isFavorited={true}
                    onFavorite={toggleFavorite}
                    onClick={() => navigate(`/properties/${p.id}`)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="recent">
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" /> Recent Activity
                </h2>
              </div>
              <div className="divide-y divide-border">
                {RECENT_ACTIVITY.map(activity => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                    <img src={activity.img} alt={activity.property} className="w-16 h-12 rounded-lg object-cover shrink-0" loading="lazy" width={64} height={48} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{activity.property}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] capitalize">{activity.type}</Badge>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/properties/1`)}>
                      View <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Scheduled Visits Tab */}
          <TabsContent value="visits">
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" /> Scheduled Property Visits
                </h2>
              </div>
              <div className="divide-y divide-border">
                {SCHEDULED_VISITS.map(visit => (
                  <div key={visit.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{visit.property}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {visit.date} at {visit.time}
                        </span>
                        <span className="text-xs text-muted-foreground">• Agent: {visit.agent}</span>
                      </div>
                    </div>
                    <Badge className={`text-xs capitalize shrink-0 ${visit.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {visit.status}
                    </Badge>
                    <Button variant="outline" size="sm">Reschedule</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Search Alerts Tab */}
          <TabsContent value="alerts">
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-foreground flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-500" /> Search Alerts
                </h2>
                <Button size="sm" className="gradient-hero text-primary-foreground">
                  <Search className="w-4 h-4 mr-1" /> New Alert
                </Button>
              </div>
              <div className="divide-y divide-border">
                {SEARCH_ALERTS.map(alert => (
                  <div key={alert.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                    <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{alert.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{alert.criteria}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{alert.frequency}</p>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recommended Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Recommended for You</h2>
              <p className="text-muted-foreground">Based on your recent activity</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/properties')}>
              Browse All <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: '3', title: 'Prime Commercial Office Space', price: 120_000, priceType: 'rent', propertyType: 'commercial', status: 'available', areaSqm: 250, address: 'Kazanchis', region: 'Addis Ababa', images: [propertyCommercial], viewCount: 98, rating: 4.6 },
                { id: '4', title: 'Cozy 2-Bed Apartment – Megenagna', price: 25_000, priceType: 'rent', propertyType: 'apartment', status: 'available', bedrooms: 2, bathrooms: 1, areaSqm: 85, address: 'Megenagna', region: 'Addis Ababa', images: [propertyApartment], viewCount: 180, rating: 4.5 },
              ].map((p) => (
              <PropertyCard
                key={p.id}
                {...p}
                isFavorited={false}
                onFavorite={toggleFavorite}
                onClick={() => navigate(`/properties/${p.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
