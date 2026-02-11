<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div class="layout">
    <!-- <AppHeader />
    <MobileMenu /> -->
    <StickyHeader />

    <main class="border-t border-solid border-[var(--main-accent)]">
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

    <!-- {{ currentModal }} -->
    <!-- <Chat />
     -->
    <AppFooter />
  </div>
</template>

<script setup>
import Modal from "~/components/Modals/Modal.vue";
import StickyHeader from "@/components/StickyHeader.vue";
import Tooltips from "~/components/shared/Tooltips.vue";
import { useModalStore } from "@/store/modal-store";
import { useUserStore } from "@/store/user-store";
// import { useCookie } from "nuxt/app";
// import { useAuthStore } from "@/store/auth-store";
import { onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";

const modalStore = useModalStore();
const userStore = useUserStore();
// const authStore = useAuthStore();
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

const { fetchOrCreateUser } = useAuth();

const showTooltip = ref(false);
const tooltipStatus = ref("");
const tooltipMessage = ref("");

const tooltip = (obj) => {
  const { status, message } = obj;

  tooltipStatus.value = status;
  tooltipMessage.value = message;
  showTooltip.value = true;
  setTimeout(() => {
    showTooltip.value = false;
  }, 3000);
};
// const supabase = useSupabaseClient();

onMounted(async () => {
  // Check if user has already verified their age

  // const ageVerified = useCookie("age_verified");
  // if (!ageVerified.value) {
  // modalStore.showModal("VerifyAgeModal");
  // }
  // await supabase.auth.signOut();

  await fetchOrCreateUser();

  console.log(userStore.isLoggedIn, userStore.user, "log user");

  // if (window.history.replaceState) {
  //   window.history.replaceState({}, document.title, window.location.pathname);
  // }
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
