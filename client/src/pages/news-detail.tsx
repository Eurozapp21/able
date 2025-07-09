import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, User, Share2, ArrowLeft, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams();
  
  const { data: article, isLoading } = useQuery({
    queryKey: ['/api/events', id],
    enabled: !!id,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryBadge = (article) => {
    const content = (article.title + ' ' + article.content).toLowerCase();
    if (content.includes('abletools') || content.includes('award')) return { label: 'Company News', color: 'bg-primary-gold text-black' };
    if (content.includes('technology') || content.includes('innovation')) return { label: 'Technology', color: 'bg-blue-500 text-white' };
    if (content.includes('rehabilitation') || content.includes('therapy')) return { label: 'Healthcare', color: 'bg-green-500 text-white' };
    if (content.includes('community') || content.includes('accessibility')) return { label: 'Community', color: 'bg-purple-500 text-white' };
    return { label: 'General News', color: 'bg-gray-500 text-white' };
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-64 mb-6" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-32 w-full mb-6" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
            <Link href="/newsroom">
              <Button style={{backgroundColor: '#ffeb3b', color: '#000'}} className="hover:opacity-90 transition-all duration-300">
                Back to Newsroom
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const category = getCategoryBadge(article);

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
              <BreadcrumbLink href="/newsroom">Newsroom</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Article Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/newsroom">
            <Button variant="outline" className="hover-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Newsroom
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={article.image || '/api/placeholder/1200/400'} 
            alt={article.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className={`${category.color} mb-3`}>
              {category.label}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{article.title}</h1>
            <div className="flex items-center gap-6 text-lg text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(article.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>AbleTools Team</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              {/* Article Meta */}
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-dark">AbleTools Editorial Team</p>
                      <p className="text-gray-custom text-sm">Published {formatDate(article.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hover-gold">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {article.excerpt || article.content.substring(0, 200) + '...'}
                </p>
                
                <div className="text-gray-700 leading-relaxed space-y-6">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Key Highlights */}
                <div className="bg-yellow-50 border-l-4 border-primary-gold p-6 rounded-r-lg my-8">
                  <h3 className="font-bold text-text-dark mb-4">Key Highlights:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Significant advancement in rehabilitation technology solutions</li>
                    <li>• Enhanced accessibility and user experience for patients</li>
                    <li>• Collaboration with healthcare professionals and institutions</li>
                    <li>• Commitment to improving quality of life for individuals with disabilities</li>
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h4 className="font-semibold text-text-dark mb-3">Related Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Rehabilitation Technology', 'Healthcare Innovation', 'Accessibility', 'AbleTools', 'Medical Equipment'].map((tag) => (
                    <Badge key={tag} variant="outline" className="hover:bg-primary-gold hover:text-black transition-colors cursor-pointer">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>

            {/* Share Section */}
            <Card className="p-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary-gold" />
                  Share This Article
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <img 
                        src="/api/placeholder/200/120" 
                        alt="Related article"
                        className="w-full h-20 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-medium text-sm text-text-dark line-clamp-2 mb-1">
                        Related Rehabilitation Technology Update {i}
                      </h4>
                      <p className="text-xs text-gray-custom">2 days ago</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Media Inquiries</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Need more information about this story?
                </p>
                <Link href="/contact">
                  <Button 
                    style={{backgroundColor: '#ffeb3b', color: '#000'}}
                    className="w-full hover:opacity-90 transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  Get the latest news and updates from AbleTools directly to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold"
                  />
                  <Button 
                    style={{backgroundColor: '#ffeb3b', color: '#000'}}
                    className="w-full hover:opacity-90 transition-all duration-300"
                  >
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}