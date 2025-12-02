import { defineStore } from "pinia";

export const useProductStore = defineStore('product', {
    state: () => ({
        selectedProducts: null,
    }),
    actions: {
        setSelectedProducts(products: any) {
            this.selectedProducts = products;

            console.log(this.selectedProducts);
        },
    },
})