<template>
  <div class="wishlist">
    <div class="page_title">
      <h1>Ваш список бажань</h1>
    </div>
    <div v-if="fetchedProducts.length === 0" class="loader_wrapper">
      <Loader />
      Завантаження
    </div>
    <ul v-else class="product_wrapper">
      <li v-for="product in fetchedProducts" :key="product.id">
        <WishlistItemCard
          :product="product"
          :link="`/products/${categoryName}/${product.id}`"
          @set-product="productStore.setSelectedProducts(product)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useIndexStore } from "@/store/index-store";
import { useProductStore } from "@/store/product-store";
import { ref } from "vue";
import WishlistItemCard from "@/components/WishlistItemCard.vue";
import Loader from "@/components/shared/Loader.vue";

const fetchedProducts = ref([]);
const categoryName = ref("");

const indexStore = useIndexStore();
const productStore = useProductStore();

const route = useRoute();

const categoryId = route.params.categoryId || "dlya-neyi";

categoryName.value = categoryId;

const currentCategory = computed(() => {
  return indexStore.fetchedCategories.find(
    (cat) => cat.group?.toLowerCase() === categoryId?.toLowerCase()
  );
});

onMounted(async () => {
  const categoryId = currentCategory?.value?.id || "dlya-neyi";

  try {
    const getProductsByCategory = await $fetch(`/api/category?categoryId=${categoryId}`);

    fetchedProducts.value = getProductsByCategory.data;
  } catch (err) {
    console.log(err);
  }
});

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss">
.wishlist {
  padding: 20px 0 150px;
  position: relative;
}

.page_title {
  h1 {
    color: white;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 40px;
  }
}

.loader_wrapper {
  position: absolute;
  width: 100%;
  height: -webkit-fill-available;
  transform: translateY(50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;
}
.product_wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  gap: 1rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
