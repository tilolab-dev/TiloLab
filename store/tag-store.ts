import { defineStore } from "pinia";
import type { ITag } from "~/types/tag";

interface IFetchTag {
  data: ITag[];
}

export const useTagStore = defineStore("tag", {
  state: () => ({
    tagList: [] as ITag[]
  }),
  actions: {
    async createNewTag(data: ITag) {
      try {
        const response = await $fetch("/api/tag", {
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
            tagImg: data.tagImg
          }
        });

        this.getTags();
        return response;
      } catch (err) {
        alert("Помилка при додаванні категорії");
        console.log(err);
      }
    },
    async getTags() {
      try {
        const getTags = await $fetch<IFetchTag>("/api/tag");
        this.tagList = getTags.data;

        // this.tagList = getCategories.data.sort((a, b) => a.listPosition - b.listPosition);
      } catch (err) {
        console.error("Something went wrong", err);
      }
    }
  }
});
