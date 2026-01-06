<template>
  <div class="auth_modal_content">
    <section class="modal auth_modal">
      <div
        ref="modalWrapper"
        class="modal-wrapper"
        :class="{ login_window: loginWindow, register_window: !loginWindow }"
      >
        <div v-if="!loginWindow" class="form login">
          <form>
            <h2>Вхiд в аккаунт</h2>
            <p class="main_text">
              Ввійдіть в свій аккаунт щоб продовжити!
              <br />
              Якщо у Вас ще немає аккаунту, то зареєструйтесь!
            </p>
            <div class="form_item">
              <label for="login-email "> Email </label>
              <input
                id="login-email"
                v-model="mail"
                type="email"
                placeholder="Введіть вашу електронну пошту"
                maxlength="40"
                required
              />
            </div>

            <div class="form_item">
              <label for="login-password"> Пароль </label>
              <input
                id="login-password"
                v-model="password"
                type="password"
                placeholder="Введіть ваш пароль"
                required
                maxlength="30"
              />
            </div>

            <div class="button-wrapper">
              <button class="forgot-password">Забыли пароль?</button>
              <button type="button" @click="handleLogin">Войти</button>
            </div>

            <p class="bottom_content">
              Нет аккаунта?

              <button class="switch_btn" @click="loginWindow = true">Создать</button>
            </p>
          </form>
        </div>
        <div v-else-if="!supabaseConfirmState && loginWindow" class="form auth">
          <form>
            <h2>Создайте аккаунт</h2>
            <p>
              Зарегистрируйтесь, чтобы получить доступ ко всем возможностям. Это быстро и просто!
            </p>
            <div class="name_wrapper">
              <div class="name_wrapper_item">
                <label for="register-name dark:text">Имя</label>
                <input id="register-name" v-model="userName" type="text" required />
              </div>

              <div class="name_wrapper_item">
                <label for="register-surname">Отчество</label>
                <input id="register-surname" v-model="userSurname" type="text" />
              </div>

              <div class="name_wrapper_item">
                <label for="register-family">Фамилия</label>
                <input id="register-family" v-model="userFamily" type="text" required />
              </div>
            </div>

            <label for="register-email">Email</label>
            <input id="register-email" v-model="mail" type="email" required />

            <label for="phone-number">Номер телефона</label>
            <input id="phone-number" v-model="phoneNumber" type="tel" required />

            <div class="pass_wrapper">
              <div class="pass_item">
                <label for="register-password">Пароль</label>
                <input id="register-password" v-model="password" type="password" required />
              </div>

              <div class="pass_item">
                <label for="register-password-confirm">Повторите пароль</label>
                <input
                  id="register-password-confirm"
                  v-model="confirmedPass"
                  type="password"
                  required
                />
              </div>
            </div>

            <button class="register-btn" type="button" @click="handleRegister">
              Зарегистрироваться
            </button>

            <p>
              Уже есть аккаунт?
              <button class="switch-tab" @click="loginWindow = false">Войти</button>
            </p>

            <small
              >Регистрируясь, вы соглашаетесь с <span>условиями использования</span> и
              <span>политикой конфиденциальности</span>.</small
            >
          </form>
        </div>
        <div v-else class="form auth relative">
          <div class="confirm_password">
            <div class="auth_head">
              <button class="go_back_btn" @click="supabaseConfirmState = false">
                Повернутись назад
              </button>

              <button class="close_modal" @click="modalStore.closeModal">X</button>
            </div>

            <div class="text_block">
              <h2
                class="mb-2 text-2xl font-bold text-[var(--primary-color)] dark:text-[var(--dark-font-color)]"
              >
                Введіть пароль отриманий на email
              </h2>
              <p class="mb-5 dark:text-[var(--dark-font-color)]">
                Якщо ви не отримували пароль, перевірте правильність введених даних та спробуйте ще.
              </p>
            </div>

            <div class="digits flex-col items-center gap-4">
              <div class="digits_content flex gap-2">
                <input
                  v-for="(digit, index) in code"
                  :key="index"
                  :ref="(el) => (inputs[index] = el)"
                  v-model="code[index]"
                  type="text"
                  maxlength="1"
                  class="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-[var(--dark-border-color)]"
                  @input="handleInput(index, $event)"
                  @keydown="handleBackspace(index, $event)"
                />
              </div>
              <button
                class="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition dark:bg-[--dark-color] dark:border dark:border-[var(--dark-border-color)]"
                @click="handleConfirmRegister"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
        <div ref="background" class="background">
          <NuxtImg
            :src="loginWindow ? '/images/TiloLab1.webp' : '/images/TiloLab2.webp'"
            alt="preview"
            width="700"
            height="450"
            loading="lazy"
            class="preview-image"
          />
          <h2>Якийсь текст</h2>
          <button
            class="absolute z-20 top-5 right-5 p-2 cursor-pointer border border-solid rounded-full"
            :style="{
              'border-color': !loginWindow ? 'var(--main-accent)' : 'var(--primary-color)'
            }"
            @click="modalStore.closeModal"
          ></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// import SvgIcon from "../shared/SvgIcon.vue";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useModalStore } from "@/store/modal-store";
