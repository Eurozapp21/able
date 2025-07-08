import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, Clock, Euro } from 'lucide-react';

export default function Seminars() {
  const { data: allSeminars = [], isLoading } = useQuery({
    queryKey: ['/api/seminars'],
  });

  const { data: upcomingSeminars = [] } = useQuery({
    queryKey: ['/api/seminars', { upcoming: true }],
  });

  const pastSeminars = allSeminars.filter(seminar => 
    new Date(seminar.date) < new Date()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const SeminarCard = ({ seminar, isUpcoming = false }: { seminar: any, isUpcoming?: boolean }) => (
    <Card className="hover-lift">
      <div className="relative">
        <img
          src={seminar.image || '/api/placeholder/400/200'}
          alt={seminar.title}
          className="w-full h-48 object-cover"
        />
        {isUpcoming && (
          <Badge className="absolute top-4 left-4 bg-secondary-green text-white">
            Upcoming
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-text-dark">{seminar.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-custom mb-4 line-clamp-3">{seminar.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-custom">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(seminar.date)}
          </div>
          
          {seminar.location && (
            <div className="flex items-center text-sm text-gray-custom">
              <MapPin className="w-4 h-4 mr-2" />
              {seminar.location}
            </div>
          )}
          
          {seminar.speaker && (
            <div className="flex items-center text-sm text-gray-custom">
              <Users className="w-4 h-4 mr-2" />
              Speaker: {seminar.speaker}
            </div>
          )}
          
          {seminar.maxParticipants && (
            <div className="flex items-center text-sm text-gray-custom">
              <Clock className="w-4 h-4 mr-2" />
              Max {seminar.maxParticipants} participants
            </div>
          )}
          
          {seminar.fee && (
            <div className="flex items-center text-sm text-gray-custom">
              <Euro className="w-4 h-4 mr-2" />
              {seminar.fee}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/seminars/${seminar.id}`}>
            <Button variant="outline" className="hover-gold">
              Learn More
            </Button>
          </Link>
          
          {isUpcoming && (
            <Button className="btn-cardbutn">
              Register Now
            </Button>
          )}
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
              <BreadcrumbPage>Education</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark">Education & Training</h1>
          <p className="text-xl text-gray-custom max-w-3xl mx-auto">
            Enhance your knowledge and skills with our comprehensive training programs and educational seminars designed for healthcare professionals and caregivers.
          </p>
        </div>

        {/* Featured Upcoming Seminar */}
        {upcomingSeminars.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-text-dark">Next Upcoming Seminar</h2>
            <Card className="euz_bgyelo">
              <div className="grid lg:grid-cols-2 gap-8 p-6">
                <div>
                  <img
                    src={upcomingSeminars[0].image || '/api/placeholder/600/300'}
                    alt={upcomingSeminars[0].title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <Badge className="bg-secondary-green text-white w-fit mb-4">
                    Featured Seminar
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4 text-text-dark">
                    {upcomingSeminars[0].title}
                  </h3>
                  <p className="text-gray-custom mb-6 leading-relaxed">
                    {upcomingSeminars[0].description}
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-custom">
                      <Calendar className="w-5 h-5 mr-3" />
                      {formatDate(upcomingSeminars[0].date)}
                    </div>
                    {upcomingSeminars[0].location && (
                      <div className="flex items-center text-gray-custom">
                        <MapPin className="w-5 h-5 mr-3" />
                        {upcomingSeminars[0].location}
                      </div>
                    )}
                    {upcomingSeminars[0].fee && (
                      <div className="flex items-center text-gray-custom">
                        <Euro className="w-5 h-5 mr-3" />
                        {upcomingSeminars[0].fee}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Button className="btn-cardbutn">
                      Register Now
                    </Button>
                    <Link href={`/seminars/${upcomingSeminars[0].id}`}>
                      <Button variant="outline" className="hover-gold">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Seminars Tabs */}
        <Tabs defaultValue="upcoming" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming Seminars</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingSeminars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingSeminars.map((seminar) => (
                  <SeminarCard key={seminar.id} seminar={seminar} isUpcoming={true} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2 text-text-dark">No Upcoming Seminars</h3>
                  <p className="text-gray-custom mb-6">
                    We're currently planning our next series of educational seminars. Check back soon or contact us for more information.
                  </p>
                  <Link href="/contact">
                    <Button className="btn-cardbutn">
                      Contact Us for Updates
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastSeminars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastSeminars.map((seminar) => (
                  <SeminarCard key={seminar.id} seminar={seminar} isUpcoming={false} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2 text-text-dark">No Past Events</h3>
                  <p className="text-gray-custom">
                    Our seminar archive will appear here as we build our educational program history.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <section>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Want to Host a Custom Training?</h2>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                We can organize specialized training sessions tailored to your organization's specific needs. 
                Contact us to discuss custom educational programs.
              </p>
              <Link href="/contact">
                <Button className="btn-customlogin">
                  Request Custom Training
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
