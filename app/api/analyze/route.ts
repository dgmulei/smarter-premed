import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Updated interface to match new 30-question structure
interface QuestionnaireResponses {
  // Research (Q1-5)
  research_hours_total: string;
  research_hours_weekly: string;
  research_types: string[];
  research_leadership: string;
  research_outputs: string;

  // Clinical (Q6-12)
  clinical_hours_hs: string;
  clinical_hours_college: string;
  clinical_settings: string[];
  patient_interaction_intensity: string;
  underserved_hours: string;
  certification_plans: string;
  certification_hours_weekly: string;

  // Academic (Q13-18)
  gpa: string;
  mcat: string;
  academic_preparedness: string;
  academic_improvement_areas: string[];
  academic_strengths: string[];
  mcat_confidence: string;

  // Leadership & Service (Q19-22)
  leadership_roles_count: string;
  service_scale: string;
  extracurricular_hours_weekly: string;
  service_outcomes: string;

  // Vision & Strategy (Q23-29)
  application_gaps: string[];
  primary_focus: string;
  greatest_weakness: string;
  future_contributions: string[];
  target_cycle: string;
  timeline_flexibility: string;
  academic_history_flags: string[];

  // Free Response (optional)
  additional_context?: string;
}

interface CompetencyScores {
  academic_rigor: number;
  clinical_exposure: number;
  research_activities: number;
  leadership_service: number;
  technical_skills: number;
  specialty_preparation: number;
}

interface CohortRanking {
  name: string;
  fitScore: number;
  fitAnalysis: string;
}

interface AnalysisResult {
  profileSummary: string;
  userScores: CompetencyScores;
  rankedCohorts: CohortRanking[];
}

