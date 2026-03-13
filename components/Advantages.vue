<template>
  <section class="advantages">
    <div class="container">
      <div ref="titleRef" class="advantages_title">
        <h5>Наші переваги</h5>
      </div>
      <div ref="wrapperRef" class="advantages_wrapper">
        <div
          v-for="item in advantageData"
          :key="item.id"
          :ref="setReviewRef"
          class="advantages_item"
        >
          <div class="item_bg"></div>
          <div class="item_icon">
            <component :is="item.icon" />
          </div>
          <div class="item_text">
            <strong>
              {{ item.strongText }}
            </strong>
            <p>
              {{ item.mainText }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ICONS
import Advantage1 from "@/assets/icons/advantage1.svg";
import Advantage2 from "@/assets/icons/advantage2.svg";
import Advantage3 from "@/assets/icons/advantage3.svg";
// import Advantage4 from "@/assets/icons/advantage4.svg";
import Advantage5 from "@/assets/icons/advantage5.svg";
import Advantage6 from "@/assets/icons/advantage6.svg";
import Advantage7 from "@/assets/icons/advantage7.svg";

// IMPORTS
import { shallowRef, ref, onMounted, onBeforeUpdate, nextTick } from "vue";

const advantageData = shallowRef([
  {
    id: 1,
    icon: Advantage1,
    strongText: "Вишуканий вибір",
    mainText: "Ексклюзивна колекція товарів для чуттєвих моментів та особливих відчуттів."
  },
  {
    id: 2,
    icon: Advantage2,
    strongText: "Приватний онлайн-шопінг",
    mainText: "Комфортні та повністю конфіденційні покупки — легко, швидко та без зайвих кроків."
  },
  {
    id: 3,
    icon: Advantage3,
    strongText: "Делікатна експрес-доставка",
    mainText: "Оперативне оформлення замовлень і акуратна, непомітна упаковка."
  },
  // {
  //   id: 4,
  //   icon: Advantage4,
  //   strongText: "Безкомпромісна якість",
  //   mainText:
  //     "Ми відбираємо лише продукцію перевірених брендів, що відповідає високим стандартам безпеки та комфорту."
  // },
  {
    id: 4,
    icon: Advantage5,
    strongText: "Зручний сервіс обміну",
    mainText: "Максимально прості та прозорі умови повернення."
  },
  {
    id: 5,
    icon: Advantage6,
    strongText: "Особливі пропозиції",
    mainText: "Преміальні товари за привабливою вартістю та ексклюзивні акції для наших клієнтів."
  },
  {
    id: 6,
    icon: Advantage7,
    strongText: "Персональний супровід",
    mainText: "Делікатна консультація та індивідуальний підхід до кожного запиту."
  }
]);

const titleRef = ref(null);
const advantageRefs = ref([]);
const wrapperRef = ref(null);

const setReviewRef = (el) => {
  if (el) {
    advantageRefs.value.push(el);
  }
};

onBeforeUpdate(() => {
  advantageRefs.value = [];
});

onMounted(async () => {
  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  const isDesktop = window.innerWidth >= 1024;

  await nextTick();

  gsap.from(titleRef.value, {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: titleRef.value,
      start: "top 40%",
      once: true
    }
  });

  if (isDesktop) {
    gsap.from(advantageRefs.value, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: "power3.out",
      scrollTrigger: {
        trigger: advantageRefs.value[0],
        start: "top 65%",
        once: true
      }
    });
  } else {
    advantageRefs.value.forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 40%",
          once: true
        }
      });
    });
  }

  ScrollTrigger.refresh();
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.advantages {
  padding: 117px 0 0;
  position: relative;
  width: 100%;
  height: auto;
  z-index: 0;
  overflow-x: hidden;

  @media screen and (max-width: 1024px) {
    padding: 65px 0 0;
  }
  @media screen and (max-width: 768px) {
    padding: 56px 0 0;
  }
  @media screen and (max-width: 480px) {
    padding: 41px 0 0;
  }

  h5 {
    color: var(--text-color);
    font-family: "Montserrat", sans-serif;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    margin-bottom: 71px;

    @media screen and (max-width: 1024px) {
      font-size: 1.75rem;
      margin-bottom: 60px;
    }

    @media screen and (max-width: 768px) {
      font-size: clamp(1.5rem, 5vw, 1.75rem);
      margin-bottom: 50px;
    }

    @media screen and (max-width: 480px) {
      font-size: clamp(1rem, 5vw, 1.5rem);
      margin-bottom: 40px;
    }
  }
  &_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-block: 25px;
    position: relative;
    contain: layout;
    gap: 20px;
    top: -10px;

    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &_item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    will-change: transform, opacity;
    transform: translateZ(0);
    align-items: center;
    // border: 1px solid rgba(255, 169, 214, 0.3);
    // border-radius: 15px;
    // background: #161616;
    padding: 20px;
    position: relative;
    // overflow: hidden;

    // position: relative;
    background: #161616;
    border-radius: 15px;
    border: 1px solid rgba(255, 169, 214, 0.3);
    z-index: 1;

    // overflow: hidden;
    gap: 25px;

    .item_bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: #161616;
      border-radius: 15px;
    }
    &::before {
      // content: "";
      // position: absolute;
      // inset: 0;
      // background: radial-gradient(circle, rgba(255, 169, 214, 0.35), transparent 55%);
      // filter: blur(20px);
      // opacity: 0.5;
      // z-index: -1;

      // @media screen and (max-width: 768px) {
      //   & {
      //     inset: -5px;
      //     filter: blur(5px);
      //   }
      // }
      // content: "";
      // position: absolute;
      // inset: -10px;
      // background: radial-gradient(
      //   circle at center,
      //   rgba(255, 169, 214, 0.35),
      //   rgba(255, 169, 214, 0.15),
      //   transparent 70%
      // );
      // opacity: 0.6;
      // transform: scale(1);
      // pointer-events: none;
      // z-index: -1;

      content: "";
      position: absolute;
      inset: -20px;
      background: radial-gradient(
        circle at center,
        rgba(255, 169, 214, 0.35),
        rgba(255, 169, 214, 0.15),
        transparent 55%
      );
      opacity: 0.6;
      z-index: -1;
      pointer-events: none;
    }

    @media screen and (max-width: 768px) {
      align-items: flex-start;
    }
  }

  .item_icon {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    svg {
      width: 50px;
      height: 50px;
      aspect-ratio: 1 / 1;

      @media screen and (max-width: 768px) {
        width: 45px;
        height: 45px;
      }
      @media screen and (max-width: 480px) {
        width: 40px;
        height: 40px;
      }
      @media screen and (max-width: 375px) {
        width: 35px;
        height: 35px;
      }
    }
  }

  .item_text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    gap: 8px;
    z-index: 1;

    strong {
      @include mixins.subtitleText;
      color: white;
      font-weight: 700;
    }
    p {
      color: var(--text-color);
      font-family: "Montserrat", sans-serif;
      font-size: 0.82rem;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
      letter-spacing: 0.36px;

      @media screen and (max-width: 768px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
    }
  }
}
</style>
