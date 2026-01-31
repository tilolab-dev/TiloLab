// import { useCartStore } from "@/store/cart-store";

// export const counterHandler = () => {
//   const cartStore = useCartStore();

//   const onBLur = (item: any) => {
//     if (!item.quantity || item.quantity < 1) {
//       item.quantity = 1;
//     }
//     recalc(item);
//   };

//   const decrement = (item: any) => {
//     if (item.quantity > 1) {
//       item.quantity--;
//       recalc(item);
//     }
//   };

//   const increment = (item: any) => {
//     item.quantity++;
//     recalc(item);
//   };

//   const recalc = (item: any) => {
//     const newPrice = item.quantity * Number(item.product.productPrice);
//     cartStore.updateProduct(item.product.id, item.quantity, newPrice);
//   };

//   return {
//     onBLur,
//     decrement,
//     increment,
//     recalc
//   };
// };

import { useCartStore } from "@/store/cart-store";

const cartStore = useCartStore();

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
    const newPrice = item.quantity * Number(item.product.productPrice);
    cartStore.updateProduct(item.product.id, item.quantity, newPrice);
  }
};
