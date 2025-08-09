import React, { useState } from 'react';
import { useAppContext } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { SkillsSelector } from './SkillsSelector';
import { CATEGORIES, DURATION_OPTIONS, EXPERIENCE_LEVELS } from './constants';
import { ArrowLeft, DollarSign, Clock, Users } from 'lucide-react';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  skills: string[];
  budgetType: 'fixed' | 'hourly';
  budgetMin: string;
  budgetMax: string;
  duration: string;
  experienceLevel: string;
}

export function PostProject() {
  const { setCurrentPage } = useAppContext();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    skills: [],
    budgetType: 'fixed',
    budgetMin: '',
    budgetMax: '',
    duration: '',
    experienceLevel: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Project posted successfully! Redirecting to dashboard...');
    setCurrentPage('client-dashboard');
  };

  const updateFormData = (updates: Partial<ProjectFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

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
              <h1 className="text-2xl font-bold text-[#1B2C4A]">Post a Project</h1>
              <p className="text-gray-600">Find the perfect freelancer for your needs</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Details */}
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2C4A]">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Build a responsive e-commerce website"
                      value={formData.title}
                      onChange={(e) => updateFormData({ title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project in detail. Include requirements, expectations, and any specific guidelines..."
                      value={formData.description}
                      onChange={(e) => updateFormData({ description: e.target.value })}
                      rows={6}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skills Required */}
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2C4A]">Skills Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <SkillsSelector
                    skills={formData.skills}
                    onSkillsChange={(skills) => updateFormData({ skills })}
                  />
                </CardContent>
              </Card>

              {/* Budget & Timeline */}
              <Card className="border-0 nexlance-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B2C4A]">Budget & Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Budget Type *</Label>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="fixed"
                          checked={formData.budgetType === 'fixed'}
                          onCheckedChange={() => updateFormData({ budgetType: 'fixed' })}
                        />
                        <Label htmlFor="fixed">Fixed Price</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hourly"
                          checked={formData.budgetType === 'hourly'}
                          onCheckedChange={() => updateFormData({ budgetType: 'hourly' })}
                        />
                        <Label htmlFor="hourly">Hourly Rate</Label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budgetMin">
                        {formData.budgetType === 'fixed' ? 'Minimum Budget (₹)' : 'Min Hourly Rate (₹)'}
                      </Label>
                      <Input
                        id="budgetMin"
                        type="number"
                        placeholder="10000"
                        value={formData.budgetMin}
                        onChange={(e) => updateFormData({ budgetMin: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetMax">
                        {formData.budgetType === 'fixed' ? 'Maximum Budget (₹)' : 'Max Hourly Rate (₹)'}
                      </Label>
                      <Input
                        id="budgetMax"
                        type="number"
                        placeholder="25000"
                        value={formData.budgetMax}
                        onChange={(e) => updateFormData({ budgetMax: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Project Duration *</Label>
                    <Select value={formData.duration} onValueChange={(value) => updateFormData({ duration: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATION_OPTIONS.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level Required *</Label>
                    <Select value={formData.experienceLevel} onValueChange={(value) => updateFormData({ experienceLevel: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentPage('client-dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-white nexlance-button-shadow"
                >
                  Post Project
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="border-0 nexlance-shadow mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-[#1B2C4A]">Project Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1B2C4A]">
                    {formData.title || 'Your Project Title'}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.description ? 
                      formData.description.substring(0, 100) + (formData.description.length > 100 ? '...' : '') 
                      : 'Your project description will appear here...'
                    }
                  </p>
                </div>

                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {formData.skills.slice(0, 5).map((skill) => (
                      <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {formData.skills.length > 5 && (
                      <span className="text-xs text-gray-500">+{formData.skills.length - 5} more</span>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-gray-50 rounded">
                    <DollarSign className="w-4 h-4 mx-auto text-[#FF4D6D] mb-1" />
                    <div className="text-xs text-gray-600">Budget</div>
                    <div className="text-xs font-medium">
                      {formData.budgetMin && formData.budgetMax 
                        ? `₹${formData.budgetMin}-${formData.budgetMax}`
                        : 'Not set'
                      }
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <Clock className="w-4 h-4 mx-auto text-[#4DAFFF] mb-1" />
                    <div className="text-xs text-gray-600">Duration</div>
                    <div className="text-xs font-medium">
                      {DURATION_OPTIONS.find(d => d.value === formData.duration)?.label || 'Not set'}
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <Users className="w-4 h-4 mx-auto text-green-500 mb-1" />
                    <div className="text-xs text-gray-600">Level</div>
                    <div className="text-xs font-medium">
                      {EXPERIENCE_LEVELS.find(e => e.value === formData.experienceLevel)?.label.split(' ')[0] || 'Not set'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 nexlance-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-[#1B2C4A]">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#FF4D6D] rounded-full mt-2"></div>
                  <p>Write a clear, detailed project description</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[#4DAFFF] rounded-full mt-2"></div>
                  <p>List all required skills accurately</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p>Set a realistic budget and timeline</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <p>Respond to proposals quickly</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}