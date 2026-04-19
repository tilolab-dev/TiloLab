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
                      <NuxtImg
                        :src="slide.src"
                        :alt="slide.title"
                        placeholder="/images/fallback-img.webp"
                        error="/images/fallback-img.webp"
                        quality="80"
                        width="600"
                        height="600"
                        sizes="600px"
                        lazy
                      />
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
                      <NuxtImg
                        placeholder="/images/fallback-img.webp"
                        error="/images/fallback-img.webp"
                        :src="slide.src"
                        :alt="slide.title"
                        quality="80"
                        width="150"
                        height="150"
                        sizes="150px"
                        lazy
                      />
                    </swiper-slide>
                  </swiper-container>
                </ClientOnly>
              </div>
            </div>
            <div v-else class="img_gallery_placeholder">
              <NuxtImg
                src="/images/fallback-img.webp"
                alt="Product image"
                placeholder="/images/fallback-img.webp"
                error="/images/fallback-img.webp"
                quality="80"
                width="600"
                height="600"
                sizes="600px"
                lazy
              />
            </div>

            <div class="product_id_info">
              <div class="product_id_info_main">
                <div class="description_head">
                  <h3>
                    {{ productStore.selectedProducts.translations[0].title }}
                    {{
                      isOptionSelected ? ` - (${selectedOption.translations[0].optionInfo})` : ""
                    }}
                  </h3>
                  <div class="product_price">
                    <span v-if="productStore.selectedProducts.discountPercent === 0">
                      {{
                        isOptionSelected
                          ? (selectedOption.optionPrice * productQuantity).toFixed(2)
                          : (productStore.selectedProducts.productPrice * productQuantity).toFixed(
                              2
                            )
                      }}
                      грн
                    </span>
                    <span
                      v-else
                      :style="{
                        textDecorationLine:
                          productStore.selectedProducts.discountPercent != 0
                            ? 'line-through'
                            : 'none'
                      }"
                    >
                      {{ productStore.selectedProducts.productPrice.toFixed(2) }}
                      грн
                    </span>
                    <span
                      v-if="productStore.selectedProducts.discountPercent > 0"
                      class="discount_accent"
                    >
                      {{ (discountedPrice * productQuantity).toFixed(2) }} грн
                    </span>
                  </div>
                </div>

                <div
                  class="wish_list"
                  :class="isProductInWishlist ? 'selected' : ''"
                  @click="handleWishlistToggle"
                >
                  <HeartIcon />

                  <span v-if="isProductInWishlist"> Видалити зі списку бажань </span>
                  <span v-else> Додати до списку бажань </span>
                </div>

                <div v-if="availableQuantity > 10" class="availability">
                  <CheckIcon />

                  <span> {{ availableQuantity }} в наявності </span>
                </div>

                <div
                  v-else-if="availableQuantity <= 10 && availableQuantity > 0"
                  class="running_out"
                >
                  <CheckIcon />

                  <span> {{ availableQuantity }} в наявності </span><br />
                  <span class="accent">Товар закінчується</span>
                </div>
                <!-- v-else-if="productStore.selectedProducts.availableProduct === 0" -->

                <div v-else-if="availableQuantity <= 0" class="no_available">
                  <span>Товар закінчився</span>
                </div>

                <div v-if="productStore?.selectedProducts?.options?.length" class="options_wrapper">
                  <div
                    class="option_item"
                    :class="selectedOption === null ? 'selected_option' : ''"
                    @click="selectedOption = null"
                  >
                    <NuxtImg
                      placeholder="/images/fallback-img.webp"
                      error="/images/fallback-img.webp"
                      :src="productStore.selectedProducts.img[0].path"
                      alt="option"
                      quality="80"
                      width="100"
                      height="100"
                      sizes="100px"
                      lazy
                    />
                    <span>
                      {{
                        productStore.selectedProducts.translations[0].productColor.length < 1
                          ? "Стандарт"
                          : productStore.selectedProducts.translations[0].productColor
                      }}
                    </span>
                  </div>
                  <div
                    v-for="option in productStore.selectedProducts.options"
                    :key="option.id"
                    class="option_item"
                    :class="option.id === selectedOption?.id ? 'selected_option' : ''"
                    @click="selectedOption = option"
                  >
                    <NuxtImg
                      :src="option.optionImg"
                      placeholder="/images/fallback-img.webp"
                      error="/images/fallback-img.webp"
                      alt="option"
                      quality="80"
                      width="100"
                      height="100"
                      sizes="100px"
                      lazy
                    />
                    <span>
                      {{ option.translations[0].optionInfo }}
                    </span>
                  </div>
                </div>

                <div class="product_quantity">
                  <div class="product_quantity_head">Кількість товару:</div>
                  <div class="product_quantity_counter">
                    <button :class="counter === 1 ? 'counter_disabled' : ''" @click="decrement">
                      <MinusIcon />
                    </button>
                    <input
                      v-model="counter"
                      class="quantity"
                      type="number"
                      min="1"
                      @blur="onBlur"
                    />
                    <!-- :class="
                        counter === productStore.selectedProducts.availableProduct
                          ? 'counter_disabled'
                          : ''
                      " -->
                    <!-- v-if="selectedOption === null" -->

                    <button
                      :class="counter === availableQuantity ? 'counter_disabled' : ''"
                      @click="increment"
                    >
                      <PlusIcon />
                    </button>
                    <!-- <button
                      v-else
                      :class="counter === availableQuantity ? 'counter_disabled' : ''"
                      @click="increment('option')"
                    >
                      <PlusIcon />
                    </button> -->
                  </div>
                </div>

                <div class="cart_btn">
                  <button v-if="availableQuantity > 0" @click="addToCart">Додати в кошик</button>
                  <div v-else class="not_allowed_btn">Додати в кошик</div>
                </div>
              </div>

              <div class="product_id_info_characteristics">
                <div class="head">
                  <h3>Характеристики</h3>
                </div>

                <ul>
                  <li
                    v-if="
                      productStore.selectedProducts.translations[0].productColor !== '-' &&
                      productStore.selectedProducts.translations[0].productColor !== ''
                    "
                  >
                    <span>
                      <strong> Колір: </strong> &nbsp;
                      {{ productStore.selectedProducts.translations[0].productColor }}
                    </span>
                  </li>
                  <li
                    v-if="
                      productStore.selectedProducts.translations[0].productMaterial !== '-' &&
                      productStore.selectedProducts.translations[0].productMaterial !== ''
                    "
                  >
                    <span>
                      <strong> Матеріал: </strong> &nbsp;
                      {{ productStore.selectedProducts.translations[0].productMaterial }}
                    </span>
                  </li>
                  <li
                    v-if="
                      productStore.selectedProducts.productSize !== '-' &&
                      productStore.selectedProducts.productSize !== ''
                    "
                  >
                    <span>
                      <strong> Розмір: </strong> &nbsp;
                      {{ productStore.selectedProducts.productSize }}
                    </span>
                  </li>
                  <li
                    v-if="
                      productStore.selectedProducts.translations[0].productManufacture !== '-' &&
                      productStore.selectedProducts.translations[0].productManufacture !== ''
                    "
                  >
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
    <Tooltips v-if="showTooltip" :tooltip-status="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips>
  </div>
