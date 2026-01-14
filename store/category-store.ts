import { defineStore } from "pinia";
import type { ICategory } from "~/types/category";

interface IFetchCategory {
  data: ICategory[];
}

interface ICategoryResult {
  statusCode: number;
  message: string;
  data: ICategory[] | ICategory | null;
}

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categoryList: [] as ICategory[]
  }),
  actions: {
    async createNewCategory(data: ICategory) {
      try {
        const response = await $fetch("/api/category", {
          method: "POST",
          body: {
            group: data.group,
            visible: data.visible,
            translations: [
              {
                language: "uk",
                title: data.translations?.[0]?.title ?? "",
                description: data.translations?.[0]?.description ?? ""
              }
            ],
            categoryImg: data.categoryImg
          }
        });

        this.getCategories();
        return response;
      } catch (err) {
        alert("Помилка при додаванні категорії");
        console.log(err);
      }
    },
    async getCategories() {
      try {
        const getCategories = await $fetch<IFetchCategory>("/api/category");
        this.categoryList = getCategories.data;
      } catch (err) {
        console.error("Something went wrong", err);
      }
    },
    async deleteCategory(category: ICategory) {
      const id = category.id;

      await $fetch("/api/upload", {
        method: "DELETE",
        body: {
          itemId: category.id,
          itemUrl: category.categoryImg,
          methodType: "categoryImg"
        }
      });

      const deleteCategoryRes = await $fetch<ICategoryResult>(`/api/category/${id}`, {
        method: "DELETE"
      });

      if (deleteCategoryRes.statusCode === 200) {
        this.categoryList = this.categoryList.filter((c) => c.id !== id);
        alert("Категорія успішно видалена");
      }
    },
    async updateCategory(id: number, data: ICategory) {
      try {
        const updateCategory = await $fetch<ICategoryResult>(`/api/category/${id}`, {
          method: "PATCH",
          body: data
        });

        if (updateCategory.statusCode === 200) {
          alert("Категорія успішно оновлена");

          this.getCategories();
        }

        return updateCategory;
      } catch (err) {
        alert("Помилка при оновленні категорії");
        console.log(err);
      }
    }
  }
});
