<!-- eslint-disable vue/v-on-event-hyphenation -->
<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="admin_layout">
    <div class="admin_head_bg"></div>
    <aside
      class="admin_sidebar"
      :aria-expanded="isSidebarOpen"
      :class="{
        '-translate-x-full z-50': !isSidebarOpen,
        'translate-x-4 z-50': isSidebarOpen
      }"
    >
      <div class="sidebar_main">
        <div class="sidebar_top">
          <div class="sidebar_top_content" target="_blank">
            <div class="logo">
              Tilo <br />
              Lab
            </div>
            <div class="title_wrapper">
              <span class="title_accent"> Панель керування </span>
              <span> https://www.tilo-lab.com.ua </span>
            </div>
          </div>
        </div>

        <div class="sidebar_links">
          <ul class="sidebar_links_wrapper">
            <li
              v-for="item in firstLinks"
              :key="item.id"
              class="sidebar_links_item"
              @click="closeSidebar"
            >
              <NuxtLink :to="item.linkPath">
                <div class="item_wrapper" :class="{ item_wrapper_active: isActive(item) }">
                  <!-- :class="activePage === item.activePage ? 'item_wrapper_active' : ''" -->

                  <div class="image_content">
                    <div v-if="item.activePin" class="active_pin"></div>
                    <component :is="item.componentName" />
                  </div>
                  <span class="text_content">
                    {{ item.title }}
                  </span>
                </div>
              </NuxtLink>
            </li>

            <li class="divider_item">
              <h6 class="divider_item_text">Керування магазином</h6>
            </li>

            <li
              v-for="item in remainingLinks"
              :key="item.id"
              class="sidebar_links_item"
              @click="closeSidebar()"
            >
              <NuxtLink :to="item.linkPath">
                <div class="item_wrapper" :class="{ item_wrapper_active: isActive(item) }">
                  <div class="image_content">
                    <div v-if="item.activePin" class="active_pin"></div>

                    <component :is="item.componentName" />
                  </div>
                  <span class="text_content">
                    {{ item.title }}
                  </span>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="logout_wrapper">
        <!-- TESTING TOOLTIP -->

        <!-- <button
          class="logout_btn"
          style="margin-bottom: 10px"
          @click="tooltip({ status: 'error', message: 'tooltip was error' })"
        >
          Tooltip
        </button> -->

        <button class="logout_btn" @click="exitHandler">Вийти</button>
      </div>
    </aside>

    <main class="admin_content">
      <div class="mobile-burger py-2">
        <button class="mobile-burger-btn" @click="isSidebarOpen = !isSidebarOpen">
          <div class="top"></div>
          <div class="middle"></div>
          <div class="bottom"></div>
        </button>
      </div>

      <slot />
    </main>
    <Tooltips v-if="showTooltip" :tooltipStatus="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips>
    <Modal @tooltip="tooltip">
      <template #default="{ openModal, closeModal }">
        <component
          :is="currentModal"
          v-bind="modalProps"
          :open-modal="openModal"
          :close-modal="closeModal"
        />
      </template>
    </Modal>
    <AdminRealtime
      v-if="realtimeNote.length > 0"
      :noteItem="realtimeNote"
      @removeRealtimeItem="(item) => removeRealTimeItem(item)"
    />
  </div>
</template>

<script setup>
// ICONS
import AdminHome from "~/assets/icons/admin-home.svg";
import AdminAnalytics from "~/assets/icons/admin-analytics.svg";
import AdminPayments from "~/assets/icons/admin-payments.svg";
import AdminUsers from "~/assets/icons/admin-users.svg";
import AdminOrders from "~/assets/icons/admin-orders.svg";
import AdminProducts from "~/assets/icons/admin-products.svg";
import AdminNotifications from "~/assets/icons/admin-notifications.svg";
import AdminSettings from "~/assets/icons/admin-settings.svg";
import AdminRealtime from "@/components/AdminRealtime.vue";

import { useAdminStore } from "@/store/admin-store";
import { useOrderRealtime } from "@/composables/useOrderRealtime";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import Modal from "~/components/Modals/Modal.vue";
import Tooltips from "~/components/shared/Tooltips.vue";
import { useModalStore } from "@/store/modal-store";

// useIndexStore
import { useIndexStore } from "@/store/index-store";
// import { useOrdersStore } from "@/store/orders-store";
import { markRaw } from "vue";
import { useRoute } from "vue-router";

const adminStore = useAdminStore();
// const ordersStore = useOrdersStore();

const realtimeNote = ref([]);
const realtimeId = ref(0);

