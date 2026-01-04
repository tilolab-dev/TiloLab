<template>
  <div class="header">
    <div class="top_header" :class="catalogBtnState ? 'top_header_active' : ''">
      <div class="container">
        <div class="main_header">
          <NuxtLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="130"
              height="65"
              viewBox="0 0 130 65"
              fill="none"
            >
              <path
                d="M111.059 43.0479V22.25H115.248V27.6386H119.291C121.386 27.6386 123.335 28.0896 124.978 29.282C127.371 30.9253 128.273 33.3254 127.974 36.1687C127.676 39.0121 126.178 41.1064 123.488 42.3064C122.441 42.7574 121.241 43.0555 120.048 43.2007H110.922L111.075 43.0479H111.059ZM115.256 40.9536H119.597C121.241 40.9536 122.593 39.9064 123.19 38.2631C123.786 36.4668 123.939 34.5254 123.19 32.7292C122.739 30.933 121.546 29.8858 119.597 29.7329H115.11V41.1064L115.263 40.9536H115.256Z"
                fill="white"
              />
              <path
                d="M102.835 33.1727C102.988 30.7803 101.49 29.1293 99.2427 28.9841C97.2936 28.9841 95.6502 29.435 94.0069 30.4822C93.7088 29.886 93.2578 29.2822 92.9597 28.686C94.305 27.7917 95.6502 27.3407 97.1484 27.0426C99.5408 26.5917 101.941 26.7445 104.035 27.9369C105.984 28.9841 107.031 30.6274 107.031 32.7294V42.9028H98.0503C96.407 42.9028 94.9088 42.7499 93.4107 42.0085C91.7674 41.2595 90.8654 40.0594 90.7202 38.118C90.7202 36.1689 91.3164 34.8237 93.1126 33.9294C94.6107 33.1803 96.2541 33.0351 97.7522 33.0351H102.69L102.843 33.188L102.835 33.1727ZM102.835 35.267H98.7917C98.1955 35.267 97.7446 35.267 97.1484 35.4199C95.9483 35.718 95.1993 36.6199 95.1993 37.9651C95.1993 39.3104 95.7955 40.5104 96.9955 40.6556C98.9446 40.9537 100.886 40.9537 102.682 40.9537V35.1141L102.835 35.267Z"
                fill="white"
              />
              <path
                d="M9.90608 43.0479V24.4896H1.97217V22.2424H22.3267V24.4896H14.2476V43.1932H9.90608V43.0403V43.0479Z"
                fill="white"
              />
              <path
                d="M73.0562 42.9028V22.105H77.3976V40.6633H90.2692V42.9105H73.0638L73.0562 42.9028Z"
                fill="white"
              />
              <path d="M33.394 43.0479V22.25H37.4374V43.0479H33.394Z" fill="white" />
              <path d="M28.9077 43.0479H24.8643V27.9368H28.9077V43.0479Z" fill="white" />
              <path
                d="M26.9659 25.9878C25.6207 25.9878 24.7188 25.0935 24.7188 23.7406C24.7188 22.3877 25.613 21.4934 26.9659 21.4934C28.3188 21.4934 29.2131 22.5406 29.2131 23.7406C29.2131 24.9406 28.3188 25.9878 26.9659 25.9878Z"
                fill="white"
              />
              <path
                d="M59.1377 34.3725C58.8396 31.0782 56.8905 28.5329 53.7491 27.4858C52.2509 27.0348 50.7528 26.7367 49.2623 26.8896C44.9209 27.1877 41.4813 29.4348 41.0303 34.0744C40.7322 36.9178 41.3284 39.4631 43.5756 41.4045C45.3718 43.0479 47.619 43.4988 50.0114 43.4988C52.4038 43.4988 54.651 43.0479 56.4472 41.5497C58.6944 39.6007 59.4434 37.063 59.1377 34.2197V34.3725ZM50.0114 41.7026C47.3209 41.7026 45.2189 38.7064 45.2189 35.2668C45.2189 31.8273 47.3133 28.6858 50.0114 28.6858C52.7095 28.6858 54.8039 31.5292 54.8039 35.2668C54.8039 39.0045 52.7095 41.7026 50.0114 41.7026Z"
                fill="white"
              />
            </svg>
          </NuxtLink>

          <div class="main_header_content">
            <nav class="desktop_navigation">
              <NuxtLink to="/about-us" class="nav_element"> Про нас </NuxtLink>
              <button class="nav_element" @click="catalogBtnState = !catalogBtnState">
                Каталог
                <div class="icon_wrap">
                  <AngleDown />
                </div>
              </button>
              <div class="nav_element">
                <NuxtLink to="/faq"> FAQ </NuxtLink>
              </div>
            </nav>

            <div class="search_block">
              <input type="text" placeholder="Пошук..." />
              <button class="desktop_search_btn">
                <SearchIcon />
              </button>
              <button class="mobile_search_btn" @click="mobileSearch = !mobileSearch">
                <SearchIcon />
              </button>
            </div>
          </div>

          <div class="main_header_buttons">
            <NuxtLink to="/auth/login" class="user_btn">
              <ProfileIcon />
            </NuxtLink>
            <NuxtLink to="/wishlist" class="wishlist_btn">
              <HeartIcon />
            </NuxtLink>
            <button class="cart_btn" @click="modalStore.showModal('CartModal')">
              <CartIcon />
              <div v-if="mounted && cartStore?.cart?.length !== 0" class="quantity_label">
                {{ cartStore?.cart?.length }}
              </div>
            </button>
            <button class="burger_btn" @click="modalStore.showModal('BurgerMenu')">
              <BurgerIcon />
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="mobile_menu " :class="burger ? 'mobile_menu_active': ''">
        
      </div> -->
    </div>

    <div class="header_catalog" :class="catalogBtnState ? 'header_catalog_active' : ''">
      <SharedLoader v-if="!loaderState" />

      <nav v-else>
        <NuxtLink
          v-for="(item, index) in fetchCategories"
          :key="index"
          :to="`/products/${item.group.toLowerCase()}`"
        >
          {{ item.translations[0].title }}
        </NuxtLink>
      </nav>
    </div>

    <div class="mobile_search" :class="mobileSearch ? 'mobile_search_active' : ''">
      <input type="text" placeholder="Пошук" />
    </div>
  </div>
