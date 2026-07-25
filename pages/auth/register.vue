<template>
  <div class="register">
    <div v-if="loaderState" class="loader_wrapper">
      <SharedLoader />
    </div>
    <div class="container">
      <div class="register_wrapper">
        <h1 class="register_title">
          Залишайся разом
          <br />
          з Tilo Lab
        </h1>

        <div class="register_content">
          <div class="register_content_inputs">
            <input v-model="lastName" type="text" placeholder="Прізвище" />
            <input v-model="name" type="text" placeholder="Ім’я" />
            <input
              :value="phoneNumber"
              type="tel"
              @input="onPhoneInput"
              @keydown="onPhoneKeydown"
            />
            <input v-model="email" type="text" placeholder="Електронна пошта" />
          </div>

          <div class="register_content_inputs">
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
            <div class="password_input">
              <input
                v-model="confirmPassword"
                :type="confirmPasswordHide ? 'password' : 'text'"
                placeholder="Повторити пароль"
              />
              <button class="toggle_hide" @click="confirmPasswordHide = !confirmPasswordHide">
                <HidePassword v-if="!confirmPasswordHide" />
                <ShowPassword v-else />
              </button>
            </div>
          </div>

          <button class="register_content_btn" @click="registerHandler">Зареєструватися</button>
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

// COMPONENTS -----------
import Tooltips from "@/components/shared/Tooltips.vue";

// ICONS-----------

import HidePassword from "~/assets/icons/eyebrow.svg";
import ShowPassword from "~/assets/icons/eye.svg";

useSeoMeta({
  title: "Реєстрація - Tilo Lab",
  description:
    "Створіть акаунт в Tilo Lab для зручного оформлення замовлень та відстеження доставки.",
  ogTitle: "Реєстрація - Tilo Lab",
  robots: "noindex, nofollow"
});

import AngleRightIcon from "~/assets/icons/angle-right.svg";
import GoogleIcon from "~/assets/icons/google.svg";
import { useAuth } from "@/composables/useAuth";
import { ref } from "vue";

const { signUpWithEmail, signInWithGoogle } = useAuth();
const name = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phoneNumber = ref("+38 (0");
const loaderState = ref(false);

const passwordHide = ref(false);
const confirmPasswordHide = ref(false);

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");
const isDeleting = ref(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const validOperators = /^\+380(39|67|68|96|97|98|50|66|95|75|99|63|73|93)\d{7}$/;

const formatFromDigits = (digits) => {
  digits = digits.slice(0, 12);

  let result = "+38";

  if (digits.length > 2) {
    result += " (" + digits.slice(2, 5);
  }

  if (digits.length >= 5) {
    result += ") " + digits.slice(5, 8);
  }

  if (digits.length >= 8) {
    result += "-" + digits.slice(8, 10);
  }

  if (digits.length >= 10) {
    result += "-" + digits.slice(10, 12);
  }

  if (result.length === 17 && isDeleting.value) {
    result = result.slice(0, -1);
  }
  if (result.length === 14 && isDeleting.value) {
    result = result.slice(0, -1);
  }
  if (result.length === 10 && isDeleting.value) {
    result = result.slice(0, -1);
  }
  if (result.length === 9 && isDeleting.value) {
    result = result.replace(")", "");
  }

  return result;
};

const onPhoneKeydown = (e) => {
  isDeleting.value = e.key === "Backspace" || e.key === "Delete";
};
const onPhoneInput = (e) => {
  let value = e.target.value;
  let digits = value.replace(/\D/g, "");

  if (isDeleting.value && digits.length <= 3) {
    phoneNumber.value = "+38 (0";
    e.target.value = phoneNumber.value;
    return;
  }
  const formatted = formatFromDigits(digits);
  phoneNumber.value = formatted;
  e.target.value = formatted;
};

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 3000);
};

const clearForm = () => {
  name.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  phoneNumber.value = "";
};

const registerHandler = async () => {
  let userNumber = "";

  const formatPhoneNumber = (phoneNumber) => {
    const formatted = phoneNumber
      .replaceAll("-", "")
      .replaceAll(" ", "")
      .replace("(", "")
      .replace(")", "");
    userNumber = formatted;
    return formatted;
  };
  const formattedPhone = formatPhoneNumber(phoneNumber.value);
  const checkPhoneNumberUa = userNumber.slice(0, 4) === "+380";
  const validPassword = password.value.trim() === confirmPassword.value.trim();

  if (!lastName.value || lastName.value.trim() === "" || lastName.value.length < 2) {
    tooltip({ status: "warning", message: "Перевірте прізвище" });
    return;
  }

  if (!name.value || name.value.trim() === "" || name.value.length < 2) {
    tooltip({ status: "warning", message: "Перевірте ім'я" });
    return;
  }

  if (userNumber.length < 13 || !checkPhoneNumberUa) {
    tooltip({ status: "warning", message: "Перевірте номер телефону" });
    return;
  }

  if (!validOperators.test(formattedPhone)) {
    tooltip({ status: "warning", message: "Перевірте правильність номеру" });
    return;
  }

  if (!emailRegex.test(email.value)) {
    tooltip({ status: "warning", message: "Перевірте емейл" });
    return;
  }

  if (!validPassword) {
    alert("Перевірте пароль,");
    return;
  } else if (password.value.length <= 7) {
    alert("Пароль повинен бути не менше 7 символів");
    return;
  }

  loaderState.value = true;
  document.body.style.overflow = "hidden";

  const registerRes = await signUpWithEmail(
    email.value,
    password.value,
    name.value,
    lastName.value,
    userNumber
  );

  if (registerRes.error === null) {
    loaderState.value = false;
    document.body.style.overflow = "";
    clearForm();
    alert(
      `Дякуемо за реєстрацію. Емейл з подальшими інструкціями відправлено на ${registerRes.data.user.email}`
    );
    navigateTo("/");
    // sendedEmail.value = true;
  } else {
    loaderState.value = false;
    document.body.style.overflow = "";
    alert("Щось пішло не так, спробуйте пізніше");
  }
};

const onGoogleLogin = async () => {
  loaderState.value = true;
  await signInWithGoogle();
  loaderState.value = false;
};
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.register {
  @include mixins.pageSpacing;

  .loader_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    backdrop-filter: blur(10px);
    top: 0;
    left: 0;
    z-index: 100;
  }
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

  svg {
    width: 25px;
    height: 25px;
    fill: #fff;
  }

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
</style>