const linksData = ref([
  {
    id: 1,
    activePage: "index",
    activePin: false,
    title: "Головна",
    linkPath: "/admin",
    componentName: markRaw(AdminHome)
  },
  {
    id: 2,
    activePage: "analytics",
    activePin: false,
    title: "Аналітика",
    linkPath: "/admin/analytics",
    componentName: markRaw(AdminAnalytics)
  },
  {
    id: 3,
    activePage: "buyers",
    activePin: false,
    title: "Покупці",
    linkPath: "/admin/buyers",
    componentName: markRaw(AdminUsers)
  },
  {
    id: 4,
    activePage: "notifications",
    activePin: computed(() => adminStore.hasUnread),
    title: "Повідомлення",
    linkPath: "/admin/notifications",
    componentName: markRaw(AdminNotifications)
  },
  {
    id: 5,
    activePage: "orders",
    activePin: false,
    title: "Замовлення",
    linkPath: "/admin/orders",
    componentName: markRaw(AdminOrders)
  },
  {
    id: 6,
    activePage: "payment",
    activePin: false,
    title: "Оплата",
    linkPath: "/admin/payments",
    componentName: markRaw(AdminPayments)
  },
  {
    id: 7,
    activePage: "products",
    activePin: false,
    title: "Товари",
    linkPath: "/admin/products",
    componentName: markRaw(AdminProducts)
  },
  {
    id: 8,
    activePage: "settings",
    activePin: false,
    title: "Налаштування",
    linkPath: "/admin/settings",
    componentName: markRaw(AdminSettings)
  }
]);

const firstLinks = computed(() => linksData.value.slice(0, 4));
const remainingLinks = computed(() => linksData.value.slice(4));

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");
const isSidebarOpen = ref(true);
// const isUnreadedNotifications = ref(false);

const modalStore = useModalStore();
const indexStore = useIndexStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const route = useRoute();

let audio = null;
let audioUnlocked = false;

let unsubscribe = null;
let unlock = null;

const initAudio = () => {
  if (audioUnlocked) return;

  audio = new window.Audio("/sounds/notification.mp3");
  audio.volume = 1;
  audioUnlocked = true;
};

const isActive = (item) => {
  if (item.linkPath === "/admin") {
    return route.path === "/admin";
  }
  return route.path === item.linkPath || route.path.startsWith(item.linkPath + "/");
};

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 4000);
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

const exitHandler = async () => {
  const resExit = await adminStore.clearAdminRole();

  if (resExit) {
    navigateTo("/");
  }
};

const updateNotifications = async () => {
  await adminStore.getNotes();

  // isUnreadedNotifications.value = adminStore.notifications.some((el) => !el.isReaded);

  // console.log(isUnreadedNotifications.value, "isUnreaded");
};
const playSound = async () => {
  if (!audioUnlocked || !audio) return;

  await updateNotifications();

  audio.currentTime = 0;
  audio.play().catch(() => {});
};

const toggleRealtime = () => {
  initAudio();
  realtimeId.value++;
  realtimeNote.value.push(realtimeId.value);
  playSound();
};

const removeRealTimeItem = (item) => {
  console.log(item);
  realtimeNote.value = realtimeNote.value.filter((el) => el !== item);
};

// onMounted(async () => {
//   const unlock = () => {
//     initAudio();
//     document.removeEventListener("click", unlock);
//   };

//   document.addEventListener("click", unlock);

//   const unsubscribe = useOrderRealtime(() => {
//     toggleRealtime();
//   });

//   await adminStore.getNotes();

//   await updateNotifications();

//   onBeforeUnmount(() => {
//     unsubscribe();
//     document.removeEventListener("click", unlock);
//   });
// });
onMounted(async () => {
  await updateNotifications();

  unlock = () => {
    initAudio();
    document.removeEventListener("click", unlock);
  };

  document.addEventListener("click", unlock);

  unsubscribe = useOrderRealtime(() => {
    toggleRealtime();
  });
});

onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe();
  if (unlock) document.removeEventListener("click", unlock);
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.admin_layout {
  margin: 0;
  font-family: var(--font-sans, ui-sans-serif, system-ui);
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
  line-height: 1.5;
  background-color: var(--bg-color);
  color: var(--text-color);
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  // Dark mode
  //   @media (prefers-color-scheme: dark) {
  //     background-color: var(--dark-component-color);
  //     color: #94a3b8;
  // }
  &_container {
    width: 95%;
    height: 100%;
    margin: 0 auto;
  }
  .title_page {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0 20px;
    h1 {
      @include mixins.titleText;
    }
  }
}