</template>

<script setup>
import AngleDown from "~/assets/icons/angle-down.svg";
import SearchIcon from "~/assets/icons/search-icon.svg";
import ProfileIcon from "~/assets/icons/profile.svg";
import HeartIcon from "~/assets/icons/heart.svg";
import CartIcon from "~/assets/icons/cart.svg";
import BurgerIcon from "~/assets/icons/burger.svg";

import { ref, onMounted, watch } from "vue";
// import { useModalStore, useIndexStore, useCartStore,  } from "#imports";

import { useModalStore } from "@/store/modal-store";
import { useIndexStore } from "@/store/index-store";
import { useCartStore } from "@/store/cart-store";

const catalogBtnState = ref(false);
const burger = ref(false);
const mobileSearch = ref(false);

const modalStore = useModalStore();
const indexStore = useIndexStore();
const cartStore = useCartStore();

const loaderState = ref(false);
const mounted = ref(false);

watch(burger, () => {
  burger.value
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "unset");
});

const fetchCategories = computed(() => indexStore.fetchedCategories);

onMounted(() => {
  loaderState.value = fetchCategories?.value?.length > 0;
  mounted.value = true;
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.header {
  width: 100%;
  height: auto;
  background: transparent;
  position: relative;
  z-index: 15;
}

.top_header {
  background: var(--bg-color);
  padding: 4px 0;
  height: 80px;
  transition: all ease 0.3s;
  position: relative;
  z-index: 15;

  @media screen and (max-width: 1024px) {
    padding-block: 12px;
    height: auto;
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
      padding: 10px;

      .icon_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;

        svg {
          padding: 5px;
          stroke: var(--text-color);
          transition: all ease 0.3s;
        }
      }

      @media screen and (min-width: 1024px) {
        &:hover {
          color: var(--accent-color);
          transition: all ease 0.3s;
        }
        &:hover svg {
          stroke: var(--accent-color);
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
        font-size: 15px;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.45px;

        width: 100%;
        background: var(--transparent-fill);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        backdrop-filter: blur(2px);
        border: 1px solid transparent;

        @media screen and (max-width: 480px) {
          display: none;
        }

        &:hover {
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      }
      input::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      button {
        @include mixins.iconBtn;
        svg {
          transition: all ease 0.3s;
        }
        @media screen and (min-width: 1024px) {
          &:hover svg {
            path {
              transition: all ease 0.3s;
              fill: var(--accent-color);
            }
          }
        }
      }
      .mobile_search_btn {
        display: none;
      }

      @media screen and (max-width: 1024px) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .mobile_search_btn {
          @include mixins.iconBtn;
        }
        .desktop_search_btn {
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

    .cart_btn {
      @include mixins.iconBtn;

      svg {
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover svg {
          path {
            transition: all ease 0.3s;
            stroke: var(--accent-color);
          }
        }
      }
    }

    .wishlist_btn {
      @include mixins.iconBtn;

      svg {
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover svg {
          path {
            transition: all ease 0.3s;
            stroke: var(--accent-color);
          }
        }
      }
    }

    .user_btn {
      @include mixins.iconBtn;

      svg {
        transition: all ease 0.3s;
      }

      @media screen and (min-width: 1024px) {
        &:hover svg {
          path {
            transition: all ease 0.3s;
            fill: var(--accent-color);
          }
        }
      }
    }

    .quantity_label {
      color: white;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 14px;
      font-weight: 600;
      transform: translate(60%, -40%);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .burger_btn {
      display: none;
    }
    @media screen and (max-width: 1024px) {
      & {
        gap: 20px;
      }
      .user_btn,
      .wishlist_btn {
        display: none;
      }
      .burger_btn {
        @include mixins.iconBtn;
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
      transition: color 0.3s ease;

      @media screen and (min-width: 1024px) {
        &:hover {
          color: var(--accent-color);
        }
      }
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

  input {
    background: rgba(254, 253, 254, 0.3);
    padding: 8px;
    border-radius: 4px;
    width: 220px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-family: "Montserrat", sans-serif;
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
</style>
ß
