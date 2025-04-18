const { getCloudinaryConfig } = require('./utils/cloudinary');

// Validate image data
function validateImageData(imageData) {
  if (!imageData) {
    throw new Error('No image provided in request body');
  }
  if (!imageData.startsWith('data:image/')) {
    throw new Error('Invalid image format. Must be a base64 data URL');
  }
}

// Handle CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse and validate request body
    if (!event.body) {
      throw new Error('No body provided');
    }

    const { image } = JSON.parse(event.body);
    validateImageData(image);

    // Get configured Cloudinary instance
    const cloudinary = getCloudinaryConfig();
    
    // Upload image
    const uploadResponse = await cloudinary.uploader.upload(image, {
      resource_type: 'auto'
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id
      })
    };

  } catch (error) {
    console.error('Upload Image Error:', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: error.message || 'Failed to upload image',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 