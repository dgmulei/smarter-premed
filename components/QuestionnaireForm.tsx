'use client';

import { useState, FormEvent } from 'react';

interface QuestionnaireFormProps {
  onSubmit: (formData: Record<string, any>) => void;
  isSubmitting: boolean;
}

// Type definitions for question structures
interface SelectOption {
  value: string;
  label: string;
}

interface QuestionConfig {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'scale';
  options?: SelectOption[];
  scale?: { min: number; max: number };
  optional?: boolean;
}

const questions: QuestionConfig[] = [
  // RESEARCH EXPERIENCE (Q1-5)
  {
    id: 'research_hours_total',
    label: 'Total research hours across all roles (e.g., academic, professional, volunteer):',
    type: 'select',
    options: [
      { value: '', label: 'Select your research hours' },
      { value: 'none', label: 'None yet' },
      { value: '0-50', label: '0–50 hours' },
      { value: '51-150', label: '51–150 hours' },
      { value: '151-300', label: '151–300 hours' },
      { value: '301-500', label: '301–500 hours' },
      { value: '501-800', label: '501–800 hours' },
      { value: '800+', label: '800+ hours' },
    ],
  },
  {
    id: 'research_hours_weekly',
    label: 'Average hours spent on research per week:',
    type: 'select',
    options: [
      { value: '', label: 'Select weekly hours' },
      { value: '0-2', label: '0–2 hours' },
      { value: '3-5', label: '3–5 hours' },
      { value: '6-10', label: '6–10 hours' },
      { value: '11-15', label: '11–15 hours' },
      { value: '15+', label: '15+ hours' },
    ],
  },
  {
    id: 'research_types',
    label: 'What type of research tasks do you primarily perform? (Check all that apply):',
    type: 'checkbox',
    options: [
      { value: 'wet-lab', label: 'Wet Lab Work (e.g., experiments, assays)' },
      { value: 'data-analysis', label: 'Data Analysis (e.g., statistical analysis, computational models)' },
      { value: 'clinical-research', label: 'Clinical Research (e.g., patient data, trial protocols)' },
      { value: 'literature', label: 'Literature Reviews or Writing (e.g., papers, proposals)' },
    ],
  },
  {
    id: 'research_leadership',
    label: 'Have you independently led any research projects or major initiatives within a larger project?',
    type: 'select',
    options: [
      { value: '', label: 'Select your leadership level' },
      { value: 'none', label: 'None' },
      { value: 'contributed', label: 'Contributed to a project with leadership components' },
      { value: 'co-led-1', label: 'Co-led 1 project' },
      { value: 'led-1', label: 'Led 1 project' },
      { value: 'led-2+', label: 'Led 2+ projects' },
    ],
  },
  {
    id: 'research_outputs',
    label: 'How many research outputs have you contributed to?',
    type: 'select',
    options: [
      { value: '', label: 'Select research outputs' },
      { value: 'none', label: 'None yet' },
      { value: '1', label: '1 output (e.g., abstract or presentation)' },
      { value: '2-3', label: '2–3 outputs (e.g., combination of abstracts, presentations, or publications)' },
      { value: '4-5', label: '4–5 outputs' },
      { value: '6+', label: '6+ outputs' },
    ],
  },

  // CLINICAL EXPERIENCE (Q6-12)
  {
    id: 'clinical_hours_hs',
    label: 'How many clinical hours did you log during high school (volunteering, shadowing, etc.)?',
    type: 'select',
    options: [
      { value: '', label: 'Select high school clinical hours' },
      { value: '0-50', label: '0–50 hours' },
      { value: '51-100', label: '51–100 hours' },
      { value: '101-200', label: '101–200 hours' },
      { value: '201-300', label: '201–300 hours' },
      { value: '300+', label: '300+ hours' },
    ],
  },
  {
    id: 'clinical_hours_college',
    label: 'How many clinical hours have you logged since high school (volunteering and paid)?',
    type: 'select',
    options: [
      { value: '', label: 'Select college clinical hours' },
      { value: 'none', label: 'None yet' },
      { value: '0-50', label: '0–50 hours' },
      { value: '51-100', label: '51–100 hours' },
      { value: '101-300', label: '101–300 hours' },
      { value: '301-500', label: '301–500 hours' },
      { value: '501-800', label: '501–800 hours' },
      { value: '800+', label: '800+ hours' },
    ],
  },
  {
    id: 'clinical_settings',
    label: 'In what types of clinical settings have you gained experience? (Check all that apply):',
    type: 'checkbox',
    options: [
      { value: 'hospital', label: 'Hospital/Medical Center' },
      { value: 'community-clinic', label: 'Community Health Clinic' },
      { value: 'free-clinic', label: 'Free Clinic' },
      { value: 'rural', label: 'Rural Health Facility' },
      { value: 'private-practice', label: 'Private Practice' },
      { value: 'research-hospital', label: 'Research Hospital' },
      { value: 'nursing-home', label: 'Nursing Home/Long-term Care' },
      { value: 'ems', label: 'Emergency Medical Services (EMS)' },
    ],
  },
  {
    id: 'patient_interaction_intensity',
    label: 'How much direct patient interaction experience have you gained across all clinical roles?',
    type: 'select',
    options: [
      { value: '', label: 'Select interaction intensity' },
      { value: 'none', label: 'None yet' },
      { value: 'minimal', label: 'Minimal (1–5 interactions/day on average)' },
      { value: 'moderate', label: 'Moderate (6–15 interactions/day on average)' },
      { value: 'extensive', label: 'Extensive (16–30 interactions/day on average)' },
      { value: 'high', label: 'High (30+ interactions/day on average)' },
    ],
  },
  {
    id: 'underserved_hours',
    label: 'Approximately how many hours have you spent working specifically with underserved or vulnerable populations?',
    type: 'select',
    options: [
      { value: '', label: 'Select underserved hours' },
      { value: 'none', label: 'None yet' },
      { value: '1-50', label: '1–50 hours' },
      { value: '51-150', label: '51–150 hours' },
      { value: '151-300', label: '151–300 hours' },
      { value: '301-500', label: '301–500 hours' },
      { value: '500+', label: '500+ hours' },
    ],
  },
  {
    id: 'certification_plans',
    label: 'Are you planning to pursue any clinical certifications (EMT, CNA, phlebotomy, etc.)?',
    type: 'select',
    options: [
      { value: '', label: 'Select certification status' },
      { value: 'no-plans', label: 'No, not planning to pursue certification' },
      { value: '6-months', label: 'Yes, planning to start within 6 months' },
      { value: '1-year', label: 'Yes, planning to start within 1 year' },
      { value: '2-years', label: 'Yes, planning to start within 2 years' },
      { value: 'certified', label: 'Already certified' },
    ],
  },
  {
    id: 'certification_hours_weekly',
    label: 'If certified or planning to get certified, how many hours per week do you anticipate working in a clinical setting?',
    type: 'select',
    options: [
      { value: '', label: 'Select weekly clinical hours' },
      { value: 'n/a', label: 'Not applicable' },
      { value: '0-5', label: '0–5 hours' },
      { value: '6-15', label: '6–15 hours' },
      { value: '16-25', label: '16–25 hours' },
      { value: '25+', label: '25+ hours' },
    ],
  },

  // ACADEMIC PERFORMANCE (Q13-19)
  {
    id: 'gpa',
    label: 'What is your current cumulative GPA?',
    type: 'select',
    options: [
      { value: '', label: 'Select your GPA range' },
      { value: 'below-3.0', label: 'Below 3.0' },
      { value: '3.0-3.2', label: '3.0–3.2' },
      { value: '3.2-3.4', label: '3.2–3.4' },
      { value: '3.4-3.6', label: '3.4–3.6' },
      { value: '3.6-3.8', label: '3.6–3.8' },
      { value: '3.8-4.0', label: '3.8–4.0' },
    ],
  },
  {
    id: 'mcat',
    label: 'What is your MCAT score (or most recent practice test score if not yet taken)?',
    type: 'select',
    options: [
      { value: '', label: 'Select MCAT score' },
      { value: 'not-taken', label: "Haven't taken practice test yet" },
      { value: '490-499', label: '490–499' },
      { value: '500-504', label: '500–504' },
      { value: '505-509', label: '505–509' },
      { value: '510-514', label: '510–514' },
      { value: '515-519', label: '515–519' },
      { value: '520+', label: '520+' },
    ],
  },
  {
    id: 'academic_preparedness',
    label: 'How prepared are you to meet the academic expectations of your target schools?',
    type: 'scale',
    scale: { min: 1, max: 5 },
  },
  {
    id: 'academic_improvement_areas',
    label: 'Which academic area do you feel requires the most immediate improvement? (Select up to two):',
    type: 'checkbox',
    optional: true,
    options: [
      { value: 'science-prereqs', label: 'Science Prerequisites (e.g., physics, chemistry, biology)' },
      { value: 'quantitative', label: 'Quantitative Skills (e.g., math, biostatistics)' },
      { value: 'study-strategies', label: 'Study Strategies (e.g., time management, test-taking skills)' },
      { value: 'writing', label: 'Writing and Communication (e.g., essays, personal statements)' },
      { value: 'gen-ed', label: 'General Education Requirements (e.g., humanities, non-STEM courses)' },
    ],
  },
  {
    id: 'academic_strengths',
    label: 'What academic strengths or experiences set you apart in your medical school application? (Select all that apply):',
    type: 'checkbox',
    options: [
      { value: 'science-foundation', label: 'A strong foundation in biology or chemistry (e.g., standard pre-med coursework)' },
      { value: 'quantitative-expertise', label: 'Quantitative or data-focused expertise (e.g., biostatistics, computational biology)' },
      { value: 'humanities', label: 'Humanities or social sciences focus (e.g., ethics, philosophy, sociology)' },
      { value: 'interdisciplinary', label: 'Interdisciplinary focus (e.g., public health, combined degrees)' },
      { value: 'advanced-electives', label: 'Advanced electives in specialized topics' },
      { value: 'independent-study', label: 'Independent study or research projects' },
    ],
  },
  {
    id: 'mcat_confidence',
    label: 'How confident are you in preparing for the MCAT?',
    type: 'scale',
    scale: { min: 1, max: 5 },
  },

  // LEADERSHIP & SERVICE (Q20-23)
  {
    id: 'leadership_roles_count',
    label: 'How many leadership roles have you held in academic, extracurricular, or professional settings?',
    type: 'select',
    options: [
      { value: '', label: 'Select number of roles' },
      { value: 'none', label: 'None yet' },
      { value: '1', label: '1 role' },
      { value: '2-3', label: '2–3 roles' },
      { value: '4+', label: '4+ roles' },
    ],
  },
  {
    id: 'service_scale',
    label: 'What is the reach of your service and volunteer work?',
    type: 'select',
    options: [
      { value: '', label: 'Select service reach' },
      { value: 'small', label: 'Direct impact on 1–10 people' },
      { value: 'moderate', label: 'Impact on 11–50 people' },
      { value: 'large', label: 'Impact on 51–100 people' },
      { value: 'community', label: 'Community-wide impact (100+ people)' },
    ],
  },
  {
    id: 'extracurricular_hours_weekly',
    label: 'How many hours per week do you dedicate to extracurricular or volunteer activities (excluding clinical work)?',
    type: 'select',
    options: [
      { value: '', label: 'Select weekly hours' },
      { value: '0-1', label: '0–1 hour' },
      { value: '2-3', label: '2–3 hours' },
      { value: '4-5', label: '4–5 hours' },
      { value: '6-10', label: '6–10 hours' },
      { value: '10+', label: '10+ hours' },
    ],
  },
  {
    id: 'service_outcomes',
    label: 'Have your service or leadership activities resulted in tangible outcomes (e.g., events organized, resources developed, community initiatives)?',
    type: 'select',
    options: [
      { value: '', label: 'Select outcomes' },
      { value: 'none', label: 'None yet' },
      { value: '1-2', label: '1–2 outcomes' },
      { value: '3-5', label: '3–5 outcomes' },
      { value: '6-10', label: '6–10 outcomes' },
      { value: '10+', label: '10+ outcomes' },
    ],
  },

  // VISION & STRATEGY (Q24-30)
  {
    id: 'application_gaps',
    label: 'What specific gaps or experiences do you believe are missing from your application that might concern you?',
    type: 'checkbox',
    options: [
      { value: 'no-concerns', label: 'No concerns currently' },
      { value: 'leadership', label: 'Missing leadership roles' },
      { value: 'clinical', label: 'Limited clinical exposure' },
      { value: 'research', label: 'Need more research output' },
      { value: 'service', label: 'Lack of service/volunteer work' },
    ],
  },
  {
    id: 'primary_focus',
    label: 'What is your primary area of focus in your pre-med journey? (Pick one):',
    type: 'select',
    options: [
      { value: '', label: 'Select your primary focus' },
      { value: 'academic', label: 'Academic Excellence (e.g., GPA improvement, excelling in prerequisites)' },
      { value: 'clinical', label: 'Clinical Experience (e.g., patient interaction, certifications)' },
      { value: 'research', label: 'Research Impact (e.g., publications, independent projects)' },
      { value: 'leadership', label: 'Leadership and Service (e.g., community initiatives, organizational roles)' },
      { value: 'specialty', label: 'Specialty Preparation (e.g., focusing on specific medical fields like public health, infectious disease)' },
    ],
  },
  {
    id: 'greatest_weakness',
    label: 'What area of your medical school application do you feel is your greatest weakness and would benefit most from support? (Select one):',
    type: 'select',
    options: [
      { value: '', label: 'Select your greatest weakness' },
      { value: 'academic', label: 'Academic Rigor (e.g., GPA, prerequisites)' },
      { value: 'clinical', label: 'Clinical Experience (e.g., certifications, hours, patient interaction)' },
      { value: 'research', label: 'Research Impact (e.g., publications, leadership in projects)' },
      { value: 'leadership', label: 'Leadership and Service (e.g., community involvement, tangible outcomes)' },
      { value: 'narrative', label: 'Application Narrative (e.g., personal statement, coherent story across experiences)' },
    ],
  },
  {
    id: 'future_contributions',
    label: 'Where do you see yourself contributing most as a future physician? (Select up to two):',
    type: 'checkbox',
    options: [
      { value: 'patient-care', label: 'Patient Care (e.g., direct clinical practice in hospitals or clinics)' },
      { value: 'research', label: 'Research (e.g., advancing medical science or public health)' },
      { value: 'education', label: 'Education (e.g., training future healthcare professionals, academic medicine)' },
      { value: 'advocacy', label: 'Advocacy (e.g., addressing health inequities, influencing health policy)' },
      { value: 'leadership', label: 'Leadership (e.g., leading healthcare organizations, shaping systemic change)' },
    ],
  },
  {
    id: 'target_cycle',
    label: 'What is your target medical school application cycle?',
    type: 'select',
    options: [
      { value: '', label: 'Select target cycle' },
      { value: '2027', label: '2027 cycle (applications due 2026)' },
      { value: '2028', label: '2028 cycle (applications due 2027)' },
      { value: '2029', label: '2029 cycle (applications due 2028)' },
      { value: '2030+', label: '2030 or later' },
      { value: 'unsure', label: 'Unsure/Flexible' },
    ],
  },
  {
    id: 'timeline_flexibility',
    label: 'What is your flexibility around medical school application timing?',
    type: 'select',
    options: [
      { value: '', label: 'Select flexibility' },
      { value: 'firm', label: 'Firm timeline, must apply in target year' },
      { value: 'somewhat', label: 'Somewhat flexible, could delay 1 year if beneficial' },
      { value: 'very', label: 'Very flexible, willing to optimize timing based on readiness' },
      { value: 'gap-year', label: 'Already committed to specific gap year(s) activities' },
    ],
  },
  {
    id: 'academic_history_flags',
    label: 'Which of the following applies to your academic history? (Select all that apply):',
    type: 'checkbox',
    options: [
      { value: 'transfer-4yr', label: 'I have transfer credits from a 4-year institution' },
      { value: 'transfer-cc', label: 'I have transfer credits from a community college' },
      { value: 'ap-ib', label: 'I have AP/IB credits applied to my transcript' },
      { value: 'international', label: 'I have courses completed at international institutions' },
      { value: 'retakes', label: 'I have repeated one or more courses (e.g., due to grade replacement or retakes)' },
      { value: 'incomplete', label: 'I have incomplete or pending grades' },
      { value: 'non-standard', label: 'My transcript includes non-standard grading systems (e.g., Pass/Fail, percentages, distinctions)' },
      { value: 'non-traditional', label: 'I followed a non-traditional or accelerated pathway (e.g., dual enrollment, gap years, summer-only courses)' },
      { value: 'none', label: 'None of the above (standard academic record)' },
    ],
  },
];