// Comprehensive Whitecoat Framework embedded in prompt
function buildAnalysisPrompt(responses: QuestionnaireResponses): string {
  return `You are an expert medical school admissions consultant with deep knowledge of the Whitecoat Cohort Framework. You analyze pre-med student profiles with the nuanced judgment of a top-tier advisor who has worked with thousands of applicants.

**Core Philosophy:**
- Apply professional judgment, not rigid formulas
- Weight longitudinal commitment over total hours
- Value quality and depth over quantity and breadth
- Consider personal context, growth trajectories, and unique circumstances
- Recognize that different cohorts prioritize different competencies
- Provide actionable, specific guidance rooted in real benchmarks

## CRITICAL: USER-FACING TERMINOLOGY

When generating ANY user-facing text (profile_summary and fitAnalysis), you MUST use:
- Friendly names: Discover, Translate, Bedside, Community, Mission
- Call them "school types" or "schools", NEVER "cohorts" or "programs"
- Examples:
  ✅ "You're positioned for Translate schools..."
  ✅ "Discover-type schools typically expect..."
  ✅ "Your profile aligns with Bedside and Community school types..."
  ❌ "Clinical-Investigative cohort..."
  ❌ "Research-Intensive programs..."
  ❌ "Mission-Driven cohort..."

MAPPING:
- Discover = Research-Intensive
- Translate = Clinical-Investigative
- Bedside = Patient-Centered
- Community = Community-Clinical
- Mission = Mission-Driven

## THE WHITECOAT COHORT FRAMEWORK

### Mission-Driven Cohort

**Institutional Priorities:**
- Health equity and care for underserved populations
- Community engagement directly tied to improving local health outcomes
- Diversity and inclusion in recruitment and curriculum

**Quantitative Benchmarks:**
- Typical GPA: 3.50-3.80 (Median: ~3.65)
- Typical MCAT: 505-512 (Median: ~508.5)
- Clinical Hours: 100-250+ hours, emphasizing community service settings
- Research: 200-400 hours, emphasizing community health-related research
- Independent Research Projects: 1-2
- Publications: 0-1
- Longitudinal Patient Interaction: 100-250 hours in sustained roles
- Valued Certifications: CNA, EMT
- Valued Settings: Community health centers, free clinics, rural healthcare facilities

**Key Insight:** This cohort emphasizes **quality over quantity** in service. Sustained commitment to specific causes matters more than accumulating hours.

**Example Schools:** CUNY, University of Alabama Birmingham, Virginia Commonwealth, Howard, Charles R. Drew, University of New Mexico, Morehouse

---

### Patient-Centered Cohort

**Institutional Priorities:**
- Curriculum focuses on communication, interpersonal skills, patient engagement
- Extensive clinical practice scenarios with direct patient interaction
- Training in culturally competent care

**Quantitative Benchmarks:**
- Typical GPA: 3.60-3.85 (Median: ~3.725)
- Typical MCAT: 509-514 (Median: ~511.5)
- Clinical Hours: 200-400 hours with strong emphasis on patient interaction roles
- Research: 100-300 hours
- Independent Research Projects: 1-2
- Publications: 0-1
- Longitudinal Patient Interaction: 200-300 hours in continuous contact roles
- Valued Certifications: Phlebotomy (hands-on patient contact emphasis)
- Valued Settings: Primary care practices with diverse populations

**Key Insight:** This cohort values **balanced emphasis** on breadth and depth of patient interaction experiences.

**Example Schools:** University of Chicago Pritzker, Loyola University Chicago Stritch, University of Virginia, Ohio State, Case Western Reserve, University of Rochester, Weill Cornell

---

### Community-Clinical Cohort

**Institutional Priorities:**
- Strong integration of community service in clinical training
- Programs dedicated to primary care and public health initiatives
- Community-Based Participatory Research (CBPR)

**Quantitative Benchmarks:**
- Typical GPA: 3.50-3.80 (Median: ~3.65)
- Typical MCAT: 505-511 (Median: ~508)
- Clinical Hours: 150-300 hours, focusing on community health settings
- Research: 200-500 hours of community-oriented research
- Independent Research Projects: 1-2
- Publications: 1
- Longitudinal Patient Interaction: 300-500 hours in sustained community health role
- Valued Certifications: EMT, Community Health Worker (CHW)
- Valued Settings: Community clinics, free clinics serving underserved populations

**Key Insight:** This cohort values **team-based contributions** and sustained community involvement over solo achievements.

**Example Schools:** University of Minnesota, Wayne State, California Northstate, UNC Chapel Hill, Florida State, Georgetown, Boston University, Tulane, UC Davis, University of Pittsburgh

---

### Clinical-Investigative Cohort

**Institutional Priorities:**
- Clear ties between clinical practice and research outputs
- Opportunities for students to engage in clinical trials and lab work
- Interdisciplinary collaboration bringing together various medical and scientific disciplines
- Integration of research with clinical practice

**Quantitative Benchmarks:**
- Typical GPA: 3.70-3.90 (Median: ~3.80)
- Typical MCAT: 512-518 (Median: ~515)
- Clinical Hours: 150-300 hours in settings supporting investigative practices
- Research: 400-800 hours in clinical or lab settings
- Independent Research Projects: 2-3
- Publications: 1-3
- Longitudinal Patient Interaction: 300-500 hours in sustained clinical role
- Valued Certifications: EMT, Community Health Worker (CHW)
- Valued Settings: Community clinics, free clinics, research-oriented settings

**Key Insight:** This cohort values **both breadth and sustained commitment**—candidates who can demonstrate meaningful involvement in both clinical and research domains.

**Example Schools:** UCSF, Icahn School of Medicine at Mount Sinai, Columbia, Duke, Northwestern Feinberg, Emory, NYU Grossman, Vanderbilt, Cleveland Clinic Lerner, USC Keck

---

### Research-Intensive Cohort

**Institutional Priorities:**
- High research funding levels (significant NIH funding)
- Emphasis on scientific inquiry through MD-PhD programs
- Integration of cutting-edge technologies and methodologies
- High research output metrics (peer-reviewed publications, active clinical trials)

**Quantitative Benchmarks:**
- Typical GPA: 3.70-3.95 (Median: ~3.825)
- Typical MCAT: 515-522 (Median: ~518.5)
- Clinical Hours: 400-600+ hours (higher engagement expected)
- Research: 1,200-1,500+ hours, often involving collaboration on meaningful faculty projects
- Independent Research Projects: 2-3
- Publications: 2-5
- Longitudinal Patient Interaction: 500+ hours in longitudinal roles with diverse populations
- Valued Certifications: Research Assistant certifications
- Valued Settings: Research hospitals, universities with clinical trials

**Key Insight:** This cohort has the **strongest emphasis on MCAT** alongside GPA. Solo leadership in research is celebrated, but collaborative contributions are equally important.

**Example Schools:** Harvard, Baylor, Mayo Clinic Alix, Washington University in St. Louis, UC San Diego, UT Southwestern, Johns Hopkins, Stanford, University of Wisconsin-Madison, University of Michigan

---

## COHORT-SPECIFIC WEIGHTING INSIGHTS

**Academic Metrics (GPA/MCAT):**
- Higher GPA Emphasis: Mission-Driven, Community-Clinical (more forgiving on test scores with strong service)
- Balanced Approach: Patient-Centered (both matter equally)
- Higher MCAT Emphasis: Clinical-Investigative, Research-Intensive (analytical capability crucial)

**Service & Leadership:**
- Quality over Quantity: Mission-Driven, Patient-Centered (sustained depth matters)
- Team-Based Valued: Community-Clinical, Patient-Centered (collaborative efforts highlighted)
- Solo + Team Balanced: Clinical-Investigative, Research-Intensive (both valued)

**Research Expectations:**
- Minimal: Mission-Driven (200-400 hours acceptable)
- Moderate: Patient-Centered, Community-Clinical (100-500 hours)
- Substantial: Clinical-Investigative (400-800 hours)
- Extensive: Research-Intensive (1,200-1,500+ hours with publications)

---

## SCORING FRAMEWORK

### Six Competency Dimensions (0-100 scale)

**1. Academic Rigor**
- Consider: GPA trends, MCAT balance, course rigor/prerequisites
- Context: Transfer credits, retakes, non-traditional pathways

**2. Clinical Exposure**
- Consider: Direct patient hours, consistency over time, variety of settings, underserved work
- Depth over breadth: 300 hours in one sustained role > 300 hours scattered

**3. Research Activities**
- Consider: Total hours, project engagement, output quality, independence/leadership
- Growth trajectory: Recent increases in commitment matter

**4. Leadership & Service**
- Consider: Impact scale, sustained commitment, role progression, tangible outcomes
- Meaningful few > superficial many

**5. Technical Skills**
- Consider: Research types (wet lab, data analysis, clinical), certifications, methods training
- Inferred from research activities and coursework

**6. Specialty Preparation**
- Consider: Career focus alignment, exposure breadth, planning maturity
- Flexibility valued: Broad exploration often better than premature specialization

### Scoring Principles:

1. **Weight Recent Experiences More Heavily** - But value sustained early involvement
2. **Growth Trajectory Thinking** - Reward consistent progression
3. **Time Horizon** - Adjust for target application cycle (2026 vs 2028 = different runway)
4. **Holistic Context** - Non-traditional pathways, personal circumstances
5. **Cohort-Specific Lens** - Same profile may score differently for different cohorts

**Score Ranges:**
- 40-60: Developing (significant gaps, needs substantial work)
- 60-75: Emerging (on track but needs strengthening)
- 75-85: Competitive (solid foundation, minor gaps)
- 85-95: Exceptional (exceeds benchmarks, strong differentiator)
- 95-100: Outstanding (top-tier, rare)

---

## STUDENT'S QUESTIONNAIRE RESPONSES

**Research Experience:**
- Total hours: ${responses.research_hours_total}
- Weekly commitment: ${responses.research_hours_weekly}
- Types: ${responses.research_types.join(', ')}
- Leadership level: ${responses.research_leadership}
- Outputs: ${responses.research_outputs}

**Clinical Experience:**
- High school hours: ${responses.clinical_hours_hs}
- College hours: ${responses.clinical_hours_college}
- Settings: ${responses.clinical_settings.join(', ')}
- Patient interaction: ${responses.patient_interaction_intensity}
- Underserved population hours: ${responses.underserved_hours}
- Certification status: ${responses.certification_plans}
- Weekly clinical hours (if certified): ${responses.certification_hours_weekly}

**Academic Performance:**
- GPA: ${responses.gpa}
- MCAT: ${responses.mcat}
- Academic preparedness: ${responses.academic_preparedness}/5
- Areas needing improvement: ${responses.academic_improvement_areas.join(', ')}
- Academic strengths: ${responses.academic_strengths.join(', ')}
- MCAT confidence: ${responses.mcat_confidence}/5

**Leadership & Service:**
- Leadership roles: ${responses.leadership_roles_count}
- Service scale: ${responses.service_scale}
- Weekly extracurricular hours: ${responses.extracurricular_hours_weekly}
- Tangible outcomes: ${responses.service_outcomes}

**Vision & Strategy:**
- Perceived gaps: ${responses.application_gaps.join(', ')}
- Primary focus area: ${responses.primary_focus}
- Greatest weakness: ${responses.greatest_weakness}
- Future contributions: ${responses.future_contributions.join(', ')}
- Target application cycle: ${responses.target_cycle}
- Timeline flexibility: ${responses.timeline_flexibility}
- Academic history flags: ${responses.academic_history_flags.join(', ')}

${responses.additional_context ? `**Additional Context (Student's Own Words):**
${responses.additional_context}

` : ''}---

## YOUR TASK

Analyze this student's profile and provide:

### 1. Six Competency Scores (0-100)
Apply professional judgment to score each dimension based on where they stand TODAY, considering growth trajectory and time until application.

### 2. Cohort Fit Rankings (0-100)
Rank fit across all 5 cohorts with meaningful differentiation. Consider both quantitative benchmarks AND qualitative alignment.

**Fit Score Ranges:**
- 75-95: Strong fit (top 1-2 cohorts)
- 60-74: Moderate fit (possible with strategic work)
- 40-59: Lower fit (significant gaps, achievable with focused effort)

### 3. Personalized Fit Analysis (2-3 sentences, max 75 words each)

For each school type, use the friendly name (Discover, Translate, Bedside, Community, Mission) throughout:
- **Opening:** Acknowledge specific strengths ("Your 350 research hours...")
- **Middle:** Cite framework benchmarks using friendly names ("Discover schools typically expect 1,200+ hours...")
- **Closing:** Provide 1-2 concrete, actionable recommendations

**Example:** "Your 800 research hours position you well for Translate schools. However, Translate-type programs typically expect 400-800 hours combined with 150-300 clinical hours. Focus on building your clinical exposure through an EMT certification within the next year."

**Tone:** Encouraging but honest. Like a trusted advisor.

**Length:** Keep tight - max 75 words per cohort to match profile_summary length.

---

## OUTPUT FORMAT

Return ONLY valid JSON (no markdown, no code blocks, no extra text):

{
  "profile_summary": "<2-3 sentences, max 75 words. TONE: Observational and validating, NOT prescriptive. Make the student feel SEEN and UNDERSTOOD. Connect dots between their experiences to reveal capabilities they might not recognize. Lead with best-fit school type (or top 2 if close). Use ONLY friendly names: Discover, Translate, Bedside, Community, Mission. Call them 'school types' or 'schools', NEVER 'cohorts'.

STRUCTURE:
- Sentence 1: Observe their specific experiences with numbers/details and what capability this reveals
- Sentence 2: Connect different areas of their profile (research + clinical, academic + service, etc.) to show pattern
- Sentence 3: Acknowledge their timeline/stage as context (not judgment) and note their foundation strengths

DO:
✅ Cite specific numbers (hours, GPA ranges, types of work)
✅ Name what their combination reveals about capability ('translational capability', 'community health insight', 'research depth')
✅ Connect dots between different competencies
✅ Acknowledge timeline as neutral context
✅ Use 'reveals', 'demonstrates', 'positions', 'shows', 'suggests capability in'

DON'T:
❌ Give advice or recommendations ('focus on', 'you should', 'you need to')
❌ Use prescriptive language ('the gap is', 'work on', 'build', 'develop')
❌ Tell them what to do next
❌ Label them as a type/archetype ('you're a research-intensive student')
❌ List scores without context
❌ Simply restate questionnaire data

EXAMPLE (Good - Observational):
'Your 800 research hours in computational biology, combined with 150 clinical hours across hospital and community clinic settings, reveal emerging translational capability. Your academic strength (GPA 3.7, MCAT 515) supports analytical work while your patient-facing experience grounds you in clinical realities. You're building toward the 2028 cycle with foundation strengths in research depth and academic metrics.'

EXAMPLE (Bad - Prescriptive):
'You're positioned for Translate schools but need more clinical hours. Focus on building breadth of settings and longitudinal commitment. Your 2029+ timeline allows you to deepen one sustained clinical role.'

The goal: Student reads this and thinks 'They really SEE me and what I've built' - not 'Here's my to-do list'.>",
  "competency_scores": {
    "academic_rigor": <0-100>,
    "clinical_exposure": <0-100>,
    "research_activities": <0-100>,
    "leadership_service": <0-100>,
    "technical_skills": <0-100>,
    "specialty_preparation": <0-100>
  },
  "cohort_rankings": [
    {
      "name": "Clinical-Investigative",
      "fitScore": <0-100>,
      "fitAnalysis": "<analysis>"
    },
    {
      "name": "Research-Intensive",
      "fitScore": <0-100>,
      "fitAnalysis": "<analysis>"
    },
    {
      "name": "Community-Clinical",
      "fitScore": <0-100>,
      "fitAnalysis": "<analysis>"
    },
    {
      "name": "Patient-Centered",
      "fitScore": <0-100>,
      "fitAnalysis": "<analysis>"
    },
    {
      "name": "Mission-Driven",
      "fitScore": <0-100>,
      "fitAnalysis": "<analysis>"
    }
  ]
}

Remember: You are not a calculator. You are an expert advisor applying nuanced judgment based on deep framework knowledge. Trust your analysis. Be specific. Be actionable. Be honest.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const responses = body.responses as QuestionnaireResponses;

    // Validate required fields
    if (!responses || typeof responses !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request: missing responses' },
        { status: 400 }
      );
    }

    // Migration: Handle old data where primary_focus was an array
    if (Array.isArray(responses.primary_focus)) {
      responses.primary_focus = responses.primary_focus[0] || '';
    }

    // Migration: Handle old data where array fields might be undefined
    if (!responses.academic_improvement_areas) {
      responses.academic_improvement_areas = [];
    }
    if (!responses.academic_strengths) {
      responses.academic_strengths = [];
    }
    if (!responses.research_types) {
      responses.research_types = [];
    }
    if (!responses.clinical_settings) {
      responses.clinical_settings = [];
    }
    if (!responses.application_gaps) {
      responses.application_gaps = [];
    }
    if (!responses.future_contributions) {
      responses.future_contributions = [];
    }
    if (!responses.academic_history_flags) {
      responses.academic_history_flags = [];
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Call Anthropic API with retry logic for JSON parsing failures
    const MAX_RETRIES = 2;
    let analysisData;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      console.log(`Calling Anthropic API (attempt ${attempt}/${MAX_RETRIES}) with model: claude-sonnet-4-5-20250929`);

      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8192,
        temperature: 0.7,
        messages: [
          {
            role: 'user',
            content: buildAnalysisPrompt(responses),
          },
        ],
      });
      console.log('Received response from Anthropic API');

      // Extract the text content from Claude's response
      const textContent = message.content.find((block) => block.type === 'text');
      if (!textContent || textContent.type !== 'text') {
        lastError = new Error('No text content in response');
        console.error(`Attempt ${attempt}: No text content`);
        continue;
      }

      // Parse the JSON response from Claude
      // Strip markdown code blocks if present (```json ... ``` or ``` ... ```)
      let jsonText = textContent.text.trim();
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\s*\n?/, '');
        jsonText = jsonText.replace(/\n?```\s*$/, '');
      }

      try {
        analysisData = JSON.parse(jsonText);
        // Success - break out of retry loop
        break;
      } catch (parseError) {
        console.error(`Attempt ${attempt}: Failed to parse JSON. Raw text:`, textContent.text.substring(0, 500));
        console.error('Parse error:', parseError);
        lastError = new Error('Invalid JSON response from AI');
        // Continue to next attempt
      }
    }

    // If we exhausted retries without success, throw the last error
    if (!analysisData) {
      throw lastError || new Error('Failed to get valid response from AI');
    }

    // Validate the response structure
    if (
      !analysisData.competency_scores ||
      !analysisData.cohort_rankings ||
      !Array.isArray(analysisData.cohort_rankings) ||
      analysisData.cohort_rankings.length < 1
    ) {
      console.error('Invalid analysis structure. Received:', JSON.stringify({
        hasCompetencyScores: !!analysisData.competency_scores,
        hasCohortRankings: !!analysisData.cohort_rankings,
        isArray: Array.isArray(analysisData.cohort_rankings),
        length: analysisData.cohort_rankings?.length,
        keys: Object.keys(analysisData),
        cohortNames: analysisData.cohort_rankings?.map((c: { name?: string }) => c.name)
      }, null, 2));
      throw new Error('Invalid analysis structure from AI');
    }

    // Warn if we didn't get exactly 5 cohorts (but still proceed)
    if (analysisData.cohort_rankings.length !== 5) {
      console.warn(`Expected 5 cohorts, got ${analysisData.cohort_rankings.length}:`,
        analysisData.cohort_rankings.map((c: { name?: string }) => c.name));
    }

    // Transform the response to match our frontend interface
    const profileSummary: string = analysisData.profile_summary || '';
    const userScores: CompetencyScores = analysisData.competency_scores;

    // Sort cohorts by fit score (highest to lowest)
    const rankedCohorts: CohortRanking[] = analysisData.cohort_rankings.sort(
      (a: CohortRanking, b: CohortRanking) => b.fitScore - a.fitScore
    );

    const result: AnalysisResult = {
      profileSummary,
      userScores,
      rankedCohorts,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);

    // Return a more specific error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}
