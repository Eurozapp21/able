import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Search } from 'lucide-react';

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['/api/events'],
  });

  const { data: recentEvents = [] } = useQuery({
    queryKey: ['/api/events', { recent: true }],
  });

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (event.excerpt && event.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (event.content && event.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const EventCard = ({ event, featured = false }: { event: any, featured?: boolean }) => (
    <Card className={`hover-lift ${featured ? 'euz_bgyelo border-2 border-primary' : ''}`}>
      <div className="relative">
        <img
          src={event.image || '/api/placeholder/400/200'}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-text-dark">
            Featured
          </Badge>
        )}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-secondary-green text-white">
            {formatDate(event.date)}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-text-dark">{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-custom mb-4 leading-relaxed">
          {event.excerpt || truncateText(event.content || '', 150)}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-custom">
            <Clock className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          
          <Link href={`/events/${event.id}`}>
            <Button className="btn-read">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-6 w-64 mb-6" />
          <Skeleton className="h-12 w-96 mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark">Newsroom</h1>
            <p className="text-xl text-gray-custom max-w-2xl">
              Stay updated with the latest news, innovations, and developments in rehabilitation technology and healthcare solutions.
            </p>
          </div>
          
          {/* Search */}
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 min-w-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Featured Event */}
        {recentEvents.length > 0 && !searchQuery && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-text-dark">Featured News</h2>
            <Card className="euz_bgyelo">
              <div className="grid lg:grid-cols-2 gap-8 p-6">
                <div>
                  <img
                    src={recentEvents[0].image || '/api/placeholder/600/300'}
                    alt={recentEvents[0].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <Badge className="bg-primary text-text-dark w-fit mb-4">
                    Latest News
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4 text-text-dark">
                    {recentEvents[0].title}
                  </h3>
                  <p className="text-gray-custom mb-6 leading-relaxed">
                    {recentEvents[0].excerpt || truncateText(recentEvents[0].content || '', 200)}
                  </p>
                  <div className="flex items-center mb-6">
                    <Calendar className="w-5 h-5 mr-3 text-gray-custom" />
                    <span className="text-gray-custom">{formatDate(recentEvents[0].date)}</span>
                  </div>
                  <Link href={`/events/${recentEvents[0].id}`}>
                    <Button className="btn-cardbutn w-fit">
                      Read Full Article
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Events Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-dark">
              {searchQuery ? `Search Results (${filteredEvents.length})` : 'All News & Events'}
            </h2>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  featured={!searchQuery && index === 0 && recentEvents.length === 0}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                {searchQuery ? (
                  <>
                    <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">No Results Found</h3>
                    <p className="text-gray-custom mb-6">
                      No news articles match your search for "{searchQuery}". Try different keywords or browse all articles.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery('')}
                      className="hover-gold"
                    >
                      Clear Search
                    </Button>
                  </>
                ) : (
                  <>
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2 text-text-dark">No News Available</h3>
                    <p className="text-gray-custom mb-6">
                      We're working on bringing you the latest news and updates. Check back soon for exciting developments in rehabilitation technology.
                    </p>
                    <Link href="/contact">
                      <Button className="btn-cardbutn">
                        Contact Us for Updates
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </section>

        {/* Newsletter CTA */}
        {!searchQuery && (
          <section className="mt-16">
            <Card className="bg-secondary-green text-white">
              <CardContent className="text-center py-12">
                <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
                <p className="text-lg mb-6 max-w-2xl mx-auto">
                  Subscribe to our newsletter to receive the latest news, product updates, and industry insights directly in your inbox.
                </p>
                <Link href="/">
                  <Button className="bg-white text-secondary-green hover:bg-gray-100">
                    Subscribe to Newsletter
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
