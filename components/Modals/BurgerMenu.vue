<template>
  <div class="burger_inner_overlay" @click.self="closeBurgerMenu">
    <div class="burger_modal_content" ref="burgerRef">
      <div class="burger_menu_top">
        <button class="button_wrapper" @click="closeBurgerMenu">
          <div class="icon_wrap">
            <CloseIcon />
          </div>
        </button>
        <ul class="burger_menu_nav">
          <li @click="closeBurgerMenu('/about-us')">Про нас</li>
          <li @click="closeBurgerMenu('/products')">Каталог</li>
          <li @click="closeBurgerMenu('/faq')">FAQ</li>
          <li @click="closeBurgerMenu('/wishlist')">Список бажань</li>
        </ul>
      </div>
      <div class="burger_menu_user" @click="closeBurgerMenu('/auth/login')">
        Особистий кабінет
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from "~/assets/icons/close-icon.svg";

import { ref, onMounted } from "vue";
import { useModalStore } from "@/store/modal-store";
import gsap from "gsap";

const modalStore = useModalStore();
const burgerRef = ref(null);

onMounted(() => {
  gsap.fromTo(
    burgerRef.value,
    {
      x: "100%",
      opacity: 0,
    },
    {
      x: "0%",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    }
  );
});

const closeBurgerMenu = (link) => {
  if (link.length) {
    navigateTo(link);
  }
  gsap.to(burgerRef.value, {
    x: "100%",
    opacity: 0,
    duration: 0.45,
    ease: "power4.in",
    onComplete: () => {
      modalStore.closeModal();
    },
  });
};
</script>

<style lang="scss">
.burger_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.burger_modal_content {
  width: clamp(300px, 20vw, 400px);
  //   border: 1px solid #302029;
  background: var(--bg-color);
  padding: 20px;
  height: 100dvh;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 50px;
  gap: 40px;
}

.burger_menu {
  display: none;
  @media screen and (max-width: 1024px) {
    position: fixed;
    background-color: rgba(13, 11, 13, 0.9);
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

    &_top {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      gap: 10px;
      .button_wrapper {
        display: flex;
        justify-content: flex-end;
        cursor: pointer;
        align-items: center;
        width: 100%;

        .icon_wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 24px;
          height: 24px;
          svg {
            padding: 5px;
            stroke: var(--text-color);
          }
        }
      }
    }
    &_nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      gap: 16px;
      li {
        color: var(--text-color);
        text-align: right;
        font-family: "Montserrat" sans-serif;
        font-size: 1.0625rem;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        letter-spacing: 0.34px;
        padding: 4px;
      }
    }
    &_user {
      color: var(--text-color);
      text-align: right;
      font-family: "Montserrat" sans-serif;
      font-size: 1.0625rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.34px;
      padding: 4px;
    }
  }
}
.burger_menu_active {
  right: 0;
  transition: all ease 0.3s;
}
</style>
