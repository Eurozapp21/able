import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  categoryId?: number;
  featured?: boolean;
  searchQuery?: string;
  limit?: number;
}

export default function ProductGrid({ 
  categoryId, 
  featured = false, 
  searchQuery, 
  limit 
}: ProductGridProps) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products', { categoryId, featured, search: searchQuery }],
  });

  const displayProducts = limit ? products.slice(0, limit) : products;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover-lift group">
          <div className="relative overflow-hidden">
            <img
              src={product.images?.[0] || '/api/placeholder/400/300'}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Link href={`/products/detail/${product.id}`}>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  More Info
                </Button>
              </Link>
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="text-sm text-gray-custom">
                  {product.description}
                </CardDescription>
              </div>
              {product.isFeatured && (
                <Badge className="bg-yellow-400 text-black">
                  Featured
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <Link href={`/products/detail/${product.id}`}>
              <Button variant="outline" className="w-full border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
