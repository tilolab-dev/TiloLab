<template>

    <div class="add_product">
            <div class="modal_wrapper">
                <div class="add_image">
                    <div class="add_image_content">
                        <div class="image_wrapper flex items-center justify-center flex-col relative top-10 w-4/5">
                            <div class="picture_container relative mb-5">
                                <div class="picture first"> </div>
                                <div class="picture second"> </div>
                                <div class="picture third"> </div>
                            </div>
                            <h2 class="img-title text-center">
                                Завантажте файли зображення
                            </h2>
                            <span class="text-center">
                                Зображення повинні бути в форматі .jpg, .png, .jpeg
                            </span>
                            <label for="product-file" class="icon-label">
                                <div class="upload-btn">
                                    Вибрати
                                </div>
                            </label>
                            <!-- @change="handleFileUpload($event, 'product-files')" -->

                            <input 
                                type="file" 
                                id="product-file" 
                                class="hidden" 
                                multiple 
                                @change="handleFileUpload($event, 'product', productFileState, productFileState.productFiles.value.length)"
                            >
                            
                        </div>
                    </div>
                    
                    <div class="add_image_preview">
                        <!-- <SvgIcon 
                            name="default-picture" 
                            size="large" 
                            fill="var(--dark-color)"
                            v-if="productFileState.productFilesPreview.value.length === 0"
                        /> -->
                        <div 
                            class="preview_wrapper"
                            v-for="(file, index) in productFileState.productFilesPreview.value"
                            :key="index"
                        >
                            <!-- v-else -->

                            <div 
                                class="remove_btn"
                                @click="removeProductImg(index)"
                            >
                                <!-- <SvgIcon name="close-btn" size="micro" fill="white"/> -->
                            </div>
                            <img 
                                :src="file" 
                                alt="preview"
                            >
                        </div>
                        
                        

                    </div>
                </div>
                <div class="add_info">
                    <div class="top_content flex items-center justify-between ">
                        <h2 class="
                            text-[var(--dark-color)]
                            font-bold
                            text-2xl
                        ">
                            Інформація про товар
                        </h2>
                        <button
                        @click="closeModal"
                        >
                            <!-- <SvgIcon name="close-btn" size="micro" fill="var(--dark-color)"/> -->
                        </button>
                    </div>
                    
                    <div class="header_description">
                        <span class="
                            text-[var(--dark-color)]
                            font-sm
                            text-base
                        ">

                            Основна інформація картки товару
                        <!-- </span>
                        <span class="
                            text-[var(--dark-color)]
                            font-sm
                            text-base
                        "> -->

                            Поля відмічені "
                            <strong
                                class="accent_text text-red-500"
                            >
                                *
                            </strong> 
                            "
                            обовʼязкові для заповнення
                        </span>
                    </div>
                    <div class="options">
                        <div class="option">
                            <h4 class="option-title">
                                Оберіть категорію товару:<strong
                                class="text-red-500"
                            >
                                *
                            </strong> 
                            </h4>
                            <select name="wholesaleType" id="wholesaleType" v-model="productCategory">
                                <option disabled selected value> -- Виберіть категорію -- </option>
                                <option
                                    v-for="(category, index) in fetchedCategories" 
                                    :key="index"
                                    :value="category.id"
                                    
                                    
                                >
                                    {{ category.itemLanguage.title }}
                                </option>
                            </select>
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Назва товару:
                                <strong
                                    class="text-red-500"
                                >
                                    *
                                </strong> 
                            </h4>
                            <div class="text-wrapper">
                                <div class="wrapper">
                                    <span>
                                        Українська
                                    </span>
                                    <input v-model="productNameUk" type="text" placeholder="Введіть назву товару">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Англійська
                                    </span>
                                    <input v-model="productNameEn" type="text" placeholder="Введіть назву товару">
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Російська
                                    </span>
                                    <input v-model="productNameRu" type="text" placeholder="Введіть назву товару">
                                </div>
                            </div>
                        
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Опис товару:
                            </h4>
                            <div class="text-wrapper">
                                <div class="wrapper">
                                    <span >
                                        Українська
                                    </span>
                                    <textarea v-model="productDescriptionUk" name="descriptionText" id="descriptionText" placeholder="Введіть опис товару максимум 500 символів"></textarea>

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Англійська
                                    </span>
                                    <textarea v-model="productDescriptionEn" name="descriptionText" id="descriptionText" placeholder="Введіть опис товару максимум 500 символів"></textarea>

                                </div>
                                <div class="wrapper">
                                    <span >
                                        Російська
                                    </span>
                                    <textarea v-model="productDescriptionRu" name="descriptionText" id="descriptionText" placeholder="Введіть опис товару максимум 500 символів"></textarea>

                                </div>
                            </div>
                        
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Кількість товару на складі
                                <strong
                                    v-if="productAvailability"
                                    class="text-red-500"
                                >
                                    *
                                </strong> 
                            </h4>
                            <div class="checkbox ">
                                <span>
                                    Відображати кількість товару на складі
                                </span>
                                <input v-model="productStockState" type="checkbox" value="false" @change="productAvailability = !productAvailability">
                            </div>
                            <input v-if="productAvailability" v-model="productStockValue" type="number" placeholder="Введіть наявну кількість товару на складі">
                        </div>
                        <div class="price_option flex items-center justify-between gap-2">
                            <div class="el flex-1">
                                <h4>
                                    Роздрібна ціна
                                    <strong
                                        class="text-red-500"
                                    >
                                        *
                                    </strong> 
                                </h4>
                                <input v-model="price" type="number" placeholder="Введіть роздрібну ціну товару.">
                            </div>
                            <div class="el flex-1">
                                <h4>
                                    Оптова ціна
                                </h4>
                                <input type="number" v-model="wholesalePrice" placeholder=" Введіть оптову ціну товару.">
                            </div>
                            <div class="el flex-1">
                                <h4>
                                    Оптова ціна діє від ...
                                </h4>
                                <input type="number" v-model="wholesalePriceFrom" placeholder="Введіть кількість від якої оптова ціна діє">
                                
                            </div>
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Введіть примітку для оптової ціни
                            </h4>
                            <div class="text-wrapper">
                                <div class="wrapper">
                                    <span>
                                        Українська
                                    </span>
                                    <input v-model="wholesaleDescriptionUk" class="" type="text" placeholder="Введіть примітку">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Англійська
                                    </span>
                                    <input v-model="wholesaleDescriptionEn" class="" type="text" placeholder="Введіть примітку">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Російська
                                    </span>
                                    <input v-model="wholesaleDescriptionRu" class="" type="text" placeholder="Введіть примітку">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Продавати товар тільки оптом
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input class="checkbox" type="checkbox" v-model="wholesaleOnly">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Параметри товару
                            </h4>
                            <div class="text-wrapper items-stretch">
                                <div class="wrapper">
                                    <span>
                                        Вкажіть тип фасування товару
                                    </span>
                                    <select name="wholesaleType" id="wholesaleType" v-model="packageType">
                                        <option selected value="Bag">Мішок</option>
                                        <option value="Role">Рулон</option>
                                        <option value="Package">Упаковка</option>
                                    </select>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Відображати товар на сайті
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productVisibility" value="false" class="checkbox" type="checkbox">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Мінімальна кількість придбання товару
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="counterQuantity" class="checkbox" type="number" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Розмір одиниці товару
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productSize" class="checkbox" type="text" placeholder="Введіть значення розміру">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Вага одиниці товару
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productWeight" class="checkbox" type="text" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Щильність одиниці товару
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productDensity" class="checkbox" type="text" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Об'єм одиниці товару
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productCapacity" class="checkbox" type="text" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Кількість товару в упаковці
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productQuantity" class="checkbox" type="text" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Кількість товару в груповій упаковці
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productGroupQuantity" class="checkbox" type="text" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Мінімальна кількість придбання товару
                                        <strong
                                            class="text-red-500"
                                        >
                                            *
                                        </strong> 
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="counterQuantity" class="checkbox" type="number" placeholder="Введіть значення цифрами">

                                    </div>
                                </div>
                                <div class="wrapper">
                                    <span>
                                        Акційний товар
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input class="checkbox" type="checkbox" v-model="discountState">

                                    </div>
                                </div>
                                <div v-if="discountState" class="wrapper">
                                    <span>
                                        Відсоток знижки
                                    </span>
                                    <div class="checkbox-wrap flex items-center justify-start">
                                        <input v-model="productDiscountPersent" class="discount-price" type="number" placeholder="%">

                                    </div>
                                </div>
                                
                                
                                
                            </div>
                        
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Матеріал товару
                            </h4>
                            <div class="text-wrapper">
                                <div class="wrapper">
                                    <span>
                                        Українська
                                    </span>
                                    <input v-model="productMaterialUk" class="" type="text" placeholder="Введіть матеріал">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Англійська
                                    </span>
                                    <input v-model="productMaterialEn" class="" type="text" placeholder="Введіть матеріал">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Російська
                                    </span>
                                    <input v-model="productMaterialRu" class="" type="text" placeholder="Введіть матеріал">

                                </div>
                            </div>
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Колір товару
                            </h4>
                            <div class="text-wrapper">
                                <div class="wrapper">
                                    <span>
                                        Українська
                                    </span>
                                    <input v-model="productColorUk" class="" type="text" placeholder="Введіть колір">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Англійська
                                    </span>
                                    <input v-model="productColorEn" class="" type="text" placeholder="Введіть колір">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Російська
                                    </span>
                                    <input v-model="productColorRu" class="" type="text" placeholder="Введіть колір">

                                </div>
                            </div>
                        </div>
                        <div class="option">
                            <h4 class="option-title">
                                Тип одиниці товару
                            </h4>
                            <div class="text-wrapper">
                                <div class="wrapper">
                                    <span>
                                        Українська
                                    </span>
                                    <input v-model="productUnitTypeUk" class="" type="text" placeholder="Введіть тип товару">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Англійська
                                    </span>
                                    <input v-model="productUnitTypeEn" class="" type="text" placeholder="Введіть тип товару">

                                </div>
                                <div class="wrapper">
                                    <span>
                                        Російська
                                    </span>
                                    <input v-model="productUnitTypeRu" class="" type="text" placeholder="Введіть тип товару">

                                </div>
                            </div>
                        </div>
                       
                        <div class="option">
                                    <h4>
                                        Додати опцію товару (макс. 10)
                                    </h4>
                                    <div class="add-option-wrap flex flex-col gap-5">
                                        <div class="add-option flex flex-col">
                                            <span class="text-[0.8rem] text-nowrap">
                                                Додати файл
                                            </span>
                                            <div class="label-wrapper flex basis-10 items-center justify-start gap-5">
                                                <label for="option-upload" class="icon-label">
                                                    <span>
                                                        Оберіть файл
                                                    </span>
                                                    <!-- <SvgIcon name="download-btn" size="micro" fill="var(--dark-color)"/> -->
                                                </label>
                                                <div class="preview px-2 py-1 rounded-lg border-[1px] border-[var(--dark-color)]">
                                                    <img v-if="optionFileState.optionFiles.value.length === 0" class="file-preview w-5" src="../../../public/img/bag.png" alt="preview"/>
                                                    <img v-else :src="optionFileState.optionFilesPreview.value[0]" alt="preview" class="w-5">

                                                </div>


                                                <input type="file" id="option-upload" class="icon-file" 
                                                    @change="handleFileUpload($event, 'option', optionFileState)"
                                                >

                                            </div>
                                            
                                        </div>
                                        <div class="add-option flex items-center justify-start flex-wrap gap-2">
                                            <div class="option-lang flex flex-col flex-grow">
                                                <span class="text-[0.8rem] text-nowrap"> 
                                                    Короткий опис
                                                </span>
                                                <input v-model="addOptionTextUk" type="text" placeholder="Введіть короткий опис">
                                            </div>
                                            <div class="option-lang flex flex-col flex-grow">
                                                <span class="text-[0.8rem] text-nowrap"> 
                                                    Короткий опис
                                                </span>
                                                <input v-model="addOptionTextEn" type="text" placeholder="Введіть короткий опис">
                                            </div>
                                            <div class="option-lang flex flex-col flex-grow">
                                                <span class="text-[0.8rem] text-nowrap"> 
                                                    Короткий опис
                                                </span>
                                                <input v-model="addOptionTextRu" type="text" placeholder="Введіть короткий опис">
                                            </div>
                                            
                                        </div>
                                        <div class="add-option flex flex-col gap-2">
                                            <span>
                                                Додати ціну для опційного товару
                                            </span>
                                            <div class="checkbox-wrap flex items-center justify-start">
                                                <input v-model="addOptionPrice" value="false" class="checkbox" type="checkbox">

                                            </div>
                                        </div>
                                        <div class="add-option" v-if="addOptionPrice">
                                            <input 
                                                type="number" 
                                                placeholder="Введіть ціну на опційний товар"
                                                v-model="optionPrice"
                                            >
                                        </div>
                                        <div class="add-option flex items-center justify-end">

                                            <button 
                                                class="bg-[var(--dark-color)] h-[40px] px-5 rounded-lg text-white font-bold"
                                                @click="addNewOption('text', 'value')"

                                                
                                            >
                                            <!-- @click="addTestData" -->

                                            <!-- @click="addNewOption('text', 'value')" -->


                                                Додати опцію
                                            </button>
                                        </div>
                                        

                                    </div>

                                    <div class="added-options pt-3" v-if="addOptionsRef.length > 0">
                                        <ul class="flex items-center justify-start gap-2 flex-wrap">
                                            <li 
                                                v-for="(option, index) in addOptionsRef"
                                                :key="index"
                                                class="bg-[var(--bg-color)] rounded-lg w-fit flex items-center justify-between p-2 gap-2">
                                                <img :src="option.fileImg" alt="img" width="25px">
                                                <div class="separator w-[1px] h-[25px] bg-[var(--light-color)]"></div>
                                                <span >
                                                    {{ option.translations[0].optionInfo }}

                                                </span>
                                                <div class="separator w-[1px] h-[25px] bg-[var(--light-color)]"></div>
                                                <span v-if="option.optionPrice !== 0">
                                                    {{ option.optionPrice }}
                                                    UAH

                                                </span>
                                                <div v-if="option.optionPrice !== 0" class="separator w-[1px] h-[25px] bg-[var(--light-color)]"></div>

                                                <button
                                                    @click="removeOption(index)"
                                                >
                                                    <!-- <SvgIcon name="close-btn" size="micro" fill="var(--dark-color)"/> -->
                                                </button>
                                            </li>
                                            
                                        </ul>
                                        
                                    </div>
                            
                                </div>
                    </div>
                    <div class="button-group">
                        <button 
                            class="clearForm"
                            @click="clearModal"
                        >
                            Очистити форму
                        </button>
                        <button 
                            class="addItem bg-[var(--dark-color)]"
                            @click="addNewProduct"
                        >
                            Додати товар
                        </button>
                    </div>

                </div>
           
           
          

        </div>

        
    </div>

