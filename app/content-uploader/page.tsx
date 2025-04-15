export const dynamic = 'force-dynamic';
export const runtime = 'edge';

import { redirect } from 'next/navigation';

export default function ContentUploaderPage() {
  // For production builds, always redirect to home
  if (process.env.NODE_ENV === 'production') {
    redirect('/');
  }
  
  return null;
} 