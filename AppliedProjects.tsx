import React from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, DollarSign, Calendar, MessageCircle, Eye } from 'lucide-react';

export function AppliedProjects() {
  const { setCurrentPage } = useAppContext();

  const appliedProjects = [
    {
      id: 1,
      title: "WordPress Plugin Development",
      client: "Digital Agency Pro",
      appliedDate: "2024-01-08",
      status: "Under Review",
      budget: "₹30,000",
      proposal: "₹35,000",
      timeline: "3 weeks",
      description: "Custom membership management plugin with payment integration..."
    },
    {
      id: 2,
      title: "Logo Design for Startup",
      client: "StartupXYZ",
      appliedDate: "2024-01-07",
      status: "Interview Scheduled",
      budget: "₹8,000",
      proposal: "₹10,000",
      timeline: "1 week",
      description: "Modern logo design and brand identity package..."
    },
    {
      id: 3,
      title: "Social Media Management",
      client: "TechStart Solutions",
      appliedDate: "2024-01-06",
      status: "Proposal Submitted",
      budget: "₹20,000/month",
      proposal: "₹22,000/month",
      timeline: "Ongoing",
      description: "Managing social media accounts across multiple platforms..."
    },
    {
      id: 4,
      title: "React Native App Development",
      client: "InnovateTech",
      appliedDate: "2024-01-05",
      status: "Rejected",
      budget: "₹80,000",
      proposal: "₹85,000",
      timeline: "6 weeks",
      description: "Cross-platform mobile app for fitness tracking..."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-green-100 text-green-800 border-none';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800 border-none';
      case 'Proposal Submitted':
        return 'bg-blue-100 text-blue-800 border-none';
      case 'Rejected':
        return 'bg-red-100 text-red-800 border-none';
      default:
        return 'bg-gray-100 text-gray-800 border-none';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('freelancer-dashboard')}
              className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2C4A]">Applied Projects</h1>
              <p className="text-gray-600">Track your project applications</p>
            </div>
          </div>
          <Button
            onClick={() => setCurrentPage('find-projects')}
            className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white"
          >
            Find More Projects
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="space-y-6">
          {appliedProjects.map((project) => (
            <Card key={project.id} className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#1B2C4A] mb-1">{project.title}</h3>
                    <p className="text-gray-600 mb-2">{project.client}</p>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  </div>
                  <Badge variant="secondary" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-[#FF4D6D]" />
                    <div>
                      <div className="text-xs text-gray-500">Your Proposal</div>
                      <div className="font-medium">{project.proposal}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Client Budget</div>
                      <div className="font-medium">{project.budget}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-[#4DAFFF]" />
                    <div>
                      <div className="text-xs text-gray-500">Timeline</div>
                      <div className="font-medium">{project.timeline}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <div>
                      <div className="text-xs text-gray-500">Applied Date</div>
                      <div className="font-medium">{project.appliedDate}</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Applied on {project.appliedDate}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Project
                    </Button>
                    {project.status !== 'Rejected' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage('messages')}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message Client
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}