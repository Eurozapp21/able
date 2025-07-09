import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, Clock, Euro, Award, BookOpen, Download, Mail, User, Target, CheckCircle } from 'lucide-react';

export default function SeminarDetail() {
  const { id } = useParams();
  
  const { data: seminar, isLoading } = useQuery({
    queryKey: ['/api/seminars', id],
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

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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

  if (!seminar) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Seminar Not Found</h2>
            <p className="text-gray-600 mb-6">The seminar you're looking for doesn't exist.</p>
            <Link href="/seminars">
              <Button style={{backgroundColor: '#ffeb3b', color: '#000'}} className="hover:opacity-90 transition-all duration-300">
                Back to Education
              </Button>
            </Link>
          </CardContent>
        </Card>
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
              <BreadcrumbLink href="/seminars">Education</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Seminar Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-lg">
          <img 
            src={seminar.image || '/api/placeholder/1200/400'} 
            alt={seminar.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="bg-primary-gold text-black mb-3">
              {seminar.type === 'seminar' ? 'Educational Seminar' : 'Professional Training'}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{seminar.title}</h1>
            <p className="text-lg text-gray-200">
              {formatDate(seminar.date)} | Duration: {seminar.duration || '1 day'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Course Details</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-primary-gold" />
                      Course Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {seminar.description}
                    </p>
                    
                    <div className="bg-yellow-50 border-l-4 border-primary-gold p-4 rounded-r-lg">
                      <h4 className="font-semibold text-text-dark mb-2">Key Highlights:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-gold mt-0.5 flex-shrink-0" />
                          Evidence-based research and latest industry practices
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-gold mt-0.5 flex-shrink-0" />
                          Interactive workshops and hands-on learning experience
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-gold mt-0.5 flex-shrink-0" />
                          Professional certification upon completion
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary-gold mt-0.5 flex-shrink-0" />
                          Networking opportunities with industry professionals
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary-gold" />
                      Who Should Attend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">
                      This {seminar.type === 'seminar' ? 'seminar' : 'training course'} is designed for:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'Physical Therapists',
                        'Occupational Therapists', 
                        'Speech Pathologists',
                        'Rehabilitation Specialists',
                        'Healthcare Professionals',
                        'Medical Equipment Specialists',
                        'Special Education Teachers',
                        'Healthcare Students'
                      ].map((profession, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
                          {profession}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Objectives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">Upon completion of this course, participants will be able to:</p>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-gold text-black rounded-full flex items-center justify-center text-sm font-bold">1</span>
                        Demonstrate comprehensive understanding of rehabilitation assessment techniques and methodologies
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-gold text-black rounded-full flex items-center justify-center text-sm font-bold">2</span>
                        Apply evidence-based intervention strategies in clinical practice settings
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-gold text-black rounded-full flex items-center justify-center text-sm font-bold">3</span>
                        Identify key developmental milestones and treatment protocols
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-gold text-black rounded-full flex items-center justify-center text-sm font-bold">4</span>
                        Implement specialized equipment and technological solutions effectively
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-gold text-black rounded-full flex items-center justify-center text-sm font-bold">5</span>
                        Develop individualized treatment plans for diverse patient populations
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-l-4 border-primary-gold pl-4">
                        <h4 className="font-semibold text-text-dark">Day 1: Introduction & Assessment</h4>
                        <p className="text-gray-600">Fundamentals and comprehensive assessment methodologies</p>
                      </div>
                      <div className="border-l-4 border-gray-300 pl-4">
                        <h4 className="font-semibold text-text-dark">Day 2: Intervention Strategies</h4>
                        <p className="text-gray-600">Evidence-based treatment approaches and protocols</p>
                      </div>
                      <div className="border-l-4 border-gray-300 pl-4">
                        <h4 className="font-semibold text-text-dark">Day 3: Hands-on Practice</h4>
                        <p className="text-gray-600">Practical application and case study analysis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="speakers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Speakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-text-dark">{seminar.speaker || 'Dr. Expert Speaker'}</h4>
                          <p className="text-primary-gold font-medium">Lead Instructor & Rehabilitation Specialist</p>
                          <p className="text-gray-600 mt-2">
                            Renowned expert in rehabilitation medicine with over 15 years of clinical experience and research in advanced therapeutic techniques.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-6 h-6 text-primary-gold" />
                      Course Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Course Brochure</h4>
                            <p className="text-sm text-gray-600">Detailed seminar information</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover-gold">
                          Download
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Course Agenda</h4>
                            <p className="text-sm text-gray-600">Detailed schedule and topics</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover-gold">
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Download className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Useful Information</h4>
                            <p className="text-sm text-gray-600">Practical guidelines and requirements</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="hover-gold">
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-center">Registration Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-gold mb-2">
                    {seminar.fee || '€195'}
                  </div>
                  <p className="text-gray-600">Per participant</p>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-primary-gold" />
                    <div>
                      <p className="font-medium">{formatDateShort(seminar.date)}</p>
                      <p className="text-sm text-gray-600">Start Date</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-primary-gold" />
                    <div>
                      <p className="font-medium">{seminar.location}</p>
                      <p className="text-sm text-gray-600">Venue</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-primary-gold" />
                    <div>
                      <p className="font-medium">Max {seminar.maxParticipants} participants</p>
                      <p className="text-sm text-gray-600">Limited seats</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-primary-gold" />
                    <div>
                      <p className="font-medium">{seminar.duration || '3 days'}</p>
                      <p className="text-sm text-gray-600">Duration</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    style={{backgroundColor: '#ffeb3b', color: '#000'}}
                    className="w-full hover:opacity-90 transition-all duration-300 font-bold py-3"
                  >
                    Register Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full hover-gold"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact for Info
                  </Button>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Early bird discount available until 30 days before the seminar date.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need More Information?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-gray-700">
                  <p>For more information about this seminar, please contact us:</p>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-gold" />
                    <a href="mailto:education@abletools.com.cy" className="text-primary-gold hover:underline">
                      education@abletools.com.cy
                    </a>
                  </div>
                  
                  <div className="pt-3">
                    <Link href="/contact">
                      <Button variant="outline" className="w-full hover-gold">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}