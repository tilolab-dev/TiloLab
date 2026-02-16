<template>
  <div class="products">
    <div class="popular_cards">
      <div class="filter_category">
        <div class="filter">
          <DoubleRange
            v-if="priceRangeData"
            :min="priceRangeData.min"
            :max="priceRangeData.max"
            @range-change="handleRangeChange"
          />
        </div>
        <div class="category">
          <button @click="toggleCategory = !toggleCategory">
            Категорія
            <AngleDown />
          </button>

          <ul v-if="toggleCategory" class="categories_wrapper">
            <li>
              <NuxtLink to="/products?page=1&category"> Всі товари </NuxtLink>
            </li>
            <li v-for="(item, index) in indexStore.fetchedCategories" :key="index">
              <NuxtLink :to="`/products/${item.group.toLowerCase()}`">
                {{ item.translations[0].title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <ClientOnly v-if="loaderState">
        <div class="loader_cards">
          <div v-for="(card, i) in 6" :key="i" class="loader_cards_item">
            <SharedLoader />
          </div>
        </div>
      </ClientOnly>

      <div class="items_section">
        <template v-for="(group, categoryId) in groupedProducts" :key="categoryId">
          <h2 class="category-title">
            {{ group[0].category.translations?.[0]?.title || group[0].category.group }} &nbsp;:
          </h2>
          <div class="category-grid">
            <ItemCard
              v-for="product in group"
              :key="product.id"
              :product="product"
              :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
              class="card"
              @click="productStore.setSelectedProducts(product)"
            />
          </div>
        </template>
      </div>

      <div class="show_more_block">
        <div class="show_more_block_inner"></div>
        <button
          v-if="productStore.hasMore"
          class="show_more_block_inner"
          @click="productStore.loadMore"
        >
          Показати більше
          <AngleDown />
        </button>
        <div v-else class="show_more_block_inner"></div>
        <div class="pagination show_more_block_inner">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>
      <!-- <SharedSwiperSlider>
          <swiper-slide v-for="(product, i) in popularCards" :key="i">
            <ItemCard
              :product="product"
              :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
              class="card"
              @click="productStore.setSelectedProducts(product)"
            />
          </swiper-slide>
        </SharedSwiperSlider> -->
    </div>
  </div>
</template>

<script setup>
import AngleDown from "~/assets/icons/angle-down.svg";
import { onMounted, ref, watch } from "vue";
import { useProductStore } from "@/store/product-store";
import { useIndexStore } from "@/store/index-store";
const loaderState = ref(true);

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const indexStore = useIndexStore();
const toggleCategory = ref(false);
const priceRangeData = ref(null);

const handleRangeChange = (range) => {
  productStore.setPriceRange(range);
};

const fetchPriceRange = async () => {
  try {
    const response = await $fetch("/api/price-range");
    if (response && response.statusCode === 200 && response.data) {
      // Validate the response data structure
      const { min, max } = response.data;
      if (
        typeof min === "number" &&
        typeof max === "number" &&
        min >= 0 &&
        max >= 0 &&
        min <= max
      ) {
        priceRangeData.value = { min, max };
      } else {
        // Set fallback values to prevent component errors
        priceRangeData.value = { min: 100, max: 10000 };
      }
    } else {
      console.error("Invalid API response (main page):", response);
      priceRangeData.value = { min: 100, max: 10000 };
    }
  } catch (error) {
    console.error("Failed to fetch price range (main page):", error);
    // Set fallback values to prevent component errors
    priceRangeData.value = { min: 100, max: 10000 };
  }
};

const groupedProducts = computed(() => {
  const map = {};
  productStore.productList.forEach((product) => {
    if (!map[product.categoryId]) map[product.categoryId] = [];
    map[product.categoryId].push(product);
  });
  return map;
});

onMounted(async () => {
  loaderState.value = true;

  // Fetch price range first
  await fetchPriceRange();

  // productStore.page = Number(route.query.page ?? 1);
  // productStore.category = route.query.category ?? null;
  const routeCategory = route.query.category ?? null;
  const routePage = Number(route.query.page ?? 1);

  const needReset = productStore.category !== routeCategory || productStore.page !== routePage;

  // if (!productStore.productList.length) {
  //   await productStore.fetchProductsByPage({ reset: true });
  // }

  if (needReset) {
    productStore.category = routeCategory;
    productStore.page = routePage;
    await productStore.fetchProductsByPage({ reset: true });
  }

  // const scroll = sessionStorage.getItem('catalogScroll')
  // if (scroll) nextTick(() => window.scrollTo(0, Number(scroll)))
  // try {
  //   const getProducts = await $fetch("/api/products");

  //   popularCards.value = getProducts?.data;
  // } catch (err) {
  //   console.error("Failed to fetch popular products:", err);
  // }
  loaderState.value = false;
});

// onBeforeRouteLeave(() => {
//   sessionStorage.setItem('catalogScroll', window.scrollY.toString())
// })

watch([() => productStore.page, () => productStore.category], () => {
  router.replace({ query: { page: productStore.page, category: productStore.category } });
});

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;
.products {
  margin-bottom: 80px;

  .filter_category {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 40px 0 36px;
    color: white;

    .filter {
      @media screen and (max-width: 768px) {
        flex: 1;
      }
      @media screen and (max-width: 480px) {
        width: 100%;
        .double_range {
          width: 100%;
        }
      }
    }

    .category {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 500;
      position: relative;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        cursor: pointer;

        svg {
          width: 20px;
          height: 20px;
          stroke: var(--text-color);
        }
      }
      .arrow_icon {
        transition: all ease 0.3s;
      }

      .active_icon {
        transition: all ease 0.3s;
        transform: rotate(180deg);
        fill: var(--accent-color);
      }

      // @media screen and (max-width: 768px) {
      //   flex: 1;
      // }

      @media screen and (max-width: 480px) {
        width: 100%;
        justify-content: flex-end;
      }
    }

    .categories_wrapper {
      position: absolute;
      width: fit-content;
      height: auto;
      padding: 20px;
      background-color: var(--bg-color);
      z-index: 21;
      top: 50px;
      right: 0;

      li {
        white-space: nowrap;
        color: var(--accent-color);
        padding-block: 5px;
      }
    }
    @media screen and (max-width: 1024px) {
      padding: 40px 0 40px;
    }

    @media screen and (max-width: 768px) {
      padding: 32px 0 32px;
      gap: 50px;
    }

    @media screen and (max-width: 480px) {
      padding: 32px 0 48px;
      flex-direction: column;
      gap: 0;
    }
    @media screen and (max-width: 375px) {
      padding: 23px 0 17px;
    }
  }

  .loader_cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    &_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 40dvh;
      background: rgb(29, 27, 29);
    }
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .items_section {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media screen and (max-width: 768px) {
      gap: 28px;
    }
    @media screen and (max-width: 480px) {
      gap: 24px;
    }
    @media screen and (max-width: 375px) {
      gap: 20px;
    }
  }

  .category-title {
    @include mixins.titleText;
    color: var(--text-color);
    font-weight: 600;
    margin-bottom: 8px;
    @media screen and (max-width: 1024px) {
      margin-bottom: 0;
    }
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px 20px;
    width: 100%;
    // height: auto;
    height: -webkit-fill-available;

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px;
    }

    @media screen and (max-width: 768px) {
      gap: 32px 20px;
    }
    @media screen and (max-width: 480px) {
      gap: 20px 12px;
    }
    @media screen and (max-width: 375px) {
      gap: 15px 8px;
    }
  }

  .show_more_block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 70px;
    gap: 20px;

    &_inner {
      flex: 1;
    }

    button {
      @include mixins.transparentBtn;
      @include mixins.mainText;
      display: flex;
      justify-content: center;
      align-items: center;
      white-space: nowrap;
      text-transform: uppercase;
      color: var(--border-color);
      gap: 4px;

      svg {
        padding: 3px;
        width: 20px;
        height: 20px;
        stroke: var(--border-color);
      }
    }
    .pagination {
      color: transparent;
    }

    @media screen and (max-width: 1024px) {
      margin-bottom: 80px;
    }
    @media screen and (max-width: 768px) {
      margin-bottom: 70px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 60px;
    }
    @media screen and (max-width: 375px) {
      margin-bottom: 48px;
    }
  }
}
</style>
