import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';

// Return a 404 for all requests in production
export async function GET() {
  return new NextResponse(null, { status: 404 });
}

export async function POST() {
  return new NextResponse(null, { status: 404 });
}

export async function POST(request: Request) {
  try {
    // Get file info from query params
    const { searchParams } = new URL(request.url);
    const fileType = searchParams.get('fileType');
    const fileName = searchParams.get('fileName');

    if (!fileType || !fileName) {
      return NextResponse.json(
        { error: 'File type and name are required' },
        { status: 400 }
      );
    }

    const s3Client = new S3Client({
      region: process.env.AWS_REGION || '',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });

    const fileExtension = fileName.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const presignedUrl = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 60 * 5, // URL expires in 5 minutes
    });

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({
      presignedUrl,
      publicUrl,
      key
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Error generating upload URL' },
      { status: 500 }
    );
  }
} 