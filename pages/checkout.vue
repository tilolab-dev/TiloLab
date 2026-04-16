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
                <input id="payment1" type="radio" name="payment" checked />
                <label for="payment1" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>Онлайн на сайті</span>
                </label>
                <input id="payment2" type="radio" name="payment" />
                <label for="payment2" class="radio-elem">
                  <div class="radio-btn"></div>
                  <span>Оплата при отриманні</span>
                </label>

                <div class="input_wrapper">
                  <input v-model="orderPromoCode" type="text" placeholder="В мене є промокод" />
                  <input
                    v-model="orderComment"
                    type="text"
                    placeholder="Коментар до замовлення (необов’язково)"
                  />
                </div>
              </div>
            </div>
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
                  за тарифами перевізника (оплачується окремо) <br />
                  <span v-if="isMounted">
                    {{ deliveryPrice }}
                  </span>
                  <span v-else> 0 грн </span>
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
                      :to="`/products/${item.product.categoryId}/${item.product.id}`"
                      class="details"
                    >
                      <NuxtImg
                        :src="item?.product?.img[0]?.path"
                        alt="preview"
                        placeholder="/images/fallback-img.webp"
                        error="/images/fallback-img.webp"
                      />
                    </NuxtLink>

                    <div class="main_wrapper">
                      <NuxtLink
                        :to="`/products/${item.product.categoryId}/${item.product.id}`"
                        class="details"
                      >
                        {{ item.title }}
                      </NuxtLink>
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
  title: "Оплата",
  description:
    "Tilo Lab — це сучасний простір дослідження інтимного здоров’я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс.",
  ogTitle: "Оплата",
  ogDescription:
    "Tilo Lab — це сучасний простір дослідження інтимного здоров’я, задоволення та тілесної гармонії. Ми створили лабораторію, де інновації, наука та турбота про тіло поєднуються у відповідальний та делікатний сервіс.",
  ogImage: "https://tilolab.com.ua/images/about-main.webp"
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
// const paymentMethod = ref("");

// const contactInfoState = ref(false);
const deliveryAddressState = ref(false);
const courierDeliveryState = ref(false);

const deliveryPrice = ref(0);
// const saveDeliveryAddress = ref(false);

// const checkoutProducts = ref([]);

const totalDeliveryPrice = computed(() => deliveryPrice.value + cartStore.totalPrice);

// const checkout = ref({
//   totalProducts: 0,
//   discount: 0,
//   totalPrice: 0
// });

let timerId = null;

// const date = new Date();
// const day = date.getDate();
// const month = date.getMonth();
// const year = date.getFullYear();
// const hours = date.getHours();
// const openHour = 9;
// const closeHour = 18;

const postomatNumber = ref("");
const postAddress = ref("");
const currierAddress = ref("");
const postomatList = ref([]);
const postAddressList = ref([]);
const preventReloadBox = ref(false);
const isDeleting = ref(false);

const orderComment = ref("");
const orderPromoCode = ref("");

const cartStore = useCartStore();
// const authStore = useAuthStore();

// const getFormattedHours = (h) => (h < 10 ? "0" + h : h);
// const getFormattedMonth = (m) => (m < 10 ? "0" + m : m);

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

  // console.log(value, nameRegex.test(value), "test value");

  if (!nameRegex.test(value)) {
    tooltip({ status: "warning", message: message });
  }

  return nameRegex.test(value);
};