</template>

<script setup>
import ProductPagePopular from "@/components/ProductPagePopular.vue";

import { ref, computed, onMounted } from "vue";
import { useProductStore } from "@/store/product-store";
import { useCartStore } from "@/store/cart-store";
import { useIndexStore } from "@/store/index-store";
import { useWishlistStore } from "@/store/wishlist-store";

import { useRoute } from "vue-router";
// components
import BreadCrumbs from "@/components/shared/BreadCrumbs.vue";

import HeartIcon from "~/assets/icons/heart.svg";
import AngleDown from "~/assets/icons/angle-down.svg";
import CheckIcon from "~/assets/icons/check.svg";
import PlusIcon from "~/assets/icons/plus-icon.svg";
import MinusIcon from "~/assets/icons/minus-icon.svg";
//import FallbackIcon from "~/assets/icons/fallback_img.svg";
import Tooltips from "@/components/shared/Tooltips.vue";

// stores
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const indexStore = useIndexStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

// Get route parameters
const route = useRoute();
const categoryId = route.params.categoryId;
const productId = route.params.productId;

// Options
const selectedOption = ref(null);

const availableQuantity = computed(() => {
  if (!selectedOption.value) {
    return productStore.selectedProducts.stockValue;
  }

  return selectedOption.value.optionStock - (selectedOption.value.optionReserved || 0);
});

