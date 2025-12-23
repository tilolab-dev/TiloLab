<template>
  <div class="header">
    <div class="top_header" :class="catalogBtnState ? 'top_header_active' : ''">
      <div class="container">
        <div class="main_header">
          <NuxtLink to="/">
            <h1 class="main_header_logo">Tilo Lab</h1>
          </NuxtLink>

          <div class="main_header_content">
            <nav class="desktop_navigation">
              <NuxtLink to="/about-us" class="nav_element">
                Про нас
              </NuxtLink>
              <div
                class="nav_element"
                @click="catalogBtnState = !catalogBtnState"
              >
                  Каталог
                <LocalSvgIcon image="angle-down" />
              </div>
              <div class="nav_element">
                <NuxtLink to="/faq">
                  FAQ
                </NuxtLink>
              </div>
            </nav>

            <div class="search_block">
              <input type="text" placeholder="Пошук..." />
              <button class="desktop_search_btn">
                <LocalSvgIcon image="search-icon" />
              </button>
              <button class="mobile_search_btn" @click="mobileSearch = !mobileSearch">
                <LocalSvgIcon image="search-icon" />
              </button>
            </div>
          </div>

          <div class="main_header_buttons">
            <button class="user_btn">
              <LocalSvgIcon image="profile" />
            </button>
            <NuxtLink to="/wishlist" class="wishlist_btn">
              <LocalSvgIcon image="heart" />
            </NuxtLink>
            <button @click="modalStore.showModal('CartModal')" class="cart_btn">
              <LocalSvgIcon image="cart" />
              <div
                class="quantity_label"
                v-if="mounted && cartStore?.cart?.length !== 0"
              >
                {{ cartStore?.cart?.length }}
              </div>
            </button>
            <button @click="burger = !burger" class="burger_btn">
              <LocalSvgIcon image="burger" />

            </button>
            
          </div>
        </div>
      </div>
      <div class="mobile_menu " :class="burger ? 'mobile_menu_active': ''">
        <div class="mobile_menu_top">
          <button 
            class="button_wrapper"
            @click="burger = !burger"
          >
            <LocalSvgIcon image="close-icon" />

          </button>
            <ul class="mobile_menu_nav">
              <li>
                <NuxtLink to="/about-us">
                  Про нас
                </NuxtLink>
              </li>
              <li>
                Каталог
              </li>
              <li>
                <NuxtLink to="/faq">
                  FAQ
                </NuxtLink>
              </li>
              <li>
                Список бажань
              </li>
            </ul>

        </div>
        <div class="mobile_menu_user">
          Особистий кабінет
        </div>
      </div>
    </div>

    <div
      class="header_catalog"
      :class="catalogBtnState ? 'header_catalog_active' : ''"
    >
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
          {{ item.translations[0].title }}
        </NuxtLink>
      </nav>
    </div>

    <div class="mobile_search" :class="mobileSearch ? 'mobile_search_active': ''">
      <input type="text" placeholder="Пошук">
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
// import { useModalStore, useIndexStore, useCartStore,  } from "#imports";

import { useModalStore } from "@/store/modal-store";
import { useIndexStore } from "@/store/index-store";
import { useCartStore } from "@/store/cart-store";

import LocalSvgIcon from "./LocalSvgIcon.vue";
import Loader from "./shared/Loader.vue";

const catalogBtnState = ref(false);
const burger = ref(false);
const mobileSearch = ref(false);

const modalStore = useModalStore();
const indexStore = useIndexStore();
const cartStore = useCartStore();

const loaderState = ref(false);
const mounted = ref(false);

watch(burger, () => {
  burger.value ? 
    document.body.style.overflow = "hidden" : 
    document.body.style.overflow = "unset";
})

const fetchCategories = computed(() => indexStore.fetchedCategories);

onMounted(() => {
  loaderState.value = fetchCategories?.value?.length > 0;
  mounted.value = true;
});
</script>

<style lang="scss">
.header {
  width: 100%;
  height: auto;
  background: transparent;
  position: relative;
  z-index: 15;
}

.top_header {
  background: var(--bg-color);
  padding: 10px 0 6px;
  transition: all ease 0.3s;
  position: relative;
  z-index: 15;

  @media screen and (max-width: 1024px) {
    padding-block: 12px;
  }
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
      @media screen and (max-width: 1024px) {
        display: none;
      }
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

      svg {
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover {
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
        @media screen and (max-width: 480px) {
          display: none;
        }
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
        svg {
          transition: all ease 0.3s;
        }
        @media screen and (min-width: 1024px) {
          &:hover svg {
            transition: all ease 0.3s;
            fill: var(--accent-color);
          }
        }
      }
      .mobile_search_btn{
        display: none;
      }

      @media screen and (max-width: 1024px) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .mobile_search_btn{
          display: block;
        }
        .desktop_search_btn{
          display: none;
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

      svg {
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover svg {
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
      transform: translate(60%, -40%);
    }
    .burger_btn {
      display: none;
    }
    @media screen and (max-width: 1024px) {
      & {
        gap: 20px;
      }
      .user_btn, .wishlist_btn {
          display: none;
      }
      .burger_btn{
        display: block;
      }

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

  @media screen and (max-width: 1024px) {
    display: none;
  }
}

.header_catalog_active {
  border-bottom: 1px solid var(--accent-grey);
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  top: 100%;
}

.mobile_search {
  transition: all ease 0.3s;
  background: var(--bg-color);
  display: none;
  padding: 16px 0 20px;
  width: 100%;
  height: auto;
  position: absolute;
  top: -100%;
  left: 0;

  input{
    background: rgba(254, 253, 254, 0.30);
    padding: 8px;
    border-radius: 4px;
    width: 220px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.50);
      font-family: 'Montserrat', sans-serif;
      font-size: 0.6875rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.33px;
    }

  }



  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
    align-items: center;

  }
}

.mobile_search_active {
  top: 100%;
  transition: all ease 0.3s;
}

.mobile_menu{

  display: none;
  @media screen and (max-width: 1024px) {
      position: fixed;
  background-color: rgba(13,11, 13, 0.9);
  backdrop-filter: blur(10px);
  transition: all ease 0.3s;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 90px 36px 40px;
  top: 0;
  right: -100%;
  z-index: 0;

  &_top{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 10px;
    .button_wrapper{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
    }
  }
  &_nav{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    gap: 16px;
    li{
      color: var(--text-color);
      text-align: right;
      font-family: 'Montserrat' sans-serif;
      font-size: 1.0625rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.34px;
      padding: 4px;
    }
  }
  &_user{
    color: var(--text-color);
      text-align: right;
      font-family: 'Montserrat' sans-serif;
      font-size: 1.0625rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.34px;
      padding: 4px;
  }
    
  }

}
.mobile_menu_active {
  right: 0;
  transition: all ease 0.3s;
}
</style>
ß