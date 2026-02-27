<template>
  <div class="add_product_content">
    <div v-if="loaderState" class="loader_content">
      <SharedLoader />
    </div>
    <div class="add_product">
      <div class="modal_wrapper">
        <div class="mobile_top_content">
          <div class="mobile_top">Додати товар</div>
          <button>
            <SvgIcon name="close-btn" size="micro" fill="var(--text-color)" />
          </button>
        </div>
        <div class="add_image">
          <div class="add_image_content">
            <div class="add_image_wrapper">
              <div class="picture_container">
                <div class="picture first"></div>
                <div class="picture second"></div>
                <div class="picture third"></div>
              </div>
              <div class="picture_info">
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
              </div>
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
              Основна інформація картки товару. Поля відмічені "
              <strong class="accent_text text-red-500"> * </strong>
              " обовʼязкові для заповнення
            </span>
          </div>
          <div class="options">
            <div class="option main_option">
              <div class="main_option_content">
                <h4 class="default_text">Оберіть категорію товару:<strong> * </strong></h4>
                <select id="wholesaleType" v-model="productCategory" name="wholesaleType">
                  <option disabled selected value>-- Виберіть категорію --</option>
                  <option
                    v-for="(category, index) in fetchedCategories"
                    :key="index"
                    :value="category.id"
                  >
                    {{ category.itemLanguage.title }}
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
                  <!-- <label for="productPrice" class="product_checkbox"></label> -->
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
                  <!-- <label for="productSize" class="product_checkbox"></label> -->
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
                  <div class="checkbox-wrap flex items-center justify-start">
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
            <button class="btn_fill" @click="addNewProduct">Додати товар</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from "vue";
// import { transliterate } from "@/utils/transliterate";

// import bagImg from '@/public/img/bag.png';

import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useModalStore } from "@/store/modal-store";
import { useProductStore } from "@/store/product-store";

const modalStore = useModalStore();
const productStore = useProductStore();

const emit = defineEmits(["addNewItem", "tooltip"]);

// helpers
import { useFileUpload } from "@/helpers/uploadFiles";
const { handleFileUpload } = useFileUpload(emit);

const fetchedCategories = ref([]);

const loaderState = ref(false);
const optionFileInput = ref(null);
const productFileInput = ref(null);
const productCategory = ref("");
const productNameUk = ref("");
const productManufacture = ref("");
// const productNameEn = ref("");
// const productNameRu = ref("");
const productVisibility = ref(false); // Показывать товар на сайте
const productDescriptionUk = ref("");
// const productDescriptionEn = ref("");
// const productDescriptionRu = ref("");
const productStockState = ref(false); // Показывать колличество товарв на сайте
const productStockValue = ref(0); // Значение колличества товаров на сайте
// const counterQuantity = ref(1); // Значение минимального колличества единиц
const price = ref(0); // Стандартная цена
// const wholesaleOnly = ref(false); // Значение продажи товара только оптом
// const wholesalePrice = ref(0); // Оптовая цена
// const wholesalePriceFrom = ref(0); // Оптовая цена действует от
// const wholesaleDescriptionUk = ref("");
// const wholesaleDescriptionEn = ref("");
// const wholesaleDescriptionRu = ref("");
// const packageType = ref("Bag"); // Значение типа упаковки
const productAvailability = ref(false);
const productDiscountPersent = ref(0); // процент скидки
const productPrice = ref(null);
const productMaterialUk = ref("");
// const productMaterialEn = ref("");
// const productMaterialRu = ref("");
const productColorUk = ref("");
// const productColorEn = ref("");
// const productColorRu = ref("");
// const productUnitTypeUk = ref("");
// const productUnitTypeEn = ref("");
// const productUnitTypeRu = ref("");

const productSize = ref("");
// const productWeight = ref("");
// const productDensity = ref(""); //plotnost
// const productCapacity = ref(""); //obem
// const productQuantity = ref("");
// const productGroupQuantity = ref("");

// ADD OPTION
const addOptionsRef = ref([]);
const discountState = ref(false);
const addOptionTextUk = ref("");
// const addOptionTextEn = ref("");
// const addOptionTextRu = ref("");
const addOptionPrice = ref(false);
const optionPrice = ref(0);

