import { useAdminStore } from "../store/admin-store";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAdminStore();
  const cookieRole = useCookie<string | null>("role").value;

  if (!auth.adminRole && cookieRole) {
    auth.setAdminRole(cookieRole);
  }

  const role = auth.adminRole;

  if (to.path.startsWith("/admin") && to.path !== "/admin/login" && role !== "admin") {
    return navigateTo("/admin/login");
  }
});
