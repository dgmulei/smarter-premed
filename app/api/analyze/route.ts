import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface QuestionnaireResponses {
  gpa: string;
  clinical_hours: string;
  research_experience: string;
  leadership: string;
  clinical_work: string;
  specialty_interest: string;
  underserved: string;
  unique_experience: string;
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
  userScores: CompetencyScores;
  rankedCohorts: CohortRanking[];
}

// Cohort archetype definitions for the AI to understand
const COHORT_DEFINITIONS = `
**Clinical-Investigative Schools**
- Profile: Integrate clinical practice with research; value both patient care and scientific investigation
- Typical GPA: 3.70-3.90 | Research: 300+ hours | Clinical: 200+ hours
- Examples: Duke, Mount Sinai, USC Keck, Stanford, UCSF
- Key competencies: academic_rigor (85), research_activities (90), clinical_exposure (75), technical_skills (85)

**Research-Intensive Schools**
- Profile: Emphasize scientific inquiry, research methodology, academic medicine; MD/PhD pathways
- Typical GPA: 3.80-4.00 | Research: 1,200+ hours with publications | Clinical: variable
- Examples: Harvard, Johns Hopkins, WashU, Yale, UPenn
- Key competencies: academic_rigor (90), research_activities (95), technical_skills (90)

**Community-Clinical Schools**
- Profile: Deep commitment to underserved populations, health disparities, community health
- Typical GPA: 3.50-3.80 | Community service: extensive | Clinical: 400+ hours
- Examples: UC Davis, UNM, Morehouse, UWashington, East Carolina
- Key competencies: clinical_exposure (85), leadership_service (90), specialty_preparation (75)

**Patient-Centered Schools**
- Profile: Prioritize direct patient interaction, empathy, longitudinal clinical experiences
- Typical GPA: 3.60-3.85 | Clinical: 500+ hours | Focus: interpersonal skills, patient advocacy
- Examples: UChicago Pritzker, Case Western, Vanderbilt, Dartmouth, Brown
- Key competencies: clinical_exposure (90), leadership_service (85), academic_rigor (75)

**Mission-Driven Schools**
- Profile: Value specific specialty interests, unique populations, mission alignment (primary care, global health, faith-based)
- Typical GPA: 3.50-3.80 | Focus: service, health equity, social impact, specific career path
- Examples: VCU, Tulane, Georgetown, Medical College Wisconsin, Creighton
- Key competencies: leadership_service (85), specialty_preparation (90), clinical_exposure (80)
`;

function buildAnalysisPrompt(responses: QuestionnaireResponses): string {
  return `You are an expert medical school admissions consultant analyzing a pre-med student's profile. Your task is to:

1. **Calculate 6 competency scores (0-100 scale)** based on their questionnaire responses
2. **Rank their fit across all 5 medical school cohorts**
3. **Generate personalized fit analysis** for each cohort

## Student's Questionnaire Responses:

**Academic Performance:**
- GPA: ${responses.gpa}

**Clinical Experience:**
- Volunteer/shadowing hours: ${responses.clinical_hours}
- Paid clinical work: ${responses.clinical_work}
- Work with underserved populations: ${responses.underserved}

**Research & Technical Skills:**
- Research experience: ${responses.research_experience}

**Leadership & Service:**
- Leadership activities: ${responses.leadership}

**Career Focus:**
- Specialty interest: ${responses.specialty_interest}

**Unique Background:**
${responses.unique_experience}

## Medical School Cohort Archetypes:

${COHORT_DEFINITIONS}

## Required Output Format:

Provide your analysis in this EXACT JSON structure (no markdown, no code blocks, just valid JSON):

{
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
      "fitAnalysis": "<2-3 sentence personalized analysis explaining their fit, specific strengths, and 1-2 concrete recommendations to improve alignment>"
    },
    {
      "name": "Research-Intensive",
      "fitScore": <0-100>,
      "fitAnalysis": "<personalized analysis>"
    },
    {
      "name": "Community-Clinical",
      "fitScore": <0-100>,
      "fitAnalysis": "<personalized analysis>"
    },
    {
      "name": "Patient-Centered",
      "fitScore": <0-100>,
      "fitAnalysis": "<personalized analysis>"
    },
    {
      "name": "Mission-Driven",
      "fitScore": <0-100>,
      "fitAnalysis": "<personalized analysis>"
    }
  ]
}

## Scoring Guidelines:

**Competency Scores (0-100):**
- Use the questionnaire responses to calculate realistic scores
- GPA ranges: below-3.0 (50-60), 3.0-3.3 (60-70), 3.4-3.6 (70-80), 3.7-3.8 (80-90), 3.9-4.0 (90-100)
- Clinical hours: 0-50 (40-50), 51-150 (50-65), 151-300 (65-80), 301-500 (80-90), 500+ (90-100)
- Research: none (30-40), some (40-55), ongoing (55-75), publication (75-90), extensive (90-100)
- Leadership: minimal (40-50), member (50-65), officer (65-80), founder (80-90), extensive (90-100)
- Factor in their unique experiences and holistic profile

**Cohort Fit Scores (0-100):**
- Calculate how well their competency profile matches each cohort's archetype
- Consider both the competency scores AND the qualitative aspects (unique experiences, goals, values)
- Highest fit should be 75-95 range, lowest fit should be 40-60 range
- Create meaningful differentiation between cohorts

**Fit Analysis:**
- Start by acknowledging their specific strengths relevant to that cohort
- Reference their actual questionnaire responses (e.g., "Your X hours of clinical experience...")
- Provide 1-2 concrete, actionable recommendations to strengthen fit
- Keep tone encouraging but realistic
- Each analysis should be 2-3 sentences, roughly 60-90 words

Return ONLY the JSON object, no additional text.`;
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

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Call Anthropic API with the analysis prompt
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: buildAnalysisPrompt(responses),
        },
      ],
    });

    // Extract the text content from Claude's response
    const textContent = message.content.find((block) => block.type === 'text');
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response');
    }

    // Parse the JSON response from Claude
    let analysisData;
    try {
      analysisData = JSON.parse(textContent.text);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', textContent.text);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate the response structure
    if (
      !analysisData.competency_scores ||
      !analysisData.cohort_rankings ||
      !Array.isArray(analysisData.cohort_rankings) ||
      analysisData.cohort_rankings.length !== 5
    ) {
      throw new Error('Invalid analysis structure from AI');
    }

    // Transform the response to match our frontend interface
    const userScores: CompetencyScores = analysisData.competency_scores;

    // Sort cohorts by fit score (highest to lowest)
    const rankedCohorts: CohortRanking[] = analysisData.cohort_rankings
      .sort((a: CohortRanking, b: CohortRanking) => b.fitScore - a.fitScore);

    const result: AnalysisResult = {
      userScores,
      rankedCohorts,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis error:', error);

    // Return a more specific error message
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to analyze profile' },
      { status: 500 }
    );
  }
}
