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
      :min="100"
      :max="10000"
      :step="1"
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
import { ref } from "vue";

import MultiRangeSlider from "multi-range-slider-vue";

const minValue = ref(100);
const maxValue = ref(5000);

const rangeSliderHandler = (value) => {
  minValue.value = parseInt(value.minValue);
  maxValue.value = parseInt(value.maxValue);
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
    background: var(--accent-color) !important;

    box-shadow: none;
    border: none;
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
