<template>
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content max-h-[100vh] overflow-y-auto">
        <slot :openModal="openModal" :closeModal="closeModal" />
        <component
          v-if="currentModal"
          :is="modalComponents[currentModal]"
          v-bind="modalProps"
          :openModal="openModal"
          :closeModal="closeModal"
          @tooltip="tooltip"
        />
      </div>
      <!-- v-bind="{...modalProps}" -->
    </div>
  </template>

<script setup>
import { defineEmits, defineProps, toRefs} from 'vue';
import { useModalStore } from '@/store/modal-store';

// import LangModal from '~/components/Modals/LangModal.vue';
// import ThemeModal from '~/components/Modals/ThemeModal.vue';
// import ProductToCart from './ProductToCart.vue';
import AuthModal from './AuthModal.vue';
// import ChangeUserData from './ChangeUserData.vue';

// ADMIN

// import AddProduct from '~/components/Modals/admin/AddProduct.vue';
// import AddCategory from '~/components/Modals/admin/AddCategory.vue';
// import DeleteCategory from '~/components/Modals/admin/DeleteCategory.vue'

const modalStore = useModalStore();
const isVisible = computed(() => modalStore.isVisible);
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);


const emit = defineEmits(['addNewItem', 'tooltip']);

const modalComponents = {
//   LangModal,
//   ThemeModal,
//   AddProduct,
//   AddCategory,
//   DeleteCategory,
//   ProductToCart,
  AuthModal,
//   ChangeUserData
}

const tooltip = (obj) => {
        emit('tooltip', obj);

    };

const closeModal = () => {
  modalStore.closeModal();
};


const openModal = (modalName, props = {}) => {
  document.body.style.overflow = "hidden";
};



</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  /* padding: 20px; */
  border-radius: 10px;
  overflow-x: hidden;
}
</style>