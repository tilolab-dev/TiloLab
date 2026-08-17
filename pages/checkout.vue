<template>
  <section class="checkout">
    <div v-if="loaderState" class="loader_wrapper">
      <SharedLoader />
    </div>
    <div class="container">
      <div class="checkout_content">
        <div class="checkout_content_delivery">
          <div class="user_info">
            <h1>Оформлення замовлення</h1>
            <div class="user_info_main">
              <div class="checkout_subtitle">Дані отримувача</div>
              <div class="main_input">
                <input
                  v-model="name"
                  type="text"
                  placeholder="Ім’я (Українською)"
                  @blur="checkCyrillicSymbols($event.target.value, 'Введіть імʼя Українською')"
                />
                <input
                  v-model="surname"
                  type="text"
                  placeholder="Прізвище (Українською)"
                  @blur="checkCyrillicSymbols($event.target.value, 'Введіть прізвище Українською')"
                />
                <input :value="phone" type="tel" @input="onPhoneInput" @keydown="onPhoneKeydown" />
                <input v-model="email" type="text" placeholder="Електронна пошта" />
                <input v-model="cityRef" type="text" placeholder="Місто" @input="getCitiesNp" />

                <ul v-if="fetchedCity.length > 0" class="fetched_list">
                  <li
                    v-for="(el, i) in fetchedCity"
                    :key="i"
                    @click="((cityRef = el.MainDescription), (fetchedCity = []), (cityId = el.Ref))"
                  >
                    {{ el.Present }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="user_info_delivery">
              <div class="checkout_subtitle">Доставка</div>
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
                    v-if="postAddressList?.length > 0 && postAddress?.length > 0"
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
                      {{ console.log(el, "el") }}
                      {{ el.Description }}
                    </li>
                  </ul>
                  <span>За тарифами перевізника</span>
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
                  <span>За тарифами перевізника</span>

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

                <input id="menu3" type="radio" name="accordeon" />
                <label v-if="cityRef === 'Київ'" for="menu3" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>Кур'єрська доставка (м. Київ)</span>
                </label>
                <div class="delivery_wrapper">
                  <input type="text" placeholder="Введіть адресу" />
                  <span>За тарифами перевізника</span>
                </div>
              </div>
            </div>
            <div class="user_info_payment">
              <div class="checkout_subtitle"><strong>Оплата</strong></div>
              <div class="radio_wrapper">
                <input
                  id="payment1"
                  v-model="paymentMethod"
                  type="radio"
                  name="payment"
                  value="monobank"
                />
                <label for="payment1" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>Онлайн на сайті</span>
                </label>
                <input
                  id="payment2"
                  v-model="paymentMethod"
                  type="radio"
                  name="payment"
                  value="cod"
                />
                <label for="payment2" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span
                    >Оплата при отриманні (200 грн. передплата)
                    <br />
                    сума товарів від 200грн
                  </span>
                </label>

                <input
                  id="payment3"
                  v-model="paymentMethod"
                  type="radio"
                  name="payment"
                  value="certificate"
                />
                <label for="payment3" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>У мене є сертифікат</span>
                </label>

                <div v-if="hasCertificate" class="certificate_wrapper">
                  <div class="input_wrapper">
                    <input
                      v-model="certificateCode"
                      type="text"
                      placeholder="Введіть код сертифікату"
                    />
                  </div>
                </div>

                <div class="input_wrapper">
                  <input
                    v-model="orderComment"
                    type="text"
                    placeholder="Коментар до замовлення (необов’язково)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="summary_notification">
            <strong>Зверніть увагу!</strong>

            <p v-if="!hasCertificate" class="delivery_description">
              — Замовлення з оплатою при отриманні відправляються за умови передплати 200 грн.<br />
              — У разі неотримання замовлення передплата не повертається.<br />
              — Сума передплати враховується у загальній вартості замовлення. При отриманні ви
              сплачуєте лише залишок суми.<br />
              — Для замовлень на суму понад 2000 грн діє безкоштовна доставка.<br />
            </p>
            <p v-else class="delivery_description">
              — Сертифікат можна використати лише один раз, після використання сертифікат стає
              недійсним а залишок не повертається .<br />
              — Якщо сума товарів у кошику перевищує номінал сертифікату, ви можете доплатити
              різницю або обрати товари на суму еквівалентну номіналу подарункового сертифікату..<br />
              — За допомогою сертифікату Ви можете придбати тільки товари, які є в наявності на
              сайті. Сертифікат не можна придбати інший сертифікат.<br />
            </p>
          </div>

          <div class="summary_info">
            <div class="checkout_subtitle"><strong>Разом</strong></div>
            <ul>
              <li>
                <div class="list_option">Товарів на суму:</div>
                <div class="list_value">
                  <span v-if="isMounted"> {{ cartStore.totalPrice }} грн </span>
                  <span v-else> 0 грн </span>
                </div>
              </li>
              <li>
                <div class="list_option">Доставка:</div>
                <div class="list_value">
                  Вартість доставки за тарифами перевізника (оплачується окремо) <br />
                </div>
              </li>
            </ul>
          </div>
          <ClientOnly>
            <div class="payment_block">
              <div class="payment_info">
                <div class="payment_option">До сплати:</div>

                <div class="payment_option">
                  <span> {{ totalDeliveryPrice ?? 0 }} грн </span>
                </div>
              </div>
              <button v-if="cartStore.cart.length > 0" @click="confirmOrderHandler">
                Замовлення підтверджую
              </button>
              <NuxtLink v-else to="/products?page=2&category" @click="confirmOrderHandler"
                >Перейти в каталог</NuxtLink
              >
            </div>
          </ClientOnly>
        </div>
        <div class="checkout_content_cart">
          <ClientOnly>
            <div class="cart_wrapper">
              <h2>Ваш кошик</h2>
              <div v-if="!cartStore.cart || cartStore.cart.length === 0" class="empty_cart">
                <div>Кошик порожній</div>
                <NuxtLink to="/products?page=2&category">Перейти до товарів</NuxtLink>
              </div>

              <ul class="cart_items">
                <li
                  v-for="item in cartStore.cart"
                  :key="item.product.id + '-' + item.optionId"
                  class="cart_item"
                >
                  <div class="cart_item_main">
                    <NuxtLink
                      v-if="item.product?.categoryId && item.product?.id"
                      :to="`/products/${item.product.categoryId}/${item.product.id}`"
                      class="details"
                    >
                      <NuxtImg
                        :src="item?.product?.img[0]?.path"
                        alt="preview"
                        placeholder="/images/fallback-img.webp"
                        error="/images/fallback-img.webp"
                        width="80"
                        height="80"
                      />
                    </NuxtLink>
                    <div v-else class="details">
                      <NuxtImg
                        :src="item?.product?.img[0]?.path"
                        alt="preview"
                        placeholder="/images/fallback-img.webp"
                        error="/images/fallback-img.webp"
                        width="80"
                        height="80"
                      />
                    </div>

                    <div class="main_wrapper">
                      <NuxtLink
                        v-if="item.product?.categoryId && item.product?.id"
                        :to="`/products/${item.product.categoryId}/${item.product.id}`"
                        class="details"
                      >
                        {{ item.title }}
                      </NuxtLink>
                      <span v-else class="details">
                        {{ item.title }}
                      </span>
                      <span class="mobile_price"> {{ item.productPrice }} грн</span>
                    </div>
                  </div>
                  <div class="cart_item_values">
                    <span class="price">{{ item.productPrice }} грн</span>
                    <div class="quantity_btn">
                      <button @click="counterHandler.decrement(item)">
                        <MinusIcon />
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button @click="counterHandler.increment(item)">
                        <PlusIcon />
                      </button>
                    </div>
                    <button
                      class="close_btn"
                      @click="cartStore.removeProduct(item.product.id, item.optionId)"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </li>
              </ul>

              <div class="cart_summary">
                <span>Всього:</span>

                <span> {{ cartStore.totalPrice ?? 0 }} грн </span>
              </div>
              <button class="test_data_btn" @click="fillTestDataHandler">FILL TEST DATA</button>
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
    <Tooltips v-if="showTooltip" :tooltip-status="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips>
  </section>
</template>

<script setup>
import { useSeoMeta } from "#imports";
useSeoMeta({
  title: "Оформлення замовлення - Tilo Lab",
  description:
    "Оформіть замовлення інтимних товарів в Tilo Lab. Безпечна оплата, анонімна доставка Новою Поштою по всій Україні. Швидке оформлення та гарантія конфіденційності.",
  ogTitle: "Оформлення замовлення - Tilo Lab",
  ogDescription: "Безпечна оплата та анонімна доставка інтимних товарів по Україні.",
  ogImage: "https://tilolab.com.ua/images/about-main.webp",
  robots: "noindex, nofollow"
});
import { ref, watch, onMounted, computed } from "vue";
//
import CloseIcon from "~/assets/icons/close-icon.svg";
import MinusIcon from "~/assets/icons/minus-icon.svg";
import PlusIcon from "~/assets/icons/plus-icon.svg";
import { counterHandler } from "@/composables/counterHandler";

import Tooltips from "@/components/shared/Tooltips.vue";
import { useUserStore } from "@/store/user-store";
import { useCartStore } from "@/store/cart-store";
import { useModalStore } from "@/store/modal-store";

const modalStore = useModalStore();

const userStore = useUserStore();

const loggedInUser = userStore.isLoggedIn;

const cityRef = ref("");
const fetchedCity = ref([]);
const cityId = ref("");
const postAddressId = ref("");
const postomatId = ref("");
const categoryOfWarehouse = ref("");

const isMounted = ref(false);

const name = ref(loggedInUser ? userStore.user?.username : "");
const surname = ref(loggedInUser ? userStore.user?.userSurname : "");
const phone = ref(loggedInUser ? userStore.user?.phoneNumber : "+38 (0");
const email = ref(loggedInUser ? userStore.user?.email : "");
const deliveryMethod = ref("nova-post");
const selectedDelivery = ref("");

const deliveryAddressState = ref(false);
const courierDeliveryState = ref(false);

const deliveryPrice = ref(0);
const paymentMethod = ref("monobank");

const totalDeliveryPrice = computed(() => deliveryPrice.value + cartStore.totalPrice);

let timerId = null;

// const date = new Date();
// const day = date.getDate();
// const month = date.getMonth();
// const year = date.getFullYear();
// const hours = date.getHours();
// const openHour = 9;
// const closeHour = 18;

// const getFormattedHours = (h) => (h < 10 ? "0" + h : h);
// const getFormattedMonth = (m) => (m < 10 ? "0" + m : m);

const postomatNumber = ref("");
const postAddress = ref("");
const currierAddress = ref("");
const postomatList = ref([]);
const postAddressList = ref([]);
const preventReloadBox = ref(false);
const isDeleting = ref(false);

const orderComment = ref("");
const certificateCode = ref("");
const hasCertificate = computed(() => paymentMethod.value === "certificate");

const cartStore = useCartStore();

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

const loaderState = ref(false);

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 3000);
};

