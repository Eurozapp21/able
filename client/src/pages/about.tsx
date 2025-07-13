import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

export default function About() {
  const milestones = [
    {
      year: "2006",
      title: "Company Founded",
      description: "Able Tools Ltd began operations in the field of rehabilitation equipment and new technology solutions."
    },
    {
      year: "2010",
      title: "First Major Partnership",
      description: "Established partnerships with leading international rehabilitation equipment manufacturers."
    },
    {
      year: "2015",
      title: "Expanded Services",
      description: "Added training and education programs to our comprehensive service offering."
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Launched online platforms and virtual training programs to adapt to changing needs."
    },
    {
      year: "2025",
      title: "Continued Growth",
      description: "Serving hundreds of clients across Cyprus with cutting-edge rehabilitation solutions."
    }
  ];

  const values = [
    {
      title: "Customer Focus",
      description: "We put our customers' experience and needs at the center of everything we do.",
      icon: "🎯"
    },
    {
      title: "Quality of Life",
      description: "Our vision is to achieve high-quality life and independence for every user.",
      icon: "🌟"
    },
    {
      title: "Innovation",
      description: "We continuously seek new technology solutions to improve rehabilitation outcomes.",
      icon: "💡"
    },
    {
      title: "Expertise",
      description: "Our team brings deep knowledge and experience in rehabilitation equipment.",
      icon: "🔬"
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Header Image - Full Width */}
      <section className="relative">
        <div className="relative">
          <img
            src="/attached_assets/1601935107aboutus_1752007024526.jpg"
            alt="AbleTools Exhibition - Rehabilitation Equipment & Solutions"
            className="w-full h-[40vh] md:h-[45vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                About AbleTools
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-light opacity-90">
                Your ability to dream!
              </p>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>About Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <div className="bg-gradient-to-b from-gray-50 to-white">
        {/* Company Introduction - Redesigned */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  Since 2006
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Empowering Lives Through Innovation
                </h2>
                <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <div className="prose prose-lg text-gray-700 leading-relaxed">
                    <p>
                      <strong className="text-gray-900">Able Tools Ltd</strong> has been operated since 2006 in the field of rehabilitation equipment and new technology solutions for people in need. Able Tools has a wide range of innovative products, specially adapted for people with mobility difficulties, neurological and orthopaedic injuries, as well as for people with autism.
                    </p>
                    
                    <p>
                      Our products include, among others, specialized wheelchairs, rehab pushchairs, electric beds, lifting systems, stair lifts, seating systems, standing frames, walkers, bath and commode chairs, walking aids, pillows for pressure relief and for lying down prevention, functional and dynamic splints to assist movement.
                    </p>
                    
                    <p>
                      Also, aids for everyday life activities such as bath accessories for grooming and hygiene, clothing, feeding, for stabilization, movement and transport. Modified house equipment (kitchen utensils, etc) and modern clinical equipment for therapeutic retraining and functional procedures are included on company's stock.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-400">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">Multi-Sensory Room Specialists</h3>
                    <p className="text-gray-700">
                      Additionally, we are specialized in the design and implementation of multi-sensory rooms, for rehabilitation centres and user's homes. Multi-sensory rooms combine a range of stimuli to help the user to develop and engage their senses. Using multiple stimuli such as lights, colours, sounds, sensory soft play objects, aromas, all within a safe environment, they allow user to explore and interact without any risk.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src="/attached_assets/1602069478aboutus_temp_1752007885489.jpg"
                      alt="AbleTools - Rehabilitation Equipment & Solutions"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src="/attached_assets/1601936002aboutus_small2_1752009993907.jpg"
                      alt="Professional rehabilitation therapy session - AbleTools"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-semibold opacity-90">Professional Therapy Session</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Why Choose Us - Simplified */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AbleTools</h2>
                <p className="text-lg text-gray-600">Trusted expertise and personalized solutions</p>
                <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-black">🎯</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">Customer Focus</h3>
                  <p className="text-gray-600">We put our customers' experience and needs at the center of everything we do.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-black">🌟</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">Quality of Life</h3>
                  <p className="text-gray-600">Our vision is to achieve high-quality life and independence for every user.</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-black">💡</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">Innovation</h3>
                  <p className="text-gray-600">We continuously seek new technology solutions to improve rehabilitation outcomes.</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl border-l-4 border-yellow-400">
                <h3 className="font-bold text-xl mb-4 text-gray-900 text-center">Our Vision</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Our focus is the customer's experience and our vision is to achieve a high-quality life and independency for every user's daily routine. We consider each client as an individual 'challenge' and our goal is to provide them customised solutions which can potentially achieve an optimal lifestyle.
                  </p>
                  <p>
                    Our company doesn't compromise in just offering products for the clients. Education is equally important, as we provide equipment trainings and seminars addressed to a wide range of healthcare professionals. AbleTools aims to continuously create new collaborations with major healthcare companies worldwide, keeping up with the latest rehabilitation methods and equipment.
                  </p>
                  <p className="font-semibold text-gray-800 text-center bg-white p-4 rounded-lg">
                    We maintain <strong>"the Ability to Dream"</strong> of every individual and aspiring to meet the needs of the informed customer by providing the support equipment needed to optimize its quality of life!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>










      </div>
    </div>
  );
}
