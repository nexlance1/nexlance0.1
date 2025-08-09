import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SkillsSelector } from './SkillsSelector';
import { 
  ArrowLeft, User, MessageCircle, CreditCard, Brain, 
  Edit, Save, Mail, Phone, MapPin, Calendar, 
  Star, Eye, Clock, DollarSign, Users, CheckCircle,
  Settings as SettingsIcon, Bell, Shield, Palette,
  Globe, Download, Upload, Heart, Share2,
  ThumbsUp, MessageSquare, FileText, ExternalLink,
  Send, Paperclip, Search, MoreVertical, Circle,
  Check, CheckCheck, Smile, Mic, Image as ImageIcon,
  Pin, Archive, Trash2, Volume2, VolumeX, Sparkles,
  Lightbulb, Target, TrendingUp, BookOpen, Zap,
  PenTool, Calculator, Award, Briefcase, Copy,
  RefreshCw, ChevronRight, HelpCircle, Rocket
} from 'lucide-react';

// Mock data for messaging (keeping existing)
const mockConversations = [
  {
    id: 1,
    participant: {
      name: 'Raj Patel',
      avatar: 'https://images.unsplash.com/photo-1535930735840-f3c6a645f80d?w=100',
      role: 'Client',
      online: true,
      lastSeen: 'Online'
    },
    lastMessage: 'Thanks for the excellent work on the website!',
    timestamp: '2 min ago',
    unreadCount: 2,
    projectTitle: 'E-commerce Website',
    messages: [
      { id: 1, senderId: 'raj', content: 'Hi Priya, I reviewed your proposal for the e-commerce project.', timestamp: '10:30 AM', type: 'text' },
      { id: 2, senderId: 'me', content: 'Thank you for reviewing it! I\'m excited to work on this project.', timestamp: '10:32 AM', type: 'text' },
      { id: 3, senderId: 'raj', content: 'The timeline looks good. When can we start?', timestamp: '10:35 AM', type: 'text' },
      { id: 4, senderId: 'me', content: 'I can start immediately. Let me know if you need any clarifications on the approach.', timestamp: '10:37 AM', type: 'text' },
      { id: 5, senderId: 'raj', content: 'Perfect! I\'ll send over the project requirements and brand assets.', timestamp: '11:15 AM', type: 'text' },
      { id: 6, senderId: 'raj', content: 'Thanks for the excellent work on the website!', timestamp: '2 min ago', type: 'text' }
    ]
  },
  {
    id: 2,
    participant: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1590650486895-79681b6f26a7?w=100',
      role: 'Client',
      online: false,
      lastSeen: '1 hour ago'
    },
    lastMessage: 'Could you please update the design mockups?',
    timestamp: '1 hour ago',
    unreadCount: 0,
    projectTitle: 'Mobile App Design',
    messages: [
      { id: 1, senderId: 'sarah', content: 'Hi! I saw your portfolio and I\'m impressed with your UI/UX work.', timestamp: 'Yesterday 3:20 PM', type: 'text' },
      { id: 2, senderId: 'me', content: 'Thank you! I\'d love to discuss your project requirements.', timestamp: 'Yesterday 3:25 PM', type: 'text' },
      { id: 3, senderId: 'sarah', content: 'We need a mobile app design for our fitness platform. Are you available?', timestamp: 'Yesterday 3:30 PM', type: 'text' },
      { id: 4, senderId: 'me', content: 'Yes, I\'m available! Could you share more details about the app functionality?', timestamp: 'Yesterday 3:35 PM', type: 'text' },
      { id: 5, senderId: 'sarah', content: 'Could you please update the design mockups?', timestamp: '1 hour ago', type: 'text' }
    ]
  },
  {
    id: 3,
    participant: {
      name: 'Tech Solutions Inc',
      avatar: 'https://images.unsplash.com/photo-1535930735840-f3c6a645f80d?w=100',
      role: 'Client',
      online: true,
      lastSeen: 'Online'
    },
    lastMessage: 'The API integration is working perfectly!',
    timestamp: '3 hours ago',
    unreadCount: 1,
    projectTitle: 'Backend Development',
    messages: [
      { id: 1, senderId: 'tech', content: 'We need help with Node.js backend development.', timestamp: '2 days ago', type: 'text' },
      { id: 2, senderId: 'me', content: 'I have extensive experience with Node.js. What\'s the scope of the project?', timestamp: '2 days ago', type: 'text' },
      { id: 3, senderId: 'tech', content: 'The API integration is working perfectly!', timestamp: '3 hours ago', type: 'text' }
    ]
  },
  {
    id: 4,
    participant: {
      name: 'Amit Kumar',
      avatar: 'https://images.unsplash.com/photo-1590650486895-79681b6f26a7?w=100',
      role: 'Freelancer',
      online: false,
      lastSeen: '2 days ago'
    },
    lastMessage: 'Thanks for the collaboration tips!',
    timestamp: '2 days ago',
    unreadCount: 0,
    projectTitle: 'General Discussion',
    messages: [
      { id: 1, senderId: 'amit', content: 'Hi Priya! I saw we both work in similar technologies.', timestamp: '3 days ago', type: 'text' },
      { id: 2, senderId: 'me', content: 'Hi Amit! Yes, I saw your React projects. Great work!', timestamp: '3 days ago', type: 'text' },
      { id: 3, senderId: 'amit', content: 'Thanks for the collaboration tips!', timestamp: '2 days ago', type: 'text' }
    ]
  }
];