const checkCyrillicSymbols = (value, message) => {
  const nameRegex = /^[а-яіїєґёА-ЯІЇЄҐЁ\s'-]+$/;

  if (!nameRegex.test(value)) {
    tooltip({ status: "warning", message: message });
  }

  return nameRegex.test(value);
};

const fillTestDataHandler = () => {
  name.value = "Іван";
  surname.value = "Іванович";
  phone.value = "+380 (93) 000-00-00";
  email.value = "fBnGK@example.com";
  cityRef.value = "Харків";
  postAddress.value = "Відділення №3: вул. Тюрінська (ран. Якіра), 124";
  postAddressId.value = "7b422fbb-e1b8-11e3-8c4a-0050568002cf";
  categoryOfWarehouse.value = "Branch";
};

const validateForm = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validOperators = /^\+380(39|67|68|96|97|98|50|66|95|75|99|63|73|93)\d{7}$/;

  // KYIVSTAR 039, 067, 068, 096, 097, 098
  // VODAFONE 050, 066, 095, 099
  // LIFECELL 063, 073, 093

  let userNumber = "";

  const formatPhoneNumber = (phoneNumber) => {
    const formatted = phoneNumber
      .replaceAll("-", "")
      .replaceAll(" ", "")
      .replace("(", "")
      .replace(")", "");
    userNumber = formatted;
    return formatted;
  };

  const formattedPhone = formatPhoneNumber(phone.value);

  const checkPhoneNumberUa = userNumber.slice(0, 4) === "+380";

  if (!name.value) {
    tooltip({ status: "warning", message: "Введіть Імʼя" });
    return false;
  }
  if (!checkCyrillicSymbols(name.value, "Введіть імʼя Українською")) {
    return false;
  }
  if (!surname.value) {
    tooltip({ status: "warning", message: "Введіть Фамілію" });
    return false;
  }
  if (!checkCyrillicSymbols(surname.value, "Введіть прізвище Українською")) {
    return false;
  }

  if (userNumber.length < 13 || !checkPhoneNumberUa) {
    tooltip({ status: "warning", message: "Перевірте номер телефону" });
    return false;
  }

  if (!validOperators.test(userNumber)) {
    tooltip({ status: "warning", message: "Перевірте правильність номеру" });
    return false;
  }

  if (!emailRegex.test(email.value)) {
    tooltip({ status: "warning", message: "Перевірте правильність email" });
    return false;
  }

  if (!cityRef.value) {
    tooltip({ status: "warning", message: "Перевірте місто" });
    return false;
  }

  if (selectedDelivery.value === "branch" && !postAddress.value) {
    tooltip({ status: "warning", message: "Оберіть відділення" });
    return false;
  }

  if (selectedDelivery.value === "postomat" && !postomatNumber.value) {
    tooltip({ status: "warning", message: "Оберіть поштомат" });
    return false;
  }

  if (paymentMethod.value === "cod" && totalDeliveryPrice.value < 200) {
    tooltip({
      status: "warning",
      message: "При замовленні оплати при отриманні сумма товарів повинна бути не менше 200 грн"
    });
    return false;
  }

  if (hasCertificate.value && !certificateCode.value.trim()) {
    tooltip({ status: "warning", message: "Введіть код сертифіката" });
    return false;
  }

  return {
    success: true,
    formattedPhone,
    userNumber
  };
};

