const cloudinary = require('cloudinary').v2;

// Validate required environment variables
function validateCloudinaryConfig() {
  const required = {
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    'CLOUDINARY_API_KEY': process.env.CLOUDINARY_API_KEY,
    'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required Cloudinary environment variables: ${missing.join(', ')}`);
  }
}

// Get configured Cloudinary instance
function getCloudinaryConfig() {
  // Validate environment variables first
  validateCloudinaryConfig();

  // Configure and return Cloudinary instance
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  return cloudinary;
}

module.exports = {
  getCloudinaryConfig,
  validateCloudinaryConfig
}; 