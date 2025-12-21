<template>

    <div class="index_categories">
        <div class="container" ref="containerRef">



            <div class="categories_head">

                <h4 class="head_title">
                    Будь у моменті.
                </h4>

                <div class="head_content">
                    <h5 class="left_content">
                        Створюйте момент удвох
                    </h5>
                    <div class="right_content">
                        <p class="category_description">
                            Обирай те, що допомагає краще <br /> відчувати себе й своє тіло.
                        </p>

                        <div class="button_items">
                            <button @click="swiper.prev()">
                                -
                            </button>
                            <button @click="swiper.next()">
                                +
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="categories_cards">
                <ClientOnly>
                    <swiper-container ref="containerRef">
                        <swiper-slide
                            v-for="(slide, idx) in slides"
                            :key="idx"
                            class="card"
                        >
                            Slide {{ idx + 1 }}
                        </swiper-slide>
                    </swiper-container>
                </ClientOnly>
            </div>
        </div>
    </div>


</template>


<script setup>
// Create 10 slides
const containerRef = ref(null)
const slides = ref(Array.from({ length: 4 }))

const swiper = useSwiper(containerRef, {
  effect: 'creative',
  slidesPerView: 3,
  spaceBetween: 10,
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
</script>

<style lang="scss">
.index_categories {
    overflow: hidden;
    padding-block: 118px;
}

.categories_cards {
    overflow: visible;
    margin-top: 22px;
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

}

.category_description {
    color: var(--text-color);
    text-align: right;
    font-family: 'Montserrat', sans-serif;
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

swiper-container::part(container) {
    overflow: visible !important;
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
</style>