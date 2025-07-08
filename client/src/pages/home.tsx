import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
// Icons are now inline SVG - removed unused imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HeroCarousel from '@/components/hero-carousel';




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
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="18.5" cy="17.5" r="3.5"/>
                        <circle cx="5.5" cy="17.5" r="3.5"/>
                        <circle cx="15" cy="5" r="1"/>
                        <path d="m14 17 1.5-1.5L21 17"/>
                        <path d="m10 17 1.5-1.5L17 17"/>
                        <path d="m7 17 4.5-4.5L17 17"/>
                        <path d="m17 17-1.5-1.5L12 17"/>
                        <path d="M14 5h2l3 5.5"/>
                        <path d="m5 17 6-6"/>
                        <path d="M12 6.5L15 5"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Bikes</span>
                  </div>
                </Link>

                <Link href="/products?category=pressure-care" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M2 4v16"/>
                        <path d="M2 8h18a2 2 0 0 1 2 2v10"/>
                        <path d="M2 17h20"/>
                        <path d="M6 8v9"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Pressure Care Aids</span>
                  </div>
                </Link>

                <Link href="/products?category=vehicle-adaptation" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.7 9c-.2-.6-.8-1-1.5-1h-5.4c-.7 0-1.3.4-1.5 1L8.5 11.1C7.7 11.3 7 12.1 7 13v3c0 .6.4 1 1 1h2"/>
                        <circle cx="7" cy="17" r="2"/>
                        <path d="M9 17h6"/>
                        <circle cx="17" cy="17" r="2"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Vehicle Adaptation</span>
                  </div>
                </Link>

                <Link href="/products?category=bath-toilet" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                        <line x1="10" x2="8" y1="5" y2="7"/>
                        <line x1="2" x2="22" y1="12" y2="12"/>
                        <line x1="7" x2="7" y1="19" y2="21"/>
                        <line x1="17" x2="17" y1="19" y2="21"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Bath and Toilet Aids</span>
                  </div>
                </Link>

                <Link href="/products?category=seat-systems" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/>
                        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                        <path d="M4 18v2"/>
                        <path d="M20 18v2"/>
                        <path d="M12 4v5"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Seat Systems</span>
                  </div>
                </Link>

                <Link href="/products?category=wheelchairs" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M3 3v18h18"/>
                        <path d="m7 12 4 4 4-4"/>
                        <path d="M17 8v4"/>
                        <circle cx="12" cy="16" r="1"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Wheelchairs</span>
                  </div>
                </Link>

                <Link href="/products?category=rehabilitation-equipment" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Rehabilitation Equipment</span>
                  </div>
                </Link>

                <Link href="/products?category=sensory-integration" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="6"/>
                        <circle cx="12" cy="12" r="2"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Sensory Integration Rooms</span>
                  </div>
                </Link>

                <Link href="/products?category=multi-sensory" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Multi Sensory Rooms</span>
                  </div>
                </Link>

                <Link href="/products?category=lifting-systems" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Lifting Systems</span>
                  </div>
                </Link>

                <Link href="/products?category=life-golf" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 12h8"/>
                        <path d="M12 8v8"/>
                      </svg>
                    </div>
                    <span className="font-medium text-text-dark group-hover:text-primary-gold transition-colors">Life Golf</span>
                  </div>
                </Link>

                <Link href="/products?category=rehab-pushchairs" className="group">
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-bg-yellow-light">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0" style={{backgroundColor: '#ffeb3b'}}>
                      <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
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

            {/* Right Column - Enhanced Product Showcase */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-text-dark mb-2">Our Equipment Range</h3>
                  <p className="text-text-gray text-sm">Professional rehabilitation solutions for enhanced mobility and independence</p>
                </div>
                
                {/* Main Image */}
                <div className="relative">
                  <img
                    src="/attached_assets/1599058641products_home_1751993768399.jpg"
                    alt="Rehabilitation Equipment"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-text-dark mb-1">Advanced Technology</h4>
                      <p className="text-sm text-text-gray">Cutting-edge rehabilitation equipment designed for optimal patient outcomes</p>
                    </div>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#ffeb3b'}}></div>
                    <span className="text-sm text-text-gray">Quality certified equipment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#ffeb3b'}}></div>
                    <span className="text-sm text-text-gray">Professional training & support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: '#ffeb3b'}}></div>
                    <span className="text-sm text-text-gray">Comprehensive warranty</span>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="p-6 pt-0">
                  <Link href="/products">
                    <Button className="w-full bg-primary-gold hover:bg-primary-gold/90 text-white font-medium py-3 rounded-lg transition-all">
                      Explore All Products
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Feature - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Video Player */}
            <div className="relative">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/api/placeholder/800/450"
                  alt="HUR Spinal Cord Rehabilitation Equipment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg">
                    <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
                
                {/* Video Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch Demo</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="bg-primary-gold text-white px-4 py-2 rounded-full text-sm font-medium">
                    Featured Equipment
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-dark leading-tight">
                  HUR - Spinal Cord and Neurological Rehabilitation
                </h2>
              </div>
              
              <p className="text-lg text-text-gray leading-relaxed">
                In an inclusive wellness facility, it is easy to get on and off machines. The machines can be
                used safely and independently by as many different users as possible, regardless of ability,
                while in between machines there is ample room to manoeuvre with various mobility aids.
                HUR equipment is designed in accordance with current requirements for accessibility.
              </p>
              
              {/* Key Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-secondary-green flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Accessible Design</h4>
                    <p className="text-sm text-text-gray">Easy access for all ability levels</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-secondary-green flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Safe Operation</h4>
                    <p className="text-sm text-text-gray">Independent use with confidence</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-secondary-green flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Mobility Friendly</h4>
                    <p className="text-sm text-text-gray">Ample space for mobility aids</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-secondary-green flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Compliance</h4>
                    <p className="text-sm text-text-gray">Meets accessibility standards</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/events/1">
                  <Button className="bg-secondary-green hover:bg-secondary-green-dark text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg">
                    Read more
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-2 border-secondary-green text-secondary-green hover:bg-secondary-green hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300">
                    Get Quote
                  </Button>
                </Link>
              </div>
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
