<template>
  <div class="wishlist_item_card_wrapper">
    <div class="remove_button">
      <CloseIcon class="remove_icon" />

      <span>Видалити</span>
    </div>

    <div class="wishlist_item_card">
      <div v-if="hasDiscount" class="action_label">Акція</div>

      <NuxtLink :to="props.link" class="img_container">
        <img v-if="props.product.img[0].path" :src="props.product.img[0].path" alt="product" />

        <img
          v-else
          alt="No Image"
          src="https://placehold.co/384x488/000000/ff86bb?font=montserrat&text=No+Image"
          class="card_img"
        />
      </NuxtLink>
      <div class="description_content">
        <NuxtLink :to="props.link">
          <h3>
            {{ props.product.translations[0].title }}
          </h3>
        </NuxtLink>
        <div class="price_content">
          <div class="price" :style="hasDiscount ? { 'text-decoration': 'line-through' } : {}">
            {{ props.product.productPrice }} грн
          </div>

          <div v-if="hasDiscount" class="discount_price">{{ discountedPrice }} грн</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useModalStore } from "@/store/modal-store";
// import { useProductStore } from "@/store/product-store";

// const productStore = useProductStore();
// const modalStore = useModalStore();

// let counter = ref(0);
// import SvgIcon from "@/components/shared/SvgIcon.vue";

import CloseIcon from "~/assets/icons/close-icon.svg";

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const discountedPrice = computed(() => {
  const p = props.product.productPrice;
  const d = props.product.discountPercent;
  return Math.round(p - (p * d) / 100);
});

const hasDiscount = computed(() => {
  const percentNumber = Number(props.product.discountPercent);
  return percentNumber && !isNaN(percentNumber) && percentNumber > 0;
});

// const counterControl = (event, operator, quantity) => {
//   event.preventDefault();
//   if (operator === "+") {
//     counter.value = counter.value + quantity;
//   } else if (operator === "-" && counter.value > 0) {
//     counter.value = counter.value - quantity;
//   }
// };

// const addToCart = (event, props) => {
//   event.preventDefault();
//   modalStore.showModal("ProductToCart", props);
// };
</script>

<style scoped lang="scss">
.wishlist_item_card {
  overflow: hidden;
  z-index: 20;
  position: relative;
  display: flex;
  display: grid;
  grid-template-rows: 1fr 116px;
  overflow: visible;
  border: 1px solid transparent;
  transition: all ease 0.3s;
  cursor: pointer;
  width: 100%;
  height: 100%;
  gap: 5px;

  @media screen and (min-width: 1024px) {
    &:hover img {
      transform: scale(1.1);
      transition: all ease 0.3s;
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 80px;
    gap: 10px;
  }

  .img_container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 1/1;
    transition: all ease 0.3s;
  }
  h3 {
    color: var(--text-color);
    font-size: clamp(0.8rem, 2vw, 1.4rem);
    transition: all ease 0.3s;
    font-weight: 500;
  }

  .action_label {
    position: absolute;
    top: 0;
    right: 0;
    color: black;
    background: var(--accent-color);
    padding: 5px 25px;
    font-size: 1.1rem;
    z-index: 1;
  }

  .description_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    transition: all ease 0.3s;
    width: 100%;
    height: 100%;
    gap: 0.5rem;
    flex: 1;
  }

  .price_content {
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;

    font-size: 1.6rem;
    font-weight: 600;

    @media screen and (max-width: 768px) {
      font-size: 15px;
      gap: 8px;
    }
  }
  .discount_price {
    color: var(--discount-price);
  }
}

.remove_button {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
  .remove_icon {
    width: 20px;
    height: 20px;
    margin-right: 4px;
    stroke: var(--accent-color);
  }
}
</style>
