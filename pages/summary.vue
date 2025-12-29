<template>
  <section class="summary">
    <div class="container">
      <div class="summary_wrapper">
        <div class="summary_head">
          <h1>Ваше замовлення прийнято!</h1>
          <p>
            Дякуємо, що обрали нас. Ми вже обробляємо ваше замовлення — найближчим часом ви
            отримаєте SMS з підтвердженням та деталями доставки.
          </p>
          <p class="order_number">
            <strong> Номер замовлення: №{12345} </strong>
          </p>
        </div>
        <div class="summary_content">
          <div class="summary_content_details">
            <h2>Склад замовлення</h2>
            <ul>
              <li>
                <div class="option">Вакуумний стимулятор клітора Air kiss</div>
                <div class="value">1 шт</div>
              </li>
              <li>
                <div class="option">Вагінальні кульки Кегеля</div>
                <div class="value">2 шт</div>
              </li>
              <li>
                <div class="option">Смарт-стимулятор з керуванням через додаток</div>
                <div class="value">1 шт</div>
              </li>
            </ul>
          </div>
          <div class="divider"></div>
          <ul class="summary_content_final">
            <li>
              <div class="option">Сума товарів:</div>
              <div class="value">3 850 грн</div>
            </li>
            <li>
              <div class="option">Вартість доставки:</div>
              <div class="value">за тарифами Нової пошти</div>
            </li>
            <li>
              <div class="option">До сплати:</div>
              <div class="value">3 850 грн (оплата онлайн)</div>
            </li>
          </ul>
          <div class="divider"></div>
          <div class="summary_content_delivery">
            <h3>Доставка</h3>
            <div class="delivery_content">
              <div class="delivery_method">Спосіб:</div>
              <div class="delivery_description">Відділення Нової пошти</div>
            </div>
            <p>Коли замовлення буде передане перевізнику, ви отримаєте SMS з номером ТТН.</p>
          </div>
          <div class="divider"></div>
          <div class="summary_content_next">
            <h4>Що далі?</h4>
            <div class="text_wrapper">
              <p>Ми зберемо та надійно упакуємо ваше замовлення.</p>
              <p>
                Ви завжди можете зв’язатися з нами з будь-яких питань щодо доставки чи зміни даних.
              </p>
            </div>
          </div>
        </div>
        <button class="summary_btn">Повернутися до каталогу</button>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.summary {
  width: 100%;
  height: 100%;
  @include mixins.pageSpacing;
  color: var(--text-color);
  &_wrapper {
    width: 468px;
    height: auto;
    position: relative;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 64px;

    @media screen and (max-width: 1024px) {
      width: 448px;
      gap: 48px;
    }
    @media screen and (max-width: 768px) {
      width: clamp(400px, 85vw, 538px);
    }
    @media screen and (max-width: 480px) {
      width: 100%;
      gap: 40px;
    }
    @media screen and (max-width: 375px) {
      gap: 32px;
    }
  }
}
.summary_head {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  h1 {
    @include mixins.titleText;
  }
  p {
    @include mixins.mainText;
    color: var(--text-grey);
    font-size: 1.125rem;
    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.75rem;
    }
  }
  .order_number {
    @include mixins.subtitleText;
    font-size: 1.125rem;
    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.8125rem;
    }
  }
  @media screen and (max-width: 480px) {
    gap: 12px;
  }
}
.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.05);
}
.summary_content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 22px;

  &_details {
    width: 100%;
    height: auto;
    h2 {
      @include mixins.subtitleText;
      font-size: 1.125rem;
      margin-bottom: 20px;
      @media screen and (max-width: 1024px) {
        font-size: 1rem;
        margin-bottom: 16px;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.9375rem;
        margin-bottom: 14px;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.875rem;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      @media screen and (max-width: 480px) {
        gap: 8px;
      }
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      gap: 20px;
      .option {
        @include mixins.mainText();
        font-size: 1rem;
        color: var(--text-grey);
        @media screen and (max-width: 1024px) {
          font-size: 0.9375rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.8125rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.6875rem;
        }
      }
      .value {
        white-space: nowrap;
        @include mixins.subtitleText;
        font-size: 1rem;
        @media screen and (max-width: 1024px) {
          font-size: 0.9375rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.8125rem;
        }
      }
      @media screen and (max-width: 1024px) {
        gap: 8px;
      }
    }
  }
  &_final {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    gap: 16px;
    li {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      .option {
        @include mixins.subtitleText;
        font-size: 1.125rem;
        @media screen and (max-width: 1024px) {
          font-size: 1.0625rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.875rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.8125rem;
        }
      }
      .value {
        @include mixins.mainText();
        white-space: nowrap;
        font-size: 1rem;
        color: var(--text-grey);
        @media screen and (max-width: 1024px) {
          font-size: 0.9375rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.8125rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.6875rem;
        }
      }
      @media screen and (max-width: 1024px) {
        gap: 12px;
      }
      @media screen and (max-width: 480px) {
        gap: 8px;
      }
    }
    @media screen and (max-width: 480px) {
      gap: 12px;
    }
  }
  &_delivery {
    h3 {
      @include mixins.subtitleText;
      text-transform: uppercase;
      font-size: 1rem;
      margin-bottom: 20px;
      @media screen and (max-width: 1024px) {
        margin-bottom: 16px;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.9375rem;
        margin-bottom: 14px;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.875rem;
      }
    }
    .delivery_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 20px;
      @media screen and (max-width: 1024px) {
        margin-bottom: 8px;
      }
    }
    .delivery_method {
      @include mixins.subtitleText;
      font-size: 1.125rem;
      @media screen and (max-width: 1024px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.8125rem;
      }
    }
    .delivery_description {
      @include mixins.mainText;
      color: var(--text-grey);
      font-size: 1rem;
      @media screen and (max-width: 1024px) {
        font-size: 0.9375rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.8125rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.6875rem;
      }
    }
    p {
      @include mixins.subtitleText;
      font-size: 1.125rem;
      @media screen and (max-width: 1024px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.75rem;
      }
    }
  }
  &_next {
    h4 {
      @include mixins.subtitleText;
      font-size: 1.125rem;
      margin-bottom: 20px;
      text-transform: uppercase;
      @media screen and (max-width: 1024px) {
        margin-bottom: 16px;
        font-size: 1rem;
      }
      @media screen and (max-width: 480px) {
        margin-bottom: 14px;
        font-size: 0.8125rem;
      }
      @media screen and (max-width: 375px) {
        margin-bottom: 12px;
        font-size: 0.875rem;
      }
    }
    .text_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: auto;
      gap: 8px;
      p {
        @include mixins.mainText;
        font-size: 1.0625rem;
        @media screen and (max-width: 480px) {
          font-size: 0.875rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.75rem;
        }
      }
      @media screen and (max-width: 1024px) {
        gap: 4px;
      }
    }
  }
  @media screen and (max-width: 480px) {
    gap: 20px;
  }
  @media screen and (max-width: 375px) {
    gap: 16px;
  }
}

.summary_btn {
  @include mixins.accentBtn;
  cursor: pointer;
  width: 100%;
}
</style>
