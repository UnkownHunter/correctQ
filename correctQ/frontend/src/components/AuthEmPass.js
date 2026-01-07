


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'SUPABASE_URL'
const supabaseKey = 'SUPABASE_KEY'
const supabase = createClient(supabaseUrl, supabaseKey);




let { data, error } = await supabase.auth.signInWithPassword({
  "email": 'akashsannala2@gmail.com',
  "password": 'akash2004'
});

const { data: { user } } = await supabase.auth.getUser()

console.log(user);
