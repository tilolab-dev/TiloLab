import { defineStore } from "pinia";
import type { IProduct } from "@/types/product";

interface ICartItem {
  product: IProduct;
  optionId: number | null;
  option?: any;
  title: string;
  quantity: number;
  productPrice: number;
  productTotalPrice: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as ICartItem[],
    totalPrice: 0
  }),

  getters: {},
  actions: {
    // addProduct(product: IProduct, quantity: number, productTotalPrice: number) {
    //   const item = this.cart.find((el) => el.product.id === product.id);
    //   if (item) {
    //     item.quantity += quantity;
    //     item.productTotalPrice += productTotalPrice;
    //   } else {
    //     this.cart.push({
    //       product,
    //       quantity,
    //       productPrice: productTotalPrice / quantity,
    //       productTotalPrice
    //     });
    //   }
    //   this.totalPrice = this.cart.reduce(
    //     (acc: number, item: ICartItem) => acc + item.productTotalPrice,
    //     0
    //   );
    //   this.saveCart();
    // },
    addProduct(product: IProduct, quantity: number, productTotalPrice: number, option: any = null) {
      const item = this.cart.find(
        (el) => el.product.id === product.id && el.optionId === (option?.id || null)
      );

      if (item) {
        item.quantity += quantity;
        item.productTotalPrice += productTotalPrice;
      } else {
        const title = option
          ? `${product.translations?.[0]?.title || ""} (${option.translations[0].optionInfo})`
          : product.translations?.[0]?.title || "";

        this.cart.push({
          product,
          optionId: option?.id || null,
          option,
          title,
          quantity,
          productPrice: productTotalPrice / quantity,
          productTotalPrice
        });
      }

      this.totalPrice = this.cart.reduce(
        (acc: number, item: ICartItem) => acc + item.productTotalPrice,
        0
      );

      this.saveCart();
    },

    // removeProduct(productId: number) {
    //   console.log(productId, "id");
    //   // this.cart = [];

    //   // productId: number
    //   // console.log(this.cart, "1");

    //   this.cart = this.cart.filter((item: any) => item.product.id !== productId);

    //   // console.log(this.cart, "2");
    //   this.totalPrice = this.cart.reduce(
    //     (acc: number, item: ICartItem) => acc + +item.productPrice * item.quantity,
    //     0
    //   );
    //   this.saveCart();
    // },

    removeProduct(productId: number, optionId: number | null) {
      this.cart = this.cart.filter(
        (item) => !(item.product.id === productId && item.optionId === optionId)
      );

      this.totalPrice = this.cart.reduce((acc, item) => acc + item.productTotalPrice, 0);

      this.saveCart();
    },
    // updateProduct(productId: number, newQuantity: number, newPrice: number) {
    //   const foundProduct: any = this.cart.find((item: any) => item.product.id === productId);

    //   foundProduct.productTotalPrice = newPrice;

    //   this.totalPrice = this.cart.reduce(
    //     (acc: number, item: ICartItem) => acc + +item.productPrice * item.quantity,
    //     0
    //   );

    //   this.saveCart();
    // },

    updateProduct(productId: number, optionId: number | null, newQuantity: number) {
      const item = this.cart.find((el) => el.product.id === productId && el.optionId === optionId);

      if (!item) return;

      item.quantity = newQuantity;
      item.productTotalPrice = item.productPrice * newQuantity;

      this.totalPrice = this.cart.reduce((acc, item) => acc + item.productTotalPrice, 0);

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
