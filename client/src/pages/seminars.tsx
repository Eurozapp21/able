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
    <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-0 shadow-lg group bg-white rounded-2xl overflow-hidden">
      <div className="relative overflow-hidden">
        <img 
          src={seminar.image || '/api/placeholder/400/250'} 
          alt={seminar.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Badge 
          className={`absolute top-4 right-4 ${type === 'seminar' ? 'bg-primary-gold text-black' : 'bg-blue-500 text-white'} shadow-lg`}
        >
          {type === 'seminar' ? 'Educational' : 'Certification'}
        </Badge>
        <div className="absolute top-4 left-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'seminar' ? 'bg-primary-gold' : 'bg-blue-500'} shadow-lg`}>
            {type === 'seminar' ? (
              <BookOpen className="w-5 h-5 text-black" />
            ) : (
              <Award className="w-5 h-5 text-white" />
            )}
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-text-dark line-clamp-2 group-hover:text-primary-gold transition-colors duration-300">
          {seminar.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-custom mb-6 line-clamp-3 leading-relaxed">
          {seminar.description}
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-custom bg-gray-50 p-2 rounded-lg">
            <Calendar className="w-4 h-4 mr-3 flex-shrink-0" />
            <span className="font-medium">{formatDateShort(seminar.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-custom bg-gray-50 p-2 rounded-lg">
            <MapPin className="w-4 h-4 mr-3 flex-shrink-0" />
            <span>{seminar.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-custom">
              <Users className="w-4 h-4 mr-2" />
              <span>Max {seminar.maxParticipants}</span>
            </div>
            {seminar.fee && (
              <div className="flex items-center text-sm font-bold text-primary-gold">
                <Euro className="w-4 h-4 mr-1" />
                <span>{seminar.fee}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            style={{backgroundColor: type === 'seminar' ? '#ffeb3b' : '#3b82f6', color: type === 'seminar' ? '#000' : '#fff'}}
            className="hover:opacity-90 hover:scale-105 transition-all duration-300 font-bold flex-1 py-3 rounded-xl shadow-lg"
          >
            {type === 'seminar' ? 'Register Now' : 'Get Certified'}
          </Button>
          <Link href={`/seminars/${seminar.id}`}>
            <Button variant="outline" className="hover:bg-gray-100 transition-all duration-300 px-4 py-3 rounded-xl border-2">
              <Clock className="w-4 h-4" />
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
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/10 to-blue-500/10"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "60px 60px"}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/70 hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Education</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-black" />
              </div>
              <span className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium border border-white/20">
                Professional Development
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Education & Training
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Advance your career with our comprehensive educational programs designed for healthcare professionals and rehabilitation specialists.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-gold mb-2">
                  {educationalSeminars.length}
                </div>
                <div className="text-gray-300">Educational Seminars</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {trainingCourses.length}
                </div>
                <div className="text-gray-300">Training Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  500+
                </div>
                <div className="text-gray-300">Professionals Trained</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-12 relative z-20">

        {/* Educational Seminars Section */}
        <section className="mb-24">
          <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-gold to-yellow-500 p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
                  <BookOpen className="w-10 h-10 text-black" />
                </div>
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-black mb-2">Educational Seminars</h2>
                  <p className="text-black/80 text-lg">Research-Based Learning</p>
                </div>
              </div>
              <p className="text-center text-black/90 text-xl max-w-3xl mx-auto leading-relaxed">
                Stay at the forefront of rehabilitation science with our evidence-based seminars led by industry experts and research professionals.
              </p>
            </div>

            <CardContent className="p-8">
              {educationalSeminars.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {educationalSeminars.map((seminar, index) => (
                    <div key={seminar.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                      <SeminarCard seminar={seminar} type="seminar" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-text-dark">No Educational Seminars Available</h3>
                  <p className="text-gray-custom mb-8 text-lg max-w-md mx-auto">
                    We're developing new educational content. Be the first to know when seminars become available.
                  </p>
                  <Link href="/contact">
                    <Button style={{backgroundColor: '#ffeb3b', color: '#000'}} className="hover:opacity-90 transition-all duration-300 font-semibold px-8 py-3 text-lg">
                      Get Notified
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Professional Training Section */}
        <section className="mb-24">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Professional Training</h2>
                  <p className="text-white/90 text-lg">Hands-On Certification</p>
                </div>
              </div>
              <p className="text-center text-white/95 text-xl max-w-3xl mx-auto leading-relaxed">
                Master practical skills with our comprehensive certification programs designed for immediate workplace application.
              </p>
            </div>

            <CardContent className="p-8">
              {trainingCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {trainingCourses.map((training, index) => (
                    <div key={training.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                      <SeminarCard seminar={training} type="training" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-text-dark">No Training Courses Available</h3>
                  <p className="text-gray-custom mb-8 text-lg max-w-md mx-auto">
                    Professional certification programs are in development. Join our waitlist for early access.
                  </p>
                  <Link href="/contact">
                    <Button style={{backgroundColor: '#3b82f6', color: '#fff'}} className="hover:opacity-90 transition-all duration-300 font-semibold px-8 py-3 text-lg">
                      Join Waitlist
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-0 shadow-2xl rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-gold/20 to-blue-500/20"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-repeat" style={{backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "60px 60px"}}></div>
            </div>
            
            <CardContent className="py-20 relative z-10">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-primary-gold rounded-full flex items-center justify-center">
                  <Target className="w-10 h-10 text-black" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join over 500 healthcare professionals who have advanced their careers through our comprehensive educational programs.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <GraduationCap className="w-8 h-8 text-primary-gold mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Expert-Led Sessions</h3>
                  <p className="text-gray-300 text-sm">Learn from industry leaders</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Award className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Professional Certification</h3>
                  <p className="text-gray-300 text-sm">Recognized credentials</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Networking Opportunities</h3>
                  <p className="text-gray-300 text-sm">Connect with peers</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact">
                  <Button className="bg-primary-gold text-black hover:bg-yellow-400 transition-all duration-300 font-bold px-10 py-4 text-lg rounded-xl">
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 font-bold px-10 py-4 text-lg rounded-xl">
                    Learn About AbleTools
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