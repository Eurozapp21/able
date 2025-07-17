import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function CookieNotice() {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookies-accepted');
    
    if (!hasAcceptedCookies) {
      // Show notice after a short delay
      const timer = setTimeout(() => {
        setShowNotice(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowNotice(false);
  };

  const dismissNotice = () => {
    setShowNotice(false);
  };

  if (!showNotice) {
    return null;
  }

  return (
    <div className="cookie-notice">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            This site uses cookies to provide you with a personalised browsing experience. 
            By using this site you agree to our Privacy Policy and the use of cookies as explained therein.{' '}
            <a 
              href="/privacy" 
              className="text-primary-gold hover:underline font-medium"
            >
              Find out more.
            </a>
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={acceptCookies}
            className="btn-cardbutn whitespace-nowrap"
          >
            Accept All Cookies
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={dismissNotice}
            className="text-white hover:text-primary-gold flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
