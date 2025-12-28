<template>
  <div class="wishlist_item_card_wrapper">
    <div class="remove_button">
      <SvgIcon name="close" size="micro" />
      <span>х Видалити</span>
    </div>

    <div class="wishlist_item_card">
      <div :v-if="props.product.discountPercent !== 0" class="action_label">Акція</div>

      <div class="img_container">
        <img :src="props.product.img[0].path" alt="product" />
      </div>
      <div class="description_content">
        <h3>{{ props.product.translations[0].title }}</h3>
        <div class="price_content">
          <div
            class="price"
            :style="props.product.discountPercent > 0 ? { 'text-decoration': 'line-through' } : {}"
          >
            {{ props.product.productPrice }} грн
          </div>

          <div v-if="props.product.discountPercent > 0" class="discount_price">
            {{ discountedPrice }} грн
          </div>
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
import SvgIcon from "@/components/shared/SvgIcon.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const discountedPrice = computed(() => {
  const p = props.product.productPrice;
  const d = props.product.discountPercent;
  return Math.round(p - (p * d) / 100);
});

// const selectProduct = (product) => {
//   productStore.setSelectedProducts(product);
// };

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
  }
  .discount_price {
    color: var(--accent-color);
  }
}
</style>
