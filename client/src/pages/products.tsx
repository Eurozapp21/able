import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ProductGrid from '@/components/product-grid';
import { Search, Grid, List, ChevronRight, ArrowLeft } from 'lucide-react';
import type { Category, Product } from '@shared/schema';

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const subCategoryParam = urlParams.get('subcategory');
  const searchParam = urlParams.get('search');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
    if (subCategoryParam) {
      setSelectedSubCategory(parseInt(subCategoryParam));
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, subCategoryParam, searchParam]);

  // Main categories (parentId = null)
  const { data: mainCategories = [] } = useQuery({
    queryKey: ['/api/categories'],
    select: (data: Category[]) => data.filter(cat => cat.parentId === null),
  });

  // Sub categories for selected category
  const { data: subCategories = [] } = useQuery({
    queryKey: ['/api/categories', 'subcategories', selectedCategory],
    select: (data: Category[]) => data.filter(cat => cat.parentId === selectedCategory),
    enabled: !!selectedCategory,
  });

  const { data: selectedCategoryData } = useQuery({
    queryKey: ['/api/categories', selectedCategory],
    enabled: !!selectedCategory,
  });

  const { data: selectedSubCategoryData } = useQuery({
    queryKey: ['/api/categories', selectedSubCategory],
    enabled: !!selectedSubCategory,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newUrl = `/products?search=${encodeURIComponent(searchQuery)}`;
      window.history.pushState({}, '', newUrl);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    setSearchQuery('');
    const newUrl = `/products?category=${categoryId}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleSubCategorySelect = (subCategoryId: number) => {
    setSelectedSubCategory(subCategoryId);
    setSearchQuery('');
    const newUrl = `/products?category=${selectedCategory}&subcategory=${subCategoryId}`;
    window.history.pushState({}, '', newUrl);
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchQuery('');
    window.history.pushState({}, '', '/products');
  };

  const goBackToSubCategories = () => {
    setSelectedSubCategory(null);
    const newUrl = `/products?category=${selectedCategory}`;
    window.history.pushState({}, '', newUrl);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSearchQuery('');
    window.history.pushState({}, '', '/products');
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Header with Image */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg"
            alt="AbleTools Products - Rehabilitation Equipment Solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {selectedSubCategoryData ? selectedSubCategoryData.name :
               selectedCategoryData ? selectedCategoryData.name : 'Products'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {selectedSubCategoryData ? selectedSubCategoryData.description :
               selectedCategoryData ? selectedCategoryData.description : 
               'Comprehensive rehabilitation equipment and solutions for enhanced mobility and independence'}
            </p>
            
            {/* Breadcrumb */}
            <Breadcrumb className="justify-center">
              <BreadcrumbList className="text-white">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white hover:text-yellow-400">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-white" />
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/products" 
                    className="text-white hover:text-yellow-400"
                    onClick={(e) => {
                      e.preventDefault();
                      goBackToCategories();
                    }}
                  >
                    Products
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {selectedCategoryData && (
                  <>
                    <BreadcrumbSeparator className="text-white" />
                    <BreadcrumbItem>
                      {selectedSubCategoryData ? (
                        <BreadcrumbLink 
                          href="#" 
                          className="text-white hover:text-yellow-400"
                          onClick={(e) => {
                            e.preventDefault();
                            goBackToSubCategories();
                          }}
                        >
                          {selectedCategoryData.name}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-yellow-400">{selectedCategoryData.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </>
                )}
                {selectedSubCategoryData && (
                  <>
                    <BreadcrumbSeparator className="text-white" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-yellow-400">{selectedSubCategoryData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">

        {/* Search and View Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex-1 mb-4 lg:mb-0">
            {(selectedCategory || selectedSubCategory || searchQuery) && (
              <Button
                variant="ghost"
                onClick={selectedSubCategory ? goBackToSubCategories : goBackToCategories}
                className="mb-4 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {selectedSubCategory ? 'Back to Subcategories' : 'Back to Categories'}
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none focus:ring-2 focus:ring-yellow-400 min-w-[300px]"
              />
              <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* View Mode Toggle */}
            {(selectedSubCategory || searchQuery) && (
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${viewMode === 'grid' ? 'bg-yellow-400 text-black' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${viewMode === 'list' ? 'bg-yellow-400 text-black' : ''}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        {!selectedCategory && !searchQuery ? (
          /* Categories View */
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Product Categories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive range of rehabilitation equipment organized by category
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-yellow-400"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image || '/api/placeholder/400/300'}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-yellow-600 font-medium">Explore Products</span>
                      <ChevronRight className="h-5 w-5 text-yellow-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : selectedCategory && !selectedSubCategory && !searchQuery ? (
          /* Sub Categories View */
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{selectedCategoryData?.name} Subcategories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {selectedCategoryData?.description}
              </p>
            </div>
            
            {subCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subCategories.map((subCategory) => (
                  <Card 
                    key={subCategory.id} 
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-yellow-400"
                    onClick={() => handleSubCategorySelect(subCategory.id)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={subCategory.image || '/api/placeholder/400/300'}
                        alt={subCategory.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{subCategory.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4">{subCategory.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-yellow-600 font-medium">View Products</span>
                        <ChevronRight className="h-5 w-5 text-yellow-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Direct to Products if no subcategories */
              <div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Products in {selectedCategoryData?.name}</h3>
                </div>
                <ProductGrid 
                  categoryId={selectedCategory} 
                  searchQuery={searchQuery}
                />
              </div>
            )}
          </div>
        ) : (
          /* Products View */
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : 
                 selectedSubCategoryData ? `Products in ${selectedSubCategoryData.name}` :
                 selectedCategoryData ? `Products in ${selectedCategoryData.name}` : 'All Products'}
              </h3>
            </div>
            <ProductGrid 
              categoryId={selectedSubCategory || selectedCategory} 
              searchQuery={searchQuery}
            />
          </div>
        )}
      </div>
    </div>
  );
}
