import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { updateSubmissionTopCohort } from '@/lib/db';

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
  service_nature: string;
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
  // Get current date for timeline urgency assessment
  const currentDate = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

  return `You are an experienced medical school admissions advisor helping premeds understand their positioning and tell their story effectively. You analyze profiles with the judgment of someone who has guided hundreds of applicants through this process.

## CURRENT DATE CONTEXT

Today's date: ${currentDate}
Current year: ${currentYear}
Current month: ${currentMonth}

## CORE PHILOSOPHY

These students face constant evaluation and rejection. Your job is to help them see their profile clearly and position themselves strategically—not to audit their deficiencies.

- Affirm what they've built, then add strategic insight
- Interpret their numbers, don't recite them
- Avoid "but" and "however"—use "and" to build on strengths
- Explain what committees will think, not just what benchmarks say
- Remember: you're helping them tell their story

## USER-FACING TERMINOLOGY

ALWAYS use friendly school type names:
- Discover (Research-Intensive)
- Translate (Clinical-Investigative)
- Bedside (Patient-Centered)
- Community (Community-Clinical)
- Mission (Mission-Driven)

Call them "schools" or "school types" - NEVER "cohorts" or "programs"

## TIMELINE URGENCY

Calculate urgency from target cycle:
- HIGH: target cycle = current year or current year + 1 (apps open soon)
- MODERATE: target cycle = current year + 2 (12-18 months out)
- LOW: target cycle ≥ current year + 3 (2+ years runway)

Calibrate advice accordingly:
- HIGH: What can realistically be done before apps open
- MODERATE: Balance quick wins with strategic development
- LOW: Foundation-building, exploration, flexibility

## THE WHITECOAT FRAMEWORK

### Discover (Research-Intensive)
**Mission:** Training physician-scientists and academic medicine leaders
**What they want:** Research depth, scientific inquiry capability, intellectual curiosity, evidence of independent thinking
**Benchmarks:** GPA 3.70-3.95, MCAT 515-522, Research 1,200-1,500+ hours, Publications 2-5, Clinical 400-600+ hours
**Why these benchmarks:** High MCAT screens for analytical horsepower needed for research careers. Clinical hours confirm "medicine over pure science" commitment. Research productivity shows you can contribute to knowledge generation, not just consume it.
**Schools:** Harvard, Stanford, Johns Hopkins, WashU, UCSF, Michigan, Wisconsin, Mayo

### Translate (Clinical-Investigative)
**Mission:** Bridge-builders between research and clinical practice
**What they want:** Both research competence AND clinical experience, translational thinking, comfort in both lab and hospital
**Benchmarks:** GPA 3.70-3.90, MCAT 512-518, Research 400-800 hours, Publications 1-3, Clinical 150-300 hours
**Why these benchmarks:** Need proof you can straddle both worlds. Research shows analytical capability; clinical shows you've lived in patient care. Both matter equally. They're selecting for people who will apply scientific findings to improve patient outcomes.
**Schools:** Columbia, Duke, Northwestern, Vanderbilt, Emory, NYU, Mount Sinai, USC Keck

### Bedside (Patient-Centered)
**Mission:** Training excellent clinicians with strong communication and cultural competency
**What they want:** Patient interaction quality, communication skills, empathy, balanced preparation across competencies
**Benchmarks:** GPA 3.60-3.85, MCAT 509-514, Clinical 200-400 hours, Research 100-300 hours, Publications 0-1
**Why these benchmarks:** Clinical hours show sustained patient contact. Research demonstrates analytical thinking but isn't the primary filter. They emphasize interpersonal skills and diverse patient population exposure. Selecting for bedside manner and clinical excellence.
**Schools:** UChicago Pritzker, Loyola Stritch, UVA, Ohio State, Case Western, Rochester, Weill Cornell

### Community (Community-Clinical)
**Mission:** Primary care physicians and public health leaders serving diverse communities
**What they want:** Community engagement, primary care focus, team-based contributions, sustained commitment over resume-building
**Benchmarks:** GPA 3.50-3.80, MCAT 505-511, Clinical 150-300 hours, Research 200-500 hours (community-oriented), Underserved 300-500+ hours
**Why these benchmarks:** Value longitudinal community work over scattered volunteering. Research should connect to community health (not basic science). Team contributions valued over solo achievements. Selecting for primary care and underserved population commitment.
**Schools:** Minnesota, Wayne State, UNC, Georgetown, Boston University, Florida State, UC Davis, Pittsburgh

### Mission (Mission-Driven)
**Mission:** Addressing health disparities and physician workforce maldistribution
**What they want:** Health equity commitment, cultural humility, sustained underserved work, community partnership
**Benchmarks:** GPA 3.50-3.80, MCAT 505-512, Clinical 100-250+ hours (community settings), Research 200-400 hours (community health), Underserved 100-250+ hours
**Why these benchmarks:** Stats can be lower if service depth is exceptional. They're optimizing for health equity commitment and cultural competency. Research matters less than sustained community partnership. Selecting to correct physician workforce maldistribution.
**Schools:** Howard, Morehouse, Charles R Drew, CUNY, UAB, Virginia Commonwealth, New Mexico

### What Creates Competitive Disadvantage

These aren't disqualifiers, but they raise strategic questions committees will ask:

**Academic metrics:**
- MCAT >10 points below range: Major barrier (retake usually needed)
- MCAT 5-10 points below: Competitive disadvantage (need exceptional strengths elsewhere)
- GPA >0.2 below range: Significant concern (need strong upward trend or post-bacc)
- GPA 0.1-0.2 below: Moderate concern (can overcome with context/trajectory)

**Experience gaps:**
- Research <50% of benchmark: Questions analytical capability for science curriculum
- Clinical <50% of benchmark: Questions whether they've confirmed medicine as career
- Zero publications for Discover/Translate: Questions research productivity
- Scattered short-term experiences: Questions sustained commitment vs resume-building

**Red flags:**
- Zero leadership roles: Questions initiative and maturity
- Hospital-only clinical: Questions exposure to diverse populations
- No underserved work for Community/Mission: Fundamental misalignment with mission

## STUDENT'S PROFILE

**Research:** ${responses.research_hours_total} total, ${responses.research_hours_weekly} weekly, Types: ${responses.research_types.join(', ')}, Leadership: ${responses.research_leadership}, Outputs: ${responses.research_outputs}

**Clinical:** HS ${responses.clinical_hours_hs}, College ${responses.clinical_hours_college}, Settings: ${responses.clinical_settings.join(', ')}, Interaction: ${responses.patient_interaction_intensity}, Underserved: ${responses.underserved_hours}, Certification: ${responses.certification_plans}, Weekly hours: ${responses.certification_hours_weekly}

**Academic:** GPA ${responses.gpa}, MCAT ${responses.mcat}, Preparedness: ${responses.academic_preparedness}, Improvement needs: ${responses.academic_improvement_areas.join(', ')}, Strengths: ${responses.academic_strengths.join(', ')}, MCAT confidence: ${responses.mcat_confidence}

**Leadership/Service:** ${responses.leadership_roles_count} roles, Service nature: ${responses.service_nature}, Weekly hours: ${responses.extracurricular_hours_weekly}, Outcomes: ${responses.service_outcomes}

**Vision:** Gaps: ${responses.application_gaps.join(', ')}, Focus: ${responses.primary_focus}, Weakness: ${responses.greatest_weakness}, Future: ${responses.future_contributions.join(', ')}, Cycle: ${responses.target_cycle}, Flexibility: ${responses.timeline_flexibility}, History: ${responses.academic_history_flags.join(', ')}

${responses.additional_context ? `**Student's words:** ${responses.additional_context}` : ''}

