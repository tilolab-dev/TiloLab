import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event: any) => {
  const supabase = await serverSupabaseClient(event);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return;

  event.context.user = {
    id: user.id,
    email: user.email
  };
});
