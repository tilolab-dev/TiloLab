<template>
  <div class="product_section">
    <div class="product_container">
      <div class="top_block">
        <div class="page_name">
          <h1 class="mb-0">Товари</h1>
        </div>
        <div class="top_block_content">
          <div class="top_block_content_nav">
            <div
              class="el"
              :class="activeGroup === 'products' ? 'el-active' : ''"
              @click="showGroup('products')"
            >
              <span> Товари </span>
            </div>
            <div
              class="el"
              :class="activeGroup === 'categories' ? 'el-active' : ''"
              @click="showGroup('categories')"
            >
              <span> Категорії </span>
            </div>
          </div>
          <!-- <DashBurger /> -->
        </div>
      </div>
      <div class="middle_row">
        <div class="middle_row_search">
          <div class="search_wrapper">
            <input type="text" placeholder="Пошук" />
            <button class="search-btn">
              <!-- <SvgIcon
                name="search-icon"
                size="micro"
                fill="var(--dark-color)"
              /> -->
            </button>
          </div>
        </div>
        <div class="adding_content">
          <button class="text-nowrap" @click="openPopup('AddCategory')">Додати категорію</button>
          <button class="text-nowrap" @click="openPopup('AddProduct')">Додати товар</button>
          <!-- <button>
                <SvgIcon name="burger-menu" size="micro" fill="var(--dark-color)" />
            </button> -->
        </div>
      </div>

      <div class="info_content">
        <div v-if="activeGroup === 'categories'" class="info_content_wrapper">
          <div ref="categoryElem" class="wrapper_content">
            <div class="table_name">
              <h6 class="dark:text-white">Категорії товарів</h6>
            </div>

            <div class="table_content">
              <div class="table_inner">
                <table class="table_wrapper">
                  <thead class="t_head">
                    <tr>
                      <th class="t_head_cell">Author</th>
                      <th class="t_head_cell">Function</th>
                      <th class="t_head_cell">Status</th>
                      <th class="t_head_cell">Employed</th>
                      <th class="t_head_cell"></th>
                    </tr>
                  </thead>
                  <tbody v-if="!loadingCategoryState" class="t_body">
                    <!-- Skeleton -->
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
                    <!-- Data -->
                  </tbody>
                  <tbody v-else class="t_body">
                    <!-- v-for="category in fetchedCategories" -->

                    <tr v-for="(item, i) in 6" :key="i">
                      <td class="table_row">
                        <div class="table_main">
                          <img src="/images/item.png" alt="user1" />
                          <div class="table_main_wrapper">
                            <h6>John Michael</h6>
                            <p>john@creative-tim.com</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>Manager</p>
                        <p>Organization</p>
                      </td>
                      <td>
                        <span> Online </span>
                      </td>
                      <td>
                        <span> 23/04/18 </span>
                      </td>
                      <td>
                        <button>Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- card 2 -->

        <div v-else class="info_content_wrapper">
          <div ref="productElem" class="wrapper_content">
            <div class="table_name">
              <h6 class="dark:text-white">Товари</h6>
            </div>
            <div class="table_content">
              <div class="table_inner">
                <table class="table_wrapper">
                  <thead class="t_head">
                    <tr>
                      <th class="t_head_cell">Товар</th>
                      <th class="t_head_cell">Ціна</th>
                      <th class="t_head_cell">Статус товару</th>
                      <th class="t_head_cell">Категорія</th>
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

                    <tr v-for="(product, i) in 20" :key="i">
                      <td class="table_row">
                        <div class="table_main">
                          <img src="/images/item.png" alt="item" />
                          <h6 class="mb-0 text-sm leading-normal dark:text-white">title</h6>
                        </div>
                      </td>
                      <td>
                        <p>price UAH</p>
                      </td>
                      <td>
                        <p>Активний</p>
                      </td>
                      <td>
                        <p>product category</p>
                      </td>
                      <td>
                        <button
                          class="inline-block px-5 py-2.5 mb-0 font-bold text-[var(-dark-color)] text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none leading-normal text-sm ease-in bg-150 tracking-tight-rem bg-x-25"
                        >
                          Edit
                        </button>
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
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
// import SvgIcon from "@/components/shared/SvgIcon.vue";
import { useModalStore } from "@store/modal-store";
// import DashBurger from "@/components/shared/DashBurger.vue";
import gsap from "gsap";

const modalStore = useModalStore();

