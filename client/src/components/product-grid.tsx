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
  sortBy?: string;
  viewMode?: 'grid' | 'list';
}

export default function ProductGrid({ 
  categoryId, 
  featured = false, 
  searchQuery, 
  limit,
  sortBy = 'name',
  viewMode = 'grid'
}: ProductGridProps) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products', categoryId, featured, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryId) params.append('categoryId', categoryId.toString());
      if (featured) params.append('featured', 'true');
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  // Filter and sort products
  const filteredProducts = products.filter((product: any) => {
    if (!searchQuery) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      default:
        return 0;
    }
  });

  const displayProducts = limit ? sortedProducts.slice(0, limit) : sortedProducts;

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

  if (!displayProducts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {searchQuery ? `No products found matching "${searchQuery}".` : 'No products found.'}
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'list' 
    ? "space-y-4" 
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <div className={gridClasses}>
      {displayProducts.map((product) => (
        <Card key={product.id} className={`overflow-hidden hover-lift group ${
          viewMode === 'list' ? 'flex flex-row' : ''
        }`}>
          <div className={`relative overflow-hidden ${
            viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
          }`}>
            <img
              src={product.images?.[0] || '/api/placeholder/400/300'}
              alt={product.name}
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
              }`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Link href={`/products/detail/${product.id}`}>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  More Info
                </Button>
              </Link>
            </div>
          </div>
          <CardHeader className={viewMode === 'list' ? 'flex-1' : ''}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {product.description}
                </CardDescription>
              </div>
              {product.isFeatured && (
                <Badge className="bg-yellow-400 text-black ml-2">
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
