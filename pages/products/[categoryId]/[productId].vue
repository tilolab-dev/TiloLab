<template>
  <div class="product_id">
    <div class="container">
      <div class="product_id_wrapper">
        <BreadCrumbs :links="breadCrumbLinks" />

        <div v-if="loadState" class="loader_id_wrapper">
          <SharedLoader />
        </div>

        <template v-else>
          <div v-if="productStore.selectedProducts?.translations" class="product_id_main">
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
                <div class="description_head">
                  <h3>
                    {{ productStore.selectedProducts.translations[0].title }}
                  </h3>
                  <div class="product_price">
                    <span
                      :style="{
                        textDecorationLine:
                          productStore.selectedProducts.discountPercent != 0
                            ? 'line-through'
                            : 'none'
                      }"
                    >
                      {{ productStore.selectedProducts.productPrice }} грн
                    </span>
                    <span
                      v-if="productStore.selectedProducts.discountPercent != 0"
                      class="discount_accent"
                    >
                      {{ discountedPrice }} грн
                    </span>
                  </div>
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
                      <strong> Колір: </strong> &nbsp;
                      {{ productStore.selectedProducts.translations[0].productColor }}
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong> Матеріал: </strong> &nbsp;
                      {{ productStore.selectedProducts.translations[0].productMaterial }}
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong> Розмір: </strong> &nbsp;
                      {{ productStore.selectedProducts.productSize }}
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong> Країна виробник: </strong> &nbsp;
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

          <div v-else class="product_id_not_found">
            <h2>Продукт не знайдено</h2>
            <NuxtLink to="/">Перейти на головну</NuxtLink>
          </div>
        </template>

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
import { useIndexStore } from "@/store/index-store";
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
const indexStore = useIndexStore();
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

const breadCrumbLinks = computed(() => {
  const links = [];
  const pathSegments = route.path.split("/").filter((segment) => segment);

  // Handle products pages
  if (route.path.startsWith("/products")) {
    // Add "Продукти" link
    links.push({ name: "Продукти", url: "/products" });

    // If we have a category
    if (pathSegments.length > 1) {
      const categoryId = pathSegments[1];
      const category = indexStore.fetchedCategories.find(
        (cat) => cat.group.toLowerCase() === categoryId.toLowerCase()
      );

      if (category) {
        links.push({
          name: category.translations[0]?.title || categoryId,
          url: `/products/${categoryId}`
        });
      }

      // If we have a product ID, add it as non-link (last item)
      if (pathSegments.length > 2) {
        const productId = pathSegments[2];
        let productName = productId;

        // Get actual product name from store
        if (
          productStore.selectedProducts &&
          productStore.selectedProducts.translations?.[0]?.title
        ) {
          productName = productStore.selectedProducts.translations[0].title;
        }

        links.push({
          name: productName,
          url: route.fullPath
        });
      }
    }
  }

  return links;
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

    // if (!res?.data) {
    //   return navigateTo("/404");
    // }

    productStore.setSelectedProducts(res.data);

    productImages.value = Array.isArray(res.data.images) ? res.data.images : [];

    return productImages.value;
  } catch {
    // Handle error silently or show user feedback
  } finally {
    loadState.value = false;
  }
};

const addToCart = () => {
  const productTotalPrice = productStore.selectedProducts.productPrice * counter.value;
  cartStore.addProduct(productStore.selectedProducts, counter.value, productTotalPrice);
  counter.value = 1;
};

