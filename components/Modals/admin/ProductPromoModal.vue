<template>
  <div class="promo_inner_overlay">
    <div class="promo" @click.self="modalStore.closeModal()">
      <div class="promo_content">
        <div v-if="loaderState" class="loader_content">
          <SharedLoader />
        </div>
        <div class="promo_content_head">
          <button @click="modalStore.closeModal()">
            <CloseIcon />
          </button>
        </div>
        <p class="promo_content_text">Оберіть список в який потрібно додати товар</p>
        <div class="promo_content_btns">
          <button
            class="promo_btn"
            :class="productInPromo ? 'remove_item' : ''"
            @click="addToPromo('promo', productInPromo ? 'delete' : 'update')"
          >
            {{ productInPromo ? "Видалити з промо" : "Вам також сподобається ..." }}
          </button>
          <button
            class="promo_btn"
            :class="productInPopular ? 'remove_item' : ''"
            @click="addToPromo('popular', productInPopular ? 'delete' : 'update')"
          >
            {{ productInPopular ? "Видалити з популярних" : "З цим товаром купляють" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ICONS

import CloseIcon from "@/assets/icons/close-icon.svg";

// IMPORTS

import { useModalStore } from "@/store/modal-store";
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/store/admin-store";
// import { useAuth } from "@/composables/useAuth";

const loaderState = ref(false);

const modalStore = useModalStore();

const adminStore = useAdminStore();

const productInPopular = ref(false);
const productInPromo = ref(false);

const updateItem = () => {
  productInPopular.value = adminStore.popularList.some((el) => el.productId === props.product.id);
  productInPromo.value = adminStore.promotedList.some((el) => el.productId === props.product.id);

  console.log(productInPromo.value, "productInPromo");
  console.log(productInPopular.value, "productInPopular");
};

const addToPromo = async (list, method) => {
  loaderState.value = true;

  if (list === "promo") {
    if (method === "update") {
      await adminStore.updatePromoItem(props.product.id);
    }
    if (method === "delete") {
      await adminStore.deletePromoItem(props.product.id);
    }
  }

  if (list === "popular") {
    if (method === "update") {
      await adminStore.updatePopularItem(props.product.id);
    }
    if (method === "delete") {
      await adminStore.deletePopularItem(props.product.id);
    }
  }

  updateItem();
  loaderState.value = false;
  //   modalStore.closeModal();
};

const props = defineProps({
  product: Object
});

onMounted(async () => {
  loaderState.value = true;

  await adminStore.getPopularList();

  await adminStore.getPromotedList();

  updateItem();
  //   console.log(productInPromo.value, "productInPromo");
  //   console.log(productInPopular.value, "productInPopular");
  loaderState.value = false;
});
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;
.promo_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.promo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.promo_content {
  background: var(--bg-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  padding: 20px 0 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 40px;

  &_head {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    padding-inline: 20px;
    align-items: center;
    button {
      position: relative;
      width: 20px;
      height: 20px;
    }

    svg {
      width: 100%;
      height: 100%;
      stroke: white;
    }
  }

  &_text {
    padding: 0 60px;

    @include mixins.subtitleText;
    font-size: 1.25rem;
    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.8125rem;
    }
  }

  &_btns {
    @include mixins.mainText;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-inline: 60px;

    border-top: 1px solid rgba(255, 255, 255, 0.1);
    gap: 50px;

    @media screen and (max-width: 1024px) {
      font-size: 1.0625rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 0.875rem;
    }
    @media screen and (max-width: 375px) {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 36px 52px;
  }

  @media screen and (max-width: 480px) {
    padding: 32px 52px;
  }
  @media screen and (max-width: 375px) {
    padding: 24px 18px;
  }
}
.loader_content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);

  .loader {
    width: 100%;
    height: 100%;
  }
}
.promo_btn {
  cursor: pointer;
  transition: all ease 0.3s;
  color: var(--text-color);
  border: 1px solid var(--accent-color);
  padding: 10px 15px;
  border-radius: 5px;
  @media screen and (min-width: 1024px) {
    &:hover {
      transition: all ease 0.3s;
      color: var(--accent-color);
    }
  }
}
.remove_item {
  border: 1px solid var(--accent-red);
  background: var(--error-bg);
  @media screen and (min-width: 1024px) {
    &:hover {
      transition: all ease 0.3s;
      color: var(--accent-red);
    }
  }
}
</style>
