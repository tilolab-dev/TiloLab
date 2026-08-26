<template>
  <div class="reset">
    <div v-if="loaderState" class="loader_wrapper">
      <SharedLoader />
    </div>
    <Tooltips v-if="showTooltip" :tooltip-status="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips>
    <div class="container">
      <div class="reset_content">
        <p class="reset_content_text">
          Забули пароль? Будь ласка, введіть своє ім'я користувача або адресу електронної пошти. Ви
          отримаєте посилання для створення нового пароля електронною поштою.
        </p>
        <div class="reset_content_input">
          <input v-model="email" type="text" placeholder="Логін чи електронна пошта" />
        </div>
        <button class="reset_content_btn" @click="handleResetPassword">Скинути пароль</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSeoMeta } from "#imports";

// COMPOSABLES
import { useAuth } from "~/composables/useAuth";

//COMPONENTS
import Tooltips from "@/components/shared/Tooltips.vue";

useSeoMeta({
  title: "Відновлення паролю - Tilo Lab",
  description: "Відновлення паролю для акаунту Tilo Lab.",
  ogTitle: "Відновлення паролю - Tilo Lab",
  robots: "noindex, nofollow"
});

// REFS

const email = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const loaderState = ref(false);

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

const { resetPassword } = useAuth();

// METHODS

const tooltip = (obj) => {
  const { status, message } = obj;
  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 4000);
};

const handleResetPassword = async () => {
  successMessage.value = "";
  errorMessage.value = "";

  if (!email.value.trim()) {
    tooltip({ status: "warning", message: "Введіть адресу електронної пошти" });
    return;
  }

  loaderState.value = true;

  try {
    await resetPassword(email.value);

    tooltip({
      status: "success",
      message: "Посилання для відновлення пароля надіслано на вашу електронну пошту."
    });

    email.value = "";
  } catch (error) {
    console.error(error);
    tooltip({ status: "error", message: "Не вдалося надіслати лист для відновлення пароля." });
  } finally {
    loaderState.value = false;
  }
};

// WATCHERS
// watch(loaderState.value, () => {
//   if (loaderState.value) {
//     document.body.style.overflow = "hidden";
//   } else {
//     document.body.style.overflow = "auto";
//   }
// });
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.reset {
  @include mixins.pageSpacing;

  .loader_wrapper {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 25;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(7px);
  }
}

.reset_content {
  width: 468px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30dvh;
  gap: 32px;

  &_text {
    @include mixins.mainText;
    text-align: start;
  }

  &_input {
    @include mixins.defaultInput;
    width: 100%;
  }

  &_btn {
    @include mixins.accentBtn;
    width: 100%;
  }

  @media screen and (max-width: 1024px) {
    width: 448px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
}
</style>
