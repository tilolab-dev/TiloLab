import { useIndexStore } from "@/store/index-store";

export default defineNuxtPlugin(async () => {
  const store = useIndexStore();

  const categories = await $fetch("/api/category");
  if (categories) {
    store.setFetchedCategories(categories);
  }
});
