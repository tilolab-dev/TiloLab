<template>
  <div class="layout relative">
    <!-- <AppHeader /> -->
    <StickyHeader />
    <!-- <MobileMenu /> -->
    <!-- <DashBurger class="absolute right-12" @click="mobileCategory()"/> -->

    <main class="main_content">
      <div class="container">
        <div class="search-head">
          <BreadCrumbs :links="breadCrumbLinks" />
        </div>
        <!--MAIN -->
        <div class="search-wrapper">
          <slot />
        </div>
      </div>
    </main>
    <Modal>
      <template #default="{ openModal, closeModal }">
        <component
          :is="currentModal"
          v-bind="modalProps"
          :open-modal="openModal"
          :close-modal="closeModal"
        />
      </template>
    </Modal>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";

import { useModalStore } from "@/store/modal-store";
import { useCookie } from "nuxt/app";

import Modal from "@/components/Modals/Modal.vue";
import BreadCrumbs from "@/components/shared/BreadCrumbs.vue";

const modalStore = useModalStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const route = useRoute();

const breadCrumbLinks = computed(() => {
  const links = [];

  // Handle search pages
  if (route.path.startsWith("/search")) {
    links.push({ name: "Пошук", url: "/search" });
  }

  return links;
});

onMounted(() => {
  // Check if user has already verified their age
  const ageVerified = useCookie("age_verified");
  if (!ageVerified.value) {
    modalStore.showModal("VerifyAgeModal");
  }
});
</script>

<style lang="scss" scoped>
// @use ".//styles/mixins.scss" as mixins;

// @include mixins.mobileBar(1024px);
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: var(--bg-color);
}
.main_content {
  flex: 1;
  width: 95vw;
  height: 100%;
  margin: 0 auto;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.search-head {
  width: 100%;
  margin-top: 42px;
  .link-block {
    margin-bottom: 0;
    margin-top: 0;
    padding-bottom: 0;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 28px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 24px;
  }
  @media screen and (max-width: 480px) {
    margin-top: 16px;
  }
  @media screen and (max-width: 375px) {
    margin-top: 14px;
  }
}
</style>