watch(selectedOption, () => {
  if (counter.value > availableQuantity.value) {
    counter.value = availableQuantity.value || 1;
  }
});

const isOptionSelected = computed(() => !!selectedOption.value);

// Dynamic SEO Meta Tags based on product
const { selectedProducts } = storeToRefs(productStore);
const currentProduct = computed(() => {
  const product = selectedProducts.value;
  return Array.isArray(product) ? product[0] : product;
});

const currentCategory = computed(() => {
  return indexStore.fetchedCategories.find((cat) => cat.group.toLowerCase() === categoryId);
});

// Fetch product data during SSR for proper SEO
const { data: productData, pending } = await useAsyncData(`product-${productId}`, async () => {
  const res = await $fetch(`/api/products/${productId}`);
  return res.data || res;
});

// SEO using productData from useAsyncData
const seoMetaFromAsyncData = computed(() => {
  // Show loading state while pending
  if (pending.value) {
    return {
      title: "Завантаження продукту... - Tilo Lab",
      description: "Завантаження продукту... Анонімна доставка по Україні.",
      ogTitle: "Завантаження продукту... - Tilo Lab",
      ogDescription: "Завантаження продукту...",
      ogImage: "https://tilolab.com.ua/images/about-main.webp",
      ogUrl: `https://tilolab.com.ua/products/${categoryId}/${productId}`,
      twitterCard: "summary_large_image"
    };
  }

  const product = productData.value;
  const category = currentCategory.value;

  if (!product || !product.translations?.[0]) {
    return {
      title: "Продукт не знайдено - Tilo Lab",
      description: "Продукт не знайдено. Перегляньте наш каталог інтимних товарів.",
      ogTitle: "Продукт не знайдено - Tilo Lab",
      ogDescription: "Продукт не знайдено. Перегляньте наш каталог інтимних товарів.",
      ogImage: "https://tilolab.com.ua/images/about-main.webp",
      ogUrl: `https://tilolab.com.ua/products/${categoryId}/${productId}`,
      twitterCard: "summary_large_image"
    };
  }

  const description =
    product.translations[0].productDescription || product.translations[0].description || "";
  const shortDesc = description.length > 150 ? description.substring(0, 150) + "..." : description;
  const shortDescOg =
    description.length > 100 ? description.substring(0, 100) + "..." : description;

  return {
    title: `${product.translations[0].title} - Tilo Lab | ${category?.translations?.[0]?.title || "Інтимні товари"}`,
    description: `${shortDesc} Купити з доставкою по Україні. Анонімна упаковка.`,
    ogTitle: product.translations[0].title,
    ogDescription: shortDescOg,
    ogImage:
      product.img && product.img.length > 0
        ? typeof product.img[0] === "string"
          ? product.img[0]
          : product.img[0]?.path || "https://tilolab.com.ua/images/about-main.webp"
        : "https://tilolab.com.ua/images/about-main.webp",
    ogUrl: `https://tilolab.com.ua/products/${categoryId}/${productId}`,
    twitterCard: "summary_large_image"
  };
});

useHead(() => ({
  title: seoMetaFromAsyncData.value.title,
  meta: [
    { name: "description", content: seoMetaFromAsyncData.value.description },
    { property: "og:title", content: seoMetaFromAsyncData.value.ogTitle },
    { property: "og:description", content: seoMetaFromAsyncData.value.ogDescription },
    { property: "og:image", content: seoMetaFromAsyncData.value.ogImage },
    { property: "og:url", content: seoMetaFromAsyncData.value.ogUrl },
    { name: "twitter:card", content: seoMetaFromAsyncData.value.twitterCard }
  ]
}));

