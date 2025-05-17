
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Search, MapPin, Calendar } from 'lucide-react';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Oncology",
    hospital: "Memorial Medical Center",
    experience: "15 years",
    education: "Harvard Medical School",
    successRate: "92%",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    hospital: "City General Hospital",
    experience: "12 years",
    education: "Johns Hopkins University",
    successRate: "89%",
    rating: 4.7,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Neurology",
    hospital: "University Health System",
    experience: "10 years",
    education: "Stanford University",
    successRate: "91%",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    hospital: "Northern Medical Institute",
    experience: "18 years",
    education: "Yale University",
    successRate: "94%",
    rating: 4.9,
    image: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    specialty: "Oncology",
    hospital: "Cancer Treatment Center",
    experience: "14 years",
    education: "University of California",
    successRate: "93%",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/women/67.jpg"
  }
];

// Mock data for recommended doctors based on diagnosis
const recommendedDoctors = mockDoctors.filter(doctor => doctor.specialty === "Oncology");

const DoctorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  
  const filteredDoctors = activeTab === "recommended" 
    ? recommendedDoctors 
    : mockDoctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctor Recommendations</h1>
        
        <Tabs defaultValue="recommended" className="mb-8">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger 
              value="recommended" 
              className={activeTab === "recommended" ? "data-[state=active]:bg-medical-600 data-[state=active]:text-white" : ""}
              onClick={() => setActiveTab("recommended")}
            >
              Recommended for Your Diagnosis
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className={activeTab === "all" ? "data-[state=active]:bg-medical-600 data-[state=active]:text-white" : ""}
              onClick={() => setActiveTab("all")}
            >
              All Specialists
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended">
            {activeTab === "recommended" && (
              <div className="bg-medical-50 border border-medical-200 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Based on Your Diagnosis: Potential Lymphoma</h2>
                <p className="text-gray-600 mb-4">
                  We've recommended oncologists who specialize in lymphoma treatment. These specialists have high success rates for treating your specific condition.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            {activeTab === "all" && (
              <div className="mb-8">
                <div className="relative max-w-md">
                  <Input
                    type="text"
                    placeholder="Search by name, specialty or location"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="border hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-gray-800">{doctor.name}</h3>
                      <p className="text-medical-700 font-medium">{doctor.specialty}</p>
                      <p className="text-gray-500 text-sm flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" /> {doctor.hospital}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Experience</p>
                      <p className="font-medium text-gray-800">{doctor.experience}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Success Rate</p>
                      <p className="font-medium text-gray-800">{doctor.successRate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Education</p>
                      <p className="font-medium text-gray-800">{doctor.education}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="border-t p-4 flex gap-4">
                  <Button variant="outline" className="flex-1">View Profile</Button>
                  <Button className="flex-1 bg-medical-600 hover:bg-medical-700">
                    <Calendar className="mr-2 h-4 w-4" /> Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorsPage;
