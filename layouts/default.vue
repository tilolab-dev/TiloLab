<template>
  <div class="layout">
    <!-- <AppHeader />
    <MobileMenu /> -->
    <StickyHeader />

    <main class="border-t border-solid border-[var(--main-accent)]">
      <slot />
    </main>
    <!-- <Tooltips v-if="showTooltip" :tooltipStatus="tooltipStatus">
      {{ tooltipMessage }}
    </Tooltips> -->
    <!-- <Modal @tooltip="tooltip"> -->

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
    <!-- <Chat />
     -->
    <AppFooter />
  </div>
</template>

<script setup>
import Modal from "~/components/Modals/Modal.vue";
import StickyHeader from "@/components/StickyHeader.vue";
// import Tooltips from "~/components/shared/Tooltips.vue";
import { useModalStore } from "@/store/modal-store";
import { useCookie } from "nuxt/app";
// import { useAuthStore } from "@/store/auth-store";
import { onMounted } from "vue";

const modalStore = useModalStore();
// const authStore = useAuthStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

// const showTooltip = ref(false);
// const tooltipStatus = ref("");
// const tooltipMessage = ref("");

// const tooltip = (obj) => {
//   const { status, message } = obj;

//   tooltipStatus.value = status;
//   tooltipMessage.value = message;
//   showTooltip.value = true;
//   setTimeout(() => {
//     showTooltip.value = false;
//   }, 3000);
// };

onMounted(() => {
  // Check if user has already verified their age
  const ageVerified = useCookie("age_verified");
  if (!ageVerified.value) {
    modalStore.showModal("VerifyAgeModal");
  }

  // modalStore.showModal("QuestionnaireModal");
});
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color);
}
main {
  flex: 1;
}
</style>
