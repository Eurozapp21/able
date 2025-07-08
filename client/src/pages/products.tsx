import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ProductGrid from '@/components/product-grid';
import { Search } from 'lucide-react';

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Get query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');

  useState(() => {
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['/api/categories', { parentId: null }],
  });

  const { data: selectedCategoryData } = useQuery({
    queryKey: ['/api/categories', selectedCategory],
    enabled: !!selectedCategory,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newUrl = `/products?search=${encodeURIComponent(searchQuery)}`;
      window.history.pushState({}, '', newUrl);
      setSelectedCategory(null);
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    const newUrl = `/products?category=${categoryId}`;
    window.history.pushState({}, '', newUrl);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    window.history.pushState({}, '', '/products');
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
            {selectedCategoryData && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedCategoryData.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-dark">
              {selectedCategoryData ? selectedCategoryData.name : 'Products'}
            </h1>
            <p className="text-gray-custom">
              {selectedCategoryData 
                ? selectedCategoryData.description 
                : 'Comprehensive rehabilitation equipment and solutions'
              }
            </p>
          </div>

          {/* Search */}
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none focus:ring-2 focus:ring-primary min-w-[300px]"
              />
              <Button type="submit" className="btn-cardbutn rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-text-dark">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === null ? 'btn-cardbutn' : 'hover-gold'
                    }`}
                    onClick={clearFilters}
                  >
                    All Products
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        selectedCategory === category.id ? 'btn-cardbutn' : 'hover-gold'
                      }`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Filters */}
            {(selectedCategory || searchQuery) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-custom">Active filters:</span>
                {selectedCategory && selectedCategoryData && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary text-text-dark">
                    {selectedCategoryData.name}
                    <button
                      onClick={clearFilters}
                      className="ml-2 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary text-text-dark">
                    Search: "{searchQuery}"
                    <button
                      onClick={clearFilters}
                      className="ml-2 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid 
              categoryId={selectedCategory} 
              searchQuery={searchQuery} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
