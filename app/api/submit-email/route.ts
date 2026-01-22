import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

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

    // Insert email into database
    await sql`
      INSERT INTO submissions (email)
      VALUES (${email.toLowerCase().trim()})
    `;

    return NextResponse.json(
      { success: true, message: 'Email saved successfully' },
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
