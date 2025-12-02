<template>
<section class="cart-section">
  <div class="container">
    <h2 class="heading">
      <!-- {{ $t("cart.title") }} -->
    </h2>
    <p class="description">
      <!-- {{ $t("cart.description") }} -->
    </p>

    <div class="layout">
      <div class="products-column">
        <div class="products-list">
          <div v-if="cartProducts.length === 0" class="empty-cart">
            <h2 class="empty-title">Нажаль в кошику ще немає товарів!</h2>
            <NuxtLink to="/products" class="btn btn-outline go-back-btn">
              Перейти до продуктів
            </NuxtLink>
          </div>

          <div class="product-card" v-for="(product, idx) in cartProducts" :key="idx">
            <div class="product-row">
              <div class="product-thumb">
                <img :src="product.img[0].path" alt="image" />
              </div>

              <div class="product-info">
                <h4 class="product-title">
                  {{product.translations.find((t) => t.language === $i18n.locale).title}}
                </h4>
                <p class="product-desc">
                  {{product.translations.find((t) => t.language === $i18n.locale).productDescription}}
                </p>
              </div>

              <div class="controls">
                <label class="sr-only">Choose quantity:</label>
                <div class="quantity">
                  <button @click="updateQuantity('-', product)" class="btn btn-square">-</button>
                  <input type="text" class="quantity-input" :value="product.quantityProducts" required />
                  <button @click="updateQuantity('+', product)" class="btn btn-square">+</button>

                  <div class="quantity-meta">
                    <div class="quantity-label">Кількість товару</div>
                    <div class="package-label">{{product.translations.find((t) => t.language ===
                      $i18n.locale).groupPackage }}</div>
                  </div>
                </div>

                <div class="actions">
                  <button @click="removeProduct(product)" class="btn btn-danger">Видалити</button>
                  <div class="price">{{ product.totalPrice }} грн</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="also-buy">
          <h3 class="also-buy-title"><!-- {{ $t("cart.also-buy") }} --></h3>
          <div class="cards-grid">
            <div
              class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)]">
              <div class="overflow-hidden rounded">
                <img class="mx-auto h-44 w-44 dark:hidden" src="../../public//icon-pack/bag-icons/stratch.png"
                  alt="image" />
              </div>
              <div>
                <a href="#"
                  class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">ТОВАР</a>
                <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, odit?
                </p>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900 dark:text-white">
                  <span class="line-through"> $399,99 </span>
                </p>
                <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                  $299
                </p>
              </div>
              <div class="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-1" type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-[var(--dark-accent-color)] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-1" role="tooltip"
                  class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button"
                  class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <div
              class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)]">
              <a href="#" class="overflow-hidden rounded">
                <img class="mx-auto h-44 w-44 dark:hidden" src="../../public/icon-pack/bag-icons/comservBag.png"
                  alt="image" />
              </a>
              <div>
                <a href="#"
                  class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">ТОВАР</a>
                <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900 dark:text-white">
                  <span class="line-through"> $799,99 </span>
                </p>
                <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                  $499
                </p>
              </div>
              <div class="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-2" type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-[var(--dark-accent-color)] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-2" role="tooltip"
                  class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button type="button"
                  class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
            <div
              class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)]">
              <a href="#" class="overflow-hidden rounded">
                <!-- <img class="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                <img class="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" /> -->
                <img class="mx-auto h-44 w-44 dark:hidden" src="../../public/icon-pack/bag-icons/cute-bag.png"
                  alt="imac image" />
              </a>
              <div>
                <a href="#"
                  class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">ТОВАР</a>
                <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
              <div>
                <p class="text-lg font-bold text-gray-900 dark:text-white">
                  <span class="line-through"> $1799,99 </span>
                </p>
                <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                  $1199
                </p>
              </div>
              <div class="mt-6 flex items-center gap-2.5">
                <button data-tooltip-target="favourites-tooltip-3" type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-[var(--dark-accent-color)] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                  </svg>
                </button>
                <div id="favourites-tooltip-3" role="tooltip"
                  class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                  Add to favourites
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>

                <button type="button"
                  class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                    height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="summary-column">
        <div class="summary-panel">
          <p class="summary-title"><!-- {{ $t("cart.summary.title") }} --></p>

          <div class="summary-body">
            <div class="summary-row">
              <dt class="muted"><!-- {{ $t("cart.summary.full-price") }} --></dt>
              <dd class="muted-value">₴ 0</dd>
            </div>

            <div class="summary-row">
              <dt class="muted"><!-- {{ $t("cart.summary.discount") }} --></dt>
              <dd class="discount-value">-₴ 0</dd>
            </div>

            <div class="summary-total">
              <dt class="total-label"><!-- {{ $t("cart.summary.total") }} --></dt>
              <dd class="total-value">₴ {{ totalPrice }}</dd>
            </div>
          </div>

          <NuxtLink @click="goToCheckout" class="btn btn-primary process-order">
            <!-- {{ $t("cart.summary.place-order") }} -->
          </NuxtLink>

          <div class="summary-actions">
            <NuxtLink to="/products" class="btn btn-dark">
              <!-- {{ $t("cart.summary.go-back") }} -->
              <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5m14 0-4 4m4-4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
//   import Tooltips from "~/components/shared/Tooltips.vue";
//   import Swiper from "swiper";

import { useCartStore } from '@/store/cart-store';

const cartStore = useCartStore();
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



const removeProduct = (product) => {
  cartStore.removeProduct(product)
  cartProducts.value = cartStore.cart;
  totalPrice.value = cartProducts.value.reduce((acc, product) => acc + product.totalPrice, 0);

}


const goToCheckout = (event) => {

  if (!cartProducts.value.length) {
    event.preventDefault();
    tooltip({
      status: "error",
      message: "Ваш кошик порожній"
    })
    console.log('path to checkout forbidden')
  } else {
    router.push('/checkout');
  }

}


const updateQuantity = (operator, product) => {

  const newQuantity = operator === '+' ? product.quantityProducts + product.counterQuantity : product.quantityProducts - product.counterQuantity;

  const newPrice = product.totalPrice = countTotalPrice({
    price: product.price,
    totalProduct: newQuantity
  })

  cartStore.updateProduct(product, newPrice, newQuantity);
  totalPrice.value = cartProducts.value.reduce((acc, product) => acc + product.totalPrice, 0);


}


onMounted(() => {
  cartProducts.value = cartStore.cart;
  totalPrice.value = cartProducts.value.reduce((acc, product) => acc + product.totalPrice, 0);
  console.log(cartProducts.value)
})


</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

/* filepath: /Users/dmitrijnasyrkulov/WORK/SIDE/TILOLAB/pages/cart/index.vue (styles) */

.cart-section {
  font-family: "Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
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
  margin-bottom: .25rem;
}

.description {
  color: rgba(0, 0, 0, 0.7);
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
  font-size: .9rem;
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
  font-size: .8rem;
  color: var(--dark-color);
}

.package-label {
  font-size: .8rem;
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
  background: var(--dark-color, #111827);
  color: #fff;
  border: none;
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
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
  color: rgba(0, 0, 0, 0.6);
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

/* reuse mixins for specific buttons */
.go-back-btn {
  @include mixins.cardShadow;
}

.process-order {
  @include mixins.cardShadow;
  cursor: pointer;
}
</style>