onMounted(async () => {
  // if (productStore?.selectedProducts?.id === routeId) {
  //   loadState.value = false;
  // } else if (routeId) {
  await fetchProductById();
  // loadState.value = false;
  // } else {
  //   navigateTo("/404");
  // }

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
  @include mixins.pageSpacing;

  .loader_id_wrapper {
    width: 100%;
    height: 60dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.link-block {
  padding-bottom: 28px;
  @media screen and (max-width: 1024px) {
    padding-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 16px;
  }
  @media screen and (max-width: 480px) {
    padding-bottom: 12px;
  }
  @media screen and (max-width: 375px) {
    padding-bottom: 6px;
  }
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
    gap: 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
  @media screen and (max-width: 375px) {
    gap: 22px;
  }
}

.product_id_preview {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  position: sticky;
  top: 50px;
  gap: 1rem;
  flex: 1;

  @media screen and (max-width: 1024px) {
    max-width: 448px;
  }

  @media screen and (max-width: 768px) {
    max-width: calc(100vw - 30px);
    position: relative;
    top: 0;
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
  gap: 46px;

  &_main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: fit-content;
    gap: 20px;

    .description_head {
      @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 8px;
      }
      @media screen and (max-width: 375px) {
        gap: 4px;
      }
    }

    h3 {
      font-family: "Montserrat", sans-serif;
      color: #fff;
      font-size: 1.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      letter-spacing: 0.6px;

      @media screen and (max-width: 1024px) {
        font-size: 1.75rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 1.625rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 1.375rem;
      }
    }

    .product_price {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1.5rem;

      span {
        color: #fff;
        font-family: "Montserrat", sans-serif;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: 0.48px;

        @media screen and (max-width: 1024px) {
          font-size: 1.375rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 1.3125rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 1.125rem;
        }
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
      padding-bottom: 12px;

      svg {
        width: 23px;
        height: 21px;
      }

      span {
        @include mixins.mainText;
        font-size: 1.125rem;
        font-weight: 500;
        @media screen and (max-width: 1024px) {
          font-size: 1.125rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.875rem;
        }
      }

      @media screen and (min-width: 1024px) {
        padding-bottom: 20px;
        &:hover svg path {
          stroke: var(--accent-color);
          transition: all ease 0.3s;
        }

        &:hover span {
          color: var(--accent-color);
          transition: all ease 0.3s;
        }
      }
      @media screen and (max-width: 480px) {
        gap: 8px;
        padding-bottom: 6px;
      }
    }

    .availability {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;

      span {
        @include mixins.mainText;
        font-size: 1rem;
        font-weight: 500;
        @media screen and (max-width: 1024px) {
          font-size: 0.9375rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.875rem;
        }
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
        @media screen and (max-width: 1024px) {
          font-size: 1rem;
        }
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
      @media screen and (max-width: 480px) {
        padding-block: 6px;
      }
    }
    .cart_btn {
      width: 100%;
      height: fit-content;
      position: relative;
      padding-top: 8px;

      button {
        @include mixins.accentBtn;
        width: 100%;
        // width: 100%;
        // height: 100%;
        // background: var(--btn-color);
        // border: 2px solid var(--border-color);
        // transition: all ease 0.3s;
        // cursor: pointer;
        // border-radius: 8px;
        // padding-block: 1rem;
        // font-size: 1.5rem;

        // @media screen and (min-width: 1024px) {
        //   &:hover {
        //     background: var(--btn-color-hover);
        //     transition: all ease 0.3s;
        //   }
        // }
      }
      @media screen and (max-width: 1024px) {
        padding-top: 6px;
      }
    }
    @media screen and (max-width: 1024px) {
      gap: 18px;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (max-width: 480px) {
      gap: 14px;
    }
  }

  &_characteristics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;

    h3 {
      @include mixins.subtitleText;
      font-size: 1.125rem;

      @media screen and (max-width: 768px) {
        font-size: 0.9375rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.875rem;
      }
    }

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 8px;

      li span {
        strong {
          @include mixins.subtitleText;
          font-size: 1.125rem;
          color: var(--text-color);
          @media screen and (max-width: 768px) {
            font-size: 1rem;
          }
          @media screen and (max-width: 375px) {
            font-size: 0.8125rem;
          }
        }
        @include mixins.mainText;
        font-size: 1rem;
        color: darkgrey;

        @media screen and (max-width: 768px) {
          font-size: 0.875rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.6875rem;
        }
      }
      @media screen and (max-width: 768px) {
        gap: 7px;
      }
    }

    @media screen and (max-width: 1024px) {
      gap: 18px;
    }
    @media screen and (max-width: 768px) {
      gap: 16px;
    }
    @media screen and (max-width: 375px) {
      gap: 12px;
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
        @include mixins.subtitleText;
        font-size: 1.125rem;
        font-weight: 500;

        @media screen and (max-width: 1024px) {
          font-size: 1.0625rem;
        }
        @media screen and (max-width: 768px) {
          font-size: 1rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.875rem;
        }
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
      @include mixins.mainText;
      font-weight: 500;
      font-size: 1.125rem;
      height: auto;
      transition: height 0.3s ease;

      &.description_collapsed {
        height: 0;
        overflow: hidden;
      }

      @media screen and (max-width: 1024px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.75rem;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    gap: 40px;
  }
  @media screen and (max-width: 768px) {
    gap: 32px;
  }
  @media screen and (max-width: 375px) {
    gap: 20px;
  }
}

.product_id_not_found {
  text-align: center;
  margin: 2rem auto;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--text-color);
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
