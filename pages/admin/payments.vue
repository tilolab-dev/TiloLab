<template>
  <div class="payments">
    <div class="admin_layout_container">
      <div class="title_page">
        <h1>Платежі</h1>
      </div>
    </div>
    <div class="payments_section">
      <div class="payment_container">
        <div class="info_content">
          <div class="info_content_wrapper">
            <div ref="productElem" class="wrapper_content">
              <div class="table_name">
                <h6 class="dark:text-white">Товари</h6>
              </div>
              <div class="table_content">
                <div class="table_inner">
                  <table class="table_wrapper">
                    <thead class="t_head">
                      <tr>
                        <th class="t_head_cell"></th>
                        <th class="t_head_cell">Сумма замовлення</th>
                        <th class="t_head_cell">Статус платежу</th>
                        <th class="t_head_cell">Банк</th>
                        <th class="t_head_cell">Дата</th>
                        <th class="t_head_cell"></th>
                      </tr>
                    </thead>
                    <tbody v-if="loadingProductState" class="t_body">
                      <!-- <div > -->
                      <tr v-for="i in 5" :key="'skeleton-' + i" class="skeleton_content_row">
                        <!-- Author -->
                        <td class="skeleton_content">
                          <div class="main_cell">
                            <div class="main_cell_circle skeleton_item"></div>
                            <div class="main_cell_text">
                              <div class="skeleton_item main_cell_text_top"></div>
                              <div class="skeleton_item main_cell_text_bottom"></div>
                            </div>
                          </div>
                        </td>
                        <!-- Function -->
                        <td class="skeleton_content">
                          <div class="skeleton_item"></div>
                          <div class="skeleton_item"></div>
                        </td>
                        <!-- Status -->
                        <td class="skeleton_content">
                          <div class="skeleton_item"></div>
                        </td>
                        <!-- Employed -->
                        <td class="skeleton_content">
                          <div class="skeleton_item"></div>
                        </td>
                        <!-- Edit -->
                        <td class="skeleton_content">
                          <div class="skeleton_item"></div>
                        </td>
                      </tr>
                      <!-- </div> -->
                    </tbody>
                    <tbody v-else class="t_body">
                      <!-- v-for="product in fetchedProducts" -->

                      <tr v-for="(payment, i) in paymentStore.paymentList" :key="i">
                        <td class="table_row">
                          <div class="table_main">
                            <!-- v-if="product.img?.length" -->

                            <img src="../../public/images/icons/credit-card.webp" alt="icon" />
                            <!-- <div v-else class="fallback_img"></div> -->
                            <!-- src="../public/images/icons.credit-card.webp" -->

                            <h6>
                              <!-- {{ product.translations[0].title }} -->
                              <!-- {{ product.translations?.[0]?.title ?? "" }} -->
                            </h6>
                          </div>
                        </td>
                        <td>
                          <div class="product_option price_option">
                            <span class="price">
                              {{ console.log(payment) }}
                              {{ payment.amount }}
                              <!-- :style="{
                              textDecoration: product.discountPercent > 0 ? 'line-through' : '',
                              color: product.discountPercent > 0 ? 'var(--accent-red)' : ''
                            }" -->
                              <!-- {{ product.productPrice }} UAH -->
                            </span>
                            <!-- <span v-if="product.discountPercent > 0" class="discount_price">
                            UAH
                          </span> -->
                          </div>
                        </td>
                        <td>
                          <div class="product_option">
                            <!-- <span v-if="product.visible">Активний</span>
                          <span v-else>Не активний</span> -->
                            {{ payment.status }}
                          </div>
                        </td>
                        <td>
                          <div class="product_option">
                            <!-- {{ product.category?.group ?? "" }} -->
                            {{ payment.provider }}
                          </div>
                        </td>
                        <td>
                          <div class="product_quantity">
                            <!-- {{ product.stockValue }} -->
                            <div>
                              {{ payment.createdAt.slice(0, 10) }}
                              <br />
                              {{ payment.createdAt.slice(11, 19) }}
                            </div>
                          </div>
                        </td>
                        <td class="button_cell">
                          <div class="table_btn_wrap">
                            <button
                              class="edit_btn"
                              @click="modalStore.showModal('UpdateProduct', { product })"
                            >
                              Детальна інформація
                            </button>
                            <!-- <button
                            class="delete_btn"
                            @click="modalStore.showModal('DeleteProduct', { product })"
                          >
                            <CloseIcon />
                          </button> -->
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePaymentStore } from "@/store/payment-store";
import { storeToRefs } from "pinia";