import { useAuthStore } from "@/store/auth-store";
import gsap from "gsap";

const userName = ref("Nick");
const userSurname = ref("Ivanovic");
const userFamily = ref("Sliyusar");
const phoneNumber = ref("+380936012519");
const mail = ref("n.sliyusar@gmail.com");
const password = ref("Q!2werty");
const confirmedPass = ref("Q!2werty");
const loginWindow = ref(true);
const code = ref(["", "", "", "", "", ""]);
const inputs = ref([]);
const supabaseConfirmState = ref(false);

const modalWrapper = ref(null);
const background = ref(null);

const modalStore = useModalStore();

const authStore = useAuthStore();

const emit = defineEmits([]);

const animateModalHeight = () => {
  gsap.to(modalWrapper.value, {
    duration: 0.5,
    height: loginWindow.value ? "100%" : "100%",
    ease: "power2.out"
  });
};

// const animateBackground =  () => {
//     gsap.to(background.value, { left: loginWindow.value ? "0%" : "-100%", duration: 0.6, ease: "power2.inOut" });
// };

watch(loginWindow, () => {
  userName.value = "";
  userSurname.value = "";
  phoneNumber.value = "";
  userFamily.value = "";
  mail.value = "";
  password.value = "";
  confirmedPass.value = "";
  animateModalHeight();
  // animateBackground();
});

const handleInput = (index, event) => {
  if (!/\d/.test(event.target.value)) {
    code.value[index] = "";
    return;
  }

  if (event.target.value.length > 1) {
    code.value[index] = event.target.value.slice(-1);
  }

  if (index < 5 && event.target.value !== "") {
    inputs.value[index + 1]?.focus();
  }
};

const handleBackspace = (index, event) => {
  if (event.key === "Backspace" && index > 0 && !code.value[index]) {
    inputs.value[index - 1]?.focus();
  }
};

class Auth {
  constructor(mail, password, confirmedPass = null) {
    this.mail = mail;
    this.password = password;
    this.confirmedPass = confirmedPass;
  }

  static regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  static regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  validateEmail() {
    const validMail = Auth.regEmail.test(this.mail.trim());
    if (!validMail) {
      emit("tooltip", {
        status: "error",
        message: "Невірний формат електронної пошти"
      });
    }
    return validMail;
  }

  validatePassword() {
    const validPath = Auth.regPassword.test(this.password.trim());
    if (!validPath) {
      emit("tooltip", {
        status: "error",
        message: "Невірний формат паролю"
      });
    }
    return validPath;
  }

  validateConfirmedPassword() {
    return this.password === this.confirmedPass;
  }

