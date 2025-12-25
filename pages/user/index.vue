<template>
  <section class="user">
    <div class="container">
      <div class="user_content">
        <div class="user_content_orders">
          <h1>Мої замовлення</h1>

          <ul class="order_items">
            <li
              class="order_item"
              v-for="(order, i) in userData.orders"
              :key="i"
            >
              <div class="order_item_head">
                <span class="order_number"> Номер {{ order.number }} </span>
                <span class="order_date">
                  {{ order.date }}
                </span>
              </div>

              <div class="items_quantity">{{ order.items.length }} товари</div>

              <ul class="product_list">
                <li
                  class="product_list_item"
                  v-for="(item, i) in order.items"
                  :key="i"
                >
                  <div class="item_main">
                    <img
                      :src="item.image"
                      alt="preview"
                      class="product_preview"
                    />
                    <span>
                      {{ item.title }}
                    </span>
                  </div>

                  <div class="product_price">
                    <span class="old_price"> {{ item.price }} грн </span>
                    <span class="action_price"> {{ item.salePrice }} грн </span>
                  </div>
                </li>
              </ul>

              <div class="status_wrapper">
                <span class="status_wrapper_title"> Статус </span>
                <span class="status_wrapper_value">
                  {{ order.status }}
                </span>
              </div>

              <div class="order_additional">
                <div class="order_additional_head">
                  <button @click="openOrderHandler(i)">
                    <span> Деталі замовлення </span>

                    <div
                      class="icon_wrap"
                      :class="openOrders.includes(i) ? 'icon_wrap_active' : ''"
                    >
                      <AngleDown />
                    </div>
                  </button>
                </div>

                <ul
                  class="order_additional_list"
                  :class="
                    openOrders.includes(i) ? 'order_additional_list_active' : ''
                  "
                >
                  <li>
                    <span> Сума: </span>
                    <span> {{ order.totalPrice }} грн </span>
                  </li>
                  <li>
                    <span> Спосіб оплати: </span>
                    <span>
                      {{ order.payment }}
                    </span>
                  </li>
                  <li>
                    <span> Доставка: </span>
                    <span>
                      {{ order.delivery }}
                    </span>
                  </li>
                  <li class="cancel_order">
                    <button>
                      Скасувати замовлення
                      <div class="icon_wrap">
                        <CloseIcon />
                      </div>
                    </button>
                  </li>
                </ul>
              </div>

              <div class="order_divider"></div>
            </li>
          </ul>
        </div>

        <div class="user_content_info">
          <div class="user_content_info_wrapper">
            <div class="user_name">
              {{ userData.name }}
            </div>
            <div class="user_contact">
              <span>
                {{ userData.phone }}
              </span>
              <span>
                {{ userData.email }}
              </span>
            </div>
            <button class="edit_profile">
              <span> Редагувати дані </span>
              <div class="icon_wrap">
                <AngleRight />
              </div>
            </button>
            <button
              class="exit_profile"
              @click="modalStore.showModal('LogOut')"
            >
              Вийти з облікового запису
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AngleDown from "~/assets/icons/angle-down.svg";
import AngleRight from "~/assets/icons/angle-right.svg";
import CloseIcon from "~/assets/icons/close-icon.svg";

import { useModalStore } from "@/store/modal-store";

const modalStore = useModalStore();

