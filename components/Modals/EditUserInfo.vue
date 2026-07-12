<template>
  <div class="edit_option_layout" @click.self="modalStore.closeModal">
    <div class="edit_content_wrapper">
      <div v-if="loaderState" class="loader_content">
        <SharedLoader />
      </div>
      <div class="edit_option_content">
        <div class="head">
          <h1>Редагувати профіль</h1>

          <button @click="modalStore.closeModal">
            <SvgIcon name="close-btn" size="micro" fill="var(--text-color)" />
          </button>
        </div>

        <div class="middle">
          <div class="option_block">
            <div class="option_block_head">
              <div class="info">
                <p>Ім'я:</p>
              </div>
              <button @click="openEditor('name')">
                <EditIcon v-if="!editNameState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>
            <div class="option_block_content">
              <div v-if="editNameState" class="input_wrapper">
                <input ref="nameInput" v-model="newName" type="text" placeholder="Введіть ім'я" />
              </div>
              <div v-else class="value">{{ user.username }}</div>
            </div>
          </div>

          <div class="option_block">
            <div class="option_block_head">
              <div class="info">
                <p>Прізвище:</p>
              </div>
              <button @click="openEditor('surname')">
                <EditIcon v-if="!editFamilyState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>
            <div class="option_block_content">
              <div v-if="editFamilyState" class="input_wrapper">
                <input
                  ref="familyInput"
                  v-model="newFamily"
                  type="text"
                  placeholder="Введіть прізвище"
                />
              </div>
              <div v-else class="value">{{ user.userSurname }}</div>
            </div>
          </div>

          <div class="option_block">
            <div class="option_block_head">
              <div class="info">
                <p>Дата народження:</p>
              </div>
              <button @click="openEditor('date')">
                <EditIcon v-if="!editDateState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>
            <div class="option_block_content">
              <div v-if="editDateState" class="input_wrapper">
                <input
                  ref="dateInput"
                  v-model="newDate"
                  type="date"
                  @blur="editDateState = false"
                />
              </div>
              <div v-else class="value">
                {{ user.dateOfBirth || "Не вказано" }}
              </div>
            </div>
          </div>

          <div class="option_block">
            <div class="option_block_head">
              <div class="info">
                <p>Номер телефону:</p>
              </div>
              <button @click="openEditor('phone')">
                <EditIcon v-if="!editPhoneState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>
            <div class="option_block_content">
              <div v-if="editPhoneState" class="input_wrapper">
                <input
                  ref="phoneInput"
                  v-model="newPhoneNumber"
                  type="text"
                  placeholder="Введіть номер"
                />
              </div>
              <div v-else class="value">{{ `${user.phoneNumber || "-"}` }}</div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <button class="cancel_btn" @click="modalStore.closeModal">Скасувати</button>
          <button class="agree_btn" @click="saveUser">Зберегти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useModalStore } from "@/store/modal-store";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import EditIcon from "~/assets/icons/edit-btn.svg";

const modalStore = useModalStore();

// const emit = defineEmits(["save-user"]);

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

const editNameState = ref(false);
const editFamilyState = ref(false);
const editDateState = ref(false);
const editPhoneState = ref(false);

const newName = ref(null);
const newFamily = ref(null);
const newDate = ref(null);
const newPhoneNumber = ref(null);

const nameInput = ref(null);
const familyInput = ref(null);
const dateInput = ref(null);
const phoneInput = ref(null);

const loaderState = ref(false);

// const showTooltip = ref(false);
// const tooltipStatus = ref("");
// const tooltipMessage = ref("");

// FUNCTIONS

const closeAllEditors = () => {
  editNameState.value = false;
  editFamilyState.value = false;
  editDateState.value = false;
  editPhoneState.value = false;
};

