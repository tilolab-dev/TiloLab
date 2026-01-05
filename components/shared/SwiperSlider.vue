<template>
  <ClientOnly>
    <div class="button_items">
      <button @click="swiper?.slidePrev()">
        <AngleLeftIcon />
      </button>
      <button @click="swiper?.slideNext()">
        <AngleRightIcon />
      </button>
    </div>

    <swiper-container
      ref="swiperEl"
      class="swiper-container"
      :class="{ 'overflow-visible': props.overflowVisible }"
    >
      <slot />
    </swiper-container>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import AngleLeftIcon from "~/assets/icons/angle-left.svg";
import AngleRightIcon from "~/assets/icons/angle-right.svg";

const props = defineProps({
  overflowVisible: {
    type: Boolean,
    required: false,
    default: false
  }
});

const swiperEl = ref(null);
const swiper = ref(null);

onMounted(async () => {
  await nextTick();

  const el = swiperEl.value;
  if (!el) return;

  Object.assign(el, {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      480: { slidesPerView: 2 },
      769: { slidesPerView: 2.5 },
      1025: { slidesPerView: 3, spaceBetween: 10 }
    }
  });

  el.initialize();

  // ⏳ wait ONE microtask after initialize
  await nextTick();

  swiper.value = el.swiper;
});
</script>

<style lang="scss" scoped>
.swiper-container.overflow-visible::part(container) {
  @media screen and (min-width: 960px) {
    overflow: visible !important;
  }
}

.button_items {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  color: var(--accent-color);
  margin-bottom: 22px;

  button {
    padding: 5px;
    aspect-ratio: 1 / 1;
    font-size: 1rem;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }

  svg {
    width: 5px;
    height: 13px;
  }
}
</style>
