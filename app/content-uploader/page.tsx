import { notFound } from 'next/navigation';

export default function ContentUploaderPage() {
  // Always return 404 in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  
  return null;
} 