// Structured Data for Product SEO
const productStructuredData = computed(() => {
  const product = currentProduct.value;
  const category = currentCategory.value;

  if (!product || !product.translations?.[0]) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.translations[0].title,
    description:
      product.translations[0].productDescription || product.translations[0].description || "",
    image:
      product.img && product.img.length > 0
        ? product.img.map((img) =>
            typeof img === "string"
              ? img
              : img?.path || "https://tilolab.com.ua/images/about-main.webp"
          )
        : ["https://tilolab.com.ua/images/about-main.webp"],
    brand: {
      "@type": "Brand",
      name: "Tilo Lab"
    },
    category: category?.translations?.[0]?.title || "Інтимні товари",
    offers: {
      "@type": "Offer",
      price: product.productPrice || product.price || 0,
      priceCurrency: "UAH",
      availability:
        product.availableProduct > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Tilo Lab",
        url: "https://tilolab.com.ua"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: "0.00",
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "https://schema.org/Monday",
              "https://schema.org/Tuesday",
              "https://schema.org/Wednesday",
              "https://schema.org/Thursday",
              "https://schema.org/Friday"
            ]
          }
        }
      }
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.review_count || 1
        }
      : undefined,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Material",
        value: product.translations[0]?.productMaterial || "Body-safe materials"
      },
      {
        "@type": "PropertyValue",
        name: "Color",
        value: product.translations[0]?.productColor || "Various colors"
      },
      {
        "@type": "PropertyValue",
        name: "Waterproof",
        value: product.waterproof ? "Yes" : "No"
      }
    ]
  };
});

// Breadcrumb structured data
const breadcrumbStructuredData = computed(() => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: "https://tilolab.com.ua"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: "https://tilolab.com.ua/products"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: currentCategory.value?.translations?.[0]?.title || "Категорія",
        item: `https://tilolab.com.ua/products/${categoryId}`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: currentProduct.value?.translations?.[0]?.title || "Продукт",
        item: `https://tilolab.com.ua/products/${categoryId}/${productId}`
      }
    ]
  };
});

useHead({
  script: computed(() => {
    const scripts = [];

    if (productStructuredData.value) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(productStructuredData.value)
      });
    }

    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(breadcrumbStructuredData.value)
    });

    return scripts;
  })
});

// refs
const containerMainRef = ref(null);
const containerGalleryRef = ref(null);
const productImages = ref([]);
const loadState = ref(true);
const swiperKey = ref(0);
const isDescriptionCollapsed = ref(false);
const counter = ref(1);
const productQuantity = ref(1);

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

const onBlur = () => {
  if (!counter.value || counter.value < 1) {
    counter.value = 1;
    productQuantity.value = 1;
  } else if (counter.value > availableQuantity.value) {
    counter.value = availableQuantity.value;
    productQuantity.value = availableQuantity.value;
  }

  productQuantity.value = counter.value;
  // recalc(item);
};

// const decrement = () => {
//   if (counter.value > 1) {
//     productQuantity.value--;
//     counter.value--;
//     // recalc(item);
//   }
// };

const decrement = () => {
  if (counter.value > 1) {
    counter.value--;
  }
};

// const increment = (type) => {
//   const calcProduct = () => {
//     if (productStore.selectedProducts.availableProduct > counter.value) {
//       productQuantity.value++;
//       counter.value++;
//     }
//   };

//   const calcOption = () => {
//     if (selectedOption.value.optionStock > counter.value) {
//       productQuantity.value++;
//       counter.value++;
//     }
//   };

//   if (type === "product") {
//     console.log("product");
//     calcProduct();
//   } else if (type === "option") {
//     console.log("option");
//     calcOption();
//   }
// };

const increment = () => {
  if (counter.value < availableQuantity.value) {
    counter.value++;
  }
};

// const recalc = (item) => {
//   const newPrice = item.quantity * Number(item.product.productPrice);
//   cartStore.updateProduct(item.product.id, item.quantity, newPrice);
// };

// const counterValidate = () => {
//   if (counter.value < 1) {
//     counter.value = 1;
//   }
// };

const isProductInWishlist = computed(() => {
  return wishlistStore.wishlist.some((item) => item.id === productStore.selectedProducts.id);
});

