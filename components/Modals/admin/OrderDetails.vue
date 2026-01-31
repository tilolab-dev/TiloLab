<template>
  <div class="order_detail_content">
    <div v-if="loaderState" class="loader_content">
      <SharedLoader />
    </div>
    <div class="order_detail_wrapper">
      <div class="order_detail_top">
        <h2 class="order_detail_title">Інформація про замовлення</h2>

        <div class="close_button_wrapper">
          <button @click="modalStore.closeModal">
            <CloseIcon />
          </button>
        </div>
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
        <p>{{ modalProps.order.status }}</p>
      </div>

      <div class="order_info_main">
        <div class="client">
          <strong> Клієнт: </strong>

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
                <p>{{ modalProps.order.shippingInfo.recipient }}</p>
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
          <li v-for="item in modalProps.order.orderItems" :key="item.id" class="items_info_product">
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

const modalProps = defineProps({
  order: {
    type: Object,
    required: true
  }
});

const activeButton = computed(() => {
  return selectValue.value !== modalProps.order.status;
});

watch(activeButton, (newVal) => {
  console.log(activeButton.value, newVal);
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
  height: fit-content;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
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

.order_detail_wrapper {
  padding-block: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;

  .order_detail_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    border-bottom: 1px solid var(--accent-grey);
    padding-bottom: 10px;
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

  .order_status {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--accent-grey);
  }

  .order_info_main {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: auto;
    padding-inline: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--accent-grey);
    gap: 20px;

    .client {
      flex: 1;
    }

    .shipping_info {
      flex: 1;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  .order_detail_main {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--accent-grey);
  }

  .items_info {
    width: 100%;
    height: 100%;
    position: relative;
    padding-inline: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--accent-grey);

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
    padding-bottom: 20px;
    border-bottom: 1px solid var(--accent-grey);

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
}
</style>
