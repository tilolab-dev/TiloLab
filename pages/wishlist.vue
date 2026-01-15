<template>
  <div class="wishlist">
    <div class="page_title">
      <h1>Ваш список бажань</h1>
    </div>

    <template v-if="wishlistProducts?.length">
      <ul class="product_wrapper">
        <li v-for="product in wishlistProducts" :key="product.id">
          <WishlistItemCard
            :product="product"
            :link="`/products/${categoryName}/${product.id}`"
            @set-product="productStore.setSelectedProducts(product)"
          />
        </li>
      </ul>
    </template>

    <div v-else class="empty_wishlist">
      <h2>Список бажань порожній</h2>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "@/store/product-store";
import { useWishlistStore } from "@/store/wishlist-store";

import WishlistItemCard from "@/components/WishlistItemCard.vue";

const productStore = useProductStore();
const wishlistStore = useWishlistStore();

const wishlistProducts = computed(() => wishlistStore.wishlist);

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.wishlist {
  padding: 20px 0 150px;
  position: relative;
}

.page_title {
  h1 {
    margin-bottom: 40px;
    @include mixins.titleText;
  }
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