const loadingCategoryState = ref(false);
const fetchedCategories = ref([]);
const categoryElem = ref(null);
const loadingProductState = ref(false);
const fetchedProducts = ref([]);
const productElem = ref(null);
// const productCategoryElem = ref(null);

const activeGroup = ref("products");

const openPopup = (modal) => {
  switch (modal) {
    case "AddProduct":
      modalStore.showModal("AddProduct");
      break;
    case "AddCategory":
      modalStore.showModal("AddCategory");
      break;
  }
};

watch(fetchedCategories, async () => {
  if (categoryElem.value) {
    const prevHeight = categoryElem.value.clientHeight;
    await nextTick();
    const newHeight = categoryElem.value.clientHeight;

    gsap.fromTo(
      categoryElem.value,
      { height: prevHeight },
      { height: newHeight, duration: 0.5, ease: "power2.out" }
    );
  }
});
watch(fetchedProducts, async () => {
  if (productElem.value) {
    const prevHeight = productElem.value.clientHeight;
    await nextTick();
    const newHeight = productElem.value.clientHeight;

    gsap.fromTo(
      productElem.value,
      { height: prevHeight },
      { height: newHeight, duration: 0.5, ease: "power2.out" }
    );
  }
});

definePageMeta({
  layout: "admin"
});

const showGroup = (group) => {
  switch (group) {
    case "products":
      fetchProduct();
      activeGroup.value = "products";
      break;
    case "categories":
      fetchCategory();
      activeGroup.value = "categories";
      break;
  }
};

// const deleteCategory = (category) => {
//   modalStore.showModal("DeleteCategory", {
//     categoryId: category.id,
//     categoryName: category.language.title
//   });
// };

const fetchCategory = async () => {
  loadingCategoryState.value = true;
  try {
    const getCategories = await $fetch("/api/category");

    if (getCategories.data.length > 0) {
      fetchedCategories.value = getCategories.data.map((item) => ({
        ...item,
        language: item.translations.find((translation) => translation.language === "uk")
      }));
    }
    loadingCategoryState.value = false;
  } catch (error) {
    console.log(error.message, "Something went wrong");
  }
};

const fetchProduct = async () => {
  loadingProductState.value = true;

  try {
    const getProducts = await $fetch("/api/products");

    console.log(getProducts);

    if (getProducts.data.length > 0) {
      fetchedProducts.value = getProducts.data.map((item) => item);
    }

    loadingProductState.value = false;
  } catch (error) {
    console.log(error.message, "Something went wrong");
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped lang="scss">
.product_section {
  height: 100vh;
  position: relative;

  .product_container {
    // margin-inline: 10px;
    padding-bottom: 2px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .top_block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    .page_name {
      h1 {
        margin-bottom: 5px;
      }
    }

    &_content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0 1rem;

      &_nav {
        background: var(--bg-color);
        border-radius: 5px;
        padding: 8px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;

        .el {
          cursor: pointer;
        }

        .el-active {
          background: var(--btn-color);
          border-radius: 3px;
          transition: all ease 0.3s;
          z-index: 5;

          color: white;

          span {
            padding: 2px 4px;
          }

          @media screen and (min-width: 1024px) {
            &:hover {
              transition: all ease 0.3s;
              span {
                color: var(--bg-color);
              }
            }
          }
        }
      }
    }
  }

  .middle_row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    gap: 20px;
    margin-block: 20px;

    &_search {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      gap: 1.25rem;

      .search_wrapper {
        border: 1px solid darkgrey;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding-left: 0.5rem;
      }
    }
  }

  .adding_content {
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    gap: 1.25rem;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    button {
      white-space: nowrap;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border: 1px solid var(--border-color);
      background: var(--btn-color);
      border-radius: 5px;
      cursor: pointer;
    }
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
                  // padding-top: 0.75rem;
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
                    // background-color: #4b5563;

                    // @media (prefers-color-scheme: dark) {
                    //     background-color: #4b5563;
                    // }

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
                    border-radius: 9999px;
                    height: 3rem;
                    width: 3rem;
                    background: rgb(245, 179, 179);
                  }
                  h6 {
                    margin-bottom: 0;
                    font-size: 1rem;
                    font-weight: 700;
                    line-height: 1.5;
                    color: var(--text-grey);
                    text-transform: capitalize;
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
                    margin-bottom: 0;
                    font-size: 0.875rem;
                    font-weight: 600;
                    line-height: 1.5;
                    color: var(--text-grey);
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
