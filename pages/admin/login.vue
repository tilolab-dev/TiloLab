<template>
  <div class="login">
    <div class="tooltip_wrapper">
      <div class="tooltip_item">
        <span class="tooltip_type"> Error : </span>
        <span class="tooltip_message"> fglgmzerlmlemlemgsrlgm </span>
      </div>
    </div>
    <div class="login_container">
      <div v-if="loading" class="loader" :class="{ active_loader: loading }">
        <SharedLoader />
      </div>

      <div v-else class="login_content">
        <div class="login_head">
          <span> Вхід в адмін панель </span>
        </div>

        <div class="login_content">
          <div class="modelValue_group">
            <input
              v-model="formValue.username"
              type="text"
              @focus="focused.username = true"
              @blur="
                touched.username = true;
                focused.username = false;
              "
            />

            <label :class="{ active: focused.username || formValue.username }">Username</label>
            <span v-if="errors.username" class="input_error">{{ errors.username }}</span>
          </div>

          <div class="modelValue_group">
            <input
              v-model="formValue.password"
              :type="hiddenPassword ? 'password' : 'text'"
              @focus="focused.password = true"
              @blur="
                focused.password = false;
                touched.password = true;
              "
            />
            <label :class="{ active: focused.password || formValue.password }">Password</label>
            <span v-if="errors.password" class="input_error">{{ errors.password }}</span>
          </div>

          <div class="checkBox_group">
            <div class="box">
              <input id="rememberMe" v-model="formValue.rememberMe" type="checkbox" />
              <label for="rememberMe">Запам’ятати мене</label>
            </div>

            <div class="box">
              <input id="togglePassword" v-model="hiddenPassword" type="checkbox" />
              <label for="togglePassword">
                {{ hiddenPassword ? "Приховати пароль" : "Показати пароль" }}
              </label>
            </div>
          </div>
        </div>

        <div class="login_buttons">
          <button
            class="admin_login"
            :class="validForm ? 'active_btn' : 'hidden_btn'"
            :disabled="!validForm"
            @click="login"
          >
            Увійти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from "@/store/admin-store";
import { ref, computed } from "vue";

const hiddenPassword = ref(true);
const loading = ref(false);

const auth = useAdminStore();

const formValue = ref({
  username: "",
  password: "",
  rememberMe: false
});

const errors = computed(() => ({
  username: usernameError.value,
  password: passwordError.value
}));

const touched = ref({
  username: false,
  password: false
});

const focused = ref({
  username: false,
  password: false
});

const usernameError = computed(() => {
  if (!touched.value.username) return "";
  return formValue.value.username.length < 5 ? "Перевірте ім'я користувача" : "";
});

const passwordError = computed(() => {
  if (!touched.value.password) return "";
  return formValue.value.password.length < 5 ? "Перевірте пароль" : "";
});

const validForm = computed(() => {
  return (
    !usernameError.value &&
    !passwordError.value &&
    formValue.value.username.length >= 5 &&
    formValue.value.password.length >= 5
  );
});

const login = async () => {
  try {
    const result = await $fetch("/api/auth/admin/admin-login", {
      method: "POST",
      body: {
        username: formValue.value.username,
        password: formValue.value.password,
        rememberMe: formValue.value.rememberMe
      }
    });

    if (result.statusCode === 403) {
      alert(result.message);
      return;
    }

    if (result.statusCode === 200) {
      auth.setAdminRole("admin", result.token);

      await navigateTo("/admin");
    }
  } catch (err) {
    alert(`Щось пішло не так, ${err}`);
  }
};

definePageMeta({
  layout: false
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .tooltip_wrapper {
    display: none;
  }

  .modelValue_group {
    position: relative;
    width: 100%;
  }

  .login_container {
    width: clamp(500px, 45vw, 600px);
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    border: 1px solid rgba(255, 169, 214, 0.3);
    border-radius: 16px;
    background: #161616;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      inset: -40px;
      background: radial-gradient(circle, rgba(255, 169, 214, 0.35), transparent 70%);
      filter: blur(40px);
      z-index: -1;
    }

    @media screen and (max-width: 768px) {
      & {
        width: 100vw;
        height: 100vh;
        border-radius: unset;
      }
    }
  }

  .login_head {
    width: 100%;
    text-align: center;
    span {
      font-size: 1.5em;
      font-weight: 500;
      color: var(--text-grey);
      text-align: center;
    }
  }

  .login_content {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
  }

  .checkBox_group {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1em;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    gap: 0.5em;
    cursor: pointer;
  }

  .box input[type="checkbox"] {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid var(--border-color);
    border-radius: 4px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .box input[type="checkbox"]::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 8px;
    border: solid var(--accent-color);
    border-width: 0 2px 2px 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%) rotate(45deg);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .box input[type="checkbox"]:checked {
    background: transparent;
    border-color: var(--accent-color);
  }

  .box input[type="checkbox"]:checked::after {
    opacity: 1;
  }

  .box label {
    font-size: 14px;
    color: var(--border-color);
    cursor: pointer;
    position: relative;
    top: 0;
    left: 0;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"] {
    width: 100%;
    padding: 12px 10px;
    font-size: 16px;
    border: 1px solid rgba(255, 169, 214, 0.1);
    background: var(--bg-color);
    border-radius: 6px;
    outline: none;
    color: var(--text-grey);
  }

  label {
    position: absolute;
    left: 12px;
    top: 12px;
    color: #888;
    pointer-events: none;
    transition: 0.2s ease all;
  }

  label.active {
    top: -8px;
    left: 8px;
    font-size: 12px;
    background: transparent;
    padding: 0 4px;
    color: var(--accent-color);
  }

  .input_error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
    position: absolute;
    width: 100%;
    left: 5%;
    bottom: -100%;
    transform: translateY(-150%);
  }

  .radio_group p {
    margin-bottom: 0.5em;
    font-weight: 500;
  }

  .login_buttons {
    width: 100%;
    .admin_login {
      width: 100% !important;
    }
    .hidden_btn {
      @include mixins.transparentBtn;
      border: 1px solid var(--border-color);
      opacity: 0.3;
      pointer-events: none;
      cursor: not-allowed;
      transition: all ease 0.3s;
    }

    .active_btn {
      @include mixins.accentBtn;
      cursor: pointer;
      opacity: 1;
      pointer-events: all;
      transition: all ease 0.3s;
    }
  }
}
</style>
