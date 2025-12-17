import { useCartStore } from "@/store/cart-store";

export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.client) {
        const cartStore = useCartStore();
        cartStore.loadProducts();
    }
})