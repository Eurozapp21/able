import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Heart, Share2, ShoppingCart, ArrowLeft, Star, MessageCircle, Phone, Mail } from 'lucide-react';
import type { Product, Category } from '@shared/schema';

export default function ProductDetail() {
  const [, params] = useRoute('/products/detail/:id');
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const productId = params?.id ? parseInt(params.id) : null;

  // Fetch product
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  // Build category breadcrumb path
  const buildCategoryPath = async (categoryId: number): Promise<Category[]> => {
    const categories: Category[] = [];
    let currentCategoryId: number | null = categoryId;
    
    while (currentCategoryId) {
      const response = await fetch(`/api/categories/${currentCategoryId}`);
      if (response.ok) {
        const category = await response.json();
        categories.unshift(category);
        currentCategoryId = category.parentId;
      } else {
        break;
      }
    }
    
    return categories;
  };

  const { data: categoryPath = [] } = useQuery({
    queryKey: ['/api/categories/path', product?.categoryId],
    queryFn: () => buildCategoryPath(product!.categoryId),
    enabled: !!product?.categoryId,
  });

  // Submit enquiry mutation
  const enquiryMutation = useMutation({
    mutationFn: async (data: { message: string; productId: number }) => {
      return apiRequest('/api/enquiries', {
        method: 'POST',
        body: JSON.stringify({
          subject: `Product Enquiry: ${product?.name}`,
          message: data.message,
          userId: user?.id,
          status: 'open'
        }),
      });
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Your enquiry has been submitted successfully.' });
      setEnquiryMessage('');
      queryClient.invalidateQueries({ queryKey: ['/api/enquiries'] });
    },
    onError: (error) => {
      toast({ title: 'Error', description: 'Failed to submit enquiry. Please try again.' });
    },
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: 'Login Required', description: 'Please log in to submit an enquiry.' });
      return;
    }
    if (!enquiryMessage.trim() || !productId) return;
    
    enquiryMutation.mutate({ 
      message: enquiryMessage,
      productId: productId
    });
  };

  if (productLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            {categoryPath.map((category, index) => (
              <div key={category.id} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === categoryPath.length - 1 ? (
                    <BreadcrumbPage>{category.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink 
                      href={`/products?category=${category.id}`}
                    >
                      {category.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-yellow-600">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
              <img
                src={product.images?.[selectedImage] || '/api/placeholder/600/600'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-yellow-400' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isFeatured && (
                  <Badge className="bg-yellow-400 text-black">Featured</Badge>
                )}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.2)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black flex-1 sm:flex-none">
                <MessageCircle className="h-5 w-5 mr-2" />
                Request Quote
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                <Heart className="h-5 w-5 mr-2" />
                Save
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>

            {/* Quick Contact */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-gray-900">Need Help?</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="enquiry">Make Enquiry</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{product.specifications}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enquiry" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Enquiry</CardTitle>
                <p className="text-gray-600">
                  Have questions about this product? Send us a message and our experts will get back to you.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements, questions, or any specific needs..."
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={enquiryMutation.isPending || !user}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black"
                  >
                    {enquiryMutation.isPending ? 'Sending...' : 'Send Enquiry'}
                  </Button>
                  {!user && (
                    <p className="text-sm text-gray-600">
                      Please <Link href="/login" className="text-yellow-600 hover:underline">log in</Link> to submit an enquiry.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No reviews yet. Be the first to review this product!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}