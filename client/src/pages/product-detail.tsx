import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MessageCircle, 
  Phone, 
  Mail, 
  Download,
  Play,
  FileText,
  Star,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Category {
  id: number;
  name: string;
  parentId: number | null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  specifications: string;
  categoryId: number;
  isFeatured: boolean;
  images: string[];
}

export default function ProductDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const enquiryMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('/api/enquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Enquiry sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setEnquiryMessage("");
    },
    onError: () => {
      toast({
        title: "Error sending enquiry",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    enquiryMutation.mutate({
      subject: `Product enquiry: ${product?.name}`,
      message: enquiryMessage,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      productId: product?.id
    });
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation("/products")} className="bg-yellow-400 hover:bg-yellow-500 text-black">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  // Build category path
  const categoryPath: Category[] = [];
  let currentCategory = categories.find(c => c.id === product.categoryId);
  while (currentCategory) {
    categoryPath.unshift(currentCategory);
    currentCategory = categories.find(c => c.id === currentCategory.parentId);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setLocation("/products")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>

        {/* Main Product Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Image Gallery */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Main Image */}
              <div className="aspect-square relative group">
                <img
                  src={product.images?.[selectedImage] || '/api/placeholder/500/500'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images!.length - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                    >
                      <ChevronLeft className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setSelectedImage(selectedImage < product.images!.length - 1 ? selectedImage + 1 : 0)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                    >
                      <ChevronRight className="h-4 w-4 text-gray-700" />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-yellow-400 ${
                          selectedImage === index ? 'border-yellow-400 ring-2 ring-yellow-400/20' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image || '/api/placeholder/100/100'}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  {product.images.length > 4 && (
                    <div className="mt-2 text-center">
                      <Button variant="ghost" size="sm" className="text-yellow-600 hover:text-yellow-700 text-xs">
                        View all {product.images.length} images
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Quick Actions */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-3">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  <Download className="h-4 w-4 mr-2" />
                  Brochure
                </Button>
                <Button variant="outline" className="border-yellow-400 text-yellow-600">
                  <Play className="h-4 w-4 mr-2" />
                  Videos
                </Button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {product.isFeatured && (
                    <Badge className="bg-yellow-400 text-black font-semibold">★ Featured</Badge>
                  )}
                  <Badge variant="outline" className="border-yellow-300 text-yellow-700 bg-white">
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
              
              <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-yellow-600 font-bold text-sm">6.5kg</span>
                </div>
                <p className="text-xs text-gray-600 font-medium">Starting Weight</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold text-sm">150kg</span>
                </div>
                <p className="text-xs text-gray-600 font-medium">Max User Weight</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Settings className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">Adjustable</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">CE Certified</p>
              </div>
            </div>

            {/* Key Features with Descriptions */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Key Features
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Crash-tested Safety Design</h4>
                      <p className="text-xs text-gray-600">Rigorously tested to meet international safety standards, ensuring maximum protection during use and transportation.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Quick-release Axle System</h4>
                      <p className="text-xs text-gray-600">Innovative axle design allows for easy removal and installation, making transportation and storage more convenient.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Fully Customizable Setup</h4>
                      <p className="text-xs text-gray-600">Adaptable configuration options to meet individual user needs, including adjustable seat dimensions and positioning.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-1 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">Easy Car Transportation</h4>
                      <p className="text-xs text-gray-600">Designed for optimal portability with features that make loading and securing in vehicles simple and efficient.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold h-12">
                <MessageCircle className="h-4 w-4 mr-2" />
                Request Quote
              </Button>
              <Button variant="outline" className="flex-1 border-yellow-400 text-yellow-600 hover:bg-yellow-50 h-12">
                <Phone className="h-4 w-4 mr-2" />
                Call Expert
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="specifications" className="rounded-lg">Specifications</TabsTrigger>
              <TabsTrigger value="videos" className="rounded-lg">Videos & Media</TabsTrigger>
              <TabsTrigger value="enquiry" className="rounded-lg">Contact Us</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Dimensions & Weight</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-yellow-50 p-4 rounded-xl text-center">
                        <div className="text-xl font-bold text-yellow-600 mb-1">320-480mm</div>
                        <div className="text-xs text-gray-600">Seat Width</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl text-center">
                        <div className="text-xl font-bold text-blue-600 mb-1">250-500mm</div>
                        <div className="text-xs text-gray-600">Seat Depth</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl text-center">
                        <div className="text-xl font-bold text-green-600 mb-1">300-520mm</div>
                        <div className="text-xs text-gray-600">Seat Height</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-xl text-center">
                        <div className="text-xl font-bold text-red-600 mb-1">6.5kg+</div>
                        <div className="text-xs text-gray-600">Weight</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { feature: "Seat depth adjustable", available: true },
                        { feature: "Balance point adjustable", available: true },
                        { feature: "Backrest height adjustable", available: true },
                        { feature: "Quick-release axle", available: true },
                        { feature: "Car-compatible", available: true },
                        { feature: "Crash-tested", available: true }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                          <span className="text-sm text-gray-700">{item.feature}</span>
                          <span className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-gray-400'}`}>
                            {item.available ? '✓ Yes' : '✗ No'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-sm">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl relative overflow-hidden">
                    <img
                      src="/api/placeholder/600/337"
                      alt="Product Demo Video"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Button className="w-16 h-16 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2">Product Demonstration</h3>
                    <p className="text-sm text-gray-600">Complete overview of features and real-world usage</p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">Product Brochure</h4>
                        <p className="text-xs text-gray-600">Detailed specifications PDF</p>
                      </div>
                      <Download className="h-4 w-4 text-gray-400" />
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Play className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">Assembly Guide</h4>
                        <p className="text-xs text-gray-600">Step-by-step video tutorial</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">User Stories</h4>
                        <p className="text-xs text-gray-600">Real customer experiences</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="enquiry" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Get Expert Advice</h3>
                  <p className="text-gray-600">Our rehabilitation specialists are here to help you choose the perfect solution</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-0 shadow-sm text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h4 className="font-bold mb-2">Call Us</h4>
                      <p className="text-sm text-gray-600 mb-3">Speak directly with our product experts</p>
                      <p className="font-bold text-yellow-600">+357 22 250 115</p>
                      <p className="text-xs text-gray-500">Mon-Fri, 9:00-17:00</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="font-bold mb-2">Email Us</h4>
                      <p className="text-sm text-gray-600 mb-3">Detailed product information</p>
                      <p className="font-bold text-blue-600">info@abletools.com.cy</p>
                      <p className="text-xs text-gray-500">24-48 hour response</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-bold mb-2">Quick Form</h4>
                      <p className="text-sm text-gray-600 mb-3">Fast response guaranteed</p>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input id="name" name="name" placeholder="Your full name" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" name="email" type="email" placeholder="your.email@example.com" required className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">Your Message *</Label>
                        <Textarea
                          id="message"
                          value={enquiryMessage}
                          onChange={(e) => setEnquiryMessage(e.target.value)}
                          placeholder={`I'm interested in the ${product.name}. Please provide more information about...`}
                          rows={4}
                          required
                          className="mt-1"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold h-12"
                        disabled={enquiryMutation.isPending}
                      >
                        {enquiryMutation.isPending ? 'Sending...' : 'Send Enquiry'}
                        <MessageCircle className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}