const userData = {
  name: "Анастасія Самойлова",
  phone: "+380 50 000 00 00",
  email: "4HbGZ@example.com",
  orders: [
    {
      id: 1,
      number: "12345",
      date: "10.12.2025",
      items: [
        {
          image: "/images/popular/popular1.webp",
          title: "Вагінальні кульки кегеля",
          quantity: "2",
          price: "3 850",
          salePrice: "3 550",
        },
        {
          image: "/images/popular/popular1.webp",
          title: "Вагінальні кульки кегеля",
          quantity: "2",
          price: "3 850",
          salePrice: "3 550",
        },
        {
          image: "/images/popular/popular1.webp",
          title: "Вагінальні кульки кегеля",
          quantity: "2",
          price: "3 850",
          salePrice: "3 550",
        },
      ],
      status: "Відправлено",
      totalPrice: "6 850",
      payment: "Оплата на онлайн сайті",
      delivery: "Відділення Нової пошти",
    },
    {
      id: 2,
      number: "12345",
      date: "10.12.2025",
      items: [
        {
          image: "/images/popular/popular1.webp",
          title: "Вагінальні кульки кегеля",
          quantity: "2",
          price: "3 850 ",
          salePrice: "3 550 ",
        },
      ],
      status: "Відправлено",
      totalPrice: "6 850 ",
      payment: "Оплата на онлайн сайті",
      delivery: "Відділення Нової пошти",
    },
    {
      id: 3,
      number: "12345",
      date: "10.12.2025",
      items: [
        {
          image: "/images/popular/popular1.webp",
          title: "Вагінальні кульки кегеля",
          quantity: "2",
          price: "3 850 ",
          salePrice: "3 550 ",
        },
      ],
      status: "Відправлено",
      totalPrice: "6 850 ",
      payment: "Оплата на онлайн сайті",
      delivery: "Відділення Нової пошти",
    },
  ],
};

const openOrders = ref([]);

const openOrderHandler = (index) => {
  const i = openOrders.value.indexOf(index);
  i === -1 ? openOrders.value.push(index) : openOrders.value.splice(i, 1);
};
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.user {
  color: white;
  @include mixins.pageSpacing;
  position: relative;
  width: 100%;
  height: 100%;
}

