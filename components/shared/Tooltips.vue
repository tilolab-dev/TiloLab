<template>
  <div :class="`tooltip ${tooltipStyle}`">
    <div class="tooltip_content_wrapper">
      <div class="status_wrapper">
        <component :is="tooltipIcon" v-if="tooltipIcon" />
        <p class="">{{ tooltipName }}</p>
      </div>
      <div class="text_wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, markRaw } from "vue";
import SuccessIcon from "~/assets/icons/success.svg";
import WarningIcon from "~/assets/icons/warning.svg";
import DangerIcon from "~/assets/icons/danger.svg";

const props = defineProps({
  tooltipStatus: {
    type: String,
    default: "success"
  }
});

const tooltipName = computed(() => {
  switch (props.tooltipStatus) {
    case "success":
      return "Успіх";

    case "warning":
      return "Увага";

    case "error":
      return "Помилка";

    default:
      return null;
  }
});

const tooltipIcon = computed(() => {
  switch (props.tooltipStatus) {
    case "success":
      return markRaw(SuccessIcon);

    case "warning":
      return markRaw(WarningIcon);

    case "error":
      return markRaw(DangerIcon);

    default:
      return null;
  }
});

const tooltipStyle = computed(() => {
  switch (props.tooltipStatus) {
    case "success":
      return "tooltip_success";
    case "warning":
      return "tooltip_warning";
    case "error":
      return "tooltip_error";
    case "info":
      return "tooltip_info";
    default:
      return "tooltip_default";
  }
});
</script>

<style lang="scss">
.tooltip {
  height: auto;
  width: 60%;
  height: 150px;
  text-align: center;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: tooltipAnimation 4s ease-in-out forwards;
  backdrop-filter: blur(10px);
  border-radius: 2vw;
  padding-block: 40px;
  padding-right: 40px;
  margin: 0 auto;
  z-index: 1010;
  overflow: hidden;

  &_content_wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    height: 100%;
    width: 90%;
    margin: 0 auto;
    gap: 50px;

    @media screen and (max-width: 768px) {
      gap: 30px;
    }
    @media screen and (max-width: 480px) {
      gap: 20px;
    }
    @media screen and (max-width: 375px) {
      gap: 15px;
    }
  }

  .status_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    svg {
      width: 50px;
      height: 50px;
      aspect-ratio: 1 / 1;

      @media screen and (max-width: 768px) {
        width: 40px;
        height: 40px;
      }
      @media screen and (max-width: 480px) {
        width: 30px;
        height: 30px;
      }
    }
  }

  .text_wrapper {
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 0px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 10px 50px 10px 10px;
    min-width: clamp(120px, 55vw, 300px);
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    padding-block: 30px;
    padding-right: 30px;
    min-width: 200px;

    height: 110px;
    width: 90%;
  }
  @media screen and (max-width: 480px) {
    padding-block: 20px;
    padding-right: 20px;
    min-width: 90px;
    height: 100px;
    width: 95%;
  }
}

.tooltip_success {
  border: 2px solid var(--success-border);
  background: rgba(7, 18, 18, 0.8);
  .text_wrapper {
    border-left: 2px solid var(--success-border);
  }
}

.tooltip_info {
  border: 1px solid var(--text-grey);
}

.tooltip_warning {
  border: 1px solid var(--warning-border);
  background: rgb(36, 22, 14, 0.8);
  .text_wrapper {
    border-left: 2px solid var(--warning-border);
  }
}

.tooltip_error {
  border: 1px solid var(--error-border);
  background: rgba(36, 14, 24, 0.8);
  .text_wrapper {
    border-left: 2px solid var(--error-border);
  }
}

.tooltip_default {
  border: 1px solid var(--btn-color);
}

@keyframes tooltipAnimation {
  0% {
    top: -100%;
    opacity: 0;
  }
  10% {
    top: 5%;
    opacity: 1;
  }
  90% {
    top: 5%;
    opacity: 1;
  }
  100% {
    top: -100%;
    opacity: 0;
  }
}
</style>
