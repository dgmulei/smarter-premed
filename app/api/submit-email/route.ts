import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { QuestionnaireResponses } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, questionnaireResponses } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert email and questionnaire responses into database
    const result = await sql`
      INSERT INTO submissions (email, questionnaire_responses, created_at)
      VALUES (
        ${email.toLowerCase().trim()},
        ${questionnaireResponses ? JSON.stringify(questionnaireResponses) : null}::jsonb,
        NOW()
      )
      RETURNING id
    `;

    const submissionId = result.rows[0].id;

    return NextResponse.json(
      { success: true, message: 'Email saved successfully', submissionId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to save email', details: errorMessage },
      { status: 500 }
    );
  }
}
