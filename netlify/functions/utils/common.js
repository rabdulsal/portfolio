// Common CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// Common error response
function createErrorResponse(error, statusCode = 500) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify({ 
      error: error.message || 'An error occurred',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  };
}

// Common success response
function createSuccessResponse(data) {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(data)
  };
}

// Validate HTTP method
function validateMethod(event, allowedMethod = 'POST') {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders
    };
  }

  if (event.httpMethod !== allowedMethod) {
    return createErrorResponse(
      new Error('Method not allowed'),
      405
    );
  }

  return null;
}

// Parse and validate request body
function parseRequestBody(event) {
  if (!event.body) {
    throw new Error('No body provided');
  }
  return JSON.parse(event.body);
}

module.exports = {
  corsHeaders,
  createErrorResponse,
  createSuccessResponse,
  validateMethod,
  parseRequestBody
}; 