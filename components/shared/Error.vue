<template>
  <div class="error" @click.self="emit('close')">
    <div class="error_content">
      <div class="error_wrapper">
        <div class="close_button_wrapper">
          <button @click="emit('close')">
            <CloseIcon />
          </button>
        </div>
        <h2 class="error_title">
          <slot name="title"></slot>
          <!-- <strong> {{ modalProps.product.translations[0].title }}. </strong> -->
        </h2>

        <div class="error_note">
          <div class="error_note_wrapper">
            <div class="error_icon">
              <ErrorIcon />
            </div>
            <div class="text_note">
              <p>
                <slot name="text1"></slot> <br />
                <slot name="text2"></slot>
              </p>
            </div>
          </div>
        </div>

        <div class="button_wrapper">
          <button class="delete_btn" @click="emit('confirm')">Так</button>
          <button class="cancel_btn" @click="emit('close')">Скасувати</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useProductStore } from "@store/product-store";
import CloseIcon from "~/assets/icons/close-icon.svg";
import ErrorIcon from "~/assets/icons/error.svg";

const emit = defineEmits(["close", "confirm"]);
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.error {
  @include mixins.ErrorModal;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  backdrop-filter: blur(7px);
  background: rgba(0, 0, 0, 0.35);
}
</style>
