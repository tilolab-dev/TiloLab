<template>
  <div class="order_detail_content">
    <Transition name="fade">
      <div v-if="loaderState" class="loader_content">
        <SharedLoader />
      </div>
    </Transition>
    <div class="order_detail_wrapper">
      <div class="order_detail_top">
        <div class="close_button_wrapper">
          <button @click="modalStore.closeModal">
            <CloseIcon />
          </button>
        </div>
      </div>

      <div class="order_detail_sections">
        <button
          class="section"
          :class="{ section_active: activeTab === 'order-info' }"
          @click="activeTab = 'order-info'"
        >
          Інформація про замовлення
        </button>
        <button
          class="section"
          :class="{ section_active: activeTab === 'create-ttn' }"
          @click="activeTab = 'create-ttn'"
        >
          Сформувати ТТН
        </button>
        <button
          class="section"
          :class="{ section_active: activeTab === 'create-sender' }"
          @click="activeTab = 'create-sender'"
        >
          Створити відправника
        </button>
      </div>

      <div v-if="activeTab === 'order-info'" class="order_detail_main_info">
        <div v-if="modalProps.order.paymentMethod === 'cod'" class="cod_order">
          Замовлення з післяоплатою!
        </div>
        <div class="order_detail_main">
          <div class="info">
            <h3 class="order_number">№ Замовлення: {{ modalProps.order.orderNumber }}</h3>
            <span>
              Від: {{ modalProps.order.createdAt.slice(0, 10) }} -
              {{ modalProps.order.createdAt.slice(11, 19) }}</span
            >
          </div>
          <div class="total_price">
            <h3>Всього:</h3>
            <p>{{ modalProps.order.totalPrice }} грн</p>
          </div>
        </div>

        <div class="order_status">
          <h3>Статус замовлення:</h3>
          <span class="status_badge">{{ modalProps.order.status }}</span>
        </div>

        <div class="order_info_main">
          <div class="client">
            <strong class="block_description"> Клієнт: </strong>

            <div class="client_main">
              <img
                :src="!modalProps.order.userId ? '/icons/user/guest.webp' : '/icons/user/user.webp'"
                alt="avatar"
                width="50"
                height="50"
              />

              <ul class="info_wrapper">
                <li>
                  <strong>Прізвище, ім'я:</strong>
                  <p>{{ modalProps.order.shippingInfo.recipient ?? "" }}</p>
                </li>

                <li>
                  <strong>Місто:</strong>
                  <p>{{ modalProps.order.shippingInfo.city }}</p>
                </li>
                <li>
                  <strong>Адреса:</strong>
                  <p>{{ modalProps.order.shippingInfo.address || "-" }}</p>
                </li>
                <li>
                  <strong>Телефон:</strong>
                  <p>{{ modalProps.order.shippingInfo.phoneNumber }}</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="shipping_info">
            <strong class="block_description"> Доставка: </strong>

            <ul class="shipping_info_wrapper">
              <li>
                <strong>Пошта:</strong>
                <p>{{ modalProps.order.shippingInfo.deliveryMethod }}</p>
              </li>
              <li>
                <strong>Місто:</strong>
                <p>{{ modalProps.order.shippingInfo.city }}</p>
              </li>
              <li>
                <strong>Відділення:</strong>
                <p>{{ modalProps.order.shippingInfo.postOffice.length === 0 ? "-" : "" }}</p>
              </li>
              <li v-if="modalProps.order.shippingInfo.postOffice.length > 0">
                <p>{{ modalProps.order.shippingInfo.postOffice || "-" }}</p>
              </li>
              <li>
                <strong>Поштомат:</strong>
                <p>{{ modalProps.order.shippingInfo.postomat.length === 0 ? "-" : "" }}</p>
              </li>
              <li v-if="modalProps.order.shippingInfo.postomat.length > 0">
                <p>
                  {{ modalProps.order.shippingInfo.postomat }}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div v-if="modalProps.order.orderComment" class="user_comment">
          <div class="user_comment_description">Коментар користувача:</div>
          <div class="user_comment_item">comment</div>
        </div>

        <div class="items_info">
          <strong>Товари:</strong>
          <ul class="items_info_wrapper">
            <li
              v-for="item in modalProps.order.orderItems"
              :key="item.id"
              class="items_info_product"
            >
              <div class="product_info_wrapper">
                <div class="product_main">
                  <img
                    v-if="item.product?.img?.[0]?.path"
                    :src="item.product.img[0].path"
                    alt="product"
                    width="50"
                    height="50"
                  />
                  <img v-else :src="FallbackImg" alt="product" width="50" height="50" />
                  <p>{{ item.name }}</p>
                </div>

                <div class="product_summ">
                  <p>{{ item.quantity }}</p>
                  <p>X</p>
                  <p>
                    {{ item.product.productPrice }}
                  </p>
                  <p>
                    <strong> Всього :</strong>
                    {{ item.quantity * item.product.productPrice }} грн.
                  </p>
                </div>
              </div>

              <div
                v-if="modalProps.order.createdCertificates[0]?.code"
                class="certificate_info_wrapper"
              >
                <div class="text_label">
                  <span> Код сертифіката: </span>
                  <strong>
                    {{ modalProps.order.createdCertificates[0]?.code }}
                  </strong>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="change_recipient">
          <div class="change_recipient_head">
            <div class="change_recipient_title">Змінити отримувача</div>
            <button
              class="select_btn"
              :class="changeRecipientState ? 'select_btn_active' : ''"
              @click="changeRecipientState = !changeRecipientState"
            ></button>
          </div>
        </div>

        <div class="change_status">
          <strong>Змінити статус:</strong>
          <select v-model="selectValue" name="select">
            <option v-for="item in selectData" :key="item.id" :value="item.value">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="button_wrapper">
          <button
            :class="activeButton ? 'active_btn' : ''"
            class="accept_btn"
            @click="activeButton ? changeStatus() : ''"
          >
            Підтвердити зміни
          </button>

          <button class="cancel_btn" @click="modalStore.closeModal">Скасувати</button>
        </div>
      </div>
      <div v-else-if="activeTab === 'create-ttn'" class="order_detail_ttn_info">
        <div class="select_sender">
          <div>Відправник:</div>
          <select v-if="senderList.length > 0" id="sender" v-model="selectedSenderId" name="sender">
            <option disabled selected value>Оберіть відправника</option>
            <option v-for="item in senderList" :key="item.id" :value="item.id">
              {{ `${item.name}, ${item.family}, ${item.postOffice}` }}
            </option>
          </select>
        </div>
        <div class="cargo_type">
          <div class="cargo_type_title">Тип посилки:</div>
          <div class="cargo_type_wrapper">
            <div
              v-for="item in boxTypes"
              :key="item.id"
              class="cargo_type_item"
              :class="
                selectedCargo !== null && item.optionType === selectedCargo
                  ? 'cargo_type_item_active'
                  : ''
              "
              @click="selectedCargo = item.optionType"
            >
              <div class="icon">{{ item.icon }}</div>
              <p>{{ item.typName }}</p>
            </div>
          </div>
        </div>
        <div v-if="selectedCargo !== null" class="select_box">
          <div>{{ boxTypes.find((item) => item.optionType === selectedCargo).typName }}</div>
          <select v-model="selectedBox">
            <option disabled value="">Оберіть опцію</option>
            <option v-for="box in filteredBoxOptions" :key="box.label" :value="box">
              {{ box.label }} ({{ box.size.join("×") }} см)
            </option>
          </select>
        </div>
        <div class="create_ttn">
          <p>Створити експресс накладну для замовлення:</p>
          <button @click="createTtnHandler">Створити</button>
        </div>
      </div>
      <div v-else class="create_sender">
        <!-- <div v-if="loaderState" class="loader_wrapper">
          <SharedLoader />
        </div> -->
        <div class="create_sender_wrapper">
          <div class="create_sender_title">Створити відправника</div>

          <div class="items_wrapper">
            <!-- <div class="item">
              <div class="item_name">Імʼя:</div>
              <input
                v-model="senderName"
                class="item_input"
                type="text"
                placeholder="Введіть імʼя"
              />
            </div>
            <div class="item">
              <div class="item_name">По батькові:</div>
              <input v-model="senderSurname" type="text" placeholder="Введіть по батькові" />
            </div>
            <div class="item">
              <div class="item_name">Прізвище:</div>
              <input v-model="senderFamily" type="text" placeholder="Введіть прізвище" />
            </div>
            <div class="item">
              <div class="item_name">Номер телефону:</div>
              <input
                :value="senderPhoneNumber"
                type="tel"
                @input="onPhoneInput"
                @keydown="onPhoneKeydown"
              />
            </div> -->
            <div class="item">
              <div class="item_name">Місто:</div>
              <input
                v-model="senderCity"
                type="text"
                placeholder="Виберіть номер відділення"
                @input="getCitiesNp"
              />
              <ul v-if="fetchedCity.length > 0" class="fetched_list">
                <li
                  v-for="(el, i) in fetchedCity"
                  :key="i"
                  @click="
                    ((senderCity = el.MainDescription),
                    (fetchedCity = []),
                    (fetchedCityRef = el.Ref))
                  "
                >
                  {{ el.Present }}
                </li>
              </ul>
            </div>
            <!--<div class="item">
              <div class="item_name">Відділення Нової пошти:</div>

              <input
                v-model="postAddress"
                type="text"
                placeholder="Введіть номер відділення"
                @input="getPostOfficeNp"
              />

              <ul v-if="postAddressList.length > 0 && postAddress.length > 0" class="fetched_list">
                <li
                  v-for="(el, i) in postAddressList"
                  :key="i"
                  @click="
                    ((postAddress = el.Description),
                    (postAddressList = []),
                    (postAddressRef = el.Ref))
                  "
                >
                  {{ el.Description }}
                </li>
              </ul>
            </div> -->

            <div class="item">
              <div class="radio_wrapper">
                <input
                  id="menu1"
                  v-model="selectedDelivery"
                  type="radio"
                  name="accordeon"
                  value="branch"
                  checked
                  @click="getPostOfficeNp(e, 'reload')"
                />
                <label for="menu1" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>Відділення Нової пошти</span>
                </label>
                <div class="delivery_wrapper">
                  <input
                    v-model="postAddress"
                    type="text"
                    placeholder="Введіть номер відділення"
                    @input="getPostOfficeNp"
                  />
                  <ul
                    v-if="postAddressList.length > 0 && postAddress.length > 0"
                    class="fetched_list"
                  >
                    <li
                      v-for="(el, i) in postAddressList"
                      :key="i"
                      @click="
                        (((postAddress = el.Description), (postAddressList = [])),
                        (postAddressId = el.Ref),
                        (categoryOfWarehouse = el.CategoryOfWarehouse))
                      "
                    >
                      {{ el.Description }}
                    </li>
                  </ul>
                </div>

                <input
                  id="menu2"
                  v-model="selectedDelivery"
                  value="postomat"
                  type="radio"
                  name="accordeon"
                />
                <label for="menu2" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>Поштомат Нової пошти</span>
                </label>
                <div class="delivery_wrapper">
                  <input
                    v-model="postomatNumber"
                    type="text"
                    placeholder="Введіть номер поштомату"
                    @input="(e) => getPostomatsNp(e, 'reload')"
                  />

                  <ul
                    v-if="postomatList.length > 0 && postomatNumber.length > 0"
                    class="fetched_list"
                  >
                    <li
                      v-for="(el, i) in postomatList"
                      :key="i"
                      @click="
                        ((postomatNumber = el.ShortAddress),
                        (postomatList = []),
                        (postomatId = el.Ref),
                        (categoryOfWarehouse = el.CategoryOfWarehouse))
                      "
                    >
                      {{ el.Description }}
                    </li>
                  </ul>
                </div>

                <!-- <input id="menu3" type="radio" name="accordeon" />
              <label v-if="cityRef === 'Київ'" for="menu3" class="radio-elem">
                <div class="radio-btn"></div>
                <span>Кур'єрська доставка (м. Київ)</span>
              </label>
              <div class="delivery_wrapper">
                <input type="text" placeholder="Введіть адресу" />
                <span>За тарифами перевізника</span>
              </div> -->
              </div>
            </div>
          </div>

          <button class="create_btn" @click="createNewSender">Створити</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from "~/assets/icons/close-icon.svg";
