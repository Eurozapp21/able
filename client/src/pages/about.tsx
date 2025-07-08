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

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong className="text-gray-900">Able Tools Ltd</strong> has been operating since 2006 in rehabilitation equipment and technology solutions. We offer innovative products for people with mobility difficulties, neurological and orthopedic injuries, and autism.
                  </p>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-400">
                    <h3 className="font-bold text-lg mb-3 text-gray-900">Multi-Sensory Room Specialists</h3>
                    <p className="text-gray-700">
                      We design and implement multi-sensory rooms for rehabilitation centers and homes, combining lights, colors, sounds, and textures in safe environments for sensory development.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-yellow-600">18+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-yellow-600">500+</div>
                      <div className="text-sm text-gray-600">Happy Clients</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <img
                    src="/attached_assets/1602069478aboutus_temp_1752007885489.jpg"
                    alt="AbleTools - Rehabilitation Equipment & Solutions"
                    className="w-full h-96 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
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
                <h3 className="font-bold text-xl mb-4 text-gray-900 text-center">Our Commitment</h3>
                <p className="text-lg text-gray-700 text-center">
                  We maintain <strong>"the Ability to Dream"</strong> of every individual, providing support equipment to optimize quality of life and independence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Core Values</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do and shape our commitment to excellence</p>
                <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="group">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <span className="text-3xl">{value.icon}</span>
                      </div>
                      <h3 className="font-bold text-xl mb-4 text-gray-900">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>





        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Expertise</h2>
                <p className="text-xl text-gray-600">Dedicated professionals committed to your success</p>
                <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">Rehabilitation Specialists</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our team includes certified rehabilitation specialists with extensive experience in assistive technology and mobility solutions.
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">Technical Support</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Skilled technicians provide ongoing maintenance, repairs, and training to ensure optimal equipment performance.
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl mb-4 text-gray-900">Customer Service</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dedicated customer service representatives are always ready to assist with your needs and questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
