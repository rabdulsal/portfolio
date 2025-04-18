const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

// Ensure the dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Build configuration
const buildConfig = {
  entryPoints: [
    path.join(__dirname, 'upload-image.js'),
    path.join(__dirname, 'upload.js'),
    path.join(__dirname, 'presigned-url.js'),
    path.join(__dirname, 'submit-form.js')
  ],
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node14',
  outdir: distDir,
  external: ['aws-sdk'], // Exclude AWS SDK as it's provided by Netlify
  treeShaking: true,
  sourcemap: process.env.NODE_ENV === 'development',
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'production'}"`
  }
};

// Run the build
esbuild.build(buildConfig)
  .then(() => {
    console.log('Functions built successfully!');
  })
  .catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
  }); 