// import ErrorIcon from "~/assets/icons/error.svg";

import { ref, onMounted, computed, watch } from "vue";
import { useModalStore } from "@/store/modal-store";
import { useOrdersStore } from "@/store/orders-store";
import FallbackImg from "@/public/images/fallback-img.webp";

const modalStore = useModalStore();
const orderStore = useOrdersStore();
const loaderState = ref(false);
const selectValue = ref();
const activeTab = ref("order-info");
// const isDeleting = ref(false);

// TTN

const senderList = ref([]);
const selectedSenderId = ref("");
const selectedBox = ref(null);

const selectedDelivery = ref("branch");

//SENDER

// const senderName = ref("");
// const senderSurname = ref("");
// const senderFamily = ref("");
const senderCity = ref("");
// const senderPhoneNumber = ref("+38 (0");
const senderPostomat = ref("");
// const senderPostOffice = ref(false);

const fetchedCity = ref([]);
const fetchedCityRef = ref("");
const postAddress = ref("");
const postAddressRef = ref("");
const postAddressList = ref([]);
const postomatNumber = ref("");
const postomatList = ref([]);
const postAddressId = ref("");

let timerId = null;

const selectedCargo = ref(null);
const changeRecipientState = ref(false);

// const boxOptions = [
//   { label: "Коробка до 1 кг", weight: 1, length: 20, width: 20, height: 20 },
//   { label: "Коробка до 2 кг", weight: 2, length: 30, width: 20, height: 20 },
//   { label: "Коробка до 5 кг", weight: 5, length: 40, width: 30, height: 30 },
//   { label: "Коробка до 10 кг", weight: 10, length: 50, width: 40, height: 40 }
// ];

