<template>
  <div class="add_category_content">
    <Transition name="fade">
      <div v-if="loaderState" class="loader_content">
        <SharedLoader />
      </div>
    </Transition>
    <div class="add_category">
      <div class="top_row">
        <h2>Додати категорію</h2>
        <button @click="modalStore.closeModal">
          <CloseIcon />
        </button>
      </div>
      <div class="main_modal">
        <div class="add_icon">
          <span class="default_text"> Іконка категорії (не обов'язково) </span>
          <div class="icon_wrapper">
            <div class="icon_preview" :class="{ icon_preview_filled: fileReady }">
              <SvgIcon
                v-if="!fileReady"
                name="default-picture"
                size="big"
                fill="rgb(120, 120, 122)"
              />
              <img v-if="fileReady" :src="filePreview" alt="Preview" class="preview_img" />
            </div>

            <div class="label_wrapper">
              <label for="file_out" class="icon-label">
                <SvgIcon name="download-btn" size="micro" fill="currentColor" />
                <span> Оберіть файл </span>
              </label>
              <input
                id="file_out"
                ref="fileInput"
                type="file"
                class="icon-file"
                @change="handleFileUpload"
              />

              <span v-if="!fileReady" class="file_note"> Формат .svg .png .webp </span>
              <span v-if="fileReady" class="file_ready">
                <span class="dot"></span>
                Файл готовий для завантаження
              </span>
            </div>
          </div>
        </div>
        <div class="category-name-wrap">
          <div class="add-description">
            <span class="default_text"> Назва категорії (українською) </span>

            <input
              v-model="categoryNameUk"
              class=""
              type="text"
              placeholder="Введіть назву категорії"
            />
          </div>
        </div>
        <div class="category_description">
          <span class="default_text"> Опис категорії (українською) </span>
          <textarea
            id=""
            v-model="categoryTextUk"
            class=""
            placeholder="Введіть опис категорії"
            name="textUk"
            rows="3"
          />
        </div>

        <div class="checkbox_wrapper">
          <input id="categoryCheckbox" v-model="categoryVisible" type="checkbox" />
          <label for="categoryCheckbox" class="checkbox-elem"></label>
          <span class="default_text"> Показувати групу на сайті? (опціонально) </span>
        </div>
      </div>
      <div class="button-group">
        <button class="closeModal" @click="resetForm">Скасувати</button>
        <button class="addItem" @click="addNewCategory">Додати</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useModalStore } from "@/store/modal-store";
import { useCategoryStore } from "@/store/category-store";
// import { useFetch, useAsyncData } from "nuxt/app";
// import { transliterate } from "@/utils/transliterate";

import SvgIcon from "@/components/shared/SvgIcon.vue";
import CloseIcon from "~/assets/icons/close-icon.svg";

const modalStore = useModalStore();
const categoryStore = useCategoryStore();
const emit = defineEmits(["tooltip"]);

const file = ref(null);
const fileReady = ref(false);
const fileInput = ref(null);
const filePreview = ref(null);
const uploadProgress = ref(null);
const uploadStatus = ref("");
const categoryNameUk = ref("");
const categoryNameEn = ref("");
const categoryNameRu = ref("");

const categoryTextUk = ref("");

const categoryVisible = ref(false);

const loaderState = ref(false);

const handleFileUpload = (event) => {
  const accessedFormat = ["svg", "png", "webp"];
  const selectedFile = event.target.files[0];
  const accessedFile = accessedFormat.some((item) => selectedFile.name.includes(item));

  if (accessedFile) {
    file.value = selectedFile;
    fileReady.value = false;
    uploadProgress.value = 0;
    uploadStatus.value = "";

    const reader = new FileReader();
    reader.onload = () => {
      filePreview.value = reader.result;
    };
    reader.readAsDataURL(selectedFile);
    fileReady.value = true;
  } else {
    // console.error('Файл повинен бути формату .svg .png');
    // emit("tooltip", {
    //   status: "error",
    //   message: "Файл повинен бути формату .svg .png"
    // });
    alert("Файл повинен бути формату .svg .png, webp");
    resetForm();
    modalStore.closeModal();
    return;
  }
};

const resetForm = () => {
  file.value = null;
  fileReady.value = false;
  fileInput.value = null;
  filePreview.value = null;
  uploadProgress.value = null;
  uploadStatus.value = "";
  categoryNameUk.value = "";
  categoryNameEn.value = "";
  categoryNameRu.value = "";
  categoryVisible.value = false;
  categoryTextUk.value = "";
};

