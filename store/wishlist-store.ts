import { defineStore } from "pinia";
import type { IProduct } from "~/types/product";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: [] as IProduct[]
  }),
  actions: {
    addProduct(product: IProduct) {
      this.wishlist.push(product);
      this.saveWishlist();
    },
    removeProduct(product: IProduct) {
      this.wishlist = this.wishlist.filter((item: IProduct) => item.id !== product.id);
      this.saveWishlist();
    },
    clearWishlist() {
      this.wishlist = [];
      this.saveWishlist();
    },
    loadProducts() {
      if (import.meta.client) {
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          this.wishlist = JSON.parse(savedWishlist);
        }
      }
    },
    saveWishlist() {
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    }
  }
});
