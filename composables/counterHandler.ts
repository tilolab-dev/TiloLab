import { useCartStore } from "@/store/cart-store";

export const counterHandler = {
  onBlur(item: any) {
    if (!item.quantity || item.quantity < 1) item.quantity = 1;
    this.recalc(item);
  },
  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.recalc(item);
    }
  },
  increment(item: any) {
    item.quantity++;
    this.recalc(item);
  },
  recalc(item: any) {
    const cartStore = useCartStore();

    const newPrice = item.quantity * Number(item.product.productPrice);
    cartStore.updateProduct(item.product.id, item.quantity, newPrice);
  }
};
