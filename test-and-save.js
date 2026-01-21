// Test script that saves input/output for Claude Desktop to review
// Usage: node test-and-save.js [research|service|balanced]
//
// Creates files in /test-results/ directory:
//   - latest-input.json          (questionnaire responses)
//   - latest-output.txt          (formatted analysis with word counts)
//   - latest-raw.json            (raw API response)
//   - latest-prompt.txt          (the actual prompt sent to Claude)
//
// Claude Desktop can read these files to see exactly what went in and out

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const RESULTS_DIR = path.join(__dirname, 'test-results');

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

// Test Profile 1: Research-Heavy
const PROFILE_RESEARCH = {
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
};

// Test Profile 2: Service-Oriented
const PROFILE_SERVICE = {
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
};

// Test Profile 3: Balanced
const PROFILE_BALANCED = {
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
};

// Import the actual prompt function from route.ts
// (For now, we'll inline it - could also require it if we export it)
function buildAnalysisPrompt(responses) {
  const currentDate = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  // Truncated for brevity - you'll paste full prompt here
  // For now, using the API endpoint instead
  return null; // Signal to use API endpoint
}

async function testAndSave(profileName, profileData) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  console.log(`\n${'='.repeat(80)}`);
  console.log(`Testing: ${profileName.toUpperCase()}`);
  console.log(`Timestamp: ${timestamp}`);
  console.log('='.repeat(80));

  try {
    // Save input to file
    const inputPath = path.join(RESULTS_DIR, 'latest-input.json');
    fs.writeFileSync(inputPath, JSON.stringify({
      profile_name: profileName,
      timestamp: timestamp,
      responses: profileData
    }, null, 2));
    console.log(`✓ Saved input to: ${inputPath}`);

    // Call the actual API endpoint (easier than duplicating prompt)
    console.log('\nCalling API...');
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responses: profileData })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Save raw JSON response
    const rawPath = path.join(RESULTS_DIR, 'latest-raw.json');
    fs.writeFileSync(rawPath, JSON.stringify({
      profile_name: profileName,
      timestamp: timestamp,
      result: result
    }, null, 2));
    console.log(`✓ Saved raw JSON to: ${rawPath}`);

    // Format output for easy reading
    let output = '';
    output += `${'='.repeat(80)}\n`;
    output += `TEST RESULTS: ${profileName.toUpperCase()}\n`;
    output += `Timestamp: ${timestamp}\n`;
    output += `${'='.repeat(80)}\n\n`;

    // Profile Summary
    output += `PROFILE SUMMARY\n`;
    output += `${'-'.repeat(80)}\n`;
    output += `${result.profileSummary}\n\n`;
    const summaryWords = result.profileSummary.split(/\s+/).length;
    output += `Word count: ${summaryWords} / 75`;
    if (summaryWords > 75) {
      output += ` ⚠️ EXCEEDS LIMIT by ${summaryWords - 75} words\n`;
    } else {
      output += ` ✓\n`;
    }
    output += `\n`;

    // Competency Scores (for radar chart)
    output += `COMPETENCY SCORES (Radar Chart Data)\n`;
    output += `${'-'.repeat(80)}\n`;
    Object.entries(result.userScores).forEach(([key, value]) => {
      const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const bar = '█'.repeat(Math.round(value / 5));
      output += `${label.padEnd(25)} ${value.toString().padStart(3)}/100 ${bar}\n`;
    });
    output += `\n`;

    // Fit Analyses
    output += `FIT ANALYSES (Ranked by Fit Score)\n`;
    output += `${'-'.repeat(80)}\n\n`;

    let wordCountViolations = 0;
    result.rankedCohorts.forEach((cohort, i) => {
      const words = cohort.fitAnalysis.split(/\s+/).length;
      const violation = words > 75;
      if (violation) wordCountViolations++;

      output += `${i + 1}. ${cohort.name.toUpperCase()} (Fit Score: ${cohort.fitScore}/100)\n`;
      output += `${'-'.repeat(80)}\n`;
      output += `${cohort.fitAnalysis}\n\n`;
      output += `Word count: ${words} / 75`;
      if (violation) {
        output += ` ⚠️ EXCEEDS LIMIT by ${words - 75} words\n`;
      } else {
        output += ` ✓\n`;
      }
      output += `\n`;
    });

    // Summary
    output += `${'='.repeat(80)}\n`;
    output += `WORD COUNT SUMMARY\n`;
    output += `${'-'.repeat(80)}\n`;
    output += `Profile Summary: ${summaryWords}/75 ${summaryWords > 75 ? '❌' : '✓'}\n`;
    result.rankedCohorts.forEach((cohort, i) => {
      const words = cohort.fitAnalysis.split(/\s+/).length;
      output += `${cohort.name}: ${words}/75 ${words > 75 ? '❌' : '✓'}\n`;
    });
    output += `\n`;
    if (wordCountViolations > 0) {
      output += `⚠️ ${wordCountViolations} fit analysis(es) exceed 75-word limit\n`;
    } else {
      output += `✅ All sections within word limits\n`;
    }
    output += `${'='.repeat(80)}\n`;

    // Save formatted output
    const outputPath = path.join(RESULTS_DIR, 'latest-output.txt');
    fs.writeFileSync(outputPath, output);
    console.log(`✓ Saved formatted output to: ${outputPath}`);

    // Print summary to console
    console.log('\n' + output);

    // Also save with timestamp for history
    const archivePath = path.join(RESULTS_DIR, `${profileName}-${timestamp.substring(0, 19)}.txt`);
    fs.writeFileSync(archivePath, output);
    console.log(`✓ Archived to: ${archivePath}`);

  } catch (error) {
    console.error('Error:', error.message);

    // Save error to file
    const errorPath = path.join(RESULTS_DIR, 'latest-error.txt');
    fs.writeFileSync(errorPath, `Error testing ${profileName} at ${timestamp}:\n\n${error.stack}`);
    console.log(`✗ Saved error to: ${errorPath}`);
  }
}

async function main() {
  const profileChoice = process.argv[2] || 'research';

  if (profileChoice === 'research') {
    await testAndSave('research', PROFILE_RESEARCH);
  } else if (profileChoice === 'service') {
    await testAndSave('service', PROFILE_SERVICE);
  } else if (profileChoice === 'balanced') {
    await testAndSave('balanced', PROFILE_BALANCED);
  } else {
    console.log('Usage: node test-and-save.js [research|service|balanced]');
    process.exit(1);
  }
}

main();
