import { BarChart3, Building2, Users, CheckCircle, XCircle, AlertCircle, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';

const ADMIN_STATS = [
  { label: 'Total Properties', value: '12,480', change: '+124 this week', icon: Building2, color: 'text-primary' },
  { label: 'Active Users', value: '8,920', change: '+340 this month', icon: Users, color: 'text-gold' },
  { label: 'Pending Approvals', value: '47', change: 'Needs attention', icon: AlertCircle, color: 'text-warning' },
  { label: 'Verified Agents', value: '1,230', change: '+12 new', icon: Shield, color: 'text-success' },
];

const PENDING_LISTINGS = [
  { id: 'p1', title: '3-Bed Villa – Bole', agent: 'Abebe G.', type: 'villa', price: 15_000_000, submitted: '2 hrs ago' },
  { id: 'p2', title: 'Office Space – Kazanchis', agent: 'Marta S.', type: 'commercial', price: 85_000, submitted: '5 hrs ago' },
  { id: 'p3', title: '2-Bed Apartment – CMC', agent: 'Dawit T.', type: 'apartment', price: 4_500_000, submitted: '1 day ago' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="gradient-gold text-gold-foreground text-xs">Admin Panel</Badge>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform overview and management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ADMIN_STATS.map(({ label, value, change, icon: Icon, color }) => (
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Approvals */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-warning" /> Pending Approvals
                <Badge className="bg-warning/10 text-warning ml-1">{PENDING_LISTINGS.length}</Badge>
              </h2>
            </div>
            <div className="divide-y divide-border">
              {PENDING_LISTINGS.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{p.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">by {p.agent}</span>
                      <Badge variant="secondary" className="text-[10px] capitalize">{p.type}</Badge>
                      <span className="text-xs text-muted-foreground">ETB {p.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground hidden md:block">{p.submitted}</span>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90 h-8 px-3">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5 h-8 px-3">
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Platform Health</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Properties Approved', pct: 92 },
                  { label: 'Agent Verification Rate', pct: 78 },
                  { label: 'User Satisfaction', pct: 96 },
                  { label: 'Inquiry Response Rate', pct: 85 },
                ].map(({ label, pct }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{pct}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="gradient-hero h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-gold" />
                <h3 className="font-semibold">Properties by Type</h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Apartments', count: 4200, color: 'bg-primary' },
                  { label: 'Villas', count: 1800, color: 'bg-gold' },
                  { label: 'Land', count: 3200, color: 'bg-success' },
                  { label: 'Commercial', count: 950, color: 'bg-warning' },
                ].map(({ label, count, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                    <span className="text-sm text-muted-foreground flex-1">{label}</span>
                    <span className="text-sm font-medium text-foreground">{count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
