<template>
  <div class="item_card">
    <!-- @click="selectProduct(props.product)" -->

    <!-- :to="`/products/${props.group.replaceAll(' ', '-').toLowerCase()}/${props.product.id}`" -->
    <!-- flex  rounded-xl w-auto justify-center items-center relative   -->

    <!-- <div class="absolute left-0 top-0 h-16 w-16">
            <div
            class="absolute transform -rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-65px] top-[32px] w-[170px]">
                Знижка 20%
            </div>
        </div> -->

    <!-- <div class="grid grid-cols-5"> -->
    <!-- <div class="options ">
                <div class="option badge-discount">
                    Знижка %
                </div>
                <div  class="option badge-wholesale">
                    Тільки оптом
                </div>
                <div  class="option badge-new">
                    Новинка
                </div>
        </div> -->

    <div class="badge-labels">
      <!-- skew(-12deg) translateX(-4px) -->
      <div class="badge">
        <span>Новинка</span>
      </div>

      <div class="badge">
        <span>Тільки оптом</span>
      </div>

      <div class="badge">
        <span>Знижка</span>
      </div>
    </div>

    <div class="grid-card">
      <!--  -->

      <div class="card-img">
        <!-- <img :src="props.product.img[0].path" alt="demo" class="w-[90%]"/> -->
        <img src="/images/item.png" alt="item" />
      </div>
      <div class="text-content">
        <div class="text-block">
          <h3>
            <!-- {{ props.product.translations.find(translation => translation.language === 'uk').title }} -->
            Title
          </h3>
          <span >
            <!-- {{ props.product.translations.find(translation => translation.language === 'uk').productDescription }} -->
            Lorem ipsum dolor, assumenda beatae sapiente sunt deserunt velit
            repudiandae sint quasi.
          </span>
        </div>
        <div class="content-block">
          <div
            class="card"
          >
            <div class="card_content">
              <p class="option">Ціна</p>
              <p class="option-value">
                <!-- {{ props.product.price }}  -->
                грн.
              </p>
            </div>
            <div class="card_content">
              <p class="option">Опт. ціна</p>
              <p class="option-value">
                <!-- {{ props.product.wholesalePrice }} -->
                грн.
              </p>
            </div>
            <div class="card_content">
              <p class="option">Діє від</p>
              <p class="option-value">
                <!-- <img src="https://svgshare.com/i/16Fg.svg" /> -->
                <!-- {{ props.product.counterQuantity }}  -->
                шт
              </p>
            </div>
          </div>
          <div
            class="button_group"
          >
            <!-- <div class="bg-white text-gray-500 p rounded-lg border-[1px] border-[var(--secondary-color)]  flex-1 flex justify-between items-center overflow-hidden min-w-16 w-fit">
                        <button 
                            class="hover:bg-red-400 hover:text-white w-full h-full"
                            @click="(e) => counterControl(e, '-', props.product.counterQuantity)"
                        >
                            -
                        </button>
                        <div class="w-[1px] h-full bg-[var(--dark-color)]"/>
                        <span class="w-full h-full flex items-center justify-center">
                            {{ counter }}
                        </span>
                        <div class="w-[1px] h-full bg-[var(--dark-color)]"/>
                        <button 
                            class="hover:bg-green-500 hover:text-white w-full h-full"

                            @click="(e) => counterControl(e, '+', props.product.counterQuantity)"
                        >
                            +
                        </button>
                    </div> -->
            <button
              class="more_btn bg-blue-500 text-white text-[clamp(8px, 0.8vw, 12px)] dark:bg-[var(--dark-color)] py-1 px-2 rounded-lg hover:bg-blue-700 flex-1 flex justify-center items-center gap-1 whitespace-nowrap"
              @click="(e) => addToCart(e)"
            >
              <!-- <SvgIcon name="cart-icon" fill="white" size="micro"/> -->
              <!-- <div class="w-[1px] h-full bg-white"/> -->
              Детальніше...
            </button>
            <button
              class="cart_btn bg-blue-500 text-white text-[clamp(8px, 0.8vw, 12px)] dark:bg-[var(--main-accent)] py-1 px-2 rounded-lg hover:bg-blue-700 flex-1 flex justify-center items-center gap-1 whitespace-nowrap"
              @click="(e) => addToCart(e, props.product)"
            >
              <!-- <SvgIcon name="cart-icon" fill="white" size="micro"/> -->
              <div class="w-[1px] h-full bg-white" />
              В кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/store/modal-store";
import { useProductStore } from "@/store/product-store";

// import { useProductStore, useModalStore } from '#imports';

