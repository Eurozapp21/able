import { useRoute } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Phone, Mail, Star, Users, Clock, Target } from 'lucide-react';

export default function SolutionDetail() {
  const [, params] = useRoute('/solutions/:id');
  const solutionId = params?.id;

  const solutions = {
    '1': {
      title: "Sensory Integration Room",
      subtitle: "Therapeutic environments for sensory processing development",
      description: "Sensory integration rooms are specially designed environments that offer an opportunity for users to explore and develop their sensory processing abilities through structured activities and specialized equipment.",
      image: "/attached_assets/image_1752008837035.png",
      bgColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
      features: [
        "Proprioceptive equipment for body awareness",
        "Vestibular activities for balance and movement",
        "Tactile experiences for touch sensitivity",
        "Visual stimulation systems",
        "Auditory processing tools",
        "Safe, padded environments"
      ],
      benefits: [
        "Improved sensory processing abilities",
        "Enhanced motor skills development",
        "Better emotional regulation",
        "Increased focus and attention",
        "Reduced sensory sensitivities",
        "Social interaction opportunities"
      ],
      equipment: [
        "Suspended equipment (swings, hammocks)",
        "Crash mats and ball pools",
        "Weighted blankets and vests",
        "Textured surfaces and materials",
        "Balance boards and platforms",
        "Climbing structures"
      ],
      applications: [
        "Occupational therapy clinics",
        "Special education schools",
        "Rehabilitation centers",
        "Pediatric hospitals",
        "Autism support centers",
        "Early intervention programs"
      ]
    },
    '2': {
      title: "Multi-sensory Room",
      subtitle: "Immersive environments for therapeutic experiences",
      description: "Multi-sensory rooms are spaces developing the user's senses by immersive environments. Using specialized equipment and lighting to create therapeutic experiences that engage multiple senses simultaneously.",
      image: "/attached_assets/image_1752033910480.png",
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600",
      features: [
        "Interactive fiber optic lighting",
        "Bubble tubes with changing colors",
        "Projection systems for walls and floors",
        "Sound therapy equipment",
        "Aromatherapy diffusion systems",
        "Touch-activated controls"
      ],
      benefits: [
        "Stress reduction and relaxation",
        "Enhanced communication skills",
        "Improved cognitive function",
        "Better sleep patterns",
        "Reduced anxiety and agitation",
        "Increased social engagement"
      ],
      equipment: [
        "LED strip lighting systems",
        "Water beds and vibrating platforms",
        "Mirror balls and spotlights",
        "Interactive projection units",
        "Wireless control systems",
        "Comfortable seating options"
      ],
      applications: [
        "Dementia care facilities",
        "Learning disability centers",
        "Mental health clinics",
        "Pediatric therapy centers",
        "Hospice care environments",
        "Wellness centers"
      ]
    },
    '3': {
      title: "Immersive Reality Room",
      subtitle: "Virtual reality environments for therapy and education",
      description: "Immersive reality sensory rooms provide a virtual reality environment that creates alternative worlds for therapeutic and educational purposes, offering limitless possibilities for engagement and learning.",
      image: "/attached_assets/image_1751996976633.png",
      bgColor: "bg-gradient-to-r from-green-600 to-teal-600",
      features: [
        "360-degree projection systems",
        "Motion sensor technology",
        "Interactive floor and wall displays",
        "Customizable virtual environments",
        "Real-time response systems",
        "Multi-user capabilities"
      ],
      benefits: [
        "Enhanced motivation and engagement",
        "Safe environment for skill practice",
        "Customizable difficulty levels",
        "Real-time progress tracking",
        "Reduced therapy resistance",
        "Improved learning outcomes"
      ],
      equipment: [
        "High-resolution projectors",
        "Motion tracking cameras",
        "Interactive software platforms",
        "Surround sound systems",
        "Haptic feedback devices",
        "Environmental controls"
      ],
      applications: [
        "Neurorehabilitation centers",
        "Cognitive therapy clinics",
        "Physical therapy facilities",
        "Educational institutions",
        "Research facilities",
        "Pain management centers"
      ]
    }
  };

  const solution = solutions[solutionId as keyof typeof solutions];

  if (!solution) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-dark mb-4">Solution Not Found</h1>
          <p className="text-gray-custom mb-8">The solution you're looking for doesn't exist.</p>
          <Button asChild>
            <a href="/solutions">Back to Solutions</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className={`relative h-96 ${solution.bgColor} overflow-hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{solution.title}</h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-6">{solution.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                style={{backgroundColor: '#ffeb3b', color: '#000'}}
                className="hover:opacity-90 transition-opacity"
              >
                Get Free Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild className="text-gray-custom hover:text-primary-gold">
            <a href="/solutions" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Solutions
            </a>
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/solutions">Solutions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{solution.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-black" />
                  </div>
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <img 
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <p className="text-gray-custom leading-relaxed text-lg">{solution.description}</p>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solution.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark">Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solution.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment & Technology */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark">Equipment & Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {solution.equipment.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-2 h-2 bg-primary-gold rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark">Ideal Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {solution.applications.map((application, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-2 text-sm">
                      {application}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-50 to-amber-50 border-l-4 border-primary-gold">
              <CardHeader>
                <CardTitle className="text-xl text-text-dark">Get Expert Consultation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-custom">
                  Our specialists are ready to help you design the perfect solution for your specific needs.
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full"
                    style={{backgroundColor: '#ffeb3b', color: '#000'}}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call for Consultation
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Enquiry
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl text-text-dark">Why Choose AbleTools?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Expert Team</h4>
                    <p className="text-sm text-gray-custom">Specialized professionals with years of experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Quality Assurance</h4>
                    <p className="text-sm text-gray-custom">Premium materials and rigorous testing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark">Ongoing Support</h4>
                    <p className="text-sm text-gray-custom">Training and maintenance included</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Project Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Projects Completed:</span>
                    <span className="font-bold text-primary-gold">150+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Countries Served:</span>
                    <span className="font-bold text-primary-gold">25+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Satisfaction:</span>
                    <span className="font-bold text-primary-gold">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Years Experience:</span>
                    <span className="font-bold text-primary-gold">15+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team today for a personalized consultation and discover how we can transform your space with our {solution.title.toLowerCase()} solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              style={{backgroundColor: '#ffeb3b', color: '#000'}}
              className="hover:opacity-90 transition-opacity"
            >
              Schedule Consultation
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}