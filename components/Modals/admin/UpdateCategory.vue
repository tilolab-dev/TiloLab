<template>
  <div class="update_category_overlay">
    <SharedError
      v-if="errorState.error"
      class="update_category_error"
      @close="closeError"
      @confirm="confirmError"
    >
      <template #title> {{ errorState.title }}</template>
      <template #text1>{{ errorState.text1 }}</template>
      <template #text2>{{ errorState.text2 }}</template>
    </SharedError>

    <div class="add_category_content">
      <div v-if="loaderState" class="loader_content">
        <SharedLoader />
      </div>

      <div class="add_category">
        <div class="top_row flex justify-between items-center">
          <h2>Оновити категорію</h2>
          <button @click="modalStore.closeModal">
            <CloseIcon />
          </button>
        </div>
        <div class="main_modal flex flex-col gap-2 mt-5">
          <div class="add_icon">
            <span class="default_text"> Іконка категорії (не обов'язково) </span>
            <div class="icon_wrapper">
              <div class="label_wrapper">
                <label v-if="!fileReady" for="file_out" class="icon-label">
                  <span> Оберіть файл </span>
                  <SvgIcon name="download-btn" size="micro" fill="rgb(79, 79, 79)" />
                </label>
                <div v-else class="icon-label label_disabled">
                  <span> Оберіть файл </span>
                  <SvgIcon name="download-btn" size="micro" fill="rgb(79, 79, 79)" />
                </div>
                <input
                  id="file_out"
                  ref="fileInput"
                  type="file"
                  class="icon-file"
                  @change="handleFileUpload"
                />
              </div>
              <div class="icon_preview">
                <SvgIcon
                  v-if="!fileReady"
                  name="default-picture"
                  size="big"
                  fill="rgb(79, 79, 79)"
                />
                <div v-else class="img_preview_wrapper">
                  <button
                    class="delete_btn"
                    @click="
                      errorHandler(
                        'Видалити категорію',
                        'Файл категорії буде видалений остаточно',
                        'Ви впевнені що хочете видалити файл?',
                        'removeCategory'
                      )
                    "
                  >
                    <CloseIcon />
                  </button>
                  <img :src="filePreview" alt="Preview" class="h-10 w-10 object-cover" />
                </div>
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
            <label for="categoryCheckbox" class="checkbox-elem"> </label>
          </div>
        </div>
        <div class="button-group flex justify-end items-center gap-2 w-full">
          <button class="closeModal" @click="resetForm">Очистити форму</button>
          <button class="addItem" @click="updateCategoryData">Оновити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useModalStore } from "@/store/modal-store";
import { useCategoryStore } from "@/store/category-store";
// import { useFetch, useAsyncData } from "nuxt/app";
// import { transliterate } from "@/utils/transliterate";

import SvgIcon from "@/components/shared/SvgIcon.vue";
import CloseIcon from "~/assets/icons/close-icon.svg";

const modalStore = useModalStore();
const categoryStore = useCategoryStore();
// const emit = defineEmits([]);

const loaderState = ref(false);

const file = ref(null);
const fileReady = ref(false);
const fileInput = ref(null);
const filePreview = ref(null);
const uploadProgress = ref(null);
const uploadStatus = ref("");
const categoryNameUk = ref("");
const fileChangedState = ref(false);
const categoryTextUk = ref("");
const categoryVisible = ref(false);

const modalProps = defineProps({
  category: {
    type: Object,
    required: true
  }
});

const errorState = reactive({
  error: false,
  title: "",
  text1: "",
  text2: "",
  method: "",
  item: null
});

const errorHandler = (title, text1, text2, method, item) => {
  errorState.error = true;
  errorState.title = title;
  errorState.text1 = text1;
  errorState.text2 = text2;
  errorState.method = method;
  errorState.item = item;
};

const closeError = () => {
  errorState.error = false;
  errorState.title = "";
  errorState.text1 = "";
  errorState.text2 = "";
  errorState.method = "";
  errorState.item = null;
};

const confirmError = async () => {
  loaderState.value = true;

  try {
    const deleteRes = await $fetch("/api/upload", {
      method: "DELETE",
      body: {
        itemId: modalProps.category.id,
        itemUrl: modalProps.category.categoryImg,
        methodType: "categoryImg"
      }
    });

    await categoryStore.getCategories();

    if (deleteRes.success) {
      file.value = null;
      filePreview.value = null;
      fileReady.value = false;
      fileInput.value = null;
      fileChangedState.value = true;

      alert(deleteRes.message);
    }
  } catch (error) {
    console.log(error);
  }

  loaderState.value = false;

  errorState.error = false;
  errorState.title = "";
  errorState.text1 = "";
  errorState.text2 = "";
  errorState.method = "";
  errorState.item = null;
};

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
    fileChangedState.value = true;
    fileReady.value = true;
  } else {
    // console.error('Файл повинен бути формату .svg .png');
    // emit("tooltip", {
    //   status: "error",
    //   message: "Файл повинен бути формату .svg .png"
    // });
    alert("Файл повинен бути формату .svg .png, webp");
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
  categoryVisible.value = false;
  categoryTextUk.value = "";
};

const updateCategoryData = async () => {
  loaderState.value = true;
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

  const uploadAllData = async () => {
    let imageUrl = modalProps.category.categoryImg;

    if (fileChangedState.value) {
      imageUrl = await uploadCategoryFile();
    }

    try {
      await categoryStore.updateCategory(modalProps.category.id, {
        group: translitString,
        visible: categoryVisible.value,
        translations: [
          {
            language: "uk",
            title: categoryNameUk.value,
            description: categoryTextUk.value
          }
        ],
        categoryImg: imageUrl
      });

      // resetForm();
      loaderState.value = false;
      fileChangedState.value = false;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  uploadAllData();
};

onMounted(() => {
  if (modalProps.category.categoryImg !== null) {
    filePreview.value = modalProps.category.categoryImg;
    fileReady.value = true;
  }
  categoryNameUk.value = modalProps.category.translations[0].title;
  categoryTextUk.value = modalProps.category.translations[0].description;
  categoryVisible.value = modalProps.category.visible;
});
</script>

<style scoped lang="scss">
.update_category_error {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
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

  .loader_content {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(7px);
  }
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

      .delete_btn {
        width: 20px;
        height: 20px;
        position: absolute;
        cursor: pointer;
        z-index: 1;
        top: -55%;
        right: -10px;
        background: var(--accent-red);
        padding: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        svg {
          fill: unset;
          stroke: var(--text-color);
        }
      }

      svg {
        fill: var(--accent-color);
      }

      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        transform: translateY(-15px);
      }

      .img_preview_wrapper {
        width: fit-content;
        height: auto;
        position: relative;
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

    .label_disabled {
      background-color: var(--accent-grey);
      border: 1px solid var(--text-grey);
      cursor: not-allowed;
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
      margin: 20px 0 20px;
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
