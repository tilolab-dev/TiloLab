<template>
  <div>
    <section class="py-8 antialiased md:py-10 max-md:mt-6">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <h2 class="text-xl font-semibold text-[var(--dark-color)] dark:text-[var(--dark-font-color)] sm:text-2xl mb-4">
        {{ $t("cart.title") }}
      </h2>
      <p class="text-xl font-sm text-[var(--dark-color)] dark:text-[var(--dark-font-color)] sm:text-2xl">
        {{ $t("cart.description") }}
      </p>

      <div class="mt-4 sm:mt-6 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            <div
              v-if="cartProducts.length === 0"
            >
              <h2 class="text-xl text-semibold sm:text-2xl relative z-10 mb-12 text-red-700">
                Нажаль в кошику ще немає товарів!
                
              </h2>
              <NuxtLink to="/products" class="go-back-btn">
                <span class="text-[var(--dark-color)]">
                  Перейти до продуктів
                </span>
              </NuxtLink>
            </div>
            <div
              class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[var(--main-accent)] dark:bg-[#0d161f] md:p-6 relative"
              v-for="(product, idx) in cartProducts"
              :key="idx"

            >
              <div
                class="space-y-10 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
              >
                <div class="shrink-0 md:order-1">
                  <img
                    class="h-20 w-20 "
                    :src="product.img[0].path"
                    alt="image"
                  />
                </div>

                <label for="counter-input" class="sr-only text-black"
                  >Choose quantity:</label
                >
                <div
                  class="flex items-center justify-between md:order-3 md:justify-end "
                >
                  <div class="flex items-center relative">
                    <button
                      type="button"
                      id="decrement-button"
                      @click="updateQuantity('-', product)"
                      class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="counter-input"
                      class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                      :value="product.quantityProducts"
                      required
                    />
                    <button
                      type="button"
                      id="increment-button"
                      @click="updateQuantity('+', product)"
                      class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                      <svg
                        class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                    <h2 class="absolute -top-8 md:left-1/2 md:-translate-x-1/2 whitespace-nowrap text-[var(--dark-color)] dark:text-[var(--dark-font-color)]">
                      Кількість товару
                    </h2>
                    <span class="text-sm font-medium text-[var(--dark-color)] absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap dark:text-[var(--dark-font-color)]">
                      {{ product.translations.find((t) => t.language === $i18n.locale).groupPackage }}
                    </span>
                  </div>
                  <div class="text-end md:order-4 md:w-32">
                     <!-- <div class="flex items-center gap-4">

                    
                  </div> -->
                    <button
                        type="button"
                        @click="removeProduct(product)"
                        class="
                          inline-flex items-center text-sm font-medium text-white lg:hover:bg-red-700 dark:text-[var(--dark-font-color)] absolute top-2 right-2
                          bg-red-500 px-2 py-1 rounded-md 
                          "
                      >
                      
                      Видалити
                    </button>
                    <p
                      class="text-base font-bold text-gray-900 dark:text-white"
                    >
                      {{ product.totalPrice }} грн
                    </p>
                  </div>
                </div>

                <div
                  class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md "
                >
                  <h4
                    class="text-base font-medium text-[var(--dark-color)] dark:text-[var(--dark-font-color)]"
                  >
                    {{ product.translations.find((t) => t.language === $i18n.locale).title }}
                  </h4>
                  <span class="text-sm font-medium text-[var(--dark-color)] dark:text-[var(--dark-font-color)]">
                    {{ product.translations.find((t) => t.language === $i18n.locale).productDescription }}
                  </span>

                 
                </div>
              </div>
            </div>
          </div>
          <div class="mt-12 xl:block">
            <h3
              class="text-2xl font-semibold text-gray-900 dark:text-[var(--dark-font-color)]"
            >
              {{ $t("cart.also-buy") }}
            </h3>
            <div
              class="mt-6 grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 sm:mt-8"
            >
              <div
                class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)]"
              >
                <div class="overflow-hidden rounded">
                  <img
                    class="mx-auto h-44 w-44 dark:hidden"
                    src="../../public//icon-pack/bag-icons/stratch.png"
                    alt="image"
                  />
                </div>
                <div>
                  <a
                    href="#"
                    class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >ТОВАР</a
                  >
                  <p
                    class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis, odit?
                  </p>
                </div>
                <div>
                  <p class="text-lg font-bold text-gray-900 dark:text-white">
                    <span class="line-through"> $399,99 </span>
                  </p>
                  <p
                    class="text-lg font-bold leading-tight text-red-600 dark:text-red-500"
                  >
                    $299
                  </p>
                </div>
                <div class="mt-6 flex items-center gap-2.5">
                  <button
                    data-tooltip-target="favourites-tooltip-1"
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-[var(--dark-accent-color)] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="favourites-tooltip-1"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                  >
                    Add to favourites
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      class="-ms-2 me-2 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
              <div
                class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)]"
              >
                <a href="#" class="overflow-hidden rounded">
                  <img
                    class="mx-auto h-44 w-44 dark:hidden"
                    src="../../public/icon-pack/bag-icons/comservBag.png"
                    alt="image"
                  />
                </a>
                <div>
                  <a
                    href="#"
                    class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >ТОВАР</a
                  >
                  <p
                    class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div>
                  <p class="text-lg font-bold text-gray-900 dark:text-white">
                    <span class="line-through"> $799,99 </span>
                  </p>
                  <p
                    class="text-lg font-bold leading-tight text-red-600 dark:text-red-500"
                  >
                    $499
                  </p>
                </div>
                <div class="mt-6 flex items-center gap-2.5">
                  <button
                    data-tooltip-target="favourites-tooltip-2"
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-[var(--dark-accent-color)] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="favourites-tooltip-2"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                  >
                    Add to favourites
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      class="-ms-2 me-2 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
              <div
                class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)]"
              >
                <a href="#" class="overflow-hidden rounded">
                  <!-- <img class="mx-auto h-44 w-44 dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                <img class="mx-auto hidden h-44 w-44 dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" /> -->
                  <img
                    class="mx-auto h-44 w-44 dark:hidden"
                    src="../../public/icon-pack/bag-icons/cute-bag.png"
                    alt="imac image"
                  />
                </a>
                <div>
                  <a
                    href="#"
                    class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >ТОВАР</a
                  >
                  <p
                    class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div>
                  <p class="text-lg font-bold text-gray-900 dark:text-white">
                    <span class="line-through"> $1799,99 </span>
                  </p>
                  <p
                    class="text-lg font-bold leading-tight text-red-600 dark:text-red-500"
                  >
                    $1199
                  </p>
                </div>
                <div class="mt-6 flex items-center gap-2.5">
                  <button
                    data-tooltip-target="favourites-tooltip-3"
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-[var(--dark-accent-color)] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      class="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                      ></path>
                    </svg>
                  </button>
                  <div
                    id="favourites-tooltip-3"
                    role="tooltip"
                    class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                  >
                    Add to favourites
                    <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>

                  <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <svg
                      class="-ms-2 me-2 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full md:sticky md:top-[80px]">
          <div
            class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-[var(--main-accent)] dark:bg-[var(--dark-accent-color)] sm:p-6"
          >
            <p
              class="text-xl font-semibold text-gray-900 dark:text-[var(--dark-font-color)]"
            >
              <!-- Підсумок замовлення -->
              {{ $t("cart.summary.title") }}
            </p>

            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt
                    class="text-base font-normal text-gray-500 dark:text-gray-500"
                  >
                    <!-- Повна ціна -->
                    {{ $t("cart.summary.full-price") }}
                  </dt>
                  <dd
                    class="text-base font-medium text-gray-900 dark:text-[var(--dark-font-color)]"
                  >
                    ₴ 0
                  </dd>
                </dl>

                <dl class="flex items-center justify-between gap-4">
                  <dt
                    class="text-base font-normal text-gray-500 dark:text-gray-500"
                  >
                    <!-- Скидка -->
                    {{ $t("cart.summary.discount") }}
                  </dt>
                  <dd class="text-base font-medium text-green-700">-₴ 0</dd>
                </dl>

              </div>

              <dl
                class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"
              >
                <dt
                  class="text-base font-bold dark:text-[var(--dark-font-color)] text-[var(--primary-color)]"
                >
                  <!-- Всього -->
                  {{ $t("cart.summary.total") }}
                </dt>
                <dd
                  class="text-base font-bold text-gray-900 dark:text-[var(--dark-font-color)]"
                >
                  ₴ {{ totalPrice }}
                </dd>
              </dl>
            </div>

            <NuxtLink
              @click="goToCheckout"
              class="process-order flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-[var(--dark-color)] hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <!-- Перейти до оформлення замовлення -->
              {{ $t("cart.summary.place-order") }}
            </NuxtLink>

            <div class="flex items-center justify-center gap-2">
              <NuxtLink
                to="/products"
                title=""
                class="inline-flex items-center justify-center py-2 rounded-md gap-2 text-sm text-white font-medium text-primary-700 bg-[var(--dark-color)] w-full"
              >
                <!-- Повернутись в Магазин -->
                {{ $t("cart.summary.go-back") }}
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    
  </div>
 
  
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

  @use ".//styles/mixins.scss" as mixins;

    .go-back-btn{
      @include mixins.cardShadow;
    }


    .process-order{
      @include mixins.cardShadow;
      border-radius: 0.375rem;
      padding: unset;
      padding-block: 1rem;
      cursor: pointer;
    }

    .dark .process-order{
      box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.3), -6px -6px 20px rgba(0, 0, 0, 0.4);

    }

    .dark .go-back-btn{
      box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.3), -6px -6px 20px rgba(0, 0, 0, 0.4);
    }

</style>
