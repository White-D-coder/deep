
import React from 'react';
import { Hospital } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Hospital className="h-6 w-6 text-medical-600" />
              <span className="text-xl font-bold text-gray-800">Health<span className="text-medical-600">AI</span> Vision</span>
            </div>
            <p className="text-gray-600 text-sm">
              Advanced medical image analysis powered by artificial intelligence to help patients and doctors make informed decisions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">Report Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">MRI Scan Analysis</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">Cancer Detection</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">Hospital Finder</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">How It Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">Research Papers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-medical-600 text-sm">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">Email: contact@healthaivision.com</li>
              <li className="text-gray-600 text-sm">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-600 text-sm">Address: 123 Medical Plaza, Suite 500, Health City, HC 10001</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HealthAI Vision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
