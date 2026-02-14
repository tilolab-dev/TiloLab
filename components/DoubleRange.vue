<template>
  <div class="double_range">
    <div class="top_item">
      <div class="description">
        <span> Ціна, грн </span>
      </div>
      <!-- <div class="value">
                <span>
                    {{ minValue }} - {{ maxValue }}
                </span>
            </div> -->
    </div>

    <MultiRangeSlider
      :label="false"
      :ruler="false"
      :can-min-max-value-same="true"
      bar-left-color="var(--accent-color)"
      bar-inner-color="none"
      bar-right-color="rgb(97, 75, 81)"
      thumb-left-color="rgb(152, 14, 67)"
      thumb-right-color="rgb(231, 32, 108)"
      :min="min"
      :max="max"
      :step="step"
      :min-value="minValue"
      :max-value="maxValue"
      @input="rangeSliderHandler"
    />

    <div class="values">
      <span id="range1">{{ minValue }} ₴</span>
      <span> - </span>
      <span id="range2">{{ maxValue }} ₴</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import MultiRangeSlider from "multi-range-slider-vue";

const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 10000
  },
  step: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(["range-change"]);

const minValue = ref(props.min);
const maxValue = ref(props.max);

let debounceTimer = null;

// Watch for prop changes and update values accordingly
watch([() => props.min, () => props.max], ([newMin, newMax]) => {
  minValue.value = Math.max(minValue.value, newMin);
  maxValue.value = Math.min(maxValue.value, newMax);
});

const rangeSliderHandler = (value) => {
  // Update UI values immediately
  minValue.value = parseInt(value.minValue);
  maxValue.value = parseInt(value.maxValue);

  // Clear existing timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  // Set new timer to emit after user stops dragging (300ms delay)
  debounceTimer = setTimeout(() => {
    emit("range-change", {
      min: minValue.value,
      max: maxValue.value
    });
  }, 300);
};
</script>

<style lang="scss">
.double_range {
  width: 30vw;
  height: fit-content;
}
.caption {
  display: none !important;
}

.multi-range-slider {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  // &::before,
  // &::after {
  // 	width: 20px;
  // 	height: 20px;
  // 	background: var(--accent-color);
  // 	border-radius: 50%;
  // 	content: '';
  // 	position: absolute;
  // 	top: 50%;
  // 	transform: translateY(-50%);
  // }
  // &::before {
  // 	left: -2px;
  // }
  // &::after {
  // 	right: 2px;
  // }
  .caption {
    display: none;
  }
  .bar-inner {
    box-shadow: none !important;
    // border-width: 2px ;
    // background-color: ;
    background: var(--accent-color) !important;
    border: none;
    height: 4px !important;
  }
  .bar-right,
  .bar-left {
    background-color: var(--dark-text);
    box-shadow: none;
    padding: 2px 0;
  }
  .thumb::before {
    background-image: url(/assets/icons/range-control-icon.svg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: initial;
    overflow: visible;
    background-color: transparent;
    box-shadow: none;
    border: none;
    width: 14.839px;
    height: 30.894px;
    margin: -17px -8px;
  }
}

.values {
  width: 100%;
  position: relative;
  padding: 10px;
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  gap: 0.5rem;
  span {
    color: rgb(193, 193, 193);
    font-family: var(--font-family-urbanist);
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: 0%;
    text-align: center;
  }
}
</style>
