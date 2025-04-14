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
            // You can add additional handling here, like showing a success message
          }}
        />
      </div>
    </div>
  );
} 