  async fetchSendVerifyPass(link, method, data = {}) {
    const verifyData = new FormData();

    verifyData.append("data", JSON.stringify(data));

    const processVerify = await $fetch(link, {
      method: method,
      body: verifyData
    });

    console.log(processVerify, "processVerify");

    if (processVerify.status === 200) {
      supabaseConfirmState.value = true;
    } else {
      //   emit("tooltip", {
      //     status: "error",
      //     message: `Виникла помилка ${processVerify.message}`,
      //   });

      console.log({
        status: "error",
        message: `Виникла помилка ${processVerify.message}`
      });
    }

    return {
      status: processVerify.status,
      message: processVerify.message
    };
  }
  async checkVerifyPass(link, method, data = {}) {
    const verifyData = new FormData();

    verifyData.append(
      "data",
      JSON.stringify({
        email: mail.value,
        token: data.token
      })
    );

    const processVerify = await $fetch(`/api/${link}`, {
      method: method,
      body: verifyData
    });

    if (processVerify.status === 200) {
      const registerUser = await this.fetchRequest("auth?auth=register", "POST", {
        userName: userName.value,
        userSurname: userSurname.value,
        phoneNumber: phoneNumber.value,
        userFamily: userFamily.value,
        mail: mail.value,
        password: password.value
      });

      if (registerUser.status === 200) {
        userName.value = "";
        userSurname.value = "";
        phoneNumber.value = "";
        userFamily.value = "";
        mail.value = "";
        password.value = "";
        confirmedPass.value = "";
        supabaseConfirmState.value = false;
        code.value = ["", "", "", "", "", ""];
        inputs.value = [];
        loginWindow.value = false;
        emit("tooltip", {
          status: "success",
          message: registerUser.message
        });
      } else {
        emit("tooltip", {
          status: "error",
          message: registerUser.message
        });
      }

      // emit('tooltip', {
      //     status: 'success',
      //     message: processVerify.message
      // })
    } else {
      emit("tooltip", {
        status: "error",
        message: "Паролі не співпадають"
      });
    }
  }

  async fetchRequest(link, method, data = {}) {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    const response = await $fetch(`/api/${link}`, {
      method: method,
      body: formData
    });

    if (response.status === 200) {
      emit("tooltip", {
        status: "success",
        message: response.message
      });

      setTimeout(() => {
        loginWindow.value = false;
      }, 1500);
    }

    return response;
  }
}

const handleLogin = async () => {
  const loginAuth = new Auth(mail.value, password.value);

  // if (!mail.value && !password.value) {
  //     emit('tooltip', {
  //         status: 'error',
  //         message: 'Заповніть всі поля'
  //     })
  //     return null;
  // }

  // if (!loginAuth.validateEmail()) return null;

  // if (!loginAuth.validatePassword()) return null;

  const loginUser = await loginAuth.fetchRequest("auth?auth=login", "POST", {
    mail: mail.value,
    password: password.value
  });

  if (loginUser.statusCode === 200) {
    emit("tooltip", {
      status: "success",
      message: "Ви успішно увійшли"
    });
  } else {
    emit("tooltip", {
      status: "error",
      message: "Щось пішло не так"
    });
    return;
  }

  if (loginUser.user) {
    authStore.setUser(loginUser.user);
  }

  setTimeout(() => {
    modalStore.closeModal();
  }, 1000);
};

const handleRegister = () => {
  const registerAuth = new Auth(mail.value, password.value, confirmedPass.value);

  if (!userName.value && !mail.value && !password.value && !confirmedPass.value) {
    emit("tooltip", {
      status: "error",
      message: "Заповніть всі поля"
    });
    return null;
  }

  if (!registerAuth.validateEmail()) return;

  if (!registerAuth.validatePassword()) return;

  if (!registerAuth.validateConfirmedPassword()) {
    emit("tooltip", {
      status: "error",
      message: "Паролі не співпадають"
    });
    return;
  }

  registerAuth.fetchSendVerifyPass("auth?auth=sendVerifyPass", "POST", {
    mail: mail.value
  });
};

const handleConfirmRegister = () => {
  const registerAuth = new Auth(mail.value, password.value, confirmedPass.value);

  const codeValue = code.value.join(",").replaceAll(",", "");

  if (codeValue.length < 6) {
    emit("tooltip", {
      status: "error",
      message: "Код повинен бути 6 цифр"
    });
    inputs.value = [];
    code.value = ["", "", "", "", "", ""];
    inputs.value[0]?.focus();

    return;
  }

  registerAuth.checkVerifyPass("auth?auth=checkVerifyPass", "POST", {
    email: mail.value,
    token: codeValue
  });
};

const handleInvalid = (e) => {
  e.preventDefault();
};

