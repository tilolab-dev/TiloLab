import { createClient } from "@supabase/supabase-js";

const config = useRuntimeConfig();
const supabaseUrl = config.public.api_base_url;
const supabaseKey = config.api_secret_key;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
