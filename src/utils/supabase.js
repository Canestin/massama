import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABSE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
