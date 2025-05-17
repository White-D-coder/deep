
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hospital, Search, MapPin, Phone, X } from 'lucide-react';
import GoogleMap from '@/components/maps/GoogleMap';

// Mock data for hospitals
const mockHospitals = [
  {
    id: 1,
    name: "Memorial Medical Center",
    distance: "1.2 miles",
    address: "123 Health Avenue, Medical District, MD 10001",
    phone: "(123) 456-7890",
    location: { lat: 37.773, lng: -122.419 },
    specialties: ["Oncology", "Cardiology", "Neurology"],
    rating: 4.8,
    doctors: [
      { name: "Dr. Sarah Johnson", specialty: "Oncology", contact: "(123) 456-7890" },
      { name: "Dr. Michael Chen", specialty: "Cardiology", contact: "(123) 456-7891" },
      { name: "Dr. Emily Rodriguez", specialty: "Neurology", contact: "(123) 456-7892" }
    ]
  },
  {
    id: 2,
    name: "City General Hospital",
    distance: "2.5 miles",
    address: "456 Care Street, Downtown, MD 10002",
    phone: "(123) 567-8901",
    location: { lat: 37.775, lng: -122.425 },
    specialties: ["Emergency Care", "Pediatrics", "Surgery"],
    rating: 4.5,
    doctors: [
      { name: "Dr. James Wilson", specialty: "Emergency Medicine", contact: "(123) 567-8901" },
      { name: "Dr. Lisa Thompson", specialty: "Pediatrics", contact: "(123) 567-8902" }
    ]
  },
  {
    id: 3,
    name: "University Health System",
    distance: "3.8 miles",
    address: "789 Research Blvd, University Park, MD 10003",
    phone: "(123) 678-9012",
    location: { lat: 37.769, lng: -122.430 },
    specialties: ["Cancer Research", "Transplants", "Genetic Medicine"],
    rating: 4.9,
    doctors: [
      { name: "Dr. Robert Brown", specialty: "Oncology Research", contact: "(123) 678-9012" },
      { name: "Dr. Jennifer Lee", specialty: "Transplant Surgery", contact: "(123) 678-9013" }
    ]
  },
  {
    id: 4,
    name: "Riverside Community Hospital",
    distance: "4.1 miles",
    address: "101 Riverside Drive, Riverside, MD 10004",
    phone: "(123) 789-0123",
    location: { lat: 37.778, lng: -122.412 },
    specialties: ["Community Health", "Family Medicine", "Geriatrics"],
    rating: 4.3,
    doctors: [
      { name: "Dr. David Taylor", specialty: "Family Medicine", contact: "(123) 789-0123" },
      { name: "Dr. Maria Garcia", specialty: "Geriatrics", contact: "(123) 789-0124" }
    ]
  },
  {
    id: 5,
    name: "Northern Medical Institute",
    distance: "5.6 miles",
    address: "202 North Avenue, Northside, MD 10005",
    phone: "(123) 890-1234",
    location: { lat: 37.782, lng: -122.417 },
    specialties: ["Orthopedics", "Sports Medicine", "Rehabilitation"],
    rating: 4.6,
    doctors: [
      { name: "Dr. Thomas Wright", specialty: "Orthopedic Surgery", contact: "(123) 890-1234" },
      { name: "Dr. Anna Kim", specialty: "Sports Medicine", contact: "(123) 890-1235" },
      { name: "Dr. Kevin Patel", specialty: "Rehabilitation", contact: "(123) 890-1236" }
    ]
  }
];

const HospitalsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<any | null>(null);
  
  const conditions = [
    "Cancer", "Heart Disease", "Diabetes", "Stroke", "Respiratory Disease",
    "Neurological Disorders", "Orthopedic Conditions"
  ];

  const filteredHospitals = mockHospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    hospital.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleHospitalSelect = (hospital: any) => {
    setSelectedHospital(hospital);
  };

  return (
    <MainLayout>
      <div className="bg-medical-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Find Hospitals & Medical Centers</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Locate the nearest hospitals and specialized medical centers to get treatment for your condition.
          </p>
          
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input
                  type="text"
                  placeholder="Search by hospital name or specialty"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div>
                <Button className="w-full md:w-auto bg-medical-600 hover:bg-medical-700">
                  <MapPin className="mr-2 h-4 w-4" /> Use My Location
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Filter by condition:</p>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition) => (
                  <Button
                    key={condition}
                    variant={selectedCondition === condition ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (selectedCondition === condition) {
                        setSelectedCondition(null);
                      } else {
                        setSelectedCondition(condition);
                      }
                    }}
                    className={selectedCondition === condition ? "bg-medical-600 hover:bg-medical-700" : ""}
                  >
                    {condition}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hospital List */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Hospitals Near You</h2>
              <p className="text-gray-600">
                Showing {filteredHospitals.length} results based on your search
              </p>
            </div>
            
            <div className="space-y-6">
              {filteredHospitals.map((hospital) => (
                <Card 
                  key={hospital.id} 
                  className={`border hover:shadow-md transition-shadow ${selectedHospital?.id === hospital.id ? 'ring-2 ring-medical-600' : ''}`}
                  onClick={() => handleHospitalSelect(hospital)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-medical-100 p-3 rounded-full">
                        <Hospital className="h-6 w-6 text-medical-600" />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold text-gray-800">{hospital.name}</h3>
                          <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {hospital.distance}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" /> {hospital.address}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hospital.specialties.map((specialty, index) => (
                            <span 
                              key={index} 
                              className="bg-medical-50 text-medical-700 px-2 py-1 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-medical-600" />
                            <span className="text-gray-700">{hospital.phone}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-gray-700 font-medium">{hospital.rating}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleHospitalSelect(hospital)}
                          >
                            View Details
                          </Button>
                          <Button className="bg-medical-600 hover:bg-medical-700" size="sm">
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right sidebar - Map and Hospital Details */}
          <div className="lg:col-span-1">
            {/* Google Map */}
            <div className="bg-white border rounded-lg overflow-hidden mb-6 sticky top-24">
              <div className="h-96">
                <GoogleMap hospitals={mockHospitals} onHospitalSelect={handleHospitalSelect} />
              </div>
            </div>

            {/* Hospital Detail Panel */}
            {selectedHospital && (
              <Card className="border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{selectedHospital.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedHospital(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 text-sm mb-1">Address</h4>
                      <p className="text-gray-800">{selectedHospital.address}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 text-sm mb-1">Contact</h4>
                      <p className="text-medical-600 font-medium">{selectedHospital.phone}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 text-sm mb-2">Doctors</h4>
                      <div className="space-y-2">
                        {selectedHospital.doctors.map((doctor: any, index: number) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <p className="font-medium text-gray-800">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <p className="text-sm text-medical-600">{doctor.contact}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t">
                      <Button className="w-full bg-medical-600 hover:bg-medical-700">
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalsPage;
