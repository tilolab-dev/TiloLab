<template>
  <div class="cart_inner_overlay" @click.self="closeCart">
    <div ref="cartRef" class="cart_modal_content">
      <div class="cart">
        <div class="cart_top">
          <div class="cart_head">
            <h1>Кошик</h1>
            <button @click="closeCart">X</button>
          </div>

          <div class="cart_content">
            <div v-if="cartStore.cart.length === 0" class="empty_cart">
              <p>Кошик порожній</p>
            </div>
            <div v-else>
              <div
                v-for="item in cartStore.cart"
                :key="item.product.id"
                ref="items"
                :data-id="item.product.id"
                class="cart_item"
              >
                {{ console.log(item, "item") }}
                <div class="cart_item_main">
                  <div class="details">
                    <img :src="item.product.img?.[0]?.path" alt="item-img" />
                    <div class="cart_item_description">
                      <p>
                        {{ item.product.translations[0].title ?? "" }}
                      </p>
                      <span v-if="item.quantity === 1">
                        {{ item.productPrice.toFixed(2) }}
                        грн.
                      </span>
                      <span v-else>
                        {{
                          // `${item.quantity}x ${item.productPrice} = ${item.productTotalPrice.toFixed(2)}`
                          item.productTotalPrice.toFixed(2)
                        }}
                        грн
                      </span>
                    </div>
                  </div>

                  <!-- <button class="remove_product" @click="cartStore.removeProduct(item)">x</button> -->
                  <button class="remove_product" @click="removeItem(item.product.id)">x</button>
                </div>
                <div class="cart_item_counter">
                  <div class="cart_item_counter_content">
                    <button
                      :class="item.quantity === 1 ? 'counter_btn_disabled' : ''"
                      class="counter_btn"
                      @click="counterHandler.decrement(item)"
                    >
                      <!-- @click="decrement(item)" -->

                      -
                    </button>
                    <!-- v-model.number="item.quantity" -->

                    <input
                      v-model="item.quantity"
                      class="counter_value"
                      type="number"
                      min="1"
                      @blur="counterHandler.onBlur(item)"
                    />

                    <!-- <label :for="`counter-input-${item.product.id}`" class="counter_value">{{
                    item.quantity
                  }}</label> -->

                    <!-- <span class="counter_value"> {{ item.quantity }} </span> -->
                    <button class="counter_btn" @click="counterHandler.increment(item)">
                      <!-- @click="cartStore.updateProduct(item.product.id, 'increment')" -->

                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="cartStore.cart.length !== 0" class="cart_bottom">
          <div class="cart_summary">
            <span class="cart_summary_text"> загалом: </span>
            <span> {{ cartStore.totalPrice.toFixed(2) }} грн </span>
          </div>

          <div class="cart_buttons">
            <button class="accent_btn" @click="goToCheckout">Оформити замовлення</button>
            <!-- <NuxtLink to="/cart" class="cart_btn" @click="modalStore.closeModal()">
              Переглянути кошик
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { counterHandler } from "@/composables/counterHandler";
import { useModalStore } from "@/store/modal-store";
import { useCartStore } from "@/store/cart-store";
import gsap from "gsap";

const modalStore = useModalStore();
const cartStore = useCartStore();
const items = ref([]);

const cartRef = ref(null);

onMounted(() => {
  gsap.fromTo(
    cartRef.value,
    {
      x: "100%",
      opacity: 0
    },
    {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    }
  );
  gsap.from(items.value, {
    y: -40,
    delay: 0.3,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1
  });
});

const removeItem = (id) => {
  const el = items.value.find((e) => +e.dataset.id === id);

  if (!el) {
    console.log("id not found");
    return;
  }

  gsap.to(el, {
    x: 120,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete() {
      gsap.to(el, {
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete() {
          cartStore.removeProduct(id);
        }
      });
    }
  });
};

const closeCart = () => {
  gsap.to(cartRef.value, {
    x: "100%",
    opacity: 0,
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => {
      modalStore.closeModal();
    }
  });
};
const goToCheckout = () => {
  navigateTo("/checkout");
  setTimeout(() => {
    closeCart();
  }, 50);
};
</script>

<style scoped lang="scss">
// border-color: #302029

.cart_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.cart_modal_content {
  width: clamp(300px, 20vw, 400px);
  border: 1px solid #302029;
  background: var(--bg-color);
  padding: 20px;

  min-height: 500px;
  max-height: 80vh;

  position: absolute;
  top: 10%;
  right: 5%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}
.cart {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  gap: 1.5rem;
  flex: 1;

  &_top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.5rem;
    width: 100%;
    height: 100%;
  }
}

.cart_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  z-index: 1;

  h1 {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  button {
    color: white;
    transition: all ease 0.3s;
    cursor: pointer;
  }

  @media screen and (min-width: 1024px) {
    & button:hover {
      color: var(--accent-color);
      transition: all ease 0.3s;
    }
  }
}

.cart_content {
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // justify-content: flex-start;
  display: block;
  width: 100%;
  height: fit-content;
  max-height: 55dvh;
  padding-bottom: 2rem;
  overflow-y: auto;
}

.empty_cart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--accent-color);
  position: absolute;
  transform: translateY(-10%);
}

.cart_item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 15px;
  overflow: hidden;
  gap: 1rem;

  &_main {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    // height: fit-content;
    // overflow: hidden;
    width: 100%;
    gap: 0.5rem;

    .remove_product {
      cursor: pointer;
      width: 20px;
      height: 20px;
      aspect-ratio: 1 / 1;
    }
  }

  .details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.5rem;

    .cart_item_description {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    img {
      width: 80px;
      height: 80px;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    p {
      font-size: 0.8rem;
      font-weight: 600;
    }

    span {
      font-size: 1rem;
      white-space: nowrap;
    }
  }

  &_counter {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: fit-content;

    &_content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
    }

    // .counter_input {
    //   display: none;
    // }

    .counter_value {
      font-size: 0.8rem;
      font-weight: 600;
      width: 30px;
      text-align: center;
    }
  }

  .counter_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent-color);
    color: var(--bg-color);
    font-weight: 500;
    width: 20px;
    height: 20px;
  }
}

.cart_bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  gap: 1.5rem;
}

.cart_summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding-right: 20px;
  gap: 1rem;

  &_text {
    font-weight: 600;
  }
}

.cart_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  gap: 0.7rem;

  button,
  a {
    font-weight: 600;
    font-size: 0.8rem;
    padding-block: 10px;
    transition: all ease 0.3s;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .accent_btn {
    background-color: var(--btn-color);
    border: 1px solid var(--border-color);

    @media screen and (min-width: 1024px) {
      &:hover {
        background-color: var(--btn-color-hover);
        transition: all ease 0.3s;
      }
    }
  }
  .cart_btn {
    @media screen and (min-width: 1024px) {
      &:hover {
        border: 1px solid var(--border-color);
        transition: all ease 0.3s;
      }
    }
  }
}
</style>
