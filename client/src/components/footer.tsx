import { Link } from 'wouter';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Printer } from 'lucide-react';
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
                  className="bg-gray-600 hover:bg-gray-700 text-white rounded-l-none"
                  disabled={newsletterMutation.isPending}
                >
                  {newsletterMutation.isPending ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              <p className="text-sm mt-2">
                <Link href="/newsletter-consent">
                  <span className="underline hover:no-underline cursor-pointer">Newsletter Consent</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Address Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Address</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>Strovolos Avenue 149K, Strovolos, Nicosia, 2048, Cyprus</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>info@abletools.com.cy</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>+357 22 250 115</span>
                </div>
                <div className="flex items-center">
                  <Printer className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>+357 22 250 116</span>
                </div>
              </div>
            </div>
            
            {/* Information Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">Information</h4>
              <div className="grid grid-cols-1 gap-2 text-gray-300 text-sm">
                <div className="space-y-1">
                  <Link href="/about"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">About Us</span></Link>
                  <Link href="/events"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Education</span></Link>
                  <Link href="/events"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Events</span></Link>
                  <Link href="/products"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Products</span></Link>
                </div>
                <div className="space-y-1">
                  <Link href="/contact"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Contact Us</span></Link>
                  <Link href="/privacy"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Privacy Notice</span></Link>
                  <Link href="/terms"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Terms and Conditions</span></Link>
                  <Link href="/newsletter"><span className="block hover:text-yellow-400 transition-colors cursor-pointer">Newsletter Consent</span></Link>
                </div>
              </div>
            </div>
            
            {/* Newsletter Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 px-3 py-2 bg-white text-gray-900 rounded-l text-sm focus:outline-none border-0"
                />
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-r text-xs font-medium transition-colors whitespace-nowrap">
                  Newsletter
                </button>
              </div>
            </div>
            
            {/* Follow Us Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors">
                  <span className="text-xs font-bold">▶</span>
                </a>
                <a href="#" className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-500 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-500 mt-8 pt-6 flex justify-between items-center text-gray-300 text-sm">
            <p>Copyright © AbleTools 2025. All Rights Reserved.</p>
            <p>Powered by Euroepps</p>
          </div>
        </div>
      </footer>
    </>
  );
}
