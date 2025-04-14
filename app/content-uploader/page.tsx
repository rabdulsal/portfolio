"use client";

import ContentUploader from '@/components/custom/ContentUploader';

export default function ContentUploaderPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Content Uploader</h1>
      <div className="max-w-2xl mx-auto">
        <ContentUploader 
          onUploadSuccess={(url) => {
            console.log('Uploaded image URL:', url);
          }}
          onProjectCreated={() => {
            // Refresh projects list or update UI
            console.log('Project created successfully');
          }}
        />
      </div>
    </div>
  );
} 