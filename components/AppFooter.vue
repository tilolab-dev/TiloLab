<template>
  <div class="footer">
    <div class="container">
      <div class="footer_wrapper">
        <div class="footer_content">
          <div class="footer_content_main">
            <h1>Tilo Lab</h1>

            <a href="tel:+380000000000">+380 00 000 00 00</a>

            <div class="socials">
              <button>
                <InstagramIcon />
              </button>
              <button>
                <TelegramIcon />
              </button>
            </div>
          </div>
          <div class="footer_content_links">
            <div class="footer_content_links_nav">
              <nav>
                <h3>Навігація</h3>
                <ul>
                  <li>
                    <NuxtLink to="/about-us">
                      Про нас
                    </NuxtLink>
                  </li>
                  <li>Каталог</li>
                  <li>
                    <NuxtLink to="/faq">
                      FAQ
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="footer_content_links_docs">
              <h3>Документи</h3>
              <ul>
                <li>Політика конфіденційності</li>
                <li>Оплата і доставка</li>
                <li>Обмін і гарантія</li>
                <li>Публічна оферта</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer_subscribe">
          <h3>Залишайся з TiloLab</h3>
          <input type="text" placeholder="Твоя електронна пошта" />
          <p>
            Я погоджуюсь з Політикою конфіденційності та даю згоду на обробку
            моїх персональних даних та погоджуюся отримувати комерційні
            повідомлення електронною поштою.
          </p>
        </div>
      </div>

      <div class="footer_mobile_links">
        <div class="footer_mobile_links_nav">
          <nav>
            <h3>Навігація</h3>
            <ul>
              <li>Про нас</li>
              <li>Каталог</li>
              <li>FAQ</li>
            </ul>
          </nav>
        </div>
        <div class="footer_mobile_links_docs">
          <h3>Документи</h3>
          <ul>
            <li>Політика конфіденційності</li>
            <li>Оплата і доставка</li>
            <li>Обмін і гарантія</li>
            <li>Публічна оферта</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InstagramIcon from '~/assets/icons/instagram.svg'
import TelegramIcon from '~/assets/icons/telegram.svg'
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 100%;
  position: relative;
  color: white;
  padding: 36px 0 65px;
  border-top: 1px solid var(--accent-grey);

  @media screen and (max-width: 480px) {
    padding: 28px 0 30px;
  }
}

.footer_wrapper {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: clamp(10px, 5vw, 159px);
  h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: 0.36px;
    text-transform: uppercase;
    color: var(--text-color);

    @media screen and (max-width: 1024px) {
      font-size: 1rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 0.9375rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.7rem;

    li {
      color: rgba(255, 255, 255, 0.7);
      font-family: "Montserrat", sans-serif;
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.32px;
      transition: all ease 0.3s;
      cursor: pointer;

      @media screen and (max-width: 1024px) {
        font-size: 0.9375rem;
      }

      @media screen and (max-width: 375px) {
        font-size: 0.875rem;
      }
    }

    @media screen and (min-width: 1024px) {
      li:hover {
        color: var(--accent-color);
        transition: all ease 0.3s;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0;
  }

  @media screen and (max-width: 375px) {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: flex-start;
    position: relative;

    gap: 24px;
  }
}

.footer_content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 132px;

  &_main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 12px;

    h1 {
      font-size: 1.7rem;
      font-weight: 600;
      transform: translateY(-30%);
      @media screen and (max-width: 1024px) {
        transform: unset;
      }
    }

    a {
      transition: all ease 0.3s;
      font-size: 1.2rem;
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.36px;
      color: var(--text-color);
      white-space: nowrap;
      @media screen and (min-width: 1024px) {
        &:hover {
          color: var(--accent-color);
          transition: all ease 0.3s;
        }
      }
      @media screen and (max-width: 768px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
    }

    .socials {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 8px;
      gap: 19px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--accent-color);
        cursor: pointer;
        border-radius: 5px;
        position: relative;
        padding: 8px;
        width: 32px;
        height: 32px;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  &_links {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 64px;

    @media screen and (max-width: 768px) {
      justify-content: flex-end;
      // gap: 64px
    }

    @media screen and (max-width: 575px) {
      gap: clamp(20px, 5vw, 64px);
    }

    @media screen and (max-width: 480px) {
      display: none;
    }

    @media screen and (max-width: 375px) {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex: 1;
      width: 100%;
      &_nav,
      &_docs {
        flex: 1;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    gap: 56px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    gap: clamp(10px, 5vw, 56px);
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex: 1;
  }

  @media screen and (max-width: 375px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    gap: 24px;
  }
}

.footer_subscribe {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.8rem;
  input {
    width: 80%;
    height: auto;
    background: var(--accent-grey);
    padding: 11px 12px;
    border-radius: 5px;
    font-size: 0.9rem;
    color: var(--text-color);

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-family: "Montserrat", sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.42px;

    @media screen and (max-width: 1024px) {
      font-size: 0.75rem;
    }

    @media screen and (max-width: 480px) {
      font-size: 0.625rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 18px */
    letter-spacing: 0.24px;
  }

  @media screen and (max-width: 768px) {
    max-width: 60vw;
  }

  @media screen and (max-width: 480px) {
    max-width: unset;
    flex: 1;
  }
}

.footer_mobile_links {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 28px;

  &_nav,
  &_docs {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: baseline;
    flex: 1;

    h3 {
      font-size: 0.9375rem;
      font-weight: 600;
      line-height: 150%;
      font-family: "Montesrrat", sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-style: normal;
      color: var(--text-color);
    }
    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: baseline;
      margin-top: 18px;
      gap: 22px;
    }
    li {
      font-family: "Montserrat", sans-serif;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      letter-spacing: 0.28px;
      color: var(--text-color);
    }
  }

  @media screen and (min-width: 480px) {
    display: none;
  }
  @media screen and (max-width: 375px) {
    display: none;
  }
}
</style>
