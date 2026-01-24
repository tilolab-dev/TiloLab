import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    adminRole: null as string | null,
    user: null as {} | null
  }),

  actions: {
    setAdminRole(role: string) {
      this.adminRole = role;
    },
    async clearAdminRole() {
      try {
        const adminLogout = await $fetch<{ statusCode: number; statusMessage: string }>(
          "/api/auth?auth=admin_logout",
          {
            method: "POST"
          }
        );

        if (adminLogout.statusCode === 200) {
          this.adminRole = null;
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
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
