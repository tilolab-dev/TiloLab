import { useUserStore } from "@/store/user-store";
import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/user")) return;

  const userStore = useUserStore();
  const supabase = useSupabaseClient();
  const auth = useAuth();

  if (!userStore.user) {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (session) {
      await auth.fetchOrCreateUser();
    }
  }

  if (!userStore.isLoggedIn) {
    return navigateTo("/auth/login");
  }
});
