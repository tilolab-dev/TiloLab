import { useUserStore } from "@/store/user-store";
import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/user")) return;

  const userStore = useUserStore();
  const auth = useAuth();
  const supabase = useSupabaseClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session && process.client) {
    return navigateTo("/auth/login");
  }

  if (!userStore.user && session) {
    await auth.fetchOrCreateUser();
  }

  if (!userStore.isLoggedIn && process.client) {
    return navigateTo("/auth/login");
  }
});
