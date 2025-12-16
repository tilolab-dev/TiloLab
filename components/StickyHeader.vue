<template>
  <div class="header">
    <div class="top_header" :class="catalogBtnState ? 'top_header_active' : ''">
      <div class="container">
        <div class="main_header" >
          <NuxtLink
            to="/"
          >
            <h1 class="main_header_logo">Tilo Lab</h1>
        
          </NuxtLink>

          <div class="main_header_content">
            <nav>
              <div class="nav_element">
                Про нас
                <SvgIcon name="header-arrow-down" size="micro" fill="white" />
              </div>
              <div 
                class="nav_element"
                @click="catalogBtnState = !catalogBtnState"
              >
                Каталог
                <SvgIcon name="header-arrow-down" size="micro" fill="white" />
              </div>
              <div class="nav_element">
                FAQ
                <SvgIcon name="header-arrow-down" size="micro" fill="white" />
              </div>
            </nav>

            <div class="search_block">
              <input type="text" placeholder="Пошук..." />
              <button>
                <SvgIcon name="header-search" size="big" fill="white" />
              </button>
            </div>
          </div>

          <div class="main_header_buttons">
            <button>
              <SvgIcon name="header-user-icon" size="big" fill="white" />
            </button>
            <button>
              <SvgIcon name="header-heart" size="big" fill="white" />
            </button>
            <button
              @click="modalStore.showModal('CartModal')"
            >
              <SvgIcon name="header-shop-icon" size="big" fill="white" />
              <div 
                class="quantity_label"
                v-if="cartStore.cart.length !== 0"
              >
                {{ cartStore.cart.length }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="header_catalog" :class="catalogBtnState ? 'header_catalog_active' : ''">

      <div class="loader_wrapper" v-if="!loaderState">
        <Loader />
        Завантаження


      </div>


      <nav v-else>
        <NuxtLink
          v-for="(item, index) in fetchCategories"
          :to="`/products/${item.group.toLowerCase()}`"
          :key="index"
        >
          {{item.translations[0].title}}
        </NuxtLink>
      
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { useModalStore, useIndexStore, useCartStore,  } from "#imports";

import { useModalStore } from "@/store/modal-store";
import { useIndexStore } from "@/store/index-store";
import { useCartStore } from "@/store/cart-store";

import SvgIcon from "./shared/SvgIcon.vue";
import Loader from "./shared/Loader.vue";

const catalogBtnState = ref(false);

const modalStore = useModalStore();
const indexStore = useIndexStore();
const cartStore = useCartStore();

const loaderState = ref(false);

const fetchCategories = computed(() => indexStore.fetchedCategories);

watch(fetchCategories, (newValue) => {

  loaderState.value = newValue.length > 0;
}, { immediate: true })


// onMounted(() => {
//   cartStore.loadProducts();
// });
</script>

<style lang="scss">
.header {
  width: 100%;
  height: auto;
  background: transparent;
  position: relative;
  z-index: 10;
}

.top_header {
  background: var(--bg-color);
  border-bottom: 1px solid var(--accent-grey);
  transition: all ease 0.3s;
  position: relative;
  z-index: 15;
}
.top_header_active {
  border-bottom: 1px solid transparent;
  transition: all ease 0.3s;


  
}

.main_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 20px;
  min-height: 55px;
  position: sticky;
  top: 0;
  z-index: 100;
  @media screen and (max-width: 764px) {
    display: none;
  }

  &_logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
  }

  &_content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    .nav_element {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: var(--text-color);
      transition: all ease 0.3s;
      font-size: 1.1rem;
      font-weight: 500;
      cursor: pointer;

      svg{
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover  {
          color: var(--accent-color);
          transition: all ease 0.3s;
        }
        &:hover svg {
          fill: var(--accent-color);
          transition: all ease 0.3s;
        }
      }
    }
    .search_block {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.7rem;
      input {
        background: var(--accent-grey);
        color: white;
        padding: 5px 7px;
        border-radius: 5px;
      }
      input::placeholder {
        color: var(--text-color);
      }

      button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        svg{
          transition: all ease 0.3s;

        }
        @media screen and (min-width: 1024px) {

          &:hover svg{
            transition: all ease 0.3s;
            fill: var(--accent-color);
          }
        }
      }

    }
  }

  &_buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    button {
      cursor: pointer;
      position: relative;

      svg{
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover svg{
          fill: var(--accent-color);
          transition: all ease 0.3s;
        }
      }
    }
    .quantity_label {

      color: white;
      position: absolute;
      top: 0;
      right: 0;
      background: var(--accent-color);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transform: translate(60%, -40%)


    }
  }
}

.header_catalog {
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  border-bottom: 1px solid transparent;
  background: var(--bg-color);
  position: absolute;
  top: 0%;


  .loader_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    padding-left: 20%;
    gap: 1rem;
    color: var(--text-color);
    font-size: 1.2rem;
    // padding-block: 10px;
  }

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2vw;

    a {
      color: white;
      font-weight: 500;
      cursor: pointer;
    }
  }
}

.header_catalog_active {
  border-bottom: 1px solid var(--accent-grey);
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  top: 100%;

}
</style>
