import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin-store", {
  state: () => ({
    adminRole: null as string | null,
    user: null as {} | null,
    token: null as string | null,
    senderData: null as [] | null,
    notifications: [] as any | null,
    promotedList: [] as any,
    popularList: [] as any
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
    async getPopularList() {
      try {
        const getPopularRes = await $fetch<any>("/api/admin/promoted/popular/get-list", {
          method: "GET"
        });

        console.log(getPopularRes);

        this.popularList = getPopularRes.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updatePopularItem(id: string | number) {
      try {
        const updatePopularRes = await $fetch("/api/admin/promoted/popular/patch-list", {
          method: "PATCH",
          body: {
            productId: id
          }
        });

        console.log(updatePopularRes);

        this.popularList.push(updatePopularRes.data);
      } catch (err) {
        console.error(err);
      }
    },
    async deletePopularItem(id: string | number) {
      try {
        const deleteItemRes = await $fetch<any>("/api/admin/promoted/popular/delete-item", {
          method: "DELETE",
          body: {
            productId: id
          }
        });

        console.log(deleteItemRes);

        this.popularList = this.popularList.filter((el: any) => el.id !== deleteItemRes.data.id);
      } catch (err) {
        console.error(err);
      }
    },
    async getPromotedList() {
      try {
        const getPromotedRes = await $fetch<any>("/api/admin/promoted/promo/get-list", {
          method: "GET"
        });

        console.log(getPromotedRes);

        this.promotedList = getPromotedRes.data;
      } catch (err) {
        console.error(err);
      }
    },
    async updatePromoItem(id: string | number) {
      try {
        const updatePromoRes = await $fetch("/api/admin/promoted/promo/patch-list", {
          method: "PATCH",
          body: {
            productId: id
          }
        });

        console.log(updatePromoRes);

        this.promotedList.push(updatePromoRes.data);
      } catch (err) {
        console.error(err);
      }
    },
    async deletePromoItem(id: string | number) {
      try {
        console.log(id, "id from store");
        const deleteItemRes = await $fetch<any>("/api/admin/promoted/promo/delete-item", {
          method: "DELETE",
          body: {
            productId: id
          }
        });

        console.log(deleteItemRes);

        this.promotedList = this.promotedList.filter((el: any) => el.id !== deleteItemRes.data.id);
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
  }
});
