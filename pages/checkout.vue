<template>
  <section class="checkout">
    <div class="container">
      <div class="checkout_content">
        <div class="checkout_content_delivery">
          <div class="user_info">
            <h1>Оформлення замовлення</h1>
            <div class="user_info_main">
              <div class="checkout_subtitle">Дані отримувача</div>
              <div class="main_input">
                <input v-model="name" type="text" placeholder="Ім’я" />
                <input v-model="surname" type="text" placeholder="Прізвище" />
                <input v-model="phone" type="text" placeholder="Телефон" />
                <input v-model="email" type="text" placeholder="Електронна пошта" />
                <input v-model="cityRef" type="text" placeholder="Місто" @input="getCitiesNp" />
                <!-- :value="selectedCity !== null ? `${selectedCity.Present}` : ''" -->

                <ul v-if="fetchedCity.length > 0" class="fetched_list">
                  <li
                    v-for="(el, i) in fetchedCity"
                    :key="i"
                    @click="((cityRef = el.MainDescription), (fetchedCity = []))"
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
                      @click="((postAddress = el.Description), (postAddressList = []))"
                    >
                      {{ el.Description }}
                    </li>
                  </ul>
                  <span>За тарифами перевізника</span>
                </div>

                <!-- v-model="" -->

                <input id="menu2" type="radio" name="accordeon" />
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
                      @click="((postomatNumber = el.ShortAddress), (postomatList = []))"
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
                  <input type="text" placeholder="В мене є промокод" />
                  <input type="text" placeholder="Коментар до замовлення (необов’язково)" />
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

          <div class="payment_block">
            <div class="payment_info">
              <div class="payment_option">До сплати:</div>

              <div class="payment_option">
                <span v-if="isMounted"> {{ totalDeliveryPrice }} грн </span>
                <span v-else> 0 грн </span>
              </div>
            </div>
            <NuxtLink to="/summary">Замовлення підтверджую</NuxtLink>
          </div>
        </div>
        <div class="checkout_content_cart">
          <div class="cart_wrapper">
            <h2>Ваш кошик</h2>
            <ClientOnly>
              <ul class="cart_items">
                <li v-for="(item, i) in cartStore.cart" :key="i" class="cart_item">
                  <div class="cart_item_main">
                    <img :src="item.product.img[0].path" alt="preview" />
                    <div class="main_wrapper">
                      <p>{{ item.product.translations[0].title }}</p>
                      <span class="mobile_price"> {{ item.product.productPrice }} грн</span>
                    </div>
                  </div>
                  <div class="cart_item_values">
                    <span class="price">{{ item.product.productPrice }} грн</span>
                    <div class="quantity_btn">
                      <button>
                        <MinusIcon />
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button>
                        <PlusIcon />
                      </button>
                    </div>
                    <button class="close_btn">
                      <CloseIcon />
                    </button>
                  </div>
                </li>
              </ul>
            </ClientOnly>

            <div class="cart_summary">
              <span>Всього:</span>

              <span v-if="isMounted"> {{ cartStore.totalPrice }} грн </span>
              <span v-else> 0 грн </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import CloseIcon from "~/assets/icons/close-icon.svg";
import MinusIcon from "~/assets/icons/minus-icon.svg";
import PlusIcon from "~/assets/icons/plus-icon.svg";
// import { useCartStore, useAuthStore } from "#imports";
// import { Swiper, SwiperSlide } from "swiper/vue";

// import { navigateTo } from "nuxt/app";
// import ToggleBtn from "@/components/shared/ToggleBtn.vue";
// import Tooltips from "@/components/shared/Tooltips.vue";
// import DeliverySelector from "~/components/DeliverySelector.vue";
// import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";

const cityRef = ref("");
// const selectedCity = ref(null);
const fetchedCity = ref([]);
// const unknownCity = ref(false);

const isMounted = ref(false);

const name = ref("");
const surname = ref("");
const phone = ref("");
const email = ref("");
const deliveryMethod = ref("nova-post");
const selectedDelivery = ref("");
// const paymentMethod = ref("");

