import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Home, 
  Search, 
  FileText, 
  MessageCircle, 
  User, 
  Settings, 
  LogOut,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Eye,
  Calendar,
  Bell,
  Menu,
  X
} from 'lucide-react';

export function FreelancerDashboard() {
  const { user, setCurrentPage, setUser } = useAppContext();
  const [isAvailable, setIsAvailable] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, page: 'freelancer-dashboard' },
    { id: 'projects', label: 'Find Projects', icon: Search, page: 'find-projects' },
    { id: 'applied', label: 'Applied Projects', icon: FileText, page: 'applied-projects' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, page: 'messages' },
    { id: 'profile', label: 'Profile', icon: User, page: 'profile' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'settings' },
  ];

  const recommendedProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "TechStart Solutions",
      budget: "₹50,000 - ₹75,000",
      duration: "3-4 weeks",
      skills: ["React", "Node.js", "MongoDB"],
      posted: "2 hours ago",
      proposals: 12
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      client: "Creative Agency",
      budget: "₹25,000 - ₹40,000",
      duration: "2-3 weeks",
      skills: ["Figma", "UI/UX", "Prototyping"],
      posted: "4 hours ago",
      proposals: 8
    },
    {
      id: 3,
      title: "Content Writing for SaaS Platform",
      client: "InnovateTech",
      budget: "₹15,000 - ₹25,000",
      duration: "2 weeks",
      skills: ["Content Writing", "SEO", "Technical Writing"],
      posted: "6 hours ago",
      proposals: 15
    }
  ];

  const recentApplications = [
    {
      id: 1,
      title: "WordPress Plugin Development",
      status: "Under Review",
      appliedDate: "2024-01-08",
      budget: "₹30,000"
    },
    {
      id: 2,
      title: "Logo Design for Startup",
      status: "Interview Scheduled",
      appliedDate: "2024-01-07",
      budget: "₹8,000"
    },
    {
      id: 3,
      title: "Social Media Management",
      status: "Proposal Submitted",
      appliedDate: "2024-01-06",
      budget: "₹20,000/month"
    }
  ];

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      role: null,
      name: '',
      email: '',
      avatar: ''
    });
    setCurrentPage('landing');
  };

  const Sidebar = () => (
    <div className="bg-[#1B2C4A] text-white h-full flex flex-col">
      <div className="p-6">
        <div className="text-2xl font-bold text-white mb-6">Nexlance</div>
        
        {/* User Profile Section */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-[#FF4D6D] text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-white/70">Freelancer</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Available for work</span>
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  setCurrentPage(item.page);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-colors text-left text-red-300 hover:text-red-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-[#1B2C4A]">
            <div className="flex justify-end p-4">
              <button onClick={() => setSidebarOpen(false)} className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-[#1B2C4A] h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#1B2C4A]">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setCurrentPage('ai-assistant')}
                variant="outline"
                className="hidden md:flex text-[#4DAFFF] border-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white"
              >
                AI Assistant
              </Button>
              <Button className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF4D6D] rounded-full text-xs"></span>
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">₹2,45,000</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF4D6D] to-[#4DAFFF] rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">3</p>
                    <p className="text-sm text-blue-600 flex items-center mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      2 due this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#4DAFFF] to-[#FF4D6D] rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Profile Views</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">156</p>
                    <p className="text-sm text-orange-600 flex items-center mt-1">
                      <Eye className="w-4 h-4 mr-1" />
                      +8 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Rating</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">4.9</p>
                    <p className="text-sm text-yellow-600 flex items-center mt-1">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Based on 47 reviews
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recommended Projects */}
            <div className="lg:col-span-2">
              <Card className="border-0 nexlance-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-[#1B2C4A]">Recommended for You</CardTitle>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage('find-projects')}
                    className="text-[#4DAFFF] border-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white"
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendedProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-[#4DAFFF] transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-[#1B2C4A] mb-1">{project.title}</h3>
                          <p className="text-sm text-gray-600">{project.client}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-none">
                          {project.posted}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {project.budget}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {project.duration}
                        </span>
                        <span>{project.proposals} proposals</span>
                      </div>
                      
                      <Button className="w-full bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white">
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <div>
              <Card className="border-0 nexlance-shadow mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2C4A]">Recent Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="border-l-4 border-[#4DAFFF] pl-4">
                      <h4 className="font-medium text-[#1B2C4A]">{app.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <Badge 
                          variant={app.status === 'Interview Scheduled' ? 'default' : 'secondary'}
                          className={
                            app.status === 'Interview Scheduled' 
                              ? 'bg-green-100 text-green-800 border-none' 
                              : 'bg-yellow-100 text-yellow-800 border-none'
                          }
                        >
                          {app.status}
                        </Badge>
                        <span className="text-sm text-gray-600">{app.budget}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Applied on {app.appliedDate}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2C4A]">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('profile-settings')}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Update Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('find-projects')}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Projects
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('messages')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Check Messages
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}