const addNewCategory = () => {
  loaderState.value = true;
  //   if (
  //     categoryNameUk.value.length < 1 &&
  //     categoryNameEn.value.length < 1 &&
  //     categoryNameRu.value.length < 1
  //   ) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть всі поля",
  //     });
  //     return;
  //   } else if (categoryNameUk.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть назву категорії Українською",
  //     });
  //     return;
  //   } else if (categoryNameEn.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть назву категорії Англійською",
  //     });
  //     return;
  //   } else if (categoryNameRu.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть назву категорії Російською",
  //     });
  //     return;
  //   } else if (!file.value) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Оберіть іконку для обраної категорії",
  //     });
  //     return;
  //   } else if (categoryTextUk.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть опис категорії Українською",
  //     });
  //     return;
  //   } else if (categoryTextEn.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть опис категорії Англійською",
  //     });
  //     return;
  //   } else if (categoryTextRu.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть опис категорії Російською",
  //     });
  //     return;
  //   } else if (!file.value) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Оберіть іконку для обраної категорії",
  //     });
  //     return;
  //   }

  const translitString = transliterate(categoryNameUk.value);
  const categoryName = translitString.trim().replaceAll(" ", "-").toLowerCase();

  const uploadCategoryFile = async () => {
    const formData = new FormData();

    // const checkFileValue = file.value ? true : false;

    // console.log(checkFileValue, "FILE VALUE");

    if (!file.value) {
      return "";
    }

    try {
      formData.append(`category-icon/${categoryName}`, file.value);

      const response = await $fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      if (response.success) {
        return response.data[0].filePath;
      } else {
        alert("Помилка при завантаженні іконки категорії");
        //  alert("tooltip",
        // emit("tooltip", {
        //   status: "error",
        //   message: "Помилка при завантаженні іконки категорії",
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadData = async (categoryIconPath) => {
    try {
      const responce = await categoryStore.createNewCategory({
        group: translitString,
        visible: categoryVisible.value,
        translations: [
          {
            language: "uk",
            title: categoryNameUk.value,
            description: categoryTextUk.value
          }
        ],
        categoryImg: categoryIconPath
      });

      return responce;
    } catch (error) {
      console.log(error.message, "error from uploadData");
    }
  };

  const uploadAllData = async () => {
    try {
      const categoryIconPath = await uploadCategoryFile();

      const uploadNewCategory = await uploadData(categoryIconPath);

      // alert("Категорія успішно додана");
      //   emit("tooltip", {
      //     status: "success",
      //     message: "Категорія успішно додана",

      //   });

      if (uploadNewCategory.statusCode === 200) {
        alert("Категорія успішно додана");
        emit("tooltip", {
          status: "success",
          message: "Категорія успішно додана"
        });
      }

      loaderState.value = false;

      resetForm();
    } catch (error) {
      // emit("tooltip", {
      //   status: "error",
      //   message: `Помилка при додаванні категорії ${error}`
      // });
      alert(`Помилка при додаванні категорії`);
      loaderState.value = false;
      console.log(error);
    }
  };

  uploadAllData();
};
</script>

<style scoped lang="scss">
@use "@/style/mixins.scss" as mixins;

.add_category_content {
  top: 30%;
  transform: translateY(-50%);
  background:
    linear-gradient(180deg, rgba(255, 169, 214, 0.05) 0%, rgba(255, 169, 214, 0) 30%),
    var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow-x: hidden;
  height: -webkit-fill-available;
  min-height: 80dvh;
  // height: fit-content;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  box-shadow:
    0 24px 60px -20px rgba(0, 0, 0, 0.65),
    0 0 40px -12px rgba(255, 169, 214, 0.16);

  .loader_content {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgba(13, 12, 13, 0.55);
    backdrop-filter: blur(7px);
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    transform: translateY(0);
    border-radius: 0;
    border: unset;
    left: 0;
    top: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.top_row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    transition: all ease 0.25s;
  }

  svg {
    width: 15px;
    height: 15px;
    stroke: var(--dark-text);
    transition: all ease 0.25s;
  }

  @media screen and (min-width: 1024px) {
    button:hover {
      background: rgba(255, 64, 128, 0.1);
      border-color: var(--error-border);
      svg {
        stroke: var(--error-border);
      }
    }
  }
  @media screen and (max-width: 1024px) {
    svg {
      stroke: var(--error-border);
    }
  }
}

.add_category {
  position: relative;
  width: 100%;
  height: auto;
  padding: 28px 32px 24px;

  h2 {
    @include mixins.titleText;
    font-size: 1.375rem;
    text-transform: none;
    letter-spacing: normal;
  }

  input[type="text"] {
    @include mixins.mainText;
    font-size: 0.9375rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    padding: 12px 14px;
    width: 100%;
    color: var(--text-color);
    margin-top: 10px;
    transition: border-color ease 0.25s;
    outline: none;

    &::placeholder {
      color: var(--dark-text);
    }

    &:focus {
      border-color: var(--border-color);
    }
  }

  textarea {
    @include mixins.mainText;
    font-size: 0.9375rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    resize: none;
    border-radius: 10px;
    color: var(--text-color);
    padding: 12px 14px;
    width: 100%;
    outline: none;
    transition: border-color ease 0.25s;

    &::placeholder {
      color: var(--dark-text);
    }

    &:focus {
      border-color: var(--border-color);
    }
  }

  .main_modal {
    display: flex;
    flex-direction: column;
    gap: 22px;
    margin-top: 24px;
  }

  .default_text {
    @include mixins.mainText;
    font-size: 0.875rem;
    color: var(--dark-text);
    font-weight: 500;
  }

  .icon_wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 0.75rem;

    .icon_preview {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 64px;
      height: 64px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px dashed rgba(255, 255, 255, 0.16);
      transition: all ease 0.25s;

      svg {
        fill: var(--dark-text);
      }

      .preview_img {
        width: 100%;
        height: 100%;
        border-radius: 14px;
        object-fit: cover;
      }
    }

    .icon_preview_filled {
      border: 1px solid var(--border-color);
      background: rgba(255, 169, 214, 0.06);
    }
  }

  .label_wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    .icon-label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      height: 34px;
      padding: 0 18px;
      border-radius: 8px;
      font-size: 0.8125rem;
      font-weight: 600;
      text-align: center;
      background-color: var(--btn-color);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      cursor: pointer;
      transition: all ease 0.25s;

      svg {
        fill: var(--text-color);
      }

      @media screen and (min-width: 1024px) {
        &:hover {
          background-color: var(--btn-color-hover);
        }
      }
      &:active {
        background-color: var(--btn-color-active);
      }
    }

    .icon-file {
      display: none;
    }
  }

  .file_note {
    font-weight: 400;
    font-size: 0.75rem;
    color: var(--dark-text);
  }

  .file_ready {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    font-size: 0.75rem;
    color: var(--success-text);

    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--success-border);
      flex-shrink: 0;
    }
  }

  .category_description {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .category-name-wrap {
    .add-description {
      display: flex;
      flex-direction: column;
    }
  }

  .checkbox_wrapper {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;

    input {
      display: none;
    }

    .default_text {
      font-size: 0.875rem;
    }

    .checkbox-elem {
      width: 18px;
      height: 18px;
      border: 2px solid var(--accent-color);
      border-radius: 50%;
      cursor: pointer;
      transition: all ease 0.2s;
      flex-shrink: 0;
    }

    input[type="checkbox"]:checked + label {
      border: 5px solid var(--accent-color);
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    width: 100%;
    margin-top: 28px;

    button {
      @include mixins.mainText;
      padding: 11px 26px;
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all ease 0.25s;

      @media screen and (max-width: 768px) {
        width: 100%;
        font-size: 0.9375rem;
        padding: 13px 0;
      }
    }

    .closeModal {
      background: transparent;
      border: 1px solid var(--dark-text);
      color: var(--text-grey);

      @media screen and (min-width: 1024px) {
        &:hover {
          background: rgba(255, 169, 214, 0.08);
          border-color: var(--border-color);
          color: var(--text-color);
        }
      }
    }

    .addItem {
      background: var(--btn-color);
      border: 1px solid var(--border-color);
      color: var(--text-color);

      @media screen and (min-width: 1024px) {
        &:hover {
          background: var(--btn-color-hover);
        }
      }
      &:active {
        background: var(--btn-color-active);
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
      padding: 30px 0 4px;
      gap: 12px;
      margin-top: 0;
    }
  }

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
