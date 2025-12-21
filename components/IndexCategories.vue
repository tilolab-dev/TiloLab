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
                            Обирай те, що допомагає краще <br/> відчувати себе й своє тіло.
                        </p>

                        <div class="button_items">
                            <button @click="prevSlide">
                                -
                            </button>
                            <button @click="nextSlide">
                                +
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="categories_cards">
                <div
                    class="carousel"
                    ref="carouselRef"
                    :style="{ transform: `translateX(${translateX}px)` }"
                >
                    <div class="card" v-for="n in 6" :key="n">
                    Card {{ n }}
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>


<script setup>
import { ref, onMounted } from 'vue'

const containerRef = ref(null)
const carouselRef = ref(null)

const translateX = ref(0)

let startX = 0
let endX = 0
let step = 300

onMounted(() => {
  const containerLeft =
    containerRef.value.getBoundingClientRect().left

    console.log(containerLeft, 'containerLeft');

  const viewportWidth = window.innerWidth
  const carouselWidth = carouselRef.value.scrollWidth

  console.log(carouselWidth, 'carouselWidth');

//   startX = -containerLeft

  endX = viewportWidth - carouselWidth - containerLeft*2

  console.log(endX, 'endX');
//   translateX.value = startX
})

function nextSlide() {
    console.log('click-next')
  translateX.value = Math.max(translateX.value - step, endX)
}

function prevSlide() {
    console.log('click-prev')
  translateX.value = Math.min(translateX.value + step, startX)
}
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

.head_title, .left_content {
    color: var(--text-color);
    font-family: 'Montserrat', sans-serif;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; 
    letter-spacing: 0.6px;
    text-transform: uppercase;

}

.head_title{
    font-style: italic;
}

.category_description{
    color: var(--text-color);
    text-align: right;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.36px;
}


.head_content{
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


</style>