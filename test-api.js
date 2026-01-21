// Test the actual API endpoint with 3 profiles
// Usage: node test-api.js [research|service|balanced]

const profiles = {
  research: {
    research_hours_total: "800-1,200 hours",
    research_hours_weekly: "15-20 hours/week",
    research_types: ["Basic science/lab research", "Data analysis/computational"],
    research_leadership: "Led independent project/sub-project",
    research_outputs: "Published (co-author) or accepted for publication",
    clinical_hours_hs: "0-100 hours",
    clinical_hours_college: "100-300 hours",
    clinical_settings: ["Hospital/inpatient"],
    patient_interaction_intensity: "Direct patient contact (hands-on care)",
    underserved_hours: "0-50 hours",
    certification_plans: "Will obtain before applying",
    certification_hours_weekly: "Not currently working as EMT/CNA",
    gpa: "3.7-3.89",
    mcat: "515-519",
    academic_preparedness: "4 - Very prepared",
    academic_improvement_areas: ["None - academically very strong"],
    academic_strengths: ["STEM coursework", "Research methods"],
    mcat_confidence: "5 - Very confident (scored at or above goal)",
    leadership_roles_count: "1-2 significant roles",
    service_scale: "3 - Moderate community engagement",
    extracurricular_hours_weekly: "5-10 hours/week",
    service_outcomes: "Participated regularly, some documented impact",
    application_gaps: ["Limited community service", "Limited underserved/diverse populations exposure"],
    primary_focus: "Academic research",
    greatest_weakness: "Limited breadth of clinical exposure or lack of longitudinal clinical experience",
    future_contributions: ["Medical research/academic medicine", "Advancing medical knowledge through research"],
    target_cycle: "2027 cycle (applications due 2026)",
    timeline_flexibility: "Flexible - willing to take gap year(s) if needed",
    academic_history_flags: ["None - clean academic record"]
  },
  
  service: {
    research_hours_total: "50-200 hours",
    research_hours_weekly: "1-5 hours/week",
    research_types: ["Community health/public health"],
    research_leadership: "Contributed as team member",
    research_outputs: "Poster presentation at local/regional conference",
    clinical_hours_hs: "100-300 hours",
    clinical_hours_college: "500-1,000 hours",
    clinical_settings: ["Community clinic", "Rural/underserved area", "Public health/community outreach"],
    patient_interaction_intensity: "Direct patient contact (hands-on care)",
    underserved_hours: "500+ hours",
    certification_plans: "Already certified (EMT, CNA, etc.)",
    certification_hours_weekly: "10-15 hours/week",
    gpa: "3.5-3.69",
    mcat: "508-511",
    academic_preparedness: "3 - Adequately prepared",
    academic_improvement_areas: ["MCAT score"],
    academic_strengths: ["Communication skills", "Clinical/patient interaction skills"],
    mcat_confidence: "3 - Neutral (scored near goal, considering retake)",
    leadership_roles_count: "3-4 significant roles",
    service_scale: "5 - Extensive sustained service (founded org, major impact)",
    extracurricular_hours_weekly: "15-20 hours/week",
    service_outcomes: "Created lasting impact, measurable outcomes (expanded program, served X people)",
    application_gaps: ["Limited research experience", "Lower academic metrics (GPA/MCAT)"],
    primary_focus: "Community service/volunteer work",
    greatest_weakness: "Limited research experience or academic profile concerns (GPA/MCAT)",
    future_contributions: ["Serving underserved populations", "Primary care/community medicine"],
    target_cycle: "2027 cycle (applications due 2026)",
    timeline_flexibility: "Flexible - willing to take gap year(s) if needed",
    academic_history_flags: ["Grade replacement/retakes (improved grades)"]
  },
  
  balanced: {
    research_hours_total: "200-500 hours",
    research_hours_weekly: "5-10 hours/week",
    research_types: ["Clinical research"],
    research_leadership: "Contributed as team member",
    research_outputs: "Manuscript in preparation or submitted",
    clinical_hours_hs: "100-300 hours",
    clinical_hours_college: "300-500 hours",
    clinical_settings: ["Hospital/inpatient", "Outpatient clinic"],
    patient_interaction_intensity: "Direct patient contact (hands-on care)",
    underserved_hours: "100-300 hours",
    certification_plans: "Already certified (EMT, CNA, etc.)",
    certification_hours_weekly: "5-10 hours/week",
    gpa: "3.7-3.89",
    mcat: "512-514",
    academic_preparedness: "4 - Very prepared",
    academic_improvement_areas: ["None - academically very strong"],
    academic_strengths: ["STEM coursework", "Clinical/patient interaction skills"],
    mcat_confidence: "4 - Confident (scored at or near goal)",
    leadership_roles_count: "3-4 significant roles",
    service_scale: "4 - Significant involvement (leadership role, multi-year)",
    extracurricular_hours_weekly: "10-15 hours/week",
    service_outcomes: "Led initiative with clear outcomes (organized events, recruited volunteers)",
    application_gaps: ["None - feel well-prepared"],
    primary_focus: "Leadership development",
    greatest_weakness: "Time management or balancing multiple commitments",
    future_contributions: ["Patient-centered clinical care", "Medical education/mentorship"],
    target_cycle: "2027 cycle (applications due 2026)",
    timeline_flexibility: "Moderately flexible - prefer specific timeline but can adjust",
    academic_history_flags: ["None - clean academic record"]
  }
};

async function test(profileName) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Testing: ${profileName.toUpperCase()}`);
  console.log('='.repeat(80));
  
  const response = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ responses: profiles[profileName] })
  });
  
  const data = await response.json();
  
  if (data.error) {
    console.error('ERROR:', data.error);
    return;
  }
  
  console.log('\n--- PROFILE SUMMARY ---');
  console.log(data.profileSummary);
  console.log(`Word count: ${data.profileSummary.split(/\s+/).length}`);
  
  console.log('\n--- FIT ANALYSES ---');
  data.rankedCohorts.forEach((cohort, i) => {
    console.log(`\n${i + 1}. ${cohort.name} (Fit: ${cohort.fitScore})`);
    console.log(cohort.fitAnalysis);
    console.log(`Word count: ${cohort.fitAnalysis.split(/\s+/).length}`);
  });
  
  console.log('\n--- SCORES ---');
  console.log(JSON.stringify(data.userScores, null, 2));
}

const profile = process.argv[2] || 'research';
if (!profiles[profile]) {
  console.log('Usage: node test-api.js [research|service|balanced]');
  process.exit(1);
}

test(profile).catch(console.error);
