import { useNavigate } from 'react-router-dom';
import { 
  Building2, TrendingUp, Users, Award, MapPin, Phone, Mail, 
  Calendar, CheckCircle, Star, Target, Eye, Heart, ArrowRight,
  Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TEAM_MEMBERS = [
  { name: 'Abebe Kebede', role: 'CEO & Founder', avatar: 'AK' },
  { name: 'Marta Yohannes', role: 'Head of Sales', avatar: 'MY' },
  { name: 'Dawit Tadesse', role: 'Head of Technology', avatar: 'DT' },
  { name: 'Hana Solomon', role: 'Marketing Director', avatar: 'HS' },
];

const STATS = [
  { label: 'Properties Listed', value: '12,400+', icon: Building2 },
  { label: 'Happy Clients', value: '8,900+', icon: Users },
  { label: 'Cities Covered', value: '45+', icon: MapPin },
  { label: 'Expert Agents', value: '1,230+', icon: Award },
];

const VALUES = [
  { icon: Target, title: 'Our Mission', desc: 'To make real estate transactions in Ethiopia transparent, efficient, and accessible to everyone through innovative technology and expert local knowledge.' },
  { icon: Eye, title: 'Our Vision', desc: 'To be Ethiopia\'s most trusted and innovative real estate platform, connecting people with their dream properties across the nation.' },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="gradient-gold text-gold-foreground mb-5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest shadow-gold">
            About HabeshaHomes
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Ethiopia's #1 Real Estate Platform
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform how Ethiopians buy, sell, and rent properties through cutting-edge technology and unparalleled local expertise.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 -mt-10">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl border border-border shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-display font-bold text-3xl text-foreground mb-1">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Our Story</Badge>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Founded with a Vision to Transform Real Estate
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                HabeshaHomes was born out of a simple observation: finding the right property in Ethiopia was unnecessarily difficult. Fragmented listings, lack of transparency, and outdated processes made the journey frustrating for everyone involved.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In 2018, our founders set out to change this. They envisioned a platform that combines deep local market knowledge with modern technology to create a seamless, trustworthy real estate experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to be Ethiopia's leading real estate platform, helping thousands of people find their dream homes while empowering agents with powerful tools to grow their businesses.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-foreground">Licensed & Regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-foreground">Verified Listings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium text-foreground">Expert Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="gradient-hero rounded-2xl p-6 aspect-square flex flex-col justify-center text-primary-foreground">
                    <Star className="w-10 h-10 mb-4" />
                    <p className="font-display font-bold text-4xl mb-2">4.8/5</p>
                    <p className="text-sm opacity-80">Average Customer Rating</p>
                  </div>
                  <div className="bg-muted rounded-2xl p-6 aspect-square flex flex-col justify-center">
                    <Heart className="w-10 h-10 text-red-500 mb-4" />
                    <p className="font-display font-bold text-4xl text-foreground mb-2">89%</p>
                    <p className="text-sm text-muted-foreground">Successful Transactions</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-muted rounded-2xl p-6 aspect-square flex flex-col justify-center">
                    <Building2 className="w-10 h-10 text-primary mb-4" />
                    <p className="font-display font-bold text-4xl text-foreground mb-2">12K+</p>
                    <p className="text-sm text-muted-foreground">Properties Listed</p>
                  </div>
                  <div className="gradient-gold rounded-2xl p-6 aspect-square flex flex-col justify-center text-gold-foreground">
                    <Users className="w-10 h-10 mb-4" />
                    <p className="font-display font-bold text-4xl mb-2">8.9K+</p>
                    <p className="text-sm opacity-80">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-6 shadow-md">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Why HabeshaHomes</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">The Smart Choice</h2>
            <p className="text-muted-foreground max-w-md mx-auto">We combine technology with local expertise to deliver the best real estate experience in Ethiopia.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Verified Properties', desc: 'Every listing is checked for authenticity and accuracy by our team.' },
              { icon: TrendingUp, title: 'Market Insights', desc: 'AI-powered price estimates and comprehensive market analysis.' },
              { icon: Users, title: 'Expert Agents', desc: 'Connect with licensed, experienced professionals you can trust.' },
              { icon: Building2, title: 'Wide Coverage', desc: 'From Addis Ababa to all regions, we cover properties across Ethiopia.' },
              { icon: Award, title: 'Award Winning', desc: 'Recognized as Ethiopia\'s most innovative real estate platform.' },
              { icon: Phone, title: 'Dedicated Support', desc: 'Our team is here to guide you through every step of the process.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">Leadership</Badge>
            <h2 className="font-display text-4xl font-bold text-foreground mb-3">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Experienced professionals dedicated to transforming Ethiopian real estate.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="bg-card rounded-xl border border-border overflow-hidden text-center group">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-2xl">
                    {member.avatar}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-foreground mb-1">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-lg">
                Join thousands of satisfied clients who found their dream home through HabeshaHomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="gradient-gold text-gold-foreground font-semibold px-10 shadow-gold hover:opacity-90"
                  onClick={() => navigate('/properties')}
                >
                  Browse Properties <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => navigate('/agents')}
                >
                  Find an Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Call Us</h4>
                <p className="text-sm text-muted-foreground">+251 91 234 5678</p>
              </div>
              <div>
                <Mail className="w-6 h-6 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Email Us</h4>
                <p className="text-sm text-muted-foreground">info@habeshahomes.et</p>
              </div>
              <div>
                <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Visit Us</h4>
                <p className="text-sm text-muted-foreground">Bole Road, Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Missing icon component
function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
