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
          <li>Для неї</li>
          <li>Для нього</li>
          <li>Для пар</li>
          <li>Інтимний догляд</li>
          <li>Анальний секс</li>
          <li>Фалоімітатори</li>
          <li>Прелюдія</li>
          <li>БДСМ</li>
          <li>Косметика</li>
        </ul>
      </div>
    </div>

    <div class="page_title">
      <h1>
        {{ currentCategory.translations[0].title }}
      </h1>
    </div>

    <SharedLoader v-if="fetchedProducts.length === 0" />

    <ul v-else class="product_wrapper">
      <li v-for="product in fetchedProducts" :key="product.id">
        <ItemCard
          :link="`/products/${categoryName}/${product.id}`"
          :product="product"
          @set-product="productStore.setSelectedProducts(product)"
        />
      </li>
    </ul>

    <div v-if="fetchedProducts.length > 0" class="categories_footer">
      <ShowMoreBtn :link="`/products/${categoryName}`">
        Переглянути всі
        <AngleDownIcon />
      </ShowMoreBtn>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
// Component imports
import AngleDownIcon from "~/assets/icons/angle-down.svg";
import ItemCard from "@/components/ItemCard.vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import DoubleRange from "@/components/DoubleRange.vue";
import ShowMoreBtn from "@/components/shared/ShowMoreBtn.vue";
import Pagination from "@/components/shared/Pagination.vue";

// Store imports
import { useIndexStore } from "@/store/index-store";
import { useProductStore } from "@/store/product-store";

// Utility imports
import { ref, onMounted, computed } from "vue";

const fetchedProducts = ref([]);
const categoryName = ref("");
const currentPage = ref(1);
const totalPages = ref(12); // Mock total pages for demonstration

const indexStore = useIndexStore();
const productStore = useProductStore();

const route = useRoute();

const categoryId = route.params.categoryId;

const toggleCategory = ref(false);

categoryName.value = categoryId;

const currentCategory = computed(() => {
  return indexStore.fetchedCategories.find(
    (cat) => cat.group.toLowerCase() === categoryId.toLowerCase()
  );
});

onMounted(async () => {
  const categoryId = currentCategory.value.id;

  try {
    const getProductsByCategory = await $fetch(`/api/category?categoryId=${categoryId}`);

    fetchedProducts.value = getProductsByCategory.data;
  } catch (err) {
    console.log(err);
  }
});

const handlePageChange = (page) => {
  currentPage.value = page;
  // In a real implementation, this would trigger an API call
  console.log("Page changed to:", page);
};

definePageMeta({
  layout: "products"
});
</script>

<style lang="scss">
.category_product_wrapper {
  padding: 20px 0 150px;
  position: relative;
}

.page_title {
  text-transform: uppercase;
  h1 {
    color: white;
    font-weight: 700;
    font-size: 2rem;
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

.filter_category {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 1rem;
  color: white;

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
    }
    .arrow_icon {
      transition: all ease 0.3s;
    }

    .active_icon {
      transition: all ease 0.3s;
      transform: rotate(180deg);
      fill: var(--accent-color);
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
</style>
