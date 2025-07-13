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
import { Eye, EyeOff, UserPlus } from 'lucide-react';

const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  occupation: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { register: registerUser, isAuthenticated } = useAuth();

  // Get redirect URL from query params
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTo = urlParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      setLocation(redirectTo);
    }
  }, [isAuthenticated, redirectTo, setLocation]);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      postcode: '',
      occupation: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...userData } = data;
      await registerUser(userData);
      toast({
        title: "Account Created!",
        description: "Welcome to AbleTools. Your account has been created successfully.",
      });
      setLocation(redirectTo);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="fontsearch">
                  <UserPlus className="w-6 h-6" />
                </div>
              </div>
              <CardTitle className="text-2xl text-text-dark">Create Account</CardTitle>
              <p className="text-gray-custom">Join AbleTools to access our full range of services</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-text-dark mb-4">Basic Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...form.register('firstName')}
                        className="mt-1"
                        placeholder="John"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...form.register('lastName')}
                        className="mt-1"
                        placeholder="Doe"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="text-lg font-semibold text-text-dark mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username *</Label>
                      <Input
                        id="username"
                        {...form.register('username')}
                        className="mt-1"
                        placeholder="johndoe"
                        autoComplete="username"
                      />
                      {form.formState.errors.username && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className="mt-1"
                        placeholder="john.doe@example.com"
                        autoComplete="email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password">Password *</Label>
                        <div className="relative mt-1">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...form.register('password')}
                            placeholder="Enter password"
                            autoComplete="new-password"
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
                      
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative mt-1">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...form.register('confirmPassword')}
                            placeholder="Confirm password"
                            autoComplete="new-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Eye className="w-4 h-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                        {form.formState.errors.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-text-dark mb-4">Additional Information (Optional)</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...form.register('phone')}
                          className="mt-1"
                          placeholder="+357 XX XXX XXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="occupation">Occupation</Label>
                        <Input
                          id="occupation"
                          {...form.register('occupation')}
                          className="mt-1"
                          placeholder="Healthcare Professional"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        {...form.register('address')}
                        className="mt-1"
                        placeholder="Street address"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          {...form.register('city')}
                          className="mt-1"
                          placeholder="Nicosia"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postal Code</Label>
                        <Input
                          id="postcode"
                          {...form.register('postcode')}
                          className="mt-1"
                          placeholder="2048"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="btn-cardbutn w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-custom">
                  Already have an account?{' '}
                  <Link href={`/login${redirectTo !== '/dashboard' ? `?redirect=${redirectTo}` : ''}`}>
                    <a className="text-primary-gold hover:underline font-medium">
                      Sign in
                    </a>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
