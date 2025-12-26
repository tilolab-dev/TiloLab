<template>
  <div class="auth_page">
    <SharedLoader />
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  navigateTo("/auth/login");
});
</script>

<style lang="scss">
.auth_page {
  width: 100%;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