const boxTypes = [
  {
    id: 1,
    icon: "📦",
    typName: "Коробка",
    optionType: "box"
  },
  {
    id: 2,
    icon: "🛍️",
    typName: "Пакет",
    optionType: "bag"
  },
  {
    id: 3,
    icon: "✉️",
    typName: "Конверт",
    optionType: "documents"
  }
];

const boxOptions = [
  { type: "box", label: "Коробка 0.5 кг", weight: 0.5, size: [20, 20, 20] },
  { type: "box", label: "Коробка 1 кг", weight: 1, size: [25, 25, 25] },
  { type: "box", label: "Коробка 2 кг", weight: 2, size: [30, 30, 30] },
  { type: "box", label: "Коробка 3 кг", weight: 3, size: [35, 35, 35] },
  { type: "box", label: "Коробка 5 кг", weight: 5, size: [40, 40, 40] },
  { type: "box", label: "Коробка 10 кг", weight: 10, size: [50, 50, 50] },

  { type: "bag", label: "Пакет 0.5 кг", weight: 0.5, size: [30, 20, 5] },
  { type: "bag", label: "Пакет 1 кг", weight: 1, size: [35, 25, 5] },
  { type: "bag", label: "Пакет 2 кг", weight: 2, size: [40, 30, 5] },
  { type: "bag", label: "Пакет 4 кг", weight: 4, size: [50, 40, 5] },

  { type: "documents", label: "Конверт (документи)", weight: 0.2, size: [30, 20, 1] }
];

