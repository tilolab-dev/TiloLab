<template>
  <div class="product_id">
    <div class="container">
      <div
        v-if="!loadState && productStore.selectedProducts?.translations"
        class="product_id_wrapper"
      >
        <BreadCrumbs />

        <div v-if="!loadState" class="product_id_main">
          <div v-if="slides.length > 0" class="product_id_preview">
            <div class="main_img">
              <ClientOnly>
                <swiper-container
                  ref="containerMainRef"
                  :key="swiperKey"
                  class="swiper-main"
                  :slides-per-view="1"
                  :space-between="10"
                  thumbs-swiper=".swiper-gallery"
                >
                  <swiper-slide v-for="slide in slides" :key="slide.id">
                    <NuxtImg :src="slide.src" :alt="slide.title" />
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>

            <div v-if="slides.length > 1" class="img_gallery">
              <ClientOnly>
                <swiper-container
                  ref="containerGalleryRef"
                  :key="swiperKey"
                  class="swiper-gallery"
                  :slides-per-view="3"
                  :space-between="10"
                  :watch-slides-progress="true"
                  :free-mode="true"
                  :breakpoints="{
                    320: { slidesPerView: 3, spaceBetween: 8 },
                    480: { slidesPerView: 2.5, spaceBetween: 10 },
                    1024: { slidesPerView: 3.1, spaceBetween: 10 }
                  }"
                >
                  <swiper-slide v-for="slide in slides" :key="slide.id">
                    <NuxtImg :src="slide.src" :alt="slide.title" />
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>
          </div>
          <div v-else class="img_gallery_placeholder">
            <p>No images available</p>
          </div>

          <div class="product_id_info">
            <div class="product_id_info_main">
              <h3>
                {{ productStore.selectedProducts.translations[0].title }}
              </h3>
              <div class="product_price">
                <span> {{ productStore.selectedProducts.productPrice }} грн </span>
                <span
                  v-if="productStore.selectedProducts.discountPercent != 0"
                  class="discount_accent"
                >
                  {{ discountedPrice }} грн
                </span>
              </div>

              <div class="wish_list">
                <HeartIcon />

                <span> Додати до списку бажань </span>
              </div>

              <div class="availability">
                <CheckIcon />

                <span> {{ productStore.selectedProducts.stockValue }} в наявності </span>
              </div>

              <div class="product_quantity">
                <div class="product_quantity_head">Кількість товару:</div>
                <div class="product_quantity_counter">
                  <button
                    :class="counter === 1 ? 'counter_disabled' : ''"
                    @click="counter > 1 ? counter-- : counter"
                  >
                    <MinusIcon />
                  </button>
                  <input
                    v-model="counter"
                    class="quantity"
                    type="number"
                    min="1"
                    @blur="counterValidate"
                  />
                  <button @click="counter">
                    <PlusIcon />
                  </button>
                </div>
              </div>

              <div class="cart_btn">
                <button @click="addToCart">Додати в кошик</button>
              </div>
            </div>

            <div class="product_id_info_characteristics">
              <div class="head">
                <h3>Характеристики</h3>
              </div>

              <ul>
                <li>
                  <span>
                    <strong> Колір: </strong>
                    {{ productStore.selectedProducts.translations[0].productColor }}
                  </span>
                </li>
                <li>
                  <span>
                    <strong> Матеріал: </strong>
                    {{ productStore.selectedProducts.translations[0].productMaterial }}
                  </span>
                </li>
                <li>
                  <span>
                    <strong> Розмір: </strong>
                    {{ productStore.selectedProducts.productSize }}
                  </span>
                </li>
                <li>
                  <span>
                    <strong> Країна виробник: </strong>
                    {{ productStore.selectedProducts.translations[0].productManufacture }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="product_id_info_description">
              <div class="head" @click="toggleDescription">
                <h3>Опис</h3>
                <button
                  :class="{
                    description_collapsed: isDescriptionCollapsed
                  }"
                >
                  <AngleDown />
                </button>
              </div>
              <p
                class="description_text"
                :class="{
                  description_collapsed: isDescriptionCollapsed
                }"
              >
                {{ productStore.selectedProducts.translations[0].productDescription }}
              </p>
            </div>
          </div>
        </div>

        <SharedLoader v-else />

        <ProductPagePopular />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductPagePopular from "@/components/ProductPagePopular.vue";

