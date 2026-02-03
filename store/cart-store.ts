import { defineStore } from "pinia";
import type { IProduct } from "@/types/product";

interface ICartItem {
  product: IProduct;
  quantity: number;
  productTotalPrice: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as ICartItem[],
    totalPrice: 0
  }),

  getters: {},
  actions: {
    addProduct(product: IProduct, quantity: number, productTotalPrice: number) {
      const item = this.cart.find((el) => el.product.id === product.id);
      if (item) {
        item.quantity += quantity;
        item.productTotalPrice += productTotalPrice;
      } else {
        this.cart.push({
          product,
          quantity,
          productTotalPrice
        });
      }
      this.totalPrice = this.cart.reduce(
        (acc: number, item: ICartItem) => acc + item.productTotalPrice,
        0
      );
      // const totalCents = this.cart.reduce((acc, item) => acc + item.productTotalPrice, 0);
      // this.totalPrice = totalCents / 100;
      this.saveCart();
    },
    removeProduct(productId: number) {
      // this.cart = [];

      // productId: number
      // console.log(this.cart, "1");

      this.cart = this.cart.filter((item: any) => item.product.id !== productId);

      // console.log(this.cart, "2");
      this.totalPrice = this.cart.reduce(
        (acc: number, item: ICartItem) => acc + +item.product.productPrice * item.quantity,
        0
      );
      this.saveCart();
    },
    updateProduct(productId: number, newQuantity: number, newPrice: number) {
      const foundProduct: any = this.cart.find((item: any) => item.product.id === productId);

      foundProduct.productTotalPrice = newPrice;

      this.totalPrice = this.cart.reduce(
        (acc: number, item: ICartItem) => acc + +item.product.productPrice * item.quantity,
        0
      );

      this.saveCart();
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
    }
  }
});