// const contactInfoState = ref(false);
const deliveryAddressState = ref(false);
const courierDeliveryState = ref(false);

const deliveryPrice = ref(100);
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

const cartStore = useCartStore();
// const authStore = useAuthStore();

// const getFormattedHours = (h) => (h < 10 ? "0" + h : h);
// const getFormattedMonth = (m) => (m < 10 ? "0" + m : m);

// const config = useRuntimeConfig();
// const NOVA_POST_KEY = config.public.novaPostKey;
// const NOVA_POST_URI = config.public.novaPostUri;

// const showTooltip = ref(false);
// const tooltipStatus = ref("");
// const tooltipMessage = ref("");

// const numReg = /^[0-9]+$/;

// const tooltip = (obj) => {
//   const { status, message } = obj;

//   tooltipStatus.value = status;
//   tooltipMessage.value = message;
//   showTooltip.value = true;
//   // setTimeout(() => {
//   //   showTooltip.value = false;
//   //   tooltipStatus.value = "";
//   //   tooltipMessage.value = "";
//   // }, 3000);
// };

// const clearForm = () => {
//   name.value = "";
//   surname.value = "";
//   familyName.value = "";
//   phone.value = "";
//   email.value = "";
//   postAddress.value = "";
//   postomatNumber.value = "";
//   currierAddress.value = "";
//   postomatList.value = [];
//   postAddressList.value = [];
//   cityName.value = "";
//   cityRef.value = "";
// };

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

// const processCheckout = async () => {
//   if (cartStore.totalPrice === 0) {
//     tooltip({
//       status: "error",
//       message: "Ваш кошик порожній"
//     });
//     return;
//   }

//   if (!authStore.user || contactInfoState.value) {
//     if (!name.value || !surname.value || !familyName.value || !email.value || !phone.value) {
//       tooltip({
//         status: "error",
//         message: "Всі поля повинні бути заповнені"
//       });
//       return;
//     }

//     if (!authStore.user) {
//       if (!email.value.includes("@")) {
//         tooltip({
//           status: "error",
//           message: "Введіть коректну електронну адресу"
//         });
//         return;
//       }

//       const phoneRegex = /^\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$/;

//       if (!phoneRegex.test(phone.value)) {
//         tooltip({
//           status: "error",
//           message: "Введіть коректний номер телефону"
//         });
//         return;
//       }
//     }
//   }

//   // delivery validation

//   if (deliveryMethod.value === "nova-post") {
//     if (cityName.value.trim().length === 0) {
//       tooltip({
//         status: "info",
//         message: "Введіть місто"
//       });
//       return;
//     }

//     if (
//       postAddress.value.trim().length === 0 &&
//       postomatNumber.value.trim().length === 0 &&
//       currierAddress.value.trim().length === 0
//     ) {
//       tooltip({
//         status: "info",
//         message: "Оберіть метод та введіть адресу доставки"
//       });
//       return;
//     }

//     // if (
//     //   postAddress.value.trim().length === 0 ||
//     //   (postomatNumber.value.trim().length === 0 && currierAddress.value.trim().length === 0)
//     // ) {
//     //   tooltip({
//     //     status: "info",
//     //     message: "Оберіть метод та введіть адресу доставки",
//     //   });
//     //   return;
//     // }
//   } else if (deliveryMethod.value === "ukrpost") {
//     console.log("ukrpost");
//   } else if (deliveryMethod.value === "courier-delivery") {
//     console.log("courier-delivery");
//   }

//   try {
//     const cartData = cartStore.cart.map((item) => {
//       return {
//         productId: item.id,
//         quantity: item.quantityProducts
//       };
//     });

//     const orderData = new FormData();

