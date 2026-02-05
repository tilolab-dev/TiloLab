import { defineStore } from "pinia";
// import type { User } from "@prisma/client";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>(null);
  const usersList = ref([]);

  const isLoggedIn = computed(() => !!user.value && user.value.role !== "guest");

  const setUser = (u: any) => {
    user.value = u;
  };
  const clearUser = () => {
    user.value = null;
  };
  const getUsers = async () => {
    try {
      const res = await $fetch<any>("/api/users/get-users", {
        method: "GET"
      });

      usersList.value = res.data;
    } catch (err) {
      console.error(err);
    }
  };

  return { user, usersList, isLoggedIn, setUser, clearUser, getUsers };
});
