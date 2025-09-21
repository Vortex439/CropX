import React from 'react'
import { Link } from 'react-router-dom'
import { 
  CameraIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import CropCard from '../components/CropCard'
import { mockCrops } from '../data/mockData'

const LandingPage = () => {
  const features = [
    {
      icon: <CameraIcon className="h-8 w-8" />,
      title: "AI Quality Check",
      description: "Advanced AI technology to assess crop quality and provide instant grading for better pricing and trust."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Direct Farmer-to-Buyer",
      description: "Connect directly with farmers, eliminating middlemen and ensuring fair prices for both parties."
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Safe and secure payment processing with escrow services to protect both farmers and buyers."
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: "Multilingual Support",
      description: "Available in multiple languages to serve farmers and buyers across different regions of India."
    }
  ]

  const trendingCrops = mockCrops.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient section-padding-lg relative overflow-hidden">
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="badge-green mb-6">
                🌱 NATURAL FARMING
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Empowering Farmers,
                <span className="block text-green-200">Connecting Markets</span>
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Join India's premier digital marketplace where farmers and buyers connect directly. 
                Experience AI-powered quality checks, secure transactions, and fair pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/marketplace"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  🌱 Explore Marketplace
                </Link>
                <Link
                  to="/farmer-dashboard"
                  className="btn-outline text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-green-600"
                >
                  Start Selling
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Quality Check</h3>
                  <p className="text-gray-600 mb-6">Advanced technology for crop quality assessment</p>
                  <div className="badge-green">Grade A Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="badge-outline mb-4">OUR SERVICES</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              CropX Provide <span className="text-gradient">Best Leading Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing agriculture with cutting-edge technology and farmer-first approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card text-center group">
                <div className="icon-container mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Crops Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Crops
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most popular crops from verified farmers across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingCrops.map((crop) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onAddToCart={(crop) => console.log('Added to cart:', crop.name)}
                onOrderNow={(crop) => console.log('Order now:', crop.name)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/marketplace"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              View All Crops
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding stats-card relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Join our growing community of farmers and buyers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="relative z-10">
              <div className="text-5xl lg:text-6xl font-bold mb-4">10,000+</div>
              <div className="text-green-200 text-lg font-medium">Active Farmers</div>
            </div>
            <div className="relative z-10">
              <div className="text-5xl lg:text-6xl font-bold mb-4">25,000+</div>
              <div className="text-green-200 text-lg font-medium">Happy Buyers</div>
            </div>
            <div className="relative z-10">
              <div className="text-5xl lg:text-6xl font-bold mb-4">50,000+</div>
              <div className="text-green-200 text-lg font-medium">Crops Listed</div>
            </div>
            <div className="relative z-10">
              <div className="text-5xl lg:text-6xl font-bold mb-4">₹2.5Cr+</div>
              <div className="text-green-200 text-lg font-medium">Transaction Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from farmers and buyers who trust FarmConnect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                role: "Farmer, Lucknow",
                content: "FarmConnect has transformed my farming business. The AI quality check helps me get better prices, and I can reach buyers directly without middlemen.",
                rating: 5
              },
              {
                name: "Priya Sharma",
                role: "Restaurant Owner, Mumbai",
                content: "I love the quality assurance and direct connection with farmers. The fresh produce I get through FarmConnect is always top-notch.",
                rating: 5
              },
              {
                name: "Amar Singh",
                role: "Farmer, Punjab",
                content: "The platform is easy to use and the payment system is secure. I've increased my income by 40% since joining FarmConnect.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers who are already benefiting from FarmConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/farmer-dashboard"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start as Farmer
            </Link>
            <Link
              to="/marketplace"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-105"
            >
              Start Buying
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
