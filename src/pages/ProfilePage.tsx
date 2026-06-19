import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Camera, Save, Trash2, Eye, EyeOff, Shield, Bell, Globe, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    avatar: profile?.avatar_url || '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPasswords, setShowPasswords] = useState(false);

  const handleSaveProfile = async () => {
    // In real app, call updateProfile API
    toast({ title: 'Profile updated', description: 'Your changes have been saved successfully.' });
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    if (passwords.new.length < 8) {
      toast({ title: 'Password too short', description: 'Password must be at least 8 characters.', variant: 'destructive' });
      return;
    }
    // In real app, call change password API
    toast({ title: 'Password changed', description: 'Your password has been updated successfully.' });
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="gradient-hero py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            My Profile
          </h1>
          <p className="text-primary-foreground/70">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-3 gap-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-semibold text-foreground text-lg mb-1">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Update your personal details and contact information.</p>
              </div>

              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.avatar} />
                  <AvatarFallback className="gradient-hero text-primary-foreground text-2xl font-semibold">
                    {formData.fullName.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    <Camera className="w-4 h-4 mr-2" /> Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Abebe Girma"
                      value={formData.fullName}
                      onChange={(e) => setFormData(f => ({ ...f, fullName: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="+251 91 234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData(f => ({ ...f, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">Account Type</Label>
                  <div className="mt-1.5">
                    <Input id="role" value="Buyer / Renter" disabled className="bg-muted" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveProfile} className="gradient-hero text-primary-foreground">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
                <Button variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Change Password */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-semibold text-foreground text-lg mb-1">Change Password</h2>
                  <p className="text-sm text-muted-foreground">Update your password to keep your account secure.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative mt-1.5">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="currentPassword"
                        type={showPasswords ? 'text' : 'password'}
                        placeholder="Enter current password"
                        value={passwords.current}
                        onChange={(e) => setPasswords(p => ({ ...p, current: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative mt-1.5">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type={showPasswords ? 'text' : 'password'}
                        placeholder="At least 8 characters"
                        value={passwords.new}
                        onChange={(e) => setPasswords(p => ({ ...p, new: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <div className="relative mt-1.5">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPasswords ? 'text' : 'password'}
                        placeholder="Re-enter new password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      id="showPasswords"
                      checked={showPasswords}
                      onCheckedChange={setShowPasswords}
                    />
                    <Label htmlFor="showPasswords" className="text-sm cursor-pointer">
                      Show passwords
                    </Label>
                  </div>

                  <Button onClick={handleChangePassword} className="gradient-hero text-primary-foreground">
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-semibold text-foreground text-lg mb-1">Two-Factor Authentication</h2>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm text-foreground">SMS Authentication</p>
                      <p className="text-xs text-muted-foreground">Get a code via SMS when you sign in</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Delete Account */}
              <div className="bg-card rounded-xl border border-destructive/30 p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="font-semibold text-destructive text-lg mb-1">Delete Account</h2>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
                </div>

                <Button variant="destructive" className="gap-2">
                  <Trash2 className="w-4 h-4" /> Delete My Account
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-6">
              <div>
                <h2 className="font-semibold text-foreground text-lg mb-1">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Choose how and when you want to receive notifications.</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Bell, label: 'New Property Alerts', desc: 'Get notified when new properties match your criteria' },
                  { icon: Mail, label: 'Email Newsletter', desc: 'Receive weekly updates about market trends and featured properties' },
                  { icon: Phone, label: 'SMS Updates', desc: 'Get important updates via SMS' },
                  { icon: Eye, label: 'Price Drop Alerts', desc: 'Be the first to know when prices drop on saved properties' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button className="gradient-hero text-primary-foreground">
                  <Save className="w-4 h-4 mr-2" /> Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
