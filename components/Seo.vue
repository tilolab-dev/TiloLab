<template>
  <section class="seo">
    <div class="container">
      <div class="seo_title">
        <h6>Інтернет-магазин Tilo Lab</h6>
      </div>

      <div class="text_wrapper">
        <p>
          Ми пропонуємо широкий вибір інтимних товарів для жінок і чоловіків, а також продукцію для
          гармонії у стосунках і нових відчуттів.
        </p>
        <p>
          У нашому асортименті представлені сучасні аксесуари для особистого задоволення, еротична
          білизна, лубриканти та інші товари, що поєднують якість, безпечність і комфорт. Ми
          регулярно оновлюємо колекції та стежимо за актуальними тенденціями ринку.
        </p>
        <p>
          Особливу увагу приділяємо якості продукції. Ми співпрацюємо виключно з перевіреними
          виробниками, які дотримуються високих стандартів виготовлення та використовують безпечні
          матеріали.
        </p>
        <p>
          Асортимент інтернет-магазину Tilo Lab допоможе урізноманітнити особисте життя та додати
          нових емоцій кожному, хто цінує комфорт, конфіденційність і якісний сервіс.
        </p>
        <p>
          Весь асортимент інтернет-магазину Tilo Lab доступний для замовлення онлайн із швидкою та
          делікатною доставкою по Україні.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.seo {
  padding-bottom: 117px;
  position: relative;
  width: 100%;
  height: auto;
  z-index: 0;

  @media screen and (max-width: 1024px) {
    padding-bottom: 65px;
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 56px;
  }
  @media screen and (max-width: 480px) {
    padding-bottom: 41px;
  }

  h6 {
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
      margin-bottom: 51px;
    }

    @media screen and (max-width: 768px) {
      font-size: clamp(1.5rem, 5vw, 1.75rem);
      margin-bottom: 41px;
    }

    @media screen and (max-width: 480px) {
      font-size: clamp(1rem, 5vw, 1.5rem);
      margin-bottom: 31px;
    }
  }

  .text_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;

    p {
      color: var(--text-color);
      font-family: "Montserrat", sans-serif;
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
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
