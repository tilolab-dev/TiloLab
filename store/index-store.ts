import { defineStore } from 'pinia';


export const useIndexStore = defineStore('index', {
    state: () => ({
        adminBurgerBtn: false,
        fetchedCategories: [],
    }),
    actions: {
        setAdminBurgerBtn() {
            this.adminBurgerBtn = !this.adminBurgerBtn
        },
        setFetchedCategories(categories: any) {
            this.fetchedCategories = categories.data
        }
    },
});