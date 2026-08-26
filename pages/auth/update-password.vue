<template>
  <div class="update-password">
    <div class="container">
      <div class="update-password_content">
        <div v-if="loading">
          <SharedLoader />
        </div>

        <template v-else-if="!sessionReady">
          <p class="update-password_content_text">
            Посилання для відновлення пароля недійсне або вже використане.
          </p>
        </template>

        <template v-else-if="success">
          <p class="update-password_content_text">Пароль успішно змінено.</p>

          <button class="update-password_content_btn" @click="router.push('/auth/login')">
            Увійти
          </button>
        </template>

        <template v-else>
          <p class="update-password_content_text">Введіть новий пароль.</p>

          <div class="update-password_content_input">
            <input v-model="password" type="password" placeholder="Новий пароль" />
          </div>

          <div class="update-password_content_input">
            <input v-model="passwordRepeat" type="password" placeholder="Повторіть новий пароль" />
          </div>

          <button class="update-password_content_btn" @click="handleUpdatePassword">
            Змінити пароль
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSeoMeta } from "#imports";

import { useRoute, useRouter } from "vue-router";

import { useAuth } from "~/composables/useAuth";

useSeoMeta({
  title: "Новий пароль - Tilo Lab",
  description: "Встановлення нового пароля для акаунту Tilo Lab.",
  robots: "noindex, nofollow"
});

const route = useRoute();
const router = useRouter();

const supabase = useSupabaseClient();

const { updatePassword } = useAuth();

const password = ref("");
const passwordRepeat = ref("");

const loading = ref(true);
const sessionReady = ref(false);
const success = ref(false);

onMounted(async () => {
  const code = route.query.code;

  if (!code || typeof code !== "string") {
    loading.value = false;
    return;
  }

  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Помилка обміну code на session:", error);
      return;
    }

    sessionReady.value = true;
  } catch (error) {
    console.error("Помилка recovery:", error);
  } finally {
    loading.value = false;
  }
});

const handleUpdatePassword = async () => {
  if (!password.value) {
    alert("Введіть новий пароль");
    return;
  }

  if (password.value.length < 6) {
    alert("Пароль повинен містити щонайменше 6 символів");
    return;
  }

  if (password.value !== passwordRepeat.value) {
    alert("Паролі не співпадають");
    return;
  }

  loading.value = true;

  try {
    await updatePassword(password.value);

    success.value = true;

    password.value = "";
    passwordRepeat.value = "";
  } catch (error) {
    console.error(error);

    alert("Не вдалося змінити пароль");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.update-password {
  @include mixins.pageSpacing;

  &_content {
    width: 468px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &_text {
      @include mixins.mainText;
      text-align: start;
      width: 100%;
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
}
</style>