.user_content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  gap: 10px;

  h1 {
    @include mixins.titleText;
    margin-bottom: 40px;
  }

  &_orders {
    position: relative;
    width: 500px;

    @media screen and (max-width: 768px) {
      width: clamp(400px, 95vw, 500px);
    }

    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }

  .order_items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    width: 100%;
    height: auto;
    gap: 20px;

    @media screen and (max-width: 1024px) {
      gap: 28px;
    }
    @media screen and (max-width: 480px) {
      gap: 24px;
    }
    @media screen and (max-width: 480px) {
      gap: 20px;
    }
  }

  .order_item {
    width: 100%;
  }

  .order_item_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .order_number {
      @include mixins.subtitleText;

      @media screen and (max-width: 1024px) {
        font-size: 1rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.9375rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.875rem;
      }
    }
    .order_date {
      @include mixins.mainText;

      @media screen and (max-width: 1024px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.75rem;
      }
    }

    @media screen and (max-width: 1024px) {
      margin-bottom: 28px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
    }
  }

  .items_quantity {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 16px;

    @include mixins.mainText;
    font-size: 1rem;

    @media screen and (max-width: 1024px) {
      font-size: 0.9375rem;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 14px;
      font-size: 0.8125rem;
    }
    @media screen and (max-width: 375px) {
      margin-bottom: 12px;
      font-size: 0.6875rem;
    }
  }

  .product_list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 24px;

    &_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: auto;
      gap: 25px;

      @media screen and (max-width: 480px) {
        gap: clamp(10px, 3vw, 25px);
      }
    }

    .product_price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        @include mixins.mainText;

        @media screen and (max-width: 1024px) {
          font-size: 1.0625rem;
        }
        @media screen and (max-width: 480px) {
          white-space: nowrap;
          font-size: 0.875rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.75rem;
        }
      }

      span.action_price {
        color: var(--accent-red);
      }
    }

    .old_price {
      text-decoration: line-through;
    }

    .item_main {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 9px;
      img {
        width: 90px;
        height: 90px;
        aspect-ratio: 1 / 1;
        object-fit: cover;

        @media screen and (max-width: 1024px) {
          width: 80px;
          height: 80px;
        }
        @media screen and (max-width: 375px) {
          width: 70px;
          height: 70px;
        }
      }
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

    @media screen and (max-width: 1024px) {
      margin-bottom: 28px;
      gap: 20px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
      gap: 16px;
    }
  }

  .status_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    width: 100%;

    span {
      @include mixins.mainText;

      @media screen and (max-width: 1024px) {
        font-size: 1.0625rem;
      }
      @media screen and (max-width: 480px) {
        font-size: 0.875rem;
      }
      @media screen and (max-width: 375px) {
        font-size: 0.75rem;
      }
    }

    @media screen and (max-width: 1024px) {
      margin-bottom: 28px;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
    }
  }

  .order_additional {
    padding-bottom: 20px;

    &_head {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
        @include mixins.mainText;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--accent-color);
        cursor: pointer;
        gap: 7px;

        .icon_wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all ease 0.3s;
          width: 24px;
          height: 24px;

          svg {
            stroke: var(--accent-color);
            padding: 7px;
          }
        }
        .icon_wrap_active {
          transition: all ease 0.3s;
          transform: rotate(180deg);
        }

        @media screen and (max-width: 1024px) {
          font-size: 1rem;
        }
        @media screen and (max-width: 480px) {
          font-size: 0.9375rem;
        }
        @media screen and (max-width: 375px) {
          font-size: 0.8125rem;
        }
      }
    }

    &_list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      transition: all ease 0.3s;
      padding-top: 0;
      overflow: hidden;
      height: 0;
      position: relative;
      width: 100%;
      gap: 8px;

      li {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span,
        button {
          @include mixins.mainText;
          font-size: 1rem;

          @media screen and (max-width: 1024px) {
            font-size: 0.9375rem;
          }
          @media screen and (max-width: 480px) {
            font-size: 0.8125rem;
          }
          @media screen and (max-width: 480px) {
            font-size: 0.6875rem;
          }
        }
        button {
          color: var(--accent-red);
        }
      }

      .cancel_order {
        justify-content: flex-end;
        margin-top: 16px;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          gap: 10px;
        }

        .icon_wrap {
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            width: 10px;
            height: 10px;
            stroke: var(--accent-red);
          }
        }
      }
    }

    &_list_active {
      height: auto;
      // transition: height 0.3s ease;
      transition: all ease 0.3s;
      padding-top: 32px;
    }

    @media screen and (max-width: 1024px) {
      padding-bottom: 28px;
    }
    @media screen and (max-width: 480px) {
      padding-bottom: 24px;
    }
    @media screen and (max-width: 375px) {
      padding-bottom: 20px;
    }
  }

  .order_divider {
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.05);
  }

  &_info {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    position: sticky;
    width: 300px;
    height: 100%;
    top: 100px;
    &_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    @media screen and (max-width: 768px) {
      justify-content: flex-start;
      position: relative;
      top: 0;
    }
  }

  .user_name {
    @include mixins.subtitleText;
    text-transform: uppercase;
    margin-bottom: 16px;

    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
      margin-bottom: 12px;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      margin-bottom: 8px;
      font-size: 0.8125rem;
    }
  }
  .user_contact {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 22px;
    font-weight: 500;
    @include mixins.subtitleText;

    gap: 4px;

    @media screen and (max-width: 1024px) {
      margin-bottom: 20px;
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.75rem;
    }
  }
  .edit_profile {
    @include mixins.mainText;
    text-transform: uppercase;
    cursor: pointer;
    color: var(--accent-color);
    margin-bottom: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 7px;

    .icon_wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        padding-block: 7px;
        width: 24px;
        height: 24px;
      }
    }

    @media screen and (max-width: 1024px) {
      margin-bottom: 28px;
      font-size: 1rem;
    }
    @media screen and (max-width: 480px) {
      margin-bottom: 24px;
      font-size: 0.9375rem;
    }
    @media screen and (max-width: 375px) {
      margin-bottom: 20px;
      font-size: 0.8125rem;
    }
  }
  .exit_profile {
    @include mixins.mainText;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;

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

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: start;
    gap: 44px;
  }

  @media screen and (max-width: 375px) {
    gap: 40px;
  }
}
</style>
