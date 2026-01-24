import { useAuthStore } from "../store/auth-store";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();
  const cookieRole = useCookie<string | null>("role").value;

  if (!auth.adminRole && cookieRole) {
    auth.setAdminRole(cookieRole);
  }

  const role = auth.adminRole;

  if (to.path.startsWith("/admin") && to.path !== "/admin/login" && role !== "admin") {
    return navigateTo("/admin/login");
  }
});