// Mock data for freelancer profile (keeping existing)
const mockFreelancerProfile = {
  id: 1,
  name: 'Priya Sharma',
  title: 'Full-Stack Developer & UI/UX Designer',
  location: 'Mumbai, India',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535930735840-f3c6a645f80d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBJbmRpYW4lMjBmcmVlbGFuY2VyJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NDcyMjM4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  bio: 'Passionate full-stack developer with 5+ years of experience in React, Node.js, and modern web technologies. I specialize in creating beautiful, functional websites and mobile applications.',
  rating: 4.9,
  reviews: 127,
  completedProjects: 89,
  responseTime: '2 hours',
  skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Figma', 'UI/UX Design'],
  languages: ['English', 'Hindi', 'Marathi'],
  hourlyRate: '₹2,500',
  availability: 'Available',
  joinDate: 'January 2022',
  portfolioItems: [
    { id: 1, title: 'E-commerce Platform', image: 'https://images.unsplash.com/photo-1590650486895-79681b6f26a7?w=400', tech: 'React, Node.js' },
    { id: 2, title: 'Mobile Banking App', image: 'https://images.unsplash.com/photo-1590650486895-79681b6f26a7?w=400', tech: 'React Native' },
  ],
  recentReviews: [
    { id: 1, client: 'Raj Patel', rating: 5, comment: 'Excellent work on our website redesign!', date: '2 weeks ago' },
    { id: 2, client: 'Sarah Johnson', rating: 5, comment: 'Very professional and delivered on time.', date: '1 month ago' },
  ]
};

// Mock data for project details (keeping existing)
const mockProjectDetails = {
  id: 1,
  title: 'Modern E-commerce Website Development',
  description: 'We need a modern, responsive e-commerce website built with React and Node.js. The website should include user authentication, product catalog, shopping cart, and payment integration.',
  budget: '₹75,000 - ₹1,25,000',
  duration: '6-8 weeks',
  skillsRequired: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
  postedDate: '3 days ago',
  proposals: 12,
  client: {
    name: 'TechCorp Solutions',
    avatar: 'https://images.unsplash.com/photo-1590650486895-79681b6f26a7?w=100',
    rating: 4.8,
    reviews: 45,
    location: 'Bangalore, India',
    memberSince: 'March 2023'
  },
  requirements: [
    'Responsive design for mobile and desktop',
    'User registration and authentication',
    'Product catalog with search and filters',
    'Shopping cart and checkout process',
    'Payment gateway integration (Razorpay)',
    'Admin dashboard for product management',
    'Order tracking system'
  ],
  attachments: [
    { name: 'wireframes.pdf', size: '2.1 MB' },
    { name: 'brand-guidelines.pdf', size: '1.8 MB' }
  ],
  similarProjects: [
    { id: 2, title: 'Restaurant Management System', budget: '₹50,000', proposals: 8 },
    { id: 3, title: 'Healthcare App Development', budget: '₹1,00,000', proposals: 15 }
  ]
};

