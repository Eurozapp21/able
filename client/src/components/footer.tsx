import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/newsletter', { 
        email, 
        consent: true 
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Successfully subscribed to newsletter",
      });
      setEmail('');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe to newsletter",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">YOUR ABILITY TO DREAM!</h2>
            <p className="text-lg mb-8">Stay updated with our latest products and healthcare solutions</p>
            
            <div className="max-w-md mx-auto">
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-r-none border-0 focus:ring-2 focus:ring-white"
                  required
                />
                <Button 
                  type="submit" 
                  className="btn-customlogin rounded-l-none"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              <p className="text-sm mt-2">
                <Link href="/newsletter-consent">
                  <a className="underline hover:no-underline">Newsletter Consent</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Information</h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +357 22 250 115
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +357 22 250 116
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@abletools.com.cy
                </p>
              </div>
            </div>
            
            {/* Address */}
            <div>
              <h3 className="font-bold text-lg mb-4">Address</h3>
              <div className="text-gray-300">
                <p>Strovolos Avenue 149K</p>
                <p>Strovolos, Nicosia, 2048</p>
                <p>Cyprus</p>
              </div>
            </div>
            
            {/* Information Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Information</h3>
              <div className="space-y-2">
                <Link href="/about">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">About Us</a>
                </Link>
                <Link href="/seminars">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">Education</a>
                </Link>
                <Link href="/events">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">Newsroom</a>
                </Link>
                <Link href="/products">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">Products</a>
                </Link>
                <Link href="/contact">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">Contact Us</a>
                </Link>
                <Link href="/privacy">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">Privacy Notice</a>
                </Link>
                <Link href="/terms">
                  <a className="block text-gray-300 hover:text-primary-gold transition-colors">Terms and Conditions</a>
                </Link>
              </div>
            </div>
            
            {/* Follow Us */}
            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-primary-gold transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary-gold transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary-gold transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-primary-gold transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">Copyrights © AbleTools 2025. All Rights Reserved.</p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              Powered by <a href="https://eurozapp.com/" className="text-primary-gold hover:underline">Eurozapp</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