.admin_head_bg {
  position: absolute;
  width: 100%;
  // background-color: lightgray;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.75) 100%),
    url("../public/images/index-img/banner.webp") lightgray 50% / cover no-repeat;
  min-height: 18rem;
  background-position-y: 45%;

  // @media (prefers-color-scheme: dark) {
  //   background-color: var(--main-dark-color);
  // }
}

.admin_sidebar {
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
  background-color: rgba(45, 25, 35, 0.45);
  border: 1px solid rgba(255, 134, 187, 0.15);
  // border: 0;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 16rem;
  transition-timing-function: var(--ease-nav-brand);
  backdrop-filter: blur(10px);
  z-index: 990;
  border-radius: 1rem;

  &[aria-expanded="true"] {
    transform: translateX(0);
    margin-left: 1.5vw;
  }

  @media (min-width: 1280px) {
    margin-left: 1.5rem;
    left: 0;
    transform: translateX(0);
  }

  .sidebar_main {
    width: 100%;
    height: auto;
  }

  .sidebar_top {
    height: auto;
    border-bottom: 2px solid rgba(255, 169, 214, 0.3);

    &_content {
      padding-inline: 5px;
      padding-block: 15px;
      margin: 0;
      font-size: 0.875rem;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      .logo {
        background: var(--bg-color);
        border-radius: 50%;
        @include mixins.mainText;
        font-size: 0.8rem;
        border: 1px solid rgba(255, 134, 187, 0.15);
        line-height: 1;
        padding: 10px;
      }

      .title_wrapper {
        margin-left: 0.25rem;
        display: flex;
        flex-direction: column;
        align-items: baseline;

        .title_accent {
          font-weight: 600;
          transition: all 200ms;
          transition-timing-function: var(--ease-nav-brand);
        }
      }
    }
  }
  hr {
    color: var(--border-color);
  }
  .sidebar_links {
    display: block;
    align-items: center;
    width: auto;
    max-height: 100vh;
    /* overflow: auto; */
    height: var(--h-sidenav);
    flex-grow: 1;
    flex-basis: 100%;
    padding-block: 0.5rem;

    &_wrapper {
      display: flex;
      flex-direction: column;
      padding-left: 0;
      margin-bottom: 0;
    }

    &_item {
      margin-top: 0.125rem;
      cursor: pointer;

      width: 100%;
    }

    .divider_item {
      width: 100%;
      margin-block: 1rem;

      &_text {
        padding-left: 1.5rem;
        margin-left: 0.5rem;
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 1.25;
        text-transform: uppercase;
      }
    }

    .item_wrapper {
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

    .image_content {
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
      fill: var(--accent-grey);
      transition: all ease 0.3s;
      position: relative;

      svg {
        width: clamp(17px, 3vw, 20px);
        height: clamp(17px, 3vw, 20px);
        aspect-ratio: 1 / 1;
      }

      @media (min-width: 1280px) {
        padding: 0.375rem;
      }
    }

    .active_pin {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      background: var(--accent-red);
      top: 0;
      right: 0;
    }

    .text_content {
      margin-left: 0.25rem;
      transition-duration: 300ms;
      opacity: 1;
      pointer-events: none;
      transition-timing-function: ease;
      color: var(--dark-text);
    }

    .item_wrapper_active {
      background-color: var(--bg-color);
      .image_content {
        fill: var(--accent-red);
        transition: all ease 0.3s;
      }
      .text_content {
        color: var(--text-grey);
      }
    }
  }
}

.admin_content {
  position: relative;
  height: 100%;
  transition: all 200ms ease-in-out;
  border-radius: 0.75rem;
  padding-top: 50px;

  @media (min-width: 1280px) {
    margin-left: 18rem;
    padding-top: 0;
  }
}
.logout_wrapper {
  width: 100%;
  height: auto;
  padding-inline: 0.5rem;
  margin-bottom: 10px;
}
.logout_btn {
  @include mixins.transparentBtn;
  background: var(--bg-color);
  font-size: 0.8rem;
}

.mobile-burger {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;

  &-btn {
    background-color: var(--light-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 1.3rem;
    height: 2rem;
  }

  .top {
    width: 100%;
    height: 0.125rem;
    background-color: var(--dark-text);
    margin: 0.125rem 0;
    border-radius: 0.125rem;
    transition: all 0.3s ease;
  }

  .middle {
    width: 100%;
    height: 0.125rem;
    background-color: var(--dark-text);
    margin: 0.125rem 0;
    border-radius: 0.125rem;
    transition: all 0.3s ease;
  }

  .bottom {
    width: 100%;
    height: 0.125rem;
    background-color: var(--dark-text);
    margin: 0.125rem 0;
    border-radius: 0.125rem;
    transition: all 0.3s ease;
  }

  @media (max-width: 1279px) {
    display: block;
  }
}
</style>
