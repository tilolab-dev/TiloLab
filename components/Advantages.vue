<template>
  <section class="advantages">
    <div class="container">
      <div class="advantages_title">
        <h5>Наші переваги</h5>
      </div>
      <div class="advantages_wrapper">
        <div v-for="item in advantageData" :key="item.id" class="advantages_item">
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
import Advantage4 from "@/assets/icons/advantage4.svg";
import Advantage5 from "@/assets/icons/advantage5.svg";
import Advantage6 from "@/assets/icons/advantage6.svg";
import Advantage7 from "@/assets/icons/advantage7.svg";

// IMPORTS
import { shallowRef } from "vue";

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
  {
    id: 4,
    icon: Advantage4,
    strongText: "Безкомпромісна якість",
    mainText:
      "Ми відбираємо лише продукцію перевірених брендів, що відповідає високим стандартам безпеки та комфорту."
  },
  {
    id: 5,
    icon: Advantage5,
    strongText: "Зручний сервіс обміну",
    mainText: "Максимально прості та прозорі умови повернення."
  },
  {
    id: 6,
    icon: Advantage6,
    strongText: "Особливі пропозиції",
    mainText: "Преміальні товари за привабливою вартістю та ексклюзивні акції для наших клієнтів."
  },
  {
    id: 7,
    icon: Advantage7,
    strongText: "Персональний супровід",
    mainText: "Делікатна консультація та індивідуальний підхід до кожного запиту."
  }
]);
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.advantages {
  padding: 117px 0 0;
  position: relative;
  width: 100%;
  height: auto;
  z-index: 0;

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
    }

    @media screen and (max-width: 768px) {
      font-size: clamp(1.5rem, 5vw, 1.75rem);
    }

    @media screen and (max-width: 480px) {
      font-size: clamp(1rem, 5vw, 1.5rem);
    }
  }

  &_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

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
    align-items: center;
    border: 1px solid rgba(255, 169, 214, 0.3);
    border-radius: 15px;
    background: #161616;
    padding: 20px;
    position: relative;
    gap: 25px;
    &::before {
      content: "";
      position: absolute;
      inset: -40px;
      background: radial-gradient(circle, rgba(255, 169, 214, 0.35), transparent 55%);
      filter: blur(40px);
      z-index: -1;

      @media screen and (max-width: 768px) {
        & {
          inset: -5px;
          filter: blur(5px);
        }
      }
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
