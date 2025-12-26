<template>ololo</template>

<script setup>
import { onMounted, ref } from "vue";

// import { useI18n } from "vue-i18n";
// import ItemCard from "@/components/ItemCard.vue";
// import SkeletonItemCard from "~/components/SkeletonItemCard.vue";
// import ShadowBtn from "~/components/shared/ShadowBtn.vue";

const fetchedAllProducts = ref([]);
const showMoreBtn = ref(false);
const categoryTitles = ref([]);
const offset = ref(0);

// const { locale } = useI18n()

const loader = ref(false);

const getOffsetProducts = async () => {
  try {
    const fetchProducts = await $fetch(`/api/category?category=all&offset=${offset.value}`);

    fetchProducts.data.forEach((item) => {
      // return item.products.length > 0
      if (item.products.length > 0) {
        // const categoryTitle = item.translations.find((t) => t.language === $i18n.locale).title;
        const categoryTitle = item.translations.find((t) => t.language === locale.value)?.title;

        console.log(categoryTitle, "categoryTitle");
        if (!categoryTitles.value.includes(categoryTitle)) {
          categoryTitles.value.push(categoryTitle);
        }

        fetchedAllProducts.value.push(item);
      }
    });

    console.log(fetchProducts, "fetchProducts");

    offset.value += 10;

    fetchProducts.hasMore ? (showMoreBtn.value = true) : (showMoreBtn.value = false);

    loader.value = true;

    // if (fetchProducts.data.products.length > 0) {
    //   fetchedAllProducts.value = fetchProducts.data.products;
    // }
  } catch (error) {
    console.error("Error fetching data зкщв:", error);
  }
};

onMounted(() => {
  getOffsetProducts();

  // console.log(fetchedAllProducts.value, "fetchedAllProducts");

  // console.log(fetchedAllProducts.value, 'fetchedAllProducts')
});

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss" scoped></style>
