const { createClient } = require('@supabase/supabase-js');

const getSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

module.exports = {
  getSupabaseClient
}; 