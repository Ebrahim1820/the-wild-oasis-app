import { createClient } from "@supabase/supabase-js";
//

export const supabaseUrl = "https://gdlndlvdysmalupvefox.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkbG5kbHZkeXNtYWx1cHZlZm94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwOTMzNDcsImV4cCI6MjAxODY2OTM0N30.i5BEbfZNLXSkKGVjzm5c2LTBMnGGB5yyTW63ivbyBwg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
