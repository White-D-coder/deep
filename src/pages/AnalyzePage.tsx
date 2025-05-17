
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const AnalyzePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);

  // Effect to automatically analyze when file changes
  useEffect(() => {
    if (file) {
      handleAnalyze();
    }
  }, [file]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Check if file is an image
    if (!selectedFile.type.includes('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    // Results will be updated automatically via useEffect
  };

  const handleUploadClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      if (e.target.files && e.target.files[0]) {
        handleFileSelect(e.target.files[0]);
      }
    };
    input.click();
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // Mock analysis results
      const mockResults = {
        diagnosis: "Potential early-stage lymphoma",
        confidence: 87,
        details: [
          { key: "Cell Abnormality", value: "Detected", severity: "High" },
          { key: "Cancer Risk", value: "Elevated", severity: "Medium" },
          { key: "Inflammation", value: "Present", severity: "Medium" },
          { key: "Tissue Damage", value: "Minimal", severity: "Low" }
        ],
        recommendation: "Based on the analysis, consultation with an oncologist is strongly recommended. Further tests including a complete blood count and bone marrow biopsy may be required for confirmation."
      };
      
      setResults(mockResults);
      setAnalyzing(false);
      toast.success('Analysis complete');
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Real-Time AI Medical Report Analysis
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {!previewUrl ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center h-80 bg-gray-50"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                >
                  <FileText className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4 text-center">
                    Drag and drop your medical report image or MRI scan here
                  </p>
                  <Button onClick={handleUploadClick} variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg bg-white p-4">
                  <div className="flex justify-between mb-4">
                    <p className="font-medium">{file?.name}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setPreviewUrl(null);
                        setFile(null);
                        setResults(null);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                  <div className="rounded-lg overflow-hidden border bg-gray-100">
                    <img 
                      src={previewUrl} 
                      alt="Medical report preview" 
                      className="w-full h-auto object-contain max-h-[400px]" 
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              {analyzing ? (
                <Card className="border h-full flex flex-col justify-center items-center">
                  <CardContent className="text-center p-6">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-medical-600 border-t-transparent mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Report</h3>
                    <p className="text-gray-600 max-w-md">
                      Our AI is examining the image for medical conditions, anomalies, and potential diagnoses.
                    </p>
                  </CardContent>
                </Card>
              ) : results ? (
                <Card className="border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">Analysis Results</h3>
                      <div className="bg-medical-100 text-medical-800 text-sm font-medium px-3 py-1 rounded-full">
                        {results.confidence}% Confidence
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-2">Primary Diagnosis</h4>
                      <p className="text-lg font-semibold text-medical-800">{results.diagnosis}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-2">Detailed Findings</h4>
                      <div className="space-y-2">
                        {results.details.map((detail: any, index: number) => (
                          <div key={index} className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-700">{detail.key}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              detail.severity === 'High' ? 'bg-red-100 text-red-800' : 
                              detail.severity === 'Medium' ? 'bg-amber-100 text-amber-800' : 
                              'bg-green-100 text-green-800'
                            }`}>
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-gray-700 mb-2">Recommendation</h4>
                      <p className="text-gray-800 bg-gray-50 p-3 rounded">{results.recommendation}</p>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to="/hospitals">Find Hospitals</Link>
                      </Button>
                      <Button className="flex-1 bg-medical-600 hover:bg-medical-700" asChild>
                        <Link to="/doctors">Find Doctors</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border h-full flex flex-col justify-center items-center bg-gray-50">
                  <CardContent className="text-center p-6">
                    <div className="bg-medical-100 p-4 rounded-full inline-flex mb-4">
                      <FileText className="h-8 w-8 text-medical-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready for Real-Time Analysis</h3>
                    <p className="text-gray-600 max-w-md">
                      Upload your medical report, MRI scan, or other medical images to get AI-powered insights and diagnosis instantly.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Supported File Types */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Supported Medical Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "MRI Scans", description: "Brain, spine, joint and organ MRI scans" },
                { name: "X-Ray Reports", description: "Chest, bone and dental X-rays" },
                { name: "Lab Results", description: "Blood tests, pathology and biopsy reports" },
                { name: "CT Scans", description: "Full body and targeted CT scan images" },
                { name: "Ultrasound Images", description: "Pregnancy, abdominal and cardiac ultrasounds" },
                { name: "Pathology Slides", description: "Digital pathology and histology slides" }
              ].map((item, index) => (
                <div key={index} className="bg-white border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalyzePage;
