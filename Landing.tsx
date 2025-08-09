import React from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, Brain, CreditCard, Users, Star, ArrowRight, Check } from 'lucide-react';

export function Landing() {
  const { setCurrentPage } = useAppContext();

  const features = [
    {
      icon: Shield,
      title: "KYC Verification",
      description: "Secure identity verification for trusted connections between freelancers and clients."
    },
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect the right talent with the perfect projects based on skills and requirements."
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Safe and reliable payment processing with milestone-based releases and dispute protection."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a vibrant community of Indian freelancers and get support from peers and mentors."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Nexlance helped me find amazing clients from around the world. The platform is intuitive and the payment system is incredibly reliable."
    },
    {
      name: "Rahul Kumar",
      role: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a developer, I love how Nexlance matches me with projects that perfectly fit my skill set. It's like having a personal project manager!"
    },
    {
      name: "Tech Innovations Pvt Ltd",
      role: "Client Company",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop",
      rating: 5,
      text: "We found incredible talent through Nexlance. The KYC verification gives us confidence, and the AI matching saves us hours of screening."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Freelancers" },
    { number: "10,000+", label: "Projects Completed" },
    { number: "₹50 Cr+", label: "Total Earnings" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#1B2C4A]">
                Nexlance
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-[#FF4D6D] transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-[#FF4D6D] transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-[#FF4D6D] transition-colors">Testimonials</a>
              <Button 
                variant="outline"
                onClick={() => setCurrentPage('login')}
                className="text-[#1B2C4A] border-[#1B2C4A] hover:bg-[#1B2C4A] hover:text-white"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="nexlance-gradient min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="bg-white/20 text-[#1B2C4A] border-none">
                🇮🇳 Made in India, For India
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-[#1B2C4A] leading-tight">
                  Empowering India's Freelancers — One Project at a Time 🇮🇳
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Nexlance connects Indian talent with global opportunities. Whether you're hiring or working — we simplify your freelance journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setCurrentPage('register')}
                  className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white px-8 py-3 nexlance-button-shadow"
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentPage('login')}
                  className="text-[#1B2C4A] border-[#1B2C4A] hover:bg-[#1B2C4A] hover:text-white px-8 py-3"
                  size="lg"
                >
                  I already have an account
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#1B2C4A]">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Freelancers working together"
                className="w-full h-[600px] object-cover rounded-2xl nexlance-shadow"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl nexlance-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1B2C4A]">Project Completed!</div>
                    <div className="text-sm text-gray-600">Payment Released</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B2C4A] mb-4">
              Why Choose Nexlance?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the most comprehensive platform for Indian freelancers with features that matter most to you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="nexlance-shadow hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF4D6D] to-[#4DAFFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1B2C4A] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 nexlance-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B2C4A] mb-4">
              How Nexlance Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes and connect with opportunities that match your skills perfectly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF4D6D] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1B2C4A] mb-3">Sign Up & Verify</h3>
              <p className="text-gray-600">Create your profile and complete KYC verification for trusted access to our platform.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#4DAFFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1B2C4A] mb-3">Find Perfect Matches</h3>
              <p className="text-gray-600">Our AI analyzes your skills and preferences to show you the most relevant opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#FF4D6D] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1B2C4A] mb-3">Work & Get Paid</h3>
              <p className="text-gray-600">Complete projects with confidence knowing payments are secure and released on time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B2C4A] mb-4">
              Loved by Freelancers & Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful freelancers and satisfied clients who trust Nexlance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="nexlance-shadow hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-[#1B2C4A]">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1B2C4A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Freelance Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the fastest-growing freelance community in India. Connect with opportunities that match your skills and grow your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setCurrentPage('register')}
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white px-8 py-3 nexlance-button-shadow"
              size="lg"
            >
              Start Freelancing Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => setCurrentPage('register')}
              className="text-white border-white hover:bg-white hover:text-[#1B2C4A] px-8 py-3"
              size="lg"
            >
              Post Your First Project
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="text-2xl font-bold text-[#1B2C4A] mb-4">Nexlance</div>
              <p className="text-gray-600 mb-4">
                Empowering India's freelance ecosystem with trust, technology, and opportunity.
              </p>
              <div className="text-sm text-gray-500">
                🇮🇳 Made with love in India
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1B2C4A] mb-4">For Freelancers</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Find Projects</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">How to Apply</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1B2C4A] mb-4">For Clients</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Post a Project</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Find Talent</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#1B2C4A] mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#FF4D6D] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Nexlance. All rights reserved. Empowering freelancers across India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}