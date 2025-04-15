"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContentUploader from '@/components/custom/ContentUploader';

// Add a simple authentication check
const isAuthenticated = () => {
  // In a real app, this would check for a valid session/token
  // For now, we'll use an environment variable
  return process.env.NEXT_PUBLIC_ADMIN_MODE === 'true';
};

export default function ContentUploaderPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated()) {
      router.push('/');
    }
  }, [router]);

  // Don't render anything while checking auth
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Content Uploader</h1>
        <div className="max-w-2xl mx-auto">
          <ContentUploader 
            onUploadSuccess={(url) => {
              console.log('Uploaded image URL:', url);
            }}
            onProjectCreated={() => {
              console.log('Project created successfully');
              // Optionally redirect after successful upload
              router.push('/#projects');
            }}
          />
        </div>
      </div>
    </div>
  );
} 