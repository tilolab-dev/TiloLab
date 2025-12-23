<template>
  <div class="index_popular">
    <div class="container" ref="containerRef">
      <div class="popular_head">
        <div class="head_content">
          <h5 class="left_content">Створюйте момент удвох</h5>
          <div class="right_content">
            <p class="popular_description">
              Обирай те, що допомагає краще <br />
              відчувати себе й своє тіло.
            </p>

            <div class="button_items">
              <button @click="swiper.prev()">
                <LocalSvgIcon image="angle-left" />
              </button>
              <button @click="swiper.next()">
                <LocalSvgIcon image="angle-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="popular_cards">
        <ClientOnly>
          <swiper-container ref="containerPopular"> 

            <swiper-slide
              v-for="(product, i) in popularCards "
              :key="i"
              class="card"

            >
            <NuxtLink :to="`/products/${product.category.group.toLowerCase()}/${product.id}`">
                <ItemCard
                  :product="product"
                  @click="productStore.setSelectedProducts(product)"
                />
              </NuxtLink>


            </swiper-slide>


          </swiper-container>
          <!-- <div
            class="carousel"
            ref="carouselRef"
            :style="{ transform: `translateX(${translateX}px)` }"
          >
            <div v-for="product in popularCards" :key="product.id">
              <NuxtLink :to="`/products/${product.popular.group.toLowerCase()}/${product.id}`">
                <ItemCard
                  :product="product"
                  @click="productStore.setSelectedProducts(product)"
                />
              </NuxtLink>
          </div>
        </div> -->

        </ClientOnly>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/store/product-store";

const containerPopular = ref(null);
const carouselRef = ref(null);
const popularCards = ref([]);
const translateX = ref(0);

const productStore = useProductStore();

let startX = 0;
let endX = 0;
let step = 300;


const swiper = useSwiper(containerPopular, {
  effect: 'creative',
  slidesPerView: 2,
  spaceBetween: 10,
//   breakpoints: {
//     480: {
//       slidesPerView: 2,
//       spaceBetween: 20
//     },
//     640: {
//       slidesPerView: 3,
//       spaceBetween: 30
//     },
//     1024: {
//       slidesPerView: 4,
//       spaceBetween: 40
//     }
//   },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
})

// onMounted(() => {
//   const containerLeft = containerRef.value.getBoundingClientRect().left;

//   console.log(containerLeft, "containerLeft");

//   const viewportWidth = window.innerWidth;
//   const carouselWidth = carouselRef.value.scrollWidth;

//   console.log(carouselWidth, "carouselWidth");


//   endX = viewportWidth - carouselWidth - containerLeft * 2;

//   console.log(endX, "endX");

// });

onMounted(async () => {
  try {
    const getProducts = await $fetch("/api/products");

    popularCards.value = getProducts.data;
    popularCards.value = [...popularCards.value, ...popularCards.value];
    popularCards.value = [...popularCards.value, ...popularCards.value];

    // popularCards.value.push(...getProducts.data);


    console.log(getProducts, "getProducts");
  } catch (err) {
    console.log(err);
  }
});

// function nextSlide() {
//   console.log("click-next");
//   translateX.value = Math.max(translateX.value - step, endX);
// }

// function prevSlide() {
//   console.log("click-prev");
//   translateX.value = Math.min(translateX.value + step, startX);
// }
</script>

<!-- <style lang="scss">
.index_popular {
  overflow: hidden;
  padding-block: 118px;
}

.popular_cards {
  overflow: visible;
  margin-top: 22px;
}

.popular_head {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.head_title,
.left_content {
  color: var(--text-color);
  font-family: "Montserrat", sans-serif;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.popular_description {
  color: var(--text-color);
  text-align: right;
  font-family: "Montserrat", sans-serif;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: 0.36px;
}

.head_content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.carousel {
  display: flex;
  gap: 24px;
  will-change: transform;
  transition: transform 0.4s ease;
}

.card {
  min-width: 280px;
  height: 380px;
  background: #222;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
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
}
</style> -->
<style lang="scss" scoped>
.index_popular {
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

.popular_cards {
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
    justify-content: flex-start;
    align-items: flex-start;

}

.head_title,
.left_content {
    color: var(--text-color);
    font-family: 'Montserrat', sans-serif;
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

.right_content{
    @media screen and (max-width: 480px) {
        width: 100%;
        br{
            display: none;
        }
    }
}


.head_title{
    font-style: italic;
}

.head_title{
    font-style: italic;
}

.popular_description{
    color: var(--text-color);
    text-align: right;
    font-family: 'Montserrat', sans-serif;
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
    overflow: visible !important;
}

.card {
    min-width: 392px;
    height: 489px;
    background: #222;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    img{
        width: 100%;
        height: 100%;
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
        background: rgba(0, 0, 0, 0.60);
        color: var(--text-color);
        text-align: center;
        font-family: 'Montserrat', sans-serif;
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
}
</style>
