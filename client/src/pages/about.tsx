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
            className="w-full h-[60vh] lg:h-[70vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                About AbleTools
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-light opacity-90">
                Your ability to dream!
              </p>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mt-8"></div>
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
        {/* Company Introduction */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-16 items-center">
                <div className="lg:col-span-3">
                  <div className="mb-8">
                    <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      Since 2006
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                      Empowering Lives Through Innovation
                    </h2>
                  </div>
                  
                  <div className="prose prose-xl text-gray-600 leading-relaxed space-y-8">
                    <p className="text-xl">
                      <strong className="text-gray-900">Able Tools Ltd</strong> has been operated since 2006 in the field of rehabilitation equipment and new technology solutions for people in need. Able Tools has a wide range of innovative products, specially adapted for people with mobility difficulties, neurological and orthopaedic injuries, as well as for people with autism.
                    </p>
                    
                    <p className="text-lg">
                      Our products include, among others, specialized wheelchairs, rehab pushchairs, electric beds, lifting systems, stair lifts, seating systems, standing frames, walkers, bath and commode chairs, walking aids, pillows for pressure relief and for lying down prevention, functional and dynamic splints to assist movement.
                    </p>
                    
                    <p className="text-lg">
                      Also, aids for everyday life activities such as bath accessories for grooming and hygiene, clothing, feeding, for stabilization, movement and transport. Modified house equipment (kitchen utensils, etc) and modern clinical equipment for therapeutic retraining and functional procedures are included on company's stock.
                    </p>
                    
                    <p className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-400 text-lg">
                      Additionally, we are specialized in the design and implementation of <strong className="text-gray-900">multi-sensory rooms</strong>, for rehabilitation centres and user's homes. Multi-sensory rooms combine a range of stimuli to help the user to develop and engage their senses. Using multiple stimuli such as lights, colours, sounds, sensory soft play objects, aromas, all within a safe environment, they allow user to explore and interact without any risk.
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-8">
                    <div className="relative group">
                      <img
                        src="/attached_assets/1602069478aboutus_temp_1752007885489.jpg"
                        alt="AbleTools - Rehabilitation Equipment & Solutions"
                        className="w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
                    </div>
                    
                    <div className="relative group">
                      <img
                        src="/attached_assets/1601936002aboutus_small2_1752007885488.jpg"
                        alt="AbleTools rehabilitation therapy session"
                        className="w-full h-72 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-sm font-semibold opacity-90">Professional Therapy Session</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Mission and Vision */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Purpose & Vision</h2>
                <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="group">
                  <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      To provide comprehensive rehabilitation equipment and technology solutions that empower individuals with disabilities to achieve greater independence and quality of life. We are committed to delivering exceptional customer service and innovative solutions tailored to each person's unique needs.
                    </p>
                  </div>
                </div>

                <div className="group">
                  <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                    </div>
                    <div className="text-gray-600 text-lg leading-relaxed space-y-6">
                      <p>
                        Our focus is the customer's experience and our vision is to achieve a high-quality life and independence for every user's daily routine. We consider each client as an individual challenge and provide customized solutions for optimal lifestyle.
                      </p>
                      <p>
                        Education is equally important - we provide equipment training and seminars for healthcare professionals while creating global collaborations to stay current with rehabilitation methods.
                      </p>
                      <p className="font-semibold text-gray-800 bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
                        We maintain <strong>"the Ability to Dream"</strong> of every individual, providing support equipment to optimize quality of life!
                      </p>
                    </div>
                  </div>
                </div>
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



        {/* Company Timeline */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Journey</h2>
                <p className="text-xl text-gray-600">Key milestones in our company's history</p>
                <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
              </div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="group">
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xl px-8 py-4 rounded-2xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300">
                          {milestone.year}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-2xl mb-3 text-gray-900">{milestone.title}</h3>
                          <p className="text-gray-600 text-lg leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
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
