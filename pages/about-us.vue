<template>
  <section class="about_us">
    <div class="container">
      <h1>Про нас</h1>

      <div class="about_us_content">
        <div class="about_us_content_main">
          <div class="main_text">
            <h2>
              Tilo Lab —
              <span class="accent_text">це сучасний простір</span> дослідження інтимного здоров’я,
              задоволення та тілесної гармонії.
            </h2>

            <div class="text_wrapper">
              <p>
                Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у
                відповідальний та делікатний сервіс.
              </p>

              <p>
                Наша філософія базується на ідеї, що
                <span class="accent_text"> чуттєвість — це природна частина людини. </span>
                Саме тому ми ретельно досліджуємо кожен продукт, який потрапляє в нашу колекцію: від
                складу та матеріалів до ефективності й безпеки.
              </p>
            </div>
          </div>
          <NuxtImg
            class="main_img"
            src="./images/index-img/banner.webp"
            alt="preview"
            width="500"
            height="500"
            quality="80"
            priority
            sizes="500px"
          />
        </div>
        <div class="about_us_content_secondary">
          <NuxtImg
            class="secondary_img"
            src="./images/index-img/banner.webp"
            quality="80"
            alt="preview"
            width="500"
            height="350"
            priority
            sizes="500px"
          />
          <div class="secondary_text">
            <p>
              У Tilo Lab ми прагнемо створити простір, де кожен може вільно й безпечно пізнавати
              себе, розширювати межі власного комфорту та насолоди. Ми забезпечуємо повну
              конфіденційність, професійний супровід і естетичний підхід до кожної деталі — від
              консультацій до оформлення замовлень.
            </p>
            <p>
              Наше завдання — не просто продавати девайси та косметику. Ми формуємо культуру
              тілесної обізнаності, підтримуємо індивідуальні дослідження власної чуттєвості та
              допомагаємо людям будувати здорові,
              <span class="accent_text"> усвідомлені стосунки зі своїм тілом. </span>
            </p>
          </div>
        </div>
        <div class="about_us_content_summary">
          <h3>
            <span class="italic_text"> Tilo Lab </span>
            — лабораторія, де кожне відкриття починається з тебе.
          </h3>
        </div>

        <div class="about_us_content_summary">
          <h3>TEST TEST TEST</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.about_us {
  margin-top: 40px;

  h1 {
    @include mixins.titleText;
  }

  &_content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 40px;
    margin-bottom: 100px;
    width: 100%;
    height: 100%;
    gap: 80px;

    &_main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      .main_text {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 20px;
      }
    }

    &_secondary {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      gap: 20px;

      img {
        object-fit: cover;
      }

      @media screen and (max-width: 1024px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }

    &_summary {
      margin-top: 20px;
      h3 {
        color: var(--text-color, #fff);
        font-family: "Montserrat", sans-serif;
        font-size: 2rem;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        letter-spacing: 0.64px;
        text-transform: uppercase;

        .italic_text {
          font-style: italic;
          color: var(--accent-color, #ffa9d6);
        }

        @media screen and (max-width: 480px) {
          font-size: 1.375rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 1.25rem;
        }
      }

      @media screen and (max-width: 480px) {
        margin-top: 16px;
      }
      @media screen and (max-width: 375px) {
        margin-top: 8px;
      }
    }

    @media screen and (max-width: 1024px) {
      gap: 20px;
    }

    @media screen and (max-width: 480px) {
      gap: 12px;
    }
  }

  .main_img {
    width: 500px;
    height: 500px;
    object-fit: cover;
    aspect-ratio: 1 / 1;

    @media screen and (max-width: 1024px) {
      display: none;
    }
  }

  h2 {
    color: var(--text-color, #fff);
    font-family: "Montserrat", sans-serif;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0.8px;
    text-transform: uppercase;

    @media screen and (max-width: 1024px) {
      font-size: 2rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 1.375rem;
    }

    @media screen and (max-width: 375px) {
      font-size: 1.25rem;
    }
  }

  p {
    @include mixins.mainText;
  }

  .accent_text {
    color: var(--accent-color);
  }

  .text_wrapper,
  .secondary_text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;

    @media screen and (max-width: 1024px) {
      gap: 8px;
    }
  }

  .secondary_text {
    gap: 20px;

    @media screen and (max-width: 1024px) {
      gap: 8px;
    }
  }

  @media screen and (max-width: 1024px) {
    max-width: 80vw;
  }

  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
}
</style>
