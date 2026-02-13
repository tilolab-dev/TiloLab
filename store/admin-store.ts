import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin-store", {
  state: () => ({
    adminRole: null as string | null,
    user: null as {} | null,
    token: null as string | null,
    senderData: null as [] | null,
    notifications: [] as any | null
  }),
  getters: {
    hasUnread: (state) => state.notifications.some((n: any) => !n.isReaded)
  },

  actions: {
    setAdminRole(role: string, token?: string) {
      this.adminRole = role;
      if (token) this.token = token;
    },
    async clearAdminRole() {
      try {
        const adminLogout = await $fetch<{ statusCode: number; statusMessage: string }>(
          "/api/auth?auth=admin_logout",
          {
            method: "POST"
          }
        );
        this.token = null;
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
    async getSenderData() {
      try {
        const getSendersRes = $fetch("/api/np/get-senders", {
          method: "GET"
        });

        console.log(getSendersRes);
      } catch (err) {
        console.log(err);
      }
    },
    async getNotes() {
      try {
        const getNotificationsRes = await $fetch("/api/admin/notifications/get-notifications", {
          method: "GET"
        });

        if (!getNotificationsRes) {
          console.log("Немаэ новий повідомлень");
          return;
        }

        this.notifications = getNotificationsRes.data ?? [];
      } catch (err) {
        console.error(err);
      }
    },
    async updateNoteStatus(id: string | number) {
      try {
        const changeStatusRes = await $fetch<any>("/api/admin/notifications/new-status", {
          method: "PATCH",
          body: {
            noteId: id
          }
        });

        if (changeStatusRes.statusCode !== 200) {
          console.error(changeStatusRes.message);
        }

        // console.log(changeStatusRes.data);

        const note = this.notifications.find((el: any) => el.id === changeStatusRes.data.id);

        if (note) {
          note.isReaded = changeStatusRes.data.isReaded;
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteNote(id: string | number) {
      try {
        const deleteNoteRes = await $fetch<any>("/api/admin/notifications/delete-note", {
          method: "DELETE",
          body: {
            noteId: id
          }
        });

        console.log(deleteNoteRes, "delete res");

        if (deleteNoteRes.statusCode !== 200) {
          console.log("Something went wrong during deleting note");
        }

        this.notifications = this.notifications.filter((el: any) => el.id !== id);
      } catch (err) {
        console.error(err);
      }
    },
    setUser(user: any) {
      if (!user) {
        return;
      }
      this.user = user;
    }
    // async fetchUser() {
    //   try {
    //     const response: any = await $fetch("/api/auth?auth=me", {
    //       method: "GET",
    //       credentials: "include"
    //     });

    //     if (!response) {
    //       this.user = null;
    //       return;
    //     }

    //     this.user = response.user;
    //   } catch (error) {
    //     console.log(error);
    //     this.user = null;
    //   }
    // },

    // async refreshToken() {
    //   try {
    //     await $fetch("/api/auth?auth=refresh", {
    //       method: "POST",
    //       credentials: "include"
    //     });
    //     await this.fetchUser();
    //   } catch {
    //     this.user = null;
    //   }
    // },

    // async logout() {
    //   const logout = await $fetch("/api/auth?auth=logout", {
    //     method: "POST",
    //     credentials: "include"
    //   });

    //   console.log(logout);

    //   this.user = null;
    // }
  }
});
