import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import ProductGrid from './product-grid';

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/attached_assets/1599058641products_home_1751993768399.jpg')"
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <ProductGrid featured={true} limit={3} />
        
        <div className="text-center mt-8">
          <Link href="/products">
            <Button className="btn-customslider">View All Products</Button>
          </Link>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-primary-gold opacity-5 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-secondary-green opacity-5 rounded-full"></div>
    </section>
  );
}
