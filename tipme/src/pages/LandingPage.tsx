import React, { useState, useEffect } from 'react';
import { DollarSign, QrCode, CreditCard, BarChart3, Zap, Smartphone, Shield, Menu, X, ArrowRight, Play, Check, ChevronDown, Star, Scan, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "1. Create Your QR Code",
      description: "Get your personalized QR code instantly",
      icon: QrCode
    },
    {
      title: "2. Get It Scanned",
      description: "Customer scans with their phone camera",
      icon: Scan
    },
    {
      title: "3. Receive Payment",
      description: "Tip arrives instantly to your wallet",
      icon: CheckCircle
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-cycle every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const faqs = [
    {
      question: "How does Tip Me work?",
      answer: "Simply sign up, get your unique QR code, and display it at your workplace. Customers scan the code, enter a tip amount, and pay securely. You receive the money directly to your digital wallet."
    },
    {
      question: "Are there any fees?",
      answer: "We charge a small 2.9% + $0.30 transaction fee per tip to cover payment processing. No monthly fees, no hidden charges. You keep the rest!"
    },
    {
      question: "How quickly can I cash out?",
      answer: "You can cash out your earnings anytime! Funds typically arrive in your bank account within 1-2 business days."
    },
    {
      question: "Is it secure?",
      answer: "Absolutely! We use bank-level encryption and comply with all payment security standards. Your earnings and customer payment information are fully protected."
    },
    {
      question: "Do customers need to download an app?",
      answer: "No! That's the beauty of Tip Me. Customers simply scan your QR code with their phone camera and tip through their web browser. Zero friction, maximum convenience."
    },
    {
      question: "Can I customize my tipping page?",
      answer: "Yes! You can add your photo, name, a short bio, and even suggested tip amounts to personalize your tipping experience."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, as well as digital wallets like Apple Pay and Google Pay."
    },
    {
      question: "How do I get support?",
      answer: "Our support team is available 24/7 via live chat or email at support@tipme.app. We're here to help!"
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Restaurant Server",
      image: "bg-blue-200",
      rating: 5,
      text: "Game changer! I've increased my tips by 40% since using Tip Me. Customers love how easy it is."
    },
    {
      name: "James Wilson",
      role: "Barista",
      image: "bg-cyan-200",
      rating: 5,
      text: "No more fumbling with cash. Everything's tracked automatically and I can cash out whenever I want."
    },
    {
      name: "Sofia Rodriguez",
      role: "Delivery Driver",
      image: "bg-indigo-300",
      rating: 5,
      text: "The QR code on my delivery bag has been a huge hit. Tips have never been easier to collect!"
    }
  ];

  const stats = [
    { number: "5,000+", label: "Active Workers" },
    { number: "$2M+", label: "Tips Processed" },
    { number: "50K+", label: "Happy Customers" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
                Tip Me
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium transition">FAQ</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/auth" className="hidden md:block text-gray-600 hover:text-gray-900 font-medium transition" >
                Sign In
              </Link>
              <button className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition">
                Get Started
              </button>
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-2">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 font-medium py-2">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 font-medium py-2">How It Works</a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900 font-medium py-2">Pricing</a>
              <a href="#faq" className="block text-gray-600 hover:text-gray-900 font-medium py-2">FAQ</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
             
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                Tipping Made
                <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent"> Instant</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Empower service workers with instant digital tips. Just scan a QR code, tip securely, and watch your earnings grow. No app downloads, no hassle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition flex items-center justify-center space-x-2">
                  <span>Start Earning Tips</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-200 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-300 border-2 border-white"></div>
                  <div className="w-10 h-10 rounded-full bg-indigo-300 border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">5,000+</span> workers earning tips
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl mx-auto max-w-sm">
                {/* Carousel Content */}
                <div className="relative h-96">
                  {slides.map((slide, idx) => {
                    const IconComponent = slide.icon;
                    return (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          idx === currentSlide
                            ? 'opacity-100 translate-x-0'
                            : idx < currentSlide
                            ? 'opacity-0 -translate-x-full'
                            : 'opacity-0 translate-x-full'
                        }`}
                      >
                        <div className="h-full flex flex-col items-center justify-center space-y-6">
                          <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center p-8 text-blue-600">
                            <IconComponent className="w-full h-full" strokeWidth={1.5} />
                          </div>
                          <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{slide.title}</h3>
                            <p className="text-gray-600">{slide.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition z-10"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-4">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentSlide
                          ? 'w-8 bg-blue-600'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-700 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Everything You Need to <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">Earn More</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <QrCode className="w-8 h-8 text-white" />,
                title: "Instant QR Code",
                description: "Get your personalized QR code instantly. Customers scan and tip in seconds without any app downloads."
              },
              {
                icon: <CreditCard className="w-8 h-8 text-white" />,
                title: "Secure Payments",
                description: "Accept tips safely through encrypted card payments. Your earnings are protected and tracked automatically."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-white" />,
                title: "Real-Time Dashboard",
                description: "Track your tips, view transaction history, and monitor your balance with our intuitive dashboard."
              },
              {
                icon: <Zap className="w-8 h-8 text-white" />,
                title: "Instant Cashout",
                description: "Cash out your earnings anytime to your bank account or digital wallet. Your money, your control."
              },
              {
                icon: <Smartphone className="w-8 h-8 text-white" />,
                title: "Mobile Optimized",
                description: "Works perfectly on any device. Customers tip seamlessly from their phones with zero friction."
              },
              {
                icon: <Shield className="w-8 h-8 text-white" />,
                title: "Verified Profiles",
                description: "Build trust with customers through your verified worker profile and transparent transaction history."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-700 to-blue-400 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Start Earning in <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">3 Simple Steps</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              {
                step: "1",
                title: "Sign Up Free",
                description: "Create your worker profile in under 2 minutes. Add your details and link your digital wallet."
              },
              {
                step: "2",
                title: "Get Your QR Code",
                description: "Receive your unique QR code instantly. Display it at your workplace or on your uniform."
              },
              {
                step: "3",
                title: "Receive Tips",
                description: "Customers scan, tip instantly, and you get paid. Track everything in real-time on your dashboard."
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Loved by <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">Service Workers</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${testimonial.image} rounded-full`}></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Simple, <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">Transparent Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">No monthly fees. No hidden charges. Just simple per-transaction pricing.</p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
                <p className="text-gray-600">Forever free to get started</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Instant QR code generation",
                  "Unlimited tips received",
                  "Basic dashboard",
                  "2.9% + $0.30 per transaction",
                  "Standard cashout (2-3 days)"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-400 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-5xl font-bold mb-2">$9.99</div>
                <p className="text-blue-100">per month</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Everything in Free",
                  "Only 1.9% + $0.30 per transaction",
                  "Advanced analytics dashboard",
                  "Instant cashout (same day)",
                  "Custom branding on tipping page",
                  "Priority support",
                  "No Tip Me branding"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-white text-blue-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Start Free Trial
              </button>
              <p className="text-center text-sm text-blue-100 mt-3">7-day free trial, cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Frequently Asked <span className="bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-700 to-blue-400 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Boost Your Earnings?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of service workers already earning more with Tip Me. Get started in minutes.
              </p>
              <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center space-x-2">
                <span>Create Your Profile</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-blue-100 mt-4 text-sm">No credit card required • Free forever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-400 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Tip Me</span>
              </div>
              <p className="text-gray-400 text-sm">
                Making tipping instant and effortless for service workers everywhere.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
                <li><a href="#" className="hover:text-white transition">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#faq" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 Tip Me. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}