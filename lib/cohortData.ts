export interface CohortArchetype {
  name: string;
  scores: {
    academic_rigor: number;
    clinical_exposure: number;
    research_activities: number;
    leadership_service: number;
    technical_skills: number;
    specialty_preparation: number;
  };
  description: string;
  strengths: string[];
  whatSchoolsPrioritize: string[];
  exampleSchools: string[];
  strategicGuidance: string;
}

export const COHORT_ARCHETYPES: Record<string, CohortArchetype> = {
  'Clinical-Investigative': {
    name: 'Clinical-Investigative',
    scores: {
      academic_rigor: 85,
      clinical_exposure: 75,
      research_activities: 90,
      leadership_service: 70,
      technical_skills: 85,
      specialty_preparation: 80,
    },
    description: 'You align with medical schools that value rigorous research training alongside clinical excellence. Your profile shows strong academic performance and substantial research engagement, positioning you well for programs that integrate scientific investigation with patient care.',
    strengths: [
      'Clinical Experience - 300+ patient care hours (medical assistant, COVID-19 volunteer)',
      'Research Strength - Advanced lab skills (PCR, Western Blot, microscopy) + manuscript in progress',
      'Leadership & Service - PreMed Society president, mentoring & leadership impact',
      'Academic Rigor - 3.85 GPA in challenging coursework',
      'Specialty Focus - Strong foundation in neurology/oncology research',
    ],
    whatSchoolsPrioritize: [
      'Interdisciplinary research & clinical trials',
      'Bridging patient care with scientific discovery',
    ],
    exampleSchools: ['Duke', 'Mount Sinai', 'USC Keck', 'Stanford', 'UCSF'],
    strategicGuidance: 'Your research and leadership experience stand out. Expanding your hands-on involvement in community health initiatives will further demonstrate your dedication to these programs that emphasize continuity of care, public health integration, and community-based medical practice.',
  },
  'Patient-Centered': {
    name: 'Patient-Centered',
    scores: {
      academic_rigor: 75,
      clinical_exposure: 90,
      research_activities: 60,
      leadership_service: 85,
      technical_skills: 65,
      specialty_preparation: 70,
    },
    description: 'You align with medical schools that prioritize direct patient interaction, empathy, and longitudinal clinical experiences. Your profile demonstrates a strong commitment to patient care and interpersonal skills.',
    strengths: [
      'Extensive clinical volunteering and shadowing experience',
      'Strong interpersonal and communication skills',
      'Commitment to patient advocacy and empathy',
      'Leadership in service-oriented organizations',
      'Focus on holistic patient care approaches',
    ],
    whatSchoolsPrioritize: [
      'Empathy, patient advocacy, and strong interpersonal skills in future physicians',
      'Longitudinal clinical experiences and direct patient care',
    ],
    exampleSchools: ['University of Chicago Pritzker', 'Case Western Reserve', 'Vanderbilt', 'Dartmouth Geisel', 'Brown Alpert'],
    strategicGuidance: 'Your leadership in the PreMed Society is a strength. Deepening your direct patient interactions through longitudinal volunteer roles will enhance your fit for these schools that value empathy, patient advocacy, and strong interpersonal skills in future physicians.',
  },
  'Community-Clinical': {
    name: 'Community-Clinical',
    scores: {
      academic_rigor: 70,
      clinical_exposure: 85,
      research_activities: 55,
      leadership_service: 90,
      technical_skills: 60,
      specialty_preparation: 75,
    },
    description: 'You align with medical schools deeply committed to serving underserved populations and addressing health disparities. Your profile shows dedication to community health and social justice in medicine.',
    strengths: [
      'Extensive work with underserved or diverse patient populations',
      'Strong commitment to health equity and social determinants of health',
      'Community-based leadership and service initiatives',
      'Cultural competency and language skills',
      'Experience in public health or community health settings',
    ],
    whatSchoolsPrioritize: [
      'Continuity of care and public health integration',
      'Community-based medical practice and health equity',
    ],
    exampleSchools: ['UC Davis', 'University of New Mexico', 'Morehouse', 'University of Washington', 'East Carolina Brody'],
    strategicGuidance: 'Your research and leadership experience stand out. Expanding your hands-on involvement in community health initiatives will further demonstrate your dedication to these programs that emphasize continuity of care, public health integration, and community-based medical practice.',
  },
  'Research-Intensive': {
    name: 'Research-Intensive',
    scores: {
      academic_rigor: 90,
      clinical_exposure: 65,
      research_activities: 95,
      leadership_service: 70,
      technical_skills: 90,
      specialty_preparation: 75,
    },
    description: 'You align with medical schools that emphasize scientific inquiry, research methodology, and academic medicine. Your profile demonstrates exceptional research productivity and technical expertise.',
    strengths: [
      'Multiple research projects with publications or presentations',
      'Advanced technical and laboratory skills',
      'Strong academic performance in rigorous coursework',
      'Experience with independent research design and execution',
      'Potential for MD/PhD or research-focused career path',
    ],
    whatSchoolsPrioritize: [
      'Strong scientific inquiry skills and commitment to advancing medical knowledge',
      'Research productivity and potential for academic medicine careers',
    ],
    exampleSchools: ['Harvard', 'Johns Hopkins', 'WashU', 'Yale', 'University of Pennsylvania'],
    strategicGuidance: 'Your neural stem cell research is a major asset. Securing a first-author publication or deepening your independent research experience will maximize your competitiveness for these programs that seek applicants with strong scientific inquiry skills and a commitment to advancing medical knowledge.',
  },
  'Mission-Driven': {
    name: 'Mission-Driven',
    scores: {
      academic_rigor: 75,
      clinical_exposure: 80,
      research_activities: 65,
      leadership_service: 85,
      technical_skills: 70,
      specialty_preparation: 90,
    },
    description: 'You align with medical schools that value specific specialty interests, unique populations, or mission-driven career goals. Your profile shows clear direction and commitment to a particular path in medicine.',
    strengths: [
      'Clear specialty interest with relevant exposure and experience',
      'Commitment to specific patient populations or health issues',
      'Alignment with particular institutional missions (e.g., primary care, global health, faith-based)',
      'Demonstrated passion through sustained involvement',
      'Unique perspective or lived experience relevant to mission',
    ],
    whatSchoolsPrioritize: [
      'Service, health equity, and a deep commitment to social impact',
      'Specific specialty preparation and mission alignment',
    ],
    exampleSchools: ['Virginia Commonwealth (CUNY)', 'Tulane', 'Georgetown', 'Medical College of Wisconsin', 'Creighton'],
    strategicGuidance: 'Your interest in public health aligns well. Strengthening your sustained community engagement—especially in underserved populations—will make you a stronger candidate for these schools that prioritize service, health equity, and a deep commitment to social impact.',
  },
};

// Mock user profile for development
export const MOCK_USER_PROFILE = {
  scores: {
    academic_rigor: 85,
    clinical_exposure: 72,
    research_activities: 90,
    leadership_service: 68,
    technical_skills: 78,
    specialty_preparation: 65,
  },
  topCohorts: ['Clinical-Investigative', 'Patient-Centered', 'Community-Clinical'] as const,
  primaryCohort: 'Clinical-Investigative',
  summary: 'Strong research foundation with emerging clinical experience.',
};
