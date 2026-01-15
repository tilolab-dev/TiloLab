<template>
  <div class="category_product_wrapper">
    <div class="filter_category">
      <div class="filter">
        <DoubleRange />
      </div>
      <div class="category">
        <button @click="toggleCategory = !toggleCategory">
          Категорія
          <SvgIcon
            name="arrow-down"
            size="micro"
            class="arrow_icon"
            :class="toggleCategory ? 'active_icon' : ''"
          />
        </button>

        <ul v-if="toggleCategory" class="categories_wrapper">
          <li>
            <NuxtLink to="/products"> Всі товари </NuxtLink>
          </li>
          <li v-for="(item, index) in indexStore.fetchedCategories" :key="index">
            <NuxtLink :to="`/products/${item.group.toLowerCase()}`">
              {{ item.translations[0].title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="page_title">
      <h1>
        {{ currentCategory.translations[0].title }}
      </h1>
    </div>

    <ClientOnly v-if="loaderState">
      <div class="loader_cards">
        <div v-for="(card, i) in 6" :key="i" class="loader_cards_item">
          <SharedLoader />
        </div>
      </div>
    </ClientOnly>

    <div v-else-if="productStore.productList.length === 0" class="empty_data_layout">
      <h3>В цій категорії поки ще немае товарів...</h3>
    </div>

    <div v-else class="items_section">
      <div v-for="product in productStore.productList" :key="product.id">
        <ItemCard
          :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
          :product="product"
          @set-product="productStore.setSelectedProducts(product)"
        />
      </div>
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

    <!-- <div v-if="fetchedProducts.length > 0" class="categories_footer">
      <ShowMoreBtn :link="`/products/${categoryName}`">
        Переглянути всі
        <AngleDown />
      </ShowMoreBtn>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div> -->
  </div>
</template>

<script setup>
// Component imports
import AngleDown from "~/assets/icons/angle-down.svg";
// import ItemCard from "@/components/ItemCard.vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import DoubleRange from "@/components/DoubleRange.vue";
// import ShowMoreBtn from "@/components/shared/ShowMoreBtn.vue";
// import Pagination from "@/components/shared/Pagination.vue";

// Store imports
import { useIndexStore } from "@/store/index-store";
import { useProductStore } from "@/store/product-store";

// Utility imports
import { ref, onMounted, computed } from "vue";

// const fetchedProducts = ref([]);
// const categoryName = ref("");
// const currentPage = ref(1);
// const totalPages = ref(12); // Mock total pages for demonstration
const loaderState = ref(false);

const route = useRoute();
const indexStore = useIndexStore();
const productStore = useProductStore();
const toggleCategory = ref(false);

const currentCategory = computed(() => {
  if (!indexStore.fetchedCategories.length) return null;

  // console.log(indexStore.fetchedCategories, "indexStore.fetchedCategories");
  // console.log(route.params.categoryId, "route.params.category");

  return indexStore.fetchedCategories.find(
    (cat) => cat.group.toLowerCase() === route.params.categoryId?.toLowerCase()
  );
});

watch([currentCategory, () => indexStore.fetchedCategories.length], async ([cat]) => {
  if (!cat) return;

  productStore.category = cat.id;
  productStore.page = 1;

  await productStore.fetchProductsByPage({ reset: true });
});

// const route = useRoute();

// const categoryId = route.params.categoryId;

// const fetchCategories = computed(() => indexStore.fetchedCategories);

// categoryName.value = categoryId;

// const currentCategory = computed(() => {
//   return indexStore.fetchedCategories.find(
//     (cat) => cat.group.toLowerCase() === categoryId.toLowerCase()
//   );
// });

onMounted(async () => {
  loaderState.value = true;

  if (currentCategory.value) {
    productStore.category = currentCategory.value.id;
    productStore.page = 1;
    await productStore.fetchProductsByPage({ reset: true });
  }

  loaderState.value = false;
});

// onMounted(async () => {
// loaderState.value = true;
// productStore.category = categoryId;
// productStore.page = 1;

// console.log(categoryName.value, "category name");
// console.log(categoryId, "categoryId");
// // const categoryId = currentCategory.value.id;

// try {
//   // const getProductsByCategory = await $fetch(`/api/category?categoryId=${categoryId}`);

//   // fetchedProducts.value = getProductsByCategory.data;
//   // console.log(getProductsByCategory);

//   await productStore.fetchProductsByPage({ reset: true });
// } catch (err) {
//   console.log(err);
// }

// console.log(productStore.productList, "product list");

// // console.log(fetchedProducts.value);
// loaderState.value = false;

//   loaderState.value = true;

//   console.log(productStore.productList, "product list");

//   loaderState.value = false;
// });

// const handlePageChange = (page) => {
//   currentPage.value = page;
//   // In a real implementation, this would trigger an API call
//   console.log("Page changed to:", page);
// };

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.category_product_wrapper {
  padding: 20px 0 150px;
  position: relative;
}

.page_title {
  text-transform: uppercase;
  // margin-bottom: 40px;
  h1 {
    @include mixins.titleText;
    color: var(--text-color);
    font-weight: 600;
    margin-bottom: 40px;
    @media screen and (max-width: 1024px) {
      margin-bottom: 32;
    }
    @media screen and (max-width: 768px) {
      margin-bottom: 28px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
    }
    @media screen and (max-width: 375px) {
      margin-bottom: 20px;
    }
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
    height: 30dvh;
    background: rgb(29, 27, 29);
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.empty_data_layout {
  width: 100%;
  height: 50dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  @include mixins.subtitleText;
}
.items_section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 20px;
  width: 100%;
  height: auto;

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

.categories_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 70px;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 32px;
  }

  .show-more-link {
    flex: 1;
    justify-content: center;
  }

  .pagination {
    flex-grow: 0;
    justify-content: flex-end;
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
</style>
