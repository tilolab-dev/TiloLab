<template>
  <div class="promo_modal_inner_overlay" @click.self="closePopup">
    <div ref="promoModalRef" class="promo_modal_modal_content">
      <div class="promo_modal">
        <div class="promo_modal_top">
          <div class="promo_modal_head">
            <h1>Наші пропозиції</h1>
            <button @click="closePopup">X</button>
          </div>

          <div class="promo_modal_content">
            <ClientOnly>
              <swiper-container
                ref="containerRef"
                :key="swiperKey"
                class="swiper"
                :slides-per-view="1"
                :space-between="10"
              >
                <swiper-slide v-for="slide in slides" :key="slide.id">
                  <a :href="slide.link" target="_blank">
                    <NuxtImg v-if="slide.src" :src="slide.src" :alt="slide.title" />

                    <img
                      v-else
                      alt="No Image"
                      src="https://placehold.co/384x488/000000/ff86bb?font=montserrat&text=No+Image"
                      class="card_img"
                    />
                  </a>
                </swiper-slide>
              </swiper-container>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useModalStore } from "@/store/modal-store";
import gsap from "gsap";

const modalStore = useModalStore();
const promoModalRef = ref(null);
const swiperKey = ref(0);

const slides = ref([
  {
    id: 1,
    src: "/images/index-img/banner.webp",
    link: "https://tiktok.com",
    title: "Slide 1"
  },
  {
    id: 2,
    src: "/images/index-img/hero.webp",
    link: "https://google.com",
    title: "Slide 2"
  }
]);

onMounted(() => {
  gsap.fromTo(
    promoModalRef.value,
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
});

const closePopup = () => {
  gsap.to(promoModalRef.value, {
    x: "100%",
    opacity: 0,
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => {
      modalStore.closeModal();
    }
  });
};
</script>

<style scoped lang="scss">
.promo_modal_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.promo_modal_modal_content {
  width: clamp(800px, 50vw, 1000px);
  border: 1px solid #302029;
  background: var(--bg-color);
  padding: 20px;

  // min-height: 500px;
  max-height: 80vh;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  overflow: hidden;
}
.promo_modal {
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

.promo_modal_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding-right: 20px;
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

.promo_modal_content {
  display: block;
  width: 100%;
  height: fit-content;
  max-height: 55dvh;
  padding-bottom: 1rem;
  overflow-y: auto;
}

.promo_modal_bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  gap: 1.5rem;
}

.promo_modal_buttons {
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
  .promo_modal_btn {
    @media screen and (min-width: 1024px) {
      &:hover {
        border: 1px solid var(--border-color);
        transition: all ease 0.3s;
      }
    }
  }
}
</style>
