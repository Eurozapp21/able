import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Brain, Home, Car, Wrench, Star, CheckCircle, ArrowRight, Lightbulb, Award, Users, Phone, Mail } from 'lucide-react';

export default function Solutions() {
  const services = [
    {
      icon: Brain,
      title: "Therapy Spaces",
      description: "Complete therapeutic spaces for occupational therapists and physiotherapists from scratch to completion.",
      features: [
        "Sensory integration rooms",
        "Multi-sensory environments", 
        "Immersive reality rooms",
        "Outdoor sensory areas",
        "Custom design and construction"
      ],
      color: "bg-primary-gold",
      gradientFrom: "from-yellow-50",
      gradientTo: "to-amber-50"
    },
    {
      icon: Home,
      title: "Accessible Houses",
      description: "Creating and modifying spaces to achieve independent living for people with disabilities.",
      features: [
        "Accessible kitchens",
        "Adapted bedrooms",
        "Barrier-free bathrooms",
        "Universal design principles",
        "Individual lifestyle needs"
      ],
      color: "bg-primary-gold",
      gradientFrom: "from-yellow-50",
      gradientTo: "to-amber-50"
    },
    {
      icon: Car,
      title: "Accessible Vehicles",
      description: "Vehicle adaptations and modifications to ensure mobility rights for everyone.",
      features: [
        "Driving adaptations",
        "Wheelchair access systems",
        "Hand controls installation",
        "Transfer solutions",
        "Safety modifications"
      ],
      color: "bg-primary-gold",
      gradientFrom: "from-yellow-50",
      gradientTo: "to-amber-50"
    },
    {
      icon: Wrench,
      title: "On Demand Furniture",
      description: "Customized furniture design and construction for personal and therapy spaces.",
      features: [
        "Personalized designs",
        "Therapy-specific furniture",
        "Ergonomic solutions",
        "Quality craftsmanship",
        "Individual adaptations"
      ],
      color: "bg-primary-gold",
      gradientFrom: "from-yellow-50",
      gradientTo: "to-amber-50"
    }
  ];

  const solutionCategories = [
    {
      id: 1,
      title: "Sensory Integration Room",
      description: "Sensory integration rooms are specially designed environments that offer an opportunity for users to explore and develop their sensory processing abilities through structured activities.",
      image: "/attached_assets/image_1752008837035.png",
      features: ["Proprioceptive equipment", "Vestibular activities", "Tactile experiences", "Visual stimulation"],
      bgColor: "bg-gradient-to-r from-yellow-500 to-amber-500"
    },
    {
      id: 2,
      title: "Multi-sensory Room", 
      description: "Multi-sensory rooms are spaces developing the user's senses by immersive environments. Using specialized equipment and lighting to create therapeutic experiences.",
      image: "/attached_assets/image_1752033910480.png",
      features: ["Interactive lighting", "Fiber optics", "Sound therapy", "Aromatherapy systems"],
      bgColor: "bg-gradient-to-r from-yellow-500 to-amber-500"
    },
    {
      id: 3,
      title: "Immersive Reality Room",
      description: "Immersive reality sensory rooms provide a virtual reality environment that creates alternative worlds for therapeutic and educational purposes.",
      image: "/attached_assets/image_1751996976633.png", 
      features: ["VR technology", "Interactive projections", "Motion sensors", "Customizable environments"],
      bgColor: "bg-gradient-to-r from-yellow-500 to-amber-500"
    }
  ];



  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-br from-yellow-600 via-amber-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        
        {/* Geometric Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-300/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-6 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
              <Award className="w-5 h-5 text-yellow-200" />
              <span className="text-yellow-100 font-medium">Professional Solutions Since 2009</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform
              <span className="block text-yellow-200">Your Space</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed max-w-2xl">
              From initial consultation to final installation - we create accessible, therapeutic environments that enhance lives and empower independence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                View Our Portfolio
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-yellow-200 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">25+</div>
                <div className="text-yellow-200 text-sm">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-yellow-200 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-yellow-200 text-sm">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Solutions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Introduction Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center shadow-lg">
                <Lightbulb className="w-6 h-6 text-black" />
              </div>
              <h2 className="text-4xl font-bold text-text-dark">Our Approach</h2>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-4xl mx-auto">
              AbleTools creates customized design solutions, adapting to each client. Our specialized staff undertakes a wide range of projects, from design to construction and maintenance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border border-yellow-200 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Personalized Solutions</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We consider every project as a unique case-study, that needs to be addressed carefully, recognizing the needs, doing extensive research and finally providing our consultation or proposal.
                </p>
                <div className="inline-flex items-center gap-2 text-primary-gold font-bold text-xl">
                  <Star className="w-6 h-6" />
                  "Your ability to dream!"
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-black" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Comprehensive Assessment</h4>
                </div>
                <p className="text-gray-600 text-sm">Detailed analysis of your specific needs and requirements</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-black" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Custom Design</h4>
                </div>
                <p className="text-gray-600 text-sm">3D modeling and technical drawings tailored to your space</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-black" />
                  </div>
                  <h4 className="font-semibold text-gray-800">Professional Installation</h4>
                </div>
                <p className="text-gray-600 text-sm">Expert implementation with ongoing support and training</p>
              </div>
            </div>
          </div>
        </div>



        {/* Services Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions from concept to completion, tailored to your unique requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group shadow-xl border-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-7 h-7 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-text-dark group-hover:text-gray-900 transition-colors">
                        {service.title}
                      </CardTitle>
                      <div className="w-12 h-1 bg-primary-gold rounded-full mt-2"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">{service.description}</p>
                  <div className="space-y-4">
                    <h4 className="font-bold text-text-dark text-lg flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary-gold" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                          <CheckCircle className="w-5 h-5 text-primary-gold flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Solution Categories */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-dark mb-4">Specialized Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our range of therapeutic environments designed to enhance sensory experiences and support development
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutionCategories.map((category, index) => (
              <Card key={category.id} className="group shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 bg-white">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${category.bgColor} bg-opacity-90 flex items-center justify-center group-hover:bg-opacity-95 transition-all duration-300`}>
                    <div className="text-center px-6">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <span className="text-3xl font-bold text-white">{index + 1}</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold leading-tight">{category.title}</h3>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-gray-800">PREMIUM</span>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{category.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-text-dark text-lg flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-primary-gold" />
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary-gold rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full group bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <a href={`/solutions/${category.id}`}>
                      Explore Solution
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative overflow-hidden">
          <div className="bg-gradient-to-br from-yellow-600 via-amber-600 to-yellow-700 rounded-3xl p-12 text-center text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 mb-6 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <Award className="w-5 h-5 text-yellow-100" />
                <span className="text-yellow-100 font-medium">Start Your Project Today</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Transform 
                <span className="block text-yellow-100">Your Space?</span>
              </h2>
              
              <p className="text-xl mb-8 max-w-3xl mx-auto text-yellow-100 leading-relaxed">
                We support a holistic approach, from initial concept and 3D design to construction, maintenance, and comprehensive training. Let's bring your vision to life.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Free Consultation</h4>
                  <p className="text-yellow-100 text-sm">Expert advice tailored to your needs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Custom Design</h4>
                  <p className="text-yellow-100 text-sm">3D modeling and technical drawings</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h4 className="font-bold text-white mb-2">Full Support</h4>
                  <p className="text-yellow-100 text-sm">Installation, training & maintenance</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-yellow-600 hover:bg-yellow-50 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Get Free Consultation
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-yellow-600 font-bold px-8 py-4 text-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  View Our Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}