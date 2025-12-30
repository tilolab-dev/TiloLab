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
    <div v-if="fetchedProducts.length === 0" class="loader_wrapper">
      <Loader />
      Завантаження
    </div>
    <ul v-else class="product_wrapper">
      <li v-for="product in fetchedProducts" :key="product.id">
        <ItemCard
          :link="`/products/${categoryName}/${product.id}`"
          :product="product"
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
import ItemCard from "@/components/ItemCard.vue";
import Loader from "@/components/shared/Loader.vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import DoubleRange from "@/components/DoubleRange.vue";

const fetchedProducts = ref([]);
const categoryName = ref("");

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
  h1 {
    color: white;
    font-weight: 700;
    font-size: 2rem;
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
</style>