// AI Assistant mock data and responses
const freelancerAITools = [
  {
    id: 'proposal-writer',
    name: 'Proposal Writer',
    description: 'Get help writing compelling project proposals',
    icon: PenTool,
    color: 'text-blue-600'
  },
  {
    id: 'rate-calculator',
    name: 'Rate Calculator',
    description: 'Calculate optimal rates for your skills and experience',
    icon: Calculator,
    color: 'text-green-600'
  },
  {
    id: 'skill-analyzer',
    name: 'Skill Analyzer',
    description: 'Get recommendations for skill development',
    icon: TrendingUp,
    color: 'text-purple-600'
  },
  {
    id: 'portfolio-optimizer',
    name: 'Portfolio Optimizer',
    description: 'Optimize your portfolio for better visibility',
    icon: Award,
    color: 'text-yellow-600'
  }
];

const clientAITools = [
  {
    id: 'project-writer',
    name: 'Project Description Writer',
    description: 'Create clear and detailed project descriptions',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    id: 'budget-estimator',
    name: 'Budget Estimator',
    description: 'Get realistic budget estimates for your project',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    id: 'freelancer-matcher',
    name: 'Freelancer Matcher',
    description: 'Find the right freelancers for your project',
    icon: Users,
    color: 'text-purple-600'
  },
  {
    id: 'requirement-analyzer',
    name: 'Requirement Analyzer',
    description: 'Analyze and refine your project requirements',
    icon: Target,
    color: 'text-orange-600'
  }
];

const quickPrompts = {
  freelancer: [
    'Help me write a proposal for a React web development project',
    'What should I charge for a UI/UX design project?',
    'How can I improve my freelancer profile?',
    'Suggest skills I should learn to increase my earning potential',
    'How do I handle difficult clients professionally?'
  ],
  client: [
    'Help me write a project description for mobile app development',
    'What\'s a realistic budget for an e-commerce website?',
    'How do I evaluate freelancer proposals effectively?',
    'What information should I include in my project brief?',
    'How do I manage a remote development team?'
  ]
};

