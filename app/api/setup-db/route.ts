import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    return NextResponse.json(
      { success: true, message: 'Database setup complete' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error setting up database:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to setup database', details: errorMessage },
      { status: 500 }
    );
  }
}
