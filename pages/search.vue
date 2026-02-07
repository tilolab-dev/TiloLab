<template>
  <div class="search-page">
    <div class="search-header">
      <h1 class="search-title">
        Результати пошуку для: <span class="search-term">"{{ searchTerm }}"</span>
      </h1>
      <p v-if="!loading" class="results-count">Знайдено {{ searchResults.length }} товарів</p>
    </div>

    <div v-if="loading" class="loader-section">
      <div class="loader_cards">
        <div v-for="(card, i) in 6" :key="i" class="loader_cards_item">
          <SharedLoader />
        </div>
      </div>
    </div>

    <div v-else-if="searchResults.length === 0" class="no-results">
      <p>На жаль, за вашим запитом нічого не знайдено</p>
      <NuxtLink to="/products" class="back-to-products"> Повернутися до всіх товарів </NuxtLink>
    </div>

    <div v-else class="search-results">
      <div class="popular_cards">
        <div class="items_section">
          <div class="category-grid">
            <ItemCard
              v-for="product in searchResults"
              :key="product.id"
              :product="product"
              :link="`/products/${product.category.group.toLowerCase()}/${product.id}`"
              class="card"
              @click="productStore.setSelectedProducts(product)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useProductStore } from "@/store/product-store";

const route = useRoute();
const productStore = useProductStore();

const searchTerm = ref("");
const searchResults = ref([]);
const loading = ref(true);

const performSearch = async (query) => {
  if (!query || !query.trim()) {
    searchResults.value = [];
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const response = await $fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
    searchResults.value = response.data || [];
  } catch (error) {
    console.error("Search failed:", error);
    searchResults.value = [];
  }
  loading.value = false;
};

onMounted(async () => {
  searchTerm.value = route.query.q || "";
  await performSearch(searchTerm.value);
});

watch(
  () => route.query.q,
  async (newQuery) => {
    searchTerm.value = newQuery || "";
    await performSearch(searchTerm.value);
  }
);

definePageMeta({
  layout: "search"
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.search-page {
  margin-bottom: 80px;
}

.search-header {
  padding: 40px 0;
  text-align: center;
}

.search-title {
  @include mixins.titleText;
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 16px;

  .search-term {
    color: var(--accent-color);
  }
}

.results-count {
  @include mixins.mainText;
  color: var(--border-color);
  font-size: 1rem;
}

.loader-section {
  padding: 40px 0;
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

.no-results {
  text-align: center;
  padding: 60px 0;

  p {
    @include mixins.mainText;
    color: var(--text-color);
    font-size: 1.2rem;
    margin-bottom: 24px;
  }

  .back-to-products {
    @include mixins.transparentBtn;
    @include mixins.mainText;
    color: var(--accent-color);
    text-decoration: none;
    padding: 12px 24px;
    border: 1px solid var(--accent-color);
    border-radius: 4px;
    transition: all ease 0.3s;

    &:hover {
      background: var(--accent-color);
      color: white;
    }
  }
}

.search-results {
  .popular_cards {
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

    .category-grid {
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
  }
}

@media screen and (max-width: 768px) {
  .search-page {
    margin-bottom: 70px;
  }

  .search-header {
    padding: 32px 0;
  }
}

@media screen and (max-width: 480px) {
  .search-page {
    margin-bottom: 60px;
  }

  .search-header {
    padding: 24px 0;
  }

  .search-title {
    font-size: 1.5rem;
  }
}
</style>
