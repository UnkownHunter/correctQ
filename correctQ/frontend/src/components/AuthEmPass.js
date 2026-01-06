


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://qstzefplnfnqhcsojzjq.supabase.co'
const supabaseKey = 'sb_publishable_BEpbl8tDYOkJnZ51-kyzPw_G8HUx5It'
const supabase = createClient(supabaseUrl, supabaseKey);




let { data, error } = await supabase.auth.signInWithPassword({
  "email": 'akashsannala2@gmail.com',
  "password": 'akash2004'
});

const { data: { user } } = await supabase.auth.getUser()


console.log(user);
