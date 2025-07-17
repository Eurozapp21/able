import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRoute, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import { ArrowLeft, MessageSquare, User, Headphones, Send } from 'lucide-react';

const messageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function EnquiryDetail() {
  const [, params] = useRoute('/enquiry/:id');
  const enquiryId = params?.id ? parseInt(params.id) : null;
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/enquiries', enquiryId],
    enabled: !!enquiryId,
  });

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData: MessageFormData) => {
      const response = await apiRequest('POST', `/api/enquiries/${enquiryId}/messages`, messageData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Your message has been sent successfully.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/enquiries', enquiryId] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (messageData: MessageFormData) => {
    sendMessageMutation.mutate(messageData);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-64 mb-6" />
          <Skeleton className="h-12 w-96 mb-8" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !data?.enquiry) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-12">
            <CardContent>
              <h1 className="text-2xl font-bold mb-4 text-text-dark">Enquiry Not Found</h1>
              <p className="text-gray-custom mb-6">The enquiry you're looking for doesn't exist or you don't have permission to view it.</p>
              <Link href="/enquiry">
                <Button className="btn-cardbutn">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Enquiries
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { enquiry, messages = [] } = data;

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
              <BreadcrumbLink href="/enquiry">Enquiry</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Enquiry</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <Link href="/enquiry">
          <Button variant="ghost" className="mb-6 hover-gold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Enquiries
          </Button>
        </Link>

        {/* Enquiry Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark">
              Enquiry on {enquiry.about || enquiry.type}
            </h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge className={getStatusColor(enquiry.status)}>
                {enquiry.status}
              </Badge>
              <span className="text-gray-custom">
                Created: {formatDate(enquiry.createdAt!.toString())}
              </span>
            </div>
          </div>
        </div>

        {/* Enquiry Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-text-dark">Enquiry Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex">
                  <div className="bor w-1/3">
                    <strong>Enquiry No</strong>
                  </div>
                  <div className="nobor w-2/3">
                    ENQ{enquiry.id}
                  </div>
                </div>
                <div className="flex">
                  <div className="bor w-1/3">
                    <strong>Enquiry Type</strong>
                  </div>
                  <div className="nobor w-2/3">
                    {enquiry.type}
                  </div>
                </div>
                <div className="flex">
                  <div className="bor w-1/3">
                    <strong>Enquiry About</strong>
                  </div>
                  <div className="nobor w-2/3">
                    {enquiry.about || 'General Enquiry'}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <div className="bor w-1/3">
                    <strong>Name</strong>
                  </div>
                  <div className="nobor w-2/3">
                    {user?.firstName} {user?.lastName}
                  </div>
                </div>
                <div className="flex">
                  <div className="bor w-1/3">
                    <strong>Email</strong>
                  </div>
                  <div className="nobor w-2/3">
                    {user?.email}
                  </div>
                </div>
                {user?.phone && (
                  <div className="flex">
                    <div className="bor w-1/3">
                      <strong>Phone</strong>
                    </div>
                    <div className="nobor w-2/3">
                      {user.phone}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-text-dark">Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 border border-light p-6 rounded-lg">
              {/* Initial enquiry message */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="fontsearch mr-3">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="h3print">User</span>
                </div>
                <div className="bg-white p-4 rounded-lg border border-light">
                  <h5 className="font-semibold mb-2 text-text-dark">
                    {formatDate(enquiry.createdAt!.toString())}
                  </h5>
                  <p className="cardtest leading-relaxed">{enquiry.message}</p>
                </div>
                <hr className="my-6 border-gray-300" />
              </div>

              {/* Conversation messages */}
              {messages.map((message) => (
                <div key={message.id} className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className={`fontsearch mr-3 ${
                      message.senderType === 'admin' 
                        ? 'bg-secondary-green' 
                        : 'bg-primary'
                    }`}>
                      {message.senderType === 'admin' ? (
                        <Headphones className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`h3print ${
                      message.senderType === 'admin' 
                        ? 'text-secondary-green' 
                        : 'text-text-dark'
                    }`}>
                      {message.senderType === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-light">
                    <h5 className="font-semibold mb-2 text-text-dark">
                      {formatDate(message.createdAt!.toString())}
                    </h5>
                    <p className="cardtest leading-relaxed">{message.message}</p>
                  </div>
                  <hr className="my-6 border-gray-300" />
                </div>
              ))}

              {/* Reply form */}
              <div className="bg-white p-6 rounded-lg border border-light">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      {...form.register('message')}
                      className="min-h-[120px]"
                      placeholder="Type your reply here..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="btn-cardbutn"
                    disabled={sendMessageMutation.isPending}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {sendMessageMutation.isPending ? 'Sending...' : 'Send Reply'}
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
