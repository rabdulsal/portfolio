"use client";

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { cloudinaryConfig } from '@/lib/cloudinary';

interface ContentUploaderProps {
  onUploadSuccess?: (url: string) => void;
}

interface StatusMessage {
  type: 'success' | 'error';
  text: string;
}

export default function ContentUploader({ onUploadSuccess }: ContentUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setStatusMessage(null);
      setUploadedUrl(null);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setStatusMessage(null);
      setUploadProgress(0);

      // Create form data for Cloudinary
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', cloudinaryConfig.uploadPreset!);
      formData.append('cloud_name', cloudinaryConfig.cloudName!);

      // Simulate initial progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      // Clear interval and set to 100%
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Get the secure URL from the response
      const secureUrl = data.secure_url;
      setUploadedUrl(secureUrl);
      setStatusMessage({
        type: 'success',
        text: 'File uploaded successfully!'
      });

      if (onUploadSuccess) {
        onUploadSuccess(secureUrl);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatusMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to upload file. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {statusMessage && (
        <div
          className={`p-4 rounded-md ${
            statusMessage.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <p>{statusMessage.text}</p>
          {uploadedUrl && (
            <div className="mt-2">
              <p className="text-sm font-medium">File URL:</p>
              <a 
                href={uploadedUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:text-blue-800 break-all"
              >
                {uploadedUrl}
              </a>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
        >
          Select Image
        </Button>
        {selectedFile && (
          <Button
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        )}
      </div>

      {/* Upload Progress */}
      {(uploading || uploadProgress > 0) && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-gray-500 text-center">{uploadProgress}% Complete</p>
        </div>
      )}

      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
} 