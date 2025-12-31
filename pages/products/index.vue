<template>
  <div class="products">
    <div class="container">
      <div class="button_items">
        <button @click="swiper.prev()">
          <AngleLeftIcon />
        </button>
        <button @click="swiper.next()">
          <AngleRightIcon />
        </button>
      </div>
      <div class="popular_cards">
        <ClientOnly>
          <swiper-container ref="containerPopular">
            <swiper-slide v-for="(product, i) in popularCards" :key="i">
              <ItemCard
                :product="product"
                :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
                class="card"
                @click="productStore.setSelectedProducts(product)"
              />
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// import { useI18n } from "vue-i18n";
// import ItemCard from "@/components/ItemCard.vue";
// import SkeletonItemCard from "~/components/SkeletonItemCard.vue";
// import ShadowBtn from "~/components/shared/ShadowBtn.vue";

// const fetchedAllProducts = ref([]);
// const showMoreBtn = ref(false);
// const categoryTitles = ref([]);
// const offset = ref(0);

// const { locale } = useI18n()

const popularCards = ref([]);
const containerPopular = ref(null);

const swiper = useSwiper(containerPopular, {
  effect: "creative",
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    480: {
      slidesPerView: 2
    },
    769: {
      slidesPerView: 2.5
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400]
    },
    next: {
      shadow: true,
      translate: [0, 0, -400]
    }
  }
});

// const loader = ref(false);

// const getOffsetProducts = async () => {
//   try {
//     const fetchProducts = await $fetch(`/api/category?category=all&offset=${offset.value}`);

//     fetchProducts.data.forEach((item) => {
//       // return item.products.length > 0
//       if (item.products.length > 0) {
//         // const categoryTitle = item.translations.find((t) => t.language === $i18n.locale).title;
//         const categoryTitle = item.translations.find((t) => t.language === locale.value)?.title;

//         console.log(categoryTitle, "categoryTitle");
//         if (!categoryTitles.value.includes(categoryTitle)) {
//           categoryTitles.value.push(categoryTitle);
//         }

//         fetchedAllProducts.value.push(item);
//       }
//     });

//     console.log(fetchProducts, "fetchProducts");

//     offset.value += 10;

//     fetchProducts.hasMore ? (showMoreBtn.value = true) : (showMoreBtn.value = false);

//     loader.value = true;

//     // if (fetchProducts.data.products.length > 0) {
//     //   fetchedAllProducts.value = fetchProducts.data.products;
//     // }
//   } catch (error) {
//     console.error("Error fetching data зкщв:", error);
//   }
// };

onMounted(async () => {
  // getOffsetProducts();

  try {
    const getProducts = await $fetch("/api/products");

    popularCards.value = getProducts.data;
    popularCards.value = [
      ...popularCards.value,
      ...popularCards.value,
      ...popularCards.value,
      ...popularCards.value
    ];
  } catch (err) {
    console.log(err);
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
