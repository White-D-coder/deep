
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Hospital, FileText, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      title: 'AI Medical Report Analysis',
      description: 'Upload your medical reports and receive instant AI-powered analysis with high accuracy.',
      icon: FileText
    },
    {
      title: 'MRI & Cancer Detection',
      description: 'Advanced algorithms that can scan MRIs and detect early signs of cancer and other conditions.',
      icon: Search
    },
    {
      title: 'Find Medical Centers',
      description: 'Locate the nearest hospitals and medical centers specializing in treating your condition.',
      icon: Hospital
    },
    {
      title: 'Expert Doctor Recommendations',
      description: 'Connect with specialized doctors based on your diagnosis with detailed success rates.',
      icon: User
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-medical-100 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                AI-Powered Medical Report Analysis
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Upload your medical reports, MRIs, and scans for instant analysis and find the best care options available near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/analyze">
                  <Button size="lg" className="bg-medical-600 hover:bg-medical-700 text-white">
                    Analyze Your Reports
                  </Button>
                </Link>
                <Link to="/hospitals">
                  <Button variant="outline" size="lg" className="border-medical-600 text-medical-600 hover:bg-medical-100">
                    Find Hospitals
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                    alt="Medical Analysis" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-medical-600 text-white px-6 py-3 rounded-lg shadow-md animate-pulse-slow">
                    <span className="font-semibold">Real-time Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How Curo Helps You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-medical-100 p-3 rounded-full inline-flex mb-4">
                  <feature.icon className="h-6 w-6 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Upload your medical documents now and receive instant AI analysis to better understand your health condition.
          </p>
          <Link to="/analyze">
            <Button size="lg" className="bg-white text-medical-600 hover:bg-gray-100">
              Analyze Your Reports Now
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
