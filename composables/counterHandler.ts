// import { useCartStore } from "@/store/cart-store";

// export const counterHandler = {
//   onBlur(item: any) {
//     if (!item.quantity || item.quantity < 1) item.quantity = 1;
//     if (item.quantity > item.product.availableProduct) {
//       item.quantity = item.product.availableProduct;
//     }
//     this.recalc(item);
//   },
//   decrement(item: any) {
//     if (item.quantity > 1) {
//       item.quantity--;
//       this.recalc(item);
//     }
//   },
//   increment(item: any) {
//     if (item.quantity >= item.product.availableProduct) return;
//     item.quantity++;
//     this.recalc(item);
//   },
//   recalc(item: any) {
//     const cartStore = useCartStore();

//     const newPrice = item.quantity * item.productPrice;
//     cartStore.updateProduct(item.product.id, item.quantity, newPrice);
//   }
// };

import { useCartStore } from "@/store/cart-store";

export const counterHandler = {
  getAvailable(item: any) {
    if (item.optionId && item.option) {
      return item.option.optionStock - (item.option.optionReserved || 0);
    }

    return item.product.availableProduct;
  },

  onBlur(item: any) {
    const available = this.getAvailable(item);

    if (!item.quantity || item.quantity < 1) {
      item.quantity = 1;
    }

    if (item.quantity > available) {
      item.quantity = available;
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
    const available = this.getAvailable(item);

    if (item.quantity >= available) return;

    item.quantity++;
    this.recalc(item);
  },

  recalc(item: any) {
    const cartStore = useCartStore();

    const newTotalPrice = item.quantity * item.productPrice;

    cartStore.updateProduct(
      item.product.id,
      item.optionId, // 👈 ВАЖНО
      item.quantity
    );

    item.productTotalPrice = newTotalPrice;
  }
};
