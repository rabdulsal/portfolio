'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ContentUploader from '@/components/custom/ContentUploader';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function ContentUploaderClient() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if not in development
    if (process.env.NODE_ENV === 'production') {
      router.push('/');
    }
  }, [router]);

  // Show nothing while checking environment/redirecting
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Image 
                src={`https://res.cloudinary.com/${cloudName}/image/upload/v1744870439/qy3rpcppyfp6cs4nwv52.png`}
                alt="Logo"
                width={32}
                height={32}
                className="rounded-sm"
              />
            </Link>
            <h1 className="text-3xl font-bold">Content Uploader</h1>
          </div>

          <ContentUploader />
        </div>
      </div>
    </main>
  );
} 