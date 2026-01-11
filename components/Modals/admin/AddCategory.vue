<template>
  <div class="add_category_content">
    <div class="add_category">
      <div class="top_row flex justify-between items-center">
        <h2>Додати категорію</h2>
        <button @click="modalStore.closeModal">
          <!-- <SvgIcon name="close-btn" size="micro" fill="" /> -->
          <CloseIcon />
        </button>
      </div>
      <div class="main_modal flex flex-col gap-2 mt-5">
        <div class="add_icon">
          <span class="default_text"> Іконка категорії (не обов'язково) </span>
          <div class="icon_wrapper">
            <div class="label_wrapper">
              <label for="file_out" class="icon-label">
                <span> Оберіть файл </span>
                <SvgIcon name="download-btn" size="micro" fill="rgb(79, 79, 79)" />
              </label>
              <input
                id="file_out"
                ref="fileInput"
                type="file"
                class="icon-file"
                @change="handleFileUpload"
              />
            </div>
            <div class="icon_preview">
              <SvgIcon v-if="!fileReady" name="default-picture" size="big" fill="rgb(79, 79, 79)" />
              <img
                v-if="fileReady"
                :src="filePreview"
                alt="Preview"
                class="h-10 w-10 object-cover"
              />
            </div>

            <span v-if="!fileReady" class="file_note">
              ( Файл повинен бути формату .svg .png )
            </span>
            <span v-if="fileReady" class="file_ready"> Файл готовий для завантаження </span>
          </div>
        </div>
        <div class="category-name-wrap">
          <div class="add-description">
            <span class="default_text"> Назва категорії (українською) </span>

            <input
              v-model="categoryNameUk"
              class=""
              type="text"
              placeholder="Введіть назву категорії"
            />
          </div>
        </div>
        <div class="category_description flex flex-col gap-2 mt-5">
          <span class="default_text text-[var(--dark-color)] font-sm text-base">
            Опис категорії (українською)
          </span>
          <textarea
            id=""
            v-model="categoryTextUk"
            class="border border-solid border-[var(--dark-color)] resize-none rounded-lg p-2"
            placeholder="Введіть опис категорії"
            name="textUk"
            rows="3"
          />
        </div>

        <div class="checkbox_wrapper flex flex-col">
          <span class="default_text text-[var(--dark-color)] font-sm text-base pb-2">
            Показувати групу на сайті? (опціонально)
          </span>

          <input id="categoryCheckbox" v-model="categoryVisible" type="checkbox" />
          <label for="categoryCheckbox" class="checkbox-elem">
            <!-- <div class="radio-btn"></div> -->
          </label>

          <!-- <input
            id="categoryCheckbox"
            v-model="categoryVisible"
            class="checkbox_input"
            type="checkbox"
          />
          <label for="categoryCheckbox" class=""></label> -->
        </div>
      </div>
      <div class="button-group flex justify-end items-center gap-2 w-full">
        <!-- <button @click="testAlertHandler">Test Alert</button> -->
        <!-- <button @click="getData">get cat</button> -->
        <button class="closeModal" @click="shareData">Скасувати</button>
        <button class="addItem" @click="addNewCategory">Додати</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useModalStore } from "@/store/modal-store";
// import { useFetch, useAsyncData } from "nuxt/app";
// import { transliterate } from "@/utils/transliterate";

import SvgIcon from "@/components/shared/SvgIcon.vue";
import CloseIcon from "~/assets/icons/close-icon.svg";

const modalStore = useModalStore();
const emit = defineEmits([]);

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
    emit("tooltip", {
      status: "error",
      message: "Файл повинен бути формату .svg .png"
    });
    resetForm();
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
  // categoryTextEn.value = '';
  // categoryTextRu.value = '';
  // categoryTextUk.value = '';
};

// const sendData = () => {
//   resetForm();
//   emit("tooltip", {
//     status: "success",
//     message: "Категорія успішно додана"
//   });
//   setTimeout(() => {
//     modalStore.closeModal();
//   }, 1000);
// };

// const testAlertHandler = () => {
//   alert("Категорія успішно додана");
// };

const addNewCategory = () => {
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
  //       message: "Заповніть назву категорії Українською",
  //     });
  //     return;
  //   } else if (categoryNameEn.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть назву категорії Англійською",
  //     });
  //     return;
  //   } else if (categoryNameRu.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть назву категорії Російською",
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
  //       message: "Заповніть опис категорії Українською",
  //     });
  //     return;
  //   } else if (categoryTextEn.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть опис категорії Англійською",
  //     });
  //     return;
  //   } else if (categoryTextRu.value.length < 1) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Заповніть опис категорії Російською",
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
    // const formData = new FormData();

    // const jsonData = {
    //   group: translitString,
    //   visible: categoryVisible.value,
    //   translations: [
    //     {
    //       language: "uk",
    //       title: categoryNameUk.value,
    //       description: categoryTextUk.value,
    //     },
    //     {
    //       language: "en",
    //       title: categoryNameEn.value,
    //       description: categoryTextEn.value,
    //     },
    //     {
    //       language: "ru",
    //       title: categoryNameRu.value,
    //       description: categoryTextRu.value,
    //     },
    //   ],
    //   categoryImg: categoryIconPath,
    // };
    // formData.append("data", JSON.stringify(jsonData));

    // console.log('log')

    try {
      const response = await $fetch("/api/category", {
        method: "POST",
        body: {
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
        }
      });

      return response;
    } catch (error) {
      console.log(error.message, "error from uploadData");
    }
  };

  const uploadAllData = async () => {
    try {
      const categoryIconPath = await uploadCategoryFile();

      console.log(categoryIconPath, "categoryIconPath");

      //   if (!categoryIconPath) {
      //     alert("Файл не был загружен, попробуйте снова");
      //     // emit("tooltip", {
      //     //   status: "error",
      //     //   message: "Файл не был загружен, попробуйте снова",
      //     // });
      //     return;
      //   }
      const resultUpload = await uploadData(categoryIconPath);

      console.log(resultUpload, "resultUpload");

      alert("Категорія успішно додана");
      //   emit("tooltip", {
      //     status: "success",
      //     message: "Категорія успішно додана",
      //   });
      resetForm();
      // resetTextFields();
    } catch (error) {
      emit("tooltip", {
        status: "error",
        message: `Помилка при додаванні категорії ${error}`
      });
    }
  };

  uploadAllData();
};

