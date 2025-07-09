import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, Clock, Euro, GraduationCap, Award, BookOpen, Target } from 'lucide-react';

export default function Seminars() {
  const { data: allSeminars = [], isLoading } = useQuery({
    queryKey: ['/api/seminars'],
  });

  // Filter seminars and training based on type
  const educationalSeminars = allSeminars.filter(item => item.type === 'seminar');
  const trainingCourses = allSeminars.filter(item => item.type === 'training');

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const SeminarCard = ({ seminar, type }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md group">
      <div className="relative overflow-hidden">
        <img 
          src={seminar.image || '/api/placeholder/400/200'} 
          alt={seminar.title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          className={`absolute top-4 right-4 ${type === 'seminar' ? 'bg-primary-gold text-black' : 'bg-blue-500 text-white'}`}
        >
          {type === 'seminar' ? 'Educational' : 'Certification'}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-dark line-clamp-2 group-hover:text-primary-gold transition-colors">
          {seminar.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-custom mb-4 line-clamp-3">
          {seminar.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-custom">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDateShort(seminar.date)}
          </div>
          <div className="flex items-center text-sm text-gray-custom">
            <MapPin className="w-4 h-4 mr-2" />
            {seminar.location}
          </div>
          <div className="flex items-center text-sm text-gray-custom">
            <Users className="w-4 h-4 mr-2" />
            Max {seminar.maxParticipants} participants
          </div>
          {seminar.fee && (
            <div className="flex items-center text-sm text-gray-custom">
              <Euro className="w-4 h-4 mr-2" />
              {seminar.fee}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            style={{backgroundColor: type === 'seminar' ? '#ffeb3b' : '#3b82f6', color: type === 'seminar' ? '#000' : '#fff'}}
            className="hover:opacity-90 transition-all duration-300 font-semibold flex-1"
          >
            {type === 'seminar' ? 'Register Now' : 'Get Certified'}
          </Button>
          <Link href={`/seminars/${seminar.id}`}>
            <Button variant="outline" className="hover-gold">
              Learn More
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
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-primary-gold text-black px-4 py-2 rounded-full text-sm font-medium">
              Professional Development
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-dark">Education & Training</h1>
          <p className="text-xl text-gray-custom max-w-3xl mx-auto leading-relaxed">
            Enhance your knowledge and skills with our comprehensive training programs and educational seminars designed for healthcare professionals and caregivers.
          </p>
        </div>

        {/* Educational Seminars Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-gold rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Educational Seminars</h2>
            <p className="text-lg text-gray-custom max-w-2xl mx-auto">
              Join our educational seminars to stay updated with the latest research, techniques, and best practices in rehabilitation and healthcare.
            </p>
          </div>

          {educationalSeminars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {educationalSeminars.map((seminar) => (
                <SeminarCard key={seminar.id} seminar={seminar} type="seminar" />
              ))}
            </div>
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-text-dark">No Educational Seminars Available</h3>
                <p className="text-gray-custom mb-6">
                  We're currently planning our next series of educational seminars. Check back soon or contact us for more information.
                </p>
                <Link href="/contact">
                  <Button style={{backgroundColor: '#ffeb3b', color: '#000'}} className="hover:opacity-90 transition-all duration-300 font-semibold">
                    Contact Us for Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Professional Training Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Professional Training</h2>
            <p className="text-lg text-gray-custom max-w-2xl mx-auto">
              Get certified with our hands-on training courses designed to provide practical skills and professional certifications.
            </p>
          </div>

          {trainingCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingCourses.map((training) => (
                <SeminarCard key={training.id} seminar={training} type="training" />
              ))}
            </div>
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-text-dark">No Training Courses Available</h3>
                <p className="text-gray-custom mb-6">
                  We're currently developing our professional training programs. Check back soon or contact us for more information.
                </p>
                <Link href="/contact">
                  <Button style={{backgroundColor: '#3b82f6', color: '#fff'}} className="hover:opacity-90 transition-all duration-300 font-semibold">
                    Contact Us for Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary-gold to-yellow-500 text-black">
            <CardContent className="py-16">
              <Target className="w-16 h-16 mx-auto mb-6 text-black" />
              <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of healthcare professionals who have enhanced their skills through our educational programs. Take the next step in your professional development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold px-8 py-3">
                    Get More Information
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-semibold px-8 py-3">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}