const createRecipient = async (formattedPhone) => {
  const getRecipientId = await $fetch("/api/np/create-counterparty", {
    method: "POST",
    body: {
      firstName: name.value.trim(),
      lastName: surname.value.trim(),
      phone: formattedPhone.trim()
    }
  });

  const recipientId = getRecipientId.data[0].Ref;

  const getRecipientContactId = await $fetch("/api/np/create-contact-person", {
    method: "POST",
    body: {
      firstName: name.value.trim(),
      lastName: surname.value.trim(),
      phone: formattedPhone.trim(),
      counterPartyId: recipientId
    }
  });

  const recipientContactId = getRecipientContactId.data[0].Ref;

  return {
    success: true,
    recipientId,
    recipientContactId
  };
};

const createOrder = async (userNumber, recipientId, recipientContactId) => {
  const getOrderItems = cartStore.cart.map((item) => {
    return {
      productId: item.product.id,
      optionId: item.optionId,
      quantity: item.quantity,
      price: item.productPrice,
      title: item.title
    };
  });

  const getOrderId = await $fetch("/api/orders/newOrder", {
    method: "POST",
    body: {
      userId: userStore.user?.id ?? null,
      name: name.value.trim(),
      surname: surname.value.trim(),
      // totalPrice: totalDeliveryPrice.value,
      paymentMethod: paymentMethod.value,
      orderItems: getOrderItems,
      email: email.value.trim(),
      phoneNumber: userNumber.trim(),
      promoCode: certificateCode.value.trim(),
      orderComment: orderComment.value.trim(),
      shippingInfo: {
        recipient: name.value.trim() + " " + surname.value.trim(),
        phoneNumber: phone.value.trim(),
        deliveryMethod: "nova poshta",
        postOffice: postAddress.value.trim(),
        postomat: postomatNumber.value.trim(),
        city: cityRef.value.trim(),
        country: "Ukraine",
        cityId: cityId.value.trim(),
        warehouseType: categoryOfWarehouse.value,
        postAddressId: postAddressId.value,
        postomatId: postomatId.value,
        recipientId: recipientId,
        recipientContactId: recipientContactId
      }
    }
  });

  if (getOrderId.statusCode !== 200) {
    tooltip({ status: "error", message: `${getOrderId.message}` });
    loaderState.value = false;
    return;
  }

  const orderId = getOrderId.data.id;
  const orderTotalPrice = getOrderId.data.totalPrice;

  return {
    success: true,
    orderId,
    orderTotalPrice
  };
};