const openEditor = async (type) => {
  const isOpened =
    (type === "name" && editNameState.value) ||
    (type === "surname" && editFamilyState.value) ||
    (type === "date" && editDateState.value) ||
    (type === "phone" && editPhoneState.value);

  closeAllEditors();

  if (isOpened) return;

  switch (type) {
    case "name":
      editNameState.value = true;
      break;

    case "surname":
      editFamilyState.value = true;
      break;

    case "date":
      editDateState.value = true;
      break;

    case "phone":
      editPhoneState.value = true;
      break;
  }

  await nextTick();

  switch (type) {
    case "name":
      nameInput.value?.focus();
      break;

    case "surname":
      familyInput.value?.focus();
      break;

    case "date":
      dateInput.value?.focus();
      break;

    case "phone":
      phoneInput.value?.focus();
      break;
  }
};

// const tooltip = (obj) => {
//   const { status, message } = obj;

//   tooltipStatus.value = status;
//   tooltipMessage.value = message;
//   showTooltip.value = true;
//   setTimeout(() => {
//     showTooltip.value = false;
//   }, 3000);
// };

const saveUser = async () => {
  // console.log(newName.value, "newName");
  // if (newName.value === null || newName.value.trim() === "" || newName.value.trim().length < 2) {
  //   tooltip({ status: "warning", message: "Перевірте ім'я" });
  //   return;
  // }
  const userNameData = newName.value === null ? props.user.username : newName.value;
  // const userSurnameDate = newFamily.value === null ? props.user.userSurname : newFamily.value;
  const userFamily = newFamily.value === null ? props.user.userFamily : newFamily.value;
  const userDateOfBirthData = newDate.value === null ? props.user.dateOfBirth : newDate.value;
  const userPhoneNumber =
    newPhoneNumber.value === null ? props.user.phoneNumber : newPhoneNumber.value;
  try {
    loaderState.value = true;
    const saveInformation = await $fetch("/api/users/update-user", {
      method: "PATCH",
      body: {
        userId: props.user.id,
        userName: userNameData,
        userFamily: userFamily,
        dateOfBirth: userDateOfBirthData,
        phoneNumber: userPhoneNumber
      }
    });
    if (saveInformation.statusCode !== 200) {
      console.log("Error during update user information");
      return;
    }
    alert("Інформацію успішно оновлено");
  } catch (err) {
    console.log("Помилка при редагуванні інформації користувача", err);
  } finally {
    loaderState.value = false;
  }
};

onMounted(() => {
  console.log(props.user, "props user");
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.edit_option_layout {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);

  z-index: 100;
}

.edit_content_wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit_option_content {
  width: 520px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  background: #121212;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);

  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
    max-width: unset;
    max-height: unset;
    border-radius: unset;
    border: unset;
    justify-content: space-between;
  }
}

.loader_content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  backdrop-filter: blur(7px);
  top: 0;
  left: 0;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-grey);

  button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.middle {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .input_wrapper {
    width: 100%;
    height: auto;
    position: relative;
    margin-bottom: 0;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    background: rgb(40, 40, 40);
    color: white;
    border: 1px solid transparent;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }

  @media screen and (max-width: 480px) {
    height: stretch;
    padding: 15px 8px;
    gap: 10px;
  }
}

.option_block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  background: #1a1a1a;

  &_head {
    flex: 1;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 10px 12px 5px;
    gap: 50px;

    svg {
      width: 100%;
      height: 100%;
      fill: var(--accent-color);
      padding: 6px;
    }

    button {
      width: 30px;
      height: 30px;
      aspect-ratio: 1 / 1;
      cursor: pointer;
    }
  }

  &_content {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    padding: 10px 12px;

    .value {
      background: rgb(40, 40, 40);
      width: 100%;
      height: auto;
      border-radius: 6px;
      padding: 5px 10px;
    }
  }
}

.value {
  font-weight: 400;
  color: var(--text-color);
  font-size: 1rem;
}

.info p {
  color: white;
}

.bottom {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 16px;

  .cancel_btn {
    @include mixins.transparentBtn;
    padding: 5px 25px;
    font-size: 1rem;
    flex: 0;
  }

  .agree_btn {
    @include mixins.accentBtn;
    padding: 5px 25px;
    font-size: 1rem;
    flex: 0;
  }

  @media screen and (max-width: 480px) {
    & {
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      padding-bottom: 30px;
    }
    .agree_btn,
    .cancel_btn {
      flex: 1;
      width: 100%;
    }
    .cancel_btn {
      border-color: var(--accent-color);
    }
  }
}
</style>
