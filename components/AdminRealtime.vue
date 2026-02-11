<template>
  <div class="admin_realtime">
    <div class="admin_realtime_box">
      <div v-for="(item, i) in props.noteItem" :key="i" class="admin_realtime_box_item">
        <div class="item_content">
          <img src="/icons/order/new-order.webp" alt="icon" />
          <span> Нове замовлення! </span>
        </div>
        <button @click="emit('removeRealtimeItem', item)">
          <CloseIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import CloseIcon from "~/assets/icons/close-icon.svg";

// import { watch } from "vue";

// const noteArray = ref([1, 2, 3, 4]);

// const removeItem = (item) => {
//   noteArray.value = noteArray.value.filter((el) => el !== item);
// };

const emit = defineEmits(["removeRealtimeItem"]);

const props = defineProps({
  noteItem: {
    type: Array,
    default: () => []
  }
});

// console.log(props.noteArray, "props");

// watch(
//   () => props.noteArray,
//   (val) => {
//     console.log(val);
//   }
// );
</script>

<style lang="scss" scoped>
@use "@/style/mixins.scss" as mixins;

.admin_realtime {
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  top: 0;
  left: 0;

  &_box {
    width: 30vw;
    max-height: 80vh;
    height: auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-right: 2vw;
    padding-bottom: 2vh;
    gap: 10px;

    &_item {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(10px);
      padding: 10px 15px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      gap: 50px;
    }
  }

  .item_content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    // z-index: 1;
  }

  span {
    @include mixins.mainText;
    white-space: nowrap;
  }

  img {
    width: 50px;
    height: 50px;
    aspect-ratio: 1 /1;
  }
  button {
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
      stroke: var(--text-grey);
      transition: all ease 0.3s;
    }

    @media screen and (min-width: 1024px) {
      &:hover svg {
        stroke: var(--border-color);
        transition: all ease 0.3s;
      }
    }

    &:active svg {
      stroke: var(--accent-color);
      transition: all ease 0.3s;
    }
  }
}
</style>
