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
    const { file, upload_preset } = body;

    if (!file || !upload_preset) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'File and upload preset are required' })
      };
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      upload_preset,
      resource_type: 'auto'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: result
      })
    };

  } catch (err) {
    console.error('Upload Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload file' })
    };
  }
}; 