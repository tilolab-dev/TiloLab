<template>
  <div
    class="link-block pb-2 border-b-[1px] dark:border-[var(--dark-border-color)] border-[#d9dbe0]"
  >
    <NuxtLink
      to="/"
      class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-normal text-base leading-relaxed"
    >
      Головна
      <span v-if="props.links.length > 0">/</span>
    </NuxtLink>

    <template v-for="link in props.links" :key="link.name">
      <NuxtLink
        v-if="link.name !== props.links[props.links.length - 1].name"
        :to="link.url"
        class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-normal text-base leading-relaxed"
      >
        {{ link.name }}
        <span>/</span>
      </NuxtLink>
      <span
        v-else
        class="text-[var(--dark-color)] dark:text-[var(--dark-font-color)] font-normal text-base leading-relaxed"
      >
        {{ link.name }}
      </span>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="scss">
// @use ".//styles/mixins.scss" as mixins;

.link-block {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
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
