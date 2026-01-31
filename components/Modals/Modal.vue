<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <!-- <div class="modal-content max-h-[100vh] overflow-y-auto"> -->
    <slot :open-modal="openModal" :close-modal="closeModal" />
    <component
      :is="modalComponents[currentModal]"
      v-if="currentModal"
      v-bind="modalProps"
      :open-modal="openModal"
      :close-modal="closeModal"
    />
    <!-- @tooltip="tooltip" -->

    <!-- </div> -->
    <!-- v-bind="{...modalProps}" -->
  </div>
</template>

<script setup>
import { useModalStore } from "@/store/modal-store";

import AuthModal from "./AuthModal.vue";
import CartModal from "./CartModal.vue";
import WishlistModal from "../WishlistModal.vue";
import BurgerMenu from "./BurgerMenu.vue";
import LogOut from "./LogOut.vue";
import VerifyAgeModal from "./VerifyAgeModal.vue";

// ADMIN

import AddProduct from "@/components/Modals/admin/AddProduct.vue";
import AddCategory from "@/components/Modals/admin/AddCategory.vue";
import UpdateProduct from "./admin/UpdateProduct.vue";
import UpdateCategory from "./admin/UpdateCategory.vue";
import DeleteCategory from "@/components/Modals/admin/DeleteCategory.vue";
import DeleteProduct from "./admin/DeleteProduct.vue";
import OrderDetails from "./admin/OrderDetails.vue";

const modalStore = useModalStore();
const isVisible = computed(() => modalStore.isVisible);
const currentModal = computed(() => modalStore.currentModal);
const modalProps = computed(() => modalStore.modalProps);

// const emit = defineEmits(["addNewItem", "tooltip"]);

const modalComponents = {
  CartModal,
  WishlistModal,
  AddProduct,
  AddCategory,
  DeleteCategory,
  DeleteProduct,
  UpdateProduct,
  UpdateCategory,
  OrderDetails,
  //   ProductToCart,
  AuthModal,
  BurgerMenu,
  LogOut,
  VerifyAgeModal
  //   ChangeUserData
};

// const tooltip = (obj) => {
//   emit("tooltip", obj);
// };

const closeModal = () => {
  modalStore.closeModal();
};

const openModal = (modalName, props = {}) => {
  document.body.style.overflow = "hidden";
  console.log(modalName, props);
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
  backdrop-filter: blur(2px);
  transition: all ease 0.3s;
  display: flex;
  justify-content: center;
  align-items: stretch;
  z-index: 1000;
  overflow-y: scroll;
  padding-top: 300px;
}
/* .modal-content { */

/* width: 100%; */
/* height: 100%; */

/* position: fixed;
  top: 30%;
  transform: translateY(-50%);
  background: white; */
/* padding: 20px; */
/* border-radius: 10px;
  overflow-x: hidden;
  height: fit-content; */
/* min-height: 500px; */
/* position: relative;
  overflow: hidden; */
/* } */
</style>