onMounted(() => {
  document.addEventListener("invalid", handleInvalid, true);

  // gsap.set(modalWrapper.value, { height: loginWindow.value ? "100%" : "100%" });
  // gsap.set(background.value, { x: loginWindow.value ? "0%" : "0%" });
});

onUnmounted(() => {
  document.removeEventListener("invalid", handleInvalid, true);
});
</script>

<style lang="scss" scoped>
.auth_modal_content {
  position: fixed;
  top: 10%;
  // transform: translateY(-30%);
  background: white;
  border-radius: 10px;
  overflow-x: hidden;
  height: fit-content;
  margin-bottom: 50px;
}

.modal {
  height: 100%;
  position: relative;
}

.auth_modal {
  width: 80vw;
  height: 100%;

  .modal-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: 1.5vw;
  }

  .login_window {
    flex-direction: row-reverse;
  }
  .register_window {
    flex-direction: row;
  }

  .form,
  .background {
    flex: 1;
    height: 100%;
    position: relative;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    justify-content: center;
    height: 100%;
    gap: 1rem;

    padding: 2rem;

    h2 {
      // margin-bottom: 0.5rem;
      color: grey;
      font-size: 2rem;
      font-weight: 700;
      line-height: 2rem;
    }

    p {
      margin-top: 3vh;
      margin-bottom: 1.25rem;
      font-size: 1.2rem;
    }

    .form_item {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      justify-content: flex-start;
      gap: 1rem;
    }

    label {
      position: relative;
      bottom: 5px;
    }

    input {
      border: 1px solid darkgrey;
      border-radius: 8px;
      padding: 10px 15px;
      width: 100%;
      margin-bottom: 15px;
      color: black;
    }

    .button-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      gap: 2rem;

      button {
        border: 1px solid darkgrey;
        background: rgb(203, 106, 204);
        border-radius: 8px;
        color: var(--bg-color);
        cursor: pointer;
        flex: 1;
        padding: 10px 15px;
        font-weight: 700;
        font-size: 1.1rem;
        white-space: nowrap;
        flex: 1;
      }
      .forgot-password {
        border: 1px solid red;
        background: transparent;
        color: red;
        @media screen and (min-width: 1024px) {
          &:hover {
            background: red;
            color: white;
          }
        }
      }
    }

    .bottom_content {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      top: 5rem;
      margin: 0;
      width: 100%;
      gap: 1rem;

      .switch_btn {
        font-weight: 700;
        font-size: 1.2rem;
        cursor: pointer;
      }
    }
  }

  .background {
    width: 100;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .auth {
    .auth_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 95%;
      position: absolute;
      top: 20px;
      left: 0;

      button {
        cursor: pointer;
      }

      .close_modal {
        border: 1px solid darkgrey;
        padding: 8px 10px;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
      }
    }
    form {
      padding: 2rem 1rem 2rem 0;
      gap: 0.5rem;

      .name_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.2rem;
        &_item {
          flex-basis: 50%;
          flex: 1 1 0%;

          @media (max-width: 640px) {
            flex: 1 1 0%;
            width: 100%;
          }
        }
      }

      .pass_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.25rem;
      }

      .pass_item {
        width: 100%;
      }
    }

    .confirm_password {
      width: 90%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      justify-content: center;
      gap: 2rem;
    }

    .text_block {
      display: flex;
      flex-direction: column;
      align-items: baseline;
      justify-content: center;
      gap: 1rem;

      h2 {
        font-size: 1.5rem;
        font-weight: 600;
      }

      p {
        font-size: 1.2rem;
        font-weight: 500;
      }
    }

    .digits {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      gap: 1rem;

      &_content {
        display: flex;
        gap: 0.5rem;
      }

      input {
        width: 3rem;
        height: 3rem;
        text-align: center;
        border: 1px solid black;
        border-radius: 10px;

        &:focus {
          outline: none;
          border-color: red;
        }
      }

      button {
        position: relative;
        top: 4rem;
        border: 1px solid darkgrey;
        background: rgb(203, 106, 204);
        border-radius: 8px;
        color: var(--bg-color);
        cursor: pointer;
        flex: 1;
        padding: 10px 15px;
        font-weight: 700;
        font-size: 1.1rem;
        white-space: nowrap;
        flex: 1;
      }
    }
  }
}
</style>
