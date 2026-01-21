// Test the /api/analyze endpoint locally
const testApiEndpoint = async () => {
  console.log('Testing /api/analyze endpoint...\n');

  const mockResponses = {
    research_hours_total: "500-750 hours",
    research_hours_weekly: "10-15 hours",
    research_types: ["Wet lab (bench science)", "Data analysis/computational"],
    research_leadership: "Independent project with my own research question",
    research_outputs: "1-2 publications or conference presentations",

    clinical_hours_hs: "0-50 hours",
    clinical_hours_college: "200-300 hours",
    clinical_settings: ["Hospital (inpatient)", "Clinic (outpatient)"],
    patient_interaction_intensity: "Direct patient contact with communication",
    underserved_hours: "100-200 hours",
    certification_plans: "CPR/BLS certified",
    certification_hours_weekly: "0-5 hours",

    gpa: "3.8-4.0",
    mcat: "515-520",
    academic_preparedness: "Very well prepared",
    academic_improvement_areas: ["Time management"],
    academic_strengths: ["Critical thinking", "Scientific writing"],
    mcat_confidence: "Very confident",

    leadership_roles_count: "3-4 roles",
    service_scale: "Campus-wide impact",
    extracurricular_hours_weekly: "10-15 hours",
    service_outcomes: "Measurable impact with documented outcomes",

    application_gaps: ["Limited clinical exposure"],
    primary_focus: "Research and scientific inquiry",
    greatest_weakness: "Limited clinical hours",
    future_contributions: ["Research and discovery"],
    target_cycle: "2027",
    timeline_flexibility: "Flexible (willing to take gap year if needed)",
    academic_history_flags: ["None"],

    additional_context: "Focused on translational research in oncology"
  };

  try {
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses: mockResponses }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('\n✅ Success! API returned:');
    console.log('- Profile Summary:', data.profileSummary?.substring(0, 100) + '...');
    console.log('- User Scores:', data.userScores);
    console.log('- Ranked Cohorts:', data.rankedCohorts?.map(c => `${c.name} (${c.fitScore})`));

  } catch (error) {
    console.error('❌ Fetch failed:', error.message);
    console.error('This means the server is not running or not reachable.');
  }
};

testApiEndpoint();
