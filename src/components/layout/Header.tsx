
import React from 'react';
import { Link } from 'react-router-dom';
import { Hospital, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <Hospital className="h-8 w-8 text-medical-600" />
          <span className="text-2xl font-bold text-gray-800">Curo</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-medical-600 transition-colors">Home</Link>
          <Link to="/analyze" className="text-gray-700 hover:text-medical-600 transition-colors">Analyze Reports</Link>
          <Link to="/hospitals" className="text-gray-700 hover:text-medical-600 transition-colors">Find Hospitals</Link>
          <Link to="/doctors" className="text-gray-700 hover:text-medical-600 transition-colors">Doctors</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
          <Button size="sm" className="bg-medical-600 hover:bg-medical-700">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