const createPayment = async (orderId, orderTotalPrice) => {
  const createPayment = await $fetch("/api/monobank/create", {
    method: "POST",
    body: {
      orderId: orderId,
      amount: paymentMethod.value === "monobank" ? orderTotalPrice : 200
    }
  });

  if (createPayment.statusCode !== 200) {
    alert(`Щось пішло не так ${createPayment.statusMessage}`);
    loaderState.value = false;

    return;
  }

  const invoiceId = createPayment.invoiceId;
  const pageUrl = createPayment.pageUrl;

  return {
    success: true,
    invoiceId,
    pageUrl
  };
};

const proccessOrderByCertificate = async (orderId, certificateCode) => {
  try {
    const proccessOrder = await $fetch("/api/orders/complete-certificate", {
      method: "POST",
      body: {
        orderId,
        certificateCode
      }
    });

    if (proccessOrder.statusCode !== 200) {
      tooltip({ status: "error", message: `${proccessOrder.message}` });
      loaderState.value = false;
      return;
    }

    if (proccessOrder.status === 200) {
      setTimeout(() => {
        tooltip({ status: "success", message: "Сертифікат успішно застосовано" });
      }, 5500);
    }

    return proccessOrder;
  } catch (err) {
    console.log(err);
    tooltip({ status: "error", message: "Помилка застосування сертифіката" });
    return { success: false };
  }
};

