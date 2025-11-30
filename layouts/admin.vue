<template>
  <div class="admin_layout">
    <div class="admin_head_bg"></div>
    <aside
      class="admin_sidebar"
      :aria-expanded="isSidebarOpen"
      :class="{
        '-translate-x-full z-50': !isSidebarOpen,
        'translate-x-4 z-50': isSidebarOpen,
      }"
    >
      <div class="sidebar_main">
        <div class="sidebar_top">
          <div
            class="sidebar_top_content"
            target="_blank"
          >
            <!-- <img
              src="../public//img/only-dog.png"
              class="h-auto w-[40px] transition-all duration-200 dark:inline ease-nav-brand bg-[var(--light-color)] p-1 rounded-lg"
              alt="main_logo"
            /> -->
            <div class="title_wrapper">
              <span
                class="title_accent"
              >
                Панель керування
              </span>
              <span> https://www.tilo-lab.com.ua </span>
            </div>
          </div>
        </div>
        <!-- dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent -->
        <hr
          class="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent"
        />

        <div
          class="sidebar_links"
        >
          <ul class="sidebar_links_wrapper">
            <li
              class="sidebar_links_item"
              v-for="item in firstLinks"
              :key="item.id"
              @click="closeSidebar(), (activePage = item.activePage)"
            >
              <NuxtLink :to="item.linkPath">
                <div
                  class="item_wrapper"
                  :class="{
                    'text-white bg-[var(--primary-color)]':
                      activePage === item.activePage,
                  }"
                >
                  <div
                    class="image_content"
                  >
                    <!-- <img src="@/public/img/icons/house.png" alt="option" /> -->
                  </div>
                  <span
                    class="text_content"
                  >
                    {{ item.title }}
                  </span>
                </div>
              </NuxtLink>
            </li>

            <li class="divider_item">
              <h6 class="divider_item_text">
                Account pages
              </h6>
            </li>

            <li
              class="sidebar_links_item"
              v-for="item in remainingLinks"
              :key="item.id"
              @click="closeSidebar(), (activePage = item.activePage)"
            >
              <NuxtLink :to="item.linkPath">
                <div
                  class="item_wrapper"
                  :class="{
                    'text-white bg-[var(--primary-color)]':
                      activePage === item.activePage,
                  }"
                >
                  <div
                    class="image_content"
                  >
                    <!-- <img src="@/public/img/icons/house.png" alt="option" /> -->
                  </div>
                  <span
                    class="text_content"
                  >
                    {{ item.title }}
                  </span>
                </div>
              </NuxtLink>
            </li>

         
          </ul>
        </div>
      </div>


    </aside>

    <!-- <main class="page-layout"> -->
    <main
      class="admin_content"
    >
      <!-- <div class="mobile-burger py-2 ">
          <button 
            class="bg-[var(--light-color)] "
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <div class="top"></div>
            <div class="middle"></div>
            <div class="bottom"></div>
          </button>
        </div> -->

      <!-- <slot @toggle-sidebar="handleSidebarToggle"/> -->
      <!-- <div @toggle-sidebar="handleSidebarToggle">
            <slot />
          </div> -->
      <slot />

      <!-- <Tooltips :props="tooltipProps"/> -->

      <!-- :tooltipProps="tooltipProps"  -->
    </main>
    <!-- <Tooltips v-if="showTooltip" :tooltipStatus="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips> -->
    <Modal @tooltip="tooltip">
      <template #default="{ openModal, closeModal }">
        <component
          :is="currentModal"
          v-bind="modalProps"
          :openModal="openModal"
          :closeModal="closeModal"
        />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, toRefs, watch, ref, onMounted } from "vue";
import Modal from "~/components/Modals/Modal.vue";
// import Tooltips from "~/components/shared/Tooltips.vue";
import { useModalStore } from "@/store/modal-store";
  // useIndexStore 



const linksData = ref([
  {
    id: 1,
    activePage: "index",
    title: "Головна",
    linkPath: "/admin",
    imgPath: "/img/icons/home.png",
  },
  {
    id: 2,
    activePage: "analytics",
    title: "Аналітика",
    linkPath: "/admin/analytics",
    imgPath: "/img/icons/analytics.png",
  },
  {
    id: 3,
    activePage: "buyers",
    title: "Покупці",
    linkPath: "/admin/buyers",
    imgPath: "/img/icons/buyers.png",
  },
  {
    id: 4,
    activePage: "notifications",
    title: "Повідомлення",
    linkPath: "/admin/notifications",
    imgPath: "/img/icons/notification.png",
  },
  {
    id: 5,
    activePage: "orders",
    title: "Замовлення",
    linkPath: "/admin/orders",
    imgPath: "/img/icons/order.png",
  },
  {
    id: 6,
    activePage: "payment",
    title: "Оплата",
    linkPath: "/admin/payment",
    imgPath: "/img/icons/cash-payment.png",
  },
  {
    id: 7,
    activePage: "products",
    title: "Товари",
    linkPath: "/admin/products",
    imgPath: "/img/icons/products.png",
  },
  {
    id: 8,
    activePage: "settings",
    title: "Налаштування",
    linkPath: "/admin/settings",
    imgPath: "/img/icons/setting.png",
  },
]);

