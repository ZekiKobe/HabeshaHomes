import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Building2, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import heroBg from '@/assets/hero-bg.jpg';

const FEATURES = [
  'Search thousands of verified properties',
  'Save favorites & compare listings',
  'Contact agents directly',
  'Get AI-powered recommendations',
  'Schedule property visits',
];

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' as 'buyer' | 'agent',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(loginForm.email, loginForm.password);
    setLoading(false);
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome back!', description: 'You have successfully signed in.' });
      navigate('/');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await signUp(signupForm.email, signupForm.password, signupForm.fullName, signupForm.role);
    setLoading(false);
    if (error) {
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Account created!', description: 'Please check your email to verify your account.' });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Hero */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/85" />
        <div className="relative z-10">
          <button
            className="flex items-center gap-2 mb-12"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center shadow-gold">
              <Building2 className="w-5 h-5 text-gold-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-primary-foreground leading-none">Habesha</span>
              <span className="font-display font-bold text-xl text-gold leading-none">Homes</span>
            </div>
          </button>

          <h2 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Ethiopia's #1<br />Real Estate Platform
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed mb-8 max-w-sm">
            Join thousands of satisfied buyers, renters, and agents discovering their perfect properties.
          </p>
          <div className="space-y-3">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                <p className="text-primary-foreground/90 text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 glass rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center font-display font-bold text-gold-foreground text-lg shrink-0">A</div>
            <div>
              <p className="text-primary-foreground font-medium text-sm">"Found my dream home in 2 weeks!"</p>
              <p className="text-primary-foreground/60 text-xs">Alemnesh T. – Addis Ababa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Auth form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shadow-md">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-xl leading-none">Habesha</span>
              <span className="font-display font-bold text-xl text-gold leading-none">Homes</span>
            </div>
          </div>

          <Tabs defaultValue="login">
            <TabsList className="w-full mb-8">
              <TabsTrigger value="login" className="flex-1">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">Create Account</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome back</h1>
                <p className="text-muted-foreground">Sign in to access your account</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1.5"
                    value={loginForm.email}
                    onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                    <button type="button" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative mt-1.5">
                    <Input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-hero text-primary-foreground hover:opacity-90 mt-2"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Sign In
                </Button>
              </form>

              {/* Demo accounts */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground mb-2">Demo Accounts:</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Admin', email: 'admin@demo.com' },
                    { label: 'Agent', email: 'agent@demo.com' },
                    { label: 'Buyer', email: 'buyer@demo.com' },
                  ].map(({ label, email }) => (
                    <button
                      key={label}
                      className="text-[10px] text-center bg-background hover:bg-accent rounded-lg p-2 border border-border transition-colors"
                      onClick={() => setLoginForm({ email, password: 'demo1234' })}
                    >
                      <Badge variant="secondary" className="text-[10px] mb-1">{label}</Badge>
                      <p className="text-muted-foreground truncate">{email}</p>
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Signup */}
            <TabsContent value="signup">
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create account</h1>
                <p className="text-muted-foreground">Start finding your dream property today</p>
              </div>
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">I am a</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    {(['buyer', 'agent'] as const).map(r => (
                      <button
                        key={r}
                        type="button"
                        className={`p-3 rounded-lg border-2 text-sm font-medium capitalize transition-all ${
                          signupForm.role === r
                            ? 'border-primary bg-accent text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/40'
                        }`}
                        onClick={() => setSignupForm(f => ({ ...f, role: r }))}
                      >
                        {r === 'buyer' ? '🏠 Buyer / Renter' : '🏢 Real Estate Agent'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <Input
                    placeholder="Abebe Girma"
                    className="mt-1.5"
                    value={signupForm.fullName}
                    onChange={e => setSignupForm(f => ({ ...f, fullName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1.5"
                    value={signupForm.email}
                    onChange={e => setSignupForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Password</Label>
                  <div className="relative mt-1.5">
                    <Input
                      type={showPass ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      value={signupForm.password}
                      onChange={e => setSignupForm(f => ({ ...f, password: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="mt-1.5"
                    value={signupForm.confirmPassword}
                    onChange={e => setSignupForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gradient-hero text-primary-foreground hover:opacity-90 mt-2"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Create Account
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By signing up, you agree to our{' '}
                  <button className="underline hover:text-foreground">Terms of Service</button> and{' '}
                  <button className="underline hover:text-foreground">Privacy Policy</button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