const filteredBoxOptions = computed(() => {
  if (!selectedCargo.value) return [];
  return boxOptions.filter((box) => box.type === selectedCargo.value);
});

const modalProps = defineProps({
  order: {
    type: Object,
    required: true
  }
});

const gentSenderList = async () => {
  loaderState.value = true;
  try {
    const senderListRes = await $fetch("/api/np/get-senders", {
      method: "GET"
    });

    if (senderListRes.statusCode === 200) {
      senderList.value = senderListRes.data;
    }
  } catch (err) {
    console.error(err);
  } finally {
    loaderState.value = false;
  }
};

watch(activeTab, (newVal) => {
  if (newVal === "create-ttn") {
    gentSenderList();
  }
});

// const onPhoneKeydown = (e) => {
//   isDeleting.value = e.key === "Backspace" || e.key === "Delete";
// };
// const onPhoneInput = (e) => {
//   let value = e.target.value;
//   let digits = value.replace(/\D/g, "");

//   if (isDeleting.value && digits.length <= 3) {
//     senderPhoneNumber.value = "+38 (0";
//     e.target.value = senderPhoneNumber.value;
//     return;
//   }
//   const formatted = formatFromDigits(digits);
//   senderPhoneNumber.value = formatted;
//   e.target.value = formatted;
// };

const debounce = (string, fn) => {
  return () => {
    clearTimeout(timerId);
    if (string === "") {
      return fn();
    }
    timerId = setTimeout(() => {
      fn();
    }, 700);
  };
};

const getCitiesNp = debounce(senderCity.value, async () => {
  const npCities = await $fetch("/api/np/cities", {
    method: "POST",
    body: {
      city: senderCity.value
    }
  });

  if (!npCities.data || !npCities.data[0].Addresses) {
    return;
  } else {
    fetchedCity.value = npCities.data[0].Addresses;
  }
});

const getPostomatsNp = debounce(postomatNumber.value, async () => {
  // if (!senderCity.value) {
  //   // tooltip({ status: "warning", message: "Введіть місто" });
  //   postomatNumber.value = "";
  //   return;
  // }

  const getPostomatsByNumber = await $fetch("/api/np/postomatNumber", {
    method: "POST",
    body: {
      cityName: senderCity.value,
      postomatNumber: postomatNumber.value
    }
  });
  postomatList.value = getPostomatsByNumber.data;
  return;
});

const getPostOfficeNp = debounce(postAddress.value, async () => {
  if (!senderCity.value) {
    alert("Введіть місто");
    postAddress.value = "";
    return;
  }
  if (!postAddress.value.length) return;
  // if (state === "reload") {
  // const getOfficeByNumber = await novaPost.fetchOfficeByNumber(cityName.value, postAddress.value);
  const getOfficeByNumber = await $fetch("/api/np/postOffice", {
    method: "POST",
    body: {
      cityName: senderCity.value,
      postNumber: postAddress.value
    }
  });

  const filteredOffice = getOfficeByNumber.data.filter(
    (item) => item.CategoryOfWarehouse === "Branch"
  );

  postAddressList.value = filteredOffice;
  //   return;
  // }
  // if (preventReloadBox.value) {
  //   return;
  // }
  // if (!cityName.value) {
  //   // tooltip({
  //   //   status: "info",
  //   //   message: "Виберіть місто"
  //   // });
  //   alert("Виберіть місто");
  //   event.preventDefault();
  //   return;
  // }
  // const postOfficeNp = await novaPost.fetchPostAddresses(cityName.value);
  // // console.log(postOfficeNp, 'postOfficeNp');
  // const filteredOffice = postOfficeNp.data.filter((item) => item.CategoryOfWarehouse === "Branch");
  // postAddressList.value = filteredOffice;
});

// const formatFromDigits = (digits) => {
//   digits = digits.slice(0, 12);

//   let result = "+38";

//   if (digits.length > 2) {
//     result += " (" + digits.slice(2, 5);
//   }

//   if (digits.length >= 5) {
//     result += ") " + digits.slice(5, 8);
//   }

//   if (digits.length >= 8) {
//     result += "-" + digits.slice(8, 10);
//   }

//   if (digits.length >= 10) {
//     result += "-" + digits.slice(10, 12);
//   }

//   if (result.length === 17 && isDeleting.value) {
//     result = result.slice(0, -1);
//   }
//   if (result.length === 14 && isDeleting.value) {
//     result = result.slice(0, -1);
//   }
//   if (result.length === 10 && isDeleting.value) {
//     result = result.slice(0, -1);
//   }
//   if (result.length === 9 && isDeleting.value) {
//     result = result.replace(")", "");
//   }

//   return result;
// };

