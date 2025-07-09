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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Heart, Share2, ShoppingCart, ArrowLeft, Star, MessageCircle, Phone, Mail, Download, Play, FileText, ChevronLeft, ChevronRight, Zap, Settings, Shield, Award } from 'lucide-react';
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
          {/* Product Images Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-lg group">
              <img
                src={product.images?.[selectedImage] || '/api/placeholder/600/600'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Image Navigation Arrows */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images!.length - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(selectedImage < product.images!.length - 1 ? selectedImage + 1 : 0)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}
              
              {/* Image Counter */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-6 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-yellow-400 ${
                      selectedImage === index ? 'border-yellow-400 ring-2 ring-yellow-400/20' : 'border-gray-200'
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
            
            {/* Product Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </Button>
              <Button variant="outline" className="flex-1 border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                <Play className="h-4 w-4 mr-2" />
                Watch Videos
              </Button>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {product.isFeatured && (
                    <Badge className="bg-yellow-400 text-black">Featured</Badge>
                  )}
                  <Badge variant="outline" className="border-gray-300">
                    {categoryPath[categoryPath.length - 1]?.name || 'Product'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-yellow-600">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-yellow-600">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>
              
              {/* Product Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">High Performance</p>
                    <p className="text-xs text-gray-600">Premium quality</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Customizable</p>
                    <p className="text-xs text-gray-600">Adjustable features</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Certified</p>
                    <p className="text-xs text-gray-600">Safety approved</p>
                  </div>
                </div>
              </div>
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="technical">Technical Data</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="enquiry">Make Enquiry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-yellow-600" />
                    Product Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">Fully welded or adjustable configuration</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">Fixed or adjustable back and rear axle</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">Crash-tested for safety</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">Propulsion weight from 6.5 kg</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm">User weight max. 150 kg</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Key Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Optimal Strength-to-Weight Ratio</p>
                        <p className="text-xs text-gray-600">Maximum efficiency for active users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Customizable Configuration</p>
                        <p className="text-xs text-gray-600">Adaptable to individual needs</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-black">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Easy Transportation</p>
                        <p className="text-xs text-gray-600">Convenient for car storage</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">320-480mm</div>
                    <div className="text-sm text-gray-600">Seat Width Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">250-500mm</div>
                    <div className="text-sm text-gray-600">Seat Depth Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">300-520mm</div>
                    <div className="text-sm text-gray-600">Seat Height Range</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">6.5kg</div>
                    <div className="text-sm text-gray-600">Weight from</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{product.specifications}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="py-3 pr-4 font-medium">Seat width adjustable</td>
                        <td className="py-3">NO</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 pr-4 font-medium">Seat depth adjustable</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4 font-medium">Seat angle adjustable</td>
                        <td className="py-3">NO</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 pr-4 font-medium">Balance point adjustable</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4 font-medium">Harness seat</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 pr-4 font-medium">Fixed seat</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4 font-medium">Backrest angle adjustable</td>
                        <td className="py-3">NO</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 pr-4 font-medium">Backrest height adjustable</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4 font-medium">Quick-release axle</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 pr-4 font-medium">Suitable for fastening in car</td>
                        <td className="py-3">YES</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 pr-4 font-medium">Weight from</td>
                        <td className="py-3">6.5 kg</td>
                      </tr>
                      <tr className="border-b bg-gray-50">
                        <td className="py-3 pr-4 font-medium">User weight max.</td>
                        <td className="py-3">150 kg</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <img
                    src="/api/placeholder/400/225"
                    alt="Product Demo Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-700 ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Product Overview</h3>
                  <p className="text-sm text-gray-600">Complete walkthrough of features and benefits</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <img
                    src="/api/placeholder/400/225"
                    alt="Assembly Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-700 ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Assembly Guide</h3>
                  <p className="text-sm text-gray-600">Step-by-step assembly instructions</p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <img
                    src="/api/placeholder/400/225"
                    alt="Usage Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="h-6 w-6 text-gray-700 ml-1" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">User Experience</h3>
                  <p className="text-sm text-gray-600">Real user testimonials and demonstrations</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="enquiry" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Enquiry</CardTitle>
                  <p className="text-gray-600">
                    Have questions about this product? Send us a message and our experts will get back to you.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" placeholder="Enter your full name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" type="email" placeholder="Enter your email" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input id="company" placeholder="Enter company name" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enquiry about Wolturnus W5" value={`Enquiry about ${product.name}`} />
                    </div>
                    <div>
                      <Label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={enquiryMessage}
                        onChange={(e) => setEnquiryMessage(e.target.value)}
                        placeholder="Please provide details about your enquiry, specific requirements, or questions about this product..."
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                      disabled={enquiryMutation.isPending}
                    >
                      {enquiryMutation.isPending ? 'Sending Enquiry...' : 'Send Product Enquiry'}
                      <MessageCircle className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <p className="text-gray-600">
                    Get in touch with our product specialists directly.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone Support</h4>
                      <p className="text-gray-600 text-sm mb-2">Monday - Friday, 9:00 - 17:00</p>
                      <p className="font-medium text-yellow-600">+357 22 250 115</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email Support</h4>
                      <p className="text-gray-600 text-sm mb-2">Get detailed product information</p>
                      <p className="font-medium text-blue-600">info@abletools.com.cy</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-yellow-800">Expert Consultation</h4>
                    <p className="text-sm text-yellow-700">
                      Our rehabilitation specialists can help you choose the right configuration and accessories for your specific needs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}