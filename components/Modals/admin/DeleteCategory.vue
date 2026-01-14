<template>
  <div class="delete_category_content">
    <div v-if="loaderState" class="loader_content">
      <SharedLoader />
    </div>
    <div class="delete_category_wrapper">
      <div class="close_button_wrapper">
        <button @click="modalStore.closeModal">
          <CloseIcon />
        </button>
      </div>
      <h2 class="delete_category_title">
        Підтвердіть видалення категоріі !
        <strong> {{ modalProps.category.translations[0].title }}. </strong>
      </h2>

      <div class="delete_note">
        <div class="delete_note_wrapper">
          <div class="error_icon">
            <ErrorIcon />
          </div>
          <div class="text_note">
            <p>
              Категорію буде видалена без можливості відновлення. <br />
              Ви впевнені, що хочете видалити категорію?
            </p>
          </div>
        </div>
      </div>

      <div class="button_wrapper">
        <button class="delete_btn" @click="deleteCategory(modalProps.category)">Так</button>

        <button class="cancel_btn" @click="modalStore.closeModal">Скасувати</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from "~/assets/icons/close-icon.svg";
import ErrorIcon from "~/assets/icons/error.svg";
import { ref } from "vue";

import { useModalStore } from "@/store/modal-store";
import { useCategoryStore } from "@/store/category-store";

const modalStore = useModalStore();
const categoryStore = useCategoryStore();

const loaderState = ref(false);

const modalProps = defineProps({
  category: {
    type: Object,
    required: true
  }
});

const deleteCategory = async (category) => {
  loaderState.value = true;
  await categoryStore.deleteCategory(category);
  loaderState.value = false;
  modalStore.closeModal();
};
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;

.delete_category_content {
  position: fixed;
  top: 30%;
  transform: translateY(-50%);
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  max-width: 50vw;
  border-radius: 10px;
  overflow-x: hidden;
  height: fit-content;
  position: relative;
  overflow: hidden;
  .loader_content {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(7px);
  }
}

.delete_note {
  width: 100%;
  height: auto;
  padding-block: 15px;
  background: var(--error-bg);
  border-top: 1px solid var(--error-border);
  border-bottom: 1px solid var(--error-border);

  &_wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    padding-inline: 10px;
    margin-bottom: 10px;
  }

  .error_icon {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(214, 34, 34);
    border-radius: 3px;
    svg {
      width: 100%;
      height: 100%;
      padding: 3px;
    }
  }
}

.delete_category_wrapper {
  padding-block: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;

  .delete_category_title {
    width: 100%;
    @include mixins.subtitleText;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-grey);
    padding-inline: 10px;
    strong {
      font-weight: 900;
      color: var(--accent-red);
      text-decoration: underline;
    }
  }

  .close_button_wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    width: 100%;
    button {
      width: 15px;
      height: 15px;
      background: transparent;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 100%;
        height: 100%;
        stroke: var(--text-grey);
        transition: all ease 0.3s;
      }
      @media screen and (min-width: 1024px) {
        &:hover {
          svg {
            transition: all ease 0.3s;
            stroke: var(--error-border);
          }
        }
      }
      @media screen and (max-width: 1024px) {
        & {
          svg {
            stroke: var(--error-border);
          }
        }
      }
    }
  }

  .button_wrapper {
    display: flex;
    justify-content: center;
    padding-inline: 10px;
    margin-top: 15px;
    align-items: center;
    width: 100%;
    height: auto;
    gap: 10px;

    .delete_btn {
      background: var(--error-btn);
      border: 1px solid var(--error-border);
      transition: all ease 0.3s;
      border-radius: 3px;

      @media screen and (min-width: 1024px) {
        &:hover {
          background: var(--error-btn-hover);
          border: 1px solid var(--error-border);
          transition: all ease 0.3s;
        }
      }
    }

    .cancel_btn {
      border: 1px solid var(--dark-text);
      border-radius: 3px;
      @media screen and (min-width: 1024px) {
        &:hover {
          background: var(--btn-color);
          border: 1px solid var(--border-color);
          transition: all ease 0.3s;
        }
      }
    }

    button {
      flex: 1;
      @include mixins.mainText;
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
</style>
