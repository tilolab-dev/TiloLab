<template>
  <div class="order_detail_content">
    <div v-if="loaderState" class="loader_content">
      <SharedLoader />
    </div>
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
          :style="activeTab === 'order-info' ? 'border-bottom: 1px solid var(--accent-color)' : ''"
          class="section"
          @click="activeTab = 'order-info'"
        >
          Інформація про замовлення
        </button>
        <button
          :style="activeTab === 'create-ttn' ? 'border-bottom: 1px solid var(--accent-color)' : ''"
          class="section"
          @click="activeTab = 'create-ttn'"
        >
          Сформувати ТТН
        </button>
        <button
          :style="
            activeTab === 'create-sender' ? 'border-bottom: 1px solid var(--accent-color)' : ''
          "
          class="section"
          @click="activeTab = 'create-sender'"
        >
          Створити відправника
        </button>
      </div>

      <div v-if="activeTab === 'order-info'" class="order_detail_main_info">
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
          <p>{{ modalProps.order.status }}</p>
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

        <div class="items_info">
          <strong>Товари:</strong>
          <ul class="items_info_wrapper">
            <li
              v-for="item in modalProps.order.orderItems"
              :key="item.id"
              class="items_info_product"
            >
              <div class="product_main">
                <img :src="item.product.img[0].path" alt="product" width="50" height="50" />
                <p>{{ item.product.translations[0].title }}</p>
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
            </li>
          </ul>
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
                  <!-- {{ console.log(el) }} -->
                  {{ el.Present }}
                </li>
              </ul>
            </div>
            <div class="item">
              <div class="item_name">Відділення Нової пошти:</div>
              <!-- <input type="text" placeholder="Виберіть номер відділення" /> -->

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
            </div>
            <!-- <div class="item">
            <div class="item_name">Поштомат (не обовязково):</div>
            <input type="text" placeholder="Виберіть номер поштомату" />
          </div> -->
          </div>
          <!-- <span class="bottom_note">
          Обовʼязково потрібно вибрати номер відділення чи номер поштомату
        </span> -->
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

const modalStore = useModalStore();
const orderStore = useOrdersStore();
const loaderState = ref(false);
const selectValue = ref();
const activeTab = ref("order-info");
// const isDeleting = ref(false);

// TTN

const senderList = ref([]);
const selectedSenderId = ref("");

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

