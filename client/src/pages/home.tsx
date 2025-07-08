import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { 
  Accessibility, 
  Battery, 
  Bed, 
  Brain, 
  SlidersVertical, 
  Footprints,
  UserCheck,
  Bike,
  Car,
  Bath,
  Baby,
  HelpingHand
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HeroCarousel from '@/components/hero-carousel';


const categoryIcons = {
  wheelchair: Accessibility,
  'battery-full': Battery,
  bed: Bed,
  brain: Brain,
  stairs: SlidersVertical,
  walking: Footprints,
  'user-check': UserCheck,
  bicycle: Bike,
  'hands-helping': HelpingHand,
  car: Car,
  bath: Bath,
  'baby-carriage': Baby,
};

export default function Home() {
  const { data: categories = [] } = useQuery({
    queryKey: ['/api/categories', { parentId: null }],
  });

  const { data: seminars = [] } = useQuery({
    queryKey: ['/api/seminars', { upcoming: true }],
  });

  const { data: events = [] } = useQuery({
    queryKey: ['/api/events', { recent: true }],
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ['/api/achievements'],
  });

  return (
    <div className="pt-20">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-7 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">About Us</h2>
              <p className="text-gray-custom text-lg leading-relaxed mb-6">
                Able Tools Ltd has been operating since 2006 in the field of rehabilitation equipment and new technology solutions for people in need. Our focus is the customer's experience and our vision is to achieve a high-quality life and independency for every user's daily routine.
              </p>
              <Link href="/about">
                <Button className="btn-customslider">Read more</Button>
              </Link>
            </div>
            
            {/* Right Column - Image and Icons */}
            <div className="lg:col-span-3 space-y-6">
              {/* Company Logo */}
              <div className="flex justify-center">
                <img
                  src="/attached_assets/1599038152about_us_home_1751993313592.jpg"
                  alt="Your ability to dream!"
                  className="max-w-full h-auto"
                />
              </div>
              
              {/* Service Icons */}
              <div className="grid grid-cols-3 gap-4">
                <Link href="/products">
                  <div className="text-center group cursor-pointer euz_bg_grey p-4 rounded-lg hover:bg-bg-yellow-light transition-all">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8" style={{fill: '#ffeb3b'}} viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-sm text-text-dark group-hover:text-primary-gold transition-colors">
                      Products
                    </h3>
                  </div>
                </Link>
                <Link href="/events">
                  <div className="text-center group cursor-pointer euz_bg_grey p-4 rounded-lg hover:bg-bg-yellow-light transition-all">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8" style={{fill: '#ffeb3b'}} viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-sm text-text-dark group-hover:text-primary-gold transition-colors">
                      Newsroom
                    </h3>
                  </div>
                </Link>
                <Link href="/seminars">
                  <div className="text-center group cursor-pointer euz_bg_grey p-4 rounded-lg hover:bg-bg-yellow-light transition-all">
                    <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8" style={{fill: '#ffeb3b'}} viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-sm text-text-dark group-hover:text-primary-gold transition-colors">
                      Education
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Product Categories */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-dark">Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Items */}
                <Link href="/products?category=bikes" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 2.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-8-2.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4-7.5l-1.5-1.5H9v2h1.5l1.5 1.5z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Bikes</span>
                  </div>
                </Link>

                <Link href="/products?category=pressure-care" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2,3H22V21H2V3M20,19V5H4V19H20M15,7H21V13H15V7M16,8V12H20V8H16M3,7H13V9H3V7M3,15H13V17H3V15M3,11H13V13H3V11Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Pressure Care Aids</span>
                  </div>
                </Link>

                <Link href="/products?category=vehicle-adaptation" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5H15V4A2,2 0 0,0 13,2H11A2,2 0 0,0 9,4V5H6.5C5.84,5 5.28,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M6.5,7H17.5L19,11H5L6.5,7M11,4H13V5H11V4M7.5,16A1.5,1.5 0 0,1 6,14.5A1.5,1.5 0 0,1 7.5,13A1.5,1.5 0 0,1 9,14.5A1.5,1.5 0 0,1 7.5,16M16.5,16A1.5,1.5 0 0,1 15,14.5A1.5,1.5 0 0,1 16.5,13A1.5,1.5 0 0,1 18,14.5A1.5,1.5 0 0,1 16.5,16Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Vehicle Adaptation</span>
                  </div>
                </Link>

                <Link href="/products?category=bath-toilet" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9,2V8H7V10H9V11A6,6 0 0,0 3,17A6,6 0 0,0 9,23A6,6 0 0,0 15,17A6,6 0 0,0 9,11V10H11V8H9V6H13V4H9V2M9,12A5,5 0 0,1 14,17A5,5 0 0,1 9,22A5,5 0 0,1 4,17A5,5 0 0,1 9,12M18,14V20H20V14H18M16,16V20H18V16H16M22,12V20H24V12H22Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Bath and Toilet Aids</span>
                  </div>
                </Link>

                <Link href="/products?category=seat-systems" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7,11H17V13H7V11M5,6H19A2,2 0 0,1 21,8V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V8A2,2 0 0,1 5,6M5,8V19H19V8H5Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Seat Systems</span>
                  </div>
                </Link>

                <Link href="/products?category=wheelchairs" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Wheelchairs</span>
                  </div>
                </Link>

                <Link href="/products?category=rehabilitation-equipment" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Rehabilitation Equipment</span>
                  </div>
                </Link>

                <Link href="/products?category=sensory-integration" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Sensory Integration Rooms</span>
                  </div>
                </Link>

                <Link href="/products?category=multi-sensory" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M9.5,8A1.5,1.5 0 0,0 8,9.5A1.5,1.5 0 0,0 9.5,11A1.5,1.5 0 0,0 11,9.5A1.5,1.5 0 0,0 9.5,8M14.5,8A1.5,1.5 0 0,0 13,9.5A1.5,1.5 0 0,0 14.5,11A1.5,1.5 0 0,0 16,9.5A1.5,1.5 0 0,0 14.5,8M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.27 12,15.27C13.25,15.27 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Multi Sensory Rooms</span>
                  </div>
                </Link>

                <Link href="/products?category=lifting-systems" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A2,2 0 0,1 14,4V8.5A2.5,2.5 0 0,1 11.5,11H11V14L16,17V21H8V17L13,14V11H12.5A2.5,2.5 0 0,1 10,8.5V4A2,2 0 0,1 12,2M12,4V8.5A0.5,0.5 0 0,0 12.5,9H11.5A0.5,0.5 0 0,0 12,8.5V4M9,10H15V12H9V10M9,12H15V14H9V12Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Lifting Systems</span>
                  </div>
                </Link>

                <Link href="/products?category=life-golf" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4M12,6C9.79,6 8,7.79 8,10C8,12.21 9.79,14 12,14C14.21,14 16,12.21 16,10C16,7.79 14.21,6 12,6M12,8C13.1,8 14,8.9 14,10C14,11.1 13.1,12 12,12C10.9,12 10,11.1 10,10C10,8.9 10.9,8 12,8Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Life Golf</span>
                  </div>
                </Link>

                <Link href="/products?category=rehab-pushchairs" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full bg-primary-gold flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22,16A6,6 0 0,1 16,22A6,6 0 0,1 10,16A6,6 0 0,1 16,10A6,6 0 0,1 22,16M20,16A4,4 0 0,0 16,12A4,4 0 0,0 12,16A4,4 0 0,0 16,20A4,4 0 0,0 20,16M6,16A6,6 0 0,1 12,10V8A8,8 0 0,0 4,16A8,8 0 0,0 12,24V22A6,6 0 0,1 6,16M18,11.74A2.67,2.67 0 0,0 16.26,11.74A2.67,2.67 0 0,0 14.26,13.74A2.67,2.67 0 0,0 16.26,15.74A2.67,2.67 0 0,0 18,13.74A2.67,2.67 0 0,0 18,11.74Z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Rehab Pushchairs</span>
                  </div>
                </Link>
              </div>
              
              <div className="mt-8">
                <Link href="/products">
                  <Button className="btn-customslider">View More</Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Background Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/attached_assets/1599058641products_home_1751993768399.jpg"
                  alt="Rehabilitation Equipment"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Feature */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <img
                  src="/api/placeholder/800/450"
                  alt="HUR Spinal Cord Rehabilitation Equipment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-dark">
                HUR - Spinal Cord and Neurological Rehabilitation
              </h2>
              <p className="text-gray-custom text-lg leading-relaxed mb-6">
                In an inclusive wellness facility, it is easy to get on and off machines. The machines can be used safely and independently by as many different users as possible, regardless of ability, while in between machines there is ample room to manoeuvre with various mobility aids. HUR equipment is designed in accordance with current requirements for accessibility.
              </p>
              <Link href="/events/1">
                <Button className="btn-customlogin">Read more</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seminars and Training */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Seminars */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-dark">Upcoming Seminars</h2>
              <div className="space-y-4">
                {seminars.length > 0 ? (
                  seminars.slice(0, 3).map((seminar) => (
                    <Card key={seminar.id} className="euz_bgyelo">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={seminar.image || '/api/placeholder/80/80'}
                            alt={seminar.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <Badge className="bg-primary text-text-dark mb-2">
                              Upcoming Seminar
                            </Badge>
                            <h3 className="font-semibold text-lg mb-2">{seminar.title}</h3>
                            <p className="text-gray-custom text-sm mb-3">
                              {new Date(seminar.date).toLocaleDateString('en-GB')}
                            </p>
                            <Link href={`/seminars/${seminar.id}`}>
                              <Button className="btn-customlogin text-sm">More Info</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-custom">No upcoming seminars at the moment.</p>
                )}
              </div>
            </div>

            {/* Training/Events */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-dark">Recent Events</h2>
              <div className="space-y-4">
                {events.length > 0 ? (
                  events.slice(0, 3).map((event) => (
                    <Card key={event.id} className="euz_bgyelo">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={event.image || '/api/placeholder/80/80'}
                            alt={event.title}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                            <p className="text-gray-custom text-sm mb-3">
                              {new Date(event.date).toLocaleDateString('en-GB')}
                            </p>
                            <Link href={`/events/${event.id}`}>
                              <Button className="btn-customlogin text-sm">More info</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-custom">No recent events.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Our Achievements</h2>
            <p className="text-gray-custom text-lg">Assess and Treat - Making a difference since 2006</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-center">
                <div className="relative mb-4">
                  <img
                    src={achievement.image || '/api/placeholder/300/200'}
                    alt={achievement.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-text-dark">{achievement.title}</h3>
                <p className="text-gray-custom text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
