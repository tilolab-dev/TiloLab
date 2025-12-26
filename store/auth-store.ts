import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as {} | null
  }),

  actions: {
    setUser(user: any) {
      if (!user) {
        return;
      }
      this.user = user;
    },
    async fetchUser() {
      try {
        const response: any = await $fetch("/api/auth?auth=me", {
          method: "GET",
          credentials: "include"
        });

        if (!response) {
          this.user = null;
          return;
        }

        this.user = response.user;
      } catch (error) {
        console.log(error);
        this.user = null;
      }
    },

    async refreshToken() {
      try {
        await $fetch("/api/auth?auth=refresh", {
          method: "POST",
          credentials: "include"
        });
        await this.fetchUser();
      } catch {
        this.user = null;
      }
    },

    async logout() {
      const logout = await $fetch("/api/auth?auth=logout", {
        method: "POST",
        credentials: "include"
      });

      console.log(logout);

      this.user = null;
    }
  }
});
