<template>
  <div :class="`tooltip border-b-4 p-4 ${tooltipStyle}`">
    <div class="text-wrapper">
      <p class="font-bold">{{ tooltipType }}</p>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const tooltipStyle = ref("");
const tooltipType = ref("");

const props = defineProps({
  tooltipStatus: {
    type: String,
    default: "success"
  }
});

const setTooltip = (type) => {
  switch (type) {
    case "success":
      tooltipStyle.value = "bg-green-200 border-green-600 text-green-600";
      break;
    case "info":
      tooltipStyle.value = "bg-blue-200 border-blue-600 text-blue-600";
      break;
    case "warning":
      tooltipStyle.value = "bg-yellow-200 border-yellow-600 text-yellow-600";
      break;
    case "error":
      tooltipStyle.value = "bg-red-200 border-red-600 text-red-600";
      break;
    default:
      tooltipType.value = "Повідомлення";
      tooltipStyle.value = "bg-blue-200 border-blue-600 text-blue-600";
      break;
  }
};

onMounted(() => {
  tooltipType.value = props.tooltipStatus;
  setTooltip(props.tooltipStatus);
});
</script>

<style lang="scss">
.tooltip {
  height: fit-content;
  width: 100%;
  text-align: center;
  position: fixed;
  // padding-left: 250px;
  top: 20px;
  right: 0;
  animation: tooltipAnimation 5s ease-in-out forwards;
  z-index: 1010;
}

@keyframes tooltipAnimation {
  0% {
    top: -100%;
    opacity: 0;
  }
  10% {
    top: 0;
    opacity: 1;
  }
  90% {
    top: 0;
    opacity: 1;
  }
  100% {
    top: -100%;
    opacity: 0;
  }
}
</style>