// AI response generator
const generateAIResponse = (message: string, userRole: 'freelancer' | 'client') => {
  const responses = {
    freelancer: {
      proposal: "I'd be happy to help you craft a compelling proposal! Here are key elements to include:\n\n✨ **Personalized Opening**: Address the client by name and reference specific project details\n\n🎯 **Understanding**: Demonstrate you understand their needs and challenges\n\n💼 **Experience**: Highlight relevant experience with similar projects\n\n📋 **Approach**: Outline your methodology and timeline\n\n💰 **Value Proposition**: Explain the unique value you bring\n\n📞 **Call to Action**: End with a question or next step\n\nWould you like me to help you with a specific section?",
      
      rate: "Based on current Indian market rates for your experience level:\n\n💵 **Junior (0-2 years)**: ₹500-1,500/hour\n💰 **Mid-level (2-5 years)**: ₹1,500-3,000/hour\n🏆 **Senior (5+ years)**: ₹3,000-6,000/hour\n\n**Factors to consider:**\n• Project complexity\n• Client budget\n• Your unique expertise\n• Market demand for skills\n• Timeline urgency\n\nRemember: It's better to charge fairly and deliver excellent work than to undervalue yourself!",
      
      profile: "Here are key tips to optimize your freelancer profile:\n\n📸 **Professional Photo**: Use a clear, friendly headshot\n📝 **Compelling Headline**: Highlight your main skills and value\n🎯 **Skills Section**: Focus on in-demand, relevant skills\n💼 **Portfolio**: Showcase 3-5 best projects with case studies\n⭐ **Client Testimonials**: Display positive reviews prominently\n📈 **Regular Updates**: Keep your profile fresh and active\n\nYour current profile strength: Good foundation, but could benefit from more specific project examples!"
    },
    client: {
      project: "Let me help you create an effective project description:\n\n📋 **Project Overview**: Clear, concise summary of what you need\n🎯 **Specific Requirements**: Detailed list of features and functionality\n💼 **Technical Specifications**: Mention preferred technologies if any\n📅 **Timeline**: Realistic project duration and key milestones\n💰 **Budget Range**: Give freelancers an idea of your budget\n📊 **Success Criteria**: Define what success looks like\n🔄 **Communication Preferences**: How you like to stay updated\n\nThis helps attract qualified freelancers and reduces back-and-forth!",
      
      budget: "Here's a realistic budget framework for common projects:\n\n🌐 **Simple Website**: ₹25,000-75,000\n🛒 **E-commerce Platform**: ₹75,000-2,50,000\n📱 **Mobile App**: ₹1,00,000-5,00,000\n⚙️ **Custom Software**: ₹2,00,000-10,00,000+\n\n**Factors affecting cost:**\n• Project complexity\n• Design requirements\n• Third-party integrations\n• Platform compatibility\n• Maintenance needs\n\nTip: Allocate 10-15% extra for revisions and unexpected changes!",
      
      evaluation: "Here's how to evaluate freelancer proposals effectively:\n\n✅ **Technical Understanding**: Do they grasp your requirements?\n📊 **Relevant Experience**: Similar projects in their portfolio?\n💬 **Communication Quality**: Clear, professional responses?\n⏰ **Realistic Timeline**: Neither too fast nor too slow?\n💰 **Value for Money**: Not just cheapest, but best value?\n🔍 **Questions Asked**: Good freelancers ask clarifying questions!\n\nRed flags: Generic proposals, unrealistic timelines, no questions asked."
    }
  };

  const lowerMessage = message.toLowerCase();
  
  if (userRole === 'freelancer') {
    if (lowerMessage.includes('proposal') || lowerMessage.includes('write')) {
      return responses.freelancer.proposal;
    } else if (lowerMessage.includes('rate') || lowerMessage.includes('charge') || lowerMessage.includes('price')) {
      return responses.freelancer.rate;
    } else if (lowerMessage.includes('profile') || lowerMessage.includes('portfolio')) {
      return responses.freelancer.profile;
    }
  } else {
    if (lowerMessage.includes('project') || lowerMessage.includes('description')) {
      return responses.client.project;
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
      return responses.client.budget;
    } else if (lowerMessage.includes('evaluate') || lowerMessage.includes('proposal')) {
      return responses.client.evaluation;
    }
  }

  // Default response
  return `I understand you're asking about "${message}". As your AI assistant, I'm here to help with ${userRole === 'freelancer' ? 'growing your freelance business' : 'managing your projects effectively'}. Could you be more specific about what you'd like help with?

${userRole === 'freelancer' 
  ? '💡 I can help with proposals, pricing, skill development, and client management!'
  : '💡 I can help with project planning, freelancer evaluation, and team management!'
}`;
};

