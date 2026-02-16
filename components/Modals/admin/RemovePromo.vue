<template>
  <div class="remove_promo_inner_overlay" @click.self="modalStore.closeModal()">
    <div class="remove_promo">
      <div class="remove_promo_content">
        <p class="remove_promo_content_text">Ви впевнені, що хочете видалити продукт</p>
        <div class="remove_promo_content_btns">
          <button class="remove_promo_btn" @click="removeProduct(listName, props.product.id)">
            Так
          </button>
          <button class="remove_promo_btn" @click="modalStore.closeModal()">Скасувати</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/store/modal-store";
import { useAdminStore } from "@/store/admin-store";
import { onMounted } from "vue";

const modalStore = useModalStore();
const adminStore = useAdminStore();

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  listName: {
    type: String,
    required: true
  }
});

const removeProduct = async (list, id) => {
  if (list === "popular") {
    await adminStore.deletePopularItem(id);
    alert("Товар успішно видалено");
    modalStore.closeModal();
  }

  if (list === "promoted") {
    await adminStore.deletePromoItem(id);
    alert("Товар успішно видалено");
    modalStore.closeModal();
  }
};

onMounted(() => {
  console.log(props, "props");
});
</script>

<style lang="scss">
@use "@/style/mixins.scss" as mixins;
.remove_promo_inner_overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.remove_promo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.remove_promo_content {
  background: var(--bg-color);
  padding: 40px 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  &_text {
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
.remove_promo_btn {
  cursor: pointer;
  transition: all ease 0.3s;
  color: var(--text-color);
  @media screen and (min-width: 1024px) {
    &:hover {
      transition: all ease 0.3s;
      color: var(--accent-color);
    }
  }
}
</style>
