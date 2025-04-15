import { NextResponse } from 'next/server';

// Static responses for production build
export async function GET() {
  return new NextResponse(null, { status: 404 });
}

export async function POST() {
  return new NextResponse(null, { status: 404 });
} 