const shareData = async () => {
  const translitString = transliterate(categoryNameUk.value);

  if (
    categoryNameUk.value.length < 1 &&
    categoryNameEn.value.length < 1 &&
    categoryNameRu.value.length < 1
  ) {
    emit("tooltip", {
      status: "error",
      message: "Заповніть всі поля"
    });
    return;
  } else if (categoryNameUk.value.length < 1) {
    emit("tooltip", {
      status: "error",
      message: "Заповніть назву категорії Українською"
    });
    return;
  } else if (categoryNameEn.value.length < 1) {
    emit("tooltip", {
      status: "error",
      message: "Заповніть назву категорії Англійською"
    });
    return;
  } else if (categoryNameRu.value.length < 1) {
    emit("tooltip", {
      status: "error",
      message: "Заповніть назву категорії Російською"
    });
    return;
  } else if (!file.value) {
    emit("tooltip", {
      status: "error",
      message: "Оберіть іконку для обраної категорії"
    });
    return;
  }

  const formData = new FormData();
  formData.append("image", file.value);
  formData.append("group", translitString.toLowerCase());
  formData.append("titleUk", categoryNameUk.value.toLowerCase());
  formData.append("titleEn", categoryNameEn.value.toLowerCase());
  formData.append("titleRu", categoryNameRu.value.toLowerCase());
  formData.append("visible", categoryVisible.value);

  const res = await $fetch("/api/category", {
    method: "POST",

    body: formData
  });
  resetForm();

  // resetTextFields();

  emit("tooltip", {
    status: res.tooltipStatus,
    message: `Категорія ${res.message} успішно створена`
  });
};

// const getData = async () => {
//   try {
//     const resData = await $fetch("/api/category");
//     console.log(resData, "resData from getData");
//   } catch (error) {
//     console.log(error.message, "error from getData");
//   }
// };
</script>

<style scoped lang="scss">
.add_category_content {
  position: fixed;
  top: 30%;
  transform: translateY(-50%);
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  overflow-x: hidden;
  height: fit-content;
  position: relative;
  overflow: hidden;
}
.top_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    cursor: pointer;
  }
  svg {
    width: 20px;
    height: 20px;
    stroke: var(--accent-grey);
    transition: all ease 0.3s;

    @media screen and (min-width: 1024px) {
      &:hover {
        stroke: var(--accent-red);
        transition: all ease 0.3s;
      }
    }
    @media screen and (max-width: 1024px) {
      & {
        stroke: var(--accent-red);
      }
    }
  }
}
.add_category {
  position: relative;
  width: 100%;
  height: auto;
  padding: 20px;

  h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    color: var(--text-grey);
    font-weight: 700;
  }

  input {
    // border: 1px solid rgb(79, 79, 79);
    border: 1px solid rgba(255, 169, 214, 0.3);
    background: black;
    border-radius: 10px;
    padding: 10px 5px;
    width: 100%;
    color: var(--text-grey);
    margin-top: 10px;
  }

  textarea {
    border: 1px solid rgba(255, 169, 214, 0.3);
    background: black;
    resize: none;
    border-radius: 8px;
    color: var(--text-grey);
    padding: 10px 5px;
  }

  .top_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main_modal {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  .default_text {
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--text-grey);
    font-weight: 700;
  }
  .icon_wrapper {
    display: grid;
    grid-template-columns: 4fr 1fr;
    padding-top: 0.5rem;
    .icon_preview {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        fill: var(--accent-color);
      }

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        transform: translateY(-15px);
      }
    }
  }
  .label_wrapper {
    .icon-label {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      height: 32px;
      padding: 8px 20px 7px;
      border-radius: 5px;
      font-size: 0.75rem;
      font-weight: 600;
      text-align: center;
      background-color: var(--btn-color);
      border: 1px solid var(--border-color);
      color: var(--text-color);
      cursor: pointer;

      svg {
        fill: var(--text-color);
      }
    }

    .icon-file {
      display: none;
    }
  }

  .file_note {
    margin-top: 0.35rem;
    font-weight: 300;
    font-size: 0.8rem;
    color: var(--text-grey);
  }

  .category_description {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .checkbox_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;

    input {
      display: none;
    }
    .checkbox-elem {
      width: 18px;
      height: 18px;
      border: 2px solid var(--accent-color);
      border-radius: 50%;
      cursor: pointer;
    }
    input[type="checkbox"]:checked + label {
      border: 5px solid var(--accent-color);
    }
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    width: 100%;

    button {
      // border: 1px solid var(--dark-color);
      // background: rgb(78, 78, 78);
      margin: 20px 0 20px;
      // @include mixins.defaultShadow;
      // @include mixins.descriptionText(500, var(--dark-color));
      padding: 3px 6px;
      font-size: clamp(0.6rem, 1vw, 1rem);
      color: white;
      font-weight: 500;
      border-radius: 5px;
    }
    .closeModal {
      background: black;
      border: 1px solid rgba(255, 169, 214, 0.3);
    }
    .addItem {
      background: var(--btn-color);
      border: 1px solid var(--border-color);
    }
  }
}
</style>
