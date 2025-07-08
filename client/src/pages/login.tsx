import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();

  // Get redirect URL from query params
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTo = urlParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      setLocation(redirectTo);
    }
  }, [isAuthenticated, redirectTo, setLocation]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      setLocation(redirectTo);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="fontsearch">
                  <LogIn className="w-6 h-6" />
                </div>
              </div>
              <CardTitle className="text-2xl text-text-dark">Welcome Back</CardTitle>
              <p className="text-gray-custom">Sign in to your AbleTools account</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...form.register('username')}
                    className="mt-1"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  {form.formState.errors.username && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      {...form.register('password')}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="btn-cardbutn w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-custom">
                  Don't have an account?{' '}
                  <Link href={`/register${redirectTo !== '/dashboard' ? `?redirect=${redirectTo}` : ''}`}>
                    <a className="text-primary-gold hover:underline font-medium">
                      Create account
                    </a>
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-light">
                <div className="text-center">
                  <p className="text-sm text-gray-custom mb-4">
                    Having trouble accessing your account?
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="hover-gold">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo Account Info */}
          <Card className="mt-6 euz_bgyelo">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold text-text-dark mb-2">Demo Account</h3>
              <p className="text-sm text-gray-custom mb-3">
                Use these credentials to explore the system:
              </p>
              <div className="text-sm space-y-1">
                <p><strong>Username:</strong> demo</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
