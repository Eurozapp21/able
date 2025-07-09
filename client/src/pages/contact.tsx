import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Phone, Mail, MapPin, Clock, Users, HeadphonesIcon, MessageSquare, CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
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
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark">Contact Us</h1>
            <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
              <HeadphonesIcon className="w-6 h-6 text-black" />
            </div>
          </div>
          <p className="text-xl text-gray-custom max-w-3xl mx-auto leading-relaxed mb-8">
            Get in touch with our rehabilitation specialists and technical experts. We're here to help you find the perfect solution for your needs and provide ongoing support for all your equipment.
          </p>
          
          {/* Quick Contact Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <div className="text-lg font-bold text-text-dark">24/7</div>
              <div className="text-sm text-gray-custom">Emergency Support</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-bold text-text-dark">Expert</div>
              <div className="text-sm text-gray-custom">Technical Team</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-bold text-text-dark">&lt;24h</div>
              <div className="text-sm text-gray-custom">Response Time</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="text-lg font-bold text-text-dark">Local</div>
              <div className="text-sm text-gray-custom">Cyprus Based</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-black" />
                  </div>
                  <CardTitle className="text-2xl text-text-dark">Send us a Message</CardTitle>
                </div>
                <p className="text-gray-custom">Fill out the form below and we'll get back to you within 24 hours.</p>
              </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      className="mt-1"
                      placeholder="Your full name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register('email')}
                      className="mt-1"
                      placeholder="your.email@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...form.register('phone')}
                    className="mt-1"
                    placeholder="+357 XX XXX XXX"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    {...form.register('subject')}
                    className="mt-1"
                    placeholder="How can we help you?"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...form.register('message')}
                    className="mt-1 min-h-[120px]"
                    placeholder="Please describe your needs or questions..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  style={{backgroundColor: '#ffeb3b', color: '#000'}}
                  className="w-full hover:opacity-90 transition-all duration-300 font-bold py-3 text-lg"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? 'Sending Message...' : 'Send Message'}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-custom">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </form>
            </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-black" />
                  </div>
                  <CardTitle className="text-xl text-text-dark">Contact Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0" style={{color: '#ffeb3b'}}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark mb-1">Address</h3>
                    <p className="text-gray-custom">
                      Strovolos Avenue 149K<br />
                      Strovolos, Nicosia, 2048<br />
                      Cyprus
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0" style={{color: '#ffeb3b'}}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark mb-1">Phone</h3>
                    <p className="text-gray-custom">
                      <a href="tel:+35722250115" className="hover:text-primary-gold transition-colors">
                        +357 22 250 115
                      </a>
                    </p>
                    <p className="text-gray-custom">
                      <a href="tel:+35722250116" className="hover:text-primary-gold transition-colors">
                        +357 22 250 116 (Fax)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0" style={{color: '#ffeb3b'}}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark mb-1">Email</h3>
                    <p className="text-gray-custom">
                      <a href="mailto:info@abletools.com.cy" className="hover:text-primary-gold transition-colors">
                        info@abletools.com.cy
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0" style={{color: '#ffeb3b'}}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-dark mb-1">Business Hours</h3>
                    <p className="text-gray-custom">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <HeadphonesIcon className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle className="text-xl text-text-dark">Emergency Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-custom mb-4">
                  For urgent equipment repairs or technical support outside business hours, please call our emergency line:
                </p>
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <p className="text-xl font-bold text-red-600 text-center">
                    <a href="tel:+35799123456" className="hover:text-red-700 transition-colors">
                      +357 99 123 456
                    </a>
                  </p>
                  <p className="text-sm text-gray-custom text-center mt-2">
                    Available 24/7 for existing customers
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-black" />
                  </div>
                  <CardTitle className="text-xl text-text-dark">Visit Our Showroom</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 mb-4">
                  <h4 className="font-semibold text-text-dark mb-3">Comprehensive Product Display</h4>
                  <ul className="text-sm text-gray-custom space-y-1">
                    <li>• Wheelchair assessment area</li>
                    <li>• Stair lift demonstration models</li>
                    <li>• Multi-sensory therapy room</li>
                    <li>• HUR pneumatic equipment showcase</li>
                    <li>• Accessibility solutions display</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-gray-700 font-medium">
                    📍 Convenient Location in Strovolos
                  </p>
                  <p className="text-sm text-gray-custom mt-1">
                    Easily accessible by public transport with ample parking available. 
                    Call ahead to schedule a personalized demonstration.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Department Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-dark">Contact by Department</h3>
              
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark">Sales & Consultations</h4>
                      <p className="text-sm text-gray-custom">Product recommendations & quotes</p>
                      <a href="mailto:sales@abletools.com.cy" className="text-primary-gold text-sm hover:underline">
                        sales@abletools.com.cy
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <HeadphonesIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark">Technical Support</h4>
                      <p className="text-sm text-gray-custom">Equipment service & maintenance</p>
                      <a href="mailto:support@abletools.com.cy" className="text-primary-gold text-sm hover:underline">
                        support@abletools.com.cy
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-dark">Training & Education</h4>
                      <p className="text-sm text-gray-custom">Seminars & certification programs</p>
                      <a href="mailto:training@abletools.com.cy" className="text-primary-gold text-sm hover:underline">
                        training@abletools.com.cy
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
