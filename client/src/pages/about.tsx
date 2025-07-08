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
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Header Image - Full Width */}
      <section className="mb-16">
        <div className="relative">
          <img
            src="/attached_assets/1601935107aboutus_1752007024526.jpg"
            alt="AbleTools Exhibition - Rehabilitation Equipment & Solutions"
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <div className="container mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                About AbleTools
              </h1>
              <p className="text-white text-lg md:text-xl lg:text-2xl">
                Your ability to dream!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
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

        {/* Company Introduction */}
        <section className="mb-16">
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-dark">About Us</h2>
                <div className="prose prose-lg text-gray-custom leading-relaxed space-y-6">
                  <p>
                    <strong>Able Tools Ltd</strong> has been operated since 2006 in the field of rehabilitation equipment and new technology solutions for people in need. Able Tools has a wide range of innovative products, specially adapted for people with mobility difficulties, neurological and orthopaedic injuries, as well as for people with autism.
                  </p>
                  
                  <p>
                    Our products include, among others, specialized wheelchairs, rehab pushchairs, electric beds, lifting systems, stair lifts, seating systems, standing frames, walkers, bath and commode chairs, walking aids, pillows for pressure relief and for lying down prevention, functional and dynamic splints to assist movement.
                  </p>
                  
                  <p>
                    Also, aids for everyday life activities such as bath accessories for grooming and hygiene, clothing, feeding, for stabilization, movement and transport. Modified house equipment (kitchen utensils, etc) and modern clinical equipment for therapeutic retraining and functional procedures are included on company's stock.
                  </p>
                  
                  <p>
                    Additionally, we are specialized in the design and implementation of <strong>multi-sensory rooms</strong>, for rehabilitation centres and user's homes. Multi-sensory rooms combine a range of stimuli to help the user to develop and engage their senses. Using multiple stimuli such as lights, colours, sounds, sensory soft play objects, aromas, all within a safe environment, they allow user to explore and interact without any risk.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src="/attached_assets/1602069478aboutus_temp_1752007885489.jpg"
                    alt="AbleTools - Rehabilitation Equipment & Solutions"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="relative">
                  <img
                    src="/attached_assets/1601936002aboutus_small2_1752007885488.jpg"
                    alt="AbleTools rehabilitation therapy session"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Logo Section */}
        <section className="mb-16">
          <div className="text-center">
            <img
              src="/attached_assets/1599038152about_us_home_1751993313592.jpg"
              alt="Your ability to dream!"
              className="max-w-md mx-auto h-auto"
            />
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-lg border border-yellow-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-dark">Our Mission</h3>
              </div>
              <p className="text-gray-custom leading-relaxed">
                To provide comprehensive rehabilitation equipment and technology solutions that empower individuals with disabilities to achieve greater independence and quality of life. We are committed to delivering exceptional customer service and innovative solutions tailored to each person's unique needs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-lg border border-yellow-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-dark">Our Vision</h3>
              </div>
              <p className="text-gray-custom leading-relaxed">
                To be the leading provider of rehabilitation solutions in Cyprus and the region, recognized for our expertise, innovation, and unwavering commitment to improving the lives of people with disabilities. We envision a world where everyone has access to the tools they need to live independently and pursue their dreams.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Our Values</h2>
            <p className="text-gray-custom text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-text-dark">{value.title}</h3>
                <p className="text-gray-custom text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Our Journey</h2>
            <p className="text-gray-custom text-lg">Key milestones in our company's history</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-black text-lg px-6 py-3 rounded-full font-bold">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl mb-2 text-text-dark">{milestone.title}</h3>
                    <p className="text-gray-custom leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Our Expertise</h2>
            <p className="text-gray-custom text-lg">Dedicated professionals committed to your success</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-text-dark">Rehabilitation Specialists</h3>
              <p className="text-gray-custom text-sm">
                Our team includes certified rehabilitation specialists with extensive experience in assistive technology and mobility solutions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-text-dark">Technical Support</h3>
              <p className="text-gray-custom text-sm">
                Skilled technicians provide ongoing maintenance, repairs, and training to ensure optimal equipment performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-text-dark">Customer Service</h3>
              <p className="text-gray-custom text-sm">
                Dedicated customer service representatives are always ready to assist with your needs and questions.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications and Partnerships */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-lg border border-yellow-200">
            <h2 className="text-2xl font-bold text-center text-text-dark mb-6">
              Certifications & Partnerships
            </h2>
            <p className="text-gray-custom mb-8 leading-relaxed text-center">
              We maintain the highest standards through our certifications and partnerships with leading manufacturers and healthcare organizations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-custom font-medium">ISO Certified</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-custom font-medium">HUR Partner</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-custom font-medium">CE Compliant</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-custom font-medium">Quality Assured</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
