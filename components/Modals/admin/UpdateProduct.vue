<template>
  <div class="add_product_content">
    <div v-if="loaderState" class="loader_content">
      <SharedLoader />
    </div>

    <!-- <div  class="error_content"> -->
    <SharedError v-if="errorState.error" @close="closeError" @confirm="confirmError">
      <template #title> {{ errorState.title }}</template>
      <template #text1>{{ errorState.text1 }}</template>
      <template #text2>{{ errorState.text2 }}</template>
    </SharedError>
    <!-- </div> -->

    <div class="add_product">
      <div class="modal_wrapper">
        <div class="add_image">
          <div class="add_image_content">
            <div class="add_image_wrapper">
              <div class="picture_container">
                <div class="picture first"></div>
                <div class="picture second"></div>
                <div class="picture third"></div>
              </div>
              <h2 class="img-title text-center">Завантажте файли зображення</h2>
              <span class="text-center">
                Зображення повинні бути в форматі .jpg, .png, .jpeg, .webp
              </span>
              <label for="product-file" class="icon_label">
                <div class="btn_fill">Вибрати</div>
              </label>

              <input
                id="product-file"
                ref="productFileInput"
                type="file"
                class="hidden"
                multiple
                @change="
                  handleFileUpload(
                    $event,
                    'product',
                    productFileState,
                    productFileState.productFiles.value.length
                  )
                "
              />

              <ul class="current_product_files">
                <li v-for="(img, i) in currentProductFiles" :key="i">
                  <div class="img_wrapper">
                    <button
                      @click="
                        errorHandler(
                          'Видалити зображення',
                          'Файл буде видалено остаточно,',
                          'Ви впевнені що хочете видалити файл?',
                          'removeProductImgDB',
                          img
                        )
                      "
                    >
                      <CloseIcon />
                    </button>
                    <img :src="img.path" alt="current_file" />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="add_image_preview">
            <SvgIcon
              v-if="productFileState.productFilesPreview.value.length === 0"
              name="default-picture"
              size="large"
              fill="var(--border-color)"
            />
            <div
              v-for="(file, index) in productFileState.productFilesPreview.value"
              :key="index"
              class="preview_wrapper"
            >
              <!-- v-else -->

              <div class="remove_btn" @click="removeProductImg(index)">
                <SvgIcon name="close-btn" size="micro" fill="white" />
              </div>
              <img :src="file" alt="preview" />
            </div>
          </div>
        </div>
        <div class="add_info">
          <div class="top_content">
            <h2 class="main_text">Інформація про товар</h2>
            <button @click="closeModal">
              <SvgIcon name="close-btn" size="micro" fill="var(--text-color)" />
            </button>
          </div>

          <div class="header_description">
            <span class="default_text">
              Основна інформація картки товару
              <!-- </span>
                        <span class="
                            text-[var(--dark-color)]
                            font-sm
                            text-base
                        "> -->

              Поля відмічені "
              <strong class="accent_text text-red-500"> * </strong>
              " обовʼязкові для заповнення
            </span>
          </div>
          <div class="options">
            <div class="option main_option">
              <div class="main_option_content">
                <h4 class="default_text">Оберіть категорію товару:<strong> * </strong></h4>
                <select id="wholesaleType" v-model="productCategory" name="wholesaleType">
                  <option selected value>-- {{ productCategory }} --</option>
                  <option
                    v-for="(category, index) in fetchedCategories"
                    :key="index"
                    :value="category.id"
                  >
                    {{ category.translations[0].title }}
                  </option>
                </select>
              </div>

              <div class="main_option_content">
                <h4 class="default_text">
                  Назва товару:
                  <span> ( Українською )</span>
                  <strong> * </strong>
                </h4>
                <div class="text-wrapper">
                  <div class="wrapper">
                    <input v-model="productNameUk" type="text" placeholder="Введіть назву товару" />
                  </div>
                </div>
              </div>
            </div>

            <div class="option description_option">
              <div class="description_option_content">
                <h4 class="default_text">Опис товару: ( Українська )</h4>
                <div class="text-wrapper">
                  <textarea
                    id="descriptionText"
                    v-model="productDescriptionUk"
                    name="descriptionText"
                    placeholder="Введіть опис товару максимум 500 символів"
                  ></textarea>
                </div>
              </div>
              <div class="description_option_content">
                <h4 class="default_text">
                  Відображати кількість товару на складі
                  <strong v-if="productAvailability"> * </strong>
                </h4>
                <div class="checkbox">
                  <!-- <span> Відображати кількість товару на складі </span> -->
                  <input
                    id="stockState"
                    v-model="productStockState"
                    type="checkbox"
                    value="false"
                    @change="productAvailability = !productAvailability"
                  />
                  <label for="stockState" class="product_checkbox"></label>
                </div>
                <input
                  v-if="productAvailability"
                  v-model="productStockValue"
                  class="product_availability"
                  type="number"
                  placeholder="Введіть наявну кількість товару на складі"
                />
              </div>
            </div>

            <h4 class="main_text">Параметри товару:</h4>

            <div class="option">
              <div class="text-wrapper items-stretch">
                <div class="wrapper">
                  <span class="default_text">
                    Ціна товару
                    <strong> * </strong>
                  </span>
                  <input
                    id="productPrice"
                    v-model="productPrice"
                    class="checkbox"
                    type="text"
                    placeholder="Введіть значення розміру"
                  />
                  <label for="productPrice" class="product_checkbox"></label>
                </div>
                <div class="wrapper">
                  <span class="default_text"> Відображати товар на сайті </span>
                  <div class="checkbox-wrap flex items-center justify-start">
                    <input
                      id="productVisibility"
                      v-model="productVisibility"
                      value="false"
                      class="checkbox"
                      type="checkbox"
                    />
                    <label for="productVisibility" class="product_checkbox"></label>
                  </div>
                </div>
                <div class="wrapper">
                  <span class="default_text">
                    Розмір товару
                    <strong> * </strong>
                  </span>
                  <input
                    id="productSize"
                    v-model="productSize"
                    class="checkbox"
                    type="text"
                    placeholder="Введіть значення розміру"
                  />
                  <label for="productSize" class="product_checkbox"></label>
                </div>
                <div class="wrapper">
                  <h4 class="default_text">Матеріал товару</h4>
                  <div class="text-wrapper">
                    <div class="wrapper">
                      <span> Українська </span>
                      <input
                        v-model="productMaterialUk"
                        class=""
                        type="text"
                        placeholder="Введіть матеріал"
                      />
                    </div>
                  </div>
                </div>
                <div class="wrapper">
                  <h4 class="default_text">Країна виробник</h4>
                  <div class="text-wrapper">
                    <div class="wrapper">
                      <span> Українська </span>
                      <input
                        v-model="productManufacture"
                        class=""
                        type="text"
                        placeholder="Введіть країну виробника"
                      />
                    </div>
                  </div>
                </div>
                <div class="wrapper">
                  <h4 class="default_text">Колір товару</h4>
                  <div class="text-wrapper">
                    <div class="wrapper">
                      <span> Українська </span>
                      <input
                        v-model="productColorUk"
                        class=""
                        type="text"
                        placeholder="Введіть колір"
                      />
                    </div>
                  </div>
                </div>
                <div class="wrapper">
                  <span class="default_text"> Акційний товар </span>
                  <div class="checkbox-wrap action_checkbox_wrap flex items-center justify-start">
                    <input
                      id="discountState"
                      v-model="discountState"
                      class="checkbox"
                      type="checkbox"
                    />
                    <label for="discountState" class="product_checkbox"></label>
                  </div>
                </div>
                <div v-if="discountState" class="wrapper">
                  <span class="default_text"> Відсоток знижки </span>
                  <div class="input-wrap flex items-center justify-start">
                    <input
                      id="discountState"
                      v-model="productDiscountPersent"
                      class="discount-price"
                      type="number"
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentOptionFiles.length > 0" class="option add_new">
              <h4 class="option_title">Опції товару:</h4>

              <div class="added_options">
                <ul class="added_options_list">
                  <li
                    v-for="(option, index) in currentOptionFiles"
                    :key="index"
                    class="added_options_item"
                  >
                    <img :src="option.optionImg" alt="img" width="25px" />
                    <div class="separator"></div>
                    <span>
                      {{ option.translations[0].optionInfo }}
                    </span>
                    <div class="separator"></div>
                    <span v-if="option.optionPrice !== 0">
                      {{ option.optionPrice }}
                      UAH
                    </span>
                    <div v-if="option.optionPrice !== 0" class="separator"></div>

                    <button
                      @click="
                        errorHandler(
                          'Видалити опцію',
                          'Опцію буде видалено остаточно',
                          `Ви впевнені, що бажаєте видалити опцію ${option.translations[0].optionInfo} з товару?`,
                          'removeOptionDB',
                          option
                        )
                      "
                    >
                      <SvgIcon name="close-btn" size="micro" fill="rgb(25, 25, 25)" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="option add_new">
              <h4 class="option_title">Додати опцію товару (макс. 10)</h4>
              <div class="add_new_wrap">
                <div class="new_option">
                  <span class="default_text"> Додати файл </span>
                  <div class="new_option_wrapper">
                    <label for="option-upload" class="icon-label">
                      <span> Оберіть файл </span>
                      <SvgIcon name="download-btn" size="micro" fill="var(--border-color)" />
                    </label>
                    <div class="preview">
                      <!-- <img
                        v-if="optionFileState.optionFiles.value.length === 0"
                        class="file-preview w-5"
                        src="../../../public/img/bag.png"
                        alt="preview"
                      />
                      <img
                        v-else
                        :src="optionFileState.optionFilesPreview.value[0]"
                        alt="preview"
                        class="w-5"
                      /> -->
                    </div>

                    <input
                      id="option-upload"
                      ref="optionFileInput"
                      type="file"
                      class="hidden_input"
                      @change="handleFileUpload($event, 'option', optionFileState)"
                    />
                  </div>
                </div>
                <div class="new_option">
                  <div class="option-lang flex flex-col flex-grow">
                    <span class="default_text"> Короткий опис </span>
                    <input
                      v-model="addOptionTextUk"
                      type="text"
                      placeholder="Введіть короткий опис"
                    />
                  </div>
                </div>
                <div class="new_option flex flex-col gap-2">
                  <div class="new_option_wrapper">
                    <span class="default_text"> Додати ціну для опційного товару </span>
                    <div class="checkbox_wrap">
                      <input
                        id="optionPrice"
                        v-model="addOptionPrice"
                        value="false"
                        class="checkbox"
                        type="checkbox"
                      />
                      <label for="optionPrice" class="product_checkbox"></label>
                    </div>
                  </div>
                </div>
                <div v-if="addOptionPrice" class="new_option">
                  <input
                    v-model="optionPrice"
                    type="number"
                    placeholder="Введіть ціну на опційний товар"
                  />
                </div>
                <div class="new_option_btn">
                  <button class="btn_fill" @click="addNewOption('text', 'value')">
                    <!-- @click="addTestData" -->

                    <!-- @click="addNewOption('text', 'value')" -->

                    Додати опцію
                  </button>
                </div>
              </div>

              <div v-if="addOptionsRef.length > 0" class="added_options pt-3">
                <ul class="added_options_list">
                  <li
                    v-for="(option, index) in addOptionsRef"
                    :key="index"
                    class="added_options_item"
                  >
                    <img :src="option.fileImg" alt="img" width="25px" />
                    <div class="separator"></div>
                    <span>
                      {{ option.translations[0].optionInfo }}
                    </span>
                    <div class="separator"></div>
                    <span v-if="option.optionPrice !== 0">
                      {{ option.optionPrice }}
                      UAH
                    </span>
                    <div v-if="option.optionPrice !== 0" class="separator"></div>

                    <button @click="removeOption(index)">
                      <SvgIcon name="close-btn" size="micro" fill="rgb(25, 25, 25)" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="button-group">
            <button class="btn_transparent" @click="clearModal">Очистити форму</button>
            <button class="btn_fill" @click="updateProduct">Оновити товар</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw, reactive } from "vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import CloseIcon from "~/assets/icons/close-icon.svg";
