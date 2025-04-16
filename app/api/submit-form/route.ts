import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { name, email, message: message || 'No message provided' }
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data[0]
    });

  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 