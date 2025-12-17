<template>
  <div class="cart_modal_content">
    
    <div class="cart">
        <div class="cart_top">
            <div class="cart_head">
        <h1>Кошик</h1>
        <button
            @click="modalStore.closeModal()"
        >
            X
        </button>
      </div>

      <div class="cart_content">
        <div 
            class="empty_cart"
            v-if="cartStore.cart.length === 0"
        >
            <p>Кошик порожній</p>
        </div>
        <div 
            v-else
            class="cart_item"
            v-for="(item, i) in cartStore.cart"
            :key="i"
            
        >
            <div class="cart_item_main">

                <div class="details">
                    <img :src="item.img[0].path" alt="item-img">
                    <div class="cart_item_description">
                        <p>
                            {{item.translations[0].title}}
                        </p>
                        <span>
                            {{ item.productPrice }}
                            грн.
                        </span>
                    </div>
                </div>



                <button 
                    class="remove_product"
                    @click="cartStore.removeProduct(item)"
                >
                    x
                </button>

            </div>
            <div class="cart_item_counter">
                <div class="cart_item_counter_content">
                    <button class="counter_btn">
                        -
                    </button>
                    <span class="counter_value">
                        1
                    </span>
                    <button class="counter_btn">
                        +    
                    </button>

                </div>
               
            </div>
        </div>

      </div>

        </div>
      

      <div 
        v-if="cartStore.cart.length !== 0"
        class="cart_bottom" 
        >
        <div class="cart_summary">
        <span class="cart_summary_text">
            загалом:

        </span>
        <span>
            0
        </span>

      </div>

      <div class="cart_buttons">
        <button class="accent_btn">
            Оформити замовлення
        </button>
        <NuxtLink 
            to="/cart" 
            class="cart_btn"
            @click="modalStore.closeModal()"
        >
            Переглянути кошик
        </NuxtLink>
      </div>

      </div>

      
    </div>
  </div>
</template>

<script setup>
    import { useModalStore } from '@/store/modal-store';
    import { useCartStore } from '@/store/cart-store';


    const modalStore = useModalStore();
    const cartStore = useCartStore();

    console.log(cartStore.cart, 'cart');



</script>

<style lang="scss">
// border-color: #302029

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
        text-transform: uppercase
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

.cart_content{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    max-height: 55dvh;
    padding-bottom: 2rem;
    overflow-y: auto;
    gap: 1rem;
}

.empty_cart{
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
    justify-content: flex-start ;
    gap: 1rem;


    &_main {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: fit-content;
        overflow: hidden;
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
            width: 35%;
            height: 35%;
            aspect-ratio: 1 / 1;
            object-fit: contain;

        }

        p {
            font-size: 0.8rem;
            font-weight: 600;
        }

        span {
            font-size: 1rem;
        }
    }

    &_counter{
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

        .counter_value {
            font-size: 0.8rem;
            font-weight: 600;
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
    gap: 1rem;

    &_text{
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

    button, a {
        font-weight: 600;
        font-size: 0.8rem;
        padding-block: 10px;
        transition: all ease 0.3s;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        height: 100%

    }

    a {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .accent_btn{
        background-color: var(--btn-color);
        border: 1px solid var(--border-color);

        @media screen and (min-width: 1024px) {
            &:hover {
                background-color: var(--btn-color-hover);
                transition: all ease 0.3s;
            }
        }
    }
    .cart_btn{
        @media screen and (min-width: 1024px) {
            &:hover {
                border: 1px solid var(--border-color);
                transition: all ease 0.3s;
            }
        }
    }
}
</style>