const activeButton = computed(() => {
  return selectValue.value !== modalProps.order.status;
});

const selectData = ref([
  {
    id: 1,
    value: "NEW",
    name: "Новий"
  },
  {
    id: 2,
    value: "PAID",
    name: "Оплачений"
  },
  {
    id: 3,
    value: "PROCESSING",
    name: "В обробці"
  },
  {
    id: 4,
    value: "SHIPPED",
    name: "Відправлений"
  },
  {
    id: 5,
    value: "DELIVERED",
    name: "Доставлено"
  },
  {
    id: 6,
    value: "RETURNED",
    name: "Повернений"
  },
  {
    id: 7,
    value: "CANCELED",
    name: "Скасований"
  }
]);

const createNewSender = async () => {
  // if (senderName.value.length < 2) {
  //   console.log(senderName.value);
  //   alert("Імʼя повинно бути більше 2х символів");
  //   return;
  // }
  // if (senderSurname.value.length < 2) {
  //   alert("По батькові повинно бути більше 2х символів");
  //   return;
  // }
  // if (senderFamily.value.length < 2) {
  //   alert("Прізвище повинно бути більше 2х символів");
  //   return;
  // }
  // if (senderPostomat.value.length < 2 && senderPostOffice.value.length < 2) {
  //   alert("Оберіть номер відділення чи номер поштомату");
  //   return;
  // }
  loaderState.value = true;

  // const formattedPhoneNumber = senderPhoneNumber.value
  //   .replaceAll("-", "")
  //   .replaceAll(" ", "")
  //   .replaceAll("(", "")
  //   .replaceAll(")", "");
  try {
    // const createCounterPartyRes = await $fetch("/api/np/create-counterparty", {
    //   method: "POST",
    //   body: {
    //     firstName: senderName.value,
    //     lastName: senderFamily.value,
    //     phone: formattedPhoneNumber
    //   }
    // });

    // const counterPartyRef = createCounterPartyRes.data[0].Ref;

    // if (!counterPartyRef) {
    //   alert("Щось пішло не так спробуйте пізніше");
    //   return;
    // }

    // const createContactPerson = await $fetch("/api/np/create-contact-person", {
    //   method: "POST",
    //   body: {
    //     firstName: senderName.value,
    //     lastName: senderFamily.value,
    //     phone: formattedPhoneNumber
    //     // counterPartyId: counterPartyRef
    //   }
    // });

    // if (!createContactPerson) {
    //   alert("Щось пішло не так спробуйте пізніше");
    //   return;
    // }

    // const contactPersonRef = createContactPerson.data[0].Ref;

    if (!senderCity.value) {
      alert("Введіть місто");
      return;
    }

    if (!postAddress.value && !senderCity.value) {
      alert("Введіть місто та номер відділення");
      return;
    }

    const getSenderProperty = await $fetch("/api/np/get-sender-property", {
      method: "POST"
    });

    if (getSenderProperty.statusCode !== 200) {
      alert("Щось пішло не так спробуйте пізніше");
      return;
    }

    const senderData = getSenderProperty.data[0];

    const senderName = senderData.FirstName;
    const senderSurname = senderData.MiddleName;
    const senderFamily = senderData.LastName;
    const senderPhoneNumber = senderData.Phones;

    const createSenderRes = await $fetch("/api/np/create-sender", {
      method: "POST",
      body: {
        name: senderName,
        surname: senderSurname,
        family: senderFamily,
        phoneNumber: senderPhoneNumber,
        senderCity: senderCity.value,
        senderPostOffice: postAddress.value,
        senderPostomat: senderPostomat.value,

        cityId: fetchedCityRef.value,
        // counterPartyId: counterPartyRef,
        // contactPersonId: contactPersonRef,
        postAddressId: postAddressRef.value
      }
    });
    if (createSenderRes.statusCode === 200) {
      // senderName.value = "";
      // senderSurname.value = "";
      // senderFamily.value = "";
      // senderPhoneNumber.value = "";
      senderCity.value = "";
      postAddress.value = "";
      fetchedCityRef.value = "";
      postAddressRef.value = "";
      alert("Відправник створенний успішно");
    }
  } catch (err) {
    console.error(err);
  } finally {
    loaderState.value = false;
  }
};

