import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { 
  Search,
  Filter,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Heart,
  ArrowLeft,
  Briefcase
} from 'lucide-react';

export function FindProjects() {
  const { setCurrentPage } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('any');
  const [selectedDuration, setSelectedDuration] = useState('any');
  
  const categories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Content Writing',
    'Digital Marketing',
    'Data Science',
    'Graphic Design',
    'Translation'
  ];

  const projects = [
    {
      id: 1,
      title: "Build a Modern E-commerce Website with React",
      description: "Looking for an experienced React developer to build a complete e-commerce platform with user authentication, payment integration, and admin panel.",
      client: {
        name: "TechStart Solutions",
        avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop",
        rating: 4.8,
        reviews: 45,
        verified: true
      },
      budget: "₹50,000 - ₹75,000",
      duration: "3-4 weeks",
      location: "Remote",
      skills: ["React", "Node.js", "MongoDB", "Stripe"],
      posted: "2 hours ago",
      proposals: 12,
      category: "Web Development",
      saved: false
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design for Fitness Platform",
      description: "Need a talented designer to create modern, user-friendly designs for our fitness tracking mobile app. Must have experience with health/fitness apps.",
      client: {
        name: "FitLife Inc",
        avatar: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=150&h=150&fit=crop",
        rating: 4.9,
        reviews: 67,
        verified: true
      },
      budget: "₹25,000 - ₹40,000",
      duration: "2-3 weeks",
      location: "Remote",
      skills: ["Figma", "UI/UX Design", "Prototyping", "Mobile Design"],
      posted: "4 hours ago",
      proposals: 8,
      category: "UI/UX Design",
      saved: true
    },
    {
      id: 3,
      title: "Content Writing for SaaS Platform Blog",
      description: "Looking for experienced content writer to create engaging blog posts about technology, business, and productivity. SEO knowledge required.",
      client: {
        name: "InnovateTech",
        avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop",
        rating: 4.7,
        reviews: 32,
        verified: true
      },
      budget: "₹15,000 - ₹25,000",
      duration: "2 weeks",
      location: "Remote",
      skills: ["Content Writing", "SEO", "Technical Writing", "Research"],
      posted: "6 hours ago",
      proposals: 15,
      category: "Content Writing",
      saved: false
    },
    {
      id: 4,
      title: "WordPress Plugin Development",
      description: "Need a WordPress expert to develop a custom plugin for membership management with payment integration and user dashboard.",
      client: {
        name: "Digital Agency Pro",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        rating: 4.6,
        reviews: 28,
        verified: true
      },
      budget: "₹30,000 - ₹45,000",
      duration: "3 weeks",
      location: "Remote",
      skills: ["WordPress", "PHP", "MySQL", "JavaScript"],
      posted: "1 day ago",
      proposals: 23,
      category: "Web Development",
      saved: false
    },
    {
      id: 5,
      title: "Logo Design and Brand Identity",
      description: "Startup looking for creative designer to design logo and complete brand identity including business cards, letterhead, and social media assets.",
      client: {
        name: "StartupXYZ",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
        rating: 4.5,
        reviews: 12,
        verified: false
      },
      budget: "₹8,000 - ₹15,000",
      duration: "1-2 weeks",
      location: "Remote",
      skills: ["Logo Design", "Brand Identity", "Adobe Illustrator", "Adobe Photoshop"],
      posted: "1 day ago",
      proposals: 19,
      category: "Graphic Design",
      saved: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
              <h1 className="text-2xl font-bold text-[#1B2C4A]">Find Projects</h1>
              <p className="text-gray-600">Discover opportunities that match your skills</p>
            </div>
          </div>
          <Button
            onClick={() => setCurrentPage('ai-assistant')}
            variant="outline"
            className="text-[#4DAFFF] border-[#4DAFFF] hover:bg-[#4DAFFF] hover:text-white"
          >
            AI Assistant
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 nexlance-shadow sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-[#1B2C4A]">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Budget Range</label>
                  <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Budget</SelectItem>
                      <SelectItem value="0-10000">₹0 - ₹10,000</SelectItem>
                      <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                      <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50000+">₹50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Project Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Duration</SelectItem>
                      <SelectItem value="1week">Less than 1 week</SelectItem>
                      <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                      <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
                      <SelectItem value="1month+">More than 1 month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Other Filters */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Additional Filters</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label htmlFor="verified" className="text-sm text-gray-600">Verified Clients Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remote" />
                      <label htmlFor="remote" className="text-sm text-gray-600">Remote Work</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="low-competition" />
                      <label htmlFor="low-competition" className="text-sm text-gray-600">Low Competition</label>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBudget('any');
                    setSelectedDuration('any');
                    setSearchQuery('');
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <Card className="border-0 nexlance-shadow mb-6">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search projects, skills, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {filteredProjects.length} projects found
              </div>
              <Select defaultValue="recent">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  <SelectItem value="proposals-low">Fewest Proposals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Projects List */}
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border-0 nexlance-shadow hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold text-[#1B2C4A]">{project.title}</h3>
                          <button className="text-gray-400 hover:text-[#FF4D6D] transition-colors">
                            <Heart className={`w-5 h-5 ${project.saved ? 'fill-current text-[#FF4D6D]' : ''}`} />
                          </button>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                        
                        {/* Client Info */}
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                            <img src={project.client.avatar} alt={project.client.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-[#1B2C4A]">{project.client.name}</span>
                              {project.client.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 border-none text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{project.client.rating}</span>
                              <span>({project.client.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 border-none">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-[#FF4D6D]" />
                        {project.budget}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#4DAFFF]" />
                        {project.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                        {project.proposals} proposals
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Posted {project.posted}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white" size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}