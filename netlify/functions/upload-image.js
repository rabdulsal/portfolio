const cloudinary = require('cloudinary').v2;

// Validate environment variables
function validateEnvironmentVariables() {
  const required = {
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    'CLOUDINARY_API_KEY': process.env.CLOUDINARY_API_KEY,
    'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Validate environment variables first
    validateEnvironmentVariables();

    // Configure Cloudinary with validated credentials
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (!event.body) {
      throw new Error('No body provided');
    }

    const body = JSON.parse(event.body);
    if (!body.image) {
      throw new Error('No image provided in request body');
    }

    // Validate that the image is a base64 string
    if (!body.image.startsWith('data:image/')) {
      throw new Error('Invalid image format. Must be a base64 data URL');
    }
    
    // Log configuration (without sensitive data)
    console.log('Attempting upload with cloud_name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
    
    // Try a simpler upload first without folder
    try {
      const uploadResponse = await cloudinary.uploader.upload(body.image, {
        resource_type: 'auto'
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id
        })
      };
    } catch (uploadError) {
      console.error('Cloudinary Upload Error:', {
        message: uploadError.message,
        error: uploadError
      });
      throw uploadError;
    }

  } catch (error) {
    // Enhanced error logging
    console.error('Function Error:', {
      message: error.message,
      stack: error.stack,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set'
    });

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Failed to upload image',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 