'use client';

import { notFound } from 'next/navigation';
import ContentUploader from '@/components/custom/ContentUploader';

export default function ContentUploaderPage() {
  // Always return 404 in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Content Uploader</h1>
      <ContentUploader />
    </div>
  );
} 