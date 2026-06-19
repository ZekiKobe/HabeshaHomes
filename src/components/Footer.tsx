import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gold-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg leading-none">Habesha</span>
                <span className="font-display font-bold text-lg text-gold leading-none">Homes</span>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed mb-6">
              Ethiopia's premier real estate platform. Discover, buy, rent and manage properties across all regions.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold/20 hover:text-gold transition-colors flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Properties for Sale', 'Properties for Rent', 'New Listings', 'Featured Properties', 'Agents Directory', 'About Us'].map(item => (
                <li key={item}>
                  <Link to="/properties" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h3 className="font-semibold mb-4">Top Regions</h3>
            <ul className="space-y-2">
              {['Addis Ababa', 'Oromia', 'Amhara', 'Tigray', 'SNNPR', 'Dire Dawa', 'Harar', 'Afar'].map(item => (
                <li key={item}>
                  <Link to="/properties" className="text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/70">Bole Road, Addis Ababa, Ethiopia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm text-primary-foreground/70">+251 91 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span className="text-sm text-primary-foreground/70">info@habeshahomes.et</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2025 HabeshaHomes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link key={item} to="#" className="text-xs text-primary-foreground/50 hover:text-gold transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
