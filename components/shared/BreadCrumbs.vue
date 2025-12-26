<template>
  <div
    class="link-block pb-2 border-b-[1px] dark:border-[var(--dark-border-color)] border-[#d9dbe0]"
  >
    <!-- <SvgIcon 
            name="home-icon" 
            size="small" 
            :fill="iconFill ? 'var(--dark-font-color)' : 'var(--dark-color)' "
        /> -->
    <!-- :to="localePath('/')" -->

    <NuxtLink
      to="/"
      class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-normal text-base leading-relaxed"
    >
      Головна /
    </NuxtLink>
    <!-- <SvgIcon 
            name="arrow-right" 
            size="micro" 
            :fill="iconFill ? 'var(--dark-font-color)' : 'var(--dark-color)' "

        /> -->
    <span
      class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-normal text-base leading-relaxed"
    >
      <slot> </slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
// import SvgIcon from '@/components/shared/SvgIcon.vue';
// import SvgIcon from './SvgIcon.vue';
// import { useThemeStore } from "../../stores/theme-store";
// import { onMounted, watch } from "vue";

// const themeStore = useThemeStore();
// const isClient = ref(false);

// const iconFill = computed(() => {
// if (!isClient.value) return "";
// return themeStore.darkMode
// });

// onMounted(() => {
// isClient.value = true;
// });

// const localePath = useLocalePath();
</script>

<style lang="scss">
// @use ".//styles/mixins.scss" as mixins;

.link-block {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-block: 1rem;
  gap: 7px;
  color: white;
  a {
    color: white;
    font-weight: 500;
    // @include mixins.descriptionText(500, var(--dark-color));
  }
  // span {
  // @include mixins.descriptionText(400, var(--dark-color));
  // }
}
</style>
