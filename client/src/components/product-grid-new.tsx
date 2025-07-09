import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: any[];
  searchQuery?: string;
  limit?: number;
  sortBy?: string;
  viewMode?: 'grid' | 'list';
  isLoading?: boolean;
}

export default function ProductGrid({ 
  products = [],
  searchQuery, 
  limit,
  sortBy = 'name',
  viewMode = 'grid',
  isLoading = false
}: ProductGridProps) {
  


  // Sort products 
  const sortedProducts = [...products].sort((a, b) => {
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



  // Different layouts based on viewMode
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {displayProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border-0 shadow-md">
            <div className="flex flex-row">
              <div className="w-64 flex-shrink-0 relative overflow-hidden">
                <img
                  src={product.images?.[0] || '/api/placeholder/400/300'}
                  alt={product.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {product.isFeatured && (
                    <Badge className="bg-yellow-400 text-black text-xs font-semibold shadow-md">
                      ★ Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href={`/products/detail/${product.id}`}>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg">
                      Details →
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                  {/* Main info */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>
                    
                    {/* Feature highlights */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        Crash-tested and safety certified
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        Quick-release axle system
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        Fully customizable configuration
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick specs */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-3">Quick Specs</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium text-yellow-600">From 6.5kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max User:</span>
                        <span className="font-medium text-yellow-600">150kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seat Width:</span>
                        <span className="font-medium text-yellow-600">320-480mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Adjustable:</span>
                        <span className="font-medium text-green-600">✓ Yes</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Link href={`/products/detail/${product.id}`}>
                        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-xs">
                          Full Specifications
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full border-yellow-400 text-yellow-600 hover:bg-yellow-50 text-xs">
                        Quick Enquiry
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  // Grid layout with enhanced information  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white border-0 shadow-md">
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={product.images?.[0] || '/api/placeholder/400/300'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Floating badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.isFeatured && (
                <Badge className="bg-yellow-400 text-black text-xs font-semibold shadow-md">
                  ★ Featured
                </Badge>
              )}
              <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700 shadow-md">
                Premium Quality
              </Badge>
            </div>
            {/* Quick action button */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={`/products/detail/${product.id}`}>
                <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg">
                  View Details →
                </Button>
              </Link>
            </div>
          </div>
          
          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="font-bold text-xl mb-2 group-hover:text-yellow-600 transition-colors leading-tight">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {product.description}
              </p>
            </div>
            
            {/* Key specifications preview */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Key Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-yellow-600">6.5kg+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max User:</span>
                  <span className="font-medium text-yellow-600">150kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adjustable:</span>
                  <span className="font-medium text-green-600">✓ Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Certified:</span>
                  <span className="font-medium text-green-600">✓ CE</span>
                </div>
              </div>
            </div>
            
            {/* Feature highlights */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs text-gray-600">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                Crash-tested for safety
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                Quick-release axle system
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                Customizable configuration
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <Link href={`/products/detail/${product.id}`} className="flex-1">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Full Details
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 px-3">
                Quick Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
}