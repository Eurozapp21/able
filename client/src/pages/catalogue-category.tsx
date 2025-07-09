import { useQuery, useMutation } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { FileText, Download, Eye, Users, Calendar, ArrowLeft, ExternalLink } from 'lucide-react';

interface CatalogueCategory {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

interface Brochure {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  filename: string;
  fileUrl: string;
  fileSize: string;
  downloadCount: number;
  isActive: boolean;
  createdAt: string;
}

export default function CatalogueCategory() {
  const [match, params] = useRoute('/catalogue/:slug');
  const { toast } = useToast();
  
  const slug = params?.slug;

  const { data: category, isLoading: categoryLoading } = useQuery<CatalogueCategory>({
    queryKey: ['/api/catalogue/categories', slug],
    enabled: !!slug,
  });

  const { data: brochures = [], isLoading: brochuresLoading } = useQuery<Brochure[]>({
    queryKey: ['/api/catalogue/categories', category?.id, 'brochures'],
    enabled: !!category?.id,
  });

  const downloadMutation = useMutation({
    mutationFn: async (brochureId: number) => {
      const response = await apiRequest('POST', `/api/catalogue/brochures/${brochureId}/download`);
      return response.json();
    },
    onSuccess: (data, brochureId) => {
      const brochure = brochures.find(b => b.id === brochureId);
      if (brochure) {
        // Open in new tab
        window.open(brochure.fileUrl, '_blank');
        toast({
          title: "Download Started",
          description: `${brochure.filename} is now downloading.`,
        });
      }
    },
    onError: () => {
      toast({
        title: "Download Failed",
        description: "Sorry, there was an error downloading the brochure. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDownload = (brochureId: number) => {
    downloadMutation.mutate(brochureId);
  };

  if (categoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-gold mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The requested catalogue category could not be found.</p>
          <Button asChild>
            <a href="/catalogue">Back to Catalogue</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/catalogue">Catalogue</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{category.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${category.image}')`
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <a 
                href="/catalogue" 
                className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Catalogue</span>
              </a>
            </div>
            <h1 className="text-5xl font-bold mb-4">{category.title}</h1>
            <p className="text-xl leading-relaxed mb-6">{category.description}</p>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{color: '#ffeb3b'}} />
                <span className="text-lg">{brochures.length} Brochures Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" style={{color: '#ffeb3b'}} />
                <span className="text-lg">Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochures Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Available Brochures</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download comprehensive product information, technical specifications, and detailed guides for {category.title.toLowerCase()}.
          </p>
        </div>

        {brochuresLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : brochures.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Brochures Available</h3>
            <p className="text-gray-500 mb-6">Brochures for this category are currently being prepared.</p>
            <Button asChild>
              <a href="/contact">Contact Us for Information</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brochures.map((brochure) => (
              <Card key={brochure.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-800 mb-2 line-clamp-2">
                        {brochure.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{brochure.downloadCount} downloads</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{brochure.fileSize}</span>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="px-2 py-1 rounded text-xs font-semibold text-black"
                      style={{backgroundColor: '#ffeb3b'}}
                    >
                      PDF
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 line-clamp-3">{brochure.description}</p>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleDownload(brochure.id)}
                      disabled={downloadMutation.isPending}
                      className="flex-1"
                      style={{
                        backgroundColor: '#ffeb3b',
                        color: '#000',
                        border: 'none'
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloadMutation.isPending ? 'Downloading...' : 'Download'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(brochure.fileUrl, '_blank')}
                      className="px-3"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16">
          <div 
            className="p-8 rounded-2xl text-center text-black"
            style={{backgroundColor: '#ffeb3b'}}
          >
            <h3 className="text-2xl font-bold mb-4">Need Additional Information?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our technical specialists can provide custom quotes, detailed specifications, and installation guidance for all {category.title.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <a href="/contact">Get Expert Consultation</a>
              </Button>
              <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                <a href="/education">View Training Programs</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}