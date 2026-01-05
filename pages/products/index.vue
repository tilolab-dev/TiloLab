<template>
  <div class="products">
    <div class="container">
      <div class="popular_cards">
        <SharedSwiperSlider>
          <swiper-slide v-for="(product, i) in popularCards" :key="i">
            <ItemCard
              :product="product"
              :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
              class="card"
              @click="productStore.setSelectedProducts(product)"
            />
          </swiper-slide>
        </SharedSwiperSlider>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const popularCards = ref([]);

onMounted(async () => {
  try {
    const getProducts = await $fetch("/api/products");

    popularCards.value = getProducts?.data;
  } catch (err) {
    console.error("Failed to fetch popular products:", err);
  }
});

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss" scoped>
.products {
  margin-bottom: 80px;
}
</style>
