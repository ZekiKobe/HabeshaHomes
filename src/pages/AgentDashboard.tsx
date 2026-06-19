import { BarChart3, Home, TrendingUp, Users, Eye, MessageSquare, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import propertyVilla from '@/assets/property-villa.jpg';
import propertyApartment from '@/assets/property-apartment.jpg';

const AGENT_STATS = [
  { label: 'Active Listings', value: '12', change: '+2 this month', icon: Home, color: 'text-primary' },
  { label: 'Total Views', value: '2,840', change: '+18% this week', icon: Eye, color: 'text-gold' },
  { label: 'New Leads', value: '34', change: '+8 today', icon: Users, color: 'text-success' },
  { label: 'Avg. Rating', value: '4.8', change: '38 reviews', icon: Star, color: 'text-warning' },
];

const MY_LISTINGS = [
  { id: '1', title: 'Luxury 3-Bed Apartment in Bole', price: 8_500_000, status: 'available', views: 342, leads: 12, img: propertyApartment },
  { id: '2', title: 'Modern Villa with Pool', price: 25_000_000, status: 'available', views: 215, leads: 8, img: propertyVilla },
  { id: '3', title: 'Commercial Space – Kazanchis', price: 120_000, status: 'rented', views: 98, leads: 4, img: propertyVilla },
];

const STATUS_COLORS: Record<string, string> = {
  available: 'bg-success/10 text-success',
  rented: 'bg-warning/10 text-warning',
  sold: 'bg-destructive/10 text-destructive',
  pending: 'bg-muted text-muted-foreground',
};

export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your listings and track performance</p>
          </div>
          <Button className="gradient-hero text-primary-foreground shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Add Property
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {AGENT_STATS.map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="font-display font-bold text-2xl text-foreground mb-1">{value}</p>
              <p className="text-xs text-muted-foreground">{change}</p>
            </div>
          ))}
        </div>

        {/* My Listings */}
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm mb-6">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-foreground">My Listings</h2>
            <Button variant="ghost" size="sm" className="text-primary">View All</Button>
          </div>
          <div className="divide-y divide-border">
            {MY_LISTINGS.map(p => (
              <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <img src={p.img} alt={p.title} className="w-16 h-12 rounded-lg object-cover shrink-0" loading="lazy" width={64} height={48} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">ETB {p.price.toLocaleString()}</p>
                </div>
                <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{p.views}</div>
                  <div className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{p.leads}</div>
                </div>
                <Badge className={`text-xs capitalize shrink-0 ${STATUS_COLORS[p.status]}`}>{p.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Charts placeholder */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Views This Week</h3>
            </div>
            <div className="flex items-end gap-2 h-28">
              {[40, 65, 48, 80, 72, 90, 58].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full gradient-hero rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-muted-foreground">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-success" />
              <h3 className="font-semibold">Lead Pipeline</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'New Inquiries', count: 12, color: 'bg-primary' },
                { label: 'Scheduled Visits', count: 5, color: 'bg-gold' },
                { label: 'Under Negotiation', count: 3, color: 'bg-warning' },
                { label: 'Closed Deals', count: 8, color: 'bg-success' },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                  <span className="text-sm text-foreground flex-1">{label}</span>
                  <span className="text-sm font-semibold text-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
