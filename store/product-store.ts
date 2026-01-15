import { defineStore } from "pinia";
import type { IProduct } from "~/types/product";

interface IProductResponce {
  data: IProduct[];
  message: string;
}
interface INewProductResponce {
  statusCode: number;
  message: string;
  product: IProduct;
}

export const useProductStore = defineStore("product", {
  state: () => ({
    selectedProducts: null as IProduct[] | null,
    productList: [] as IProduct[]
  }),
  actions: {
    setSelectedProducts(products: IProduct[] | null) {
      this.selectedProducts = products;

      // console.log(this.selectedProducts, "from store");
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
    },
    async updateProduct(id: number, product: IProduct) {
      // console.log(id, "id");
      // console.log(product, "product");
      try {
        const updateReq = await $fetch(`/api/products/${id}`, {
          method: "PATCH",
          body: product
        });
        if (updateReq?.statusCode === 200) {
          await this.fetchProducts();
          alert("Товар успішно оновлено");
        }
      } catch (err) {
        console.log(err, "error");
      }
    },
    async addProduct(product: IProduct) {
      try {
        const addReq = await $fetch<INewProductResponce>("/api/products", {
          method: "POST",
          body: product
        });

        if (addReq.statusCode === 200) {
          // this.productList.push(addReq.product);
          await this.fetchProducts();
          return addReq;
        }

        throw new Error(addReq.message);
      } catch (err) {
        console.log(err, "error");
      }
    }
  }
});
