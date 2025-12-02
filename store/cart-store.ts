import { defineStore } from "pinia";

interface IProduct {
    price: string;
    quantity: string
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as any,
    totalPrice: 0,
  }),

  getters: {},
  actions: {
    addProduct(product: any) {
        
      this.cart.push(product);
      this.totalPrice = this.cart.reduce(
        (acc: number, product: any) => acc + product.totalPrice,
        0
      );
      this.saveCart();
    },
    removeProduct(product: any) {
      this.cart = this.cart.filter((item: any) => item.id !== product.id);
      this.totalPrice = this.cart.reduce(
        (acc: number, product: any) => acc + product.totalPrice,
        0
      );
      this.saveCart();
    },
    updateProduct(product: any, newPrice: number, newQuantity: number) {
      const foundProduct: any = this.cart.find((item: any) => item.id === product.id);

      if (foundProduct) {
        (foundProduct.totalPrice = newPrice),
          (foundProduct.quantityProducts = newQuantity);

        this.totalPrice = this.cart.reduce(
          (acc: number, product: any) => acc + product.totalPrice,
          0
        );

        this.saveCart();
      }
    },
    clearCart() {
      this.cart = [];
      this.totalPrice = 0;
      this.saveCart();
    },
    loadProducts() {
      if (import.meta.client) {
        const savedCart = localStorage.getItem("cart");
        const getTotalPrice = localStorage.getItem("totalPrice");
        if (savedCart) {
          this.cart = JSON.parse(savedCart);
        }
        if (getTotalPrice) {
          this.totalPrice = JSON.parse(getTotalPrice);
        }
      }
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      localStorage.setItem("totalPrice", JSON.stringify(this.totalPrice));
    },
  },
});