const createTtnHandler = async () => {
  if (!selectedBox.value) {
    alert("Оберіть коробку");
    return;
  }

  const sender = senderList.value.find((el) => el.id === selectedSenderId.value);

  if (!sender) {
    alert("Оберіть відправника, чи створіть нового");
    return;
  }

  const order = modalProps.order;

  const [recipientFirstName, recipientLastName] = order.shippingInfo.recipient.split(" ");

  const formattedRecipientPhone = order.shippingInfo.phoneNumber
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "");

  const [boxLength, boxWidth, boxHeight] = selectedBox.value.size;

  const ttnBody = {
    // TTN - SETTINGS

    // codDelivery: order.paymentMethod === "cod" ? true : false,

    // ORDER
    orderId: order.orderNumber,
    payerType: order.totalPrice >= 2000 ? "Sender" : "Recipient",
    selectedCargoType: selectedBox.value.type === "documents" ? "Documents" : "Parcel",

    // BOX
    weight: selectedBox.value.weight,
    length: boxLength,
    width: boxWidth,
    height: boxHeight,

    // SENDER

    senderCityId: sender.NPcityId,
    senderContactId: sender.NPcontactSenderId,
    senderAddressId: sender.NPsenderAddressId,
    senderId: sender.NPsenderId,
    senderPhoneNumber: sender.phoneNumber,

    // RECIPIENT

    recipientCityId: order.shippingInfo.NPcityId,
    recipientWarehouseId: order.shippingInfo.NPwarehouseId,
    recipientName: recipientFirstName,
    recipientLastName: recipientLastName,
    recipientPhone: formattedRecipientPhone,
    recipientId: order.shippingInfo.NPrecipientId,
    recipientContactId: order.shippingInfo.NPrecipientContactId,

    orderPrice: modalProps.order.totalPrice < 300 ? 300 : modalProps.order.totalPrice
  };

  try {
    const getTtnRes = await $fetch("/api/np/create-ttn", {
      method: "POST",
      body: ttnBody
    });

    await orderStore.updateOrderStatus(modalProps.order.id, "SHIPPED");

    console.log(getTtnRes);
  } catch (err) {
    console.error(err);
  }
};

const changeStatus = async () => {
  loaderState.value = true;
  try {
    const res = await orderStore.updateOrderStatus(modalProps.order.id, selectValue.value);

    if (res.statusCode === 200) {
      loaderState.value = false;
      alert("Статус успішно змінено");
      modalStore.closeModal();
    }
  } catch (err) {
    console.log(err);
  }
  loaderState.value = false;
};