const validateCertificate = async (orderTotalPrice) => {
  try {
    // GET CERTIFICATE
    const getCertificate = await $fetch("/api/certificates/get-certificate", {
      method: "POST",
      body: {
        certificateCode: certificateCode.value.trim()
      }
    });

    const receivedCertificate = getCertificate.data;

    // CHECKING REMAINING PAYMENT AMOUNT

    const isNeedToSurcharge = receivedCertificate.amount < orderTotalPrice;

    return {
      success: true,
      isNeedToSurcharge,
      certificate: receivedCertificate
    };
  } catch (err) {
    return {
      success: false,
      statusCode: err?.statusCode,
      message: err?.response?._data.data.message || "Щось пішло не так, спробуйте ще раз пізніше"
    };
  } finally {
    loaderState.value = false;
  }
};

const confirmOrderHandler = async () => {
  // const DEBUG_STOP = true;
  // CHECK CERTIFICATE FLOW

  // 1. BUY CERTIFICATE
  // 2. USE CERTIFICATE WITH SURCHARGE
  // 3. USE CERTIFICATE WITHOUT SURCHARGE

  let isCompleteOrderWithCertificate = false;

  if (!cartStore.cart.length) {
    tooltip({ status: "warning", message: "Кошик порожній" });
    return;
  }

  const hasCertificateCode = Boolean(certificateCode.value.trim());

  const isCertificateInCart = cartStore.cart.some((item) => {
    console.log("item.product.isCertificate", item.product);
    return item.product.isCertificate;
  });

  console.log("isCertificateInCart", isCertificateInCart, "hasCertificateCode", hasCertificateCode);

  if (hasCertificateCode && isCertificateInCart) {
    tooltip({
      status: "warning",
      message: "Дія існуючого сертифікату не розповсюджується на придбання іншого сертифікату."
    });
    return;
  }

  const isFormValid = await validateForm();

  if (!isFormValid.success) {
    return;
  }

  const { formattedPhone, userNumber } = isFormValid;

  loaderState.value = true;

  const { recipientId, recipientContactId } = await createRecipient(formattedPhone);

  // if (DEBUG_STOP) {
  //   return;
  // }

  try {
    // CREATE ORDER
    const { orderId, orderTotalPrice } = await createOrder(
      userNumber,
      recipientId,
      recipientContactId
    );

    // IS CERTIFICATE VALIDATION

    let receivedCode;

    if (hasCertificateCode) {
      const res = await validateCertificate(orderTotalPrice, orderId);

      // console.log(res, "res from validate certificate");

      if (!res.success) {
        tooltip({ status: "warning", message: res.message });
        loaderState.value = false;
        return;
      }

      if (res) {
        receivedCode = res.certificate.code;
      }

      if (res.isNeedToSurcharge) {
        console.log("RETURN TO BE SURCHARGED");
        modalStore.showModal("SurchargeCertificate", { orderId, receivedCode });
        return;
      } else {
        isCompleteOrderWithCertificate = true;
      }
    }

    if (isCompleteOrderWithCertificate) {
      const proccessOrder = await proccessOrderByCertificate(orderId, receivedCode);
      // console.log(proccessOrder, "ORDER CLOSED WITH CERTIFICATE");

      if (proccessOrder.statusCode !== 200) {
        tooltip({ status: "error", message: `${proccessOrder.message}` });
        loaderState.value = false;
        return;
      } else if (proccessOrder.statusCode === 200) {
        // NNED TO UPDATE SETTIMEOUT - DONT SHOWING TOOLTIP
        setTimeout(() => {
          tooltip({ status: "success", message: "Сертифікат успішно застосовано" });
        }, 5500);

        cartStore.clearCart();

        // PRODUCTION ENVIRONMENT
        // window.location.href = `https://www.tilolab.com.ua/summary/${proccessOrder.order.id}`;

        // DEVELOPMENT ENVIRONMENT
        window.location.href = `https://dev.tilolab.com.ua//summary/${proccessOrder.order.id}`;

        // TEST ENVIRONMENT
        // window.location.href = `https://6d11-178-151-189-47.ngrok-free.app/summary/${proccessOrder.order.id}`;
      }

      return;
    } else {
      // if (DEBUG_STOP) {
      //   return;
      // }

      // CREATE PAYMENT
      const getPageUrl = await createPayment(orderId, orderTotalPrice);

      console.log(getPageUrl, "getPageUrl");

      cartStore.clearCart();

      // setTimeout(() => {
      //   tooltip({ status: "success", message: "Замовлення створене! Оплатіть будь ласка товар! " });
      // }, 5000);

      window.location.href = getPageUrl.pageUrl;
    }
    loaderState.value = false;
  } catch (err) {
    console.log(err);
    return;
  } finally {
    loaderState.value = false;
  }
};

