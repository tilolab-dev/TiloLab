import { useCartStore } from "@/store/cart-store";

export const counterHandler = {
  onBlur(item: any) {
    if (!item.quantity || item.quantity < 1) item.quantity = 1;
    if (item.quantity > item.product.availableProduct) {
      item.quantity = item.product.availableProduct;
    }
    this.recalc(item);
  },
  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.recalc(item);
    }
  },
  increment(item: any) {
    if (item.quantity >= item.product.availableProduct) return;
    item.quantity++;
    this.recalc(item);
  },
  recalc(item: any) {
    const cartStore = useCartStore();

    const newPrice = item.quantity * item.productPrice;
    cartStore.updateProduct(item.product.id, item.quantity, newPrice);
  }
};