</template>

<script setup>
    import {ref, defineEmits, onMounted, toRaw} from 'vue';

    // import bagImg from '@/public/img/bag.png';

    // import SvgIcon from '@/components/shared/SvgIcon.vue';
    import { useModalStore } from '@/store/modal-store';


    const modalStore = useModalStore();

    const emit = defineEmits(['addNewItem', 'tooltip']);

    // helpers 
    import { useFileUpload } from '@/helpers/uploadFiles';
    const {handleFileUpload} = useFileUpload(emit);

    const fetchedCategories = ref([]);

    const productCategory = ref('ololo');
    const productNameUk = ref('');
    const productNameEn = ref('');
    const productNameRu = ref('');
    const productVisibility = ref(false);   // Показывать товар на сайте
    const productDescriptionUk = ref('');  
    const productDescriptionEn = ref('');
    const productDescriptionRu = ref('');
    const productStockState = ref(false);    // Показывать колличество товарв на сайте 
    const productStockValue = ref(0)        // Значение колличества товаров на сайте
    const counterQuantity = ref(1);         // Значение минимального колличества единиц
    const price = ref(0);                  // Стандартная цена
    const wholesaleOnly = ref(false);   // Значение продажи товара только оптом
    const wholesalePrice = ref(0);      // Оптовая цена
    const wholesalePriceFrom = ref(0); // Оптовая цена действует от
    const wholesaleDescriptionUk = ref('');
    const wholesaleDescriptionEn = ref('');
    const wholesaleDescriptionRu = ref('');
    const packageType = ref('Bag');            // Значение типа упаковки
    const productAvailability = ref(false);
    const productDiscountPersent = ref(0); // процент скидки

    const productMaterialUk = ref('');
    const productMaterialEn = ref('');
    const productMaterialRu = ref('');
    const productColorUk = ref('');
    const productColorEn = ref('');
    const productColorRu = ref('');
    const productUnitTypeUk = ref('');
    const productUnitTypeEn = ref('');
    const productUnitTypeRu = ref('');

    const productSize = ref('');
    const productWeight = ref('');
    const productDensity = ref(''); //plotnost
    const productCapacity = ref(''); //obem
    const productQuantity = ref('');
    const productGroupQuantity = ref('');

    // ADD OPTION
    const addOptionsRef = ref([]);
    const discountState = ref(false);
    const addOptionTextUk = ref('');
    const addOptionTextEn = ref('');
    const addOptionTextRu = ref('');
    const addOptionPrice = ref(false);
    const optionPrice = ref(0);

    // option file

    const productFileState = {
        // product files
        productFilesPreview: ref([]),
        productFiles: ref([]),
        productReady: ref(false),
      
    }

    const optionFileState = {
        optionFilesPreview: ref([]),
        optionFiles: ref([]),
        optionReady: ref(false),

    }

    const removeProductImg = (index) => {
        productFileState.productFiles.value.splice(index, 1);
        productFileState.productFilesPreview.value.splice(index, 1)

    }


    const closeModal = () => {
        modalStore.closeModal();
    }

    const clearModal = () => {
        productCategory.value = '';
        productVisibility.value = false;
        productFileState.productFiles.value = [];
        productFileState.productFilesPreview.value = [];
        productFileState.productReady.value = false,
        price.value = 0;
        productStockState.value = false;
        productStockValue.value = 0;
        productDiscountPersent.value = 0;
        wholesalePrice.value = 0;
        wholesalePriceFrom.value = 0;
        counterQuantity.value = 1;
        packageType.value = 'Bag';
        wholesaleOnly.value = false;
        productNameUk.value = '';
        productDescriptionUk.value = '';
        wholesaleDescriptionUk.value = '';
        productNameEn.value = '';
        productDescriptionEn.value = '';
        wholesaleDescriptionEn.value = '';
        productNameRu.value = '';
        productDescriptionRu.value = '';
        wholesaleDescriptionRu.value = '';
        addOptionsRef.value = [];
        optionFileState.optionFiles.value = [];
        optionFileState.optionFilesPreview.value = [];
        optionFileState.optionReady.value = false;
        discountState.value = false;
        productAvailability.value = false;
        productMaterialUk.value = '';
        productMaterialEn.value = '';
        productMaterialRu.value = '';
        productColorUk.value = '';
        productColorEn.value = '';
        productColorRu.value = '';
        productUnitTypeUk.value = '';
        productUnitTypeEn.value = '';
        productUnitTypeRu.value = '';
        productSize.value = '';
        productWeight.value = '';
        productDensity.value = '';
        productCapacity.value = '';
        productQuantity.value = '';
        productGroupQuantity.value = '';

    }

    const addNewOption = () => {

        if (addOptionsRef.value.length > 9) {
            emit('tooltip', {
                status: 'error',
                message: 'Максимальна кількість опцій 10'
            })
            return
        }


        if (optionFileState.optionFilesPreview.value.length > 0) {

            if (addOptionTextUk.value && addOptionTextEn.value && addOptionTextRu.value) {
                addOptionsRef.value.push({
                    file: toRaw(optionFileState.optionFiles.value),
                    fileImg: optionFileState.optionFilesPreview.value,
                    optionPrice: optionPrice.value,
                    translations: [
                        {
                            language: 'uk',
                            optionInfo: addOptionTextUk.value,

                        },
                        {
                            language: 'en',
                            optionInfo: addOptionTextEn.value,
                        },
                        {
                            language: 'ru',
                            optionInfo: addOptionTextRu.value,
                        },
                    ],

                })
            }
             
            optionFileState.optionFiles.value = [];
            optionFileState.optionFilesPreview.value = [];
            addOptionTextUk.value = '';
            addOptionTextEn.value = '';
            addOptionTextRu.value = '';
            addOptionPrice.value = false;
            optionPrice.value = 0;
        }
        

    }

    const removeOption = (index) => {
        addOptionsRef.value.splice(index, 1)

    }

    const addNewProduct =  async () => {

        if (!productCategory.value) {
            emit('tooltip', {
                status: 'error',
                message: 'Оберіть категорію товару'
            })
            return;
        }
        if (!productNameUk.value || !productNameRu.value || !productNameEn.value) {
            emit('tooltip', {
                status: 'error',
                message: 'Введіть назву товару'
            })
            return;
        }
        if (!price.value) {
            emit('tooltip', {
                status: 'error',
                message: 'Введіть роздрібну ціну товару'
            })
            return;
        }

        const categoryData = fetchedCategories.value.filter((item) => item.id === productCategory.value);
        const categoryName = categoryData[0].group.trim().replaceAll(' ', '-').toLowerCase();

        const translitProductName = transliterate(productNameUk.value);

        const productName = translitProductName.replaceAll(' ', '-').toLowerCase().trim();


            // UPLOAD PRODUCT FILE
            const uploadProductFiles = async () => {

                const formData = new FormData();

                try {

                    toRaw(productFileState.productFiles.value).map((item) => {
                        if (item instanceof File) {
                            formData.append(`${categoryName}/${productName}`, item);

                        } else {
                            console.error('Ошибка: elem.file не является File-объектом', item);
                        }
                    })

                    const productFileUpload = await $fetch('/api/upload', {
                        method: 'POST',
                        body: formData
                    })

                    if (productFileUpload && Array.isArray(productFileUpload.data)) {

                        return productFileUpload.data.map((elem) => elem.filePath)
                        
                    } else {
                        console.error('Ошибка: productFileUpload не является массивом', productFileUpload);
                        return [];
                    }


                } catch (error) {
                    console.error(error)
                    return [];
                }

            }

            // UPLOAD PRODUCT OPTIONS
            const uploadOptionFiles = async () => {
                const formData = new FormData();

                try {
                    toRaw(addOptionsRef.value).map((elem) => {
                        
                        const rawFile = elem.file[0];

                        if (rawFile instanceof File) {
                            formData.append(`${categoryName}/${productName}/optionsImg`, rawFile);


                        } else {
                        console.error('Ошибка: elem.file не является File-объектом', rawFile);
                        }
                    });

                    const optionFileUpload = await $fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    })


                    if (optionFileUpload && Array.isArray(optionFileUpload.data)) {

                        return optionFileUpload.data.map((elem) => elem.filePath)

                    } else {
                        console.error('Ошибка: productFileUpload не является массивом', productFileUpload);
                        return [];
                    }

                } catch (error) {
                    console.error()
                }
            }

            const uploadData = async (productImgPath, optionImgPath) => {

                toRaw(addOptionsRef.value).map((elem, index) => {
                    toRaw(elem.fileImg)[0] = optionImgPath[index]
                })
            
                const formData = new FormData();

                const jsonData = {
                    category: productCategory.value,
                    visibility: productVisibility.value,
                    img: productImgPath,
                    price: price.value,
                    stockState: productStockState.value,
                    stockValue: productStockValue.value,
                    discountPersent: productDiscountPersent.value,
                    wholesalePrice: wholesalePrice.value,
                    wholesaleFrom: wholesalePriceFrom.value,
                    counterQuantity: counterQuantity.value,
                    packageType: packageType.value,
                    wholesaleOnly: wholesaleOnly.value,
                    productSize: productSize.value,
                    productWeight: productWeight.value,
                    productDensity: productDensity.value,
                    productCapacity: productCapacity.value,
                    productQuantity: productQuantity.value,
                    groupPackQuantity: productGroupQuantity.value,
                    translations: [
                        {
                            language: 'uk',
                            title: productNameUk.value,
                            description: productDescriptionUk.value,
                            wholesaleDescription: wholesaleDescriptionUk.value,
                            productColor: productColorUk.value,
                            groupPackage: productUnitTypeUk.value,
                            productMaterial: productMaterialUk.value,

                        },
                        {
                            language: 'en',
                            title: productNameEn.value,
                            description: productDescriptionEn.value,
                            wholesaleDescription: wholesaleDescriptionEn.value,
                            productColor: productColorEn.value,
                            groupPackage: productUnitTypeEn.value,
                            productMaterial: productMaterialEn.value,
                        },
                        {
                            language: 'ru',
                            title: productNameRu.value,
                            description: productDescriptionRu.value,
                            wholesaleDescription: wholesaleDescriptionRu.value,
                            productColor: productColorRu.value,
                            groupPackage: productUnitTypeRu.value,
                            productMaterial: productMaterialRu.value,
                        },
                    ],
                    options: toRaw(addOptionsRef.value)

                }

                formData.append('data', JSON.stringify(jsonData))

                const res = await $fetch('/api/products', {
                    method: 'POST',
                    body: formData,
                })


                return {
                    data: res
                }

            }

            const uploadAllData = async () => {

                try {

                    const [
                        productImgPath,
                         optionImgPath] = await Promise.all([
                        uploadProductFiles(),
                        uploadOptionFiles(),
                    ])

                    console.log('Изображения загружены:', 
                    productImgPath, 
                    optionImgPath);

                    const result = await uploadData(
                        productImgPath, 
                        optionImgPath);

                    clearModal();

                    emit('tooltip', {
                        status: 'success',
                        message: 'Товар створений успішно'
                    })



                } catch (error) {
                    console.error(error);
                    emit('tooltip', {
                        status: 'error',
                        message: error
                    })
                }

            }

            uploadAllData();

          
  
    };

    onMounted(async() => {
            try{
                const getData = await $fetch('/api/category')
                
                if (getData.data.length > 0) {
                    fetchedCategories.value = getData.data.map((item) => 
                    
                    ({
                        ...item,
                        itemLanguage: item.translations.find(translation => translation.language === 'uk')

                    }))
                }

            } catch (error) {
                console.log(error.message, 'error from getData')
            }

    })