import { useModalStore } from "@/store/modal-store";
import { useCategoryStore } from "@/store/category-store";
import { useProductStore } from "@/store/product-store";

const modalStore = useModalStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const emit = defineEmits(["addNewItem", "tooltip"]);

// helpers
import { useFileUpload } from "@/helpers/uploadFiles";
const { handleFileUpload } = useFileUpload(emit);

const fetchedCategories = ref([]);

const currentProductFiles = ref([]);
const currentOptionFiles = ref([]);

const loaderState = ref(false);
const optionFileInput = ref(null);
const productFileInput = ref(null);
const productCategory = ref("");
const productNameUk = ref("");
const productManufacture = ref("");
const productVisibility = ref(false); // Показывать товар на сайте
const productDescriptionUk = ref("");
const productStockState = ref(false);
const productStockValue = ref(0);
const price = ref(0); // Стандартная цена
const productAvailability = ref(false);
const productDiscountPersent = ref(0); // процент скидки
const productPrice = ref(null);
const productMaterialUk = ref("");
const productColorUk = ref("");

const productSize = ref("");

// ADD OPTION
const addOptionsRef = ref([]);
const discountState = ref(false);
const addOptionTextUk = ref("");
const addOptionPrice = ref(false);
const optionPrice = ref(0);

