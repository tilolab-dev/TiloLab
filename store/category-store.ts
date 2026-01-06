import { defineStore } from "pinia";
import type { ICategory } from "~/types/category";

interface IFetchCategory {
  data: ICategory[];
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categoryList: [] as ICategory[]
  }),
  actions: {
    async getCategories() {
      try {
        const getCategories = await $fetch<IFetchCategory>("/api/category");

        this.categoryList = getCategories.data;

        // console.log(this.categories, "getCategories");

        // if (getCategories.data.length > 0) {
        //   this.categories = getCategories.data.map((item) => ({
        //     ...item,
        //     language: item.translations.find((translation) => translation.language === "uk")
        //   }));
        // }
      } catch (err) {
        console.error("Something went wrong", err);
      }
    }
  }
});