const handleWishlistToggle = () => {
  if (isProductInWishlist.value) {
    wishlistStore.removeProduct(productStore.selectedProducts);
  } else {
    wishlistStore.addProduct(productStore.selectedProducts);
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

    // Handle API response structure
    const productData = res.data || res;

    productStore.setSelectedProducts(productData);

    productImages.value = Array.isArray(productData.images) ? productData.images : [];

    // Update SEO when product data loads
    if (productData && productData.translations?.[0]) {
      const category = indexStore.fetchedCategories.find(
        (cat) => cat.group.toLowerCase() === categoryId
      );
      const description =
        productData.translations[0].productDescription ||
        productData.translations[0].description ||
        "";
      const shortDesc =
        description.length > 150 ? description.substring(0, 150) + "..." : description;
      const shortDescOg =
        description.length > 100 ? description.substring(0, 100) + "..." : description;

      useHead({
        title: `${productData.translations[0].title} - Tilo Lab | ${category?.translations?.[0]?.title || "Інтимні товари"}`,
        meta: [
          {
            name: "description",
            content: `${shortDesc} Купити з доставкою по Україні. Анонімна упаковка.`
          },
          { property: "og:title", content: productData.translations[0].title },
          { property: "og:description", content: shortDescOg },
          {
            property: "og:image",
            content:
              productData.img && productData.img.length > 0
                ? typeof productData.img[0] === "string"
                  ? productData.img[0]
                  : productData.img[0]?.path || "https://tilolab.com.ua/images/about-main.webp"
                : "https://tilolab.com.ua/images/about-main.webp"
          },
          {
            property: "og:url",
            content: `https://tilolab.com.ua/products/${categoryId}/${productId}`
          },
          { name: "twitter:card", content: "summary_large_image" }
        ]
      });
    }

    return productImages.value;
  } catch {
    console.error("Error fetching product");
    return [];
  } finally {
    loadState.value = false;
  }
};

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 3000);
};

const addToCart = () => {
  const option = selectedOption.value;

  const existingItem = cartStore.cart.find(
    (el) =>
      el.product.id === productStore.selectedProducts.id && el.optionId === (option?.id || null)
  );

  const available = availableQuantity.value;

  if (existingItem) {
    if (counter.value + existingItem.quantity > available) {
      // alert("Перевищено доступну кількість");
      tooltip({ status: "error", message: "Перевищено доступну кількість" });

      return;
    }
  }

  const price =
    option?.optionPrice ||
    (productStore.selectedProducts.discountPercent > 0
      ? discountedPrice.value
      : productStore.selectedProducts.productPrice);

  const total = price * counter.value;

  cartStore.addProduct(productStore.selectedProducts, counter.value, total, option);

  // alert("Товар додано в кошик");
  tooltip({ status: "success", message: "Товар додано в кошик" });

  counter.value = 1;
};

onMounted(async () => {
  await fetchProductById();
  // Force re-initialization of swipers when route changes
  swiperKey.value += 1;
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

    .options_wrapper {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 5px;
    }

    .option_item {
      width: 100px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      overflow: hidden;
      border-radius: 5px;
      filter: grayscale(0.75) brightness(0.75);
      cursor: pointer;
      gap: 5px;
      img {
        width: 100px;
        height: 100px;
        aspect-ratio: 1 / 1;
      }
      svg {
        fill: var(--transparent-fill);
      }
    }

    .selected_option {
      filter: grayscale(0) brightness(1);

      border: 1px solid var(--accent-color);
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

      &.selected {
        svg path {
          stroke: var(--accent-color);
        }

        span {
          color: var(--accent-color);
        }
      }

      @media screen and (max-width: 480px) {
        gap: 8px;
        padding-bottom: 6px;
      }
    }

    .availability,
    .running_out,
    .no_available {
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

    .running_out {
      .accent {
        color: var(--warning-border);
      }
    }

    .no_available {
      span {
        color: var(--accent-red);
        font-size: 1rem;
        font-weight: 600;
      }
    }

    .product_quantity {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;

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
        aspect-ratio: 1 /1;
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
        stroke: var(--text-color);
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
        border: 1px solid var(--border-color);
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
      }
      .not_allowed_btn {
        @include mixins.transparentBtn;
        background: var(--transparent-fill);
        border: 0;
        width: 100%;
        text-align: center;
        cursor: not-allowed;
        @media screen and (min-width: 1024px) {
          &:hover {
            border: 0;
          }
        }
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
      white-space: pre-line;

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
  overflow: hidden;

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
