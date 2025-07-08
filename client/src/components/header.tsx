import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/lib/auth';

export default function Header() {
  const [location] = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Education', href: '/seminars' },
    { name: 'Newsroom', href: '/events' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-light fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img 
              src="/attached_assets/1600154678logo1_1751991035400.png" 
              alt="AbleTools Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`anavelink font-medium cursor-pointer text-gray-700 hover:text-primary-gold transition-colors ${
                  location === item.href ? 'text-primary-gold border-b-2 border-primary-gold' : ''
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
          
          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-custom hover:text-primary-gold"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-gray-custom hover:text-primary-gold">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/enquiry">
                  <Button variant="ghost" size="sm" className="text-gray-custom hover:text-primary-gold">
                    Enquiries
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-gray-custom hover:text-primary-gold"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="text-gray-custom hover:text-primary-gold">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span className="text-lg font-medium text-gray-custom hover:text-primary-gold transition-colors cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  {user ? (
                    <>
                      <Link href="/dashboard">
                        <span className="text-lg font-medium text-gray-custom hover:text-primary-gold transition-colors cursor-pointer">
                          Dashboard
                        </span>
                      </Link>
                      <Link href="/enquiry">
                        <span className="text-lg font-medium text-gray-custom hover:text-primary-gold transition-colors cursor-pointer">
                          Enquiries
                        </span>
                      </Link>
                      <Button 
                        variant="ghost" 
                        onClick={handleLogout}
                        className="justify-start p-0 text-lg font-medium text-gray-custom hover:text-primary-gold"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/login">
                      <span className="text-lg font-medium text-gray-custom hover:text-primary-gold transition-colors cursor-pointer">
                        Login
                      </span>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Search Bar */}
        {showSearch && (
          <div className="bg-gray-100 border-t border-light py-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="flex">
                <Input
                  type="text"
                  placeholder="Search Products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 rounded-r-none focus:ring-2 focus:ring-primary"
                />
                <Button 
                  type="submit" 
                  className="btn-cardbutn rounded-l-none"
                >
                  Search
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
