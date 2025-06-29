import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { z } from 'zod';

// Use a single global pool across hot reloads in dev to avoid exceeding connection limits.
// @ts-expect-error
const pool: Pool = global.pgPool || new Pool({ connectionString: process.env.DATABASE_URL });
// @ts-expect-error
if (!global.pgPool) global.pgPool = pool;

// Zod schema to validate request body
const WaitlistSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = WaitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Parameterized query to prevent SQL injection. Assumes unique constraint on email.
    await pool.query(
      'INSERT INTO waitlist_entries (email) VALUES ($1) ON CONFLICT (email) DO NOTHING;',
      [email]
    );

    return NextResponse.json({ message: 'Successfully added to waitlist!' }, { status: 201 });
  } catch (err) {
    console.error('Waitlist API Error:', err);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
} 