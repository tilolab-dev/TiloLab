<template>
  <div class="register">
    <div class="container">
      <div class="register_wrapper">
        <h1 class="register_title">
          Залишайся разом
          <br />
          з Tilo Lab
        </h1>

        <div class="register_content">
          <div class="register_content_inputs">
            <input type="text" placeholder="Прізвище та ім’я" />
            <input type="text" placeholder="Телефон" />
            <input type="text" placeholder="Електронна пошта" />
          </div>

          <div class="register_content_inputs">
            <input type="text" placeholder="Пароль" />
            <input type="text" placeholder="Повторити пароль" />
          </div>

          <button class="register_content_btn">Зареєструватися</button>
        </div>

        <div class="has_account">
          <span> Маєте акаунт? </span>
          <NuxtLink to="/auth/login" class="has_account_enter">
            Увійти
            <div class="svg_wrap">
              <AngleRightIcon />
            </div>
          </NuxtLink>
        </div>

        <button class="google_auth">
          <span> Або увійти за допомогою </span>
          <GoogleIcon />
        </button>

        <div class="test_user_btn">
          <NuxtLink to="/user" class="test_user"> Тестова кнопка сторінки користувача </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AngleRightIcon from "~/assets/icons/angle-right.svg";
import GoogleIcon from "~/assets/icons/google.svg";
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.register {
  @include mixins.pageSpacing;
}

.register_wrapper {
  width: 468px;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    width: 448px;
  }
  @media screen and (max-width: 768px) {
    width: clamp(450px, 85vw, 538px);
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
}

.register_title {
  @include mixins.titleText;
  text-align: center;
  margin-bottom: 40px;

  @media screen and (max-width: 768px) {
    margin-bottom: 44px;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 40px;
  }
}

.register_content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 64px;
  width: 100%;
  height: auto;
  gap: 44px;

  &_inputs {
    @include mixins.defaultInput;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 20px;
    @media screen and (max-width: 480px) {
      gap: 16px;
    }
  }

  &_btn {
    @include mixins.accentBtn;
    width: 100%;
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 52px;
    gap: 32px;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 48px;
    gap: 28px;
  }

  @media screen and (max-width: 480px) {
    margin-bottom: 44px;
    gap: 24px;
  }
}

.has_account {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  gap: 8px;
  span {
    @include mixins.mainText;
    font-size: 0.875rem;

    @media screen and (max-width: 1024px) {
      font-size: 0.75rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.625rem;
    }
  }
  a.has_account_enter {
    color: var(--accent-color);
    font-size: 1.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @media screen and (max-width: 1024px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.9375rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.8125rem;
    }
  }

  .svg_wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      padding-block: 7px;
      width: 24px;
      height: 24px;
    }
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 80px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 72px;
  }
  @media screen and (max-width: 1024px) {
    margin-bottom: 52px;
  }
}

.google_auth {
  @include mixins.googleAuth;
  color: var(--text-color);
}

.test_user_btn {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  .test_user {
    @include mixins.transparentBtn;
    border: 1px solid var(--border-color);
    text-align: center;

    @media screen and (max-width: 480px) {
      font-weight: 500;
      font-size: 0.75rem;
    }
  }
}
</style>
