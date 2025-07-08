import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductGrid from './product-grid';

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark">Featured Products</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full bg-gray-200 hover-gold transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="p-2 rounded-full bg-gray-200 hover-gold transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ProductGrid featured={true} limit={3} />
      </div>
    </section>
  );
}
