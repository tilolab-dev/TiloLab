<template>
  <div class="index_categories">
    <div ref="containerRef" class="container">
      <div class="categories_head">
        <div class="head_content">
          <div class="left_content">
            <h4 class="head_title">Будь у моменті.</h4>
            <h5 class="left_content">Створюйте момент удвох</h5>
          </div>
          <div class="right_content">
            <p class="category_description">
              Обирай те, що допомагає краще <br />
              відчувати себе й своє тіло.
            </p>
          </div>
        </div>

        <div class="button_items">
          <button @click="swiper.prev()">
            <AngleLeftIcon />
          </button>
          <button @click="swiper.next()">
            <AngleRightIcon />
          </button>
        </div>
      </div>

      <div class="categories_cards">
        <ClientOnly>
          <swiper-container ref="containerRef">
            <swiper-slide v-for="(slide, idx) in slides" :key="idx" class="card">
              <NuxtLink :to="`/products/${slide.group.toLowerCase()}`" class="card">
                <NuxtImg
                  v-if="slide.categoryImg"
                  :src="slide.categoryImg"
                  :alt="`card ${idx}`"
                  class="card_img"
                  lazy
                />

                <img
                  v-else
                  alt="No Image"
                  src="https://placehold.co/384x488/000000/ff86bb?font=montserrat&text=No+Image"
                  class="card_img"
                />

                <span class="card_title">
                  {{ slide.translations[0].title }}
                </span>
              </NuxtLink>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AngleLeftIcon from "~/assets/icons/angle-left.svg";
import AngleRightIcon from "~/assets/icons/angle-right.svg";

const containerRef = ref(null);
const categories = ref([]);

const swiper = useSwiper(containerRef, {
  effect: "creative",
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    480: {
      slidesPerView: 2
    },
    769: {
      slidesPerView: 2.5
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 10
    }
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400]
    },
    next: {
      shadow: true,
      translate: [0, 0, -400]
    }
  }
});

const slides = computed(() => categories.value);

onMounted(async () => {
  try {
    const getCategories = await $fetch("/api/category");

    if (getCategories && getCategories.data) {
      categories.value = getCategories.data;
      categories.value = [...categories.value, ...categories.value];
    }
  } catch (err) {
    console.log(err);
  }
});
</script>

<style lang="scss" scoped>
.index_categories {
  overflow: hidden;
  padding-block: 109px;

  @media screen and (max-width: 1024px) {
    padding-block: 64px;
  }

  @media screen and (max-width: 768px) {
    padding-block: 52px;
  }

  @media screen and (max-width: 480px) {
    padding-block: 48px;
  }

  @media screen and (max-width: 375px) {
    padding-block: 44px;
  }
}

.categories_cards {
  overflow: visible;
  margin-top: 32px;

  @media screen and (max-width: 1024px) {
    margin-top: 36px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 32px;
  }

  @media screen and (max-width: 480px) {
    margin-top: 24px;
  }
}

.categories_head {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
}

.head_title,
.left_content {
  color: var(--text-color);
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.6px;
  text-transform: uppercase;

  @media screen and (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 1.125rem;
  }
}

.left_content {
  font-style: italic;
}

.right_content {
  @media screen and (max-width: 480px) {
    width: 100%;

    br {
      display: none;
    }
  }
}

.category_description {
  color: var(--text-color);
  text-align: right;
  font-family: "Montserrat", sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.36px;

  @media screen and (max-width: 1024px) {
    font-size: 1.0625rem;
  }

  @media screen and (max-width: 768px) {
    text-align: left;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.875rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 0.75rem;
  }
}

.head_content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 50px;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 16px;
  }
}

swiper-container::part(container) {
  @media screen and (min-width: 960px) {
    overflow: visible !important;
  }
}

.card {
  color: white;
  display: grid;
  grid-template-rows: 488px;
  font-size: 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  @media screen and (min-width: 1024px) {
    &:hover img {
      transform: scale(1.1);
      transition: all ease 0.3s;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .card_title {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: var(--text-color);
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }

  @media screen and (max-width: 480px) {
    min-width: 208px;
    height: 269px;
  }
}

.button_items {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  color: var(--accent-color);
  margin-top: 22px;

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
