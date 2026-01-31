import { defineStore } from "pinia";
// import type { User } from "@prisma/client";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>(null);

  const isLoggedIn = computed(() => !!user.value && user.value.role !== "guest");

  const setUser = (u: any) => {
    user.value = u;
  };
  const clearUser = () => {
    user.value = null;
  };

  return { user, isLoggedIn, setUser, clearUser };
});
