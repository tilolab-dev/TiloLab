<template>
  <div class="product_page_popular">
    <div ref="containerRef">
      <div class="popular_head">
        <div class="head_content">
          <h5 class="left_content">вам також може сподобатись</h5>
        </div>
      </div>

      <div class="popular_cards">
        <SharedSwiperSlider>
          <swiper-slide v-for="(product, i) in popularCards" :key="i" class="card">
            <ItemCard
              :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
              :product="product"
              @click="productStore.setSelectedProducts(product)"
            />
          </swiper-slide>
        </SharedSwiperSlider>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/store/product-store";

const popularCards = ref([]);

const productStore = useProductStore();

onMounted(async () => {
  try {
    await productStore.fetchProducts();
    popularCards.value = productStore.productList;
  } catch (err) {
    console.log(err);
  }
});
</script>

<style lang="scss" scoped>
.product_page_popular {
  overflow: hidden;
  padding-block: 109px;
  max-width: 100%;

  @media screen and (max-width: 1024px) {
    padding-block: 64px;
  }

  @media screen and (max-width: 768px) {
    padding-block: 52px;
  }

  @media screen and (max-width: 480px) {
    padding-block: 48px;
  }

  @media screen and (max-width: 375px) {
    padding-block: 44px;
  }
}

.popular_cards {
  overflow: hidden;
  margin-top: 32px;

  @media screen and (max-width: 1024px) {
    margin-top: 36px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }
  @media screen and (max-width: 480px) {
    margin-top: 24px;
  }
}

.categories_head {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.head_title,
.left_content {
  color: var(--text-color);
  font-family: "Montserrat", sans-serif;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.6px;
  text-transform: uppercase;

  @media screen and (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 375px) {
    font-size: 1.125rem;
  }
}

.right_content {
  @media screen and (max-width: 480px) {
    width: 100%;
    br {
      display: none;
    }
  }
}

.head_title {
  font-style: italic;
}

.popular_description {
  color: var(--text-color);
  text-align: right;
  font-family: "Montserrat", sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.36px;
  @media screen and (max-width: 1024px) {
    font-size: 1.0625rem;
  }
  @media screen and (max-width: 768px) {
    text-align: left;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 375px) {
    font-size: 0.75rem;
  }
}

.head_content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
}

.card {
  color: white;
  font-size: 24px;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .card_title {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: var(--text-color);
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
}
</style>