const onPhoneKeydown = (e) => {
  isDeleting.value = e.key === "Backspace" || e.key === "Delete";
};
const onPhoneInput = (e) => {
  let value = e.target.value;
  let digits = value.replace(/\D/g, "");

  if (isDeleting.value && digits.length <= 3) {
    phone.value = "+38 (0";
    e.target.value = phone.value;
    return;
  }
  const formatted = formatFromDigits(digits);
  phone.value = formatted;
  e.target.value = formatted;
};

const formatFromDigits = (digits) => {
  digits = digits.slice(0, 12);

  let result = "+38";

  if (digits.length > 2) {
    result += " (" + digits.slice(2, 5);
  }

  if (digits.length >= 5) {
    result += ") " + digits.slice(5, 8);
  }

  if (digits.length >= 8) {
    result += "-" + digits.slice(8, 10);
  }

  if (digits.length >= 10) {
    result += "-" + digits.slice(10, 12);
  }

  if (result.length === 17 && isDeleting.value) {
    result = result.slice(0, -1);
  }
  if (result.length === 14 && isDeleting.value) {
    result = result.slice(0, -1);
  }
  if (result.length === 10 && isDeleting.value) {
    result = result.slice(0, -1);
  }
  if (result.length === 9 && isDeleting.value) {
    result = result.replace(")", "");
  }

  return result;
};

onMounted(() => {
  isMounted.value = true;

  setTimeout(() => {
    modalStore.showModal("SurchargeCertificate");
  }, 5000);

  // if (authStore.user) {
  //   name.value = authStore.user.username;
  //   surname.value = authStore.user.userSurname;
  //   familyName.value = authStore.user.userFamily;
  //   phone.value = authStore.user.phoneNumber;
  //   email.value = authStore.user.email;
  //   contactInfoState.value = false;
  // } else {
  //   contactInfoState.value = true;
  // }
  // checkout.value.totalProducts = cartStore.totalPrice;
  // checkout.value.totalPrice =
  //   cartStore.totalPrice > 2000 ? cartStore.totalPrice : cartStore.totalPrice + 200;
});

// const deliveryTime = computed(() => {
//   const pickupTime = hours + 2;

//   if (pickupTime >= openHour && pickupTime < closeHour) {
//     return `Сьогодні з ${getFormattedHours(pickupTime)}`;
//   } else {
//     return `Завтра з ${getFormattedHours(openHour)}`;
//   }
// });

watch(deliveryMethod, () => {
  if (deliveryMethod.value === "courier-delivery" || deliveryMethod.value === "express") {
    deliveryAddressState.value = true;
  } else {
    deliveryAddressState.value = false;
  }

  deliveryMethod.value === "courier-delivery"
    ? (courierDeliveryState.value = true)
    : (courierDeliveryState.value = false);
});

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

// refresh input fields

watch(selectedDelivery, () => {
  if (selectedDelivery.value === "branch") {
    postomatNumber.value = "";
    currierAddress.value = "";
    postomatList.value = [];
    preventReloadBox.value = false;
  } else if (selectedDelivery.value === "postomat") {
    currierAddress.value = "";
    postAddress.value = "";
    postAddressList.value = [];
    preventReloadBox.value = false;
  } else if (selectedDelivery.value === "courier") {
    postomatNumber.value = "";
    postAddress.value = "";
    postAddressList.value = [];
    postomatList.value = [];
    preventReloadBox.value = false;
  }
});

// const novaPost = new NovaPoshtaApi();

const getCitiesNp = debounce(cityRef.value, async () => {
  const npCities = await $fetch("/api/np/cities", {
    method: "POST",
    body: {
      city: cityRef.value
    }
  });

  if (!npCities.data || !npCities.data[0].Addresses) {
    return;
  } else {
    fetchedCity.value = npCities.data[0].Addresses;
  }
});

const getPostomatsNp = debounce(postomatNumber.value, async () => {
  if (!cityRef.value) {
    tooltip({ status: "warning", message: "Введіть місто" });
    postomatNumber.value = "";
    return;
  }

  const getPostomatsByNumber = await $fetch("/api/np/postomatNumber", {
    method: "POST",
    body: {
      cityName: cityRef.value,
      postomatNumber: postomatNumber.value
    }
  });
  postomatList.value = getPostomatsByNumber.data;
  return;
});