import { ref, computed, onMounted, onUnmounted } from "vue";
import { useProductStore } from "@/store/product-store";
import { useCartStore } from "@/store/cart-store";
import { useRoute } from "vue-router";
// components
import BreadCrumbs from "@/components/shared/BreadCrumbs.vue";

import HeartIcon from "~/assets/icons/heart.svg";
import AngleDown from "~/assets/icons/angle-down.svg";
import CheckIcon from "~/assets/icons/check.svg";
import PlusIcon from "~/assets/icons/plus-icon.svg";
import MinusIcon from "~/assets/icons/minus-icon.svg";

// stores
const productStore = useProductStore();
const cartStore = useCartStore();

// refs
const containerMainRef = ref(null);
const containerGalleryRef = ref(null);
const productImages = ref([]);
const loadState = ref(true);
const swiperKey = ref(0);
const isDescriptionCollapsed = ref(true);
const counter = ref(1);

const counterValidate = () => {
  if (counter.value < 1) {
    counter.value = 1;
  }
};

const discountedPrice = computed(() => {
  const p = productStore.selectedProducts.productPrice;
  const d = productStore.selectedProducts.discountPercent;
  return Math.round(p - (p * d) / 100);
});

// routes
const route = useRoute();

const toggleDescription = () => {
  isDescriptionCollapsed.value = !isDescriptionCollapsed.value;
};

const slides = computed(() => {
  const product = productStore.selectedProducts;

  if (!product?.img || product.img.length === 0) {
    return [];
  }

  return product.img.map((img, idx) => ({
    id: idx,
    src: img.path,
    title: product.translations?.[0]?.title ?? ""
  }));
});

const routeId = route.params.productId;

const fetchProductById = async () => {
  try {
    const res = await $fetch(`/api/products/${routeId}`);

    if (!res?.data) {
      return navigateTo("/404");
    }

    productStore.setSelectedProducts(res.data);

    productImages.value = Array.isArray(res.data.images) ? res.data.images : [];

    return productImages.value;
  } catch {
    // Handle error silently or show user feedback
  }
};

const addToCart = () => {
  const productTotalPrice = productStore.selectedProducts.productPrice * counter.value;
  cartStore.addProduct(productStore.selectedProducts, counter.value, productTotalPrice);
  counter.value = 1;
};

onMounted(async () => {
  if (productStore?.selectedProducts?.id === routeId) {
    loadState.value = false;
  } else if (routeId) {
    await fetchProductById();
    loadState.value = false;
  } else {
    navigateTo("/404");
  }

  // Force re-initialization of swipers when route changes
  swiperKey.value += 1;
});

onUnmounted(() => {
  // Clean up will be handled automatically by key change
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.product_id_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-block: 4rem;
  gap: 4rem;
}

.product_id {
  h1 {
    color: white;
  }
}

.img_gallery {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
  scrollbar-width: none;
  max-width: 100%;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}

.img_gallery_item {
  flex: 0 0 30%;
  scroll-snap-align: start;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.img_gallery_placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background: #f5f5f5;
  border-radius: 8px;
  color: #666;
  font-size: 14px;
}

.product_id_main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  position: relative;
  gap: 5rem;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1440px) {
    gap: 20px;
  }

  @media (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
}

