import { sql } from '@vercel/postgres';

/**
 * Database Schema for Positioned App
 *
 * Table: submissions
 *
 * Stores user submissions with questionnaire responses for future tools.
 *
 * SQL to run in Vercel Postgres console:
 *
 * ALTER TABLE submissions ADD COLUMN IF NOT EXISTS questionnaire_responses JSONB;
 * ALTER TABLE submissions ADD COLUMN IF NOT EXISTS top_cohort VARCHAR(50);
 */

// Questionnaire response structure (30 questions)
export interface QuestionnaireResponses {
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

  // Free Response (Q30)
  additional_context?: string;
}

/**
 * Save a new submission with email and questionnaire responses
 * Returns the submission ID for later updating with top_cohort
 */
export async function saveSubmission(
  email: string,
  questionnaireResponses: QuestionnaireResponses
): Promise<number> {
  const result = await sql`
    INSERT INTO submissions (email, questionnaire_responses, created_at)
    VALUES (
      ${email.toLowerCase().trim()},
      ${JSON.stringify(questionnaireResponses)}::jsonb,
      NOW()
    )
    RETURNING id
  `;

  return result.rows[0].id;
}

/**
 * Update a submission with top cohort after analysis
 */
export async function updateSubmissionTopCohort(
  submissionId: number,
  topCohort: string
): Promise<void> {
  await sql`
    UPDATE submissions
    SET top_cohort = ${topCohort}
    WHERE id = ${submissionId}
  `;
}

/**
 * Find most recent submission by email
 * Returns questionnaire responses for returning users
 */
export async function findSubmissionByEmail(
  email: string
): Promise<{ id: number; questionnaire_responses: QuestionnaireResponses } | null> {
  const result = await sql`
    SELECT id, questionnaire_responses
    FROM submissions
    WHERE email = ${email.toLowerCase().trim()}
    ORDER BY created_at DESC
    LIMIT 1
  `;

  if (result.rows.length === 0) return null;
  return {
    id: result.rows[0].id,
    questionnaire_responses: result.rows[0].questionnaire_responses as QuestionnaireResponses
  };
}
