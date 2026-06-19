import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Globe, Bell, Shield, CreditCard, Trash2, Save, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const handleSave = () => {
    // In real app, save to backend
    console.log('Settings saved:', { darkMode, language, notifications });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Settings
          </h1>
          <p className="text-primary-foreground/70">Customize your HabeshaHomes experience</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Appearance */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize how HabeshaHomes looks for you.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-gold" />}
                <div>
                  <p className="font-medium text-sm text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>

        {/* Language & Region */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg">Language & Region</h2>
              <p className="text-sm text-muted-foreground">Set your preferred language and regional settings.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1.5 w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="am">አማርኛ (Amharic)</option>
                <option value="or">Afaan Oromoo</option>
                <option value="ti">ትግርኛ (Tigrinya)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                More languages coming soon!
              </p>
            </div>

            <div>
              <Label>Currency</Label>
              <div className="mt-1.5 p-3 rounded-lg border border-border bg-muted flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">ETB - Ethiopian Birr</span>
                <Badge variant="secondary" className="ml-auto text-xs">Default</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg">Notifications</h2>
              <p className="text-sm text-muted-foreground">Choose how you want to be notified.</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Get text messages for important updates' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser notifications for new properties' },
              { key: 'marketing', label: 'Marketing Emails', desc: 'Promotional content and special offers' },
            ].map(({ key, label, desc }) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key as keyof typeof notifications]}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-lg">Privacy & Security</h2>
              <p className="text-sm text-muted-foreground">Manage your privacy and security settings.</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile?tab=security')}>
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Settings
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-xl border border-destructive/30 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-semibold text-destructive text-lg">Danger Zone</h2>
              <p className="text-sm text-muted-foreground">Irreversible actions that will permanently affect your account.</p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="destructive" className="w-full">
              Delete My Account
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="gradient-hero text-primary-foreground gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
