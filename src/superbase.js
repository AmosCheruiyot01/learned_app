
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ypsvmwmwprhsghcunlyy.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwc3Ztd213cHJoc2doY3VubHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0MDA5MzYsImV4cCI6MjAwMTk3NjkzNn0.cjmeQbAD61yq5IVA4Ye1aOaRIT-O2y7SurBrcnL4_Ss";

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;