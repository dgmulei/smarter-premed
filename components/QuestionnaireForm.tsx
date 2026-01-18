'use client';

import { useState, FormEvent } from 'react';

interface QuestionnaireFormProps {
  onSubmit: (formData: Record<string, string>) => void;
  isSubmitting: boolean;
}

const questions = [
  {
    id: 'gpa',
    label: 'What is your current cumulative GPA?',
    type: 'select',
    options: [
      { value: '', label: 'Select your GPA range' },
      { value: 'below-3.0', label: 'Below 3.0' },
      { value: '3.0-3.3', label: '3.0 - 3.3' },
      { value: '3.4-3.6', label: '3.4 - 3.6' },
      { value: '3.7-3.8', label: '3.7 - 3.8' },
      { value: '3.9-4.0', label: '3.9 - 4.0' },
    ],
  },
  {
    id: 'clinical_hours',
    label: 'Approximately how many clinical volunteer/shadowing hours do you have?',
    type: 'select',
    options: [
      { value: '', label: 'Select hours range' },
      { value: '0-50', label: '0 - 50 hours' },
      { value: '51-150', label: '51 - 150 hours' },
      { value: '151-300', label: '151 - 300 hours' },
      { value: '301-500', label: '301 - 500 hours' },
      { value: '500+', label: '500+ hours' },
    ],
  },
  {
    id: 'research_experience',
    label: 'What best describes your research experience?',
    type: 'select',
    options: [
      { value: '', label: 'Select your experience' },
      { value: 'none', label: 'No research experience' },
      { value: 'some-exposure', label: 'Some exposure (coursework or brief projects)' },
      { value: 'ongoing', label: 'Ongoing research project (1+ semesters)' },
      { value: 'publication', label: 'Research with publication or presentation' },
      { value: 'extensive', label: 'Extensive research (multiple projects/publications)' },
    ],
  },
  {
    id: 'leadership',
    label: 'Which best describes your leadership and service activities?',
    type: 'select',
    options: [
      { value: '', label: 'Select your involvement' },
      { value: 'minimal', label: 'Minimal involvement' },
      { value: 'member', label: 'Active member of 1-2 organizations' },
      { value: 'officer', label: 'Leadership role in 1+ organization' },
      { value: 'founder', label: 'Founded or led significant initiative' },
      { value: 'extensive', label: 'Extensive leadership across multiple areas' },
    ],
  },
  {
    id: 'clinical_work',
    label: 'Do you have any paid clinical work experience (EMT, CNA, scribe, etc.)?',
    type: 'select',
    options: [
      { value: '', label: 'Select your experience' },
      { value: 'none', label: 'No paid clinical work' },
      { value: 'part-time', label: 'Part-time clinical work (1-2 semesters)' },
      { value: 'substantial', label: 'Substantial clinical work (1+ years)' },
      { value: 'full-time', label: 'Full-time clinical work or gap year(s)' },
    ],
  },
  {
    id: 'specialty_interest',
    label: 'Do you have a specific medical specialty or career path in mind?',
    type: 'select',
    options: [
      { value: '', label: 'Select your interest' },
      { value: 'undecided', label: 'Still exploring/undecided' },
      { value: 'general-interest', label: 'General interest in a field (primary care, surgery, etc.)' },
      { value: 'specific', label: 'Specific specialty in mind with some exposure' },
      { value: 'committed', label: 'Committed to specific path with relevant experience' },
    ],
  },
  {
    id: 'underserved',
    label: 'Have you worked with underserved or diverse patient populations?',
    type: 'select',
    options: [
      { value: '', label: 'Select your experience' },
      { value: 'no', label: 'No direct experience' },
      { value: 'some', label: 'Some exposure through volunteering or clinical work' },
      { value: 'significant', label: 'Significant involvement (6+ months)' },
      { value: 'extensive', label: 'Extensive commitment or lived experience' },
    ],
  },
  {
    id: 'unique_experience',
    label: 'What makes your pre-med journey unique?',
    type: 'textarea',
    placeholder: 'Describe any unique experiences, challenges overcome, or distinctive perspectives you bring (e.g., non-traditional path, overcoming adversity, unique cultural background, specific passion project)...',
  },
];

export default function QuestionnaireForm({ onSubmit, isSubmitting }: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    questions.forEach(q => {
      if (!formData[q.id] || formData[q.id].trim() === '') {
        newErrors[q.id] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 sm:p-12 slide-up">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div
            key={question.id}
            id={question.id}
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <label
              htmlFor={`input-${question.id}`}
              className="block text-lg font-medium mb-3 text-gray-200"
            >
              {question.label}
            </label>

            {question.type === 'select' ? (
              <select
                id={`input-${question.id}`}
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors[question.id]
                    ? 'border-red-500/50'
                    : 'border-white/10'
                } text-gray-200 smooth-transition focus:bg-white/10 focus:border-white/30`}
              >
                {question.options?.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                id={`input-${question.id}`}
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                placeholder={question.placeholder}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors[question.id]
                    ? 'border-red-500/50'
                    : 'border-white/10'
                } text-gray-200 smooth-transition focus:bg-white/10 focus:border-white/30 resize-none`}
              />
            )}

            {errors[question.id] && (
              <p className="mt-2 text-sm text-red-400">{errors[question.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-8 rounded-lg text-lg font-medium ${
            isSubmitting
              ? 'bg-white/20 cursor-not-allowed'
              : 'bg-white/10 hover:bg-white/20 border border-white/20'
          } smooth-transition`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Your Profile...
            </span>
          ) : (
            'See My Results'
          )}
        </button>
      </div>
    </form>
  );
}