let timerId = null;

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
    name: "Новий"
  },
  {
    id: 2,
    value: "PAID",
    name: "Оплачений"
  },
  {
    id: 3,
    value: "PROCESSING",
    name: "В обробці"
  },
  {
    id: 4,
    value: "SHIPPED",
    name: "Відправлений"
  },
  {
    id: 5,
    value: "DELIVERED",
    name: "Доставлено"
  },
  {
    id: 6,
    value: "RETURNED",
    name: "Повернений"
  },
  {
    id: 7,
    value: "CANCELED",
    name: "Скасований"
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
    console.log(createSenderRes, "createSenderRes");
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
  // console.log(order);

  const sender = senderList.value.find((el) => el.id === selectedSenderId.value);

  if (!sender) {
    alert("Оберіть відправника, чи створіть нового");
    return;
  }

  const order = modalProps.order;
  console.log(sender, "sender");
  console.log(modalProps.order, "order");

  const [recipientFirstName, recipientLastName] = order.shippingInfo.recipient.split(" ");

  console.log(recipientFirstName, "recipientFirstName");
  console.log(recipientLastName, "recipientLastName");

  const formattedRecipientPhone = order.shippingInfo.phoneNumber
    .replaceAll(" ", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "");

  try {
    const getTtnRes = await $fetch("/api/np/create-ttn", {
      method: "POST",
      body: {
        orderId: order.orderNumber,

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
      }
    });

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
  console.log(modalProps.order);
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.order_detail_content {
  position: absolute;
  top: 20%;
  transform: translateY(-50%);
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  min-width: 50vw;
  max-height: 65vh;
  border-radius: 10px;
  // height: fit-content;
  position: relative;
  overflow: hidden;
  // overflow-y: scroll;
  .loader_content {
    // width: 100%;
    // height: 100%;
    inset: 0;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgba(0, 0, 0, 0.35);
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

.order_detail_wrapper {
  // padding-block: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  flex: 1;

  .order_detail_top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid var(--accent-grey);
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
    padding-right: 10px;
    button {
      width: 15px;
      height: 15px;
      background: transparent;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 100%;
        height: 100%;
        stroke: var(--text-grey);
        transition: all ease 0.3s;
      }
      @media screen and (min-width: 1024px) {
        &:hover {
          svg {
            transition: all ease 0.3s;
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
    border-bottom: 1px solid var(--accent-grey);
    padding-block: 10px;
    width: 100%;
    height: auto;
    .section {
      flex: 1;
      width: 100%;
      height: auto;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid transparent;
      padding-bottom: 10px;
      transition: all ease 0.3s;
    }
  }

  .order_status {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--accent-grey);

    h3 {
      @include mixins.subtitleText;
      font-size: 1.1rem;
    }
  }

  .order_info_main {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: auto;
    padding-inline: 20px;
    padding-block: 10px;
    border-bottom: 1px solid var(--accent-grey);
    gap: 20px;
    .block_description {
      @include mixins.subtitleText;
      font-size: 1.1rem;
    }

    .client_main,
    .shipping_info_wrapper {
      strong {
        @include mixins.mainText;
        font-size: 1rem;
      }
      p {
        @include mixins.mainText;
        font-size: 1rem;
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
      }

      &_main {
        width: 100%;
        height: auto;
      }
    }

    .shipping_info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 20px;
      flex: 1;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    @media screen and (max-width: 550px) {
      flex-direction: column;
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

  .order_detail_ttn_info {
    .select_sender {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;

      select {
        width: 90%;
        height: 50px;
        background: black;
        border-radius: 5px;
        padding: 5px 10px;
        outline: var(--accent-red);
        margin: 0 auto;
        color: white;
      }
    }
  }

  .order_detail_main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px 10px;
    border-bottom: 1px solid var(--accent-grey);

    .info,
    .total_price {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 10px;
      @include mixins.subtitleText;
      font-size: 1.1rem;
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
    gap: 20px;
    padding-block: 20px;
    border-bottom: 1px solid var(--accent-grey);

    strong {
      @include mixins.subtitleText;
      font-size: 1.1rem;
    }

    &_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: auto;
      gap: 5px;
    }

    &_product {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 5px 10px;
      align-items: center;
      width: 100%;
      height: auto;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.1);
      .product_main {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 15px;
      }

      .product_summ {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
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
    gap: 20px;
    padding-block: 20px;
    border-bottom: 1px solid var(--accent-grey);

    strong {
      @include mixins.subtitleText;
      font-size: 1.1rem;
    }

    select {
      background: var(--accent-grey);
      border: none;
      color: white;
      @include mixins.transparentBtn;
      width: 30%;
      outline: none;
      border: 1px solid var(--border-color);
      font-size: 0.8rem;
      padding: 10px 15px;
    }
  }

  .button_wrapper {
    display: flex;
    justify-content: center;
    padding-inline: 20px;
    padding-bottom: 15px;
    margin-top: 15px;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 10px;

    .accept_btn {
      background: var(--accent-grey);
      cursor: not-allowed;
      padding-block: 8px;
      border-radius: 3px;
    }

    .active_btn {
      background: var(--success-btn);
      border: 1px solid var(--success-border);
      cursor: pointer;
      transition: all ease 0.3s;

      @media screen and (min-width: 1024px) {
        &:hover {
          background: var(--success-btn-hover);
          border: 1px solid var(--success-border);
          transition: all ease 0.3s;
        }
      }
    }

    .cancel_btn {
      border: 1px solid var(--dark-text);
      border-radius: 3px;
      padding-block: 8px;

      @media screen and (min-width: 1024px) {
        &:hover {
          background: var(--btn-color);
          border: 1px solid var(--border-color);
          transition: all ease 0.3s;
        }
      }
    }

    button {
      flex: 1;
      @include mixins.mainText;
      font-size: 1rem;
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
    gap: 50px;
    padding: 50px 20px 10px;

    button {
      @include mixins.accentBtn;
      padding: 5px 25px;
      font-size: 1rem;
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
    padding: 15px 20px;

    &_wrapper {
      width: 100%;
      height: auto;
      flex: 1;
      padding-bottom: 50px;
    }

    &_title {
      @include mixins.mainText;
    }

    .items_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-bottom: 70px;
      width: 80%;
      height: auto;
      gap: 10px;
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

      .fetched_list {
        width: 100%;
        height: auto;
        max-height: 30dvh;
        overflow-y: scroll;
        padding-bottom: 20px;
        position: absolute;
        background: var(--bg-color);
        top: 100%;
        left: 0;
        z-index: 1;
        li {
          @include mixins.subtitleText;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-grey);
          transition: all ease 0.3s;
          font-size: 1rem;
          padding-block: 5px;
          cursor: pointer;
          @media screen and (min-width: 1024px) {
            &:hover {
              background: rgba(255, 255, 255, 0.04);
              transition: all ease 0.3s;
              color: white;
            }
          }
        }
      }
    }
    input {
      width: 100%;
      height: auto;
      background: black;
      border-radius: 5px !important;
      border: 1px solid rgba(255, 255, 255, 0.2);
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
      padding-block: 5px;
    }
  }
}
</style>
