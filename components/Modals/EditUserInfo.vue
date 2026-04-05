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
            <div class="option_wrapper">
              <div class="info">
                <p>Ім'я:</p>
                <div class="value">{{ user.username }}</div>
              </div>

              <button @click="editNameState = !editNameState">
                <EditIcon v-if="!editNameState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>

            <div v-if="editNameState" class="option_wrapper">
              <input v-model="newName" type="text" placeholder="Ім'я" />
            </div>
          </div>

          <div class="option_block">
            <div class="option_wrapper">
              <div class="info">
                <p>Прізвище:</p>
                <div class="value">{{ user.userSurname }}</div>
              </div>

              <button @click="editSurnameState = !editSurnameState">
                <EditIcon v-if="!editSurnameState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>

            <div v-if="editSurnameState" class="option_wrapper">
              <input v-model="newSurname" type="text" placeholder="Прізвище" />
            </div>
          </div>

          <div class="option_block">
            <div class="option_wrapper">
              <div class="info">
                <p>Дата народження:</p>
                <div class="value">
                  {{ user.dateOfBirth || "Не вказано" }}
                </div>
              </div>

              <button @click="editDateState = !editDateState">
                <EditIcon v-if="!editDateState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>

            <div v-if="editDateState" class="option_wrapper">
              <input v-model="newDate" type="date" />
            </div>
          </div>

          <!-- <div class="option_block">
            <div class="option_wrapper">
              <div class="info">
                <p>Номер телефону:</p>
                <div class="value">{{ `user.name` }}</div>
              </div>

              <button @click="editNameState = !editNameState">
                <EditIcon v-if="!editNameState" class="edit-btn" />
                <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
              </button>
            </div>

            <div v-if="editNameState" class="option_wrapper">
              <input v-model="newName" type="text" placeholder="Ім'я" />
            </div>
          </div> -->
        </div>

        <div class="bottom">
          <button class="cancel-btn" @click="modalStore.closeModal">Скасувати</button>
          <button class="agree-btn" @click="saveUser">Зберегти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
const editSurnameState = ref(false);
const editDateState = ref(false);

const newName = ref(null);
const newSurname = ref(null);
const newDate = ref(null);

const loaderState = ref(false);

const saveUser = async () => {
  const userNameData = newName.value === null ? props.user.username : newName.value;
  const userSurnameDate = newSurname.value === null ? props.user.userSurname : newSurname.value;
  const userDateOfBirthData = newDate.value === null ? props.user.dateOfBirth : newDate.value;

  //   console.log(userNameData, userSurnameDate, userDateOfBirthData);

  try {
    loaderState.value = true;

    const saveInformation = await $fetch("/api/users/update-user", {
      method: "PATCH",
      body: {
        userId: props.user.id,
        userName: userNameData,
        userSurname: userSurnameDate,
        dateOfBirth: userDateOfBirthData
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
}

.option_block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #1a1a1a;
}

.option_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 6px;
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

input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  background: #1f1f1f;
  color: white;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

.bottom {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 16px;

  @media screen and (max-width: 480px) {
    & {
      justify-content: center;
      align-items: center;
    }
    button {
      flex: 1;
    }
  }
}
</style>
