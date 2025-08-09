import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Home, 
  Plus, 
  Users, 
  MessageCircle, 
  User, 
  Settings, 
  LogOut,
  DollarSign,
  Clock,
  Star,
  TrendingUp,
  Eye,
  FileText,
  Bell,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';

export function ClientDashboard() {
  const { user, setCurrentPage, setUser } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, page: 'client-dashboard' },
    { id: 'post-project', label: 'Post Project', icon: Plus, page: 'post-project' },
    { id: 'applications', label: 'View Applications', icon: Users, page: 'view-applications' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, page: 'messages' },
    { id: 'profile', label: 'Profile', icon: User, page: 'profile' },
    { id: 'settings', label: 'Settings', icon: Settings, page: 'settings' },
  ];

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      freelancer: {
        name: "Rahul Kumar",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4.9
      },
      budget: "₹65,000",
      progress: 75,
      deadline: "2024-01-20",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      freelancer: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.8
      },
      budget: "₹35,000",
      progress: 90,
      deadline: "2024-01-15",
      status: "Near Completion"
    },
    {
      id: 3,
      title: "Content Writing for Blog",
      freelancer: {
        name: "Amit Singh",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.7
      },
      budget: "₹20,000",
      progress: 45,
      deadline: "2024-01-25",
      status: "In Progress"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      projectTitle: "WordPress Plugin Development",
      applicantCount: 23,
      topApplicant: {
        name: "Vikash Patel",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        rating: 4.9,
        proposal: "₹45,000"
      },
      postedDate: "2024-01-08"
    },
    {
      id: 2,
      projectTitle: "Social Media Graphics",
      applicantCount: 18,
      topApplicant: {
        name: "Sneha Gupta",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        proposal: "₹15,000"
      },
      postedDate: "2024-01-07"
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
              <div className="text-sm text-white/70">Client</div>
            </div>
          </div>
          <div className="text-sm text-white/70">
            TechStart Solutions
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
                <h1 className="text-2xl font-bold text-[#1B2C4A]">Client Dashboard</h1>
                <p className="text-gray-600">Manage your projects and find talent</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setCurrentPage('post-project')}
                className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post Project
              </Button>
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
                    <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">₹3,25,000</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +18% this month
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
                      1 due this week
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
                    <p className="text-sm text-gray-600 mb-1">Completed Projects</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">12</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      100% success rate
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 nexlance-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Freelancers Hired</p>
                    <p className="text-2xl font-bold text-[#1B2C4A]">28</p>
                    <p className="text-sm text-yellow-600 flex items-center mt-1">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      4.8 avg rating
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Active Projects */}
            <div className="lg:col-span-2">
              <Card className="border-0 nexlance-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-[#1B2C4A]">Active Projects</CardTitle>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentPage('view-applications')}
                    className="text-[#4DAFFF] border-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white"
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#1B2C4A] mb-2">{project.title}</h3>
                          <div className="flex items-center space-x-3 mb-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={project.freelancer.avatar} />
                              <AvatarFallback>{project.freelancer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{project.freelancer.name}</p>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                <span className="text-xs text-gray-600">{project.freelancer.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary"
                          className={
                            project.status === 'Near Completion' 
                              ? 'bg-green-100 text-green-800 border-none' 
                              : 'bg-blue-100 text-blue-800 border-none'
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#FF4D6D] to-[#4DAFFF] h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {project.budget}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Due: {project.deadline}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setCurrentPage('messages')}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </div>
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
                      <h4 className="font-medium text-[#1B2C4A] mb-1">{app.projectTitle}</h4>
                      <p className="text-sm text-gray-600 mb-2">{app.applicantCount} applications received</p>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={app.topApplicant.avatar} />
                            <AvatarFallback>{app.topApplicant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{app.topApplicant.name}</p>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                              <span className="text-xs text-gray-600">{app.topApplicant.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Top bid: {app.topApplicant.proposal}</span>
                          <Button size="sm" className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white">
                            View Profile
                          </Button>
                        </div>
                      </div>
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
                    className="w-full justify-start bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white"
                    onClick={() => setCurrentPage('post-project')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Project
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('view-applications')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Review Applications
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('messages')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Check Messages
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setCurrentPage('payment')}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Payment History
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