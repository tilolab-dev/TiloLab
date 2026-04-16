<template>
  <div class="edit_option_layout" @click.self="emit('cancel-changes')">
    <div class="edit_option_content">
      <div class="head">
        <h1>Edit option</h1>

        <button @click="emit('cancel-changes')">
          <SvgIcon name="close-btn" size="micro" fill="var(--text-color)" />
        </button>
      </div>

      <div class="middle">
        <div class="option_img">
          <div class="img_wrapper">
            <img :src="option.optionImg" alt="img" />
            <button>
              <SvgIcon name="close-btn" size="micro" fill="var(--text-color)" />
            </button>
          </div>
        </div>
        <div class="option_stock">
          <div class="option_wrapper">
            <div class="info">
              <p>Залишок:</p>
              <div class="stock">{{ option.optionStock }}</div>
            </div>
            <button @click="editStockState = !editStockState">
              <EditIcon v-if="!editStockState" class="edit-btn" />
              <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
            </button>
          </div>
          <div v-if="editStockState" class="option_wrapper">
            <input v-model="newStock" type="number" />
          </div>
        </div>
        <div class="option_price">
          <div class="option_wrapper">
            <div class="info">
              <p>Ціна:</p>
              <div class="price">{{ option.optionPrice }} UAH</div>
            </div>
            <button @click="editPriceState = !editPriceState">
              <EditIcon v-if="!editPriceState" class="edit-btn" />
              <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
            </button>
          </div>

          <div v-if="editPriceState" class="option_wrapper">
            <input v-model="newPrice" type="number" />
          </div>
        </div>
        <div class="option_description">
          <div class="option_wrapper">
            <div class="info">
              <p>Опис:</p>
              <div class="description">
                {{ option.translations[0].optionInfo }}
              </div>
            </div>

            <button @click="editDescriptionState = !editDescriptionState">
              <EditIcon v-if="!editDescriptionState" class="edit-btn" />
              <SvgIcon v-else name="close-btn" size="micro" fill="var(--error-border)" />
            </button>
          </div>

          <div v-if="editDescriptionState" class="option_wrapper">
            <input v-model="newDescription" type="text" />
          </div>
        </div>
      </div>

      <div class="bottom">
        <button class="cancel-btn" @click="emit('cancel-changes')">Скасувати</button>
        <!-- emit('save-option') -->
        <button class="agree-btn" @click="saveOption">Зберегти</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits, defineProps } from "vue";
import SvgIcon from "@/components/shared/SvgIcon.vue";
import EditIcon from "~/assets/icons/edit-btn.svg";

const optionElem = ref(null);

const editPriceState = ref(false);
const editStockState = ref(false);
const editDescriptionState = ref(false);

const newPrice = ref(null);
const newStock = ref(null);
const newDescription = ref(null);
// const newImg = ref('');

const emit = defineEmits(["save-option", "cancel-changes"]);
const props = defineProps({
  option: {
    type: Object,
    require: true
  }
});

const saveOption = () => {
  console.log(newPrice.value, newStock.value, newDescription.value, "save option");
  const finalPrice = newPrice.value === null ? props.option.optionPrice : newPrice.value;
  const finalStock = newStock.value === null ? props.option.optionStock : newStock.value;
  const finalDescription =
    newDescription.value === null ? props.option.translations[0].optionInfo : newDescription.value;
  emit("save-option", {
    optionId: props.option.id,
    price: finalPrice,
    stock: finalStock,
    description: finalDescription
  });
};

onMounted(() => {
  optionElem.value = false;
  console.log(console.log(props.option));
});
</script>

<style lang="scss" scoped>
.edit_option_layout {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.edit_option_content {
  width: 520px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  background: #121212;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  h1 {
    font-size: 1rem;
    font-weight: 600;
  }

  button {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #1f1f1f;
    border: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;

    &:hover {
      background: #2a2a2a;
    }
  }
}

.middle {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.option_img {
  display: flex;
  justify-content: flex-start;

  .img_wrapper {
    position: relative;

    img {
      width: 90px;
      height: 90px;
      border-radius: 10px;
      object-fit: cover;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    button {
      position: absolute;
      top: -6px;
      right: -6px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #1f1f1f;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background: #2a2a2a;
      }
    }
  }
}

.option_stock,
.option_price,
.option_description {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all ease 0.3s;
}

.option_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    font-size: 0.75rem;
    color: #888;
  }
}

.stock,
.price,
.description {
  font-size: 0.9rem;
  font-weight: 600;
}

.option_wrapper button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #252525;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 3px;

  &:hover {
    background: #303030;
  }
}

.option_wrapper .edit-btn {
  fill: var(--warning-border);
}

input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  color: #fff;
  font-size: 0.8rem;

  &:focus {
    outline: none;
    border-color: transparent;
  }
}

.bottom {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.bottom button {
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.cancel-btn {
  background: #3a1f1f;
  color: #ffb4b4;

  &:hover {
    background: #4a2626;
  }
}

.agree-btn {
  background: #1f3a2a;
  color: #86efac;

  &:hover {
    background: #275033;
  }
}

.edit_option_content::-webkit-scrollbar {
  width: 6px;
}

.edit_option_content::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
</style>
