import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import { MessageSquare, Plus, Eye, Clock } from 'lucide-react';

const enquirySchema = z.object({
  type: z.string().min(1, 'Please select an enquiry type'),
  about: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

export default function Enquiry() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get product ID from URL params if redirected from product page
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('product');

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login?redirect=/enquiry');
    }
  }, [isAuthenticated, setLocation]);

  const { data: enquiries = [], isLoading: enquiriesLoading } = useQuery({
    queryKey: ['/api/enquiries'],
    enabled: isAuthenticated,
  });

  const { data: product } = useQuery({
    queryKey: ['/api/products', productId],
    enabled: !!productId,
  });

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      type: '',
      about: product?.name || '',
      message: '',
    },
  });

  // Update form when product is loaded
  useEffect(() => {
    if (product) {
      form.setValue('type', 'Product');
      form.setValue('about', product.name);
      form.setValue('message', `I would like to know more about the ${product.name}. Please provide additional information about pricing, availability, and features.`);
    }
  }, [product, form]);

  const createEnquiryMutation = useMutation({
    mutationFn: async (data: EnquiryFormData) => {
      const response = await apiRequest('POST', '/api/enquiries', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Enquiry Created!",
        description: "Your enquiry has been submitted successfully. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/enquiries'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create enquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EnquiryFormData) => {
    createEnquiryMutation.mutate(data);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary text-text-dark';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'resolved': return 'bg-secondary-green text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!isAuthenticated) {
    return null;
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
              <BreadcrumbPage>Enquiry</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-text-dark">Enquiry</h1>
            <p className="text-gray-custom">Submit enquiries and track their progress</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create New Enquiry */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-text-dark flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Enquiry
              </CardTitle>
              {product && (
                <p className="text-sm text-gray-custom">
                  Enquiring about: <strong>{product.name}</strong>
                </p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="type">Enquiry Type *</Label>
                  <Select
                    value={form.watch('type')}
                    onValueChange={(value) => form.setValue('type', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="--Select Enquiry Type--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seminar">Seminar</SelectItem>
                      <SelectItem value="Training">Training</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.type && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.type.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="about">Enquiry About</Label>
                  <Input
                    id="about"
                    {...form.register('about')}
                    className="mt-1"
                    placeholder="Specific product, service, or topic"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    className="mt-1 min-h-[120px]"
                    placeholder="Please describe your enquiry in detail..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="btn-cardbutn w-full"
                  disabled={createEnquiryMutation.isPending}
                >
                  {createEnquiryMutation.isPending ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enquiry List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-text-dark flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Your Enquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {enquiriesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="p-4 border border-light rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : enquiries.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {enquiries.map((enquiry) => (
                    <div key={enquiry.id} className="p-4 border border-light rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-text-dark">
                            ENQ{enquiry.id}
                          </h4>
                          {enquiry.status === 'new' && (
                            <Badge className="bg-red-500 text-white text-xs">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <Badge className={`${getStatusColor(enquiry.status)} text-xs`}>
                          {enquiry.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-custom mb-1">
                        <strong>{enquiry.type}</strong>
                        {enquiry.about && ` - ${enquiry.about}`}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                          {formatDate(enquiry.createdAt!.toString())}
                        </p>
                        <Link href={`/enquiry/${enquiry.id}`}>
                          <Button variant="outline" size="sm" className="hover-gold">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2 text-text-dark">No Enquiries Yet</h3>
                  <p className="text-gray-custom">
                    Create your first enquiry using the form on the left.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="mt-8 euz_bgyelo">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-text-dark">Need Help?</h3>
                <p className="text-gray-custom mb-4 leading-relaxed">
                  Our team is here to assist you with any questions about our products and services. 
                  Don't hesitate to reach out for technical support, product information, or general inquiries.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-custom" />
                    <span className="text-gray-custom">Response time: 24-48 hours</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3 text-text-dark">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-custom">
                  <p><strong>Phone:</strong> +357 22 250 115</p>
                  <p><strong>Email:</strong> info@abletools.com.cy</p>
                  <p><strong>Address:</strong> Strovolos Avenue 149K, Nicosia</p>
                </div>
                <Link href="/contact">
                  <Button className="btn-read mt-4">
                    Contact Us Directly
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
