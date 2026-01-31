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
            <input v-model="phoneNumber" type="text" placeholder="Телефон" />
            <input v-model="email" type="text" placeholder="Електронна пошта" />
          </div>

          <div class="register_content_inputs">
            <input v-model="password" type="text" placeholder="Пароль" />
            <input v-model="confirmPassword" type="text" placeholder="Повторити пароль" />
          </div>

          <button class="register_content_btn" @click="registerHandler">Зареєструватися</button>
        </div>

        <!-- <div v-if="sendedEmail" class="email_sended">
          <p></p>
          Емейл з подальшими інструкціями відправлено на: <br />
          <strong>{{ sendedEmailValue }}</strong> <br />
          Перевірте свою пошту
        </div> -->

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

        <!-- <div class="test_user_btn">
          <NuxtLink to="/user" class="test_user"> Тестова кнопка сторінки користувача </NuxtLink>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import AngleRightIcon from "~/assets/icons/angle-right.svg";
import GoogleIcon from "~/assets/icons/google.svg";
import { useAuth } from "@/composables/useAuth";
import { ref } from "vue";

const { signUpWithEmail } = useAuth();
const name = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const phoneNumber = ref("");
const loaderState = ref(false);
// const sendedEmail = ref(false);
// const sendedEmailValue = ref("");

const clearForm = () => {
  name.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  phoneNumber.value = "";
};

const registerHandler = async () => {
  const validPassword = password.value.trim() === confirmPassword.value.trim();

  if (!validPassword) {
    alert("Перевірте пароль,");
    return;
  } else if (password.value.length <= 7) {
    alert("Пароль повинен бути не менше 7 символів");
  }

  loaderState.value = true;
  document.body.style.overflow = "hidden";

  const registerRes = await signUpWithEmail(
    email.value,
    password.value,
    name.value,
    lastName.value,
    phoneNumber.value
  );

  // console.log(registerRes, "register Res");

  // console.log(registerRes.error);

  if (registerRes.error === null) {
    loaderState.value = false;
    document.body.style.overflow = "";
    // sendedEmailValue.value = registerRes.data.user.email;
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
</style>
