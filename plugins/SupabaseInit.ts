// import supabase from "@utils/supabase";
import { useIndexStore } from "@/store/index-store";

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log(nuxtApp);
  const store = useIndexStore();

  const categories = await $fetch("/api/category");
  if (categories) {
    store.setFetchedCategories(categories);
  }
});