const firstLinks = computed(() => linksData.value.slice(0, 4))
const remainingLinks = computed(() => linksData.value.slice(4))

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");
const isSidebarOpen = ref(false);
const activePage = ref("index");

const modalStore = useModalStore();
// const indexStore = useIndexStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

// const burgerBtn = computed(() => indexStore.adminBurgerBtn);

// watch(burgerBtn, () => {
//   burgerBtn.value
//     ? (isSidebarOpen.value = true)
//     : (isSidebarOpen.value = false);
// });

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 3000);
};

const closeSidebar = () => {

  if (isSidebarOpen.value) {
    setTimeout(() => {
      indexStore.setAdminBurgerBtn(false);
      isSidebarOpen.value = false;
    }, 300);
  }
  return;
};
</script>

<style lang="scss">


  .admin_layout{
     margin: 0;
    font-family: var(--font-sans, ui-sans-serif, system-ui);
    font-size: 1rem; 
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    line-height: 1.5;
    background-color: #f9fafb;
    color: #64748b;

      // Dark mode
    //   @media (prefers-color-scheme: dark) {
    //     background-color: var(--dark-component-color);
    //     color: #94a3b8;
    // }
  }

  .admin_head_bg{

      position: absolute;
      width: 100%;
      background-color: lightgray;
      min-height: 18rem;

      // @media (prefers-color-scheme: dark) {
      //   background-color: var(--main-dark-color);
      // }

  }

  .admin_sidebar{

    position: fixed;
    inset-block: 0;
    gap: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0;
    margin-block: 1rem;
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    transition: transform 200ms;
    transform: translateX(-100%);
    background-color: #ffffff;
    border: 0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 16rem;
    transition-timing-function: var(--ease-nav-brand);
    z-index: 990;
    border-radius: 1rem;

    // @media (prefers-color-scheme: dark) {
    //   background-color: var(--dark-grey);
    //   border: 1px solid var(--dark-border-color);
    //   box-shadow: none;
    //   background-color: #0f172a;
    // }

    @media (min-width: 1280px) {
      margin-left: 1.5rem;
      left: 0;
      transform: translateX(0);
    }

    .sidebar_main{
      width: 100%;
      height: auto;
    }

    .sidebar_top{
      height: 5rem;

      &_content{
        padding-inline: 0.5rem;
        padding-block: 1.5rem;
        margin: 0;
        font-size: 0.875rem;
        white-space: nowrap;
        color: #334155;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        .title_wrapper{
          margin-left: 0.25rem;
          display: flex;
          flex-direction: column;
          align-items: baseline;

          .title_accent{
            font-weight: 600;
            transition: all 200ms;
            transition-timing-function: var(--ease-nav-brand);
          }

        }
      }
    }

    .sidebar_links{
      display: block;
      align-items: center;
      width: auto;
      max-height: 100vh;
      overflow: auto;
      height: var(--h-sidenav);
      flex-grow: 1;
      flex-basis: 100%;
      padding-block: 0.5rem;

      &_wrapper{
        display: flex;
        flex-direction: column;
        padding-left: 0;
        margin-bottom: 0;
      }

      &_item{
        margin-top: 0.125rem;
        width: 100%;
      }

      .divider_item{
        width: 100%;
        margin-top: 1rem;
        &_text{
          padding-left: 1.5rem;
          margin-left: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.25;
          text-transform: uppercase;
        }
      }

      .item_wrapper{
        padding-block: 0.675rem;
        // background-color: rgba(59, 130, 246, 0.13);
        font-size: 0.875rem;
        transition-timing-function: var(--ease-nav-brand);
        margin-block: 0;
        margin-inline: 0.5rem;
        display: flex;
        align-items: center;
        white-space: nowrap;
        border-radius: 0.5rem;
        padding-inline: 1rem;
        font-weight: 600;
        color: #334155;
        transition-property: color;
      }

      .image_content{
        margin-right: 0.5rem;
        display: flex;
        height: 2rem;
        width: 2rem;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        background-position: center;
        stroke: 0;
        text-align: center;

        @media (min-width: 1280px) {
          padding: 0.375rem;
        }
      }

      .text_content{
        margin-left: 0.25rem;
        transition-duration: 300ms;
        opacity: 1;
        pointer-events: none;
        transition-timing-function: ease;
      }
    }

  }

  .admin_content{
    position: relative;
    height: 100%;
    transition: all 200ms ease-in-out;
    border-radius: 0.75rem;

    @media (min-width: 1280px) {
      margin-left: 18rem;
    }
  }
</style>