export default function QuestionnaireForm({
  onSubmit,
  isSubmitting,
}: QuestionnaireFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (id: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = (prev[id] as string[]) || [];
      if (checked) {
        return { ...prev, [id]: [...currentValues, value] };
      } else {
        return { ...prev, [id]: currentValues.filter((v) => v !== value) };
      }
    });

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    questions.forEach((q) => {
      // Skip validation for optional questions
      if (q.optional) return;

      const value = formData[q.id];
      if (q.type === 'checkbox') {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[q.id] = 'Please select at least one option';
        }
      } else if (!value || value === '') {
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
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-7">
        {questions.map((question, index) => (
          <div
            key={question.id}
            id={question.id}
            className="animate-fadeUp"
            style={{ animationDelay: `${0.15 + index * 0.02}s` }}
          >
            <label
              htmlFor={`input-${question.id}`}
              className="block text-[15px] text-[#1d1d1f] mb-2.5"
            >
              <span className="font-semibold">{index + 1}. {question.label}</span>
            </label>

            {question.type === 'select' ? (
              <select
                id={`input-${question.id}`}
                value={formData[question.id] || ''}
                onChange={(e) => handleChange(question.id, e.target.value)}
                className={`form-select ${errors[question.id] ? 'ring-2 ring-red-200 border-red-300' : ''}`}
              >
                {question.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : question.type === 'checkbox' ? (
              <div className="space-y-2">
                {question.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 cursor-pointer p-3 rounded-none hover:bg-black/[0.02] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={
                        ((formData[question.id] as string[]) || []).includes(
                          option.value
                        )
                      }
                      onChange={(e) =>
                        handleCheckboxChange(
                          question.id,
                          option.value,
                          e.target.checked
                        )
                      }
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#0071e3] focus:ring-[#0071e3] focus:ring-offset-0"
                    />
                    <span className="text-[15px] text-[#1d1d1f]">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            ) : question.type === 'scale' ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-[#86868b]">
                  {question.scale?.min}
                </span>
                <div className="flex gap-2 flex-1">
                  {Array.from(
                    { length: (question.scale?.max || 5) - (question.scale?.min || 1) + 1 },
                    (_, i) => (question.scale?.min || 1) + i
                  ).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleChange(question.id, value.toString())}
                      className={`flex-1 h-12 rounded-none border-2 transition-all ${
                        formData[question.id] === value.toString()
                          ? 'border-[#0071e3] bg-[#0071e3]/5 text-[#0071e3] font-medium'
                          : 'border-gray-200 hover:border-gray-300 text-[#86868b]'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <span className="text-sm text-[#86868b]">
                  {question.scale?.max}
                </span>
              </div>
            ) : null}

            {errors[question.id] && (
              <p className="mt-2 text-[13px] text-red-500">
                {errors[question.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Free Response Field */}
      <div className="mt-10 pt-10 border-t border-black/[0.06] animate-fadeUp" style={{ animationDelay: '0.75s' }}>
        <label
          htmlFor="additional_context"
          className="block text-[15px] text-[#1d1d1f] mb-2.5"
        >
          <span className="font-semibold">30. Say more about yourself?</span>
        </label>
        <textarea
          id="additional_context"
          value={formData.additional_context || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 500) {
              handleChange('additional_context', value);
            }
          }}
          placeholder="Share anything else about your plans, goals, or circumstances that helps us understand your premed story..."
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 text-[15px] text-[#1d1d1f] bg-white border border-[#d2d2d7] rounded-none
            focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:border-transparent
            transition-all duration-200 resize-none"
        />
        <p className="mt-2 text-[13px] text-[#86868b] text-right">
          {(formData.additional_context?.length || 0)}/500 characters
        </p>
      </div>

      <div className="mt-8 animate-fadeUp" style={{ animationDelay: '0.8s' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            group w-full py-4 px-6 rounded-full text-[15px] font-medium
            transition-all duration-200
            flex items-center justify-center gap-2
            ${
              isSubmitting
                ? 'bg-[#e8e8ed] cursor-not-allowed text-[#86868b]'
                : 'bg-[#0d9488] hover:bg-[#0f766e] active:bg-[#115e59] text-white shadow-[0_2px_8px_rgba(13,148,136,0.35)] hover:shadow-[0_4px_12px_rgba(13,148,136,0.3)] hover:-translate-y-px active:translate-y-0'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Analyzing</span>
            </>
          ) : (
            <span>See My Results</span>
          )}
        </button>
      </div>
    </form>
  );
}