const getPostOfficeNp = debounce(postAddress.value, async () => {
  if (!cityRef.value) {
    tooltip({ status: "warning", message: "Введіть місто" });
    postAddress.value = "";
    return;
  }
  if (!postAddress.value.length) return;
  const getOfficeByNumber = await $fetch("/api/np/postOffice", {
    method: "POST",
    body: {
      cityName: cityRef.value,
      postNumber: postAddress.value
    }
  });

  const filteredOffice = getOfficeByNumber?.data?.filter(
    (item) => item.CategoryOfWarehouse === "Branch"
  );

  postAddressList.value = filteredOffice;
});

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" }]
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;
.checkout {
  color: var(--text-color);
  @include mixins.pageSpacing;

  .loader_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    backdrop-filter: blur(10px);
    overflow: hidden;
    z-index: 100;
    top: 0;
    left: 0;
  }

  .checkout_subtitle {
    @include mixins.subtitleText;
    padding-bottom: 24px;
    @media screen and (max-width: 1024px) {
      padding-bottom: 20px;
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 768px) {
      padding-bottom: 18px;
    }
    @media screen and (max-width: 480px) {
      padding-bottom: 16px;
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      padding-bottom: 12px;
      font-size: 0.8125rem;
    }
  }
}

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
.checkout_content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  h1,
  h2 {
    @include mixins.subtitleText;
    text-transform: uppercase;
    font-size: 1.125rem;
  }
  h1 {
    @media screen and (max-width: 1024px) {
      margin-bottom: 8px;
    }
  }
  &_delivery {
    flex: 1;
    padding-right: 107px;
    max-width: 50%;

    @media screen and (max-width: 1024px) {
      padding-right: 0;
    }

    @media screen and (max-width: 768px) {
      max-width: unset;
      width: 100%;
    }
  }

  &_cart {
    flex: 1;
    width: 100%;
    height: -webkit-fill-available;
  }

  input[type="radio"] {
    display: none;
  }

  .radio-elem {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    gap: 8px;
  }

  .radio-elem span {
    @include mixins.mainText;
    font-size: 1rem;
    @media screen and (max-width: 768px) {
      font-size: 0.9375rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.8125rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.6875rem;
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
    @include mixins.defaultInput;

    span {
      @include mixins.mainText;
      font-size: 1rem;
      @media screen and (max-width: 1024px) {
        font-size: 0.9375rem;
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
    transform: translateY(3px);
  }

  .user_info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    position: relative;
    gap: 40px;

    &_main {
      width: 100%;
      height: auto;
    }
    &_delivery {
      width: 100%;
      height: 100%;
      position: relative;
    }
    &_payment {
      width: 100%;
      height: auto;
    }
    &_payment .input_wrapper {
      @include mixins.defaultInput;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-top: 6px;
      margin-bottom: 0;
      width: 100%;
      height: auto;
      gap: 20px;
    }

    @media screen and (max-width: 1024px) {
      gap: 32px;
    }
    @media screen and (max-width: 480px) {
      gap: 28px;
    }
    @media screen and (max-width: 375px) {
      gap: 20px;
    }
  }

  .main_input {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    gap: 16px;
    @include mixins.defaultInput;
    @media screen and (max-width: 375px) {
      gap: 12px;
    }
  }
  .radio_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 18px;

    input[type="radio"]:checked + label + .delivery_wrapper {
      display: flex;
    }
    input[type="radio"]:checked + label .radio-btn {
      border: 5px solid var(--accent-color);
    }

    .certificate_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: auto;
      gap: 16px;

      @media screen and (max-width: 375px) {
        gap: 12px;
      }
    }
  }

  .summary_info {
    margin-top: 52px;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      gap: 24px;

      @media screen and (max-width: 480px) {
        padding-bottom: 20px;
      }

      @media screen and (max-width: 375px) {
        gap: 20px;
        padding-bottom: 16px;
      }
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      gap: 40px;
      @media screen and (max-width: 375px) {
        gap: 30px;
      }
    }
    .list_option,
    .list_value,
    p {
      @include mixins.mainText;
      color: var(--text-grey);
    }
    .list_value {
      text-align: end;
      color: var(--text-color);
    }

    @media screen and (max-width: 1024px) {
      margin-top: 44px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 32px;
    }
    @media screen and (max-width: 375px) {
      margin-top: 28px;
    }
  }

  .summary_notification {
    @include mixins.mainText;
    background: rgba(255, 255, 255, 0.02);
    border-left: 1px solid var(--accent-color);
    padding: 16px;
    font-weight: 400;
    font-size: 1rem;
    margin-top: 52px;

    .delivery_description {
      padding-top: 20px;
    }

    strong {
      @include mixins.subtitleText;
      padding-bottom: 24px;
      @media screen and (max-width: 1024px) {
        padding-bottom: 20px;
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 768px) {
        padding-bottom: 18px;
      }
      @media screen and (max-width: 480px) {
        padding-bottom: 16px;
        font-size: 0.875rem;
      }
      @media screen and (max-width: 375px) {
        padding-bottom: 12px;
        font-size: 0.8125rem;
      }
    }

    @media screen and (max-width: 1024px) {
      margin-top: 44px;
    }
    @media screen and (max-width: 480px) {
      margin-top: 32px;
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      margin-top: 28px;
      font-size: 0.75rem;
    }
  }

  .payment_block {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: auto;
    gap: 24px;
    .payment_info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      height: auto;
      @include mixins.mainText;
    }
    button,
    a {
      @include mixins.accentBtn;
      text-align: center;
      cursor: pointer;
      width: 100%;
    }

    @media screen and (max-width: 480px) {
      margin-top: 20px;
    }
    @media screen and (max-width: 375px) {
      margin-top: 16px;
    }
  }

  @media screen and (max-width: 1024px) {
    gap: clamp(10px, 2vw, 40px);
  }

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    max-width: 80%;
    gap: 44px;
  }

  @media screen and (max-width: 550px) {
    max-width: 90%;
    gap: 42px;
  }

  @media screen and (max-width: 480px) {
    gap: 40px;
    max-width: unset;
  }
  @media screen and (max-width: 375px) {
    gap: 36px;
  }
}