</script>


<style scoped lang="scss">

    .add_product{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;

        .modal_wrapper{
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 1.25rem;
            height: 90vh;
            position: relative;
        }

        .add_image{
            display: flex;
            position: relative;
            flex-direction: column;
            gap: 1.25rem;
            height: 90vh;

            &_content{
                border-width: 2px;
                border-style: dashed;
                border-color: var(--main-dark-color);
                border-radius: 0.5rem;
                padding: 1.25rem;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;


            }

            &_preview{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1.25rem;

                .preview_wrapper{
                    width: 50px;
                    height: 50px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.25rem;
                }

                .remove_btn{
                    border-radius: 50%;
                    background-color: #ef4444;
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
                img{
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                }
            }

            .image_wrapper{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
                top: 2.5rem;
                width: 80%;

                input{
                    display: none;
                }

                .picture_container{
                    position: relative;
                    margin-bottom: 20px;
                }
                .picture{
                    width: clamp(50px, 10vw, 100px);
                    height: clamp(70px, 12vw, 200px);
                    max-height: clamp(70px, 15vh, 200px);
                    border: 1px solid var(--dark-color);
                    border-radius: 10px;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%) rotate(-10deg);

                }
                .second{
                    transform: translateX(-30%) translateY(-5%) rotate(-5deg);

                }
                .third{
                    transform: translateX(-10%) translateY(-10%) rotate(0deg);

                }
            }



                h2{
                    // @include mixins.cardText;
                    text-align: center;
                    margin-bottom: 15px;
                }

                span{
                    text-align: center;
                    // @include mixins.descriptionText(400, var(--dark-color));

                }
                .icon_label{

                }
                .upload-btn{
                    margin: 50px 0 20px;
                    // @include mixins.defaultShadow;
                    // @include mixins.descriptionText(500, var(--dark-color));
                    padding: 10px 20px;
                    cursor: pointer;
                }
        }

        .add_info{

            height: 90vh;

            .top_content{
                display: flex;
                align-items: center;
                justify-content: space-between;
               

            }

            .header_description{
                .accent_text{
                    color: red;
                }
            }

            .options{
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
                padding: 1rem 1rem 1.5rem 1rem;
                border-radius: 0.5rem; 

            }


               input{
            border: 1px solid darkgrey;
            border-radius: 10px;
            padding: 5px 10px;
            width: 100%;
            color: black;
        }
        textarea{
            border: 1px solid var(--dark-color);
            border-radius: 10px;
            padding: 5px 10px;
            width: 100%;
            color: var(--dark-color);
            resize: none;
        }

    .option{
        display: flex;
        flex-direction: column;
        z-index: 1;
        strong{
            color: red;
        }
        span{
            padding-bottom: 5px;
        }
       
    }

    select{
        width: fit-content;
        height: auto;
        border: 1px solid var(--dark-color);
        border-radius: 10px;
        padding: 5px 10px;
        color: var(--dark-color);
        margin-top: 0;
    }
    select:focus-visible{
        border: 1px solid var(--active-btn);
    }
  

    .text-wrapper{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 10px;
        .wrapper{
            min-width: 250px;
            flex-grow: 1;
            flex-basis: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

        }
    }

    .checkbox{
        display: flex;
align-items: center;
justify-content: flex-start;
gap: 1.25rem; 
        width: auto;
        height: auto;
    }
    .add-option{
        display: flex;
        flex: 1;

    }
    .label-wrapper{
        // @include mixins.labelFile
    }
    .price_option{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }
    .button-group{
        padding-top: 30px;
        padding-bottom: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        button{
            // @include mixins.defaultShadow;
            // @include mixins.descriptionText(500, var(--dark-color));
            padding: 10px 20px;
        }
        .addItem{
            color: var(--bg-color);
        }
    }

        }
    }


    // // @use './/styles/mixins.scss' as mixins;
   
    // span{
    //     color: var(--dark-color);
    // }
   
    // .add-image{
    //     h2{
    //         // @include mixins.cardText;
    //         margin-bottom: 15px;
    //     }

    //     span{
    //         // @include mixins.descriptionText(400, var(--dark-color));

    //     }
    //     .upload-btn{
    //         margin: 50px 0 20px;
    //         // @include mixins.defaultShadow;
    //         // @include mixins.descriptionText(500, var(--dark-color));
    //         padding: 10px 20px;
    //         cursor: pointer;
    //     }

    // }

    // h4{
    //     @include mixins.cardText;
    //     font-size: clamp(1rem, 1.2vw, 1.5rem);
    //     margin-bottom: 15px;
    // }

    // .picture{
    //     width: clamp(50px, 10vw, 100px);
    //     height: clamp(70px, 12vw, 200px);
    //     max-height: clamp(70px, 15vh, 200px);
    //     border: 1px solid var(--dark-color);
    //     border-radius: 10px;
    //     position: absolute;
    //     bottom: 0;
    //     left: 50%;
    //     transform: translateX(-50%) rotate(-10deg);

    // }
    // .second{
    //     transform: translateX(-30%) translateY(-5%) rotate(-5deg);

    // }
    // .third{
    //     transform: translateX(-10%) translateY(-10%) rotate(0deg);

    // }
    // input{
    //         border: 1px solid var(--dark-color);
    //         border-radius: 10px;
    //         padding: 5px 10px;
    //         width: 100%;
    //         color: var(--dark-color);
    //     }
    //     textarea{
    //         border: 1px solid var(--dark-color);
    //         border-radius: 10px;
    //         padding: 5px 10px;
    //         width: 100%;
    //         color: var(--dark-color);
    //         resize: none;
    //     }

    // .option{
    //     display: flex;
    //     flex-direction: column;
    //     z-index: 1;
    //     span{
    //         padding-bottom: 5px;
    //     }
       
    // }

    // select{
    //     width: fit-content;
    //     height: auto;
    //     border: 1px solid var(--dark-color);
    //     border-radius: 10px;
    //     padding: 5px 10px;
    //     color: var(--dark-color);
    //     margin-top: 0;
    // }
    // select:focus-visible{
    //     border: 1px solid var(--active-btn);
    // }
  

    // .text-wrapper{
    //     display: flex;
    //     justify-content: flex-start;
    //     flex-wrap: wrap;
    //     gap: 10px;
    //     .wrapper{
    //         min-width: 250px;
    //         flex-grow: 1;
    //         flex-basis: 0;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: space-between;

    //     }
    // }

    // .checkbox{
    //     width: auto;
    //     height: auto;
    // }
    // .add-option{
    //     display: flex;
    //     flex: 1;

    // }
    // .label-wrapper{
    //     // @include mixins.labelFile
    // }
    // .button-group{
    //     padding-top: 30px;
    //     padding-bottom: 50px;
    //     display: flex;
    //     justify-content: flex-end;
    //     align-items: center;
    //     gap: 10px;
    //     button{
    //         @include mixins.defaultShadow;
    //         @include mixins.descriptionText(500, var(--dark-color));
    //         padding: 10px 20px;
    //     }
    //     .addItem{
    //         color: var(--bg-color);
    //     }
    // }



</style>