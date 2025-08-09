import React from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Star, DollarSign, Calendar, MessageCircle } from 'lucide-react';

export function ViewApplications() {
  const { setCurrentPage } = useAppContext();

  const applications = [
    {
      id: 1,
      project: "E-commerce Website Development",
      applicants: [
        {
          id: 1,
          name: "Rahul Kumar",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          rating: 4.9,
          reviews: 67,
          proposal: "₹55,000",
          timeline: "3 weeks",
          coverLetter: "I have 5+ years of experience in React and Node.js development. I've built similar e-commerce platforms...",
          skills: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
          id: 2,
          name: "Priya Sharma",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          rating: 4.8,
          reviews: 45,
          proposal: "₹60,000",
          timeline: "4 weeks",
          coverLetter: "I'm a full-stack developer with expertise in modern web technologies. I can deliver a scalable solution...",
          skills: ["React", "Express.js", "PostgreSQL", "AWS"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('client-dashboard')}
              className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#1B2C4A]">Applications</h1>
              <p className="text-gray-600">Review and manage project applications</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {applications.map((project) => (
          <Card key={project.id} className="border-0 nexlance-shadow mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-[#1B2C4A]">
                {project.project} - {project.applicants.length} Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.applicants.map((applicant) => (
                  <div key={applicant.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={applicant.avatar} />
                          <AvatarFallback>{applicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-[#1B2C4A]">{applicant.name}</h3>
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600">{applicant.rating} ({applicant.reviews} reviews)</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {applicant.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#FF4D6D] mb-1">{applicant.proposal}</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {applicant.timeline}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-[#1B2C4A] mb-2">Cover Letter</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{applicant.coverLetter}</p>
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white"
                        onClick={() => setCurrentPage('profile')}
                      >
                        View Profile
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentPage('messages')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline">
                        Shortlist
                      </Button>
                      <Button variant="outline">
                        Hire
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}