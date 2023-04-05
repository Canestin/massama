import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

const supabaseUrl = "https://nrmxjtbclefxfyuxbhji.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybXhqdGJjbGVmeGZ5dXhiaGppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3NDM2NjgsImV4cCI6MTk5NDMxOTY2OH0.Vkdhou6voJHRMwp_ScZ5RQPYqAswoonTBTQyXLsBMW8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