// option file

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
  //   wholesalePrice.value = 0;
  //   wholesalePriceFrom.value = 0;
  //   counterQuantity.value = 1;
  //   packageType.value = "Bag";
  //   wholesaleOnly.value = false;
  productNameUk.value = "";
  productDescriptionUk.value = "";
  //   wholesaleDescriptionUk.value = "";
  //   productNameEn.value = "";
  //   productDescriptionEn.value = "";
  //   wholesaleDescriptionEn.value = "";
  //   productNameRu.value = "";
  //   productDescriptionRu.value = "";
  //   wholesaleDescriptionRu.value = "";
  addOptionsRef.value = [];
  optionFileState.optionFiles.value = [];
  optionFileState.optionFilesPreview.value = [];
  optionFileState.optionReady.value = false;
  discountState.value = false;
  productAvailability.value = false;
  productMaterialUk.value = "";
  productPrice.value = null;
  price.value = 0;
  //   productMaterialEn.value = "";
  //   productMaterialRu.value = "";
  productColorUk.value = "";
  //   productColorEn.value = "";
  //   productColorRu.value = "";
  //   productUnitTypeUk.value = "";
  //   productUnitTypeEn.value = "";
  //   productUnitTypeRu.value = "";
  productSize.value = "";
  optionFileInput.value.value = "";
  productFileInput.value.value = "";
  //   productWeight.value = "";
  //   productDensity.value = "";
  //   productCapacity.value = "";
  //   productQuantity.value = "";
  //   productGroupQuantity.value = "";
};

const addNewOption = () => {
  console.log(optionFileState.optionFilesPreview.value, "option ref");
  //   if (addOptionsRef.value.length > 9) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Максимальна кількість опцій 10",
  //     });
  //     return;
  //   }

  if (optionFileState.optionFilesPreview.value.length > 0) {
    console.log("addNew1");
    if (
      addOptionTextUk.value
      //   addOptionTextEn.value &&
      //   addOptionTextRu.value
    ) {
      console.log("addNew");
      addOptionsRef.value.push({
        file: toRaw(optionFileState.optionFiles.value),
        fileImg: optionFileState.optionFilesPreview.value,
        // file: [...toRaw(optionFileState.optionFiles.value)],
        // fileImg: [...optionFileState.optionFilesPreview.value],
        optionPrice: optionPrice.value,
        translations: [
          {
            language: "uk",
            optionInfo: addOptionTextUk.value
          }
          //   {
          //     language: "en",
          //     optionInfo: addOptionTextEn.value,
          //   },
          //   {
          //     language: "ru",
          //     optionInfo: addOptionTextRu.value,
          //   },
        ]
      });
    }

    optionFileState.optionFiles.value = [];
    optionFileState.optionFilesPreview.value = [];
    addOptionTextUk.value = "";
    // addOptionTextEn.value = "";
    // addOptionTextRu.value = "";
    // optionFileState.optionReady.value = false;
    optionFileInput.value.value = "";
    addOptionPrice.value = false;
    optionPrice.value = 0;
  }
};

const removeOption = (index) => {
  addOptionsRef.value.splice(index, 1);
};

