<template>
  <section class="cart-section">
    <div class="container">
      <h2 class="heading">
        <!-- {{ $t("cart.title") }} -->
        Кошик
      </h2>
      <p class="description">
        <!-- {{ $t("cart.description") }} -->
        Ваш кошик - зручне місце для вибору та оформлення покупок. Ми цінуємо ваш час та прагнемо
        зробити процес максимально простим та комфортним.
      </p>

      <div class="layout">
        <div class="products-column">
          <div class="products-list">
            <div v-if="cartProducts?.length === 0" class="empty-cart">
              <h2 class="empty-title">Нажаль в кошику ще немає товарів!</h2>
              <NuxtLink to="/products" class="btn btn-outline go-back-btn">
                Перейти до продуктів
              </NuxtLink>
            </div>

            <div v-for="(product, productIndex) in 6" :key="productIndex" class="card-wrapper">
              <div class="inner_card">
                <!-- <ItemCard /> -->
              </div>
            </div>
          </div>
        </div>

        <aside class="summary-column">
          <div class="summary-panel">
            <p class="summary-title">
              <!-- {{ $t("cart.summary.title") }} -->
              Підсумок замовлення
            </p>

            <div class="summary-body">
              <div class="summary-row">
                <dt class="muted">
                  <!-- {{ $t("cart.summary.full-price") }} -->
                  Повна ціна
                </dt>
                <dd class="muted-value">₴ 0</dd>
              </div>

              <div class="summary-row">
                <dt class="muted">
                  <!-- {{ $t("cart.summary.discount") }} -->
                  Знижка
                </dt>
                <dd class="discount-value">-₴ 0</dd>
              </div>

              <div class="summary-total">
                <dt class="total-label">
                  <!-- {{ $t("cart.summary.total") }} -->
                  Всього
                </dt>
                <dd class="total-value">₴ {{ totalPrice }}</dd>
              </div>
            </div>

            <NuxtLink class="btn btn-primary process-order" @click="goToCheckout">
              <!-- {{ $t("cart.summary.place-order") }} -->
              Оформити замовлення
            </NuxtLink>

            <div class="summary-actions">
              <NuxtLink to="/products" class="btn btn-dark">
                <!-- {{ $t("cart.summary.go-back") }} -->
                Повернутись в Магазин
                <svg
                  class="icon-arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </aside>
      </div>

      <div class="also-buy">
        <h3 class="also-buy-title">Also buy</h3>
        <div class="cards-grid">
          <div v-for="(product, productIndex) in 3" :key="productIndex" class="card-wrapper">
            <div class="inner_card">
              <!-- <ItemCard /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
//   import Tooltips from "~/components/shared/Tooltips.vue";
//   import Swiper from "swiper";

// import { useCartStore } from "@/store/cart-store";

// const cartStore = useCartStore();
const router = useRouter();

const cartProducts = ref([]);
const totalPrice = ref(0);

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
    tooltipStatus.value = "";
    tooltipMessage.value = "";
  }, 3000);
};

// const removeProduct = (product) => {
//   cartStore.removeProduct(product);
//   cartProducts.value = cartStore.cart;
//   totalPrice.value = cartProducts.value.reduce((acc, product) => acc + product.totalPrice, 0);
// };

const goToCheckout = (event) => {
  if (!cartProducts.value.length) {
    event.preventDefault();
    tooltip({
      status: "error",
      message: "Ваш кошик порожній"
    });
    console.log("path to checkout forbidden");
  } else {
    router.push("/checkout");
  }
};

// const updateQuantity = (operator, product) => {
//   const newQuantity =
//     operator === "+"
//       ? product.quantityProducts + product.counterQuantity
//       : product.quantityProducts - product.counterQuantity;

//   const newPrice = (product.totalPrice = countTotalPrice({
//     price: product.price,
//     totalProduct: newQuantity
//   }));

//   cartStore.updateProduct(product, newPrice, newQuantity);
//   totalPrice.value = cartProducts.value.reduce((acc, product) => acc + product.totalPrice, 0);
// };

onMounted(() => {
  // cartProducts.value = cartStore.cart;
  // totalPrice.value = cartProducts.value.reduce((acc, product) => acc + product.totalPrice, 0);
  // console.log(cartProducts.value)
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

/* filepath: /Users/dmitrijnasyrkulov/WORK/SIDE/TILOLAB/pages/cart/index.vue (styles) */

.cart-section {
  font-family:
    "Montserrat",
    system-ui,
    -apple-system,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial;
  padding: 2rem 0;
  color: var(--dark-color);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}

.heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text-color);
}

.description {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* columns */
.products-column {
  flex: 1 1 65%;
  min-width: 300px;
}

.summary-column {
  flex: 0 0 320px;
  min-width: 260px;
}

/* product list */
.products-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-cart {
  text-align: center;
  padding: 32px 16px;
}

.empty-title {
  color: #b91c1c;
  font-weight: 700;
  margin-bottom: 10px;
}

/* product card */
.product-card {
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.product-row {
  display: flex;
  gap: 16px;
  align-items: center;
}

.product-thumb img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.product-info {
  flex: 1 1 auto;
  min-width: 180px;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.product-desc {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.9rem;
}

/* controls */
.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: 220px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.quantity-input {
  width: 48px;
  text-align: center;
  border: none;
  background: transparent;
  font-weight: 600;
}

.quantity-meta {
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.quantity-label {
  font-size: 0.8rem;
  color: var(--dark-color);
}

.package-label {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  justify-content: flex-end;
}

.price {
  font-weight: 700;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  color: #111827;
  cursor: pointer;
  text-decoration: none;
}

.btn-square {
  width: 32px;
  height: 32px;
  padding: 0;
}

.btn-primary {
  @include mixins.cardShadow;
  background: var(--primary-color, #1d4ed8);
  color: #fff;
  border: none;
}

.btn-outline {
  background: transparent;
  border: 1px solid #e5e7eb;
  color: inherit;
}

.btn-danger {
  background: #ef4444;
  color: #fff;
  border: none;
}

.btn-dark {
  @include mixins.transparentBtn;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  // background: var(--dark-color, #111827);
  // color: #fff;
  // border: none;
}

/* also buy grid */
.also-buy {
  margin-top: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* summary */
.summary-panel {
  border: 1px solid var(--border-color);
  padding: 16px;
  background: var(--bg-color);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  color: var(--text-color);
}

.summary-title {
  font-weight: 700;
  margin-bottom: 8px;
}

.summary-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  color: var(--text-color);
}

.discount-value {
  color: #059669;
  font-weight: 600;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e7eb;
  padding-top: 8px;
  margin-top: 8px;
  font-weight: 700;
}

.process-order {
  display: block;
  margin-top: 12px;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  text-decoration: none;
}

.summary-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.icon-arrow {
  width: 18px;
  height: 18px;
  color: currentColor;
}

/* responsive */
@media (max-width: 900px) {
  .layout {
    flex-direction: column;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .summary-column {
    order: 2;
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .product-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.also-buy-title {
  color: var(--text-color);
}

/* reuse mixins for specific buttons */
.go-back-btn {
  @include mixins.transparentBtn;
}

.process-order {
  @include mixins.accentBtn;
  cursor: pointer;
}
</style>