// option file

const errorState = reactive({
  error: false,
  title: "",
  text1: "",
  text2: "",
  method: "",
  item: null
});

const errorHandler = (title, text1, text2, method, item) => {
  // console.log(item);
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

const deleteImgDb = async (item, path, filetype) => {
  console.log(item);
  loaderState.value = true;

  try {
    const deleteRes = await $fetch("/api/upload", {
      method: "DELETE",
      body: {
        itemId: item.id,
        itemUrl: path,
        methodType: filetype
      }
    });

    await productStore.fetchProducts();

    if (deleteRes.success) {
      alert(deleteRes.message);
      if (filetype === "productImg") {
        console.log(filetype);
        currentProductFiles.value = currentProductFiles.value.filter((productImg) => {
          return productImg.id !== item.id;
        });
      } else {
        currentOptionFiles.value = currentOptionFiles.value.filter((option) => {
          return option.id !== item.id;
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
  loaderState.value = false;
};

const confirmError = () => {
  // METHODS - 'removeProductImg', 'removeOption'
  // TYPES - productImg, optionsImg
  switch (errorState.method) {
    case "removeProductImgDB":
      // console.log(errorState.item.path, "product");
      deleteImgDb(errorState.item, errorState.item.path, "productImg");
      // console.log(errorState.method);
      break;
    case "removeOptionDB":
      //   removeOption(errorState.item);
      // console.log(errorState.item.optionImg, "option");

      deleteImgDb(errorState.item, errorState.item.optionImg, "optionImg");
      // console.log(errorState.method);

      break;
  }
  errorState.error = false;
  errorState.title = "";
  errorState.text1 = "";
  errorState.text2 = "";
  errorState.method = "";
  errorState.item = null;
};

const productFileState = {
  // product files
  productFilesPreview: ref([]),
  productFiles: ref([]),
  productReady: ref(false)
};

const optionFileState = {
  optionFilesPreview: ref([]),
  optionFiles: ref([]),
  optionReady: ref(false)
};

const removeProductImg = (index) => {
  productFileState.productFiles.value.splice(index, 1);
  productFileState.productFilesPreview.value.splice(index, 1);
};

const closeModal = () => {
  modalStore.closeModal();
};

const clearModal = () => {
  productCategory.value = "";
  productVisibility.value = false;
  productFileState.productFiles.value = [];
  productFileState.productFilesPreview.value = [];
  ((productFileState.productReady.value = false), (price.value = 0));
  productStockState.value = false;
  productStockValue.value = 0;
  productDiscountPersent.value = 0;
  productManufacture.value = "";
  productNameUk.value = "";
  productDescriptionUk.value = "";
  addOptionsRef.value = [];
  optionFileState.optionFiles.value = [];
  optionFileState.optionFilesPreview.value = [];
  optionFileState.optionReady.value = false;
  discountState.value = false;
  productAvailability.value = false;
  productMaterialUk.value = "";
  price.value = 0;
  productColorUk.value = "";
  productSize.value = "";
  optionFileInput.value.value = "";
  productFileInput.value.value = "";
  productPrice.value = null;
};

const addNewOption = () => {
  console.log(optionFileState.optionFilesPreview.value, "option ref");

  if (optionFileState.optionFilesPreview.value.length > 0) {
    if (addOptionTextUk.value) {
      addOptionsRef.value.push({
        file: toRaw(optionFileState.optionFiles.value),
        fileImg: optionFileState.optionFilesPreview.value,
        optionPrice: optionPrice.value,
        translations: [
          {
            language: "uk",
            optionInfo: addOptionTextUk.value
          }
        ]
      });
    }

    optionFileState.optionFiles.value = [];
    optionFileState.optionFilesPreview.value = [];
    addOptionTextUk.value = "";
    optionFileInput.value.value = "";
    addOptionPrice.value = false;
    optionPrice.value = 0;
  }
};

const removeOption = (index) => {
  addOptionsRef.value.splice(index, 1);
};

const updateProduct = async () => {
  loaderState.value = true;
  const category = fetchedCategories.value.find((item) => item.id === productCategory.value);

  if (!category) {
    console.warn("Category not found", productCategory.value);
    return;
  }

  const categoryName = category.group.trim().replaceAll(" ", "-").toLowerCase();

  const translitProductName = transliterate(productNameUk.value);
  const productName = translitProductName.replaceAll(" ", "-").toLowerCase().trim();

  // UPLOAD PRODUCT FILE
  const uploadProductFiles = async () => {
    const formData = new FormData();

    try {
      toRaw(productFileState.productFiles.value).map((item) => {
        if (item instanceof File) {
          formData.append(`${categoryName}/${productName}`, item);
        } else {
          console.error("Ошибка: elem.file не является File-объектом", item);
        }
      });

      const productFileUpload = await $fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      if (productFileUpload && Array.isArray(productFileUpload.data)) {
        return productFileUpload.data.map((elem) => elem.filePath);
      } else {
        console.error("Ошибка: productFileUpload не является массивом", productFileUpload);
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // UPLOAD PRODUCT OPTIONS
  const uploadOptionFiles = async () => {
    const formData = new FormData();

    try {
      toRaw(addOptionsRef.value).map((elem) => {
        const rawFile = elem.file[0];

        if (rawFile instanceof File) {
          formData.append(`${categoryName}/${productName}/optionsImg`, rawFile);
        } else {
          console.error("Ошибка: elem.file не является File-объектом", rawFile);
        }
      });

      const optionFileUpload = await $fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      // if (optionFileUpload && Array.isArray(optionFileUpload.data)) {
      //   return optionFileUpload.data.map((elem) => elem.filePath);
      // } else {
      //   console.error("Ошибка: productFileUpload не является массивом", optionFileUpload);
      //   return [];
      // }
      if (optionFileUpload && optionFileUpload.data && Array.isArray(optionFileUpload.data)) {
        return optionFileUpload.data.map(function (elem) {
          return elem.filePath;
        });
      } else {
        console.warn("productFileUpload не является массивом, возвращаем пустой", optionFileUpload);
        return [];
      }
    } catch (error) {
      if (error) {
        console.error(error);
      }
      return [];
    }
  };

  const uploadData = async (productImgPath, optionImgPath) => {
    // toRaw(addOptionsRef.value).map((elem, index) => {
    //   toRaw(elem.fileImg)[0] = optionImgPath[index];
    // });

    const finalImg = [...modalProps.product.img.map((img) => img.path), ...productImgPath];

    const finalOptions = toRaw(addOptionsRef.value).map((option, index) => {
      return {
        optionImg: optionImgPath[index] || option.fileImg[0],
        optionPrice: Number(option.optionPrice),
        translations: option.translations
      };
    });

    const res = await productStore.updateProduct(modalProps.product.id, {
      categoryId: productCategory.value,
      visibility: productVisibility.value,
      img: finalImg,
      productPrice: productPrice.value,
      stockState: productStockState.value,
      stockValue: productStockValue.value,
      discountPercent: productDiscountPersent.value,
      productSize: productSize.value,
      translations: [
        {
          language: "uk",
          title: productNameUk.value,
          description: productDescriptionUk.value,
          productColor: productColorUk.value,
          productMaterial: productMaterialUk.value,
          productManufacture: productManufacture.value
        }
      ],
      options: finalOptions
    });

    return {
      data: res
    };
  };

  const uploadAllData = async () => {
    try {
      const productPromise = productFileState.productFiles.value.length
        ? uploadProductFiles()
        : Promise.resolve([]);

      const optionPromise = addOptionsRef.value.length ? uploadOptionFiles() : Promise.resolve([]);

      const [productImgPath, optionImgPath] = await Promise.all([productPromise, optionPromise]);
      // const [productImgPath, optionImgPath] = await Promise.all([
      //   uploadProductFiles(),
      //   uploadOptionFiles()
      // ]);

      console.log("Изображения загружены:", productImgPath, optionImgPath);

      const result = await uploadData(productImgPath, optionImgPath);

      console.log("Данные загружены:", result);

      loaderState.value = false;
      modalStore.closeModal();

      // alert("Товар оновлено успішно");
      //   emit("tooltip", {
      //     status: "success",
      //     message: "Товар створений успішно",
      //   });
    } catch (error) {
      console.error(error);
      alert(error);
      //   emit("tooltip", {
      //     status: "error",
      //     message: error,
      //   });
    }
  };

  uploadAllData();
};

const modalProps = defineProps({
  product: {
    type: Object,
    required: true
  }
});

onMounted(async () => {
  // console.log(modalProps.product);
  loaderState.value = true;

  // await categoryStore.getCategories();

  // console.log(categoryStore.categoryList);

  fetchedCategories.value = categoryStore.categoryList;
  currentProductFiles.value = modalProps.product.img;
  currentOptionFiles.value = modalProps.product.options;
  productNameUk.value = modalProps.product.translations[0].title;
  productAvailability.value = modalProps.product.stockState;
  productDescriptionUk.value = modalProps.product.translations[0].productDescription;
  productStockState.value = modalProps.product.stockState;
  productStockValue.value = modalProps.product.stockValue;
  productPrice.value = modalProps.product.productPrice;
  productVisibility.value = modalProps.product.visible;
  productSize.value = modalProps.product.productSize;
  productColorUk.value = modalProps.product.translations[0].productColor;
  productMaterialUk.value = modalProps.product.translations[0].productMaterial;
  productManufacture.value = modalProps.product.translations[0].productManufacture;

  discountState.value = modalProps.product.discountPercent > 0 ? true : false;
  productDiscountPersent.value = modalProps.product.discountPercent;

  // productCategory.value = modalProps.product.category.translations[0].title;
  //   console.log(modalProps.product.category.translations[0].title);

  try {
    const getData = await $fetch("/api/category");

    if (getData.data.length > 0) {
      fetchedCategories.value = getData.data.map((item) => ({
        ...item,
        itemLanguage: item.translations.find((translation) => translation.language === "uk")
      }));

      // productCagory.value =
      // const selectedCategory = fetchedCategories.value.find(
      //   (el) => el.id === modalProps.product.category.id
      // );

      productCategory.value = modalProps.product.category.id;
      console.log(productCategory.value, "value");
    }
  } catch (error) {
    console.log(error.message, "error from getData");
  }

  loaderState.value = false;
});
</script>

<style scoped lang="scss">
@use "@/style/mixins.scss" as mixins;

.add_product_content {
  position: fixed;
  top: 0;
  background: var(--bg-color);
  border-radius: 10px;
  overflow-x: hidden;
  height: fit-content;
  color: var(--text-grey);
  overflow: hidden;
  .loader_content {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(7px);
  }
}

.add_product {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  padding-inline: 1.5rem;

  .btn_fill {
    width: fit-content;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--btn-color);
    border: 1px solid var(--border-color);
    color: white;
    font-weight: 600;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    cursor: pointer;
    // transition: all 0.3s ease;
  }
  .btn_transparent {
    width: fit-content;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid rgb(27, 27, 27);
    color: rgb(27, 27, 27);
    font-weight: 600;
    padding: 0.5rem 1.25rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .modal_wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.25rem;
    height: 90vh;
    position: relative;
  }

  .add_image {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1.25rem;
    height: 90vh;

    &_content {
      border-width: 2px;
      border-style: dashed;
      border-color: var(--border-color);
      border-radius: 0.5rem;
      padding: 1.25rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &_wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      top: 2.5rem;
      width: 80%;

      .current_product_files {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        gap: 5px;

        .img_wrapper {
          width: 100px;
          height: 125px;
          position: relative;
          overflow: hidden;
        }

        button {
          width: 25px;
          height: 25px;
          padding-bottom: 5px;
          position: absolute;
          cursor: pointer;
          top: 0;
          right: 0;

          @media screen and (min-width: 1024px) {
            &:hover svg {
              stroke: var(--accent-red);
              transition: all ease 0.3s;
            }
          }
        }

        svg {
          width: 100%;
          height: 100%;
          stroke: var(--text-color);
          transition: all ease 0.3s;
        }

        img {
          width: 100%;
          height: 100%;
          padding-top: 25px;
        }
      }

      h2 {
        @include mixins.subtitleText;
      }

      span {
        @include mixins.mainText;
      }

      .picture_container {
        position: relative;
        margin-bottom: 20px;
      }
      input {
        display: none;
      }
      .picture {
        width: clamp(50px, 10vw, 100px);
        height: clamp(70px, 12vw, 200px);
        max-height: clamp(70px, 15vh, 200px);
        border: 1px solid var(--accent-color);
        border-radius: 10px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) rotate(-10deg);
      }
      .second {
        transform: translateX(-30%) translateY(-5%) rotate(-5deg);
      }
      .third {
        transform: translateX(-10%) translateY(-10%) rotate(0deg);
      }
    }

    &_preview {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.25rem;

      .preview_wrapper {
        width: 50px;
        height: 50px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.25rem;
      }

      .remove_btn {
        border-radius: 50%;
        background-color: var(--accent-red);
        width: 1.25rem;
        height: 1.25rem;
        position: absolute;
        top: -5px;
        right: -5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      img {
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    }

    .image_wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      top: 2.5rem;
      width: 80%;
    }

    h2 {
      // @include mixins.cardText;
      text-align: center;
      margin-bottom: 15px;
    }

    span {
      text-align: center;
      // @include mixins.descriptionText(400, var(--dark-color));
    }
    .icon_label {
      margin-top: 2rem;
    }
    .upload-btn {
      margin: 50px 0 20px;
      // @include mixins.defaultShadow;
      // @include mixins.descriptionText(500, var(--dark-color));
      padding: 10px 20px;
      cursor: pointer;
    }
  }

  .add_info {
    height: 90vh;
    width: fit-content;
    position: relative;

    .main_text {
      @include mixins.mainText;
    }

    .default_text {
      @include mixins.mainText;
      color: var(--grey-color);
      white-space: nowrap;
    }

    .top_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        @include mixins.subtitleText;
        font-size: 1.5rem;
      }
    }

    .header_description {
      .accent_text {
        color: red;
      }
    }

    .options {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: auto;
      max-height: 80%;
      overflow-y: scroll;
      gap: 0.75rem;
      border-width: 1px;
      border-color: var(--dark-color);
      padding: 1rem 1.5rem 1.5rem 0;
      border-radius: 0.5rem;
    }

    input {
      border: 1px solid var(--border-color);
      background: black;
      border-radius: 10px;
      padding: 5px 10px;
      width: 100%;
      color: var(--text-grey);
      transition: all ease 0.3s;
      margin-top: 1rem;

      &:focus-visible {
        border: 1px solid var(--accent-color);
        transition: all ease 0.3s;
      }
    }
    textarea {
      border: 1px solid var(--border-color);
      background: black;
      border-radius: 10px;
      height: 100px;
      padding: 5px 10px;
      width: 100%;
      color: var(--text-grey);
      transition: all ease 0.3s;
      resize: none;
      &:focus-visible {
        border: 1px solid var(--accent-color);
        transition: all ease 0.3s;
      }
    }

    .option {
      display: flex;
      flex-direction: column;
      border-top: 1px dashed var(--border-color);
      margin-top: 20px;
      padding-top: 20px;
      z-index: 1;
      .option_title {
        @include mixins.subtitleText;
        font-size: 1.5rem;
      }
      strong {
        color: var(--accent-red);
        font-size: 1.5rem;
      }
    }

    .main_option {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      gap: 1rem;

      &_content {
        select {
          width: 100%;
          height: 100%;
          background: black;
          color: var(--text-grey);
          border: 1px solid var(--border-color);
          transition: all ease 0.3s;
          padding: 8px 10px;
          outline: none;
        }
        select:focus-visible {
          border: 1px solid var(--accent-color);
        }
      }
    }

    .add_new_option {
      margin-top: 1rem;
    }

    .description_option {
      display: grid;
      grid-template-columns: 2fr 1fr;
      align-items: stretch;
      gap: 1rem;

      &_content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
      }
    }

    select {
      width: fit-content;
      height: auto;
      border: 1px solid black;
      border-radius: 10px;
      padding: 5px 10px;
      color: rgb(74, 74, 74);
      margin-top: 1rem;
    }
    select:focus-visible {
      border: 1px solid var(--active-btn);
    }

    .text-wrapper {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      .wrapper {
        min-width: 250px;
        flex-grow: 1;
        flex-basis: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .action_checkbox_wrap {
          margin-top: 10px;
        }

        .checkbox-wrap {
          input {
            display: none;
          }

          .product_checkbox {
            display: block;
            width: 18px;
            height: 18px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            cursor: pointer;
          }

          input:checked + label {
            border: 5px solid var(--accent-color);
          }
        }
      }
    }

    .checkbox {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1.25rem;
      width: auto;
      height: auto;
      // display: none;

      input {
        display: none;
      }

      .product_checkbox {
        width: 18px;
        height: 18px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        cursor: pointer;
      }

      input:checked + label {
        border: 5px solid var(--accent-color);
      }
    }

    .add_new {
      &_wrap {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        gap: 1rem;
        padding-bottom: 1rem;
      }
      .new_option {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .option-lang {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 5px;
        }

        &_wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-basis: 2.5rem;
          gap: 1rem;
          .hidden_input {
            display: none;
          }
          .product_checkbox {
            width: 18px;
            height: 18px;
            border: 2px solid var(--accent-color);
            border-radius: 50%;
            cursor: pointer;
          }
          input[type="checkbox"]:checked + label {
            border: 5px solid var(--accent-color);
          }
          .preview {
            padding: 0.25rem 0.5rem;
            border-radius: 0.5rem;
            img {
              width: 1.25rem;
            }
          }

          .icon-label {
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border: 1px solid var(--border-color);
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 8px;
          }

          .checkbox_wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            input {
              margin-top: unset;
              display: none;
            }
          }
        }
      }

      .new_option_btn {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 1rem;
      }
    }
    .add-option {
      display: flex;
      flex: 1;
    }
    // .label-wrapper {
    //   @include mixins.labelFile
    // }
    .price_option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .added_options {
      background: rgb(27, 27, 27);
      padding: 1rem;
      border-radius: 8px;
      padding-top: 1rem;
      &_list {
        display: flex;
        align-items: stretch;
        justify-content: flex-start;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      &_item {
        background: rgb(226, 226, 226);
        border-radius: 8px;
        width: fit-content;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.5rem;
        color: rgb(25, 25, 25);
        font-weight: 500;
      }
      .separator {
        width: 1px;
        height: 25px;
        background: rgb(25, 25, 25);
      }
    }
    .button-group {
      padding-top: 30px;
      padding-bottom: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      button {
        padding: 10px 20px;
      }
      .btn_transparent {
        background: black;
        color: white;
        @include mixins.mainText;
        border: 1px solid var(--border-color);
      }
      .btn_fill {
        @include mixins.mainText;
      }
      .addItem {
        color: var(--bg-color);
        @include mixins.mainText;
      }
    }
  }
}
</style>