.cart_wrapper {
  position: sticky;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  top: 85px;

  @media screen and (max-width: 1024px) {
    gap: 32px;
  }
  @media screen and (max-width: 768px) {
    gap: 40px;
  }
  @media screen and (max-width: 480px) {
    gap: 32px;
  }
  @media screen and (max-width: 375px) {
    gap: 28px;
  }
}

.empty_cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;

  a {
    padding: 10px 20px;
    background: var(--btn-color);
    border: 1px solid var(--border-color);
    transition: all ease 0.3s;
    border-radius: 10px;

    @media screen and (min-width: 1024px) {
      &:hover {
        background: var(--btn-color-hover);
        transition: all ease 0.3s;
      }
    }
    &:active {
      background: var(--btn-color-active);
      transition: all ease 0.3s;
    }
  }
}

.cart_summary {
  @include mixins.subtitleText;
  text-transform: uppercase;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--accent-grey);
  padding-top: 25px;
}

.test_data_btn {
  width: 100%;
  height: auto;
  cursor: pointer;
  @include mixins.accentBtn;
}

.checkout {
  .cart_items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: fit-content;
    gap: 28px;
    @media screen and (max-width: 768px) {
      gap: 40px;
    }
    @media screen and (max-width: 480px) {
      gap: 32px;
    }
    @media screen and (max-width: 375px) {
      gap: 28px;
    }
  }

  .cart_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    height: auto;
    gap: 50px;

    &_main {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 9px;
      img {
        width: 90px;
        height: 90px;
        aspect-ratio: 1 / 1;
        @media screen and (max-width: 1024px) {
          width: 84px;
          height: 84px;
        }
      }
      p {
        @include mixins.mainText;
        font-size: 1rem;
        color: var(--text-color);
        @media screen and (max-width: 480px) {
          font-size: 0.875rem;
        }
      }

      .main_wrapper {
        flex: 1;
        @media screen and (max-width: 1024px) {
          height: -webkit-fill-available;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-height: 80px;
          align-items: flex-start;
        }
      }
      .mobile_price {
        display: none;
        @include mixins.mainText;
        font-size: 0.9375rem;
        @media screen and (max-width: 1024px) {
          display: block;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.8125rem;
        }
      }
    }

    &_values {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;
      gap: 40px;
      span {
        @include mixins.mainText;
        white-space: nowrap;
      }
      .price {
        @media screen and (max-width: 1024px) {
          display: none;
        }
      }
      @media screen and (max-width: 1024px) {
        width: 100%;
      }
    }

    @media screen and (max-width: 1024px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 12px;
    }
  }

  .quantity_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 17px;
    button {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--accent-color);
      aspect-ratio: 1 / 1;
      svg {
        stroke: black;
        padding: 4px;
        width: 100%;
        height: 100%;
      }
      span {
        @include mixins.mainText;
        font-size: 0.875rem;
      }
    }
  }

  .close_btn {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .close_btn svg {
    width: 11px;
    height: 11px;
    stroke: white;
  }
}
</style>
