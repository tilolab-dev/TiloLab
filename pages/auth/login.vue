<template>
  <div class="login">
    <div class="container">
      <div class="login_wrapper">
        <h1>Твій власний простір</h1>

        <div class="input_wrapper">
          <input type="text" placeholder="Електронна пошта" />
          <input type="text" placeholder="Пароль" />
        </div>

        <div class="checkbox_wrapper">
          <label for="checkbox">
            <button class="checkbox_btn" @click="rememberMe = !rememberMe">
              <div class="checkbox">
                <Check v-if="rememberMe" />
              </div>
              <span>Запам’ятати мене</span>
            </button>
          </label>

          <input type="checkbox" id="checkbox" />
        </div>

        <button class="login_btn">Увійти</button>

        <NuxtLink to="/auth/reset" class="forgot_btn">
          Забули пароль?
        </NuxtLink>

        <NuxtLink to="/auth/register" class="register_btn">
          <span> Зареєструватися </span>

          <div class="svg_wrap">
            <AngleRightIcon />
          </div>
        </NuxtLink>

        <button class="google_auth">
          <span> Або увійти за допомогою </span>

          <GoogleIcon />
        </button>

        <div class="test_user_btn">
          <NuxtLink to="/user" class="test_user">
            Тестова кнопка сторінки користувача
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// icons
import AngleRightIcon from "~/assets/icons/angle-right.svg";
import GoogleIcon from "~/assets/icons/google.svg";
import Check from "~/assets/icons/check.svg";

// imports

import { ref, onMounted } from "vue";

const rememberMe = ref(false);
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.login {
  color: var(--text-color);
  @include mixins.pageSpacing;

  h1 {
    @include mixins.titleText;
    width: 100%;
    height: auto;
    text-align: center;
    margin-bottom: 40px;

    @media screen and (max-width: 768px) {
      margin-bottom: 52px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 40px;
    }
    @media screen and (max-width: 375px) {
      margin-bottom: 32px;
    }
  }
}

.login_wrapper {
  width: 468px;
  height: auto;
  margin: 0 auto;
  position: relative;

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

.input_wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;

  @include mixins.defaultInput;

  @media screen and (max-width: 480px) {
    gap: 16px;
  }
}

.checkbox_wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 32px;
  gap: 8px;

  input {
    display: none;
  }

  .checkbox_btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    gap: 8px;
  }

  .checkbox {
    width: 18px;
    height: 18px;
    aspect-ratio: 1/1;
    border: 2px solid var(--accent-color);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;

    svg {
      transform: scale(0.9);
    }
  }
}

.login_btn {
  @include mixins.accentBtn;
  width: 100%;
  margin-bottom: 64px;
}

.forgot_btn {
  @include mixins.mainText;
  display: block;
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 20px;
  cursor: pointer;
  width: 100%;
}

.register_btn {
  @include mixins.mainText;
  color: var(--accent-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  width: 100%;
  gap: 4px;

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
