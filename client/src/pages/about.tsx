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

        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-text-dark">
                About AbleTools
              </h1>
              <p className="text-xl text-gray-custom leading-relaxed mb-6">
                Your ability to dream!
              </p>
              <p className="text-gray-custom text-lg leading-relaxed">
                Able Tools Ltd has been operating since 2006 in the field of rehabilitation equipment and new technology solutions for people in need. Our focus is the customer's experience and our vision is to achieve a high-quality life and independency for every user's daily routine.
              </p>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="AbleTools team and facilities"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="euz_bgyelo">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-custom leading-relaxed">
                  To provide comprehensive rehabilitation equipment and technology solutions that empower individuals with disabilities to achieve greater independence and quality of life. We are committed to delivering exceptional customer service and innovative solutions tailored to each person's unique needs.
                </p>
              </CardContent>
            </Card>

            <Card className="euz_bgyelo">
              <CardHeader>
                <CardTitle className="text-2xl text-text-dark">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-custom leading-relaxed">
                  To be the leading provider of rehabilitation solutions in Cyprus and the region, recognized for our expertise, innovation, and unwavering commitment to improving the lives of people with disabilities. We envision a world where everyone has access to the tools they need to live independently and pursue their dreams.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Our Values</h2>
            <p className="text-gray-custom text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-semibold text-lg mb-3 text-text-dark">{value.title}</h3>
                  <p className="text-gray-custom text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
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
              <Card key={index} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <Badge className="bg-primary text-text-dark text-lg px-4 py-2 font-bold">
                      {milestone.year}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-2 text-text-dark">{milestone.title}</h3>
                      <p className="text-gray-custom leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text-dark">Our Expertise</h2>
            <p className="text-gray-custom text-lg">Dedicated professionals committed to your success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <img
                  src="/api/placeholder/150/150"
                  alt="Rehabilitation Specialists"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-2 text-text-dark">Rehabilitation Specialists</h3>
                <p className="text-gray-custom text-sm">
                  Our team includes certified rehabilitation specialists with extensive experience in assistive technology and mobility solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <img
                  src="/api/placeholder/150/150"
                  alt="Technical Support"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-2 text-text-dark">Technical Support</h3>
                <p className="text-gray-custom text-sm">
                  Skilled technicians provide ongoing maintenance, repairs, and training to ensure optimal equipment performance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift">
              <CardContent className="p-6">
                <img
                  src="/api/placeholder/150/150"
                  alt="Customer Service"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-2 text-text-dark">Customer Service</h3>
                <p className="text-gray-custom text-sm">
                  Dedicated customer service representatives are always ready to assist with your needs and questions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Certifications and Partnerships */}
        <section className="mb-16">
          <Card className="euz_bgyelo">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-text-dark">
                Certifications & Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-custom mb-6 leading-relaxed">
                We maintain the highest standards through our certifications and partnerships with leading manufacturers and healthcare organizations.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="text-sm text-gray-custom">ISO Certified</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <p className="text-sm text-gray-custom">HUR Partner</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">✓</span>
                  </div>
                  <p className="text-sm text-gray-custom">CE Compliant</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <p className="text-sm text-gray-custom">Quality Assured</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
