const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { upload_preset } = body;

    if (!upload_preset) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Upload preset is required' })
      };
    }

    // Generate upload signature
    const timestamp = Math.round((new Date).getTime()/1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset },
      process.env.CLOUDINARY_API_SECRET
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: {
          signature,
          timestamp,
          api_key: process.env.CLOUDINARY_API_KEY
        }
      })
    };

  } catch (err) {
    console.error('Presigned URL Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate presigned URL' })
    };
  }
}; 