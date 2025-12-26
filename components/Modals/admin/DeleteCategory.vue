<template>
  <div class="delete-category flex flex-col justify-between items-stretch gap-5 relative">
    <div class="top-block flex justify-end items-center">
      <button @click="modalStore.closeModal()">
        <!-- <SvgIcon name="close-btn" size="micro" fill="var(--dark-color)"/> -->
      </button>
    </div>
    <div class="text-modal w-4/5">
      <span class="text-[var(--dark-color)]">
        Ви впевнені що хочете видалити категорію "{{ props.categoryName }}"?
      </span>
    </div>
    <div class="button-group flex items-center justify-end gap-3">
      <button
        class="flex items-center justify-center bg-[var(--bg-color)] text-[var(--dark-color)] px-2 py-1 rounded-lg"
      >
        Вімінити
      </button>

      <button
        class="flex items-center justify-center bg-[var(--dark-color)] text-white px-2 py-1 rounded-lg"
        @click="deleteCategory"
      >
        Видалити
      </button>
    </div>
  </div>
</template>

<script setup>
// import SvgIcon from '@/components/shared/SvgIcon.vue';
import { useModalStore } from "@/store/modal-store";

const modalStore = useModalStore();

const props = defineProps({
  categoryId: {
    type: Number,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  }
});

const deleteCategory = async () => {
  try {
    const deleteCatResponse = await $fetch("/api/category", {
      method: "DELETE",
      body: {
        id: props.categoryId,
        name: props.categoryName
      }
    });

    console.log(deleteCatResponse, "readBody");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped lang="scss"></style>
