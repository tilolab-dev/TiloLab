import { useCartStore } from "@/store/cart-store";

export default defineNuxtPlugin(() => {
  // console.log(nuxtApp);
  if (import.meta.client) {
    const cartStore = useCartStore();
    cartStore.loadProducts();
  }
});
