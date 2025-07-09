import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid, List, Filter, ArrowRight, Package, ChevronRight, Layers, Star, ShoppingCart, Eye, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '@/components/product-grid-new';
import type { Category, Product } from '@shared/schema';

export default function Products() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  

  const [categoryPath, setCategoryPath] = useState<Category[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam));
    }
  }, [location]);

  const { data: allCategories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/categories'],
  });

  const { data: currentLevelCategories = [], isLoading: currentCategoriesLoading } = useQuery({
    queryKey: ['/api/categories', selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/categories?parentId=${selectedCategory || 'null'}`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      return response.json();
    },
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['/api/products', selectedCategory, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('categoryId', selectedCategory.toString());
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      
      const url = `/api/products${params.toString() ? '?' + params.toString() : ''}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  // Build category path for breadcrumbs
  useEffect(() => {
    if (selectedCategory && allCategories.length > 0) {
      const buildPath = (categoryId: number): Category[] => {
        const category = allCategories.find((cat: Category) => cat.id === categoryId);
        if (!category) return [];
        
        if (category.parentId) {
          return [...buildPath(category.parentId), category];
        }
        return [category];
      };
      
      setCategoryPath(buildPath(selectedCategory));
    } else {
      setCategoryPath([]);
    }
  }, [selectedCategory, allCategories]);

  const handleCategoryClick = (categoryId: number | null) => {
    console.log('Category clicked:', categoryId);
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const hasSubcategories = currentLevelCategories.length > 0;
  const hasProducts = products.length > 0;
  


  const getCategoryStats = () => {
    const mainCategories = allCategories.filter((cat: Category) => !cat.parentId);
    const totalProducts = products.length;
    const featuredProducts = products.filter((prod: Product) => prod.isFeatured).length;
    return { mainCategories: mainCategories.length, totalProducts, featuredProducts };
  };

  const stats = getCategoryStats();

  const getCategoryProductCount = (categoryId: number): number => {
    return products.filter((p: Product) => p.categoryId === categoryId).length;
  };

  const getCategorySubcategoryCount = (categoryId: number): number => {
    return allCategories.filter((cat: Category) => cat.parentId === categoryId).length;
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div 
          className="relative h-64 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,235,59,0.95), rgba(255,193,7,0.95)), url('/attached_assets/1601930431PRODUCTS_COVER_1752027894926.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center mb-4">
              <Package className="h-12 w-12 mr-3 text-white" />
              <h1 className="text-5xl font-bold">Our Products</h1>
            </div>
            <p className="text-xl opacity-95 mb-6">Discover our comprehensive range of rehabilitation equipment and assistive technologies</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Layers className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">{stats.mainCategories}</span>
                </div>
                <p className="text-sm opacity-90">Main Categories</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">{stats.totalProducts}</span>
                </div>
                <p className="text-sm opacity-90">Total Products</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 mr-2" />
                  <span className="text-2xl font-bold">{stats.featuredProducts}</span>
                </div>
                <p className="text-sm opacity-90">Featured Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Breadcrumb */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-yellow-600 hover:text-yellow-700">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/products" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(null);
                  }}
                  className="text-yellow-600 hover:text-yellow-700"
                >
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              {categoryPath.map((category, index) => (
                <div key={category.id} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === categoryPath.length - 1 ? (
                      <BreadcrumbPage className="text-yellow-600 font-semibold">{category.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        href={`/products?category=${category.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category.id);
                        }}
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        {category.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Enhanced Search and Controls - Only show when searching or when in a category with products (no subcategories) */}
        {(searchQuery || (selectedCategory && hasProducts && !hasSubcategories)) && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search products by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                  />
                </div>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 h-12 border-gray-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="featured">Featured First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowFilters(!showFilters);
                  }}
                  className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'hover:bg-gray-200'}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'hover:bg-gray-200'}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Category Navigation - Only show when not searching */}
        {hasSubcategories && !searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedCategory && categoryPath.length > 0 
                  ? `${categoryPath[categoryPath.length - 1].name} Categories`
                  : 'Product Categories'
                }
              </h2>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-3 py-1">
                {currentLevelCategories.length} categories
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentLevelCategories.map((category: Category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-yellow-400 hover:-translate-y-2 group bg-white overflow-hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(category.id);
                  }}
                >
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image || '/api/placeholder/400/300'}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="relative w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Package className="h-5 w-5 text-yellow-600" />
                        {/* Category Counts overlaid on icon */}
                        <div className="absolute -top-1 -right-1 flex flex-col gap-1">
                          {getCategorySubcategoryCount(category.id) > 0 && (
                            <div className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs font-bold">
                              {getCategorySubcategoryCount(category.id)}
                            </div>
                          )}
                          {getCategoryProductCount(category.id) > 0 && (
                            <div className="flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full text-xs font-bold">
                              {getCategoryProductCount(category.id)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Content */}
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg group-hover:text-yellow-600 transition-colors leading-tight">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {category.description}
                      </p>
                      

                      
                      <div className="pt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 transition-colors">
                          Explore Category
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Products Section - Show when searching OR when in a specific category with products */}
        {(searchQuery || (selectedCategory && hasProducts)) && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : selectedCategory && categoryPath.length > 0 
                    ? `${categoryPath[categoryPath.length - 1].name} Products`
                    : selectedCategory 
                      ? 'Products' 
                      : 'All Products'
                }
              </h2>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-3 py-1">
                  {products.length} products
                </Badge>
                {products.filter((p: Product) => p.isFeatured).length > 0 && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {products.filter((p: Product) => p.isFeatured).length} featured
                  </Badge>
                )}
              </div>
            </div>
            
            <ProductGrid 
              products={products}
              searchQuery={searchQuery}
              limit={searchQuery ? undefined : 12}
              sortBy={sortBy}
              viewMode={viewMode}
              isLoading={productsLoading}
            />
          </div>
        )}

        {/* Enhanced No Results - Only show when searching or in a specific category */}
        {(searchQuery || selectedCategory) && !hasSubcategories && !hasProducts && !categoriesLoading && !productsLoading && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">No products found</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {searchQuery 
                  ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search terms or browse our categories.`
                  : 'This category doesn\'t contain any products yet. Check back soon for new additions!'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {selectedCategory && (
                  <Button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(null);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Browse All Products
                  </Button>
                )}
                {searchQuery && (
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchQuery('');
                    }}
                    className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                  >
                    Clear Search
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Loading State */}
        {(categoriesLoading || productsLoading) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Enhanced Back Navigation */}
        {selectedCategory && (
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(null);
              }}
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50 px-6 py-3"
            >
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Back to All Categories
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}