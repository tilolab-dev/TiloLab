<template>
  <div class="footer">
    <div class="container">
      <div class="footer_wrapper">
        <div class="footer_content">
          <div class="footer_content_main">
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
                    <NuxtLink to="/about-us"> Про нас </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/products"> Каталог </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/faq"> FAQ </NuxtLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="footer_content_links_docs">
              <h3>Документи</h3>
              <ul>
                <li>
                  <NuxtLink to="/privacy-policy"> Політика конфіденційності </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/delivery"> Оплата і доставка </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/warranty"> Обмін і гарантія </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/public-offer"> Публічна оферта </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer_subscribe">
          <h3>Залишайся з TiloLab</h3>
          <input type="text" placeholder="Твоя електронна пошта" />
          <p>
            Я погоджуюсь з Політикою конфіденційності та даю згоду на обробку моїх персональних
            даних та погоджуюся отримувати комерційні повідомлення електронною поштою.
          </p>
        </div>
      </div>

      <div class="footer_mobile_links">
        <div class="footer_mobile_links_nav">
          <nav>
            <h3>Навігація</h3>
            <ul>
              <li>
                <NuxtLink to="/about-us"> Про нас </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/products"> Каталог </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/faq"> FAQ </NuxtLink>
              </li>
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
import InstagramIcon from "~/assets/icons/instagram.svg";
import TelegramIcon from "~/assets/icons/telegram.svg";
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