//     const orderBody = {
//       email: email.value,
//       orders: [
//         {
//           totalPrice: cartStore.totalPrice,
//           paymentMethod: paymentMethod.value,
//           shippingInfo: {
//             recipient: name.value + " " + surname.value + " " + familyName.value,
//             postCompany: deliveryMethod.value,
//             phoneNumber: phone.value,
//             postOffice: postAddress.value,
//             postomat: postomatNumber.value,
//             address: currierAddress.value,
//             city: cityName.value,
//             country: "Ukraine"
//           },
//           orderItems: [...cartData]
//         }
//       ]
//     };

//     orderData.append("data", JSON.stringify(orderBody));

//     const createNewOrder = await $fetch("api/orders", {
//       method: "POST",
//       body: orderData
//     });

//     console.log(createNewOrder, "createNewOrder");
//     if (createNewOrder.status === "error") {
//       console.log(createNewOrder.message);
//       return;
//     }

//     tooltip({
//       status: "success",
//       message: "Ваше замовлення було успішно створено"
//     });

//     const tgMessageBody = {
//       orderId: createNewOrder.data,
//       user: name.value + " " + surname.value + " " + familyName.value,
//       paymentMethod: paymentMethod.value,
//       amount: cartStore.totalPrice,
//       phone: phone.value,
//       email: email.value,
//       date: new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })
//     };

//     const tgData = new FormData();

//     tgData.append("data", JSON.stringify(tgMessageBody));

//     const notificationTg = await $fetch("/api/telegram?notification=newOrder", {
//       method: "POST",
//       body: tgData
//     });

//     console.log(notificationTg, "notificationTg");

//     clearForm();
//     setTimeout(() => {
//       navigateTo("/");
//     }, 3000);

//     cartStore.clearCart();
//   } catch (err) {
//     console.log(err);
//   }
// };

const debounce = (string, fn) => {
  return () => {
    clearTimeout(timerId);
    if (string === "") {
      console.log("string is empty");
      return fn();
    }
    timerId = setTimeout(() => {
      console.log("log debounce");
      fn();
    }, 700);
  };
};

// refresh input fields

watch(selectedDelivery, () => {
  console.log(selectedDelivery.value, "selectedDelivery");
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
    alert("Введіть місто");
    postomatNumber.value = "";
    return;
  }
  // if (state === "reload") {
  // const getPostomatsByNumber = await novaPost.fetchPostomatsByNumber(
  //   cityName.value,
  //   postomatNumber.value
  // );
  // console.log(getPostomatsByNumber, "getPostomatsByNumber");
  // postomatList.value = getPostomatsByNumber.data;
  // return;
  const getPostomatsByNumber = await $fetch("/api/np/postomatNumber", {
    method: "POST",
    body: {
      cityName: cityRef.value,
      postomatNumber: postomatNumber.value
    }
  });
  console.log(getPostomatsByNumber, "getPostomatsByNumber");
  postomatList.value = getPostomatsByNumber.data;
  return;
  // }

  // if (preventReloadBox.value) {
  //   return;
  // }

  // if (!cityRef.value) {
  //   // tooltip({
  //   //   status: "info",
  //   //   message: "Виберіть місто"
  //   // });
  //   alert("Виберіть місто");
  //   event.preventDefault();

  //   return;
  // }

  // const postomatsNp = await novaPost.fetchPostomats(cityName.value);
  // postomatList.value = postomatsNp.data;
});

const getPostOfficeNp = debounce(postAddress.value, async () => {
  if (!cityRef.value) {
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
      cityName: cityRef.value,
      postNumber: postAddress.value
    }
  });

  // console.log(getOfficeByNumber, "getPostomatsByNumber");
  const filteredOffice = getOfficeByNumber.data.filter(
    (item) => item.CategoryOfWarehouse === "Branch"
  );

  console.log(filteredOffice, "filtered office");
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

useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" }]
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.checkout {
  color: var(--text-color);
  @include mixins.pageSpacing;

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
      // max-width: 40vw;
      text-align: end;
      color: var(--text-color);

      // @media screen and (max-width: 768px) {
      //   max-width: 70%;
      // }
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
  top: 50px;

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

.cart_summary {
  @include mixins.subtitleText;
  text-transform: uppercase;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      svg {
        stroke: black;
        padding: 4px;
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
