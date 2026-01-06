import { defineStore } from "pinia";
import type { IProduct } from "~/types/product";

interface IProductResponce {
  data: IProduct[];
  message: string;
}

export const useProductStore = defineStore("product", {
  state: () => ({
    selectedProducts: null as IProduct[] | null,
    productList: [] as IProduct[]
  }),
  actions: {
    setSelectedProducts(products: IProduct[] | null) {
      this.selectedProducts = products;

      console.log(this.selectedProducts, "from store");
    },
    async fetchProducts() {
      try {
        const resFetch = await $fetch<IProductResponce>("/api/products");

        this.productList = resFetch.data || [];
      } catch (error) {
        console.log(error, "error");
      }
    },
    async deleteProduct(productId: number | string) {
      try {
        const deleteReq = await $fetch(`/api/products/${productId}`, {
          method: "DELETE"
        });
        if (deleteReq?.statusCode === 200) {
          alert("Товар успішно видалено");
        }
        this.productList = this.productList.filter((p) => p.id !== <Number | String>productId);
      } catch (error) {
        console.log(error, "error");
      }
    }
  }
});