// import SvgIcon from './shared/SvgIcon.vue';

const productStore = useProductStore();
const modalStore = useModalStore();

let counter = ref(0);

// const props = defineProps({
//     product: Object,
//     // group: String,
// })

const props = {
  product: Object,
};

const selectProduct = (product) => {
  productStore.setSelectedProducts(product);
};

const counterControl = (event, operator, quantity) => {
  event.preventDefault();
  if (operator === "+") {
    counter.value = counter.value + quantity;
  } else if (operator === "-" && counter.value > 0) {
    counter.value = counter.value - quantity;
  }
};

const addToCart = (event, props) => {
  event.preventDefault();
  modalStore.showModal("ProductToCart", props);
};
</script>

<style scoped lang="scss">
.item_card {
  overflow: hidden;
  background: #f0feff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 100%;
  z-index: 20;
  border-radius: 0.75rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  position: relative;

  .badge-labels {
    z-index: 10;
    transform: translateX(-0.25rem);
    display: flex;
    height: 1.5rem;
    max-height: 1.5rem;
    align-items: center;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    border-top-left-radius: 16px;

    .badge {
      position: relative;
      border-bottom-right-radius: 0.5rem;
      padding-top: 0.375rem;
      padding-bottom: 0.375rem;
      // padding-left: 0.5rem;
      font-size: 13px;
      line-height: 0.75rem;
      color: #fff;
      background: var(--dark-color);
      z-index: 3;
      padding-left: clamp(16px, 1vw, 20px);
      padding-right: clamp(12px, 1vw, 16px);

      &:nth-child(1) {
        transform: skewX(-12deg) translateX(-0.25rem);
        padding-left: 0.5rem;
      }

      &:nth-child(2) {
        transform: skewX(12deg) translateX(-0.75rem);
      }

      &:nth-child(3) {
        transform: skewX(12deg) translateX(-1.5rem);
      }

      span {
        transform: skewX(12deg);
        white-space: nowrap;
      }
    }

    span {
      font-size: clamp(8px, 1.5vw, 14px);
    }
  }

  .grid-card {
    display: grid;
    grid-template-columns: 1fr;
    height: 100%;

    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 1fr;
    }

    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: column;
      min-height: 400px;
      .card-img {
        flex: 1;
        position: absolute;
        height: 70%;
        width: 100%;
      }
      .text-content {
        flex: 1;
        h3 {
          color: white;
          padding-top: 10px;
        }
        p {
          font-size: clamp(12px, 1.5vw, 18px);
        }
      }
      .button-group {
        flex-direction: column;
      }
    }

    .card-img {
      grid-column: span 2 / span 2;
      padding: 0.25rem;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;

      background: rgb(56, 6, 56);

      img {
        width: 90%;
        height: auto;
      }
      @media screen and (max-width: 1024px) {
        border-right: unset;
        & {
          img {
            max-width: 70%;
            transform: translateY(10%);
          }
        }
      }
    }

    .text-content {
      grid-column: span 3 / span 3;
      padding: 0.75rem;
      padding-top: 1.5rem;
      z-index: 20;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.5rem;

      .text-block {
        h3 {
            font-weight: 700;
            color: var(--dark-color);
          font-size: clamp(16px, 1.5vw, 20px);
        }
        span{
            margin-bottom: 10px;
        }

        @media screen and (max-width: 1024px) {
            color: white;

            span{
                display: none;
            }
        }
      }

      .content-block{
        .card{
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 5px;
            color: #6b7280;
            background: #e5e7eb;
            border: 1px solid var(--secondary-color);
            border-radius: 0.5rem;
            padding: 0.5rem;

            &:focus {
                background: #ffffff;
            }
            @media (max-width: 640px) {
                .your-class {
                    padding-left: 0;
                    padding-right: 0;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    gap: 0.25rem;
                }
            }

            .card_content{
                text-align: center;
                .option{
                    font-size: 0.875rem;
                }
                .option-value{
                    font-weight: 700;
                    color: #1f2937;
                }
            }
        }
      }

      .button_group{
        display: flex;
        margin-top: 0.75rem;
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;

        button {
  color: #ffffff;
  font-size: clamp(8px, 0.8vw, 12px);
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  transition: background 0.2s;
  cursor: pointer;

  
}

.cart_btn {
  background: #dc0c5c;

  .dark & {
    background: var(--main-accent);
  }

  &:hover {
    background: #6f0c32;

  }
}

.more_btn {
  background: #ab3bf6;

  .dark & {
    background: var(--dark-color);
  }
  &:hover {
  background: #571e7d;


  }
}
      }
    }
  }
}
</style>
