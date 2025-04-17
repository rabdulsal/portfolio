const { createClient } = require('@supabase/supabase-js');

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
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and email are required' })
      };
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { name, email, message: message || 'No message provided' }
      ])
      .select();

    if (error) {
      console.error('Supabase Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to submit form' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: data[0]
      })
    };

  } catch (err) {
    console.error('Function Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};