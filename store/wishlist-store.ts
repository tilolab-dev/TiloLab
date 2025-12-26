import { defineStore } from "pinia";

// interface IWishlist {
//   price: string;
//   quantity: string;
// }

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    wishlist: [] as any
  }),
  actions: {
    addProduct(product: any) {
      this.wishlist.push(product);
      this.saveWishlist();
    },
    removeProduct(product: any) {
      this.wishlist = this.wishlist.filter((item: any) => item.id !== product.id);
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