const addNewProduct = async () => {
  //   if (!productCategory.value) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Оберіть категорію товару",
  //     });
  //     return;
  //   }
  //   if (!productNameUk.value || !productNameRu.value || !productNameEn.value) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Введіть назву товару",
  //     });
  //     return;
  //   }
  //   if (!price.value) {
  //     emit("tooltip", {
  //       status: "error",
  //       message: "Введіть роздрібну ціну товару",
  //     });
  //     return;
  //   }

  const categoryData = fetchedCategories.value.filter((item) => item.id === productCategory.value);

  const categoryName = categoryData[0].group.trim().replaceAll(" ", "-").toLowerCase();

  const translitProductName = transliterate(productNameUk.value);

  const productName = translitProductName.replaceAll(" ", "-").toLowerCase().trim();

  // UPLOAD PRODUCT FILE
  const uploadProductFiles = async () => {
    loaderState.value = true;
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

      if (optionFileUpload && Array.isArray(optionFileUpload.data)) {
        return optionFileUpload.data.map((elem) => elem.filePath);
      } else {
        console.error("Ошибка: productFileUpload не является массивом", optionFileUpload);
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
    toRaw(addOptionsRef.value).map((elem, index) => {
      toRaw(elem.fileImg)[0] = optionImgPath[index];
    });
    // const res = await $fetch("/api/products", {

    const newProduct = productStore.addProduct({
      // const res = await $fetch("/api/products", {
      // method: "POST",
      // body: {
      categoryId: productCategory.value,
      visibility: productVisibility.value,
      img: productImgPath,
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
      options: toRaw(addOptionsRef.value)
      // }
    });

    if (newProduct.statusCode === 200) {
      alert("Товар успішно додано");
    }

    // return {
    //   data: res
    // };
  };

  const uploadAllData = async () => {
    try {
      const [productImgPath, optionImgPath] = await Promise.all([
        uploadProductFiles(),
        uploadOptionFiles()
      ]);

      console.log("Изображения загружены:", productImgPath, optionImgPath);

      await uploadData(productImgPath, optionImgPath);

      // console.log("Данные загружены:", result);

      clearModal();

      loaderState.value = false;

      alert("Товар створений успішно");

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

onMounted(async () => {
  try {
    const getData = await $fetch("/api/category");

    if (getData.data.length > 0) {
      fetchedCategories.value = getData.data.map((item) => ({
        ...item,
        itemLanguage: item.translations.find((translation) => translation.language === "uk")
      }));
    }
  } catch (error) {
    console.log(error.message, "error from getData");
  }
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
  width: 100vw;
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

    @media screen and (max-width: 1024px) {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      gap: 15px;
    }

    @media screen and (max-width: 768px) {
      height: 95vh;
    }
  }

  .mobile_top_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    height: auto;

    .mobile_top {
      @include mixins.subtitleText;
      font-size: 1.5rem;
    }

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }

  .add_image {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 1.25rem;
    height: 90vh;
    min-width: 300px;

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

      h2 {
        @include mixins.subtitleText;
      }

      span {
        @include mixins.mainText;
      }

      .picture_container {
        position: relative;
        margin-bottom: 20px;
        width: inherit;
        height: auto;

        @media screen and (max-width: 1024px) {
          display: none;
          // position: relative;
          // top: 70px;
        }
      }
      input {
        display: none;
      }
      .picture_info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

      @media screen and (max-width: 1024px) {
        flex-direction: row;
        // width: clamp(300px, 95vw, 1000px);
        width: unset;
        top: unset;
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
      @media screen and (max-width: 1024px) {
        margin-right: auto;
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

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
    }
  }

  .add_info {
    height: 90vh;
    position: relative;
    // max-width: 60vw;
    width: clamp(500px, 62vw, 1200px);
    overflow-x: hidden;

    .main_text {
      @include mixins.mainText;
    }

    .default_text {
      @include mixins.mainText;
      color: var(--grey-color);
      // white-space: nowrap;
    }

    .top_content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        @include mixins.subtitleText;
        font-size: 1.5rem;
      }

      button {
        @media screen and (max-width: 1024px) {
          display: none;
        }
      }
    }

    .header_description {
      width: 100%;
      height: auto;
      .default_text {
        width: 100%;
        white-space: unset;
      }
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

      @media screen and (max-width: 768px) {
        padding: 1rem 1rem 1.5rem 0;
      }
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

        @media screen and (max-width: 768px) {
          width: 100%;
          height: auto;
        }
      }

      @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
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

        @media screen and (max-width: 768px) {
          width: 100%;
          height: auto;
        }
      }

      @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
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
        // gap: 10px;

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
            margin-top: 10px;
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

        @media screen and (max-width: 768px) {
          width: 100%;
        }
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

      @media screen and (max-width: 768px) {
        justify-content: center;
        flex-direction: column;
      }
    }

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    padding-inline: 15px;
  }
  @media screen and (max-width: 480px) {
    padding-inline: 10px;
  }
  @media screen and (max-width: 375px) {
    padding-inline: 8px;
  }
}
</style>