// Profile Pages Component (keeping existing)
export function ProfilePages() {
  const { setCurrentPage, user, currentPage } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockFreelancerProfile);

  const isPublicProfile = currentPage === 'public-profile';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(user.role === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
              className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <div>
              <h1>
                {isPublicProfile ? 'Public Profile' : 'My Profile'}
              </h1>
              <p className="text-gray-600">
                {isPublicProfile ? 'This is how others see your profile' : 'Manage your profile information'}
              </p>
            </div>
          </div>
          {!isPublicProfile && (
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant="outline"
              className="border-[#4DAFFF] text-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white"
            >
              {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1">
            <Card className="border-0 nexlance-shadow mb-6">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={profileData.avatar} alt={profileData.name} />
                  <AvatarFallback className="bg-[#4DAFFF] text-white text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <Input value={profileData.name} placeholder="Full Name" />
                    <Input value={profileData.title} placeholder="Professional Title" />
                    <div className="flex items-center space-x-2 justify-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <Input value={profileData.location} placeholder="Location" className="text-center" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-[#1B2C4A] mb-2">{profileData.name}</h2>
                    <p className="text-gray-600 mb-3">{profileData.title}</p>
                    <div className="flex items-center space-x-2 justify-center text-sm text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-semibold">{profileData.rating}</span>
                    <span className="text-gray-500 ml-1">({profileData.reviews} reviews)</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-[#1B2C4A]">{profileData.completedProjects}</div>
                    <div className="text-gray-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#1B2C4A]">{profileData.responseTime}</div>
                    <div className="text-gray-600">Response</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability & Rate */}
            <Card className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold text-[#1B2C4A]">Availability</Label>
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm">{profileData.availability}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-semibold text-[#1B2C4A]">Hourly Rate</Label>
                    <div className="mt-2 font-bold text-lg text-[#FF4D6D]">{profileData.hourlyRate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <div className="space-y-6">
                  <Card className="border-0 nexlance-shadow">
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <Textarea 
                          value={profileData.bio} 
                          placeholder="Tell us about yourself..."
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-0 nexlance-shadow">
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <SkillsSelector />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.map((skill, index) => (
                            <Badge key={index} className="bg-[#4DAFFF]/10 text-[#4DAFFF] hover:bg-[#4DAFFF]/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-0 nexlance-shadow">
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profileData.languages.map((language, index) => (
                          <Badge key={index} variant="outline" className="border-[#1B2C4A] text-[#1B2C4A]">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="portfolio">
                <Card className="border-0 nexlance-shadow">
                  <CardHeader>
                    <CardTitle>Portfolio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {profileData.portfolioItems.map((item) => (
                        <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold text-[#1B2C4A] mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.tech}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="border-0 nexlance-shadow">
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {profileData.recentReviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-[#4DAFFF] rounded-full flex items-center justify-center text-white text-sm">
                                {review.client.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-[#1B2C4A]">{review.client}</div>
                                <div className="text-xs text-gray-500">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact">
                <Card className="border-0 nexlance-shadow">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-[#4DAFFF]" />
                        {isEditing ? (
                          <Input value={profileData.email} placeholder="Email" />
                        ) : (
                          <span>{profileData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-[#4DAFFF]" />
                        {isEditing ? (
                          <Input value={profileData.phone} placeholder="Phone" />
                        ) : (
                          <span>{profileData.phone}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-[#4DAFFF]" />
                        <span>Member since {profileData.joinDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Project Details Component (keeping existing)
export function ProjectDetails() {
  const { setCurrentPage, user } = useAppContext();
  const [hasApplied, setHasApplied] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage('find-projects')}
            className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>
          <div>
            <h1>Project Details</h1>
            <p className="text-gray-600">Complete project information and requirements</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 nexlance-shadow mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockProjectDetails.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Posted {mockProjectDetails.postedDate}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {mockProjectDetails.proposals} proposals
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        47 views
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#1B2C4A] mb-3">Project Description</h3>
                    <p className="text-gray-700 leading-relaxed">{mockProjectDetails.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1B2C4A] mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {mockProjectDetails.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1B2C4A] mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockProjectDetails.skillsRequired.map((skill, index) => (
                        <Badge key={index} className="bg-[#4DAFFF]/10 text-[#4DAFFF]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {mockProjectDetails.attachments.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-[#1B2C4A] mb-3">Attachments</h3>
                      <div className="space-y-2">
                        {mockProjectDetails.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-[#4DAFFF]" />
                              <div>
                                <div className="font-medium text-[#1B2C4A]">{file.name}</div>
                                <div className="text-sm text-gray-500">{file.size}</div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Similar Projects */}
            <Card className="border-0 nexlance-shadow">
              <CardHeader>
                <CardTitle>Similar Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProjectDetails.similarProjects.map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-[#1B2C4A]">{project.title}</h4>
                          <p className="text-sm text-gray-600">Budget: {project.budget}</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {project.proposals} proposals
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Apply Section */}
            <Card className="border-0 nexlance-shadow mb-6">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-[#FF4D6D] mb-1">{mockProjectDetails.budget}</div>
                  <div className="text-sm text-gray-600">Fixed Price</div>
                </div>
                <div className="text-center mb-4">
                  <div className="font-semibold text-[#1B2C4A]">{mockProjectDetails.duration}</div>
                  <div className="text-sm text-gray-600">Project Duration</div>
                </div>
                
                {hasApplied ? (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-green-600 font-medium mb-2">Application Submitted</p>
                    <p className="text-sm text-gray-600">You'll be notified if the client is interested</p>
                  </div>
                ) : (
                  <Button
                    onClick={() => setHasApplied(true)}
                    className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
                  >
                    Apply for this Project
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Client Info */}
            <Card className="border-0 nexlance-shadow">
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={mockProjectDetails.client.avatar} alt={mockProjectDetails.client.name} />
                    <AvatarFallback className="bg-[#4DAFFF] text-white">
                      {mockProjectDetails.client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1B2C4A]">{mockProjectDetails.client.name}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{mockProjectDetails.client.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({mockProjectDetails.client.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {mockProjectDetails.client.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member since {mockProjectDetails.client.memberSince}
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full border-[#4DAFFF] text-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Client
                  </Button>
                  <Button variant="ghost" className="w-full text-[#1B2C4A] hover:bg-gray-100">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Client Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Real-Time Messages Component (keeping existing)
export function Messages() {
  const { setCurrentPage, user } = useAppContext();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new messages or status updates
      const randomConversation = conversations[Math.floor(Math.random() * conversations.length)];
      if (Math.random() > 0.7) {
        // Simulate status change
        setConversations(prev => prev.map(conv => 
          conv.id === randomConversation.id 
            ? { ...conv, participant: { ...conv.participant, online: !conv.participant.online } }
            : conv
        ));
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [conversations]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text' as const
    };

    // Update the selected conversation
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
      lastMessage: newMessage,
      timestamp: 'Just now'
    }));

    // Update conversations list
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation.id 
        ? { ...conv, messages: [...conv.messages, newMsg], lastMessage: newMessage, timestamp: 'Just now' }
        : conv
    ));

    setNewMessage('');

    // Simulate response after a delay
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        senderId: selectedConversation.participant.name.toLowerCase().replace(' ', ''),
        content: 'Thanks for your message! I\'ll get back to you soon.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text' as const
      };

      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, response],
        lastMessage: response.content,
        timestamp: 'Just now'
      }));

      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, messages: [...conv.messages, response], lastMessage: response.content, timestamp: 'Just now', unreadCount: conv.unreadCount + 1 }
          : conv
      ));
    }, 2000 + Math.random() * 3000);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(user.role === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
              className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <div>
              <h1>Messages</h1>
              <p className="text-gray-600">
                Real-time chat with clients and freelancers
                {totalUnread > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#FF4D6D] text-white">
                    {totalUnread} unread
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-88px)]">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => {
                    setSelectedConversation(conversation);
                    // Mark as read
                    setConversations(prev => prev.map(conv => 
                      conv.id === conversation.id ? { ...conv, unreadCount: 0 } : conv
                    ));
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                    selectedConversation.id === conversation.id 
                      ? 'bg-[#4DAFFF]/10 border-l-4 border-[#4DAFFF]' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                        <AvatarFallback className="bg-[#4DAFFF] text-white">
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.participant.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-[#1B2C4A] truncate">{conversation.participant.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="ml-2 bg-[#FF4D6D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs">
                          {conversation.participant.role}
                        </Badge>
                        {conversation.projectTitle && (
                          <span className="text-xs text-gray-500 ml-2 truncate">
                            {conversation.projectTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} />
                    <AvatarFallback className="bg-[#4DAFFF] text-white">
                      {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.participant.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-[#1B2C4A]">{selectedConversation.participant.name}</h2>
                  <p className="text-sm text-gray-600">
                    {selectedConversation.participant.online ? 'Online' : `Last seen ${selectedConversation.participant.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.senderId === 'me'
                          ? 'bg-[#4DAFFF] text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                      message.senderId === 'me' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{message.timestamp}</span>
                      {message.senderId === 'me' && (
                        <CheckCheck className="w-3 h-3 ml-1 text-[#4DAFFF]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <ImageIcon className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <Smile className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Info Sidebar (Optional) */}
        <div className="w-64 bg-white border-l border-gray-200 hidden xl:block">
          <div className="p-4">
            <div className="text-center mb-6">
              <Avatar className="w-16 h-16 mx-auto mb-3">
                <AvatarImage src={selectedConversation.participant.avatar} alt={selectedConversation.participant.name} />
                <AvatarFallback className="bg-[#4DAFFF] text-white text-lg">
                  {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-[#1B2C4A]">{selectedConversation.participant.name}</h3>
              <p className="text-sm text-gray-600">{selectedConversation.participant.role}</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-[#1B2C4A]">Project</Label>
                <p className="text-sm text-gray-600 mt-1">{selectedConversation.projectTitle}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm">
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Pin className="w-4 h-4 mr-2" />
                  Pin Chat
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Comprehensive AI Assistant Component
export function AIAssistant() {
  const { setCurrentPage, user } = useAppContext();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant' as const,
      content: user.role === 'freelancer' 
        ? `🎯 **Welcome to your AI Assistant!** I'm here to help you grow your freelance business in India!\n\n💡 I can help you with:\n• Writing compelling proposals\n• Setting competitive rates\n• Improving your profile\n• Finding the right projects\n• Managing client relationships\n\nWhat would you like assistance with today?`
        : `🎯 **Welcome to your AI Assistant!** I'm here to help you manage projects and find the best freelancers!\n\n💡 I can help you with:\n• Writing clear project descriptions\n• Setting realistic budgets\n• Evaluating freelancer proposals\n• Managing your team\n• Project planning and execution\n\nWhat would you like assistance with today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentTools = user.role === 'freelancer' ? freelancerAITools : clientAITools;
  const currentPrompts = user.role === 'freelancer' ? quickPrompts.freelancer : quickPrompts.client;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || newMessage;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user' as const,
      content: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant' as const,
        content: generateAIResponse(messageToSend, user.role as 'freelancer' | 'client'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    const tool = currentTools.find(t => t.id === toolId);
    if (tool) {
      handleSendMessage(`Help me with ${tool.name}: ${tool.description}`);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage(user.role === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
              className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Dashboard
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-[#4DAFFF]" />
                <h1>AI Assistant</h1>
                <Badge className="bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Powered by AI
                </Badge>
              </div>
              <p className="text-gray-600">Your intelligent companion for freelance success</p>
            </div>
          </div>
          <Button
            onClick={() => setMessages([messages[0]])}
            variant="outline"
            className="border-[#4DAFFF] text-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - AI Tools */}
          <div className="lg:col-span-1">
            <Card className="border-0 nexlance-shadow mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-[#FF4D6D]" />
                  AI Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentTools.map((tool) => {
                  const IconComponent = tool.icon;
                  return (
                    <Button
                      key={tool.id}
                      variant="outline"
                      className={`w-full justify-start p-4 h-auto ${
                        selectedTool === tool.id ? 'border-[#4DAFFF] bg-[#4DAFFF]/5' : ''
                      }`}
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <div className="flex items-start space-x-3 text-left">
                        <IconComponent className={`w-5 h-5 mt-0.5 ${tool.color}`} />
                        <div>
                          <div className="font-medium text-[#1B2C4A]">{tool.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{tool.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-0 nexlance-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-[#FF4D6D]" />
                  Quick Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentPrompts.slice(0, 3).map((prompt, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left p-3 h-auto text-sm hover:bg-[#4DAFFF]/5"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    <ChevronRight className="w-3 h-3 mr-2 text-[#4DAFFF]" />
                    <span className="truncate">{prompt}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 nexlance-shadow h-[600px] flex flex-col">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex space-x-3 max-w-4xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          {message.role === 'user' ? (
                            <AvatarFallback className="bg-[#FF4D6D] text-white">
                              {user.name ? user.name[0] : 'U'}
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback className="bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] text-white">
                              <Brain className="w-4 h-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                          <div className={`inline-block p-4 rounded-lg max-w-full ${
                            message.role === 'user'
                              ? 'bg-[#4DAFFF] text-white'
                              : 'bg-white border border-gray-200'
                          }`}>
                            {message.role === 'assistant' ? (
                              <div 
                                className="prose prose-sm max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{
                                  __html: message.content
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                    .replace(/• /g, '• ')
                                    .replace(/\n/g, '<br>')
                                }}
                              />
                            ) : (
                              <p className="text-sm">{message.content}</p>
                            )}
                          </div>
                          <div className={`text-xs text-gray-500 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                            {message.role === 'assistant' && <Sparkles className="w-3 h-3 inline mr-1" />}
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex space-x-3 max-w-4xl">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] text-white">
                            <Brain className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-[#4DAFFF] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#4DAFFF] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-[#4DAFFF] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Prompts Bar */}
              {messages.length <= 1 && (
                <div className="px-6 py-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {currentPrompts.slice(0, 2).map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#4DAFFF]/30 text-[#4DAFFF] hover:bg-[#4DAFFF]/5"
                        onClick={() => handleQuickPrompt(prompt)}
                      >
                        <Rocket className="w-3 h-3 mr-1" />
                        {prompt.slice(0, 40)}...
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Ask me anything about freelancing, projects, or growing your business..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      className="pr-10"
                      disabled={isTyping}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!newMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] hover:from-[#4DAFFF]/90 hover:to-[#FF4D6D]/90 text-white nexlance-button-shadow"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Powered by advanced AI • Trained for Indian freelance market</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>Press Enter to send</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Component (keeping existing)
export function Settings() {
  const { setCurrentPage, user } = useAppContext();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    projectAlerts: true,
    marketingEmails: false,
    twoFactorAuth: false,
    profileVisibility: 'public',
    language: 'english',
    currency: 'inr',
    timezone: 'IST'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(user.role === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
            className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <div>
            <h1>Settings</h1>
            <p className="text-gray-600">Manage your account preferences and privacy settings</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="space-y-6">
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <Button className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white">
                    Update Account
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white">
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-0 nexlance-shadow">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Project Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified about new projects matching your skills</p>
                  </div>
                  <Switch 
                    checked={settings.projectAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, projectAlerts: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Marketing Emails</Label>
                    <p className="text-sm text-gray-600">Receive updates about new features and promotions</p>
                  </div>
                  <Switch 
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label className="font-medium">Profile Visibility</Label>
                    <p className="text-sm text-gray-600 mb-3">Control who can see your profile</p>
                    <Select value={settings.profileVisibility} onValueChange={(value) => setSettings(prev => ({ ...prev, profileVisibility: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Everyone can see</SelectItem>
                        <SelectItem value="clients">Clients Only</SelectItem>
                        <SelectItem value="private">Private - Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Your Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">No payment methods added yet</p>
                  <Button className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">No billing history available</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="border-0 nexlance-shadow">
              <CardHeader>
                <CardTitle>App Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-medium">Language</Label>
                  <p className="text-sm text-gray-600 mb-3">Choose your preferred language</p>
                  <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                      <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium">Currency</Label>
                  <p className="text-sm text-gray-600 mb-3">Choose your preferred currency</p>
                  <Select value={settings.currency} onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium">Timezone</Label>
                  <p className="text-sm text-gray-600 mb-3">Choose your timezone</p>
                  <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                      <SelectItem value="UTC">Coordinated Universal Time (UTC)</SelectItem>
                      <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Payment Flow Component (keeping existing)
export function PaymentFlow() {
  const { setCurrentPage, user } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage(user.role === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
            className="flex items-center text-gray-600 hover:text-[#1B2C4A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <div>
            <h1>Payments</h1>
            <p className="text-gray-600">Secure payment processing</p>
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <Card className="border-0 nexlance-shadow">
          <CardContent className="p-8 text-center">
            <CreditCard className="w-16 h-16 mx-auto text-[#FF4D6D] mb-4" />
            <h2>Payment System</h2>
            <p className="text-gray-600 mb-6">Secure payment processing with Razorpay integration coming soon!</p>
            <Button 
              onClick={() => setCurrentPage(user.role === 'freelancer' ? 'freelancer-dashboard' : 'client-dashboard')}
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white"
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}