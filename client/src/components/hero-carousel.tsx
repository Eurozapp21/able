import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: banners = [] } = useQuery({
    queryKey: ['/api/banners'],
  });

  const totalSlides = banners.length || 3; // Fallback to 3 for default slides

  const defaultSlides = [
    {
      title: "Rehabilitation Equipment & Solutions for All",
      subtitle: "Your ability to dream!",
      image: "/attached_assets/Modern Investment Mobile App Promotion_1751991371433.png",
      link: "/contact"
    },
    {
      title: "Summer 2025 Collection", 
      subtitle: "Advanced Mobility Solutions",
      image: "/attached_assets/Blue Modern Investment Mobile App Promotion_1751991371437.png",
      link: "/products"
    },
    {
      title: "Rehabilitation Equipment & Solutions for All",
      subtitle: "Either we know the way or we find a way.",
      image: "/attached_assets/Modern Investment Mobile App Promotion_1751991371433.png", 
      link: "/contact"
    }
  ];

  const slides = banners.length > 0 ? banners : defaultSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative">
      <div className="relative overflow-hidden h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Carousel Inner */}
        <div className="relative h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                <div className="container mx-auto px-4 pb-20">
                  <div className="max-w-3xl text-white carousel-caption">
                    <h1 className="h1font mb-4">
                      {slide.title}
                    </h1>
                    <p className="pfont mb-8">
                      {slide.subtitle}
                    </p>
                    <Link href={slide.link || '/contact'}>
                      <button className="btn-customslider">Contact Us</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`carousel-indicators w-4 h-4 rounded-full shadow-lg transition-all ${
                index === currentSlide
                  ? 'bg-primary-gold active'
                  : 'bg-white bg-opacity-50'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
