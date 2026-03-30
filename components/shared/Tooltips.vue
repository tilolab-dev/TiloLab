<template>
  <div :class="`tooltip ${tooltipStyle}`">
    <div class="tooltip_content_wrapper">
      <div class="status_wrapper">
        <component :is="tooltipIcon" v-if="tooltipIcon" />
        <p>{{ tooltipName }}</p>
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
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-20px);
  opacity: 0;

  display: flex;
  align-items: center;

  width: fit-content;
  max-width: 90%;
  padding: 14px 18px;
  overflow: hidden;

  border-radius: 14px;
  backdrop-filter: blur(12px);
  background: rgba(20, 20, 20, 0.75);

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  z-index: 1010;

  animation: tooltipAnimation 3s ease forwards;

  &_content_wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .status_wrapper {
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
      width: 22px;
      height: 22px;
      flex-shrink: 0;
    }

    p {
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      margin: 0;
    }
  }

  .text_wrapper {
    font-size: 14px;
    color: #cfcfcf;
  }
}

.tooltip::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5px;
  border-radius: 4px 0 0 4px;
}

.tooltip_success::before {
  background: var(--success-border);
}
.tooltip_success {
  background: rgba(7, 18, 18, 0.8);
  border: 1px solid var(--success-border);
}

.tooltip_warning::before {
  background: var(--warning-border);
}
.tooltip_warning {
  background: rgb(36, 22, 14, 0.8);
  border: 1px solid var(--warning-border);
}

.tooltip_error::before {
  background: var(--error-border);
}
.tooltip_error {
  background: rgba(36, 14, 24, 0.8);

  border: 1px solid var(--error-border);
}

.tooltip_info::before {
  background: #3b82f6;
}
.tooltip_info {
  border: 1px solid rgba(59, 130, 246, 0.3);
}

@keyframes tooltipAnimation {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.95);
  }

  10% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }

  85% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-8px) scale(0.98);
  }
}
</style>