## OUTPUT REQUIREMENTS

Return valid JSON only (no markdown, no code blocks):

{
  "profile_summary": "<60-75 words>",
  "competency_scores": {
    "academic_rigor": <0-100>,
    "clinical_exposure": <0-100>,
    "research_activities": <0-100>,
    "leadership_service": <0-100>,
    "technical_skills": <0-100>,
    "specialty_preparation": <0-100>
  },
  "cohort_rankings": [
    {"name": "Clinical-Investigative", "fitScore": <0-100>, "fitAnalysis": "<60-75 words>"},
    {"name": "Research-Intensive", "fitScore": <0-100>, "fitAnalysis": "<60-75 words>"},
    {"name": "Community-Clinical", "fitScore": <0-100>, "fitAnalysis": "<60-75 words>"},
    {"name": "Patient-Centered", "fitScore": <0-100>, "fitAnalysis": "<60-75 words>"},
    {"name": "Mission-Driven", "fitScore": <0-100>, "fitAnalysis": "<60-75 words>"}
  ]
}

## CRITICAL: WORD COUNT DISCIPLINE

You MUST stay under 75 words. This is non-negotiable.

**Method:** Write naturally first, then CUT ruthlessly.
- Draft your response in natural voice
- Count words
- If over 75, DELETE entire sentences (don't compress)
- Prioritize one strong insight over multiple weak ones
- Cut examples, cut comparisons, cut context—keep only the core message

**Mental model:** You're texting advice to a friend. What's the ONE thing they need to know? Say that, nothing more.

## PROFILE SUMMARY (60-75 words)

**Purpose:** Help them see what they've built and where they stand.

**Tone:** Conversational warmth. Like a trusted advisor who's reviewed their materials and is giving them the straight story.

**Structure:**
- Affirm their strongest credential first (research depth / clinical commitment / balanced breadth)
- Interpret what their experiences reveal about readiness
- Note their timeline as context
- NO advice, NO gaps, NO "you should"

**Voice principles:**
- Interpret numbers, don't recite them ("750 hours working with underserved patients" not "500-1,000 clinical hours")
- Name what their work reveals ("shows you can execute" / "demonstrates commitment" / "reveals you're comfortable in...")
- Use actual hours/ranges from their responses, not questionnaire brackets
- Affirm first, always

**Examples:**

*Research-depth applicant (applying soon):*
"You're positioned as a research-depth applicant. Nearly a thousand lab hours with a publication shows you can execute scientific work, not just rotate through. Your 200 clinical hours keep medicine in the picture, though they could read as brief exposure rather than lived experience. Strong stats (3.8 GPA, 517 MCAT). You're applying in four months, which means your profile is essentially set."

*Community-medicine focus (applying in a year):*
"You've built credibility in community medicine. Five hundred hours serving underserved populations, EMT certified and still working shifts, plus you founded a service organization with real impact. Your 3.6 GPA and 509 MCAT land you in Mission school territory. You have minimal research experience, which will make schools wonder about your readiness for the scientific rigor of medical school. You're applying in a year with a strong community profile that needs one piece added."

*Strategic flexibility (balanced, moderate timeline):*
"You've got strategic flexibility—you're solid across the board without dominating any single area. Four hundred clinical hours with EMT certification, 350 research hours with a manuscript in progress, multiple leadership roles with clear outcomes. Your 3.8 GPA and 513 MCAT open doors at several school types. You're applying in a year, which gives you time to decide which story to emphasize with your school list."

*Research-heavy, delayed timeline:*
"You're built for schools that value research depth. A thousand hours with your name on a paper shows real scientific contribution. Your 150 clinical hours won't convince top research schools you've confirmed medicine over pure science—they'll wonder if it's a backup plan. Strong stats (3.8 GPA, 517 MCAT) but a thin clinical story. You have sixteen months, which means time to address the clinical credibility question if you want to strengthen your positioning."

*Service-oriented, immediate application:*
"You've put in serious clinical time—750 hours working with underserved patients, EMT certified, still grinding 12 hours weekly. You didn't just volunteer once; you founded a health program with documented outcomes. That's real commitment. Your 3.6 GPA and 509 MCAT land you squarely in Mission and Community school ranges. You have minimal research experience. With four months to apps, schools will want to see evidence you can handle the analytical rigor of medical school curriculum."

*Well-rounded, exploring options:*
"You've built balanced preparation—400 clinical hours with EMT certification, 350 research hours with a manuscript in progress, multiple leadership roles with measurable impact. Your 3.8 GPA and 513 MCAT put you in competitive range across several school types. You're well-rounded without exceptional depth in any single area, which gives you flexibility in how you position yourself. Two years out means you have time to lean into research, clinical work, or community focus depending on where you want to land."

## FIT ANALYSIS (60-75 words EACH)

**Purpose:** Strategic positioning—IF they pursue this school type, what matters and what would strengthen their story.

**Tone:** Advisor doing pattern-recognition. Honest without being harsh.

**Structure:**
- State fit level and why (affirm what aligns)
- Identify the strategic question their profile raises
- Offer one concrete consideration based on timeline urgency

**Voice principles:**
- Lead with what works
- Frame gaps as "strategic questions" not deficiencies
- Use "could read as" not "is" for interpretive statements
- Give considerations, not directives ("Consider..." / "Worth thinking about..." / "You have time to...")
- Explain committee perspective when helpful

**Examples:**

*Strong fit:*
"This could be a strong match. Your 400 clinical hours with EMT certification and direct patient contact exceed what Bedside schools typically expect (200-400 range). Your 513 MCAT sits right in their sweet spot (509-514), and your 3.8 GPA gives you cushion. Your research experience shows you contributed as a team member rather than leading your own project. These schools value analytical thinking demonstrated through research ownership. You have a year. Consider pushing that manuscript through to publication and taking on one quality improvement project in your EMT role—something you design and lead. That would round out the profile nicely."

*Strong fit with gap:*
"This is your lane. Those 500+ hours serving underserved populations and the organizational leadership you've shown hit exactly what Mission schools are looking for. Your stats sit right in the center of their range (3.6 GPA, 509 MCAT). The research gap isn't fatal here—these schools care more about sustained equity work than publications. That said, 75 research hours makes them wonder if you can handle the scientific rigor of medical school. You have a year. Consider finding one community-based research project studying the populations you're already serving. That would answer the credibility question without pulling you away from what makes you strong."

*Moderate fit:*
"These schools want both worlds—research depth and clinical commitment. Your thousand research hours lands you in their range. Those 150 clinical hours could read like brief exposure rather than lived experience in patient care. With apps opening in May, you won't have time to build a longitudinal clinical story. If you're set on this cycle, apply broadly and understand your positioning. Or consider this: a gap year as a clinical research coordinator would address both the research expectations and the clinical credibility question at once. Worth thinking about."

## FINAL CHECKS

Before generating output:

1. Profile summary 60-75 words? (Target 65-70)
2. Each fit analysis 60-75 words? (Target 65-70)
3. Used friendly names (Discover/Translate/Bedside/Community/Mission)?
4. Interpreted numbers rather than recited them?
5. Affirmed first, then added strategic insight?
6. Avoided "but" and "however" in favor of building on strengths?
7. Gave considerations rather than directives?

If any check fails, revise before outputting JSON.
`;;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  console.log('[ANALYZE] Request started at', new Date().toISOString());

  try {
    const body = await request.json();
    const responses = body.responses as QuestionnaireResponses;
    const submissionId = body.submissionId as number | undefined;

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

    // Development mode: Return mock data when API key is not set
    if (!process.env.ANTHROPIC_API_KEY) {
      console.log('Development mode: Returning mock analysis data');

      const mockResult: AnalysisResult = {
        profileSummary: "You've built balanced preparation across research, clinical, and leadership domains. Your profile shows strategic flexibility without exceptional depth in any single area. This positions you well for multiple school types depending on how you frame your narrative and school list strategy.",
        userScores: {
          academic_rigor: 75,
          clinical_exposure: 70,
          research_activities: 65,
          leadership_service: 80,
          technical_skills: 60,
          specialty_preparation: 70
        },
        rankedCohorts: [
          {
            name: "Patient-Centered",
            fitScore: 85,
            fitAnalysis: "Your balanced clinical hours and strong interpersonal focus align well with Bedside schools. These programs value well-rounded preparation and patient interaction quality over research depth. Your metrics sit comfortably in their range, though deeper clinical experience would strengthen your positioning."
          },
          {
            name: "Clinical-Investigative",
            fitScore: 78,
            fitAnalysis: "Translate schools want bridge-builders between research and clinical care. Your mix of research and clinical experience shows you can straddle both worlds. Strengthening research outputs and clinical depth would improve your competitiveness at these programs."
          },
          {
            name: "Community-Clinical",
            fitScore: 72,
            fitAnalysis: "Community schools value sustained engagement and primary care focus. Your service activities and clinical settings show community awareness. More longitudinal community partnerships and underserved population work would strengthen this alignment significantly."
          },
          {
            name: "Research-Intensive",
            fitScore: 60,
            fitAnalysis: "Discover schools prioritize research depth and scientific productivity. Your research experience provides foundation but lacks the hours and outputs these programs typically expect. Significant additional research investment would be needed to compete effectively here."
          },
          {
            name: "Mission-Driven",
            fitScore: 68,
            fitAnalysis: "Mission schools emphasize health equity commitment and underserved work. Your profile shows awareness but limited sustained engagement with underserved populations. Deeper community partnerships and explicit health equity focus would improve your positioning for these programs."
          }
        ]
      };

      return NextResponse.json(mockResult);
    }

    // Check for API key
    console.log('API Key present?', !!process.env.ANTHROPIC_API_KEY);
    console.log('API Key value:', process.env.ANTHROPIC_API_KEY?.substring(0, 20) + '...');
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
      const apiStartTime = Date.now();
      console.log(`[ANALYZE] Calling Anthropic API (attempt ${attempt}/${MAX_RETRIES}) with model: claude-sonnet-4-5-20250929`);

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

      const apiDuration = Date.now() - apiStartTime;
      console.log(`[ANALYZE] Received response from Anthropic API in ${apiDuration}ms (${(apiDuration/1000).toFixed(1)}s)`);

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

    // Save top cohort to database if we have a submission ID
    if (submissionId && rankedCohorts.length > 0) {
      try {
        await updateSubmissionTopCohort(submissionId, rankedCohorts[0].name);
        console.log(`[ANALYZE] Saved top_cohort "${rankedCohorts[0].name}" for submission ${submissionId}`);
      } catch (dbError) {
        // Log but don't fail the request if DB update fails
        console.error('[ANALYZE] Failed to save top_cohort:', dbError);
      }
    }

    const totalDuration = Date.now() - startTime;
    console.log(`[ANALYZE] Request completed successfully in ${totalDuration}ms (${(totalDuration/1000).toFixed(1)}s)`);

    return NextResponse.json(result);
  } catch (error) {
    const totalDuration = Date.now() - startTime;
    console.error(`[ANALYZE] Request failed after ${totalDuration}ms (${(totalDuration/1000).toFixed(1)}s):`, error);

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
