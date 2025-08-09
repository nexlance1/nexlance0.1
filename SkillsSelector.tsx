import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Plus, X } from 'lucide-react';
import { COMMON_SKILLS } from './constants';

interface SkillsSelectorProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export function SkillsSelector({ skills, onSkillsChange }: SkillsSelectorProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  const addCommonSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onSkillsChange([...skills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Add a skill (e.g., React, Node.js)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
        />
        <Button type="button" onClick={addSkill} variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-[#FFE5F1] text-[#FF4D6D] border-none">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div>
        <Label className="text-sm text-gray-600 mb-2 block">Popular Skills:</Label>
        <div className="flex flex-wrap gap-2">
          {COMMON_SKILLS.slice(0, 12).map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => addCommonSkill(skill)}
              disabled={skills.includes(skill)}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                skills.includes(skill)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-[#4DAFFF] hover:text-white hover:border-[#4DAFFF]'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}