const confirmOrderHandler = async () => {
  if (!cartStore.cart.length) {
    tooltip({ status: "warning", message: "Кошик порожній" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  const checkPnoneNumberUa = userNumber.slice(0, 4) === "+380";

  if (!name.value) {
    tooltip({ status: "warning", message: "Введіть Імʼя" });
    return;
  }
  if (!checkCyrillicSymbols(name.value, "Введіть імʼя Українською")) {
    return;
  }
  if (!surname.value) {
    tooltip({ status: "warning", message: "Введіть Фамілію" });
    return;
  }
  if (!checkCyrillicSymbols(surname.value, "Введіть прізвище Українською")) {
    return;
  }

  if (userNumber.length < 13 || !checkPnoneNumberUa) {
    tooltip({ status: "warning", message: "Перевірте номер телефону" });
    return;
  }

  if (!emailRegex.test(email.value)) {
    tooltip({ status: "warning", message: "Перевірте правильність email" });
    return;
  }

  if (!cityRef.value) {
    tooltip({ status: "warning", message: "Перевірте місто" });
    return;
  }

  if (selectedDelivery.value === "branch" && !postAddress.value) {
    tooltip({ status: "warning", message: "Оберіть відділення" });
    return;
  }

  if (selectedDelivery.value === "postomat" && !postomatNumber.value) {
    tooltip({ status: "warning", message: "Оберіть поштомат" });
    return;
  }

  loaderState.value = true;

  const getOrderItems = cartStore.cart.map((item) => {
    return {
      productId: item.product.id,
      optionId: item.optionId,
      quantity: item.quantity,
      price: item.productPrice,
      title: item.title
    };
  });

  const getRecipientId = await $fetch("/api/np/create-counterparty", {
    method: "POST",
    body: {
      firstName: name.value,
      lastName: surname.value,
      phone: formattedPhone
    }
  });

  const recipientId = getRecipientId.data[0].Ref;

  const getRecipientContactId = await $fetch("/api/np/create-contact-person", {
    method: "POST",
    body: {
      firstName: name.value,
      lastName: surname.value,
      phone: formattedPhone,
      counterPartyId: recipientId
    }
  });

  const recipientContactId = getRecipientContactId.data[0].Ref;

  try {
    const getOrderId = await $fetch("/api/orders/newOrder", {
      method: "POST",
      body: {
        // userId: "", left after auth implementation
        // totalPrice: totalDeliveryPrice.value,
        paymentMethod: "monobank",
        orderItems: getOrderItems,
        email: email.value,
        phoneNumber: userNumber,
        promoCode: orderPromoCode.value,
        orderComment: orderComment.value,
        shippingInfo: {
          recipient: name.value + " " + surname.value,
          phoneNumber: phone.value,
          deliveryMethod: "nova poshta",
          postOffice: postAddress.value,
          postomat: postomatNumber.value,
          city: cityRef.value,
          country: "Ukraine",
          cityId: cityId.value,
          warehouseType: categoryOfWarehouse.value,
          postAddressId: postAddressId.value,
          postomatId: postomatId.value,
          recipientId: recipientId,
          recipientContactId: recipientContactId
        }
      }
    });

    // console.log(getOrderId, "GET_ORDER_ID");

    if (getOrderId.statusCode !== 200) {
      tooltip({ status: "error", message: `${getOrderId.message}` });
      loaderState.value = false;
      return;
    }

    const createPayment = await $fetch("/api/monobank/create", {
      method: "POST",
      body: {
        orderId: getOrderId.data.id,
        amount: getOrderId.data.totalPrice
      }
    });

    if (createPayment.statusCode !== 200) {
      alert(`Щось пішло не так ${createPayment.statusMessage}`);
      loaderState.value = false;

      return;
    }

    cartStore.clearCart();

    loaderState.value = false;

    setTimeout(() => {
      tooltip({ status: "success", message: "Замовлення створене! Оплатіть будь ласка товар! " });
    }, 5000);

    window.location.href = createPayment.pageUrl;
  } catch (err) {
    console.log(err);
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

// const toggleContactInfo = () => {
//   contactInfoState.value = !contactInfoState.value;
//   if (!contactInfoState.value) {
//     console.log(1);
//     name.value = authStore.user.username;
//     surname.value = authStore.user.userSurname;
//     familyName.value = authStore.user.userFamily;
//     phone.value = authStore.user.phoneNumber;
//   } else {
//     console.log(2);
//     name.value = "";
//     surname.value = "";
//     familyName.value = "";
//     phone.value = "";
//   }
// };

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
    align-items: center;
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
    .list_value {
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
