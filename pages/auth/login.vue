<template>
  <div class="login">
    <div v-if="loaderState" class="loader_wrapper">
      <SharedLoader />
    </div>
    <div class="container">
      <div class="login_wrapper">
        <h1>Твій власний простір</h1>

        <div class="input_wrapper">
          <input v-model="email" type="text" placeholder="Електронна пошта" />
          <div class="password_input">
            <input
              v-model="password"
              :type="passwordHide ? 'password' : 'text'"
              placeholder="Пароль"
            />

            <button class="toggle_hide" @click="passwordHide = !passwordHide">
              <HidePassword v-if="!passwordHide" />
              <ShowPassword v-else />
            </button>
          </div>
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

          <input id="checkbox" type="checkbox" />
        </div>

        <button class="login_btn" @click="onEmailLogin">Увійти</button>

        <NuxtLink to="/auth/reset" class="forgot_btn"> Забули пароль? </NuxtLink>

        <NuxtLink to="/auth/register" class="register_btn">
          <span> Зареєструватися </span>

          <div class="svg_wrap">
            <AngleRightIcon />
          </div>
        </NuxtLink>

        <button class="google_auth" @click="onGoogleLogin">
          <span> Або увійти за допомогою </span>

          <GoogleIcon />
        </button>
      </div>
    </div>
    <Tooltips v-if="showTooltip" :tooltip-status="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips>
  </div>
</template>

<script setup>
import { useSeoMeta } from "#imports";

// COMPONENTS ----------

import Tooltips from "@/components/shared/Tooltips.vue";

import HidePassword from "~/assets/icons/eyebrow.svg";
import ShowPassword from "~/assets/icons/eye.svg";

// ICONS ------------

useSeoMeta({
  title: "Вхід в акаунт - Tilo Lab",
  description: "Увійдіть в свій акаунт Tilo Lab для перегляду замовлень та управління профілем.",
  ogTitle: "Вхід в акаунт - Tilo Lab",
  robots: "noindex, nofollow"
});

// icons
import AngleRightIcon from "~/assets/icons/angle-right.svg";
import GoogleIcon from "~/assets/icons/google.svg";
import Check from "~/assets/icons/check.svg";

// imports
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const { signInWithGoogle, signInWithEmail } = useAuth();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const loaderState = ref(false);
const passwordHide = ref(true);

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 3000);
};

const onEmailLogin = async () => {
  if (!emailRegex.test(email.value)) {
    tooltip({ status: "warning", message: "Перевірте емейл" });
    return;
  }

  if (!password.value || password.value.trim() === "" || password.value.length < 6) {
    tooltip({ status: "warning", message: "Перевірте пароль" });
    return;
  }

  loaderState.value = true;
  const { data, error } = await signInWithEmail(email.value, password.value, rememberMe.value);

  if (error) {
    tooltip({
      status: "error",
      message: error.message
    });

    return;
  }

  if (data?.session) {
    await navigateTo(`/user/user-profile`);
  }

  loaderState.value = false;
};

const onGoogleLogin = async () => {
  await signInWithGoogle();
};
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.login {
  color: var(--text-color);
  @include mixins.pageSpacing;

  .loader_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    backdrop-filter: blur(10px);
  }

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

  svg {
    width: 25px;
    height: 25px;
    fill: #fff;
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

  .password_input {
    width: 100%;
    height: auto;
    position: relative;

    .toggle_hide {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      transition: all ease 0.3s;
      cursor: pointer;

      @media screen and (min-width: 1024px) {
        &:hover {
          svg {
            fill: var(--accent-color);
            transition: all ease 0.3s;
          }
        }
      }
    }
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
