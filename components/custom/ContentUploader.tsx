"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import { projectOperations, type Project } from '@/lib/supabase';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from 'next/navigation';
import { Separator } from "@/components/ui/separator";

interface ContentUploaderProps {
  onUploadSuccess?: (url: string) => void;
  onProjectCreated?: () => void;
}

interface StatusMessage {
  type: 'success' | 'error';
  text: string;
}

export default function ContentUploader({ onUploadSuccess, onProjectCreated }: ContentUploaderProps) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createdProject, setCreatedProject] = useState<Project | null>(null);

  // Cloudinary-only upload states
  const [cloudinaryFile, setCloudinaryFile] = useState<File | null>(null);
  const [cloudinaryPreviewUrl, setCloudinaryPreviewUrl] = useState<string | null>(null);
  const [cloudinaryUploading, setCloudinaryUploading] = useState(false);
  const [cloudinaryProgress, setCloudinaryProgress] = useState(0);
  const [cloudinaryStatusMessage, setCloudinaryStatusMessage] = useState<StatusMessage | null>(null);
  const [cloudinaryUploadedUrl, setCloudinaryUploadedUrl] = useState<string | null>(null);
  const cloudinaryFileInputRef = useRef<HTMLInputElement>(null);

  // Project details state
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setStatusMessage(null);
      setUploadedUrl(null);
      setUploadProgress(0);
      setCreatedProject(null);
    }
  };

  const handleCloudinaryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCloudinaryFile(file);
      const url = URL.createObjectURL(file);
      setCloudinaryPreviewUrl(url);
      setCloudinaryStatusMessage(null);
      setCloudinaryUploadedUrl(null);
      setCloudinaryProgress(0);
    }
  };

  const resetForm = () => {
    setProjectName('');
    setProjectDescription('');
    setWebsiteUrl('');
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadedUrl(null);
    setStatusMessage(null);
    setCreatedProject(null);
  };

  const resetCloudinaryForm = () => {
    setCloudinaryFile(null);
    setCloudinaryPreviewUrl(null);
    setCloudinaryUploadedUrl(null);
    setCloudinaryStatusMessage(null);
    setCloudinaryProgress(0);
  };

  const validateWebsiteUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const uploadToCloudinary = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file');
    }

    // Convert file to base64
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });

    try {
      const base64 = await base64Promise;

      // Upload using Netlify function
      const response = await fetch('/.netlify/functions/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (!data.url) {
        throw new Error('No URL returned from upload');
      }

      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !projectName.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide both an image and a project name'
      });
      return;
    }

    if (websiteUrl && !validateWebsiteUrl(websiteUrl)) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid website URL (including http:// or https://)'
      });
      return;
    }

    try {
      setUploading(true);
      setStatusMessage(null);
      setUploadProgress(0);

      // Simulate initial progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      // Upload to Cloudinary
      const secureUrl = await uploadToCloudinary(selectedFile);

      // Clear interval and set to 100%
      clearInterval(progressInterval);
      setUploadProgress(100);

      setUploadedUrl(secureUrl);

      // Create project in Supabase
      const newProject = await projectOperations.createProject({
        name: projectName,
        description: projectDescription,
        image_url: secureUrl,
        website_url: websiteUrl || undefined,
      });

      setCreatedProject(newProject);
      setStatusMessage({
        type: 'success',
        text: 'Project created successfully!'
      });

      if (onUploadSuccess) {
        onUploadSuccess(secureUrl);
      }

      if (onProjectCreated) {
        onProjectCreated();
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

  const handleCloudinaryUpload = async () => {
    if (!cloudinaryFile) {
      setCloudinaryStatusMessage({
        type: 'error',
        text: 'Please select an image to upload'
      });
      return;
    }

    try {
      setCloudinaryUploading(true);
      setCloudinaryStatusMessage(null);
      setCloudinaryProgress(0);

      // Simulate initial progress
      const progressInterval = setInterval(() => {
        setCloudinaryProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 500);

      // Upload to Cloudinary
      const secureUrl = await uploadToCloudinary(cloudinaryFile);

      // Clear interval and set to 100%
      clearInterval(progressInterval);
      setCloudinaryProgress(100);

      setCloudinaryUploadedUrl(secureUrl);
      setCloudinaryStatusMessage({
        type: 'success',
        text: 'Image uploaded successfully!'
      });

    } catch (error) {
      console.error('Error uploading file:', error);
      setCloudinaryStatusMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to upload file. Please try again.'
      });
    } finally {
      setCloudinaryUploading(false);
    }
  };

  if (createdProject) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold mb-2">Project Created Successfully! 🎉</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Project Name:</p>
              <p>{createdProject.name}</p>
            </div>
            {createdProject.description && (
              <div>
                <p className="font-medium">Description:</p>
                <p>{createdProject.description}</p>
              </div>
            )}
            {createdProject.website_url && (
              <div>
                <p className="font-medium">Website:</p>
                <a 
                  href={createdProject.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 break-all"
                >
                  {createdProject.website_url}
                </a>
              </div>
            )}
            <div>
              <p className="font-medium">Preview:</p>
              <img 
                src={createdProject.image_url}
                alt={createdProject.name}
                className="mt-2 max-w-md rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={resetForm}
            variant="outline"
          >
            Create Another Project
          </Button>
          <Button
            onClick={() => router.push('/')}
          >
            View All Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Project Upload Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Create New Project</h2>
        
        {/* Status Message */}
        {statusMessage && !createdProject && (
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

        {/* Project Details Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium mb-1">
              Project Name *
            </label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium mb-1">
              Project Description
            </label>
            <Textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Enter project description"
              className="w-full min-h-[100px]"
            />
          </div>

          <div>
            <label htmlFor="websiteUrl" className="block text-sm font-medium mb-1">
              Website URL
            </label>
            <Input
              id="websiteUrl"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://your-project-website.com"
              className="w-full"
            />
          </div>
        </div>

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
            Select Project Image
          </Button>
          {selectedFile && (
            <Button
              onClick={handleUpload}
              disabled={uploading || !projectName.trim()}
            >
              {uploading ? 'Uploading...' : 'Create Project'}
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
            <p className="text-sm font-medium mb-2">Image Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>

      <Separator className="my-8" />

      {/* Cloudinary-only Upload Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Quick Image Upload</h2>
        
        {/* Cloudinary Status Message */}
        {cloudinaryStatusMessage && (
          <div
            className={`p-4 rounded-md ${
              cloudinaryStatusMessage.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <p>{cloudinaryStatusMessage.text}</p>
            {cloudinaryUploadedUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium">Image URL:</p>
                <a 
                  href={cloudinaryUploadedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-800 break-all"
                >
                  {cloudinaryUploadedUrl}
                </a>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleCloudinaryFileChange}
            ref={cloudinaryFileInputRef}
            className="hidden"
          />
          <Button
            onClick={() => cloudinaryFileInputRef.current?.click()}
            variant="outline"
          >
            Select Image
          </Button>
          {cloudinaryFile && (
            <Button
              onClick={handleCloudinaryUpload}
              disabled={cloudinaryUploading}
            >
              {cloudinaryUploading ? 'Uploading...' : 'Upload to Cloudinary'}
            </Button>
          )}
        </div>

        {/* Cloudinary Upload Progress */}
        {(cloudinaryUploading || cloudinaryProgress > 0) && (
          <div className="space-y-2">
            <Progress value={cloudinaryProgress} className="w-full" />
            <p className="text-sm text-gray-500 text-center">{cloudinaryProgress}% Complete</p>
          </div>
        )}

        {cloudinaryPreviewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Image Preview:</p>
            <img
              src={cloudinaryPreviewUrl}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
} 