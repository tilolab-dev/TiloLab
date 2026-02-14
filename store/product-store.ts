// import { defineStore } from "pinia";
// import type { IProduct } from "~/types/product";

// interface IProductResponce {
//   data: IProduct[];
//   message: string;
// }
// interface INewProductResponce {
//   statusCode: number;
//   message: string;
//   product: IProduct;
// }

// export const useProductStore = defineStore("product", {
//   state: () => ({
//     selectedProducts: null as IProduct[] | null,
//     productList: [] as IProduct[]
//   }),
//   actions: {
//     setSelectedProducts(products: IProduct[] | null) {
//       this.selectedProducts = products;

//       // console.log(this.selectedProducts, "from store");
//     },
//     async fetchProducts() {
//       try {
//         const resFetch = await $fetch<IProductResponce>("/api/products");

//         this.productList = resFetch.data || [];
//       } catch (error) {
//         console.log(error, "error");
//       }
//     },
//     async deleteProduct(productId: number | string) {
//       try {
//         const deleteReq = await $fetch(`/api/products/${productId}`, {
//           method: "DELETE"
//         });
//         if (deleteReq?.statusCode === 200) {
//           alert("Товар успішно видалено");
//         }
//         this.productList = this.productList.filter((p) => p.id !== <Number | String>productId);
//       } catch (error) {
//         console.log(error, "error");
//       }
//     },
//     async updateProduct(id: number, product: IProduct) {
//       // console.log(id, "id");
//       // console.log(product, "product");
//       try {
//         const updateReq = await $fetch(`/api/products/${id}`, {
//           method: "PATCH",
//           body: product
//         });
//         if (updateReq?.statusCode === 200) {
//           await this.fetchProducts();
//           alert("Товар успішно оновлено");
//         }
//       } catch (err) {
//         console.log(err, "error");
//       }
//     },
//     async addProduct(product: IProduct) {
//       try {
//         const addReq = await $fetch<INewProductResponce>("/api/products", {
//           method: "POST",
//           body: product
//         });

//         if (addReq.statusCode === 200) {
//           // this.productList.push(addReq.product);
//           await this.fetchProducts();
//           return addReq;
//         }

//         throw new Error(addReq.message);
//       } catch (err) {
//         console.log(err, "error");
//       }
//     }
//   }
// });

import { defineStore } from "pinia";
import type { IProduct } from "~/types/product";

interface IProductResponse {
  data: IProduct[];
  message: string;
  productTotal: number;
}

interface INewProductResponse {
  statusCode: number;
  message: string;
  product: IProduct;
}

export const useProductStore = defineStore("product", () => {
  const selectedProducts = ref<IProduct[] | null>(null);
  const productList = ref<IProduct[]>([]);

  const page = ref(1);
  const limit = ref(12);
  const total = ref(0);
  const loading = ref(false);
  const category = ref<string | null>(null);
  const priceRange = ref<{ min: number | null; max: number | null }>({ min: null, max: null });
  const prefetched = new Map<number, IProduct[]>();

  const hasMore = computed(() => productList.value.length < total.value);

  function setSelectedProducts(products: IProduct[] | null) {
    selectedProducts.value = products;
  }

  async function fetchProducts() {
    try {
      const resFetch = await $fetch<IProductResponse>("/api/products", {
        method: "GET",
        params: {
          getMethod: "all"
        }
      });
      productList.value = resFetch.data || [];
      console.log(!productList.value, "Products store fetchProducts productList is empty");
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProductsByPage({ reset = false } = {}) {
    if (loading.value) return;
    loading.value = true;

    if (reset) {
      productList.value = [];
      page.value = 1;
      prefetched.clear();
    }

    try {
      const params: Record<string, any> = {
        getMethod: "page",
        page: page.value,
        limit: limit.value,
        category: category.value
      };

      if (priceRange.value.min) {
        params.minPrice = priceRange.value.min;
      }
      if (priceRange.value.max) {
        params.maxPrice = priceRange.value.max;
      }

      const resFetch = await $fetch<IProductResponse>("/api/products", {
        method: "GET",
        params
      });

      console.log(resFetch, "Products store fetchProductsByPage resFetch from store");

      const newItems = resFetch.data || [];
      console.log(!newItems, "Products store fetchProductsByPage newItems is empty");
      productList.value.push(...newItems);
      total.value = resFetch.productTotal || 0;
      page.value++;

      prefetchNextPage();
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function prefetchNextPage() {
    const next = page.value;
    if (prefetched.has(next)) return;

    try {
      const params: Record<string, any> = {
        getMethod: "page",
        page: next,
        limit: limit.value,
        category: category.value
      };

      if (priceRange.value.min) {
        params.minPrice = priceRange.value.min;
      }
      if (priceRange.value.max) {
        params.maxPrice = priceRange.value.max;
      }

      const { data } = await $fetch<IProductResponse>("/api/products", {
        method: "GET",
        params
      });
      prefetched.set(next, data || []);
      console.log(!prefetched.get(next), "Products store prefetchNextPage prefetched is empty");
    } catch (err) {
      console.error("Prefetch error:", err);
    }
  }

  async function loadMore() {
    if (prefetched.has(page.value)) {
      productList.value.push(...prefetched.get(page.value)!);
      prefetched.delete(page.value);
      page.value++;
      prefetchNextPage();
    } else {
      await fetchProductsByPage();
    }
  }

  function setCategory(cat: string | null) {
    category.value = cat;
    fetchProductsByPage({ reset: true });
  }

  function setPriceRange(range: { min: number | null; max: number | null }) {
    priceRange.value = range;
    fetchProductsByPage({ reset: true });
  }

  function goToPage(p: number) {
    page.value = p;
    fetchProductsByPage({ reset: true });
  }
  async function deleteProduct(productId: number | string) {
    try {
      const deleteReq = await $fetch(`/api/products/${productId}`, {
        method: "DELETE"
      });

      if ((deleteReq as any)?.statusCode === 200) {
        alert("Товар успішно видалено");
        productList.value = productList.value.filter((p) => p.id !== productId);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProduct(id: number, product: IProduct) {
    try {
      const updateReq = await $fetch(`/api/products/${id}`, {
        method: "PATCH",
        body: product
      });

      if ((updateReq as any)?.statusCode === 200) {
        await fetchProducts();
        alert("Товар успішно оновлено");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function addProduct(product: IProduct) {
    try {
      const addReq = await $fetch<INewProductResponse>("/api/products", {
        method: "POST",
        body: product
      });

      if (addReq.statusCode === 200) {
        await fetchProducts();

        console.log(!addReq, " Products store addProduct addReq is empty");

        return addReq;
      }

      throw new Error(addReq.message);
    } catch (err) {
      console.error(err);
    }
  }
  return {
    productList,
    selectedProducts,
    page,
    limit,
    total,
    loading,
    hasMore,
    category,
    priceRange,
    setSelectedProducts,
    fetchProducts,
    fetchProductsByPage,
    loadMore,
    prefetchNextPage,
    deleteProduct,
    updateProduct,
    addProduct,
    setCategory,
    setPriceRange,
    goToPage
  };
});
