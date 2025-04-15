import { NextResponse } from 'next/server';

// Return a 404 for all requests
export async function GET() {
  return new NextResponse(null, { status: 404 });
}

export async function POST() {
  return new NextResponse(null, { status: 404 });
} 