// const loadingState = ref(false);
const loadingProductState = ref(false);

const paymentStore = usePaymentStore();

const { paymentList } = storeToRefs(paymentStore);

onMounted(async () => {
  // console.log(paymentStore.paymentList);
  if (!paymentList.value.length) {
    loadingProductState.value = true;
    await paymentStore.getPayments();
    loadingProductState.value = false;
  }
});

definePageMeta({
  layout: "admin"
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.payments_section {
  height: 100vh;
  position: relative;

  .payments_container {
    padding-bottom: 2px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .info_content {
    width: 100%;
    height: 100%;
    padding: 24px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;

    &_wrapper {
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      position: relative;

      .wrapper_content {
        flex: none;
        width: 100%;
        max-width: 100%;
        max-height: 100%;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        border: 1px solid var(--border-color);
        padding-bottom: 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        margin-bottom: 1.5rem;
        overflow: hidden;
        word-break: break-word;
        background: rgb(6, 5, 6);
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-radius: 1rem;
        background-clip: border-box;
        .table_name {
          padding: 1.5rem;
          margin-bottom: 0;
          border-bottom: 0px solid transparent;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
        }
        .table_content {
          flex: 1 1 auto;
          padding-left: 0;
          padding-right: 0;
          padding-top: 0;
          overflow-y: scroll;
          padding-bottom: 0.5rem;
          .table_inner {
            padding: 0;
            overflow-x: auto;
            .table_wrapper {
              width: 100%;
              margin-bottom: 0;
              vertical-align: top;
              border-collapse: collapse;
              color: #64748b;
              display: table;
              table-layout: auto;
              .t_head {
                vertical-align: bottom;
                &_cell {
                  padding-left: 1.5rem;
                  padding-right: 1.5rem;
                  padding-bottom: 0.75rem;
                  font-weight: 700;
                  text-align: left;
                  text-transform: uppercase;
                  vertical-align: middle;
                  background: transparent;
                  border-bottom-width: 1px;
                  border-bottom-style: solid;
                  box-shadow: none;
                  color: var(--dark-text);
                  font-size: 0.75rem;
                  letter-spacing: normal;
                  white-space: nowrap;
                  text-align: center;
                  opacity: 0.7;
                }
              }
              .t_body {
                border-top: 1px solid rgba(0, 0, 0, 0.1);

                .skeleton_content {
                  padding: 0.75rem 1.5rem;
                  vertical-align: middle;
                  background-color: transparent;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.4);

                  .main_cell {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 0.5rem;

                    &_circle {
                      width: 36px;
                      height: 36px;
                      border-radius: 50%;
                    }

                    &_text {
                      display: flex;
                      flex-direction: column;
                      margin-left: 1rem;
                      &_top {
                        width: 128px;
                        height: 16px;
                        margin-bottom: 4px;
                        border-radius: 0.25rem;
                      }
                      &_bottom {
                        width: 96px;
                        height: 12px;
                        border-radius: 0.25rem;
                      }
                    }
                  }

                  .skeleton_item {
                    background-color: #d1d5db;

                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                  }

                  @keyframes pulse {
                    0%,
                    100% {
                      opacity: 1;
                    }
                    50% {
                      opacity: 0.5;
                    }
                  }
                }
                td:nth-child(2) {
                  .skeleton_item:nth-child(1) {
                    width: 7rem;
                    height: 1rem;
                    margin-bottom: 0.25rem;
                    border-radius: 0.2rem;
                  }
                  .skeleton_item:nth-child(2) {
                    width: 5rem;
                    height: 0.75rem;
                    border-radius: 0.2rem;
                  }
                }
                td:nth-child(3) {
                  .skeleton_item {
                    width: 4rem;
                    height: 1.5rem;
                    border-radius: 0.25rem;
                  }
                }

                td:nth-child(4) {
                  .skeleton_item {
                    width: 4rem;
                    height: 0.75rem;
                    border-radius: 0.2rem;
                  }
                }
                td:nth-child(5) {
                  .skeleton_item {
                    width: 3rem;
                    height: 0.75rem;
                    margin-inline: auto;
                    border-radius: 0.2rem;
                  }
                }

                .table_row {
                  padding: 12px 8px;
                  vertical-align: middle;
                  background: transparent;
                  border-bottom: 1px solid rgba(63, 63, 63, 0.7);
                  white-space: nowrap;
                  box-shadow: transparent;
                  .table_main {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding-inline: 0.5rem;
                  }
                  img {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 0.5rem;
                    font-size: 0.875rem;
                    color: #ffffff;
                    transition: all 0.2s ease-in-out;
                    // border-radius: 50%;
                    height: 3rem;
                    width: 3rem;
                    // background: rgb(245, 179, 179);
                  }
                  // .fallback_img {
                  //   height: 3rem;
                  //   width: 3rem;
                  //   background: rgb(245, 179, 179);
                  //   border-radius: 50%;
                  //   margin-right: 10px;
                  // }
                  h6 {
                    @include mixins.mainText;
                    font-size: 0.8rem;
                    max-width: 200px;
                    white-space: normal;
                    overflow-wrap: normal;
                    word-break: normal;
                  }
                }
                td {
                  padding: 0.5rem;
                  vertical-align: middle;
                  background: transparent;
                  border-bottom: 1px solid rgba(63, 63, 63, 0.7);
                  white-space: nowrap;
                  box-shadow: transparent;
                  p {
                    text-align: center;
                    @include mixins.mainText;
                    font-size: 0.8rem;
                  }
                  .price_option {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                  }
                  .product_quantity {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    @include mixins.mainText;
                    font-size: 0.8rem;
                  }
                  .product_option {
                    width: 100%;
                    height: auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    @include mixins.mainText;
                    font-size: 0.8rem;
                  }
                  button {
                    display: inline-block;
                    padding-left: 1.25rem;
                    padding-right: 1.25rem;
                    padding-top: 0.625rem;
                    padding-bottom: 0.625rem;
                    margin-bottom: 0;
                    font-weight: 700;
                    color: var(--text-grey);
                    text-align: center;
                    text-transform: uppercase;
                    vertical-align: middle;
                    transition: all 0.2s ease-in;
                    background: transparent;
                    border: 0;
                    border-radius: 0.5rem;
                    box-shadow: none;
                    line-height: 1.5;
                    font-size: 0.875rem;
                    background-size: 150%;
                    background-position-x: 25%;
                    letter-spacing: -0.0625rem;
                  }
                  .edit_btn {
                    @include mixins.accentBtn;
                    padding: 4px 10px;
                    font-size: 0.7rem;
                  }
                  .delete_btn {
                    width: 25px;
                    height: 25px;
                    background: rgb(84, 28, 21);
                    border: 1px solid rgb(140, 49, 37);
                    border-radius: 3px;
                    position: relative;
                    cursor: pointer;
                    padding: 0;
                    svg {
                      width: 20px;
                      height: 20px;
                      stroke: var(--text-color);
                      padding: 5px;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    }
                    @media screen and (min-width: 1024px) {
                      &:hover {
                        background: rgb(108, 37, 27);
                        border: 1px solid rgb(164, 59, 45);
                      }
                    }
                  }
                }
                .button_cell .table_btn_wrap {
                  display: flex;
                  align-items: stretch;
                  justify-content: center;
                  gap: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
