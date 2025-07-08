import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, ShoppingCart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetail() {
  const [, params] = useRoute('/products/:id');
  const productId = params?.id ? parseInt(params.id) : null;

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  const { data: category } = useQuery({
    queryKey: ['/api/categories', product?.categoryId],
    enabled: !!product?.categoryId,
  });

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-64 mb-6" />
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h1 className="text-2xl font-bold mb-4 text-text-dark">Product Not Found</h1>
              <p className="text-gray-custom mb-6">The product you're looking for doesn't exist.</p>
              <Link href="/products">
                <Button className="btn-cardbutn">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleInquiry = () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/login?redirect=/enquiry';
      return;
    }
    
    // Redirect to enquiry page with product context
    window.location.href = `/enquiry?product=${product.id}`;
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
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/products?category=${category.id}`}>
                    {category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-6 hover-gold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <Card className="overflow-hidden">
              <img
                src={product.images?.[0] || '/api/placeholder/600/400'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </Card>
            
            {/* Additional Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <Card key={index} className="overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-20 object-cover"
                    />
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-dark">
                  {product.name}
                </h1>
                {category && (
                  <p className="text-gray-custom text-lg">
                    {category.name}
                  </p>
                )}
              </div>
              {product.isFeatured && (
                <Badge className="bg-secondary-green text-white">
                  Featured
                </Badge>
              )}
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-custom leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {product.specifications && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-custom leading-relaxed">
                    {product.specifications}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-cardbutn flex-1"
                onClick={handleInquiry}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Make Enquiry
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 hover-gold"
                onClick={() => window.location.href = '/contact'}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Contact Sales
              </Button>
            </div>

            {/* Additional Info */}
            <Card className="mt-6 euz_bgyelo">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-text-dark">Need More Information?</h3>
                <p className="text-gray-custom text-sm mb-4">
                  Our rehabilitation specialists are here to help you find the perfect solution for your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 text-sm text-gray-custom">
                  <span className="flex items-center">
                    📞 +357 22 250 115
                  </span>
                  <span className="flex items-center">
                    📧 info@abletools.com.cy
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-text-dark">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* This would be populated with related products from the same category */}
            <Card className="hover-lift">
              <img
                src="/api/placeholder/300/200"
                alt="Related Product"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Related Product 1</CardTitle>
              </CardHeader>
            </Card>
            <Card className="hover-lift">
              <img
                src="/api/placeholder/300/200"
                alt="Related Product"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Related Product 2</CardTitle>
              </CardHeader>
            </Card>
            <Card className="hover-lift">
              <img
                src="/api/placeholder/300/200"
                alt="Related Product"
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle className="text-lg">Related Product 3</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