.product_id_preview {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  gap: 1rem;
  flex: 1;

  @media screen and (max-width: 1024px) {
    max-width: 448px;
  }

  @media screen and (max-width: 768px) {
    max-width: calc(100vw - 30px);
  }

  .main_img {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product_id_info {
  flex: 1;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 4rem;

  &_main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: fit-content;
    gap: 1rem;

    h3 {
      color: #fff;
      font-size: 30px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 45px */
      letter-spacing: 0.6px;
    }

    .product_price {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1.5rem;

      span {
        color: #fff;
        font-family: Montserrat;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: 0.48px;
      }

      .discount_accent {
        color: var(--accent-color);
      }
    }

    .wish_list {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
      cursor: pointer;

      svg {
        width: 23px;
        height: 21px;
      }

      span {
        font-size: 1.4rem;
        font-weight: 500;
      }

      @media screen and (min-width: 1024px) {
        &:hover svg path {
          stroke: var(--accent-color);
          transition: all ease 0.3s;
        }

        &:hover span {
          color: var(--accent-color);
          transition: all ease 0.3s;
        }
      }
    }

    .availability {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;

      span {
        font-size: 1.4rem;
        font-weight: 500;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .product_quantity {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 10px;

      &_head {
        @include mixins.subtitleText;
      }

      &_counter {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        gap: 15px;
      }
      button {
        background: var(--btn-color);
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--border-color);
        transition: all ease 0.3s;
        position: relative;
        cursor: pointer;
        padding: 3px;
        @media screen and (min-width: 1024px) {
          &:hover {
            background: var(--btn-color-hover);
            transition: all ease 0.3s;
          }
        }
      }
      svg {
        width: 100%;
        height: 100%;
        fill: var(--text-color);
      }
      .counter_disabled {
        background: transparent;
        cursor: not-allowed;
        @media screen and (min-width: 1024px) {
          &:hover {
            background: transparent;
          }
        }
      }
      .quantity {
        @include mixins.subtitleText;
        min-width: 2ch;
        text-align: center;
      }
    }
    .cart_btn {
      width: 100%;
      height: fit-content;
      position: relative;

      button {
        width: 100%;
        height: 100%;
        background: var(--btn-color);
        border: 2px solid var(--border-color);
        transition: all ease 0.3s;
        cursor: pointer;
        border-radius: 8px;
        padding-block: 1rem;
        font-size: 1.5rem;

        @media screen and (min-width: 1024px) {
          &:hover {
            background: var(--btn-color-hover);
            transition: all ease 0.3s;
          }
        }
      }
    }
  }

  &_characteristics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    h3 {
      font-size: 1.7rem;
      font-weight: 500;
    }

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 0.5rem;

      li span {
        strong {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-color);
        }

        font-size: 1.3rem;
        font-weight: 500;
        color: darkgrey;
      }
    }
  }

  &_description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      cursor: pointer;

      h3 {
        font-size: 1.7rem;
        font-weight: 500;
      }

      button {
        svg {
          width: 12px;
          height: 5px;

          path {
            stroke: var(--text-color);
          }
        }

        transform: rotate(180deg);
        transition: transform 0.3s ease;

        &.description_collapsed {
          transform: rotate(0deg);
        }
      }
    }

    p {
      font-size: 1.4rem;
      height: auto;
      transition: height 0.3s ease;

      &.description_collapsed {
        height: 0;
        overflow: hidden;
      }
    }
  }
}

.swiper-main {
  width: 100%;
  height: 621px;
  border-radius: 8px;
  overflow: hidden;

  @media screen and (max-width: 1024px) {
    height: 465px;
  }

  @media screen and (max-width: 768px) {
    height: 365px;
  }

  @media screen and (max-width: 480px) {
    height: 300px;
  }

  swiper-slide {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.swiper-gallery {
  width: 100%;
  height: 194px;

  swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.6;
    cursor: pointer;
    border-radius: 4px;
    overflow: hidden;
    transition: opacity 0.3s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}

.swiper-gallery .swiper-slide-thumb-active {
  opacity: 1 !important;
  border: 2px solid var(--accent-color);
}
</style>
