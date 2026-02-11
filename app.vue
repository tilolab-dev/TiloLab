<template>
  <!-- <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div> -->
  <NuxtLayout>
    <div v-if="isLoading" ref="loaderRef" class="prealoader">
      <div class="content_wrapper">
        <div class="prealoader_title">Tilo Lab</div>
        <SharedLoader />
      </div>
    </div>

    <NuxtPage />
    <SharedIconLibrary />
  </NuxtLayout>
</template>

<script setup>
import { useModalStore } from "./store/modal-store";
import { ref, onMounted, nextTick } from "vue";

const loaderRef = ref(null);
const isLoading = ref(true);

const modalStore = useModalStore();

onMounted(async () => {
  const { gsap } = await import("gsap");
  const ageVerified = useCookie("age_verified");

  await document.fonts.ready;

  if (document.readyState !== "complete") {
    await new Promise((resolve) => window.addEventListener("load", resolve));
  }

  await nextTick();

  if (ageVerified) {
    gsap.to(loaderRef.value, {
      opacity: 0,
      duration: 0.8,
      onComplete: () => {
        isLoading.value = false;
        if (!ageVerified.value) {
          modalStore.showModal("VerifyAgeModal");
        }
      }
    });
  }
});
</script>

<style lang="scss">
.prealoader {
  position: fixed;
  inset: 0;
  background: rgb(13, 12, 13);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  display: flex;
  .content_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: white;
    flex-wrap: nowrap;
  }
  &_title {
    flex: 1;
    white-space: nowrap;
    font-weight: 500;
    font-size: 3rem;
    font-family: "Montserrat", sans-serif;
  }
}
</style>
