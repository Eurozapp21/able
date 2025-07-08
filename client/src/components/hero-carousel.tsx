import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';

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
      image: "/api/placeholder/1200/500",
      link: "/contact"
    },
    {
      title: "Rehabilitation Equipment & Solutions for All", 
      subtitle: "Changing Lives Together",
      image: "/api/placeholder/1200/500",
      link: "/contact"
    },
    {
      title: "Rehabilitation Equipment & Solutions for All",
      subtitle: "Either we know the way or we find a way.",
      image: "/api/placeholder/1200/500", 
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
      <div className="relative overflow-hidden">
        {/* Carousel Inner */}
        <div className="relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-item relative ${
                index === currentSlide ? 'block' : 'hidden'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 slide-up">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90 fade-in">
                    {slide.subtitle}
                  </p>
                  <Button
                    className="btn-cardbutn fade-in"
                    onClick={() => window.location.href = slide.link || '/contact'}
                  >
                    Contact Us
                  </Button>
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
