import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Search, Clock, User, ArrowRight, TrendingUp, Award, Newspaper, Globe } from 'lucide-react';

// Helper to get static data when available
const getStaticData = (key: string) => {
  if (typeof window !== 'undefined' && (window as any).ABLETOOLS_DATA) {
    return (window as any).ABLETOOLS_DATA[key] || [];
  }
  return [];
};

export default function Newsroom() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const staticEvents = getStaticData('newsArticles');

  const { data: allEvents = staticEvents, isLoading } = useQuery({
    queryKey: ['/api/events'],
    enabled: staticEvents.length === 0,
  });

  // Filter and categorize news articles
  const filteredNews = allEvents.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    // Categorize based on content keywords
    const content = (article.title + ' ' + article.content).toLowerCase();
    switch (selectedCategory) {
      case 'company': return matchesSearch && (content.includes('abletools') || content.includes('award') || content.includes('milestone'));
      case 'technology': return matchesSearch && (content.includes('technology') || content.includes('innovation') || content.includes('research'));
      case 'healthcare': return matchesSearch && (content.includes('rehabilitation') || content.includes('therapy') || content.includes('medical'));
      case 'community': return matchesSearch && (content.includes('community') || content.includes('accessibility') || content.includes('partnership'));
      default: return matchesSearch;
    }
  });

  const recentNews = filteredNews.slice(0, 3);
  const featuredArticle = filteredNews[0];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getCategoryBadge = (article) => {
    const content = (article.title + ' ' + article.content).toLowerCase();
    if (content.includes('abletools') || content.includes('award')) return { label: 'Company News', color: 'bg-primary-gold text-black' };
    if (content.includes('technology') || content.includes('innovation')) return { label: 'Technology', color: 'bg-blue-500 text-white' };
    if (content.includes('rehabilitation') || content.includes('therapy')) return { label: 'Healthcare', color: 'bg-green-500 text-white' };
    if (content.includes('community') || content.includes('accessibility')) return { label: 'Community', color: 'bg-purple-500 text-white' };
    return { label: 'General News', color: 'bg-gray-500 text-white' };
  };

  const NewsCard = ({ article, featured = false }) => {
    const category = getCategoryBadge(article);
    
    return (
      <Card className={`hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 shadow-lg group bg-white rounded-2xl overflow-hidden ${featured ? 'lg:col-span-2' : ''}`}>
        <div className="relative overflow-hidden">
          <img 
            src={article.image || '/api/placeholder/600/300'} 
            alt={article.title}
            className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${featured ? 'h-80' : 'h-56'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Badge className={`absolute top-4 right-4 ${category.color} shadow-lg`}>
            {category.label}
          </Badge>
          <div className="absolute top-4 left-4">
            <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center shadow-lg">
              <Newspaper className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
        
        <CardHeader className={featured ? 'pb-3' : 'pb-2'}>
          <CardTitle className={`font-bold text-text-dark line-clamp-2 group-hover:text-primary-gold transition-colors duration-300 ${featured ? 'text-2xl' : 'text-xl'}`}>
            {article.title}
          </CardTitle>
          <div className="flex items-center text-sm text-gray-custom mt-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDateShort(article.date)}</span>
            <div className="ml-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>5 min read</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className={`text-gray-custom mb-6 line-clamp-3 leading-relaxed ${featured ? 'text-lg' : ''}`}>
            {article.excerpt || truncateText(article.content, featured ? 300 : 150)}
          </p>
          
          <div className="flex items-center justify-between">
            <Link href={`/news/${article.id}`}>
              <Button 
                variant="outline"
                className="hover-gold group-hover:scale-105 transition-all duration-300 font-medium"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center text-sm text-gray-custom">
              <User className="w-4 h-4 mr-1" />
              <span>AbleTools Team</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-64 mb-6" />
          <Skeleton className="h-12 w-96 mb-8" />
          <div className="grid lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
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
              <BreadcrumbPage>Newsroom</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark">Newsroom</h1>
            <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
          <p className="text-xl text-gray-custom max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest news, innovations, and developments in rehabilitation technology, 
            healthcare solutions, and AbleTools company updates.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <Newspaper className="w-6 h-6 text-black" />
              </div>
              <div className="text-2xl font-bold text-text-dark">{allEvents.length}</div>
              <div className="text-gray-custom">Total Articles</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-text-dark">50+</div>
              <div className="text-gray-custom">Technology Updates</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-text-dark">25+</div>
              <div className="text-gray-custom">Company Milestones</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="text-center py-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-text-dark">15+</div>
              <div className="text-gray-custom">Community Initiatives</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search news articles, press releases, company updates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="company">Company News</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Article */}
        {featuredArticle && !searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-text-dark flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-gold" />
              Featured Story
            </h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <NewsCard article={featuredArticle} featured={true} />
            </div>
          </section>
        )}

        {/* News Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-dark">
              {searchQuery || selectedCategory !== 'all' 
                ? `Search Results (${filteredNews.length})` 
                : 'Latest News & Updates'
              }
            </h2>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {filteredNews.slice(featuredArticle && !searchQuery ? 1 : 0).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                {searchQuery || selectedCategory !== 'all' ? (
                  <>
                    <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">No Results Found</h3>
                    <p className="text-gray-custom mb-6">
                      No articles match your search criteria. Try different keywords or browse all articles.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery('')}
                        className="hover-gold"
                      >
                        Clear Search
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedCategory('all')}
                        className="hover-gold"
                      >
                        All Categories
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Newspaper className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">No News Available</h3>
                    <p className="text-gray-custom mb-6">
                      Stay tuned for upcoming news and updates from AbleTools.
                    </p>
                    <Link href="/contact">
                      <Button style={{backgroundColor: '#ffeb3b', color: '#000'}} className="hover:opacity-90 transition-all duration-300">
                        Contact Us for News Inquiries
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </section>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-xl">
          <CardContent className="py-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest updates on rehabilitation technology, company news, and industry developments 
              delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-white text-black"
              />
              <Button 
                style={{backgroundColor: '#ffeb3b', color: '#000'}}
                className="hover:opacity-90 transition-all duration-300 font-bold whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}