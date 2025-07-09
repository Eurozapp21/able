import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Brain, Home, Car, Wrench, Star, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';

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
      gradientFrom: "from-blue-50",
      gradientTo: "to-cyan-50"
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
      color: "bg-green-500",
      gradientFrom: "from-green-50",
      gradientTo: "to-emerald-50"
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
      color: "bg-orange-500",
      gradientFrom: "from-orange-50",
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
      color: "bg-purple-500",
      gradientFrom: "from-purple-50",
      gradientTo: "to-indigo-50"
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
      bgColor: "bg-gradient-to-r from-purple-600 to-pink-600"
    },
    {
      id: 3,
      title: "Immersive Reality Room",
      description: "Immersive reality sensory rooms provide a virtual reality environment that creates alternative worlds for therapeutic and educational purposes.",
      image: "/attached_assets/image_1751996976633.png", 
      features: ["VR technology", "Interactive projections", "Motion sensors", "Customizable environments"],
      bgColor: "bg-gradient-to-r from-green-600 to-teal-600"
    }
  ];



  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-80 bg-gradient-to-r from-yellow-600 to-amber-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Solutions</h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Consulting, Designing, Installing
            </p>
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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-gold rounded-full flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-text-dark">Our Approach</h2>
          </div>
          
          <p className="text-lg text-gray-custom leading-relaxed mb-8">
            AbleTools creates customized design solutions, adapting to each client. Our specialized staff undertakes a wide range of projects, from design to construction and maintenance. We offer a wide variety of services that correspond to multiple projects.
          </p>
          
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8 border border-yellow-200">
            <p className="text-lg text-gray-700 font-medium mb-4">
              We consider every project as a unique case-study, that needs to be addressed carefully, recognizing the needs, doing extensive research and finally providing our consultation or proposal.
            </p>
            <div className="inline-flex items-center gap-2 text-primary-gold font-bold text-xl">
              <Star className="w-6 h-6" />
              "Your ability to dream!"
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>



        {/* Services Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-text-dark mb-12">Our Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`shadow-xl border-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} hover:shadow-2xl transition-all duration-300`}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center`}>
                      <service.icon className="w-6 h-6 text-black" />
                    </div>
                    <CardTitle className="text-2xl text-text-dark">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-custom mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-dark">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{feature}</span>
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
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-text-dark mb-12">Solution Categories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutionCategories.map((category) => (
              <Card key={category.id} className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${category.bgColor} bg-opacity-80 flex items-center justify-center`}>
                    <h3 className="text-white text-xl font-bold text-center px-4">{category.title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-custom mb-6 leading-relaxed">{category.description}</p>
                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-text-dark">Includes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full group"
                    style={{backgroundColor: '#ffeb3b', color: '#000'}}
                    asChild
                  >
                    <a href={`/solutions/${category.id}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We support a holistic approach, from a first draft idea, to 3D design and technical drawings, to construction, maintenance and training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="bg-transparent border-white text-white hover:bg-white hover:text-amber-600"
            >
              View Our Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}