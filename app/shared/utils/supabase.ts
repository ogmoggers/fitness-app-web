import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NUXT_PUBLIC_SUPABASE_KEY;

const supabaseUrl = "https://zdkknlnbalcjaxsqxbvn.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpka2tubG5iYWxjamF4c3F4YnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNjk1ODgsImV4cCI6MjA4MTY0NTU4OH0.tkM07_SB6EwHEWSFH_L3UdhvPxiov_ns9vMFN2JKud8"

export const supabase = createClient(supabaseUrl!, supabaseKey!);