onMounted(() => {
  selectValue.value = modalProps.order.status;
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.order_detail_content {
  position: absolute;
  top: 20%;
  transform: translateY(-50%);
  background:
    linear-gradient(180deg, rgba(255, 169, 214, 0.05) 0%, rgba(255, 169, 214, 0) 30%),
    var(--bg-color);
  border: 1px solid var(--border-color);
  min-width: 50vw;
  max-height: 65vh;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 24px 60px -20px rgba(0, 0, 0, 0.65),
    0 0 40px -12px rgba(255, 169, 214, 0.16);

  .loader_content {
    inset: 0;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgba(13, 12, 13, 0.55);
    backdrop-filter: blur(7px);
  }

  @media screen and (max-width: 850px) {
    min-width: unset;
    max-height: unset;
    width: 100vw;
    height: 100vh;
    top: 50%;
    position: fixed;
    border-radius: 0;
    border: unset;
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

.order_detail_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 169, 214, 0.35) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 169, 214, 0.3);
    border-radius: 10px;
  }

  .order_detail_top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    width: 100%;
  }

  .order_detail_title {
    flex: 1;
    width: 100%;
    @include mixins.subtitleText;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-grey);
    padding-inline: 10px;
    strong {
      font-weight: 900;
      color: var(--accent-red);
      text-decoration: underline;
    }
  }

  .close_button_wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: transparent;
      border: 1px solid transparent;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all ease 0.25s;
      svg {
        width: 15px;
        height: 15px;
        stroke: var(--text-grey);
        transition: all ease 0.25s;
      }
      @media screen and (min-width: 1024px) {
        &:hover {
          background: rgba(255, 64, 128, 0.1);
          border-color: var(--error-border);
          svg {
            stroke: var(--error-border);
          }
        }
      }
      @media screen and (max-width: 1024px) {
        & {
          svg {
            stroke: var(--error-border);
          }
        }
      }
    }
  }

  .order_detail_sections {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-inline: 6px;
    width: 100%;
    height: auto;
    gap: 4px;

    .section {
      flex: 1;
      width: 100%;
      height: auto;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-bottom: 2px solid transparent;
      padding: 14px 10px;
      color: var(--dark-text);
      @include mixins.mainText;
      font-size: 0.9375rem;
      transition: all ease 0.25s;

      @media screen and (min-width: 1024px) {
        &:hover {
          color: var(--text-color);
        }
      }
    }

    .section_active {
      color: var(--accent-color);
      border-bottom: 2px solid var(--accent-color);
    }

    @media screen and (max-width: 550px) {
      .section {
        font-size: 0.75rem;
        padding: 12px 4px;
      }
    }
  }

  .cod_order {
    background: var(--warning-bg);
    color: var(--warning-text);
    border-bottom: 1px solid var(--warning-border);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.4px;
    padding: 12px 20px;
    @include mixins.subtitleText;
    font-size: 0.875rem;
  }

  .order_status,
  .user_comment {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    h3 {
      @include mixins.subtitleText;
      font-size: 1rem;
      color: var(--text-grey);
      font-weight: 500;
    }
  }

  .status_badge {
    @include mixins.mainText;
    font-size: 0.8125rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    padding: 6px 14px;
    border-radius: 20px;
    background: var(--success-bg);
    border: 1px solid var(--success-border);
    color: var(--success-text);
  }

  .user_comment {
    background: var(--success-bg);
    &_description {
      @include mixins.subtitleText;
    }
  }

  .order_info_main {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: auto;
    padding-inline: 20px;
    padding-block: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    gap: 24px;

    .block_description {
      @include mixins.subtitleText;
      font-size: 0.9375rem;
      color: var(--accent-color);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .client_main,
    .shipping_info_wrapper {
      strong {
        @include mixins.mainText;
        font-size: 0.9375rem;
        color: var(--dark-text);
        font-weight: 500;
      }
      p {
        @include mixins.mainText;
        font-size: 0.9375rem;
        text-align: right;
      }
    }

    .client {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      width: 100%;
      height: auto;
      gap: 10px;
      flex: 1;

      .info_wrapper {
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }

      &_main {
        width: 100%;
        height: auto;
        display: flex;
        align-items: flex-start;
        gap: 14px;

        img {
          border-radius: 50%;
          border: 1px solid var(--border-color);
        }
      }
    }

    .shipping_info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
      flex: 1;

      &_wrapper {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        padding-top: 15px;
      }
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    }

    @media screen and (max-width: 550px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  .order_detail_main_info,
  .order_detail_ttn_info,
  .create_sender {
    width: 100%;
    height: auto;
    position: relative;
    min-height: 500px;
  }

  .change_recipient {
    width: 100%;
    height: auto;
    position: relative;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &_head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 16px;
    }

    &_title {
      @include mixins.mainText;
      font-size: 0.9375rem;
    }

    .select_btn {
      width: 20px;
      height: 20px;
      border: 2px solid var(--border-color);
      border-radius: 50%;
      cursor: pointer;
      transition: all ease 0.25s;
      background: transparent;
    }
    .select_btn_active {
      border: 5px solid var(--accent-color);
      transition: all ease 0.25s;
    }
  }

  .cargo_type {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    height: auto;
    width: 100%;
    gap: 15px;

    &_title {
      width: 100%;
      @include mixins.mainText;
      font-size: 0.9375rem;
      color: var(--dark-text);
    }

    &_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      width: 100%;
      height: auto;
      gap: 12px;
    }

    &_item {
      background: rgba(255, 255, 255, 0.03);
      width: 100%;
      height: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      padding: 16px;
      gap: 20px;
      flex: 1;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all ease 0.25s;

      .icon {
        font-size: 1.5rem;
      }

      p {
        @include mixins.mainText;
        font-size: 0.875rem;
      }

      @media screen and (min-width: 1024px) {
        &:hover {
          border: 1px solid var(--border-color);
          background: rgba(255, 169, 214, 0.05);
        }
      }
    }
    &_item_active {
      border: 1px solid var(--btn-color-active) !important;
      background: rgba(255, 169, 214, 0.08) !important;
    }
  }

  .order_detail_ttn_info {
    .select_sender,
    .select_box {
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 14px;

      > div {
        @include mixins.mainText;
        font-size: 0.9375rem;
        color: var(--dark-text);
      }

      select {
        width: 100%;
        height: 46px;
        background: rgba(255, 255, 255, 0.04);
        border-radius: 8px;
        padding: 5px 14px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        outline: none;
        color: var(--text-color);
        @include mixins.mainText;
        font-size: 0.875rem;
        transition: border-color ease 0.25s;

        &:focus {
          border-color: var(--border-color);
        }
      }
    }
  }

  .order_detail_main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    .info,
    .total_price {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 8px;

      h3 {
        @include mixins.subtitleText;
        font-size: 1.0625rem;
      }

      span {
        @include mixins.mainText;
        font-size: 0.8125rem;
        color: var(--dark-text);
      }
    }

    .total_price {
      align-items: flex-end;

      p {
        @include mixins.subtitleText;
        color: var(--accent-color);
        font-size: 1.25rem;
      }
    }
  }

  .items_info {
    width: 100%;
    height: auto;
    position: relative;
    padding-inline: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 14px;
    padding-block: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    strong {
      @include mixins.subtitleText;
      font-size: 0.9375rem;
      color: var(--accent-color);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    &_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: auto;
      gap: 10px;
    }

    &_product {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .product_info_wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 14px;
        align-items: center;
        width: 100%;
        height: auto;
        gap: 12px;
        flex-wrap: wrap;
      }

      .product_main {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;

        img {
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        p {
          @include mixins.mainText;
          font-size: 0.875rem;
        }
      }

      .product_summ {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;

        p {
          @include mixins.mainText;
          font-size: 0.875rem;
          color: var(--dark-text);

          strong {
            color: var(--text-color);
            text-transform: none;
            letter-spacing: normal;
          }
        }
      }

      .certificate_info_wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px 14px;
        width: 100%;
        height: auto;
        gap: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.06);

        .text_label {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 5px 10px;
          gap: 7px;
          background: var(--error-btn);
          border: 1px solid var(--error-border);
          color: var(--error-text);
          font-size: 0.6875rem;
          border-radius: 7px;
        }

        strong {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: inherit;
        }
      }
    }
  }

  .change_status {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding-inline: 20px;
    gap: 14px;
    padding-block: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    strong {
      @include mixins.subtitleText;
      font-size: 0.9375rem;
      color: var(--dark-text);
    }

    select {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      color: white;
      border-radius: 8px;
      width: min(280px, 100%);
      outline: none;
      font-size: 0.875rem;
      padding: 10px 15px;
      @include mixins.mainText;
    }
  }

  .button_wrapper {
    display: flex;
    justify-content: center;
    padding-inline: 20px;
    padding-bottom: 20px;
    margin-top: 15px;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 12px;

    .accept_btn {
      background: rgba(255, 255, 255, 0.05);
      color: var(--dark-text);
      cursor: not-allowed;
      padding-block: 12px;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: all ease 0.25s;
    }

    .active_btn {
      background: var(--success-btn);
      border: 1px solid var(--success-border);
      color: var(--success-text);
      cursor: pointer;
      transition: all ease 0.25s;

      @media screen and (min-width: 1024px) {
        &:hover {
          background: var(--success-btn-hover);
          border: 1px solid var(--success-border);
        }
      }
    }

    .cancel_btn {
      border: 1px solid var(--dark-text);
      border-radius: 8px;
      padding-block: 12px;
      color: var(--text-grey);
      transition: all ease 0.25s;
      background: transparent;

      @media screen and (min-width: 1024px) {
        &:hover {
          background: rgba(255, 169, 214, 0.08);
          border: 1px solid var(--border-color);
          color: var(--text-color);
        }
      }
    }

    button {
      flex: 1;
      @include mixins.mainText;
      font-size: 0.9375rem;
      cursor: pointer;
    }
  }

  .create_ttn {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
    padding: 40px 20px 20px;

    p {
      @include mixins.mainText;
      color: var(--dark-text);
      font-size: 0.9375rem;
      text-align: center;
    }

    button {
      @include mixins.accentBtn;
      padding: 12px 32px;
      font-size: 0.9375rem;
    }
  }

  .create_sender {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    position: relative;
    padding: 20px;

    &_wrapper {
      width: 100%;
      height: auto;
      flex: 1;
      padding-bottom: 50px;
    }

    &_title {
      @include mixins.subtitleText;
      color: var(--accent-color);
      text-transform: uppercase;
      letter-spacing: 0.4px;
      font-size: 0.9375rem;
    }

    .items_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 24px;
      padding-bottom: 40px;
      width: 100%;
      height: auto;
      gap: 10px;

      input[type="radio"] {
        display: none;
      }

      .radio-elem {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        height: auto;
        gap: 10px;
        cursor: pointer;
      }

      .radio-elem span {
        @include mixins.mainText;
        font-size: 0.9375rem;
        @media screen and (max-width: 768px) {
          font-size: 0.875rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.8125rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.75rem;
        }
      }

      .delivery_wrapper {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        position: relative;
        display: none;
        width: 100%;
        height: auto;
        gap: 16px;
        margin-top: 12px;
        // margin-left: 28px;
        @include mixins.defaultInput;

        span {
          @include mixins.mainText;
          font-size: 0.9375rem;
          @media screen and (max-width: 1024px) {
            font-size: 0.875rem;
          }
          @media screen and (max-width: 480px) {
            font-size: 0.8125rem;
          }
          @media screen and (max-width: 375px) {
            font-size: 0.6875rem;
          }
        }
      }

      .radio-btn {
        width: 18px;
        height: 18px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        transform: translateY(2px);
        transition: all ease 0.2s;
        flex-shrink: 0;
      }

      .radio_wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 20px;
        width: 100%;
        gap: 18px;

        input[type="radio"]:checked + label + .delivery_wrapper {
          display: flex;
        }
        input[type="radio"]:checked + label .radio-btn {
          border: 5px solid var(--accent-color);
        }
      }
    }

    .item {
      @include mixins.defaultInput;
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      gap: 8px;

      .item_name {
        @include mixins.mainText;
        font-size: 0.875rem;
        color: var(--dark-text);
      }

      .fetched_list {
        width: 100%;
        height: auto;
        max-height: 30dvh;
        overflow-y: auto;
        padding: 6px;
        position: absolute;
        background: var(--bg-color);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6);
        top: calc(100% + 6px);
        left: 0;
        z-index: 5;
        li {
          @include mixins.subtitleText;
          border-radius: 6px;
          color: var(--text-grey);
          transition: all ease 0.2s;
          font-size: 0.9375rem;
          font-weight: 500;
          padding: 8px 10px;
          cursor: pointer;
          @media screen and (min-width: 1024px) {
            &:hover {
              background: rgba(255, 169, 214, 0.08);
              color: white;
            }
          }
        }
      }
    }
    input {
      width: 100%;
      height: auto;
      background: rgba(255, 255, 255, 0.04) !important;
      border-radius: 8px !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      transition: border-color ease 0.25s;

      &:focus {
        border-color: var(--border-color) !important;
      }
    }

    .bottom_note {
      font-weight: 600;
      font-family: "Montserrat", sans-serif;
      transform: translateY(-50%);
      color: var(--error-border);
    }

    button {
      @include mixins.accentBtn;
      width: 100%;
      height: auto;
      padding-block: 14px;
    }
  }
}
</style>
