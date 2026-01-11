import { createClient } from "@supabase/supabase-js";

export const useSupabaseAdmin = () => {
  const config = useRuntimeConfig();

  return createClient(config.public.api_base_url, config.api_service_role_key);
};
