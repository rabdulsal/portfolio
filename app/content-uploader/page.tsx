'use client';

import { notFound } from 'next/navigation';
import ContentUploader from '@/components/custom/ContentUploader';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function ContentUploaderPage() {
  const [projectPreviewUrl, setProjectPreviewUrl] = useState<string | null>(null);
  const [quickPreviewUrl, setQuickPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });

  // Clean up preview URLs when component unmounts or when URLs change
  useEffect(() => {
    return () => {
      if (projectPreviewUrl) {
        URL.revokeObjectURL(projectPreviewUrl);
      }
    };
  }, [projectPreviewUrl]);

  useEffect(() => {
    return () => {
      if (quickPreviewUrl) {
        URL.revokeObjectURL(quickPreviewUrl);
      }
    };
  }, [quickPreviewUrl]);

  // Handle preview URL changes
  const handleProjectPreviewChange = (url: string | null) => {
    if (projectPreviewUrl) {
      URL.revokeObjectURL(projectPreviewUrl);
    }
    setProjectPreviewUrl(url);
  };

  const handleQuickPreviewChange = (url: string | null) => {
    if (quickPreviewUrl) {
      URL.revokeObjectURL(quickPreviewUrl);
    }
    setQuickPreviewUrl(url);
  };

  // Always return 404 in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/">
              <Image 
                src={`https://res.cloudinary.com/${cloudName}/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png`}
                alt="Logo"
                width={32}
                height={32}
                className="rounded-sm"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Content Uploader</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section - 1/3 width */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="bg-card rounded-lg border p-4">
              <ContentUploader 
                onProjectPreviewChange={handleProjectPreviewChange}
                onQuickPreviewChange={handleQuickPreviewChange}
                onStatusChange={setUploadStatus}
              />
            </div>
          </div>
          
          {/* Preview Section - 2/3 width */}
          <div className="w-full lg:w-2/3 space-y-8">
            {/* Status Message */}
            {uploadStatus.type && uploadStatus.message && (
              <Alert variant={uploadStatus.type === 'error' ? 'destructive' : 'default'} className="mb-4">
                {uploadStatus.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>{uploadStatus.message}</AlertDescription>
              </Alert>
            )}

            {/* Project Preview Area */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Project Image Preview</h2>
              <div className="bg-muted/10 rounded-lg border border-muted p-6">
                <div className="aspect-[16/9] w-full relative flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  {projectPreviewUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={projectPreviewUrl}
                        alt="Project Preview"
                        className="object-contain rounded-lg"
                        fill
                        sizes="(max-width: 768px) 100vw, 75vw"
                        unoptimized
                        priority
                      />
                    </div>
                  ) : (
                    <div className="text-center space-y-4 max-w-md mx-auto px-4">
                      <div className="w-20 h-20 mx-auto border-2 border-purple-500/20 rounded-full flex items-center justify-center bg-purple-500/5">
                        <Image 
                          src={`https://res.cloudinary.com/${cloudName}/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png`}
                          alt="Upload"
                          width={40}
                          height={40}
                          className="opacity-75"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-muted-foreground">No Project Image Selected</p>
                        <p className="text-sm text-muted-foreground/75 mt-1">
                          Select a project image to see a preview here. The image will be used as the main visual for your project.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Upload Preview Area */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Quick Upload Preview</h2>
              <div className="bg-muted/10 rounded-lg border border-muted p-6">
                <div className="aspect-[16/9] w-full relative flex items-center justify-center bg-background/50 backdrop-blur-sm">
                  {quickPreviewUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={quickPreviewUrl}
                        alt="Quick Upload Preview"
                        className="object-contain rounded-lg"
                        fill
                        sizes="(max-width: 768px) 100vw, 75vw"
                        unoptimized
                        priority
                      />
                    </div>
                  ) : (
                    <div className="text-center space-y-4 max-w-md mx-auto px-4">
                      <div className="w-20 h-20 mx-auto border-2 border-purple-500/20 rounded-full flex items-center justify-center bg-purple-500/5">
                        <Image 
                          src={`https://res.cloudinary.com/${cloudName}/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png`}
                          alt="Upload"
                          width={40}
                          height={40}
                          className="opacity-75"
                        />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-muted-foreground">Quick Upload Image Preview</p>
                        <p className="text-sm text-muted-foreground/75 mt-1">
                          Select an image for quick upload to get an instant preview. Perfect for quick sharing and reference.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 